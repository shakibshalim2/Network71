<?php
declare(strict_types=1);
if(PHP_SAPI!=='cli')exit;
require dirname(__DIR__).'/app/bootstrap.php';
$config=app_config();
$result=(new Outbox(new Database($config),$config))->run();
echo json_encode($result,JSON_THROW_ON_ERROR).PHP_EOL;
exit(($result['failed']??0)>0?1:0);
