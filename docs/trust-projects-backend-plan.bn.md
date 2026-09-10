# Network71: বিশ্বাসযোগ্যতা, Projects ও cPanel backend পরিকল্পনা

পরবর্তী scope update: [পুরো ওয়েবসাইটের admin পরিকল্পনা](website-admin-plan.bn.md)। নিচের project-focused scope-এর বদলে এখন পুরো ওয়েবসাইট CMS লক্ষ্য; প্রথম implementation-এর অবস্থা [backend README](../backend/README.md)-তে আছে।

তারিখ: ৯ সেপ্টেম্বর ২০২৬। অবস্থা: **Historical design plan**; backend, Projects UI এবং expanded CMS পরে বাস্তবায়িত হয়েছে। বর্তমান status-এর জন্য [production plan](production-plan.bn.md) ও [backend README](../backend/README.md) দেখুন।

**লক্ষ্য ও সিদ্ধান্ত**

ভিজিটর যেন সহজে বুঝতে পারেন Network71 কী করে, কোন কাজ বাস্তবে করেছে, সেই কাজে দলের ভূমিকা কী ছিল এবং যোগাযোগ করলে কীভাবে কাজ শুরু হবে। এজন্য হোমপেজে বাস্তব কাজের সারাংশ, `/projects`-এ কাজের তালিকা এবং `/projects/:slug`-এ বিস্তারিত case study থাকবে। Admin panel দিয়ে কোড পরিবর্তন ছাড়াই কাজ, ছবি ও অনুমোদিত তথ্য প্রকাশ করা যাবে।

প্রস্তাবিত stack: বর্তমান React/Vite frontend + modular PHP backend + MySQL database। PHP 8.2+ deployment target, hosting provider-এর উপলব্ধ ও supported patch version যাচাই সাপেক্ষে। Host-এর supported MySQL/MariaDB version-এ migration এবং query পরীক্ষা করে নিতে হবে। Database driver হবে PDO; SQL হবে portable, InnoDB ও utf8mb4 ব্যবহার করবে।

বর্তমান corporate content-এর সবকিছু CMS-এ নেওয়া প্রথম ধাপের প্রয়োজন নয়। প্রথম release-এ Projects, trust content, company contact information এবং inquiry management সম্পূর্ণ করা হবে। Blog, careers ও press management পরের ধাপ।

**বর্তমান কোডে যা পাওয়া গেছে**

| জায়গা | বর্তমান অবস্থা | প্রয়োজনীয় পরিবর্তন |
| --- | --- | --- |
| `src/pages/Home.tsx` | Divisions, brands, global presence, stats আছে; completed work section নেই | Hero-এর পরে বাস্তব কাজ সামনে আনা |
| `src/routes.tsx` | Gallery আছে; Projects ও case study route নেই | নতুন list/detail routes এবং header/footer/search-এ লিংক |
| `src/pages/Gallery.tsx` | Unsplash image-ভিত্তিক gallery | বাস্তব project media আলাদাভাবে চিহ্নিত এবং case study-র সাথে যুক্ত করা |
| `src/components/About.tsx` | Unsplash ছবির alt-এ corporate headquarters বলা আছে | বাস্তব অফিসের ছবি ব্যবহার অথবা সঠিক illustrative caption দেওয়া |
| `src/components/Stats.tsx`, `Hero.tsx`, Home | 25+ countries, 5,000+ team members, 12K+ partners/clients-এর মতো hardcoded দাবি | মালিকপক্ষের রেকর্ড দিয়ে যাচাই; প্রমাণ না থাকলে প্রকাশ থেকে সরানো বা নির্ভুল ভাষায় সংশোধন |
| `src/components/TrustedPartners.tsx` | নিজের businesses ও brands দেখায় | এগুলোকে client endorsement হিসেবে উপস্থাপন না করা |
| `src/pages/Contact.tsx`, `src/components/sector/SectorContact.tsx` | Form email draft খোলে | Backend-এ inquiry সংরক্ষণ, reference number এবং admin inbox |

এই audit সংখ্যাগুলো মিথ্যা বলে সিদ্ধান্ত দেয় না; repository থেকে তাদের প্রমাণ নিশ্চিত করা যায়নি। প্রকাশের আগে client names, testimonials, certifications, leadership details, addresses এবং অন্য sector-specific দাবিও একইভাবে যাচাই করতে হবে।

