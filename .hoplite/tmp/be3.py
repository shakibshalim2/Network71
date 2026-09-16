p='backend/app/Api.php'; s=open(p).read()

# 1. Self-service password change
old="        if ($method === 'POST' && $path === '/api/v1/auth/logout') { $auth->logout(); Http::json(['ok' => true]); }\n"
new=old+'''        if ($method === 'POST' && $path === '/api/v1/auth/change-password') {
            $me = $auth->user();
            $data = Http::body();
            $current = is_string($data['current_password'] ?? null) ? $data['current_password'] : '';
            $next = is_string($data['password'] ?? null) ? $data['password'] : '';
            $this->db->throttle('change-password:' . $me['id'], 10, 900);
            if (strlen($next) < 12 || strlen($next) > 72) Http::fail(422, 'Use a new password of 12–72 bytes.');
            if ($next === $current) Http::fail(422, 'Choose a password you have not used just now.');
            $row = $this->db->query('SELECT password_hash FROM admin_users WHERE id = ?', [$me['id']])->fetch();
            if (!$row || !password_verify($current, $row['password_hash'])) Http::fail(422, 'Your current password is incorrect.');
            $hash = password_hash($next, PASSWORD_DEFAULT);
            $this->db->query('UPDATE admin_users SET password_hash = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?', [$hash, $me['id']]);
            $this->db->query('UPDATE password_resets SET used_at = UTC_TIMESTAMP() WHERE user_id = ? AND used_at IS NULL', [$me['id']]);
            // Keep this session valid; every other session for the account is invalidated by the credential version check.
            $_SESSION['credential_version'] = hash('sha256', $hash);
            $this->db->audit((int)$me['id'], 'change_password', 'users', (int)$me['id']);
            Http::json(['ok' => true]);
        }
'''
assert old in s; s=s.replace(old,new)

# 2. Audit log screen (owner) with filters + pagination
old="        if ($method === 'GET' && $path === '/api/v1/admin/dashboard') {"
new='''        if ($method === 'GET' && $path === '/api/v1/admin/audit') {
            $auth->owner();
            $where = ['1=1']; $params = [];
            $entity = is_string($_GET['entity'] ?? null) ? $_GET['entity'] : '';
            if ($entity !== '') { if (!preg_match('/^[a-z_-]{1,60}$/', $entity)) Http::fail(422, 'Invalid entity filter.'); $where[] = 'a.entity = ?'; $params[] = $entity; }
            $actor = $_GET['actor'] ?? '';
            if ($actor !== '' && ctype_digit((string)$actor)) { $where[] = 'a.actor_id = ?'; $params[] = (int)$actor; }
            $q = trim(is_string($_GET['q'] ?? null) ? $_GET['q'] : '');
            if (strlen($q) > 60) Http::fail(422, 'Search is too long.');
            if ($q !== '') { $where[] = 'a.action LIKE ?'; $params[] = '%' . str_replace(['%', '_'], ['\\\\%', '\\\\_'], $q) . '%'; }
            $sql = implode(' AND ', $where);
            $page = max(1, min(100000, (int)($_GET['page'] ?? 1)));
            $total = (int)$this->db->query("SELECT COUNT(*) FROM audit_logs a WHERE $sql", $params)->fetchColumn();
            $items = $this->db->query("SELECT a.id, a.action, a.entity, a.entity_id, a.created_at, u.name AS actor_name FROM audit_logs a LEFT JOIN admin_users u ON u.id = a.actor_id WHERE $sql ORDER BY a.id DESC LIMIT 50 OFFSET " . (($page - 1) * 50), $params)->fetchAll();
            $entities = array_column($this->db->query('SELECT DISTINCT entity FROM audit_logs ORDER BY entity')->fetchAll(), 'entity');
            $actors = $this->db->query('SELECT id, name FROM admin_users ORDER BY name, id')->fetchAll();
            Http::json(['items' => $items, 'entities' => $entities, 'actors' => $actors, 'total' => $total, 'page' => $page, 'pages' => max(1, (int)ceil($total / 50))]);
        }
        if ($method === 'GET' && $path === '/api/v1/admin/dashboard') {'''
assert old in s; s=s.replace(old,new)

