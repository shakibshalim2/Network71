<?php
declare(strict_types=1);
require dirname(__DIR__).'/app/bootstrap.php';$config=app_config();
if($config['environment']!=='development')throw new RuntimeException('Development only.');
$db=new Database($config);$owner=$db->query("SELECT id FROM admin_users WHERE role='owner' AND active=1 LIMIT 1")->fetch();
$filename=bin2hex(random_bytes(20)).'.webp';$recordId=null;
$db->query("INSERT INTO media_assets(filename,original_name,alt,mime,bytes,width,height,uploaded_by,created_at) VALUES (?,'test','test','image/webp',1,1,1,?,UTC_TIMESTAMP())",[$filename,$owner['id']]);$id=(int)$db->pdo->lastInsertId();
try {
    $db->query("INSERT INTO content_records(module,slug,draft_json,updated_by,created_at,updated_at) VALUES ('gallery',?,?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP())",['test-'.bin2hex(random_bytes(6)),json_encode(['title'=>'Test','image'=>'/api/v1/media/'.$filename]),$owner['id']]);$recordId=(int)$db->pdo->lastInsertId();
    $media=new Media($db,$config);
    try {$media->archive($id,$owner);throw new RuntimeException('Referenced image was archived.');}catch(HttpError $e){if($e->status!==409)throw $e;}
    $db->query('DELETE FROM content_records WHERE id=?',[$recordId]);$recordId=null;
    $media->archive($id,$owner);
    if(!$db->query('SELECT deleted_at FROM media_assets WHERE id=?',[$id])->fetchColumn())throw new RuntimeException('Image was not archived.');
    echo "PASS: referenced-image protection and unused-image archive.\n";
}finally{
    if($recordId)$db->query('DELETE FROM content_records WHERE id=?',[$recordId]);
    $db->query("DELETE FROM audit_logs WHERE entity='media' AND entity_id=?",[$id]);$db->query('DELETE FROM media_assets WHERE id=?',[$id]);
}
