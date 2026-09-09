<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require dirname(__DIR__) . '/app/bootstrap.php';
$email = strtolower(trim((string)getenv('N71_OWNER_EMAIL')));
$password = (string)getenv('N71_OWNER_PASSWORD');
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 12 || strlen($password) > 72) throw new RuntimeException('Set the account email and a password of 12–72 bytes through N71_OWNER_EMAIL and N71_OWNER_PASSWORD.');
$db = new Database(app_config());
$account = $db->query('SELECT id FROM admin_users WHERE email = ? AND active = 1', [$email])->fetch();
if (!$account) throw new RuntimeException('Active account not found.');
$db->transaction(function () use ($db, $account, $password) {
    $db->query('UPDATE admin_users SET password_hash = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?', [password_hash($password, PASSWORD_DEFAULT), $account['id']]);
    $db->audit((int)$account['id'], 'cli_password_reset', 'users', (int)$account['id']);
});
echo "Password reset.\n";
