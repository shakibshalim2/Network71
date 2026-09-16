<?php
declare(strict_types=1);
// Covers inbox filters/exports/notes, media alt edits, user role changes, content status filter and outbox retry.
// Runs only against a development backend over loopback, like http-smoke.php.
if (PHP_SAPI !== 'cli') exit(1);
require dirname(__DIR__) . '/app/bootstrap.php';
$config = app_config();
if ($config['environment'] !== 'development') throw new RuntimeException('Integration tests are restricted to development.');
$base = rtrim(getenv('N71_TEST_BASE_URL') ?: 'http://127.0.0.1:8787', '/');
if (!in_array(parse_url($base, PHP_URL_HOST), ['localhost', '127.0.0.1'], true)) throw new RuntimeException('Use a loopback test server.');
$db = new Database($config);
$checks = 0;
function check(bool $condition, string $message): void { global $checks; if (!$condition) throw new RuntimeException($message); $checks++; }
final class Client
{
    private CurlHandle $curl;
    public string $csrf = '';
    public function __construct(private string $base, private string $origin) { $this->curl = curl_init(); curl_setopt($this->curl, CURLOPT_COOKIEFILE, ''); }
    public function send(string $method, string $path, mixed $data = null): array
    {
        $headers = ['Origin: ' . $this->origin, 'X-CSRF-Token: ' . $this->csrf];
        if ($data !== null) $headers[] = 'Content-Type: application/json';
        curl_setopt_array($this->curl, [CURLOPT_URL => $this->base . '/api/v1/' . $path, CURLOPT_CUSTOMREQUEST => $method, CURLOPT_POSTFIELDS => $data === null ? null : json_encode($data, JSON_THROW_ON_ERROR), CURLOPT_HTTPHEADER => $headers, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 15]);
        $raw = curl_exec($this->curl);
        if ($raw === false) throw new RuntimeException(curl_error($this->curl));
        return ['status' => curl_getinfo($this->curl, CURLINFO_HTTP_CODE), 'type' => (string)curl_getinfo($this->curl, CURLINFO_CONTENT_TYPE), 'data' => json_decode($raw, true), 'raw' => $raw];
    }
    public function login(string $email, string $password): void
    {
        $this->csrf = $this->send('GET', 'auth/session')['data']['csrf'];
        $login = $this->send('POST', 'auth/login', compact('email', 'password'));
        check($login['status'] === 200, 'Login failed.');
        $this->csrf = $login['data']['csrf'];
    }
}
$prefix = 'feat-' . bin2hex(random_bytes(5));
$owner = new Client($base, $config['origin']);
$owner->login((string)getenv('N71_TEST_EMAIL'), (string)getenv('N71_TEST_PASSWORD'));
$me = $owner->send('GET', 'auth/session')['data']['user'];
$inquiryIds = []; $editorId = null; $recordId = null;
try {
    // ── Inbox: two enquiries, filter by status / assignee / search, counts, export
    foreach (['alpha', 'beta'] as $tag) {
        $r = $owner->send('POST', 'inquiries', ['name' => "$prefix $tag", 'email' => "$prefix-$tag@example.com", 'subject' => "$prefix subject $tag", 'message' => 'Feature test message', 'request_key' => bin2hex(random_bytes(16))]);
        check(in_array($r["status"], [200, 201], true), "Enquiry $tag not accepted: " . $r['raw']);
        $inquiryIds[] = (int)$db->query('SELECT id FROM inquiries WHERE reference = ?', [$r['data']['reference']])->fetchColumn();
    }
    $list = $owner->send('GET', 'admin/inquiries?q=' . urlencode($prefix));
    check($list['status'] === 200 && count($list['data']['items']) === 2, 'Search should match both fixtures.');
    check(isset($list['data']['counts']['new']) && $list['data']['counts']['new'] >= 2, 'Counts should be returned.');
    $owner->send('PATCH', 'admin/inquiries/' . $inquiryIds[0], ['status' => 'closed', 'assigned_to' => (int)$me['id']]);
    $closed = $owner->send('GET', 'admin/inquiries?status=closed&q=' . urlencode($prefix));
    check(count($closed['data']['items']) === 1 && (int)$closed['data']['items'][0]['id'] === $inquiryIds[0], 'Status filter should isolate the closed enquiry.');
    $mine = $owner->send('GET', 'admin/inquiries?assignee=' . $me['id'] . '&q=' . urlencode($prefix));
    check(count($mine['data']['items']) === 1, 'Assignee filter should isolate the assigned enquiry.');
    $unassigned = $owner->send('GET', 'admin/inquiries?assignee=unassigned&q=' . urlencode($prefix));
    check(count($unassigned['data']['items']) === 1 && (int)$unassigned['data']['items'][0]['id'] === $inquiryIds[1], 'Unassigned filter should isolate the other enquiry.');
    check($owner->send('GET', 'admin/inquiries?status=bogus')['status'] === 422, 'Invalid status filter must be rejected.');
    $csv = $owner->send('GET', 'admin/inquiries/export?q=' . urlencode($prefix));
    check($csv['status'] === 200 && str_starts_with($csv['type'], 'text/csv'), 'Export should return CSV.');
    check(substr_count($csv['raw'], "\n") >= 3 && str_contains($csv['raw'], "$prefix subject alpha"), 'CSV should contain header and both rows.');
    $evil = $owner->send('POST', 'inquiries', ['name' => '=HYPERLINK("x")', 'email' => "$prefix-evil@example.com", 'subject' => "$prefix evil", 'message' => 'x', 'request_key' => bin2hex(random_bytes(16))]);
    $inquiryIds[] = (int)$db->query('SELECT id FROM inquiries WHERE reference = ?', [$evil['data']['reference']])->fetchColumn();
    $csv = $owner->send('GET', 'admin/inquiries/export?q=' . urlencode("$prefix evil"));
    check(str_contains($csv['raw'], "'=HYPERLINK"), 'Formula-leading cells must be neutralised in CSV.');
    check($owner->send('GET', 'admin/applications?q=' . urlencode($prefix))['status'] === 200, 'Applications listing with filter should respond.');
    check($owner->send('GET', 'admin/applications?status=nope')['status'] === 422, 'Applications rejects invalid status.');
    $appCsv = $owner->send('GET', 'admin/applications/export');
    check($appCsv['status'] === 200 && str_starts_with($appCsv['type'], 'text/csv'), 'Applications export should return CSV.');
    check($owner->send('POST', 'admin/applications/999999999/notes', ['note' => 'x'])['status'] === 404, 'Note on missing application should 404.');

    // ── Content: status filter
    $save = $owner->send('POST', 'admin/content/testimonials?locale=en', ['slug' => $prefix, 'sort_order' => 0, 'locale' => 'en', 'data' => ['title' => "$prefix person", 'quote' => 'Great work', 'position' => 'CEO', 'permission' => true]]);
    check($save['status'] === 201, 'Testimonial draft should save: ' . $save['raw']);
    $recordId = (int)$save['data']['id'];
    $drafts = $owner->send('GET', 'admin/content/testimonials?locale=en&status=draft&q=' . urlencode($prefix));
    check(count($drafts['data']['items']) === 1, 'Draft filter should include the fixture.');
    $published = $owner->send('GET', 'admin/content/testimonials?locale=en&status=published&q=' . urlencode($prefix));
    check(count($published['data']['items']) === 0, 'Published filter should exclude the draft.');
    check($owner->send('GET', 'admin/content/testimonials?locale=en&status=weird')['status'] === 422, 'Invalid content status filter must be rejected.');

    // ── Users: create editor, rename, promote/demote, guard self and last owner
    $create = $owner->send('POST', 'admin/users', ['name' => "$prefix editor", 'email' => "$prefix@example.com", 'password' => 'EditorPassword123!', 'role' => 'editor']);
    check($create['status'] === 201, 'Editor should be created.');
    $editorId = (int)$db->query('SELECT id FROM admin_users WHERE email = ?', ["$prefix@example.com"])->fetchColumn();
    check($owner->send('PATCH', "admin/users/$editorId", ['name' => "$prefix renamed"])['status'] === 200, 'Rename should succeed.');
    check($db->query('SELECT name FROM admin_users WHERE id = ?', [$editorId])->fetchColumn() === "$prefix renamed", 'Name should be persisted.');
    check($owner->send('PATCH', "admin/users/$editorId", ['role' => 'owner'])['status'] === 200, 'Promotion should succeed.');
    check($owner->send('PATCH', "admin/users/$editorId", ['role' => 'editor'])['status'] === 200, 'Demotion should succeed while another owner exists.');
    check($owner->send('PATCH', "admin/users/$editorId", ['role' => 'admin'])['status'] === 422, 'Invalid role must be rejected.');
    check($owner->send('PATCH', "admin/users/$editorId", ['unrelated' => 1])['status'] === 422, 'Patch without a known field must be rejected.');
    check($owner->send('PATCH', 'admin/users/' . $me['id'], ['role' => 'editor'])['status'] === 422, 'Owner cannot demote themselves.');
    check($owner->send('PATCH', 'admin/users/' . $me['id'], ['name' => $me['name']])['status'] === 200, 'Owner can rename themselves.');
    $audit = $db->query("SELECT COUNT(*) FROM audit_logs WHERE entity = 'users' AND entity_id = ? AND action IN ('rename_user','change_role_owner','change_role_editor')", [$editorId])->fetchColumn();
    check((int)$audit === 3, 'Rename and both role changes should be audited.');

    // ── Media alt: 404 for missing id, validation for empty alt
    check($owner->send('PATCH', 'admin/media/999999999', ['alt' => 'x'])['status'] === 404, 'Alt update on missing media should 404.');
    check($owner->send('PATCH', 'admin/media/999999999', ['alt' => ''])['status'] === 422, 'Empty alt must be rejected.');

    // ── Outbox retry (owner only)
    $db->query("UPDATE email_outbox SET status='failed', attempts=10 WHERE inquiry_id = ?", [$inquiryIds[0]]);
    $retry = $owner->send('POST', 'admin/outbox/retry');
    check($retry['status'] === 200 && $retry['data']['requeued'] >= 1, 'Retry should requeue failed mail.');
    check($db->query("SELECT status FROM email_outbox WHERE inquiry_id = ?", [$inquiryIds[0]])->fetchColumn() === 'pending', 'Failed mail should be pending again.');
    $editor = new Client($base, $config['origin']);
    $editor->login("$prefix@example.com", 'EditorPassword123!');
    check($editor->send('POST', 'admin/outbox/retry')['status'] === 403, 'Editors cannot retry the outbox.');
    check($editor->send('GET', 'admin/inquiries/export')['status'] === 200, 'Editors can export enquiries.');
    // ── Notes: delete by author / owner / stranger
    $owner->send('POST', 'admin/inquiries/' . $inquiryIds[1] . '/notes', ['note' => 'owner note']);
    $editor->send('POST', 'admin/inquiries/' . $inquiryIds[1] . '/notes', ['note' => 'editor note']);
    $notes = $owner->send('GET', 'admin/inquiries?q=' . urlencode($prefix))['data']['items'];
    $target = null; foreach ($notes as $item) if ((int)$item['id'] === $inquiryIds[1]) $target = $item['notes'];
    check(is_array($target) && count($target) === 2, 'Both notes should be listed.');
    $ownerNote = $target[0]['id']; $editorNote = $target[1]['id'];
    check($editor->send('DELETE', 'admin/inquiries/' . $inquiryIds[1] . '/notes/' . $ownerNote)['status'] === 403, 'Editor cannot delete another author\'s note.');
    check($editor->send('DELETE', 'admin/inquiries/' . $inquiryIds[1] . '/notes/' . $editorNote)['status'] === 200, 'Editor deletes own note.');
    check($owner->send('DELETE', 'admin/inquiries/' . $inquiryIds[1] . '/notes/' . $ownerNote)['status'] === 200, 'Owner deletes any note.');
    check($owner->send('DELETE', 'admin/inquiries/' . $inquiryIds[1] . '/notes/' . $ownerNote)['status'] === 404, 'Deleted note is gone.');

    // ── Media search
    check($owner->send('GET', 'admin/media?q=' . urlencode($prefix))['data']['total'] === 0, 'Media search should return no fixtures.');
    check($owner->send('GET', 'admin/media?q=' . str_repeat('a', 151))['status'] === 422, 'Overlong media search rejected.');

    // ── Translation lookup
    $tr = $owner->send('GET', "admin/content/testimonials/$recordId/translation");
    check($tr['status'] === 200 && $tr['data']['locale'] === 'bn' && $tr['data']['record'] === null, 'No bn twin yet.');
    $bn = $owner->send('POST', 'admin/content/testimonials?locale=bn', ['slug' => $prefix, 'sort_order' => 0, 'locale' => 'bn', 'data' => ['title' => "$prefix bn", 'quote' => 'চমৎকার', 'position' => 'CEO', 'permission' => true]]);
    check($bn['status'] === 201, 'bn twin should save: ' . $bn['raw']);
    $bnId = (int)$bn['data']['id'];
    $tr = $owner->send('GET', "admin/content/testimonials/$recordId/translation");
    check((int)($tr['data']['record']['id'] ?? 0) === $bnId, 'Translation lookup should find the bn twin by slug.');
    $db->query('DELETE FROM content_revisions WHERE record_id = ?', [$bnId]); $db->query('DELETE FROM content_records WHERE id = ?', [$bnId]);

    // ── Audit log (owner only, filters)
    check($editor->send('GET', 'admin/audit')['status'] === 403, 'Editors cannot read the audit log.');
    $audit = $owner->send('GET', 'admin/audit?entity=users&actor=' . $me['id'] . '&q=rename');
    check($audit['status'] === 200 && count($audit['data']['items']) >= 1 && $audit['data']['items'][0]['action'] === 'rename_user', 'Audit filters should isolate rename events.');
    check($owner->send('GET', 'admin/audit?entity=bad%20value')['status'] === 422, 'Invalid audit entity rejected.');

    // ── Self-service password change (editor), other sessions invalidated, new password works
    check($editor->send('POST', 'auth/change-password', ['current_password' => 'wrong-password-123', 'password' => 'EditorPassword456!'])['status'] === 422, 'Wrong current password rejected.');
    check($editor->send('POST', 'auth/change-password', ['current_password' => 'EditorPassword123!', 'password' => 'short'])['status'] === 422, 'Short new password rejected.');
    $second = new Client($base, $config['origin']); $second->login("$prefix@example.com", 'EditorPassword123!');
    check($editor->send('POST', 'auth/change-password', ['current_password' => 'EditorPassword123!', 'password' => 'EditorPassword456!'])['status'] === 200, 'Password change should succeed.');
    check($editor->send('GET', 'auth/session')['data']['user'] !== null, 'Changing session stays signed in.');
    check($second->send('GET', 'auth/session')['data']['user'] === null, 'Other sessions are invalidated after a password change.');
    $third = new Client($base, $config['origin']); $third->login("$prefix@example.com", 'EditorPassword456!');
    check($db->query("SELECT COUNT(*) FROM audit_logs WHERE action='change_password' AND actor_id=?", [$editorId])->fetchColumn() >= 1, 'Password change is audited.');
    echo "$checks admin feature checks passed.\n";
} finally {
    if ($inquiryIds) $db->query('DELETE FROM inquiries WHERE id IN (' . implode(',', array_fill(0, count($inquiryIds), '?')) . ')', $inquiryIds);
    if ($recordId) { $db->query('DELETE FROM content_revisions WHERE record_id = ?', [$recordId]); $db->query('DELETE FROM content_records WHERE id = ?', [$recordId]); }
    if ($editorId) { $db->query('DELETE FROM audit_logs WHERE actor_id = ? OR (entity = ? AND entity_id = ?)', [$editorId, 'users', $editorId]); $db->query('DELETE FROM admin_users WHERE id = ?', [$editorId]); }
    $db->query('DELETE FROM rate_limits WHERE bucket IN (?, ?)', [hash('sha256', 'inquiry:127.0.0.1'), hash('sha256', 'login-ip:127.0.0.1')]);
}
