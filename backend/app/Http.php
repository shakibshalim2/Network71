<?php
declare(strict_types=1);

final class HttpError extends RuntimeException
{
    public function __construct(public int $status, string $message) { parent::__construct($message); }
}

final class Http
{
    public static function fail(int $status, string $message): never { throw new HttpError($status, $message); }

    public static function json(mixed $data, int $status = 200): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        header('X-Content-Type-Options: nosniff');
        echo json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    public static function body(): array
    {
        if (!str_starts_with(strtolower($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json')) {
            self::fail(415, 'Send JSON content.');
        }
        $raw = file_get_contents('php://input', false, null, 0, 750001);
        if ($raw === false || strlen($raw) > 750000) self::fail(413, 'Request is too large.');
        try { $body = json_decode($raw, true, 64, JSON_THROW_ON_ERROR); }
        catch (JsonException) { self::fail(400, 'Invalid JSON.'); }
        if (!is_array($body) || array_is_list($body)) self::fail(400, 'Expected a JSON object.');
        return $body;
    }

    public static function string(array $data, string $key, int $max, bool $required = false): string
    {
        $value = $data[$key] ?? '';
        if (!is_string($value)) self::fail(422, "$key must be text.");
        $value = trim($value);
        if (mb_strlen($value) > $max || ($required && $value === '')) self::fail(422, "Check $key (maximum $max characters).");
        return $value;
    }

    public static function password(array $data): string
    {
        $value = $data['password'] ?? null;
        if (!is_string($value) || strlen($value) < 1 || strlen($value) > 72) self::fail(422, 'Password must be between 1 and 72 bytes.');
        return $value;
    }
}
