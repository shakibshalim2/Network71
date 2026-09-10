<?php
declare(strict_types=1);
require dirname(__DIR__).'/app/bootstrap.php';
$config=app_config();
if ($config['environment']!=='development') throw new RuntimeException('Development only.');
$db=new Database($config);$email='section-test-'.bin2hex(random_bytes(5)).'@example.test';$password=bin2hex(random_bytes(20));
$db->query("INSERT INTO admin_users(name,email,password_hash,role,created_at,updated_at) VALUES ('Section test',?,?,'owner',UTC_TIMESTAMP(),UTC_TIMESTAMP())",[$email,password_hash($password,PASSWORD_DEFAULT)]);
$id=(int)$db->pdo->lastInsertId();$curl=curl_init();curl_setopt($curl,CURLOPT_COOKIEFILE,'');$token='';$checks=0;
function request(string $method,string $path,?array $data=null):array {
    global $curl,$token,$config;
    curl_setopt_array($curl,[CURLOPT_URL=>'http://127.0.0.1:8787/api/v1/'.$path,CURLOPT_CUSTOMREQUEST=>$method,CURLOPT_HTTPHEADER=>['Content-Type: application/json','Origin: '.$config['origin'],'X-CSRF-Token: '.$token],CURLOPT_POSTFIELDS=>$data===null?null:json_encode($data),CURLOPT_RETURNTRANSFER=>true,CURLOPT_TIMEOUT=>15]);
    $raw=curl_exec($curl);return [curl_getinfo($curl,CURLINFO_HTTP_CODE),json_decode($raw,true)];
}
function verify(bool $condition,string $message):void {global $checks;if(!$condition)throw new RuntimeException($message);$checks++;}
// Use a real page/section, restoring its exact prior record in finally.
$page='about';$section='hero';$locale='bn';
$old=$db->query('SELECT * FROM page_sections WHERE page_key=? AND section_key=? AND locale=?',[$page,$section,$locale])->fetch();
try {
    $token=request('GET','auth/session')[1]['csrf'];$login=request('POST','auth/login',compact('email','password'));verify($login[0]===200,'Login');$token=$login[1]['csrf'];
    $record=request('GET',"admin/sections/$page?locale=$locale")[1];
    $payload=['section'=>$section,'locale'=>$locale,'data'=>$record['defaults'][$section],'visible'=>true,'order'=>0,'version'=>$record['meta'][$section]['version']??0];
    $payload['data']['title']='CMS integration check';
    $before=request('GET',"page/$page?locale=$locale")[1];
    $saved=request('PUT',"admin/sections/$page",$payload);verify($saved[0]===200,'Draft save');
    verify(request('GET',"page/$page?locale=$locale")[1]===$before,'Draft privacy');
    verify(request('PUT',"admin/sections/$page",$payload)[0]===409,'Stale version rejected');
    $version=$saved[1]['version'];
    verify(request('POST',"admin/sections/$page",['section'=>$section,'locale'=>$locale,'version'=>$version,'action'=>'publish'])[0]===422,'Unreviewed publish rejected');
    verify(request('POST',"admin/sections/$page",['section'=>$section,'locale'=>$locale,'version'=>$version,'action'=>'request_review'])[0]===200,'Review request');
    verify(request('POST',"admin/sections/$page",['section'=>$section,'locale'=>$locale,'version'=>$version,'action'=>'approve'])[0]===200,'Review approval');
    verify(request('POST',"admin/sections/$page",['section'=>$section,'locale'=>$locale,'version'=>$version,'action'=>'publish'])[0]===200,'Publish');
    verify(request('GET',"page/$page?locale=$locale")[1]['sections'][$section]['title']==='CMS integration check','Published content');
    $db->query("UPDATE admin_users SET role='editor' WHERE id=?",[$id]);
    verify(request('POST',"admin/sections/$page",['section'=>$section,'locale'=>$locale,'version'=>$version+1,'action'=>'request_review'])[0]===200,'Editor review request');
    $history=request('GET',"admin/sections/$page/history?locale=$locale&section=$section");
    verify($history[0]===200&&count($history[1]['items'])>=3&&$history[1]['items'][0]['event']==='request_review','Section revision history');
    verify(request('POST',"admin/sections/$page",['section'=>$section,'locale'=>$locale,'version'=>$version+1,'action'=>'unpublish'])[0]===403,'Editor cannot publish');
    $revisionId=(int)$history[1]['items'][0]['id'];
    $preview=request('GET',"admin/sections/$page/history/$revisionId?locale=$locale&section=$section");verify($preview[0]===200&&isset($preview[1]['snapshot']['title']),'Revision preview');
    verify(request('POST',"admin/sections/$page/restore",['section'=>$section,'locale'=>$locale,'version'=>$version+1,'revision_id'=>$revisionId])[0]===200,'Revision restore');
    $db->query("UPDATE admin_users SET role='owner' WHERE id=?",[$id]);
    verify(request('POST',"admin/sections/$page",['section'=>$section,'locale'=>$locale,'version'=>$version+2,'action'=>'unpublish'])[0]===200,'Unpublish');
    verify(!isset(request('GET',"page/$page?locale=$locale")[1]['sections'][$section]),'Public override removed');
    $link=request('POST',"admin/users/$id/reset-link",[]);verify($link[0]===200,'Reset link issued');
    $resetToken=explode('#',$link[1]['url'])[1];$newPassword=bin2hex(random_bytes(20));
    verify(request('POST','auth/reset-password',['token'=>$resetToken,'password'=>$newPassword])[0]===200,'Password reset');
    verify(request('POST','auth/reset-password',['token'=>$resetToken,'password'=>$password])[0]===422,'Reset token single use');
    verify(request('GET','admin/dashboard')[0]===401,'Reset revokes old session');
    echo "PASS: $checks section HTTP checks.\n";
} finally {
    $db->query('DELETE FROM page_sections WHERE page_key=? AND section_key=? AND locale=?',[$page,$section,$locale]);
    if($old){$columns=implode(',',array_map(fn($key)=>"`$key`",array_keys($old)));$placeholders=implode(',',array_fill(0,count($old),'?'));$db->query("INSERT INTO page_sections ($columns) VALUES ($placeholders)",array_values($old));}
    $db->query('DELETE FROM audit_logs WHERE actor_id=?',[$id]);$db->query('DELETE FROM password_resets WHERE user_id=?',[$id]);$db->query('DELETE FROM admin_users WHERE id=?',[$id]);
}
