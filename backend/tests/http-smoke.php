<?php
declare(strict_types=1);
// Runs against a configured development backend only. Uses real HTTP and MySQL.
if (PHP_SAPI !== 'cli') exit(1);
require dirname(__DIR__) . '/app/bootstrap.php';
$config = app_config();
if ($config['environment'] !== 'development') throw new RuntimeException('Integration tests are restricted to development.');
$base = rtrim(getenv('N71_TEST_BASE_URL') ?: 'http://127.0.0.1:8787', '/');
if (!in_array(parse_url($base, PHP_URL_HOST), ['localhost', '127.0.0.1'], true)) throw new RuntimeException('Use a loopback test server.');
$db = new Database($config);
$prefix = 'test-' . bin2hex(random_bytes(6));
$inquiryBucket = hash('sha256', 'inquiry:127.0.0.1');
$ids = []; $userId = null; $mediaId = null; $filename = null; $reference = null;
$checks = 0;
function check(bool $condition, string $message): void { global $checks; if (!$condition) throw new RuntimeException($message); $checks++; }
final class Client
{
    private CurlHandle $curl;
    public string $csrf = '';
    public function __construct(private string $base, private string $origin) { $this->curl = curl_init(); curl_setopt($this->curl, CURLOPT_COOKIEFILE, ''); }
    public function send(string $method, string $path, mixed $data = null, ?string $csrf = null, ?string $origin = null): array
    {
        $headers = ['Origin: ' . ($origin ?? $this->origin), 'X-CSRF-Token: ' . ($csrf ?? $this->csrf)];
        $multipart = is_array($data) && isset($data['file']) && $data['file'] instanceof CURLFile;
        if ($data !== null && !$multipart) $headers[] = 'Content-Type: application/json';
        curl_setopt_array($this->curl, [CURLOPT_URL => $this->base . '/api/v1/' . $path, CURLOPT_CUSTOMREQUEST => $method, CURLOPT_POSTFIELDS => $data === null ? null : ($multipart ? $data : json_encode($data, JSON_THROW_ON_ERROR)), CURLOPT_HTTPHEADER => $headers, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 15]);
        $raw = curl_exec($this->curl);
        if ($raw === false) throw new RuntimeException(curl_error($this->curl));
        return ['status' => curl_getinfo($this->curl, CURLINFO_HTTP_CODE), 'data' => json_decode($raw, true), 'raw' => $raw];
    }
    public function login(string $email, string $password): void
    {
        $session = $this->send('GET', 'auth/session');
        $this->csrf = $session['data']['csrf'];
        $login = $this->send('POST', 'auth/login', compact('email', 'password'));
        check($login['status'] === 200, 'Login failed.');
        $this->csrf = $login['data']['csrf'];
    }
}
$owner = new Client($base, $config['origin']);
$editor = new Client($base, $config['origin']);
$guest = new Client($base, $config['origin']);
$tempImage = tempnam(sys_get_temp_dir(), 'n71-image-');
$tempBad = tempnam(sys_get_temp_dir(), 'n71-bad-');
try {
    check($guest->send('GET', 'admin/dashboard')['status'] === 401, 'Admin must reject guests.');
    $owner->login((string)getenv('N71_TEST_EMAIL'), (string)getenv('N71_TEST_PASSWORD'));
    check(count($owner->send('GET', 'admin/modules')['data']) === 14, 'Expected all active collection modules.');
    check($owner->send('POST', 'admin/content/projects', [], 'wrong')['status'] === 403, 'CSRF must be enforced.');
    check($owner->send('POST', 'admin/content/projects', [], null, 'https://untrusted.example')['status'] === 403, 'Origin must be enforced.');
    $project = ['slug' => $prefix, 'data' => ['title' => 'Integration <script>alert(1)</script>', 'type' => 'Client work', 'work_status' => 'Completed', 'role' => 'Test deliverable', 'permission' => true]];
    $created = $owner->send('POST', 'admin/content/projects', $project);
    check($created['status'] === 201, 'Create draft failed.');
    $id = (int)$created['data']['id']; $ids[] = $id;
    check($guest->send('GET', 'content/projects/' . $prefix)['status'] === 404, 'Draft must remain private.');
    check($owner->send('POST', "admin/content/projects/$id/state", ['action' => 'publish', 'version' => 1])['status'] === 200, 'Publishing failed.');
    $public = $guest->send('GET', 'content/projects/' . $prefix);
    check($public['status'] === 200 && $public['data']['data']['title'] === $project['data']['title'], 'Published snapshot missing.');
    check(!isset($public['data']['version'], $public['data']['draft_json']), 'Public response must not expose draft internals.');
    $project['version'] = 2; $project['sort_order'] = 77; $project['data']['title'] = 'Changed draft';
    check($owner->send('PUT', "admin/content/projects/$id", $project)['status'] === 200, 'Draft update failed.');
    check($owner->send('PUT', "admin/content/projects/$id", $project)['status'] === 409, 'Stale update should fail.');
    check($guest->send('GET', 'content/projects/' . $prefix)['data']['data']['title'] !== 'Changed draft', 'Unpublished draft leaked publicly.');
    $listing = $guest->send('GET', 'content/projects?q=Integration')['data']['items'];
    check(count($listing) >= 1 && (int)$listing[0]['sort_order'] === 0, 'Draft display order leaked publicly.');
    $bad = $project; $bad['slug'] = $prefix . '-permission'; $bad['data']['permission'] = false;
    $created = $owner->send('POST', 'admin/content/projects', $bad); $permissionId = (int)$created['data']['id']; $ids[] = $permissionId;
    check($owner->send('POST', "admin/content/projects/$permissionId/state", ['action' => 'publish', 'version' => 1])['status'] === 422, 'Permission must be required for publication.');
    $bad['slug'] = $prefix . '-url'; $bad['data']['url'] = 'javascript:alert(1)';
    check($owner->send('POST', 'admin/content/projects', $bad)['status'] === 422, 'Unsafe URLs must be rejected.');
    check($owner->send('POST', 'admin/content/unknown', $project)['status'] === 404, 'Unknown modules must be rejected.');
    $email = $prefix . '@example.test'; $password = bin2hex(random_bytes(12));
    check($owner->send('POST', 'admin/users', ['name' => 'Test editor', 'email' => $email, 'password' => $password, 'role' => 'editor'])['status'] === 201, 'Create editor failed.');
    $userId = (int)$db->query('SELECT id FROM admin_users WHERE email = ?', [$email])->fetchColumn();
    $editor->login($email, $password);
    check($editor->send('GET', 'admin/users')['status'] === 403, 'Editor accessed accounts.');
    check($editor->send('POST', "admin/content/projects/$id/state", ['action' => 'publish', 'version' => 3])['status'] === 403, 'Editor published content.');
    check($editor->send('POST', 'admin/content/settings', ['slug' => $prefix, 'data' => ['title' => 'Test settings']])['status'] === 403, 'Editor changed settings.');
    $editorDraft = ['slug' => $prefix . '-editor', 'data' => ['title' => 'Editor draft']];
    $created = $editor->send('POST', 'admin/content/posts', $editorDraft); check($created['status'] === 201, 'Editor could not save draft.'); $ids[] = (int)$created['data']['id'];
    $password = bin2hex(random_bytes(12));
    $db->query('UPDATE admin_users SET password_hash = ? WHERE id = ?', [password_hash($password, PASSWORD_DEFAULT), $userId]);
    check($editor->send('GET', 'admin/dashboard')['status'] === 401, 'Password reset did not invalidate the old session.');
    $editor->login($email, $password);
    check($owner->send('PATCH', "admin/users/$userId", ['active' => false])['status'] === 200, 'Deactivation failed.');
    check($editor->send('GET', 'admin/dashboard')['status'] === 401, 'Deactivated account retained access.');
    $image = imagecreatetruecolor(40, 30); imagepng($image, $tempImage); imagedestroy($image);
    $uploaded = $owner->send('POST', 'admin/media', ['file' => new CURLFile($tempImage, 'image/png', 'test.png'), 'alt' => $prefix, 'permission' => 'yes']);
    check($uploaded['status'] === 201, 'Image upload failed.');
    $mediaId = (int)$uploaded['data']['id']; $filename = basename($uploaded['data']['url']);
    check($guest->send('GET', 'media/' . $filename)['status'] === 200, 'Uploaded image not served.');
    file_put_contents($tempBad, '<?php echo 1;');
    check($owner->send('POST', 'admin/media', ['file' => new CURLFile($tempBad, 'image/png', 'fake.png'), 'alt' => 'Invalid image', 'permission' => 'yes'])['status'] === 422, 'Disguised PHP upload accepted.');
    $db->query('DELETE FROM rate_limits WHERE bucket = ?', [$inquiryBucket]);
    $inquiry = ['name' => 'Test enquiry', 'email' => $email, 'subject' => $prefix, 'message' => 'Integration test', 'request_key' => bin2hex(random_bytes(20))];
    $received = $guest->send('POST', 'inquiries', $inquiry); check($received['status'] === 201, 'Inquiry not stored.'); $reference = $received['data']['reference'];
    $duplicate = $guest->send('POST', 'inquiries', $inquiry); check($duplicate['status'] === 200 && $duplicate['data']['reference'] === $reference, 'Retry duplicated enquiry.');
    $inquiry['message'] = 'Changed'; check($guest->send('POST', 'inquiries', $inquiry)['status'] === 409, 'Reused key accepted a different payload.');
    $inquiryId = $db->query('SELECT id FROM inquiries WHERE reference = ?', [$reference])->fetchColumn();
    check($owner->send('PATCH', "admin/inquiries/$inquiryId", ['status' => 'in_progress'])['status'] === 200, 'Inbox status update failed.');
    $ownerId = (int)$db->query('SELECT id FROM admin_users WHERE email = ?', [(string)getenv('N71_TEST_EMAIL')])->fetchColumn();
    check($owner->send('PATCH', "admin/inquiries/$inquiryId", ['assigned_to' => $ownerId])['status'] === 200, 'Inbox assignment failed.');
    check($owner->send('POST', "admin/inquiries/$inquiryId/notes", ['note' => 'Private follow-up note'])['status'] === 201, 'Inbox note creation failed.');
    $inbox = $owner->send('GET', 'admin/inquiries')['data'];
    $inboxItem = array_values(array_filter($inbox['items'], static fn(array $item): bool => $item['reference'] === $reference))[0] ?? null;
    check($inboxItem && (int)$inboxItem['assigned_to'] === $ownerId && count($inboxItem['notes']) === 1 && $inboxItem['notes'][0]['note'] === 'Private follow-up note', 'Inbox assignment or notes were not returned.');
    check($owner->send('POST', "admin/content/projects/$id/state", ['action' => 'unpublish', 'version' => 3])['status'] === 200, 'Unpublish failed.');
    check($guest->send('GET', 'content/projects/' . $prefix)['status'] === 404, 'Unpublished content remained public.');
    check($owner->send('POST', 'auth/logout')['status'] === 200, 'Logout failed.');
    check($owner->send('GET', 'admin/dashboard')['status'] === 401, 'Logout retained access.');
    echo "$checks HTTP/MySQL integration checks passed.\n";
} finally {
    foreach ($ids as $id) { $db->query('DELETE FROM audit_logs WHERE entity_id = ? AND entity IN (?, ?)', [$id, 'projects', 'posts']); $db->query('DELETE FROM content_records WHERE id = ?', [$id]); }
    if ($mediaId) { $db->query("DELETE FROM audit_logs WHERE entity_id = ? AND entity = 'media'", [$mediaId]); $db->query('DELETE FROM media_assets WHERE id = ?', [$mediaId]); if ($filename) unlink($config['storage'] . '/media/' . $filename); }
    if ($reference) { $inquiryId = $db->query('SELECT id FROM inquiries WHERE reference = ?', [$reference])->fetchColumn(); $db->query("DELETE FROM audit_logs WHERE entity_id = ? AND entity = 'inquiries'", [$inquiryId]); $db->query('DELETE FROM inquiries WHERE reference = ?', [$reference]); }
    if ($userId) { $db->query("DELETE FROM audit_logs WHERE actor_id = ? OR (entity = 'users' AND entity_id = ?)", [$userId, $userId]); $db->query('DELETE FROM admin_users WHERE id = ?', [$userId]); }
    $db->query('DELETE FROM rate_limits WHERE bucket = ?', [$inquiryBucket]);
    $db->query('DELETE FROM rate_limits WHERE bucket = ?', [hash('sha256', 'login-email:' . $prefix . '@example.test')]);
    unlink($tempImage); unlink($tempBad);
}
