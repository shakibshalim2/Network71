<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') exit(1);
require dirname(__DIR__) . '/app/bootstrap.php';

$config = app_config();
$days = (int)($config['inquiry_retention_days'] ?? 365);
if ($days < 30 || $days > 3650) throw new RuntimeException('inquiry_retention_days must be between 30 and 3650.');

$lockPath = rtrim((string)$config['storage'], '/\\') . '/cleanup.lock';
$lock = fopen($lockPath, 'c');
if (!$lock || !flock($lock, LOCK_EX | LOCK_NB)) throw new RuntimeException('Cleanup is already running.');

$db = new Database($config);
$cutoff = (new DateTimeImmutable('now', new DateTimeZone('UTC')))->modify("-$days days")->format('Y-m-d H:i:s');
$deletedInquiries = 0;

do {
    $ids = array_map('intval', $db->query("SELECT id FROM inquiries WHERE status = 'closed' AND updated_at < ? ORDER BY id LIMIT 500", [$cutoff])->fetchAll(PDO::FETCH_COLUMN));
    if (!$ids) break;
    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $db->transaction(function () use ($db, $ids, $placeholders, &$deletedInquiries): void {
        $db->query("DELETE FROM audit_logs WHERE entity = 'inquiries' AND entity_id IN ($placeholders)", $ids);
        $statement = $db->query("DELETE FROM inquiries WHERE id IN ($placeholders)", $ids);
        $deletedInquiries += $statement->rowCount();
    });
} while (count($ids) === 500);

$deletedResets = $db->query('DELETE FROM password_resets WHERE expires_at < UTC_TIMESTAMP()')->rowCount();
$deletedLimits = $db->query('DELETE FROM rate_limits WHERE expires_at < ?', [time()])->rowCount();

echo json_encode([
    'closed_inquiries' => $deletedInquiries,
    'expired_password_resets' => $deletedResets,
    'expired_rate_limits' => $deletedLimits,
    'retention_days' => $days,
], JSON_THROW_ON_ERROR) . PHP_EOL;
