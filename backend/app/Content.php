<?php
declare(strict_types=1);

final class Content
{
    public function __construct(private Database $db, public array $modules) {}

    public function schema(string $module): array
    {
        return $this->modules[$module] ?? Http::fail(404, 'Content module not found.');
    }

    public function validate(string $module, array $data): array
    {
        $clean = [];
        foreach ($this->schema($module)['fields'] as $field) {
            $key = $field['key'];
            if ($field['type'] === 'checkbox') {
                $clean[$key] = ($data[$key] ?? false) === true;
                // Permissions are required for publication, but incomplete drafts can be saved.
                continue;
            }
            $value = Http::string($data, $key, in_array($field['type'], ['textarea', 'urls'], true) ? 20000 : 1000, $key === 'title');
            if ($value !== '') {
                if ($field['type'] === 'select' && !in_array($value, $field['options'], true)) Http::fail(422, "Invalid {$field['label']}.");
                if ($field['type'] === 'email' && !filter_var($value, FILTER_VALIDATE_EMAIL)) Http::fail(422, "Invalid {$field['label']}.");
                if (in_array($field['type'], ['url', 'image', 'link'], true)) {
                    $local = str_starts_with($value, '/') && !str_starts_with($value, '//') && !str_contains($value, '\\') && !preg_match('/[\x00-\x20]/', $value);
                    $web = filter_var($value, FILTER_VALIDATE_URL) && in_array(strtolower(parse_url($value, PHP_URL_SCHEME) ?? ''), ['https', 'http'], true);
                    if (!$web && !($field['type'] !== 'url' && $local)) Http::fail(422, "Use a valid web URL for {$field['label']}.");
                }
                if ($field['type'] === 'urls') {
                    $lines = preg_split('/\R/u', $value) ?: [];
                    $cleanLines = [];
                    foreach ($lines as $line) {
                        $url = trim($line);
                        if ($url === '') continue;
                        $local = str_starts_with($url, '/') && !str_starts_with($url, '//') && !str_contains($url, '\\') && !preg_match('/[\x00-\x20]/', $url);
                        $web = filter_var($url, FILTER_VALIDATE_URL) && in_array(strtolower(parse_url($url, PHP_URL_SCHEME) ?? ''), ['https', 'http'], true);
                        if (!$web && !$local) Http::fail(422, "Use one valid web or media URL per line for {$field['label']}.");
                        $cleanLines[] = $url;
                    }
                    if (count($cleanLines) > 30) Http::fail(422, "Use no more than 30 URLs for {$field['label']}.");
                    $value = implode("\n", $cleanLines);
                }
                if ($field['type'] === 'path' && !preg_match('~^/(?:[a-z0-9-]+/?)*$~', $value)) Http::fail(422, 'Use a valid website path.');
                if ($field['type'] === 'date') {
                    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);
                    if (!$date || $date->format('Y-m-d') !== $value) Http::fail(422, 'Use a valid date.');
                }
            }
            $clean[$key] = $value;
        }
        return $clean;
    }

    public function list(string $module, bool $public = false): array
    {
        $this->schema($module);
        $page = max(1, min(100000, (int)($_GET['page'] ?? 1)));
        $limit = 30;
        $where = 'module = ? AND locale = ?' . ($public ? " AND status = 'published' AND published_json IS NOT NULL" : '');
        $params = [$module, Sections::locale()];
        $q = trim(is_string($_GET['q'] ?? null) ? $_GET['q'] : '');
        if (strlen($q) > 150) Http::fail(422, 'Search is too long.');
        if ($q !== '') { $where .= $public ? ' AND (published_json LIKE ? OR slug LIKE ?)' : ' AND (draft_json LIKE ? OR slug LIKE ?)'; $params[] = '%' . $q . '%'; $params[] = '%' . $q . '%'; }
        $status = !$public && is_string($_GET['status'] ?? null) ? $_GET['status'] : '';
        if ($status !== '') {
            if (!in_array($status, ['draft', 'published', 'archived', 'in_review', 'approved', 'changes'], true)) Http::fail(422, 'Invalid status filter.');
            if ($status === 'in_review' || $status === 'approved') $where .= " AND review_state = '$status'";
            elseif ($status === 'changes') $where .= " AND status = 'published' AND draft_json <> published_json";
            else $where .= " AND status = '$status'";
        }
        $count = (int)$this->db->query("SELECT COUNT(*) FROM content_records WHERE $where", $params)->fetchColumn();
        $column = $public ? 'published_json' : 'draft_json';
        $order = $public ? 'published_sort_order' : 'sort_order';
        $rows = $this->db->query("SELECT id, module, slug, locale, $column AS payload, status, version, $order AS sort_order, updated_at, published_at, review_requested_at, review_state FROM content_records WHERE $where ORDER BY $order, id DESC LIMIT $limit OFFSET " . (($page - 1) * $limit), $params)->fetchAll();
        foreach ($rows as &$row) {
            $row['data'] = json_decode($row['payload'], true, 32, JSON_THROW_ON_ERROR);
            unset($row['payload']);
            if ($public) unset($row['version'], $row['updated_at'], $row['review_requested_at'], $row['review_state']);
        }
        return ['items' => $rows, 'total' => $count, 'page' => $page, 'pages' => max(1, (int)ceil($count / $limit))];
    }

    public function save(string $module, ?int $id, array $input, array $user): array
    {
        $this->schema($module);
        if (in_array($module, ['settings', 'navigation'], true) && $user['role'] !== 'owner') Http::fail(403, 'Only an owner can edit website settings and navigation.');
        $locale = Sections::locale($input['locale'] ?? 'en');
        $slug = Http::string($input, 'slug', 160, true);
        if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) Http::fail(422, 'Slug must use lowercase letters, numbers and hyphens.');
        if (!is_array($input['data'] ?? null)) Http::fail(422, 'Content fields are missing.');
        $data = $this->validate($module, $input['data']);
        $order = filter_var($input['sort_order'] ?? 0, FILTER_VALIDATE_INT);
        if ($order === false || abs($order) > 100000) Http::fail(422, 'Invalid display order.');
        try {
            return $this->db->transaction(function () use ($module, $id, $input, $user, $slug, $data, $order, $locale) {
                $json = json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
                if ($id) {
                    $old = $this->db->query('SELECT * FROM content_records WHERE id = ? AND module = ? FOR UPDATE', [$id, $module])->fetch();
                    if (!$old) Http::fail(404, 'Record not found.');
                    if ($old['locale'] !== $locale) Http::fail(422, 'A record cannot change language. Create a separate translation.');
                    if ((int)$old['version'] !== (int)($input['version'] ?? 0)) Http::fail(409, 'Someone updated this item. Reload before saving.');
                    if ($old['published_at'] && $old['slug'] !== $slug) Http::fail(422, 'Published slugs are locked to preserve public links.');
                    $this->db->query("UPDATE content_records SET slug=?,draft_json=?,version=version+1,sort_order=?,review_requested_at=NULL,review_requested_by=NULL,review_state='draft',review_version=NULL,approved_at=NULL,approved_by=NULL,updated_by=?,updated_at=UTC_TIMESTAMP() WHERE id=?", [$slug, $json, $order, $user['id'], $id]);
                } else {
                    $this->db->query('INSERT INTO content_records (module, slug, draft_json, sort_order, updated_by, locale, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, UTC_TIMESTAMP(), UTC_TIMESTAMP())', [$module, $slug, $json, $order, $user['id'], $locale]);
                    $id = (int)$this->db->pdo->lastInsertId();
                }
                $version = (int)$this->db->query('SELECT version FROM content_records WHERE id = ?', [$id])->fetchColumn();
                $this->db->query('INSERT INTO content_revisions (record_id, version, event, snapshot_json, sort_order, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, UTC_TIMESTAMP())', [$id, $version, 'save_draft', $json, $order, $user['id']]);
                $this->db->audit((int)$user['id'], 'save_draft', $module, $id);
                return ['id' => $id, 'version' => $version];
            });
        } catch (PDOException $error) {
            if ($error->getCode() === '23000') Http::fail(409, 'This slug already exists in this module.');
            throw $error;
        }
    }

    public function transition(string $module, int $id, array $input, array $user): void
    {
        $this->schema($module);
        $action = $input['action'] ?? '';
        if (!in_array($action, ['request_review', 'approve', 'publish', 'archive', 'unpublish'], true)) Http::fail(422, 'Unknown publishing action.');
        if ($action !== 'request_review' && $user['role'] !== 'owner') Http::fail(403, 'Only an owner can publish or archive content.');
        $this->db->transaction(function () use ($module, $id, $input, $user, $action) {
            $row = $this->db->query('SELECT * FROM content_records WHERE id = ? AND module = ? FOR UPDATE', [$id, $module])->fetch();
            if (!$row) Http::fail(404, 'Record not found.');
            if ((int)$row['version'] !== (int)($input['version'] ?? 0)) Http::fail(409, 'Record changed. Reload before continuing.');
            if ($action === 'request_review') {
                $this->db->query("UPDATE content_records SET review_requested_at=UTC_TIMESTAMP(),review_requested_by=?,review_state='in_review',review_version=version,approved_at=NULL,approved_by=NULL,updated_at=UTC_TIMESTAMP() WHERE id=?", [$user['id'], $id]);
            } elseif ($action === 'approve') {
                if ($row['review_state'] !== 'in_review' || (int)$row['review_version'] !== (int)$row['version']) Http::fail(422, 'Request review for the current draft before approval.');
                $this->db->query("UPDATE content_records SET review_state='approved',approved_at=UTC_TIMESTAMP(),approved_by=?,updated_at=UTC_TIMESTAMP() WHERE id=?",[$user['id'],$id]);
            } elseif ($action === 'publish') {
                if ($row['review_state'] !== 'approved' || (int)$row['review_version'] !== (int)$row['version']) Http::fail(422, 'The current draft must be reviewed and approved before publishing.');
                $data = json_decode($row['draft_json'], true, 32, JSON_THROW_ON_ERROR);
                foreach ($this->schema($module)['fields'] as $field) {
                    if ($field['required'] && empty($data[$field['key']])) Http::fail(422, "Complete {$field['label']} before publishing.");
                }
                $this->db->query("UPDATE content_records SET published_json=draft_json,published_sort_order=sort_order,status='published',version=version+1,published_at=UTC_TIMESTAMP(),review_requested_at=NULL,review_requested_by=NULL,review_state='published',review_version=NULL,approved_at=NULL,approved_by=NULL,updated_at=UTC_TIMESTAMP(),updated_by=? WHERE id=?", [$user['id'], $id]);
            } else {
                $this->db->query("UPDATE content_records SET status=?,version=version+1,review_requested_at=NULL,review_requested_by=NULL,review_state='draft',review_version=NULL,approved_at=NULL,approved_by=NULL,updated_at=UTC_TIMESTAMP(),updated_by=? WHERE id=?", [$action === 'archive' ? 'archived' : 'draft', $user['id'], $id]);
            }
            $version = (int)$this->db->query('SELECT version FROM content_records WHERE id = ?', [$id])->fetchColumn();
            $this->db->query('INSERT INTO content_revisions (record_id, version, event, snapshot_json, sort_order, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, UTC_TIMESTAMP())', [$id, $version, $action, $row['draft_json'], $row['sort_order'], $user['id']]);
            $this->db->audit((int)$user['id'], $action, $module, $id);
        });
    }

    public function history(string $module, int $id): array
    {
        $this->schema($module);
        if (!$this->db->query('SELECT id FROM content_records WHERE id = ? AND module = ?', [$id, $module])->fetch()) Http::fail(404, 'Record not found.');
        return $this->db->query('SELECT r.id, r.version, r.event, r.sort_order, r.created_at, u.name AS author_name FROM content_revisions r JOIN admin_users u ON u.id = r.created_by WHERE r.record_id = ? ORDER BY r.id DESC LIMIT 50', [$id])->fetchAll();
    }

    public function revision(string $module, int $id, int $revisionId): array
    {
        $this->schema($module);
        $row=$this->db->query('SELECT r.id,r.version,r.event,r.snapshot_json,r.sort_order,r.created_at,u.name AS author_name FROM content_revisions r JOIN content_records c ON c.id=r.record_id JOIN admin_users u ON u.id=r.created_by WHERE r.id=? AND r.record_id=? AND c.module=?',[$revisionId,$id,$module])->fetch();
        if(!$row) Http::fail(404,'Revision not found.');
        $row['snapshot']=json_decode($row['snapshot_json'],true,32,JSON_THROW_ON_ERROR);unset($row['snapshot_json']);
        return $row;
    }

    public function restore(string $module,int $id,array $input,array $user): array
    {
        $this->schema($module);
        if (in_array($module,['settings','navigation'],true) && $user['role']!=='owner') Http::fail(403,'Only an owner can restore website settings and navigation.');
        $revisionId=filter_var($input['revision_id']??null,FILTER_VALIDATE_INT);
        if(!$revisionId) Http::fail(422,'Choose a revision to restore.');
        return $this->db->transaction(function () use ($module,$id,$input,$user,$revisionId): array {
            $record=$this->db->query('SELECT * FROM content_records WHERE id=? AND module=? FOR UPDATE',[$id,$module])->fetch();
            if(!$record) Http::fail(404,'Record not found.');
            if((int)$record['version']!==(int)($input['version']??0)) Http::fail(409,'Record changed. Reload before restoring.');
            $revision=$this->db->query('SELECT snapshot_json,sort_order FROM content_revisions WHERE id=? AND record_id=?',[$revisionId,$id])->fetch();
            if(!$revision) Http::fail(404,'Revision not found.');
            $snapshot=$this->validate($module,json_decode($revision['snapshot_json'],true,32,JSON_THROW_ON_ERROR));
            $json=json_encode($snapshot,JSON_THROW_ON_ERROR|JSON_UNESCAPED_UNICODE);
            $this->db->query("UPDATE content_records SET draft_json=?,sort_order=?,version=version+1,review_requested_at=NULL,review_requested_by=NULL,review_state='draft',review_version=NULL,approved_at=NULL,approved_by=NULL,updated_by=?,updated_at=UTC_TIMESTAMP() WHERE id=?",[$json,$revision['sort_order'],$user['id'],$id]);
            $version=(int)$record['version']+1;
            $this->db->query("INSERT INTO content_revisions(record_id,version,event,snapshot_json,sort_order,created_by,created_at) VALUES (?,?, 'restore_revision',?,?,?,UTC_TIMESTAMP())",[$id,$version,$json,$revision['sort_order'],$user['id']]);
            $this->db->audit((int)$user['id'],'restore_revision',$module,$id);
            return ['version'=>$version];
        });
    }
}
