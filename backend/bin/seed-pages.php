<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require dirname(__DIR__) . '/app/bootstrap.php';
$db = new Database(app_config());
$owner = $db->query("SELECT id FROM admin_users WHERE role = 'owner' AND active = 1 ORDER BY id LIMIT 1")->fetchColumn();
if (!$owner) throw new RuntimeException('Create an owner first.');
$pages = ['home' => 'Home', 'about' => 'About', 'investors' => 'Investors', 'careers' => 'Careers', 'contact' => 'Contact', 'ezyify' => 'Ezyify', 'sustainability' => 'Sustainability', 'global-presence' => 'Global presence', 'leadership' => 'Leadership', 'governance' => 'Governance', 'timeline' => 'Timeline', 'press' => 'Press', 'legal' => 'Legal', 'blog' => 'Insights', 'gallery' => 'Gallery', 'brand' => 'Brand'];
$divisions = ['garments' => 'Garments & Apparel', 'agriculture' => 'Agriculture', 'food-beverage' => 'Food & Beverage', 'oils-energy' => 'Oils & Energy', 'it-software' => 'IT & Software', 'global-trading' => 'Global Trading', 'media' => 'Media', 'eshipe' => 'eSHIPe Maritime'];
foreach (['pages' => $pages, 'divisions' => $divisions] as $module => $records) {
    foreach ($records as $slug => $title) {
        // Inventory only. No fabricated content, no automatic publishing, no overwrite.
        $data = ['title' => $title];
        if ($module === 'pages') $data['path'] = $slug === 'home' ? '/' : '/' . $slug;
        $db->query('INSERT IGNORE INTO content_records (module, slug, draft_json, updated_by, created_at, updated_at) VALUES (?, ?, ?, ?, UTC_TIMESTAMP(), UTC_TIMESTAMP())', [$module, $slug, json_encode($data, JSON_THROW_ON_ERROR), $owner]);
    }
}
echo "Existing page inventory added as drafts. Public content was not changed.\n";
