# Deployment and recovery

Run `pnpm run package:cpanel` to build `artifacts/network71-cpanel.tar.gz` and verify it against the generated `.sha256` sidecar after upload. Extract its `public_html` and `network71-private` directories under the cPanel account home, then create the private production configuration from `network71-private/config/local.php.example`. The archive includes a per-file SHA-256 manifest and excludes local credentials, tests, logs, database state and uploaded files. Vercel static hosting alone does not execute this PHP API.

Before updating an existing database, run `php backend/bin/backup.php` and copy the private SQL backup plus `backend/storage/media`, `backend/storage/applications` and `backend/storage/private-documents` to protected offsite storage. Do not expose these backups under the document root. The backup set contains account hashes, enquiries, candidate data and confidential project evidence. Keep the previous frontend/backend release until acceptance finishes.

Deploy `backend/app`, `backend/content`, `backend/database`, required `backend/bin` tools and production configuration. Never upload development credentials, isolated database files, tests or `.tmp-*`. Configure the exact HTTPS origin, secure session cookies, `inquiry_retention_days` and `application_retention_days`. Run `php backend/bin/setup.php`, then `php backend/bin/check-deploy.php`. The migration command must complete before the new API receives traffic. Migrations are forward-only; rollback code only when compatible, or restore the full pre-release database and private file set in a maintenance window.

Copy `backend/deploy/user.ini.example` to `public_html/.user.ini`, or set the same values in cPanel MultiPHP INI Editor. The API requires `upload_max_filesize` of at least 10 MB, `post_max_size` of at least 12 MB and `memory_limit` of at least 128 MB; host-level limits can override `.user.ini`, so confirm them with `backend/bin/check-deploy.php`.

Configure cron to run `backend/bin/send-outbox.php` every minute after SMTP acceptance, and `backend/bin/cleanup.php` daily. Confirm both commands use the intended PHP version and private application path. Review their JSON output during staging.

Staging acceptance:

- Cold-load `/admin/pages`, a division route and a project URL; `/api/v1/health` must return JSON.
- Owner/editor authentication, EN/BN drafts, publish/unpublish, stale save protection and session expiration.
- Media upload, replacement by a new URL, and rejection of archiving a referenced image.
- Career PDF submission/inbox/private download and Project private evidence upload/download/removal; guessed unauthenticated URLs must return 401.
- Password reset link, expiry and single use; ensure reset links are sent privately.
- Public contact submission saved to Inbox. Email notification is not configured merely by saving an enquiry.
- Investor enquiry, Blog subscription and Ezyify waitlist submissions saved to Inbox with an outbox entry and a returned reference.
- Public page content and section visibility/order in both languages and at mobile/tablet/desktop sizes.
- Confirm private config, database backups and application source cannot be downloaded publicly.
- Restore a backup to a separate database, restore all three file directories, configure an isolated staging instance, and verify counts, public images, one candidate CV, one private evidence file and a published page. Never test restore over the running production database.

Production domain, hosting access, SMTP credentials, approved company imagery and seller details must be supplied by the owner. Do not claim that staging, mail delivery or offsite recovery passed before checking the actual host.

The project social renderer now requires copying `backend/deploy/project.php` to `public_html/project.php` and adjusting its private bootstrap path. The example rewrite routes `/projects/{slug}` through that renderer before the SPA fallback. Test published, missing and unpublished project URLs on the actual host. Deploy `backend/content` and Composer `vendor` alongside application code. Apply all migrations through 009 before switching traffic.