**ভিজিটর কী দেখবেন**

হোমপেজের প্রস্তাবিত ক্রম: পরিষ্কার পরিচয় ও দুটি action → Featured Projects → কাজের ক্ষেত্র → কাজের প্রক্রিয়া → অনুমোদিত client feedback/প্রমাণ → দল ও প্রতিষ্ঠানের পরিচয় → যোগাযোগ। প্রথম action হবে “View Our Work”, দ্বিতীয়টি “Discuss Your Project”। বিদ্যমান দীর্ঘ promotional section-গুলো সংক্ষিপ্ত করে সংশ্লিষ্ট detail page-এ পাঠানো হবে।

Featured Projects-এ সর্বোচ্চ ৩টি ভালোভাবে নথিভুক্ত কাজ দেখানো হবে। প্রতিটি card-এ বাস্তব cover image, কাজের নাম, division, delivery year, সংক্ষিপ্ত scope এবং একটি নির্দিষ্ট outcome থাকবে। সংখ্যা না থাকলে যাচাইযোগ্য qualitative outcome ব্যবহার করা হবে। কার্ড থেকে সম্পূর্ণ case study খোলা যাবে।

`/projects` পেজে search, division filter, project type ও work status filter, pagination থাকবে। Project type: Client work / Own product / Internal initiative। Work status: Completed / Ongoing / Concept। Concept ও ongoing কাজকে completed count-এ ধরা হবে না; default list-এ completed কাজ সামনে থাকবে। Mobile-এ দৃশ্যমান filter controls, এক কলাম; tablet-এ দুই এবং desktop-এ তিন কলাম। Hover ছাড়াই প্রয়োজনীয় তথ্য পড়া যাবে।

প্রতিটি case study-তে থাকবে:

1. প্রকল্পের নাম, বাস্তব ছবি, client-এর অনুমোদিত পরিচয় বা “Confidential client”, sector, location এবং সময়কাল।
2. সমস্যাটি কী ছিল এবং Network71-কে ঠিক কোন কাজ দেওয়া হয়েছিল।
3. দলের নিজস্ব ভূমিকা, scope এবং deliverables; অংশীদার থাকলে দায়িত্বের সীমা পরিষ্কার করা।
4. কাজের ধাপ, বাস্তব progress/delivery ছবি ও ব্যাখ্যামূলক caption।
5. ফলাফল, পরিমাপের সময়সীমা ও পদ্ধতি; কোনো শতাংশ দিলে baseline এবং ফলাফলের উৎস।
6. অনুমতি থাকলে live link, public document এবং নাম-পদবিসহ অনুমোদিত testimonial।
7. সংশ্লিষ্ট কাজ এবং project context-সহ “Discuss a Similar Project” inquiry action।

Screenshot বা stock photo একা delivery-র প্রমাণ নয়। Client-owned কাজের ছবি/লোগো প্রকাশের অনুমতি সংরক্ষণ করতে হবে। Private contract বা ব্যক্তিগত তথ্য public case study-তে যাবে না। Public evidence এবং internal verification document-এর storage আলাদা থাকবে।

নিজস্ব product যেমন Ezyify/eSHIPe-র বাস্তব delivery বা launch status মালিকপক্ষ নিশ্চিত করলে তবেই উপযুক্ত status-এ case study হবে। নাম বা existing marketing page দেখে completed client project ধরে নেওয়া হবে না।

**বিশ্বাস তৈরির বিষয়গুলো**

- বাস্তব team photo, দায়িত্ব, অফিসের ঠিকানা, কাজের যোগাযোগ নম্বর ও domain email দেখানো।
- Client feedback কেবল অনুমোদিত বক্তব্য দিয়ে; নিজের brand-এর logo থেকে client trust দাবি তৈরি না করা।
- Certification থাকলে issuer, reference, validity ও public verification link; মেয়াদোত্তীর্ণ হলে বর্তমান certification হিসেবে না দেখানো।
- কাজের প্রক্রিয়া: আলোচনা → scope ও quotation → milestones → review → handover → agreed support। সময় বা support commitment ব্যবসায়িকভাবে নিশ্চিত না করে লেখা যাবে না।
- Completed project count database থেকে আসবে, কেবল public ও completed কাজ গুনে; অন্য metrics-এ source এবং as-of date সংরক্ষণ করা হবে।
- Empty homepage section লুকিয়ে থাকবে; Projects পেজে বাস্তবসম্মত empty state ও যোগাযোগ থাকবে। Placeholder project, বানানো review বা কৃত্রিম client সংখ্যা দিয়ে জায়গা পূরণ করা হবে না।
- Light/dark theme, স্পষ্ট typography, keyboard access, 44px touch target, mobile-এ যথেষ্ট spacing এবং stable image aspect ratio বজায় থাকবে।

