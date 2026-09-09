<?php
declare(strict_types=1);

final class Media
{
    public function __construct(private Database $db, private array $config) {}

    public function upload(array $user): array
    {
        $file = $_FILES['file'] ?? null;
        $alt = Http::string($_POST, 'alt', 300, true);
        if (($_POST['permission'] ?? '') !== 'yes') Http::fail(422, 'Confirm that this image is approved for public use.');
        if (!$file || $file['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'])) Http::fail(422, 'Choose an image up to 5 MB.');
        if ($file['size'] > 5 * 1024 * 1024) Http::fail(413, 'Images must be no larger than 5 MB.');
        $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
        if (!in_array($mime, ['image/jpeg', 'image/png', 'image/webp'], true)) Http::fail(422, 'Only JPEG, PNG and WebP images are supported.');
        $size = @getimagesize($file['tmp_name']);
        if (!$size || $size[0] * $size[1] > 12000000 || max($size[0], $size[1]) > 8000) Http::fail(422, 'Image dimensions are too large (maximum 12 megapixels).');
        $original = @imagecreatefromstring(file_get_contents($file['tmp_name']));
        if (!$original) Http::fail(422, 'This image could not be decoded.');
        $ratio = min(1, 2000 / max($size[0], $size[1]));
        $width = max(1, (int)round($size[0] * $ratio));
        $height = max(1, (int)round($size[1] * $ratio));
        $output = imagecreatetruecolor($width, $height);
        imagealphablending($output, false);
        imagesavealpha($output, true);
        imagecopyresampled($output, $original, 0, 0, 0, 0, $width, $height, $size[0], $size[1]);
        $dir = $this->config['storage'] . '/media';
        if (!is_dir($dir) && !mkdir($dir, 0700, true)) throw new RuntimeException('Cannot create media storage.');
        $filename = bin2hex(random_bytes(20)) . '.webp';
        $path = $dir . '/' . $filename;
        try {
            if (!imagewebp($output, $path, 82)) throw new RuntimeException('Cannot save image.');
            return $this->db->transaction(function () use ($user, $filename, $file, $alt, $path, $width, $height) {
                $this->db->query('INSERT INTO media_assets (filename, original_name, alt, mime, bytes, width, height, uploaded_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP())', [$filename, mb_substr(basename($file['name']), 0, 255), $alt, 'image/webp', filesize($path), $width, $height, $user['id']]);
                $id = (int)$this->db->pdo->lastInsertId();
                $this->db->audit((int)$user['id'], 'upload_public_image', 'media', $id);
                return ['id' => $id, 'url' => '/api/v1/media/' . $filename];
            });
        } catch (Throwable $error) {
            if (is_file($path)) unlink($path);
            throw $error;
        } finally { imagedestroy($original); imagedestroy($output); }
    }

    public function serve(string $filename): never
    {
        if (!preg_match('/^[a-f0-9]{40}\.webp$/', $filename)) Http::fail(404, 'Image not found.');
        $row = $this->db->query('SELECT filename FROM media_assets WHERE filename = ?', [$filename])->fetch();
        $path = $this->config['storage'] . '/media/' . $filename;
        if (!$row || !is_file($path)) Http::fail(404, 'Image not found.');
        header('Content-Type: image/webp');
        header('X-Content-Type-Options: nosniff');
        header('Cache-Control: public, max-age=31536000, immutable');
        header('Content-Length: ' . filesize($path));
        readfile($path);
        exit;
    }
}
