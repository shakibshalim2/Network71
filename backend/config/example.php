<?php
declare(strict_types=1);

// Copy to local.php outside public_html. Never commit credentials.
return [
    'environment' => 'production',
    'dsn' => 'mysql:host=localhost;dbname=ACCOUNT_network71;charset=utf8mb4',
    'db_user' => 'ACCOUNT_network71',
    'db_password' => '',
    'origin' => 'https://example.com',
    'secure_cookie' => true,
    'storage' => dirname(__DIR__) . '/storage',
];