**Admin panel**

`/admin`-এ login করে Projects, Media, Testimonials, Trust Information, Company Settings এবং Inquiries পরিচালনা করা যাবে। Admin UI আলাদা lazy bundle হবে, PHP API permissions দিয়ে প্রতিটি operation যাচাই করবে।

প্রথম release-এ দুই role: Owner এবং Editor। Editor draft তৈরি/সম্পাদনা এবং review-তে জমা দিতে পারবেন। Owner publish/unpublish, user management এবং company settings পরিবর্তন করতে পারবেন। Inquiry access অনুমোদিত staff-এর role অনুযায়ী হবে। Public signup থাকবে না।

Publishing workflow: Draft → In review → Published → Archived। Work status এবং publication status আলাদা field। Published content edit করলে নতুন draft revision হবে; review শেষ না হওয়া পর্যন্ত আগের approved revision public থাকবে। Draft preview login-সুরক্ষিত এবং noindex হবে।

Publish করার আগে title, scope, ভূমিকা, work status, approved cover media, publish permission এবং প্রযোজ্য result evidence নিশ্চিত করতে হবে। কার অনুমোদনে কী প্রকাশ হলো audit log-এ থাকবে। Admin verification-কে public independent certification বলে দেখানো হবে না।

**Database-এর প্রস্তাবিত কাঠামো**

সব table-এ প্রযোজ্য created_at/updated_at, foreign key ও index থাকবে। সময় UTC-তে সংরক্ষণ, UI-তে স্থানীয় সময়।

| Table | প্রধান data ও সম্পর্ক |
| --- | --- |
| `admin_users` | email unique, password_hash, role, active, last_login_at |
| `password_reset_tokens` | user_id, hashed token, expires_at, used_at |
| `divisions` | name, unique slug, sort_order; existing division route-এর সাথে mapping |
| `projects` | unique slug, division_id, published_revision_id, featured_order, archived_at |
| `project_revisions` | project_id, title, summary, client_display_name, client_visibility, type, work_status, location, start/end dates, challenge, role, solution, deliverables, publication_status, permission record, reviewer, published_at, SEO fields |
| `project_results` | revision_id, outcome text, optional numeric value/unit/baseline, measurement period, evidence_media_id |
| `media_assets` | generated filename, storage path, visibility, MIME, size, dimensions, alt, caption, rights/permission record, uploader |
| `project_media` | revision_id, media_id, purpose (cover/gallery/evidence), sort_order |
| `testimonials` | project_id optional, quote, approved name/title/company, permission evidence, publication status |
| `trust_items` | type (metric/certification), label/value, scope, source, as_of_date, expiry, approval, visibility |
| `company_settings` | allowlisted public contact/profile fields; SMTP/database secrets stored elsewhere |
| `inquiries` | random reference, name, email, optional phone/company, message, division_id/project_id, source page, consent record, status, assigned_to |
| `inquiry_notes` | inquiry_id, author_id, internal note; never returned by public API |
| `email_outbox` | inquiry_id, notification type, pending/sent/failed, attempts, next_attempt_at, last_error |
| `audit_logs` | actor, action, entity, revision, time; no passwords/tokens in log |
| `rate_limits` | hashed request identity, window, counter, expiry |

Index publication/status/date and division lookups; enforce one canonical slug per project. Return explicit public fields only. Public queries join only the published revision and public approved media; drafts and internal evidence must stay inaccessible even when an ID is guessed.

**API ও inquiry flow**

