<?php
declare(strict_types=1);

final class PasswordReset
{
    public function __construct(private Database $db) {}
    public function issue(int $id,array $owner): string
    {
        return $this->db->transaction(function () use ($id,$owner) {
            if(!$this->db->query('SELECT id FROM admin_users WHERE id=? AND active=1 FOR UPDATE',[$id])->fetch()) Http::fail(404,'Active account not found.');
            $token=bin2hex(random_bytes(32));
            $this->db->query('UPDATE password_resets SET used_at=UTC_TIMESTAMP() WHERE user_id=? AND used_at IS NULL',[$id]);
            $this->db->query('INSERT INTO password_resets(user_id,token_hash,expires_at,created_at) VALUES (?,?,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 30 MINUTE),UTC_TIMESTAMP())',[$id,hash('sha256',$token)]);
            $this->db->audit((int)$owner['id'],'issue_password_reset','users',$id);
            return $token;
        });
    }
    public function consume(array $input): void
    {
        $this->db->throttle('reset-ip:'.($_SERVER['REMOTE_ADDR']??''),10,900);
        $token=Http::string($input,'token',64,true);$password=Http::password($input);
        if(!preg_match('/^[a-f0-9]{64}$/',$token)||strlen($password)<12) Http::fail(422,'Use a valid link and a password of 12–72 bytes.');
        $this->db->transaction(function () use ($token,$password) {
            $reset=$this->db->query('SELECT * FROM password_resets WHERE token_hash=? AND used_at IS NULL AND expires_at>UTC_TIMESTAMP() FOR UPDATE',[hash('sha256',$token)])->fetch();
            if(!$reset) Http::fail(422,'This reset link is invalid or expired.');
            if(!$this->db->query('SELECT id FROM admin_users WHERE id=? AND active=1 FOR UPDATE',[$reset['user_id']])->fetch()) Http::fail(422,'This reset link is invalid or expired.');
            $this->db->query('UPDATE admin_users SET password_hash=?,updated_at=UTC_TIMESTAMP() WHERE id=?',[password_hash($password,PASSWORD_DEFAULT),$reset['user_id']]);
            $this->db->query('UPDATE password_resets SET used_at=UTC_TIMESTAMP() WHERE user_id=? AND used_at IS NULL',[$reset['user_id']]);
            $this->db->audit((int)$reset['user_id'],'reset_password','users',(int)$reset['user_id']);
        });
    }
}
