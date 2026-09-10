<?php
declare(strict_types=1);

final class Outbox
{
    public function __construct(private Database $db,private array $config) {}
    public function run(?callable $transport=null, ?int $testInquiryId=null): array
    {
        if($transport && (($this->config['environment']??'')!=='development' || !$testInquiryId)) throw new RuntimeException('Test transport requires an isolated development fixture.');
        if(!$transport && !($this->config['smtp']['enabled']??false)) return ['sent'=>0,'failed'=>0,'disabled'=>true];
        $lock=fopen($this->config['storage'].'/outbox.lock','c');
        if(!$lock || !flock($lock,LOCK_EX|LOCK_NB)) throw new RuntimeException('An outbox worker is already running.');
        $result=['sent'=>0,'failed'=>0];
        try {
            $rows=$this->db->query("SELECT o.id AS outbox_id,o.attempts,i.* FROM email_outbox o JOIN inquiries i ON i.id=o.inquiry_id WHERE o.status='pending' AND o.next_attempt_at<=UTC_TIMESTAMP()".($testInquiryId?' AND i.id=?':'')." ORDER BY o.id LIMIT 20",$testInquiryId?[$testInquiryId]:[])->fetchAll();
            foreach($rows as $row) {
                try {
                    if($transport)$transport($row);else $this->send($row);
                    $this->db->query("UPDATE email_outbox SET status='sent',sent_at=UTC_TIMESTAMP(),attempts=attempts+1,last_error=NULL WHERE id=?",[$row['outbox_id']]);$result['sent']++;
                } catch(Throwable $error) {
                    $attempts=(int)$row['attempts']+1;$delay=min(86400,60*(2**min($attempts,10)));
                    $this->db->query('UPDATE email_outbox SET status=?,attempts=?,next_attempt_at=DATE_ADD(UTC_TIMESTAMP(), INTERVAL ? SECOND),last_error=? WHERE id=?',[$attempts>=10?'failed':'pending',$attempts,$delay,'SMTP delivery failed. Check private mail configuration and provider logs.',$row['outbox_id']]);$result['failed']++;
                }
            }
        } finally {flock($lock,LOCK_UN);fclose($lock);}
        return $result;
    }
    private function send(array $row):void
    {
        require_once dirname(__DIR__).'/vendor/autoload.php';
        $smtp=$this->config['smtp'];
        if(!in_array($smtp['encryption']??'', ['tls','ssl'],true))throw new RuntimeException('SMTP requires TLS.');
        $mail=new \PHPMailer\PHPMailer\PHPMailer(true);$mail->isSMTP();$mail->Host=$smtp['host'];$mail->Port=(int)$smtp['port'];
        $mail->SMTPAuth=true;$mail->Username=$smtp['username'];$mail->Password=$smtp['password'];$mail->SMTPSecure=$smtp['encryption'];$mail->Timeout=15;$mail->CharSet='UTF-8';
        $mail->setFrom($smtp['from'],'Network71 website');$mail->addAddress($smtp['to']);$mail->addReplyTo($row['email'],$row['name']);
        $mail->Subject='Website enquiry '.$row['reference'];
        $mail->MessageID='<'.$row['reference'].'@'.parse_url($this->config['origin'],PHP_URL_HOST).'>';
        $mail->Body="Reference: {$row['reference']}\nName: {$row['name']}\nEmail: {$row['email']}\nPhone: {$row['phone']}\nCompany: {$row['company']}\nSubject: {$row['subject']}\nSource: {$row['source']}\n\n{$row['message']}";
        $mail->send();
    }
}
