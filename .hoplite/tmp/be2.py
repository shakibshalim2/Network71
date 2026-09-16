p='backend/app/Api.php'; s=open(p).read()

# 5. Users PATCH: name/role alongside active
old='''            if ($id === (int)$user['id']) Http::fail(422, 'You cannot deactivate your own account.');
            if (!is_bool($data['active'] ?? null)) Http::fail(422, 'Choose the account access state.');
            $this->db->transaction(function () use ($id, $data, $user) {
                $owners = $this->db->query("SELECT id FROM admin_users WHERE role = 'owner' AND active = 1 ORDER BY id FOR UPDATE")->fetchAll();
                $account = $this->db->query('SELECT id, role, active FROM admin_users WHERE id = ? FOR UPDATE', [$id])->fetch();
                if (!$account) Http::fail(404, 'Account not found.');
                if (!$data['active'] && $account['role'] === 'owner' && (int)$account['active'] && count($owners) <= 1) Http::fail(422, 'At least one active owner is required.');
                $this->db->query('UPDATE admin_users SET active = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?', [$data['active'] ? 1 : 0, $id]);
                $this->db->audit((int)$user['id'], $data['active'] ? 'activate_user' : 'deactivate_user', 'users', $id);
            });
            Http::json(['ok' => true]);'''
new='''            $hasActive = array_key_exists('active', $data);
            $hasRole = array_key_exists('role', $data);
            $hasName = array_key_exists('name', $data);
            if (!$hasActive && !$hasRole && !$hasName) Http::fail(422, 'Choose what to change.');
            if ($hasActive && !is_bool($data['active'])) Http::fail(422, 'Choose the account access state.');
            if ($hasRole && !in_array($data['role'], ['owner', 'editor'], true)) Http::fail(422, 'Choose a valid role.');
            $name = $hasName ? Http::string($data, 'name', 120, true) : null;
            if ($id === (int)$user['id'] && (($hasActive && !$data['active']) || ($hasRole && $data['role'] !== 'owner'))) Http::fail(422, 'You cannot remove your own access.');
            $this->db->transaction(function () use ($id, $data, $user, $hasActive, $hasRole, $hasName, $name) {
                $owners = $this->db->query("SELECT id FROM admin_users WHERE role = 'owner' AND active = 1 ORDER BY id FOR UPDATE")->fetchAll();
                $account = $this->db->query('SELECT id, role, active FROM admin_users WHERE id = ? FOR UPDATE', [$id])->fetch();
                if (!$account) Http::fail(404, 'Account not found.');
                $isLastOwner = $account['role'] === 'owner' && (int)$account['active'] && count($owners) <= 1;
                if ($hasActive && !$data['active'] && $isLastOwner) Http::fail(422, 'At least one active owner is required.');
                if ($hasRole && $data['role'] === 'editor' && $isLastOwner) Http::fail(422, 'At least one active owner is required.');
                if ($hasActive) {
                    $this->db->query('UPDATE admin_users SET active = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?', [$data['active'] ? 1 : 0, $id]);
                    $this->db->audit((int)$user['id'], $data['active'] ? 'activate_user' : 'deactivate_user', 'users', $id);
                }
                if ($hasRole && $data['role'] !== $account['role']) {
                    $this->db->query('UPDATE admin_users SET role = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?', [$data['role'], $id]);
                    $this->db->audit((int)$user['id'], 'change_role_' . $data['role'], 'users', $id);
                }
                if ($hasName) {
                    $this->db->query('UPDATE admin_users SET name = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?', [$name, $id]);
                    $this->db->audit((int)$user['id'], 'rename_user', 'users', $id);
                }
            });
            Http::json(['ok' => true]);'''
assert old in s; s=s.replace(old,new)

# helpers
old="        Http::fail(404, 'API endpoint not found.');\n    }\n}"
new='''        Http::fail(404, 'API endpoint not found.');
    }

    /** Shared status / assignee / search filter for the two inboxes. Returns [whereSql, params]. */
    private function inboxFilter(string $alias, array $statuses, array $searchColumns): array
    {
        $where = ['1=1'];
        $params = [];
        $status = is_string($_GET['status'] ?? null) ? $_GET['status'] : '';
        if ($status !== '') {
            if (!in_array($status, $statuses, true)) Http::fail(422, 'Invalid status filter.');
            $where[] = "$alias.status = ?";
            $params[] = $status;
        }
        $assignee = $_GET['assignee'] ?? '';
        if ($assignee === 'unassigned') $where[] = "$alias.assigned_to IS NULL";
        elseif ($assignee !== '' && ctype_digit((string)$assignee)) { $where[] = "$alias.assigned_to = ?"; $params[] = (int)$assignee; }
        $q = trim(is_string($_GET['q'] ?? null) ? $_GET['q'] : '');
        if (strlen($q) > 150) Http::fail(422, 'Search is too long.');
        if ($q !== '') {
            $like = '%' . str_replace(['%', '_'], ['\\\\%', '\\\\_'], $q) . '%';
            $where[] = '(' . implode(' OR ', array_map(static fn(string $column): string => "$column LIKE ?", $searchColumns)) . ')';
            foreach ($searchColumns as $ignored) $params[] = $like;
        }
        return [implode(' AND ', $where), $params];
    }

    private function csv(string $name, array $headers, array $rows): never
    {
        http_response_code(200);
        header('Content-Type: text/csv; charset=utf-8');
        header('Cache-Control: private, no-store');
        header('X-Content-Type-Options: nosniff');
        header('Content-Disposition: attachment; filename="network71-' . $name . '-' . gmdate('Ymd-His') . '.csv"');
        $out = fopen('php://output', 'w');
        fwrite($out, "\\xEF\\xBB\\xBF");
        fputcsv($out, $headers);
        foreach ($rows as $row) {
            // Neutralise spreadsheet formula injection on user-supplied cells.
            fputcsv($out, array_map(static fn($cell): string => preg_replace('/^([=+\\-@\\t\\r])/', "'$1", (string)($cell ?? '')) ?? '', array_values($row)));
        }
        fclose($out);
        exit;
    }
}'''
assert old in s; s=s.replace(old,new)
open(p,'w').write(s)

