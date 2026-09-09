<?php
declare(strict_types=1);

final class Auth
{
    public function __construct(private Database $db, private array $config)
    {
        ini_set('session.use_strict_mode', '1');
        ini_set('session.use_only_cookies', '1');
        session_name('n71_admin');
        session_set_cookie_params(['lifetime' => 0, 'path' => '/api', 'secure' => $config['secure_cookie'], 'httponly' => true, 'samesite' => 'Strict']);
        session_start();
        if (isset($_SESSION['last_seen']) && time() - $_SESSION['last_seen'] > 1800) {
            $_SESSION = [];
            session_regenerate_id(true);
        }
        if (isset($_SESSION['user_id'])) $_SESSION['last_seen'] = time();
        $_SESSION['csrf'] ??= bin2hex(random_bytes(32));
    }

    public function csrf(): string { return $_SESSION['csrf']; }

    public function checkWrite(): void
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if ($origin !== '' && $origin !== $this->config['origin']) Http::fail(403, 'Origin is not allowed.');
        $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
        if (!hash_equals($this->csrf(), $token)) Http::fail(403, 'Session verification failed. Refresh and try again.');
    }

    public function user(bool $required = true): ?array
    {
        $user = isset($_SESSION['user_id']) ? $this->db->query('SELECT id, name, email, role, password_hash FROM admin_users WHERE id = ? AND active = 1', [$_SESSION['user_id']])->fetch() : false;
        if ($user && !hash_equals(hash('sha256', $user['password_hash']), $_SESSION['credential_version'] ?? '')) $user = false;
        if (!$user) unset($_SESSION['user_id'], $_SESSION['credential_version']);
        if (!$user && $required) Http::fail(401, 'Please sign in to continue.');
        if ($user) unset($user['password_hash']);
        return $user ?: null;
    }

    public function owner(): array
    {
        $user = $this->user();
        if ($user['role'] !== 'owner') Http::fail(403, 'Only an owner can perform this action.');
        return $user;
    }

    public function login(array $data): array
    {
        $email = strtolower(Http::string($data, 'email', 190, true));
        $password = Http::password($data);
        $this->db->throttle('login-ip:' . ($_SERVER['REMOTE_ADDR'] ?? ''), 30, 900);
        $this->db->throttle('login-email:' . $email, 8, 900);
        $user = $this->db->query('SELECT * FROM admin_users WHERE email = ?', [$email])->fetch();
        $valid = password_verify($password, $user['password_hash'] ?? '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.');
        if (!$valid || !$user || !(int)$user['active']) Http::fail(401, 'Email or password is incorrect.');
        session_regenerate_id(true);
        $_SESSION = ['user_id' => (int)$user['id'], 'last_seen' => time(), 'csrf' => bin2hex(random_bytes(32)), 'credential_version' => hash('sha256', $user['password_hash'])];
        $this->db->query('DELETE FROM rate_limits WHERE bucket = ?', [hash('sha256', 'login-email:' . $email)]);
        $this->db->audit((int)$user['id'], 'login', 'users', (int)$user['id']);
        return ['user' => $this->user(), 'csrf' => $this->csrf()];
    }

    public function logout(): void
    {
        $_SESSION = [];
        session_regenerate_id(true);
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
}