| Endpoint | ব্যবহার |
| --- | --- |
| `GET /api/v1/projects?division=&status=&q=&page=` | published list; bounded page size, validated filters |
| `GET /api/v1/projects/{slug}` | approved detail; missing/private project-এ 404 |
| `GET /api/v1/home` | featured projects, approved testimonials ও trust information |
| `GET /api/v1/company` | public contact information |
| `POST /api/v1/inquiries` | validate ও database-এ save; successful commit-এর পরে 201 + random reference |
| `GET /api/v1/auth/csrf` | session-bound CSRF token |
| `POST /api/v1/auth/login`, `/logout` | secure session login/logout |
| `GET /api/v1/auth/me` | current user/role |
| `POST /api/v1/auth/forgot-password`, `/reset-password` | throttled, expiring single-use reset flow |
| `/api/v1/admin/projects` | protected list/create/update/archive ও revisions |
| `POST /api/v1/admin/projects/{id}/publish` | Owner-only verified revision publishing |
| `/api/v1/admin/media`, `/testimonials`, `/trust-items`, `/company`, `/users` | role-checked management; media upload through multipart |
| `/api/v1/admin/inquiries` | inbox, assignment, status ও notes |

Inquiry প্রথমে database transaction-এ outbox entry-সহ সংরক্ষণ হবে। তারপর authenticated SMTP দিয়ে notification পাঠানো হবে; failed mail cron দিয়ে retry হবে। Mail ব্যর্থ হলেও সংরক্ষিত inquiry হারাবে না। Visitor-এর success message হবে “আপনার অনুরোধ পেয়েছি” এবং reference; mail পৌঁছানোর অযাচাইকৃত দাবি করা হবে না। Double submit এড়াতে idempotency key, honeypot ও server-side rate limit থাকবে।

Frontend-এ loading, empty, retry এবং validation error আলাদা state থাকবে। Temporary API failure-কে “কোনো কাজ নেই” দেখানো হবে না। Inquiry ব্যর্থ হলে form data রেখে আবার চেষ্টা ও সরাসরি যোগাযোগের বিকল্প দেওয়া হবে।

**cPanel deployment design**

React-এর production build স্থানীয়ভাবে/CI-তে তৈরি হবে; hosting-এ Vite dev server বা Node runtime চালাতে হবে না। একই domain-এ frontend ও PHP API থাকবে। Composer dependencies-ও matching PHP platform-এ আগে install করে deploy করা যাবে, ফলে server terminal থাকা বাধ্যতামূলক নয়।

```text
/home/<account>/network71-private/
  app/                 PHP controllers, services, repositories, middleware
  config/              database ও SMTP secrets; public root-এর বাইরে
  vendor/              locked Composer dependencies
  database/            versioned migrations
  storage/private/     internal evidence, protected originals
  storage/logs/        application logs
  bin/                 migration ও email retry scripts

/home/<account>/public_html/
  index.html           Vite build entry
  assets/              hashed JS/CSS
  api/index.php        API entry; private application bootstrap করে
  project-page.php     published case study HTML/metadata renderer
  uploads/             approved public image derivatives only
  .htaccess            route handling ও security rules
```

Routing order গুরুত্বপূর্ণ: `/api/*` → PHP API; `/projects/{slug}` → PHP case study renderer; তারপর existing static files; সবশেষে অন্য frontend route → `index.html`। API error কখনো SPA HTML হবে না। `/admin` refresh ও deep link কাজ করবে। বর্তমান `vercel.json` cPanel routing configure করবে না; আলাদা Apache-compatible configuration লাগবে। Host-এর LiteSpeed/Apache behaviour staging-এ পরীক্ষা করতে হবে।

Case study share করলে Facebook/WhatsApp crawler যেন সঠিক title, description ও cover পায়, PHP renderer published revision থেকে Open Graph, canonical metadata ও পাঠযোগ্য case study HTML দেবে। React navigation-এ একই data API থেকে আসবে। Escape করা shared content contract এবং parity test দিয়ে দুই renderer-এর তথ্য মেলানো হবে। Missing/archived slug-এ HTTP 404; slug বদলালে recorded redirect। Published project দিয়ে sitemap তৈরি হবে; draft/admin/API search indexing বন্ধ থাকবে।

Setup sequence: PHP/extensions ও hosting capability পরীক্ষা → cPanel Database Wizard-এ DB/user তৈরি → private application এবং build upload → secrets configure → migration import/run → এককালীন Owner account তৈরি → SSL ও rewrite configure → SMTP test → cron ও backup configure → staging acceptance → production release। Web-based installer ব্যবহার করতে হলে single-use secret ও setup lock লাগবে; release শেষে installer অপসারণ করতে হবে।

