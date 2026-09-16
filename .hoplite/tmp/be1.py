p='backend/app/Api.php'; s=open(p).read()

# 1. Inquiries: filters + CSV export + status counts
old=s[s.index("        if ($method === 'GET' && $path === '/api/v1/admin/inquiries') {"):s.index("        if ($method === 'PATCH' && preg_match('~^/api/v1/admin/inquiries/([0-9]+)$~', $path, $match)) {")]
new='''        if ($method === 'GET' && ($path === '/api/v1/admin/inquiries' || $path === '/api/v1/admin/inquiries/export')) {
            [$where, $params] = $this->inboxFilter('i', ['new', 'in_progress', 'closed'], ['i.name', 'i.email', 'i.company', 'i.subject', 'i.reference']);
            if ($path === '/api/v1/admin/inquiries/export') {
                $rows = $this->db->query("SELECT i.reference, i.created_at, i.status, u.name AS assignee, i.name, i.email, i.phone, i.company, i.subject, i.message, i.source FROM inquiries i LEFT JOIN admin_users u ON u.id = i.assigned_to WHERE $where ORDER BY i.id DESC LIMIT 5000", $params)->fetchAll();
                $this->db->audit((int)$user['id'], 'export_inquiries', 'inquiries');
                $this->csv('enquiries', ['Reference', 'Received (UTC)', 'Status', 'Assigned to', 'Name', 'Email', 'Phone', 'Company', 'Subject', 'Message', 'Source'], $rows);
            }
            $page = max(1, min(100000, (int)($_GET['page'] ?? 1)));
            $total = (int)$this->db->query("SELECT COUNT(*) FROM inquiries i WHERE $where", $params)->fetchColumn();
            $items = $this->db->query("SELECT i.*, u.name AS assignee_name FROM inquiries i LEFT JOIN admin_users u ON u.id = i.assigned_to WHERE $where ORDER BY i.id DESC LIMIT 30 OFFSET " . (($page - 1) * 30), $params)->fetchAll();
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
            $counts = [];
            foreach ($this->db->query('SELECT status, COUNT(*) AS n FROM inquiries GROUP BY status')->fetchAll() as $row) $counts[$row['status']] = (int)$row['n'];
            Http::json(['items' => $items, 'assignees' => $assignees, 'counts' => $counts, 'total' => $total, 'page' => $page, 'pages' => max(1, (int)ceil($total / 30))]);
        }
'''
s=s.replace(old,new)

# 2. Applications: filters, export, notes
old="        if ($method === 'GET' && $path === '/api/v1/admin/applications') Http::json($this->applications->listing());\n"
new='''        if ($method === 'GET' && ($path === '/api/v1/admin/applications' || $path === '/api/v1/admin/applications/export')) {
            [$where, $params] = $this->inboxFilter('a', ['new', 'reviewing', 'interview', 'rejected', 'hired', 'withdrawn'], ['a.name', 'a.email', 'a.job_title', 'a.reference']);
            if ($path === '/api/v1/admin/applications/export') {
                $rows = $this->db->query("SELECT a.reference, a.created_at, a.status, u.name AS assignee, a.job_title, a.name, a.email, a.phone, a.locale FROM job_applications a LEFT JOIN admin_users u ON u.id = a.assigned_to WHERE $where ORDER BY a.id DESC LIMIT 5000", $params)->fetchAll();
                $this->db->audit((int)$user['id'], 'export_applications', 'applications');
                $this->csv('applications', ['Reference', 'Received (UTC)', 'Status', 'Assigned to', 'Vacancy', 'Name', 'Email', 'Phone', 'Language'], $rows);
            }
            Http::json($this->applications->listing($where, $params));
        }
        if ($method === 'POST' && preg_match('~^/api/v1/admin/applications/([0-9]+)/notes$~', $path, $match)) {
            $this->applications->addNote((int)$match[1], Http::body(), $user); Http::json(['ok' => true], 201);
        }
'''
assert old in s; s=s.replace(old,new)

# 3. Mail outbox retry (owner)
old="        if ($method === 'GET' && $path === '/api/v1/admin/modules') Http::json($this->content->modules);\n"
new='''        if ($method === 'GET' && $path === '/api/v1/admin/modules') Http::json($this->content->modules);
        if ($method === 'POST' && $path === '/api/v1/admin/outbox/retry') {
            $auth->owner();
            $count = $this->db->query("UPDATE email_outbox SET status='pending', attempts=0, next_attempt_at=UTC_TIMESTAMP(), last_error=NULL WHERE status='failed'")->rowCount();
            $this->db->audit((int)$user['id'], 'retry_outbox', 'outbox');
            Http::json(['ok' => true, 'requeued' => $count]);
        }
'''
assert old in s; s=s.replace(old,new)

# 4. Media alt update
old="        if ($method === 'DELETE' && preg_match('~^/api/v1/admin/media/([0-9]+)$~',$path,$match)) {"
new='''        if ($method === 'PATCH' && preg_match('~^/api/v1/admin/media/([0-9]+)$~',$path,$match)) {
            $alt = Http::string(Http::body(), 'alt', 300, true);
            if (!$this->db->query('SELECT id FROM media_assets WHERE id = ? AND deleted_at IS NULL', [$match[1]])->fetch()) Http::fail(404, 'Image not found.');
            $this->db->query('UPDATE media_assets SET alt = ? WHERE id = ?', [$alt, $match[1]]);
            $this->db->audit((int)$user['id'], 'update_media_alt', 'media', (int)$match[1]);
            Http::json(['ok' => true]);
        }
        if ($method === 'DELETE' && preg_match('~^/api/v1/admin/media/([0-9]+)$~',$path,$match)) {'''
assert old in s; s=s.replace(old,new)
open(p,'w').write(s)
print('be1 ok')
