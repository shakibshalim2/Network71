<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require dirname(__DIR__) . '/app/bootstrap.php';
$db = new Database(app_config());
$sql = file_get_contents(dirname(__DIR__) . '/database/001_initial.sql');
$db->pdo->exec($sql);
$db->query('INSERT IGNORE INTO schema_migrations (version, applied_at) VALUES (?, UTC_TIMESTAMP())', ['001_initial']);
echo "Database schema is ready.\n";
foreach (glob(dirname(__DIR__) . '/database/*.sql') as $migration) {
    $version = basename($migration, '.sql');
    if ($db->query('SELECT version FROM schema_migrations WHERE version = ?', [$version])->fetch()) continue;
    $db->pdo->exec(file_get_contents($migration));
    $db->query('INSERT INTO schema_migrations (version, applied_at) VALUES (?, UTC_TIMESTAMP())', [$version]);
    echo "Applied $version.\n";
}

if (($argv[1] ?? '') === '--owner') {
    $email = strtolower(trim((string)getenv('N71_OWNER_EMAIL')));
    $password = (string)getenv('N71_OWNER_PASSWORD');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 12 || strlen($password) > 72) throw new RuntimeException('Set N71_OWNER_EMAIL and N71_OWNER_PASSWORD (12–72 bytes).');
    if ($db->query('SELECT id FROM admin_users WHERE email = ?', [$email])->fetch()) throw new RuntimeException('Account already exists; no password was changed.');
    $db->query("INSERT INTO admin_users (name, email, password_hash, role, created_at, updated_at) VALUES (?, ?, ?, 'owner', UTC_TIMESTAMP(), UTC_TIMESTAMP())", ['Site owner', $email, password_hash($password, PASSWORD_DEFAULT)]);
    echo "Owner account created.\n";
}
