<?php
declare(strict_types=1);

final class Sections
{
    private array $catalog;
    public function __construct(private Database $db)
    {
        $this->catalog = json_decode(file_get_contents(dirname(__DIR__) . '/content/schema.json'), true, 64, JSON_THROW_ON_ERROR);
    }
    public static function locale(mixed $value = null): string
    {
        $locale = $value ?? ($_GET['locale'] ?? 'en');
        if (!in_array($locale, ['en','bn'], true)) Http::fail(422, 'Choose English or Bangla.');
        return $locale;
    }
    public function schema(string $page): array
    {
        return $this->catalog[$page] ?? Http::fail(404, 'Page not found.');
    }
    public function catalog(): array { return $this->catalog; }
    public function defaults(string $page, string $locale): array
    {
        $this->schema($page);
        return json_decode(file_get_contents(dirname(__DIR__) . "/content/seed.$locale.json"), true, 64, JSON_THROW_ON_ERROR)[$page];
    }
    public function read(string $page, string $locale, bool $public): array
    {
        $schema = $this->schema($page);
        $rows = $this->db->query('SELECT * FROM page_sections WHERE page_key = ? AND locale = ?' . ($public ? " AND status = 'published' AND published_json IS NOT NULL" : '') . ' ORDER BY ' . ($public ? 'published_sort_order' : 'sort_order') . ', id', [$page,$locale])->fetchAll();
        $sections = []; $meta = [];
        foreach ($rows as $row) {
            $key = $row['section_key'];
            $sections[$key] = json_decode($row[$public ? 'published_json' : 'draft_json'], true, 64, JSON_THROW_ON_ERROR);
            $meta[$key] = ['visible' => (bool)$row[$public ? 'published_visible' : 'draft_visible'], 'order' => (int)$row[$public ? 'published_sort_order' : 'sort_order']];
            if (!$public) $meta[$key] += ['version' => (int)$row['version'], 'status' => $row['status'], 'review_requested_at' => $row['review_requested_at'], 'review_state' => $row['review_state']];
        }
        $result = ['sections' => (object)$sections, 'meta' => (object)$meta];
        if (!$public) $result += ['schema' => $schema, 'defaults' => $this->defaults($page,$locale)];
        return $result;
    }
    public function save(string $page, string $section, array $input, array $user): array
    {
        if($page==='site' && $user['role']!=='owner') Http::fail(403,'Only an owner can edit shared site settings and navigation copy.');
        $field = $this->schema($page)['sections'][$section] ?? Http::fail(404, 'Section not found.');
        $locale = self::locale($input['locale'] ?? 'en');
        if (!array_key_exists('data', $input)) Http::fail(422, 'Section content is required.');
        $data = SectionValidation::clean($field,$input['data']);
        $json = json_encode($data,JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
        if (strlen($json) > 500000) Http::fail(413, 'Section is too large.');
        $order = filter_var($input['order'] ?? 0,FILTER_VALIDATE_INT);
        if ($order === false || abs($order) > 10000 || !is_bool($input['visible'] ?? null)) Http::fail(422, 'Check order and visibility.');
        try {
            return $this->db->transaction(function () use ($page,$section,$locale,$json,$order,$input,$user) {
                $old = $this->db->query('SELECT id, version FROM page_sections WHERE page_key = ? AND section_key = ? AND locale = ? FOR UPDATE',[$page,$section,$locale])->fetch();
                if ((int)($old['version'] ?? 0) !== (int)($input['version'] ?? -1)) Http::fail(409, 'Section changed. Reload before saving.');
                if ($old) {
                    $this->db->query("UPDATE page_sections SET draft_json=?,draft_visible=?,sort_order=?,version=version+1,review_requested_at=NULL,review_requested_by=NULL,review_state='draft',review_version=NULL,approved_at=NULL,approved_by=NULL,updated_by=?,updated_at=UTC_TIMESTAMP() WHERE id=?",[$json,(int)$input['visible'],$order,$user['id'],$old['id']]);
                } else {
                    $this->db->query('INSERT INTO page_sections (page_key,section_key,locale,draft_json,draft_visible,sort_order,updated_by,updated_at) VALUES (?,?,?,?,?,?,?,UTC_TIMESTAMP())',[$page,$section,$locale,$json,(int)$input['visible'],$order,$user['id']]);
                }
                $id = $old ? (int)$old['id'] : (int)$this->db->pdo->lastInsertId();
                $version = (int)($old['version'] ?? 0) + 1;
                $this->db->query('INSERT INTO section_revisions (section_id, version, event, snapshot_json, visible, sort_order, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP())',[$id,$version,'save_draft',$json,(int)$input['visible'],$order,$user['id']]);
                $this->db->audit((int)$user['id'],'save_section','page_sections',$id);
                return ['version' => $version];
            });
        } catch (PDOException $error) { if ($error->getCode()==='23000') Http::fail(409,'Section changed. Reload before saving.'); throw $error; }
    }
    public function transition(string $page,string $section,array $input,array $user): void
    {
        $this->schema($page);
        $locale=self::locale($input['locale'] ?? 'en');
        $action=$input['action'] ?? '';
        if (!in_array($action,['request_review','approve','publish','unpublish'],true)) Http::fail(422,'Unknown section action.');
        if ($action !== 'request_review' && $user['role'] !== 'owner') Http::fail(403,'Only an owner can publish sections.');
        $this->db->transaction(function () use ($page,$section,$locale,$action,$input,$user) {
            $row=$this->db->query('SELECT * FROM page_sections WHERE page_key=? AND section_key=? AND locale=? FOR UPDATE',[$page,$section,$locale])->fetch();
            if (!$row) Http::fail(404,'Save a draft first.');
            if ((int)$row['version'] !== (int)($input['version'] ?? 0)) Http::fail(409,'Section changed. Reload first.');
            if ($action==='request_review') {
                $this->db->query("UPDATE page_sections SET review_requested_at=UTC_TIMESTAMP(),review_requested_by=?,review_state='in_review',review_version=version,approved_at=NULL,approved_by=NULL,updated_at=UTC_TIMESTAMP() WHERE id=?",[$user['id'],$row['id']]);
            } elseif ($action==='approve') {
                if ($row['review_state']!=='in_review' || (int)$row['review_version']!==(int)$row['version']) Http::fail(422,'Request review for the current section draft before approval.');
                $this->db->query("UPDATE page_sections SET review_state='approved',approved_at=UTC_TIMESTAMP(),approved_by=?,updated_at=UTC_TIMESTAMP() WHERE id=?",[$user['id'],$row['id']]);
            } elseif ($action==='publish') {
                if ($row['review_state']!=='approved' || (int)$row['review_version']!==(int)$row['version']) Http::fail(422,'The current section draft must be reviewed and approved before publishing.');
                $this->db->query("UPDATE page_sections SET published_json=draft_json,published_visible=draft_visible,published_sort_order=sort_order,status='published',version=version+1,published_at=UTC_TIMESTAMP(),review_requested_at=NULL,review_requested_by=NULL,review_state='published',review_version=NULL,approved_at=NULL,approved_by=NULL,updated_at=UTC_TIMESTAMP() WHERE id=?",[$row['id']]);
            } else $this->db->query("UPDATE page_sections SET status='draft',version=version+1,review_requested_at=NULL,review_requested_by=NULL,review_state='draft',review_version=NULL,approved_at=NULL,approved_by=NULL,updated_at=UTC_TIMESTAMP() WHERE id=?",[$row['id']]);
            $version=(int)$this->db->query('SELECT version FROM page_sections WHERE id=?',[$row['id']])->fetchColumn();
            $this->db->query('INSERT INTO section_revisions (section_id, version, event, snapshot_json, visible, sort_order, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP())',[$row['id'],$version,$action,$row['draft_json'],$row['draft_visible'],$row['sort_order'],$user['id']]);
            $this->db->audit((int)$user['id'],$action.'_section','page_sections',(int)$row['id']);
        });
    }

    public function history(string $page,string $section,string $locale): array
    {
        $this->schema($page)['sections'][$section] ?? Http::fail(404,'Section not found.');
        $id=$this->db->query('SELECT id FROM page_sections WHERE page_key=? AND section_key=? AND locale=?',[$page,$section,$locale])->fetchColumn();
        if(!$id) return [];
        return $this->db->query('SELECT r.id,r.version,r.event,r.visible,r.sort_order,r.created_at,u.name AS author_name FROM section_revisions r JOIN admin_users u ON u.id=r.created_by WHERE r.section_id=? ORDER BY r.id DESC LIMIT 50',[$id])->fetchAll();
    }

    public function revision(string $page,string $section,string $locale,int $revisionId): array
    {
        $this->schema($page)['sections'][$section] ?? Http::fail(404,'Section not found.');
        $row=$this->db->query('SELECT r.id,r.version,r.event,r.snapshot_json,r.visible,r.sort_order,r.created_at,u.name AS author_name FROM section_revisions r JOIN page_sections s ON s.id=r.section_id JOIN admin_users u ON u.id=r.created_by WHERE r.id=? AND s.page_key=? AND s.section_key=? AND s.locale=?',[$revisionId,$page,$section,$locale])->fetch();
        if(!$row) Http::fail(404,'Revision not found.');
        $row['snapshot']=json_decode($row['snapshot_json'],true,64,JSON_THROW_ON_ERROR);unset($row['snapshot_json']);
        return $row;
    }

    public function restore(string $page,string $section,array $input,array $user): array
    {
        if($page==='site' && $user['role']!=='owner') Http::fail(403,'Only an owner can restore shared site settings.');
        $field=$this->schema($page)['sections'][$section] ?? Http::fail(404,'Section not found.');
        $locale=self::locale($input['locale']??'en');
        $revisionId=filter_var($input['revision_id']??null,FILTER_VALIDATE_INT);
        if(!$revisionId) Http::fail(422,'Choose a revision to restore.');
        return $this->db->transaction(function () use ($page,$section,$locale,$field,$input,$user,$revisionId): array {
            $current=$this->db->query('SELECT * FROM page_sections WHERE page_key=? AND section_key=? AND locale=? FOR UPDATE',[$page,$section,$locale])->fetch();
            if(!$current) Http::fail(404,'Section not found.');
            if((int)$current['version']!==(int)($input['version']??0)) Http::fail(409,'Section changed. Reload before restoring.');
            $revision=$this->db->query('SELECT snapshot_json,visible,sort_order FROM section_revisions WHERE id=? AND section_id=?',[$revisionId,$current['id']])->fetch();
            if(!$revision) Http::fail(404,'Revision not found.');
            $snapshot=SectionValidation::clean($field,json_decode($revision['snapshot_json'],true,64,JSON_THROW_ON_ERROR));
            $json=json_encode($snapshot,JSON_THROW_ON_ERROR|JSON_UNESCAPED_UNICODE);
            $this->db->query("UPDATE page_sections SET draft_json=?,draft_visible=?,sort_order=?,version=version+1,review_requested_at=NULL,review_requested_by=NULL,review_state='draft',review_version=NULL,approved_at=NULL,approved_by=NULL,updated_by=?,updated_at=UTC_TIMESTAMP() WHERE id=?",[$json,$revision['visible'],$revision['sort_order'],$user['id'],$current['id']]);
            $version=(int)$current['version']+1;
            $this->db->query("INSERT INTO section_revisions(section_id,version,event,snapshot_json,visible,sort_order,created_by,created_at) VALUES (?,?, 'restore_revision',?,?,?,?,UTC_TIMESTAMP())",[$current['id'],$version,$json,$revision['visible'],$revision['sort_order'],$user['id']]);
            $this->db->audit((int)$user['id'],'restore_section_revision','page_sections',(int)$current['id']);
            return ['version'=>$version];
        });
    }
}
