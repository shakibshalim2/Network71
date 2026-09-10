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
            if (!$public) $meta[$key] += ['version' => (int)$row['version'], 'status' => $row['status']];
        }
        $result = ['sections' => (object)$sections, 'meta' => (object)$meta];
        if (!$public) $result += ['schema' => $schema, 'defaults' => $this->defaults($page,$locale)];
        return $result;
    }
    public function save(string $page, string $section, array $input, array $user): array
    {
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
                    $this->db->query('UPDATE page_sections SET draft_json = ?, draft_visible = ?, sort_order = ?, version = version + 1, updated_by = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?',[$json,(int)$input['visible'],$order,$user['id'],$old['id']]);
                } else {
                    $this->db->query('INSERT INTO page_sections (page_key,section_key,locale,draft_json,draft_visible,sort_order,updated_by,updated_at) VALUES (?,?,?,?,?,?,?,UTC_TIMESTAMP())',[$page,$section,$locale,$json,(int)$input['visible'],$order,$user['id']]);
                }
                $id = $old ? (int)$old['id'] : (int)$this->db->pdo->lastInsertId();
                $this->db->audit((int)$user['id'],'save_section','page_sections',$id);
                return ['version' => (int)($old['version'] ?? 0)+1];
            });
        } catch (PDOException $error) { if ($error->getCode()==='23000') Http::fail(409,'Section changed. Reload before saving.'); throw $error; }
    }
    public function transition(string $page,string $section,array $input,array $user): void
    {
        $this->schema($page);
        $locale=self::locale($input['locale'] ?? 'en');
        $action=$input['action'] ?? '';
        if (!in_array($action,['publish','unpublish'],true)) Http::fail(422,'Unknown section action.');
        $this->db->transaction(function () use ($page,$section,$locale,$action,$input,$user) {
            $row=$this->db->query('SELECT * FROM page_sections WHERE page_key=? AND section_key=? AND locale=? FOR UPDATE',[$page,$section,$locale])->fetch();
            if (!$row) Http::fail(404,'Save a draft first.');
            if ((int)$row['version'] !== (int)($input['version'] ?? 0)) Http::fail(409,'Section changed. Reload first.');
            if ($action==='publish') {
                $this->db->query("UPDATE page_sections SET published_json=draft_json,published_visible=draft_visible,published_sort_order=sort_order,status='published',version=version+1,published_at=UTC_TIMESTAMP(),updated_at=UTC_TIMESTAMP() WHERE id=?",[$row['id']]);
            } else $this->db->query("UPDATE page_sections SET status='draft',version=version+1,updated_at=UTC_TIMESTAMP() WHERE id=?",[$row['id']]);
            $this->db->audit((int)$user['id'],$action.'_section','page_sections',(int)$row['id']);
        });
    }
}
