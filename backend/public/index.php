<?php
declare(strict_types=1);

require dirname(__DIR__) . '/app/bootstrap.php';
try {
    (new Api(app_config()))->run();
} catch (HttpError $error) {
    Http::json(['error' => $error->getMessage()], $error->status);
} catch (Throwable $error) {
    error_log('Network71 API: ' . $error->getMessage());
    Http::json(['error' => 'The service is temporarily unavailable. Please try again.'], 503);
}
