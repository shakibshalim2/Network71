<?php
declare(strict_types=1);
require dirname(__DIR__).'/app/bootstrap.php';$config=app_config();
if($config['environment']!=='development')throw new RuntimeException('Development only.');
$db=new Database($config);$owner=$db->query("SELECT id FROM admin_users WHERE role='owner' AND active=1 LIMIT 1")->fetchColumn();
$slug='render-test-'.bin2hex(random_bytes(5));$data=['title'=>'A $1 <script> project','summary'=>'Safe "description"','permission'=>true,'role'=>'Build & deliver','image'=>'/api/v1/media/example.webp'];
$db->query("INSERT INTO content_records(module,slug,draft_json,published_json,status,updated_by,created_at,updated_at,published_at) VALUES ('projects',?,?,?,'published',?,UTC_TIMESTAMP(),UTC_TIMESTAMP(),UTC_TIMESTAMP())",[$slug,json_encode($data),json_encode($data),$owner]);$id=(int)$db->pdo->lastInsertId();
$dir=sys_get_temp_dir().'/n71-render-'.bin2hex(random_bytes(5));mkdir($dir,0700);
try {
    file_put_contents($dir.'/index.html','<html><head><title>Old</title><meta name="description" content="Old"></head><body><div id="root"></div></body></html>');
    $source=file_get_contents(dirname(__DIR__).'/deploy/project.php');
    $bootstrap=var_export(dirname(__DIR__).'/app/bootstrap.php',true);
    $source=str_replace("require dirname(__DIR__) . '/network71-private/app/bootstrap.php';","require_once $bootstrap;",$source);
    file_put_contents($dir.'/project.php',$source);$_SERVER['REQUEST_URI']='/projects/'.$slug;
    ob_start();include $dir.'/project.php';$html=ob_get_clean();
    if(!str_contains($html,'A $1 &lt;script&gt; project')||str_contains($html,'<script>')||!str_contains($html,'og:title')||!str_contains($html,'<noscript>'))throw new RuntimeException('Renderer escaping or metadata failed.');
    echo "PASS: project social metadata, literal title, escaped story and noscript content.\n";
}finally{$db->query('DELETE FROM content_records WHERE id=?',[$id]);unlink($dir.'/project.php');unlink($dir.'/index.html');rmdir($dir);}
