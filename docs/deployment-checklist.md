# Deployment and recovery

Build with `pnpm run build`. Deploy `dist/` into `public_html`, and backend application files into a private sibling directory using `backend/deploy/api-index.php` and `htaccess.example`. Vercel static hosting alone does not execute this PHP API.

Before updating an existing database, run `php backend/bin/backup.php` and copy the private SQL backup plus `backend/storage/media`, `backend/storage/applications` and `backend/storage/private-documents` to protected offsite storage. Do not expose these backups under the document root. The backup set contains account hashes, enquiries, candidate data and confidential project evidence. Keep the previous frontend/backend release until acceptance finishes.

Deploy `backend/app`, `backend/content`, `backend/database`, required `backend/bin` tools and production configuration. Never upload development credentials, isolated database files, tests or `.tmp-*`. Configure the exact HTTPS origin, secure session cookies, `inquiry_retention_days` and `application_retention_days`. Run `php backend/bin/setup.php`, then `php backend/bin/check-deploy.php`. The migration command must complete before the new API receives traffic. Migrations are forward-only; rollback code only when compatible, or restore the full pre-release database and private file set in a maintenance window.

Configure cron to run `backend/bin/send-outbox.php` every minute after SMTP acceptance, and `backend/bin/cleanup.php` daily. Confirm both commands use the intended PHP version and private application path. Review their JSON output during staging.

Staging acceptance:

- Cold-load `/admin/pages`, a division route and a project URL; `/api/v1/health` must return JSON.
- Owner/editor authentication, EN/BN drafts, publish/unpublish, stale save protection and session expiration.
- Media upload, replacement by a new URL, and rejection of archiving a referenced image.
- Career PDF submission/inbox/private download and Project private evidence upload/download/removal; guessed unauthenticated URLs must return 401.
- Password reset link, expiry and single use; ensure reset links are sent privately.
- Public contact submission saved to Inbox. Email notification is not configured merely by saving an enquiry.
- Public page content and section visibility/order in both languages and at mobile/tablet/desktop sizes.
- Confirm private config, database backups and application source cannot be downloaded publicly.
- Restore a backup to a separate database, restore all three file directories, configure an isolated staging instance, and verify counts, public images, one candidate CV, one private evidence file and a published page. Never test restore over the running production database.

Production domain, hosting access, SMTP credentials, approved company imagery and seller details must be supplied by the owner. Do not claim that staging, mail delivery or offsite recovery passed before checking the actual host.

The project social renderer now requires copying `backend/deploy/project.php` to `public_html/project.php` and adjusting its private bootstrap path. The example rewrite routes `/projects/{slug}` through that renderer before the SPA fallback. Test published, missing and unpublished project URLs on the actual host. Deploy `backend/content` and Composer `vendor` alongside application code. Apply all migrations through 009 before switching traffic.