Hosting check: PHP 8.2+ ও PDO MySQL, mbstring, fileinfo, OpenSSL, GD/WebP; actual DB version; HTTPS; rewrite support; upload/storage/memory limit; outbound SMTP; cron interval; public root-এর বাইরে readable application directory। cPanel-এর features provider বন্ধ রাখতে পারেন, তাই hosting package না দেখে নির্দিষ্ট compatibility নিশ্চিত করা যাবে না। [cPanel PHP configuration](https://docs.cpanel.net/cpanel/software/multiphp-manager-for-cpanel/), [database management](https://docs.cpanel.net/cpanel/databases/manage-my-databases/), [cron jobs](https://docs.cpanel.net/cpanel/advanced/cron-jobs/), [PHP support lifecycle](https://www.php.net/supported-versions.php)।

**Backend protection ও maintenance**

Server-side validation, PDO prepared statements, output escaping, সীমিত safe content formatting এবং server-enforced role checks থাকবে। Session cookie হবে Secure, HttpOnly, SameSite; login-এ session regeneration, idle expiry, login throttling এবং সব authenticated write-এ CSRF protection। Password hashing হবে PHP password_hash/password_verify দিয়ে। Token localStorage-এ রাখা হবে না।

Media upload-এ JPEG/PNG/WebP allowlist, file signature/MIME ও pixel/size validation, generated filename, image re-encoding এবং non-executable upload storage থাকবে। Private evidence web root-এর বাইরে এবং authenticated download দিয়ে পরিবেশন হবে। Public PDF লাগলে আলাদা checked document flow, size cap ও attachment response; SVG/HTML executable content upload অনুমোদিত হবে না।

SMTP credentials frontend bundle বা repository-তে যাবে না। PHPMailer-এর maintained, locked release ব্যবহার করা হবে। Production-এ debug display বন্ধ, structured errors ও rotated logs থাকবে। Database least-privilege runtime user; migrations-এর জন্য পৃথক setup privileges।

Database ও media backup নিয়মিত offsite রাখতে হবে; restore test দিয়ে recovery নিশ্চিত করতে হবে। Email retry cron-এ overlap lock ও bounded batch থাকবে। Release rollback-এ আগের build রাখতে হবে এবং migration backward compatibility বিবেচনা করতে হবে। Inquiry retention-এর প্রস্তাব ১২ মাস, ব্যবসার প্রয়োজন অনুযায়ী নির্ধারণ; expired reset tokens, rate-limit data ও অপ্রয়োজনীয় personal data cleanup থাকবে।

**বাস্তবায়নের ক্রম ও শেষ হওয়ার শর্ত**

1. Content inventory: বাস্তব কাজ, team/contact তথ্য, claim sources ও client permissions সংগ্রহ; প্রকাশযোগ্য ও internal data আলাদা করা। প্রথম ২–৩টি ভালো case study অগ্রাধিকার, তবে কম থাকলে যতটুকু সত্য তথ্য আছে ততটুকুই প্রকাশ।
2. UI: Featured Projects, list, case study, contact context, mobile/light/dark states; header/footer/search ও সংশ্লিষ্ট sector page-এ integration। বাস্তব data না পাওয়া পর্যন্ত preview-এ স্পষ্ট example label, production-এ সেই example বাদ।
3. Backend: migrations, session auth, roles, media, draft/review/publish, trust settings, inbox ও SMTP outbox; তারপর frontend API integration।
4. cPanel package: production build, PHP dependencies, example configuration, SQL migrations, rewrite rules, cron instructions ও setup/rollback guide।
5. Acceptance: published project list/detail/featured-এ সামঞ্জস্য; draft/private URL inaccessible; Editor publish করতে অক্ষম; unpublish ও revision behaviour; upload rejection; SQL/XSS/CSRF/auth tests; inquiry saved when SMTP fails; retry duplicate protection; mobile widths 320/375/768/1024/1440, both themes, keyboard; project social metadata, refresh/404; fresh install ও backup restore।

এই পর্যায়ের deliverable শুধু এই পরিকল্পনা। Backend/API/admin এবং public Projects UI বাস্তবায়ন এখনও হয়নি। Hosting credentials পরিকল্পনার জন্য প্রয়োজন নেই; implementation/deployment-এর আগে host capability, production domain, SMTP availability এবং প্রথম বাস্তব project content নিশ্চিত করতে হবে।
