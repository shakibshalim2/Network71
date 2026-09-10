<?php
declare(strict_types=1);

require_once __DIR__ . '/Http.php';
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/Auth.php';
require_once __DIR__ . '/Content.php';
require_once __DIR__ . '/Media.php';
require_once __DIR__ . '/Api.php';
require_once __DIR__ . '/SectionValidation.php';
require_once __DIR__ . '/Sections.php';
require_once __DIR__ . '/PasswordReset.php';
require_once __DIR__ . '/EmailTemplate.php';
require_once __DIR__ . '/Outbox.php';
require_once __DIR__ . '/JobApplications.php';
require_once __DIR__ . '/PrivateDocuments.php';

function app_config(): array
{
    $file = dirname(__DIR__) . '/config/local.php';
    if (!is_file($file)) {
        throw new RuntimeException('Backend configuration is missing.');
    }
    $config = require $file;
    if (($config['environment'] ?? '') !== 'development' && (($config['secure_cookie'] ?? null) !== true || !str_starts_with($config['origin'] ?? '', 'https://'))) {
        throw new RuntimeException('Production requires an HTTPS origin and secure session cookies.');
    }
    return $config;
}
