# Network71 backend — first implementation

The complete website CMS plan is in [website-admin-plan.bn.md](../docs/website-admin-plan.bn.md). This implementation provides a working admin foundation, not a completed migration of every public page.

## Available now

- `/admin` login, desktop sidebar, mobile bottom navigation and responsive forms for every module.
- Sixteen schema-driven modules: pages, divisions, projects, team, posts, press, jobs, gallery, brands, locations, timeline, testimonials, credentials, metrics, navigation and settings.
- MySQL/PDO persistence, owner/editor permissions, draft/published snapshots, optimistic version checks, archive/unpublish and audit logging. Public ordering changes only when published.
- Public collection/detail API, JSON-only errors, validated fields, cookie sessions, CSRF/origin checks and rate limiting.
- Raster image uploads with permission confirmation, MIME/signature checks, pixel/size limits, WebP re-encoding, private filesystem storage and a public image-serving endpoint. All accepted media is public; do not upload confidential documents.
- Account creation/deactivation and CLI password recovery.
- Main contact page and shared sector enquiry forms save to the admin inbox. Server-side idempotency returns the same reference for an identical retried submission.
- Page inventory seed: 16 page drafts and 8 division drafts. These only identify existing routes; they contain no fabricated company details and do not overwrite existing records.

## Still to implement

- Connect all public content sections to the CMS, including page-specific repeatable blocks, home ordering, menus/footer, sector content, blog, jobs, team and gallery. Publishing CMS content currently exposes it through the API; existing public content renderers still use their original copy.
- Public project listing/case-study pages and featured projects; social metadata renderer.
- Full revision history/review approval UI, private project evidence, media replacement/removal workflow and richer field types.
- SMTP delivery/outbox, automated password reset, inquiry assignment/notes, retention automation, verified offsite backups and cPanel production deployment. Inbox storage works without email delivery; no email notification is sent in this phase.
- Actual company content review and publishing. Existing public marketing claims were not verified by building this backend.

## Local setup

Prerequisites: PHP 8.3+ (production target 8.4), PDO MySQL, mbstring, fileinfo, GD with WebP, sessions, and a MySQL/MariaDB database. The test runner also uses PHP cURL.

1. Create a dedicated database and user. Copy `config/example.php` to `config/local.php`; configure DSN, credentials, `environment`, exact browser `origin`, storage directory and secure cookie policy. Local HTTP uses `secure_cookie = false`; production HTTPS uses `true`.
2. Run `php backend/bin/setup.php`. Migrations are tracked in `schema_migrations`; take a backup before applying them to an existing environment.
3. Set `N71_OWNER_EMAIL` and `N71_OWNER_PASSWORD` in the current shell, then run `php backend/bin/setup.php --owner`. No default password or public signup exists. Clear those environment variables afterwards.
4. Optionally run `php backend/bin/seed-pages.php` to create the existing page inventory as drafts.
5. Run `pnpm dev:api` (loopback port 8787) and `pnpm dev` (port 8443). Vite forwards `/api` requests to PHP. Visit `http://localhost:8443/admin`.

The local instance created during development uses an isolated MariaDB data directory under ignored `backend/storage/database`, loopback port 33171, PHP on 8787 and Vite on 8443. Its generated local-only owner credentials are in ignored `backend/storage/local-admin.txt`. These files are not deployment assets. After restarting the machine, start the isolated database before starting PHP.

To reset an account through server CLI, set the same two environment variables and run `php backend/bin/reset-password.php`. The command never creates or reactivates an account. Production automated reset is a later feature.

## HTTP contract

Prefix `/api/v1`:

| Method / path | Behaviour |
| --- | --- |
| `GET /health` | Database connectivity |
| `GET /auth/session` | Current user or null, plus CSRF token |
| `POST /auth/login`, `/auth/logout` | Session authentication |
| `GET /admin/modules`, `/admin/dashboard` | Form schemas and actual workspace counts |
| `GET/POST /admin/content/{module}` | Paginated list / new draft |
| `PUT /admin/content/{module}/{id}` | Save draft using `version` |
| `POST /admin/content/{module}/{id}/state` | Owner publish/unpublish/archive using `action` and `version` |
| `GET /content/{module}[/{slug}]` | Public published content only |
| `GET/POST /admin/media` | Paginated media list / multipart upload (`file`, `alt`, `permission=yes`) |
| `GET /media/{filename}` | Re-encoded public image, immutable URL |
| `POST /inquiries` | Save message; required random `request_key` (20–64 alphanumeric/hyphen characters) |
| `GET /admin/inquiries` | Paginated inbox |
| `PATCH /admin/inquiries/{id}` | `status`: new, in_progress, closed |
| `GET/POST /admin/users` | Owner account list/create |
| `PATCH /admin/users/{id}` | Owner enables/disables another account with boolean `active` |

Content writes contain `slug`, `sort_order`, `data` and, for existing records, `version`. Schema validation strips unknown fields. Fields other than the title may be incomplete while drafting; required publication fields are checked on publish. Search/pagination parameters are `q` and `page`; content pages are limited to 30 records, media to 24. The first version supports text-based search only, not full-text ranking.

All authenticated writes require the current `X-CSRF-Token`. Sessions rotate at login, expire after 30 minutes of inactivity, and check current account access on each request. Deactivation revokes access. Database and SMTP credentials never belong in public Settings content.

## cPanel package

