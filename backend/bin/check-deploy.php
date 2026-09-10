<?php
declare(strict_types=1);
if(PHP_SAPI!=='cli')exit;
require dirname(__DIR__).'/app/bootstrap.php';
$failed=0;
function report(bool $ok,string $label):void{global $failed;echo ($ok?'PASS ':'FAIL ').$label.PHP_EOL;if(!$ok)$failed++;}
report(PHP_VERSION_ID>=80300,'PHP 8.3+ (production target 8.4)');
foreach(['pdo_mysql','mbstring','fileinfo','gd','openssl','session'] as $ext)report(extension_loaded($ext),'Extension '.$ext);
report(function_exists('imagewebp'),'GD WebP encoding');
try{
    $config=app_config();report(is_dir($config['storage'])&&is_writable($config['storage']),'Private storage writable');
    report($config['environment']==='development'||($config['secure_cookie']&&str_starts_with($config['origin'],'https://')),'HTTPS/session cookie policy');
    $retention=(int)($config['inquiry_retention_days']??365);report($retention>=30&&$retention<=3650,'Inquiry retention policy');
    $applicationRetention=(int)($config['application_retention_days']??730);report($applicationRetention>=30&&$applicationRetention<=3650,'Application retention policy');
    $db=new Database($config);report(true,'Database connection');
    foreach(glob(dirname(__DIR__).'/database/*.sql') as $file){$version=basename($file,'.sql');report((bool)$db->query('SELECT version FROM schema_migrations WHERE version=?',[$version])->fetch(),'Migration '.$version);}
    report((int)$db->query("SELECT COUNT(*) FROM admin_users WHERE active=1 AND role='owner'")->fetchColumn()>0,'Active owner exists');
    report(is_file(dirname(__DIR__).'/content/schema.json'),'Page schema deployed');
    foreach(['en','bn'] as $locale)report(is_file(dirname(__DIR__)."/content/seed.$locale.json"),'Packaged '.$locale.' content');
    if($config['smtp']['enabled']??false) {
        report(is_file(dirname(__DIR__).'/vendor/autoload.php'),'Composer SMTP dependencies');
        foreach(['host','username','password','from','to'] as $key)report(!empty($config['smtp'][$key]),'SMTP '.$key.' configured');
        report(in_array($config['smtp']['encryption']??'', ['tls','ssl'],true),'SMTP TLS policy');
    } else echo "PENDING SMTP disabled; enquiry storage works without delivery.\n";
}catch(Throwable $error){report(false,'Configuration/database unavailable; inspect private server logs.');}
echo "Manual staging checks required: HTTPS, Apache rewrites, login, save/publish, email delivery, private file access and backup restore.\n";
exit($failed?1:0);