# 3. Delete a note (author or owner) — both inboxes
old="        if ($method === 'GET' && ($path === '/api/v1/admin/applications' || $path === '/api/v1/admin/applications/export')) {"
new='''        if ($method === 'DELETE' && preg_match('~^/api/v1/admin/(inquiries|applications)/([0-9]+)/notes/([0-9]+)$~', $path, $match)) {
            [$table, $column] = $match[1] === 'inquiries' ? ['inquiry_notes', 'inquiry_id'] : ['application_notes', 'application_id'];
            $note = $this->db->query("SELECT id, author_id FROM $table WHERE id = ? AND $column = ?", [$match[3], $match[2]])->fetch();
            if (!$note) Http::fail(404, 'Note not found.');
            if ((int)$note['author_id'] !== (int)$user['id'] && $user['role'] !== 'owner') Http::fail(403, 'Only the author or an owner can remove a note.');
            $this->db->query("DELETE FROM $table WHERE id = ?", [$match[3]]);
            $this->db->audit((int)$user['id'], 'delete_note', $match[1], (int)$match[2]);
            Http::json(['ok' => true]);
        }
        if ($method === 'GET' && ($path === '/api/v1/admin/applications' || $path === '/api/v1/admin/applications/export')) {'''
assert old in s; s=s.replace(old,new)

# 4. Media search
old='''                $total = (int)$this->db->query('SELECT COUNT(*) FROM media_assets WHERE deleted_at IS NULL')->fetchColumn();
                Http::json(['items' => $this->db->query('SELECT id, filename, alt, width, height, bytes, created_at FROM media_assets WHERE deleted_at IS NULL ORDER BY id DESC LIMIT 24 OFFSET ' . (($page - 1) * 24))->fetchAll(), 'page' => $page, 'pages' => max(1, (int)ceil($total / 24)), 'total' => $total]);'''
new='''                $q = trim(is_string($_GET['q'] ?? null) ? $_GET['q'] : '');
                if (strlen($q) > 150) Http::fail(422, 'Search is too long.');
                $where = 'deleted_at IS NULL'; $params = [];
                if ($q !== '') { $like = '%' . str_replace(['%', '_'], ['\\\\%', '\\\\_'], $q) . '%'; $where .= ' AND (alt LIKE ? OR original_name LIKE ? OR filename LIKE ?)'; $params = [$like, $like, $like]; }
                $total = (int)$this->db->query("SELECT COUNT(*) FROM media_assets WHERE $where", $params)->fetchColumn();
                Http::json(['items' => $this->db->query("SELECT id, filename, original_name, alt, width, height, bytes, created_at FROM media_assets WHERE $where ORDER BY id DESC LIMIT 24 OFFSET " . (($page - 1) * 24), $params)->fetchAll(), 'page' => $page, 'pages' => max(1, (int)ceil($total / 24)), 'total' => $total]);'''
assert old in s; s=s.replace(old,new)

# 5. Translation lookup: GET /admin/content/{module}/{id}/translation → the record in the other locale (by slug), or null
old="        if ($method === 'GET' && preg_match('~^/api/v1/admin/content/([a-z-]+)/([0-9]+)/history$~', $path, $match)) {"
new='''        if ($method === 'GET' && preg_match('~^/api/v1/admin/content/([a-z-]+)/([0-9]+)/translation$~', $path, $match)) {
            $this->content->schema($match[1]);
            $row = $this->db->query('SELECT slug, locale FROM content_records WHERE id = ? AND module = ?', [$match[2], $match[1]])->fetch();
            if (!$row) Http::fail(404, 'Record not found.');
            $other = $row['locale'] === 'en' ? 'bn' : 'en';
            $twin = $this->db->query('SELECT id, slug, locale, status, review_state FROM content_records WHERE module = ? AND slug = ? AND locale = ?', [$match[1], $row['slug'], $other])->fetch();
            Http::json(['locale' => $other, 'record' => $twin ?: null]);
        }
        if ($method === 'GET' && preg_match('~^/api/v1/admin/content/([a-z-]+)/([0-9]+)/history$~', $path, $match)) {'''
assert old in s; s=s.replace(old,new)
open(p,'w').write(s)

# fix python-doubled backslashes inside PHP single-quoted strings
s=open(p).read().replace("['\\\\\\\\%', '\\\\\\\\_']","['\\\\%', '\\\\_']")
open(p,'w').write(s)
print('be3 ok')