1. Build React with `pnpm run build`; upload only `dist` contents into `public_html`.
2. Copy the backend into `/home/ACCOUNT/network71-private`. Exclude local config, storage/database, development credentials, tests and development router; create production config privately. Include app, config template, database migrations and CLI tools needed for setup.
3. Copy `deploy/api-index.php` to `public_html/api/index.php`. Adjust the private directory path if necessary.
4. Merge `deploy/htaccess.example` into `public_html/.htaccess`, preserving cPanel-generated PHP handler rules. API routes must be handled before the SPA fallback. The example targets Apache-compatible rewriting and must be tested on the actual host.
5. Use cPanel Database Wizard to create database/user; import the numbered SQL migrations with phpMyAdmin or run the CLI migration tool. If manually importing, also record the applied migration versions in `schema_migrations` to prevent rerunning DDL. Use a separate migration account; runtime only needs SELECT/INSERT/UPDATE/DELETE.
6. Configure HTTPS, production origin, secure cookies, storage permissions, error logging and backups. Create owner credentials privately. Test cold page loads, API JSON errors, login/logout, writes, images, forms and backups before public release.

Do not upload the repository wholesale. Database data, config, credentials, logs and PHP source belong outside the public document root. The PHP built-in server is for local development only. This phase has no Composer dependencies yet; SMTP will introduce a locked PHPMailer dependency.

## Verification

`pnpm run build` checks TypeScript and the production bundle. PHP syntax can be checked with `php -l` on each source file.

For real HTTP/database integration checks, start the development API, set `N71_TEST_EMAIL` and `N71_TEST_PASSWORD` to a development owner, then run `php backend/tests/http-smoke.php`. Optionally set `N71_TEST_BASE_URL` to a loopback API address. The suite refuses non-development configurations and non-loopback URLs; it creates random fixtures and deletes only those fixtures in `finally`. It consumes normal rate-limit attempts, so avoid repeatedly running it against a shared development login within 15 minutes.

Production PHP 8.4, a modern MySQL/MariaDB host, Apache/LiteSpeed rewrites, real SMTP and backup recovery require staging verification; local tests alone do not establish those deployment guarantees.

Implementation references: [PHP cookie sessions](https://www.php.net/manual/en/function.session-set-cookie-params.php), [PDO prepared statements](https://www.php.net/manual/en/pdo.prepared-statements.php).

Local verification on 9 September 2026 used PHP 8.3.33 and an isolated MariaDB 10.4.28 instance. The HTTP suite passed 38 checks, including password-reset session invalidation. Browser checks covered all admin module lists/forms at 320, 375, 768, 1024 and 1440 pixels, draft persistence, navigation guards, logout and public-site navigation isolation. Main contact and sector form submissions were verified in the inbox; test records were removed afterwards. Selected accessibility rules were checked on the content editors and admin utility screens. Production TypeScript/Vite build passes with the existing large globe-chunk warning.

## CMS foundation checkpoint — 10 September 2026

Run `node scripts/export-content-schema.mjs` to regenerate packaged EN/BN schemas/templates. Back up the database (`php backend/bin/backup.php`) and apply `php backend/bin/setup.php` before deploying this revision; migration 003 is required. `php backend/tests/section-schema.php` validates packaged templates.

Public `GET /api/v1/page/{page_key}?locale=en|bn` returns published sections and visibility/order metadata. Authenticated `GET /api/v1/admin/sections` returns the catalog; `GET /api/v1/admin/sections/{page_key}?locale=en|bn` returns schemas/defaults/drafts. `PUT` on the latter saves `{section,locale,data,visible,order,version}` (version 0 for a new draft); owner-only `POST` takes `{section,locale,action,version}` for publish/unpublish.

Collection lists/details support `locale=en|bn`; writes include locale. Existing rows are English. The page editor and admin language tabs are still pending, as are reset/media deletion endpoints despite their reserved schema. This is an implementation checkpoint, not a completed CMS or production deployment.

## Email notification outbox

Install locked PHP dependencies with `composer install --no-dev --working-dir=backend` (or run Composer in the private backend directory), and deploy vendor with the backend. Migration 004 atomically stores an outbox notification with every new enquiry; retried submissions do not enqueue another notification.

Configure the private `smtp` array from config/example.php, then run `php backend/bin/send-outbox.php` every minute through cPanel cron. SMTP is disabled by default. The worker uses authenticated TLS via PHPMailer, a non-overlapping file lock, batches of 20, exponential retry and a maximum of 10 attempts. Failed messages remain recorded with the enquiry. SMTP acceptance followed by a process/database failure can result in duplicate delivery on retry; a stable Message-ID is used, but exactly-once delivery is not claimed.

`php backend/tests/outbox.php` simulates provider failure and recovery on one isolated development fixture; actual SMTP and external delivery must be checked on staging. The implementation follows the [PHPMailer SMTP documentation](https://github.com/PHPMailer/PHPMailer). No real email was sent during development checks.

## Current admin and deployment additions

`/admin/pages` now edits packaged page sections in EN/BN, supports draft save/publish, visibility/order, page SEO and authenticated saved-draft previews. Shared text is under `site`; homepage layout is under `home`. `php backend/bin/seed-sections.php` optionally imports missing templates as drafts without overwriting existing records or publishing. Generic collection-to-public-section mapping is still incomplete; see the latest checkpoint in docs.

Media archive is owner-only and rejects referenced assets. Replace an image by uploading a new asset, updating/publishing its references, then archiving the old unused asset. Owner-generated password reset links expire after 30 minutes and can be consumed once; they are shown for private sharing, not automatically emailed.

For project social metadata, deploy the project.php example and its matching rewrite rule as documented in `docs/deployment-checklist.md`. Local rendering tests do not establish actual cPanel compatibility.
