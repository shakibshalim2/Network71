<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') exit;
require dirname(__DIR__) . '/app/bootstrap.php';
$config = app_config(); $db = new Database($config);
$dir = $config['storage'] . '/backups';
if (!is_dir($dir)) mkdir($dir,0700,true);
$file = $dir . '/database-' . gmdate('Ymd-His') . '-' . bin2hex(random_bytes(3)) . '.sql';
$handle = fopen($file,'x'); chmod($file,0600);
$db->pdo->exec('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
$db->pdo->beginTransaction();
try {
    fwrite($handle,"SET NAMES utf8mb4;\nSET FOREIGN_KEY_CHECKS=0;\n");
    foreach ($db->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN) as $table) {
        if (!preg_match('/^[a-z0-9_]+$/i',$table)) throw new RuntimeException('Unsupported table name.');
        $create=$db->query("SHOW CREATE TABLE `$table`")->fetch(PDO::FETCH_NUM)[1];
        fwrite($handle,"DROP TABLE IF EXISTS `$table`;\n$create;\n");
        $rows=$db->query("SELECT * FROM `$table`");
        while ($row=$rows->fetch(PDO::FETCH_NUM)) {
            fwrite($handle,"INSERT INTO `$table` VALUES (" . implode(',',array_map(fn($v)=>$v===null?'NULL':$db->pdo->quote((string)$v),$row)) . ");\n");
        }
    }
    fwrite($handle,"SET FOREIGN_KEY_CHECKS=1;\n");
    $db->pdo->commit();
} catch (Throwable $error) { $db->pdo->rollBack(); throw $error; }
finally { fclose($handle); }
echo 'Private database backup created: ' . basename($file) . PHP_EOL;
