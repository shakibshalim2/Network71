<?php
declare(strict_types=1);

final class Api
{
    private Database $db;
    private Content $content;
    private Media $media;
    public function __construct(private array $config)
    {
        $this->db = new Database($config);
        $this->content = new Content($this->db, require __DIR__ . '/modules.php');
        $this->media = new Media($this->db, $config);
    }

    public function run(): never
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
        if ($method === 'GET' && preg_match('~^/api/v1/page/([a-z0-9/-]+)$~', $path, $match)) {
            Http::json((new Sections($this->db))->read($match[1],Sections::locale(),true));
        }
        if ($method === 'GET' && $path === '/api/v1/health') Http::json(['status' => 'ok']);
        if ($method === 'GET' && preg_match('~^/api/v1/media/([^/]+)$~', $path, $match)) $this->media->serve($match[1]);
        if ($method === 'GET' && preg_match('~^/api/v1/content/([a-z-]+)(?:/([a-z0-9-]+))?$~', $path, $match)) {
            $this->content->schema($match[1]);
            if (!isset($match[2])) Http::json($this->content->list($match[1], true));
            $row = $this->db->query("SELECT slug, published_json, published_at FROM content_records WHERE module = ? AND slug = ? AND locale = ? AND status = 'published' AND published_json IS NOT NULL", [$match[1], $match[2], Sections::locale()])->fetch();
            if (!$row) Http::fail(404, 'Content not found.');
            Http::json(['slug' => $row['slug'], 'data' => json_decode($row['published_json'], true, 32, JSON_THROW_ON_ERROR), 'published_at' => $row['published_at']]);
        }
        if ($method === 'POST' && $path === '/api/v1/inquiries') {
            $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
            if ($origin !== '' && $origin !== $this->config['origin']) Http::fail(403, 'Origin is not allowed.');
            $this->db->throttle('inquiry:' . ($_SERVER['REMOTE_ADDR'] ?? ''), 5, 600);
            $input = Http::body();
            if (($input['website'] ?? '') !== '') Http::fail(422, 'Unable to accept this submission.');
            $name = Http::string($input, 'name', 120, true);
            $email = Http::string($input, 'email', 190, true);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) Http::fail(422, 'Enter a valid email address.');
            $reference = 'N71-' . strtoupper(bin2hex(random_bytes(8)));
            $key = Http::string($input, 'request_key', 64, true);
            if (!preg_match('/^[a-zA-Z0-9-]{20,64}$/', $key)) Http::fail(422, 'Invalid submission identifier. Refresh and try again.');
            $values = [$name, $email, Http::string($input, 'phone', 40), Http::string($input, 'company', 190), Http::string($input, 'subject', 200, true), Http::string($input, 'message', 10000, true), Http::string($input, 'source', 200)];
            $hash = hash('sha256', json_encode($values, JSON_THROW_ON_ERROR));
            try {
                $this->db->transaction(function () use ($reference,$values,$key,$hash) {
                $this->db->query('INSERT INTO inquiries (reference, name, email, phone, company, subject, message, source, request_key, request_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP(), UTC_TIMESTAMP())', [$reference, ...$values, $key, $hash]);
                    $this->db->query('INSERT INTO email_outbox (inquiry_id,next_attempt_at,created_at) VALUES (?,UTC_TIMESTAMP(),UTC_TIMESTAMP())',[(int)$this->db->pdo->lastInsertId()]);
                });
            } catch (PDOException $error) {
                if ($error->getCode() !== '23000') throw $error;
                $existing = $this->db->query('SELECT reference, request_hash FROM inquiries WHERE request_key = ?', [$key])->fetch();
                if (!$existing || !hash_equals($existing['request_hash'], $hash)) Http::fail(409, 'This submission identifier has already been used.');
                Http::json(['reference' => $existing['reference'], 'message' => 'Your enquiry has been received.']);
            }
            Http::json(['reference' => $reference, 'message' => 'Your enquiry has been received.'], 201);
        }

        $auth = new Auth($this->db, $this->config);
        if ($method !== 'GET') $auth->checkWrite();
        if ($method === 'POST' && $path === '/api/v1/auth/reset-password') {
            (new PasswordReset($this->db))->consume(Http::body()); Http::json(['ok'=>true]);
        }
        if ($method === 'GET' && $path === '/api/v1/auth/session') Http::json(['user' => $auth->user(false), 'csrf' => $auth->csrf()]);
        if ($method === 'POST' && $path === '/api/v1/auth/login') Http::json($auth->login(Http::body()));
        if ($method === 'POST' && $path === '/api/v1/auth/logout') { $auth->logout(); Http::json(['ok' => true]); }
        $user = $auth->user();
        if ($method === 'POST' && preg_match('~^/api/v1/admin/users/([0-9]+)/reset-link$~',$path,$match)) {
            $owner=$auth->owner();
            $token=(new PasswordReset($this->db))->issue((int)$match[1],$owner);
            Http::json(['url'=>$this->config['origin'].'/admin/reset#'.$token]);
        }
        if (str_starts_with($path, '/api/v1/admin/sections')) {
            $sections = new Sections($this->db);
            if ($method === 'GET' && $path === '/api/v1/admin/sections') Http::json($sections->catalog());
            if (preg_match('~^/api/v1/admin/sections/([a-z0-9/-]+)$~', $path, $match)) {
                $page = $match[1];
                if ($method === 'GET') Http::json($sections->read($page,Sections::locale(),false));
                $input = Http::body();
                $section = Http::string($input,'section',100,true);
                if ($method === 'PUT') Http::json($sections->save($page,$section,$input,$user));
                if ($method === 'POST') { $sections->transition($page,$section,$input,$auth->owner()); Http::json(['ok'=>true]); }
            }
        }
        if ($method === 'GET' && $path === '/api/v1/admin/modules') Http::json($this->content->modules);
        if ($method === 'GET' && $path === '/api/v1/admin/dashboard') {
            Http::json([
                'mail_pending' => (int)$this->db->query("SELECT COUNT(*) FROM email_outbox WHERE status='pending'")->fetchColumn(),
                'mail_failed' => (int)$this->db->query("SELECT COUNT(*) FROM email_outbox WHERE status='failed'")->fetchColumn(),
                'smtp_enabled' => (bool)($this->config['smtp']['enabled'] ?? false),
                'total' => (int)$this->db->query("SELECT COUNT(*) FROM content_records WHERE module NOT IN ('pages','divisions')")->fetchColumn(),
                'published' => (int)$this->db->query("SELECT COUNT(*) FROM content_records WHERE module NOT IN ('pages','divisions') AND status = 'published'")->fetchColumn(),
                'drafts' => (int)$this->db->query("SELECT COUNT(*) FROM content_records WHERE module NOT IN ('pages','divisions') AND (status = 'draft' OR (status = 'published' AND draft_json <> published_json))")->fetchColumn(),
                'inquiries' => (int)$this->db->query("SELECT COUNT(*) FROM inquiries WHERE status = 'new'")->fetchColumn(),
                'activity' => $this->db->query('SELECT a.id, a.action, a.entity, a.created_at, u.name FROM audit_logs a LEFT JOIN admin_users u ON u.id = a.actor_id ORDER BY a.id DESC LIMIT 12')->fetchAll(),
            ]);
        }
        if (preg_match('~^/api/v1/admin/content/([a-z-]+)(?:/([0-9]+))?(?:/(state))?$~', $path, $match)) {
            $module = $match[1];
            $id = isset($match[2]) && $match[2] !== '' ? (int)$match[2] : null;
            if ($method === 'GET' && !$id) Http::json($this->content->list($module));
            if ($method === 'POST' && isset($match[3])) {
                $owner = $auth->owner();
                $this->content->transition($module, $id, Http::body(), $owner);
                Http::json(['ok' => true]);
            }
            if (($method === 'POST' && !$id) || ($method === 'PUT' && $id && !isset($match[3]))) Http::json($this->content->save($module, $id, Http::body(), $user), $id ? 200 : 201);
        }
        if ($method === 'DELETE' && preg_match('~^/api/v1/admin/media/([0-9]+)$~',$path,$match)) {
            $this->media->archive((int)$match[1],$auth->owner()); Http::json(['ok'=>true]);
        }
        if ($path === '/api/v1/admin/media') {
            if ($method === 'POST') Http::json($this->media->upload($user), 201);
            if ($method === 'GET') {
                $page = max(1, min(100000, (int)($_GET['page'] ?? 1)));
                $total = (int)$this->db->query('SELECT COUNT(*) FROM media_assets WHERE deleted_at IS NULL')->fetchColumn();
                Http::json(['items' => $this->db->query('SELECT id, filename, alt, width, height, bytes, created_at FROM media_assets WHERE deleted_at IS NULL ORDER BY id DESC LIMIT 24 OFFSET ' . (($page - 1) * 24))->fetchAll(), 'page' => $page, 'pages' => max(1, (int)ceil($total / 24)), 'total' => $total]);
            }
        }
        if ($method === 'GET' && $path === '/api/v1/admin/inquiries') {
            $page = max(1, min(100000, (int)($_GET['page'] ?? 1)));
            $total = (int)$this->db->query('SELECT COUNT(*) FROM inquiries')->fetchColumn();
            $items = $this->db->query('SELECT i.*, u.name AS assignee_name FROM inquiries i LEFT JOIN admin_users u ON u.id = i.assigned_to ORDER BY i.id DESC LIMIT 30 OFFSET ' . (($page - 1) * 30))->fetchAll();
            $ids = array_map(static fn(array $item): int => (int)$item['id'], $items);
            $notes = [];
            if ($ids) {
                $placeholders = implode(',', array_fill(0, count($ids), '?'));
                foreach ($this->db->query("SELECT n.id, n.inquiry_id, n.note, n.created_at, u.name AS author_name FROM inquiry_notes n JOIN admin_users u ON u.id = n.author_id WHERE n.inquiry_id IN ($placeholders) ORDER BY n.id", $ids)->fetchAll() as $note) {
                    $notes[(int)$note['inquiry_id']][] = $note;
                }
            }
            foreach ($items as &$item) $item['notes'] = $notes[(int)$item['id']] ?? [];
            unset($item);
            $assignees = $this->db->query('SELECT id, name FROM admin_users WHERE active = 1 ORDER BY name, id')->fetchAll();
            Http::json(['items' => $items, 'assignees' => $assignees, 'total' => $total, 'page' => $page, 'pages' => max(1, (int)ceil($total / 30))]);
        }
        if ($method === 'PATCH' && preg_match('~^/api/v1/admin/inquiries/([0-9]+)$~', $path, $match)) {
            $input = Http::body();
            $status = $input['status'] ?? null;
            $assignedTo = $input['assigned_to'] ?? null;
            if ($status !== null && !in_array($status, ['new', 'in_progress', 'closed'], true)) Http::fail(422, 'Invalid enquiry status.');
            if ($assignedTo !== null && (!is_int($assignedTo) || $assignedTo < 1)) Http::fail(422, 'Invalid assignee.');
            if ($status === null && !array_key_exists('assigned_to', $input)) Http::fail(422, 'Choose a status or assignee.');
            $this->db->transaction(function () use ($status, $assignedTo, $input, $match, $user) {
                if (!$this->db->query('SELECT id FROM inquiries WHERE id = ? FOR UPDATE', [$match[1]])->fetch()) Http::fail(404, 'Enquiry not found.');
                if ($assignedTo !== null && !$this->db->query('SELECT id FROM admin_users WHERE id = ? AND active = 1', [$assignedTo])->fetch()) Http::fail(422, 'Choose an active assignee.');
                if ($status !== null) $this->db->query('UPDATE inquiries SET status = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?', [$status, $match[1]]);
                if (array_key_exists('assigned_to', $input)) $this->db->query('UPDATE inquiries SET assigned_to = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?', [$assignedTo, $match[1]]);
                $this->db->audit((int)$user['id'], 'update_inquiry', 'inquiries', (int)$match[1]);
            });
            Http::json(['ok' => true]);
        }
        if ($method === 'POST' && preg_match('~^/api/v1/admin/inquiries/([0-9]+)/notes$~', $path, $match)) {
            $note = Http::string(Http::body(), 'note', 2000, true);
            $created = $this->db->transaction(function () use ($note, $match, $user) {
                if (!$this->db->query('SELECT id FROM inquiries WHERE id = ? FOR UPDATE', [$match[1]])->fetch()) Http::fail(404, 'Enquiry not found.');
                $this->db->query('INSERT INTO inquiry_notes (inquiry_id, author_id, note, created_at) VALUES (?, ?, ?, UTC_TIMESTAMP())', [$match[1], $user['id'], $note]);
                $id = (int)$this->db->pdo->lastInsertId();
                $this->db->audit((int)$user['id'], 'add_note', 'inquiries', (int)$match[1]);
                return $this->db->query('SELECT n.id, n.inquiry_id, n.note, n.created_at, u.name AS author_name FROM inquiry_notes n JOIN admin_users u ON u.id = n.author_id WHERE n.id = ?', [$id])->fetch();
            });
            Http::json($created, 201);
        }
        if ($path === '/api/v1/admin/users') {
            $auth->owner();
            if ($method === 'GET') Http::json(['items' => $this->db->query('SELECT id, name, email, role, active FROM admin_users ORDER BY id')->fetchAll()]);
            if ($method === 'POST') {
                $data = Http::body();
                $name = Http::string($data, 'name', 120, true);
                $email = strtolower(Http::string($data, 'email', 190, true));
                $password = Http::password($data);
                $role = $data['role'] ?? 'editor';
                if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 12 || !in_array($role, ['owner', 'editor'], true)) Http::fail(422, 'Enter a valid email, role and password of at least 12 characters.');
                // Bcrypt has a 72-byte input limit; reject instead of silently truncating.
                if (strlen($password) > 72) Http::fail(422, 'Password must be at most 72 bytes.');
                try {
                    $this->db->transaction(function () use ($name, $email, $password, $role, $user) {
                        $this->db->query('INSERT INTO admin_users (name, email, password_hash, role, created_at, updated_at) VALUES (?, ?, ?, ?, UTC_TIMESTAMP(), UTC_TIMESTAMP())', [$name, $email, password_hash($password, PASSWORD_DEFAULT), $role]);
                        $this->db->audit((int)$user['id'], 'create_user', 'users', (int)$this->db->pdo->lastInsertId());
                    });
                } catch (PDOException $error) { if ($error->getCode() === '23000') Http::fail(409, 'An account with this email already exists.'); throw $error; }
                Http::json(['ok' => true], 201);
            }
        }
        if ($method === 'PATCH' && preg_match('~^/api/v1/admin/users/([0-9]+)$~', $path, $match)) {
            $auth->owner();
            $data = Http::body();
            $id = (int)$match[1];
            if ($id === (int)$user['id']) Http::fail(422, 'You cannot deactivate your own account.');
            if (!is_bool($data['active'] ?? null)) Http::fail(422, 'Choose the account access state.');
            $this->db->transaction(function () use ($id, $data, $user) {
                $owners = $this->db->query("SELECT id FROM admin_users WHERE role = 'owner' AND active = 1 ORDER BY id FOR UPDATE")->fetchAll();
                $account = $this->db->query('SELECT id, role, active FROM admin_users WHERE id = ? FOR UPDATE', [$id])->fetch();
                if (!$account) Http::fail(404, 'Account not found.');
                if (!$data['active'] && $account['role'] === 'owner' && (int)$account['active'] && count($owners) <= 1) Http::fail(422, 'At least one active owner is required.');
                $this->db->query('UPDATE admin_users SET active = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?', [$data['active'] ? 1 : 0, $id]);
                $this->db->audit((int)$user['id'], $data['active'] ? 'activate_user' : 'deactivate_user', 'users', $id);
            });
            Http::json(['ok' => true]);
        }
        Http::fail(404, 'API endpoint not found.');
    }
}
