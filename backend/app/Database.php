<?php
declare(strict_types=1);

final class Database
{
    public PDO $pdo;
    public function __construct(array $config)
    {
        $this->pdo = new PDO($config['dsn'], $config['db_user'], $config['db_password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        $this->pdo->exec("SET time_zone = '+00:00'");
    }

    public function query(string $sql, array $params = []): PDOStatement
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return $statement;
    }

    public function transaction(callable $work): mixed
    {
        $this->pdo->beginTransaction();
        try { $result = $work(); $this->pdo->commit(); return $result; }
        catch (Throwable $error) { if ($this->pdo->inTransaction()) $this->pdo->rollBack(); throw $error; }
    }

    public function audit(int $actor, string $action, string $entity, ?int $id = null): void
    {
        $this->query('INSERT INTO audit_logs (actor_id, action, entity, entity_id, created_at) VALUES (?, ?, ?, ?, UTC_TIMESTAMP())', [$actor, $action, $entity, $id]);
    }

    public function throttle(string $key, int $maximum, int $seconds): void
    {
        $bucket = hash('sha256', $key);
        $now = time();
        // Atomic update across requests. Assign attempts before replacing expiry.
        $this->query('INSERT INTO rate_limits (bucket, attempts, expires_at) VALUES (?, 1, ?) ON DUPLICATE KEY UPDATE attempts = IF(expires_at <= ?, 1, attempts + 1), expires_at = IF(expires_at <= ?, VALUES(expires_at), expires_at)', [$bucket, $now + $seconds, $now, $now]);
        $row = $this->query('SELECT attempts, expires_at FROM rate_limits WHERE bucket = ?', [$bucket])->fetch();
        if ((int)$row['attempts'] > $maximum) {
            header('Retry-After: ' . max(1, (int)$row['expires_at'] - $now));
            Http::fail(429, 'Too many requests. Please try again later.');
        }
        if (random_int(1, 100) === 1) $this->query('DELETE FROM rate_limits WHERE expires_at < ? LIMIT 500', [$now]);
    }
}