# JobApplications: listing with filter + notes
p='backend/app/JobApplications.php'; s=open(p).read()
old=s[s.index('    public function listing(): array'):s.index('    public function update(int $id, array $input, array $user): void')]
new='''    public function listing(string $where = '1=1', array $params = []): array
    {
        $page = max(1, min(100000, (int)($_GET['page'] ?? 1)));
        $total = (int)$this->db->query("SELECT COUNT(*) FROM job_applications a WHERE $where", $params)->fetchColumn();
        $items = $this->db->query("SELECT a.id,a.reference,a.job_slug,a.job_title,a.locale,a.name,a.email,a.phone,a.cover_letter,a.resume_original_name,a.resume_bytes,a.status,a.assigned_to,a.created_at,u.name AS assignee_name FROM job_applications a LEFT JOIN admin_users u ON u.id=a.assigned_to WHERE $where ORDER BY a.id DESC LIMIT 30 OFFSET ".(($page-1)*30), $params)->fetchAll();
        $ids = array_map(static fn(array $item): int => (int)$item['id'], $items);
        $notes = [];
        if ($ids) {
            $placeholders = implode(',', array_fill(0, count($ids), '?'));
            foreach ($this->db->query("SELECT n.id, n.application_id, n.note, n.created_at, u.name AS author_name FROM application_notes n JOIN admin_users u ON u.id = n.author_id WHERE n.application_id IN ($placeholders) ORDER BY n.id", $ids)->fetchAll() as $note) {
                $notes[(int)$note['application_id']][] = $note;
            }
        }
        foreach ($items as &$item) $item['notes'] = $notes[(int)$item['id']] ?? [];
        unset($item);
        $assignees = $this->db->query('SELECT id,name FROM admin_users WHERE active=1 ORDER BY name,id')->fetchAll();
        $counts = [];
        foreach ($this->db->query('SELECT status, COUNT(*) AS n FROM job_applications GROUP BY status')->fetchAll() as $row) $counts[$row['status']] = (int)$row['n'];
        return ['items'=>$items,'assignees'=>$assignees,'counts'=>$counts,'total'=>$total,'page'=>$page,'pages'=>max(1,(int)ceil($total/30))];
    }

    public function addNote(int $id, array $input, array $user): void
    {
        $note = Http::string($input, 'note', 2000, true);
        $this->db->transaction(function () use ($id, $note, $user): void {
            if (!$this->db->query('SELECT id FROM job_applications WHERE id=? FOR UPDATE', [$id])->fetch()) Http::fail(404, 'Application not found.');
            $this->db->query('INSERT INTO application_notes (application_id, author_id, note, created_at) VALUES (?, ?, ?, UTC_TIMESTAMP())', [$id, $user['id'], $note]);
            $this->db->query('UPDATE job_applications SET updated_at=UTC_TIMESTAMP() WHERE id=?', [$id]);
            $this->db->audit((int)$user['id'], 'note_application', 'applications', $id);
        });
    }

'''
s=s.replace(old,new); open(p,'w').write(s)

# Content list: status filter
p='backend/app/Content.php'; s=open(p).read()
old="        if ($q !== '') { $where .= $public ? ' AND (published_json LIKE ? OR slug LIKE ?)' : ' AND (draft_json LIKE ? OR slug LIKE ?)'; $params[] = '%' . $q . '%'; $params[] = '%' . $q . '%'; }\n"
new=old+'''        $status = !$public && is_string($_GET['status'] ?? null) ? $_GET['status'] : '';
        if ($status !== '') {
            if (!in_array($status, ['draft', 'published', 'archived', 'in_review', 'approved', 'changes'], true)) Http::fail(422, 'Invalid status filter.');
            if ($status === 'in_review' || $status === 'approved') $where .= " AND review_state = '$status'";
            elseif ($status === 'changes') $where .= " AND status = 'published' AND draft_json <> published_json";
            else $where .= " AND status = '$status'";
        }
'''
assert old in s; s=s.replace(old,new); open(p,'w').write(s)

open('backend/database/010_application_notes.sql','w').write('''CREATE TABLE application_notes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT UNSIGNED NOT NULL,
    author_id BIGINT UNSIGNED NOT NULL,
    note TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (application_id) REFERENCES job_applications(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES admin_users(id),
    KEY application_notes_recent (application_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
''')
print('be2 ok')
