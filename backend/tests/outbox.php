<?php
declare(strict_types=1);
require dirname(__DIR__).'/app/bootstrap.php';$config=app_config();
if($config['environment']!=='development')throw new RuntimeException('Development only.');
$db=new Database($config);$reference='TEST-'.bin2hex(random_bytes(6));
$db->query("INSERT INTO inquiries(reference,name,email,subject,message,created_at,updated_at) VALUES (?,'Test','test@example.test','Test','Test',UTC_TIMESTAMP(),UTC_TIMESTAMP())",[$reference]);$id=(int)$db->pdo->lastInsertId();
try {
    $db->query('INSERT INTO email_outbox(inquiry_id,next_attempt_at,created_at) VALUES (?,UTC_TIMESTAMP(),UTC_TIMESTAMP())',[$id]);
    $worker=new Outbox($db,$config);
    $failed=$worker->run(fn()=>throw new RuntimeException('Simulated provider failure'),$id);
    if($failed['failed']!==1)throw new RuntimeException('Failure not recorded.');
    $row=$db->query('SELECT * FROM email_outbox WHERE inquiry_id=?',[$id])->fetch();
    if($row['status']!=='pending'||(int)$row['attempts']!==1)throw new RuntimeException('Retry not scheduled.');
    if(!$db->query('SELECT id FROM inquiries WHERE id=?',[$id])->fetch())throw new RuntimeException('Enquiry lost.');
    $db->query('UPDATE email_outbox SET next_attempt_at=UTC_TIMESTAMP() WHERE inquiry_id=?',[$id]);
    $sent=$worker->run(fn()=>true,$id);
    if($sent['sent']!==1)throw new RuntimeException('Retry failed.');
    if($worker->run(fn()=>throw new RuntimeException('Should not resend'),$id)['sent']!==0)throw new RuntimeException('Resent delivered message.');
    echo "PASS: failure retention, scheduled retry, recovery, no normal resend.\n";
}finally{$db->query('DELETE FROM inquiries WHERE id=?',[$id]);}
