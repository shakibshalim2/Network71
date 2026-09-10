# Network71 — Production-level completion plan

তারিখ: ৯ সেপ্টেম্বর ২০২৬ · Branch: `hoplite/halikarnassos-28c502d9` · Status: **কাজ চলছে** (প্রতিটি ধাপ শেষে এই ফাইলের status table আপডেট হবে)

এই plan-টি ৪টি স্বতন্ত্র audit (public corporate pages, division pages, admin + backend, performance/code-health) এবং ২৬টি route-এর full-page screenshot review-এর ভিত্তিতে তৈরি। কাজের নিয়ম: **এক ধাপ → test → commit → push**, তারপর পরের ধাপ। কোনো ফাইল ~250 লাইন (`.tsx`) / ~300 লাইন (`.ts` data) ছাড়াবে না। Public site-এর design **wholesale change হবে না** — শুধু গ্যাপ পূরণ, polish ও bug fix।

---

## ১. Brief coverage — কী আছে, কী নেই

| Brief-এর দাবি | অবস্থা | মন্তব্য |
| --- | --- | --- |
| ১০টি division (Garments, Agriculture, F&B, Oils & Energy, Ezyify, IT, Trading, Strategic Ventures, Media, Ship Marketplace) | ✅ আছে | প্রতিটির নিজস্ব page, hero, sections, inquiry form |
| Vision: “Building Businesses. Connecting Markets. Creating the Future.” | ✅ আছে | Homepage About section + প্রতিটি page-এর GlobalCTA |
| Media: Digital Newspaper + TV, News/Breaking/Live/Video/Programs/Business/International/Technology/Culture/Investigative, advertising + partnership | ✅ আছে | ৬ coverage desk, TV schedule, “Reach Our Audiences” advertising section |
| Ship Marketplace: buy/sell/lease/discover, vessel specs, categories, search & filter, buyer-seller profiles, inquiry | ⚠️ আংশিক | Search/filter/categories/listing/inquiry আছে। **Vessel detail (full specification) view নেই**, buyer/seller profile শুধু text-এ উল্লেখ — কোনো UI নেই |
| Ezyify: AI, social commerce, video commerce, creator marketplace, cross-border | ✅ আছে, কিন্তু **bug** | `EzyifyPage.tsx`-এ ৬টি section ভুল content prop পাচ্ছে (Segments↔AI, Roadmap↔Revenue…) — page-এর গল্প এলোমেলো |
| EN/BN toggle পুরো site-এ | ✅ আছে | ২৬ route render-audit-এ leak নেই |
| Responsive (desktop/tablet/mobile) | ✅ overflow নেই | 375/768/1440-এ ২৬ route-এ horizontal overflow পাওয়া যায়নি; polish বাকি (নিচে) |
| Real imagery | ⚠️ | ৬৪টি image Unsplash CDN থেকে আসে (stock)। বাস্তব company ছবি পেলে admin media library থেকে replace করা যাবে |
| Real 3D | ✅ | Homepage three.js globe (lazy, 637 kB chunk — optimise করা হবে) |
| **No exaggerated / unverifiable claims** | ❌ **সমস্যা আছে** | নিচের তালিকা দেখুন |
| Admin: সব page-এর সব content edit | ❌ **নেই** | ১৬টি generic module আছে, কিন্তু ২৬টি public page-এর hero/section copy hardcoded; publish করলে public site-এ কোনো effect হয় না |
| Admin mobile app-like | ⚠️ আংশিক | Bottom nav আছে; confirm dialog, loading/error state, media delete, EN/BN field নেই |
| cPanel-hostable PHP + MySQL backend | ✅ ভিত্তি আছে | PHP 8.3 + PDO/MySQL, `.htaccess` example, 38/38 smoke test pass। Deployment checklist/validator বাকি |

### Unverifiable claims (সব সরানো/নিরপেক্ষ করা হবে)

| কোথায় | দাবি |
| --- | --- |
| `index.html` meta/og | “25+ countries”, “Eight distinct business divisions” (এখন ১০) |
| `global-presence/content` | “25+ Countries of Operation”, “8”, “6” |
| `sustainability/content` | 40%/35%/60%/60% targets, “37,500+ Lives Impacted”, “12,000+ Farmers”, “8,500+”, “3,200+”, “13,800+” |
| `sectors/eshipe/content` | “50+ Countries”, “200+ Active Buyers”, “150+ Vessel Sellers”, “25+ Recycling Yards”, “✓ 200+ buyers registered” |
| `sectors/media/content` | “25+ Countries” audience reach, “2024” |
| `ezyify/content` (+ IT page-এর Ezyify teaser) | “10M+ Target Users”, “$500M Market Potential”, “50+ AI Models”, “99.9% Uptime SLA”, “200+ engineer team”, “trillions” |
| `sectors/garments/content` | “5+”, “2,000+”, “15+” |
| `sectors/agriculture/content` | “10K+”, “500+”, “100%”, “18+” |
| `sectors/oils-energy/content` | “1M+” |
| `sectors/food-beverage/content` | “50+”, “95%+”, “98%+”, “ISO-standard”, “Halal-certified” (certificate ref withheld) |
| `sectors/garments`, `food-beverage`, `oils-energy` | WRAP/BSCI/HACCP/ISO certification grids |
| `components/Stats.tsx` (unused, dead) | 25+, 5000+, 12K+ |

নীতি: সংখ্যা যেখানে company records দিয়ে প্রমাণ করা যায় না, সেখানে **qualitative, verifiable** তথ্য (যেমন “Dhaka HQ”, “10 divisions”, “Bangladesh export base”) বা admin-controlled “Verified metrics” module থেকে আসা মান দেখানো হবে। Certification যেখানে issuer/reference নেই, সেখানে “target standards / working towards” ভাষা ব্যবহার হবে, অথবা admin Credentials module থেকে published credential দেখানো হবে।

### Design/UX gaps (page-by-page)

- **Home**: Divisions grid-এ ১০টি card আছে ✅; hero → work → divisions flow ভালো। Stats section unused/dead। Ezyify section-এর mock numbers (“24.3K followers”, “892 sales”) demo-UI হিসেবে থাকবে কিন্তু label “Illustration” থাকবে।
- **About**: hero-তে visual নেই (text-only); leadership-এ ২টি “To Be Announced” placeholder card — সরিয়ে শুধু confirmed profile দেখানো হবে।
- **Leadership**: ৬টি নাম-ছাড়া role card (CFO/CMO/CTO “placeholder”) — unverifiable; শুধু confirmed leader + “team profiles via admin” pattern।
- **Gallery/Projects/Careers**: honest empty state আছে ✅; admin থেকে content দিলে দেখাবে ✅।
- **eSHIPe**: vessel card → detail view (specs, seller profile card, inquiry prefill) নেই; category card-এ hover state দুর্বল।
- **Media**: “Live Now” badge static — “Live schedule” হিসেবে label বদলানো হবে; gallery lightbox নেই।
- **Ezyify**: section mismatch bug (উপরে)।
- **Cross-cutting**: `Footer.tsx` 260 লাইন (split হবে); `/divisions/eshipe` ও `/divisions/ship-marketplace` duplicate route (canonical redirect হবে); `sitemap.xml` নেই; `Stats.tsx`, `Innovation.tsx` dead code; three.js wildcard import (tree-shake হবে); Unsplash image-এ `loading="lazy"`/dimension audit।

---

## ২. Admin + Backend gap

- **Content model**: `content_records(module, slug, draft_json, published_json)` — single language, generic ১৬ module। Public page-এর section-wise content (hero, stats, services, faq…) এর সাথে map করা নেই।
- **Public consumers**: শুধু Projects, Gallery, Careers(jobs) API থেকে পড়ে; বাকি সব `content/en.ts`/`bn.ts` থেকে।
- **Admin UX**: publish/archive-এ confirm নেই, list-এ loading/error/empty state আংশিক, media delete/replace নেই, icon-only button-এ aria-label নেই, success message-এ `aria-live` নেই, tablet breakpoint নেই, `screens.tsx` 1015 লাইন।
- **Backend**: auth/CSRF/rate-limit/PDO ঠিক আছে ✅। নেই: locale-aware content, page-section endpoint, media delete, password reset (CLI only), SMTP, deployment validator, error-log config।

---

## ৩. Target architecture (cPanel-compatible)

```
public_html/            ← Vite dist (index.html, assets/, sitemap.xml, robots.txt, .htaccess)
public_html/api/index.php ← thin bootstrap → ../network71-private/public/index.php
network71-private/      ← backend/ (app, config/local.php, database, storage/media, bin)
MySQL: ACCOUNT_network71 (utf8mb4)
```

### Data model additions

1. `page_sections` — `page_key` (route id, e.g. `about`, `divisions/garments`), `section_key` (e.g. `hero`, `services`), `locale` (`en`/`bn`), `draft_json`, `published_json`, `status`, `version`, `sort_order`, `visible`, `updated_by`, timestamps. Unique `(page_key, section_key, locale)`.
2. `content_records` এ `locale` column (default `en`) + unique `(module, slug, locale)` — collection modules (posts, jobs, team…) EN/BN উভয়ে।
3. `media_assets.deleted_at` (soft delete) + replace endpoint।
4. `password_resets` (token hash, expires) — email delivery optional (SMTP config থাকলে), না থাকলে owner CLI/Admin “generate reset link”।

### Section schema

প্রতিটি public page-এর `content/en.ts` **এই মুহূর্তেই typed section object** (`hero`, `overview`, `services`, …)। এটাই schema-এর source of truth হবে:

- Build-time script `scripts/export-content-schema.ts` → `backend/content/schema.json` (page → section → field paths + type: `string`, `string[]`, `object[]`) এবং `backend/content/seed.{en,bn}.json` (default content)।
- PHP `Sections.php` schema দিয়ে validate করবে (unknown key strip, type check, max length), সব field editable form হিসেবে render হবে (nested list → repeatable rows, text vs textarea heuristics)।
- Public: `GET /api/v1/page/{page_key}?locale=bn` → `{ sections: { hero: {...}, ... }, updated_at }` (published only, ETag/Cache-Control 60s)।
- React: `useLocalizedContent(en, loaders, { page: 'about' })` → hardcoded content render হয় তৎক্ষণাৎ, API response এলে **deep-merge override** (কোনো section published না থাকলে fallback অটো)। Zero layout change।

### Admin UI (mobile app-like)

- Route: `/admin/pages` → page list (26) → page → section list (visible toggle, order) → section editor (EN | BN tab, autosave draft, publish, preview link)।
- Shared primitives: `ConfirmDialog`, `Toast` (`aria-live`), `Skeleton`, `EmptyState`, `Sheet` (mobile bottom sheet)।
- Bottom nav: Home · Pages · Collections · Inbox · More। Sticky bottom action bar (Save/Publish) mobile-এ। Safe-area padding, 44px targets, tablet breakpoint (600–1023)।
- `screens.tsx` → `src/admin/screens/*.tsx` (প্রতিটি ≤250 লাইন)।
- PWA manifest scope `/admin` (standalone display) — cPanel static।

---

## ৪. Steps (প্রতিটি: implement → test → commit → push)

| # | কাজ | Test | Status |
| --- | --- | --- | --- |
| 0 | এই plan + audit report commit | — | ✅ |
| 1 | Ezyify section prop bug fix; canonical `/divisions/ship-marketplace` redirect; dead `Stats.tsx`/`Innovation.tsx` remove; `Footer.tsx` split | tsc, build, browser h2 order, 301-style redirect | ⬜ |
| 2 | Unverifiable claims cleanup (index.html, global-presence, sustainability, eshipe, media, ezyify, garments, agriculture, oils, F&B) EN + BN একসাথে; certification wording | tsc, BN/EN render audit, grep re-scan | ⬜ |
| 3 | About/Leadership placeholders সরানো; Leadership → team module থেকে confirmed profiles; About hero visual | browser 375/768/1440 | ⬜ |
| 4 | eSHIPe vessel detail sheet (specs, seller card, inquiry prefill) + category hover; Media gallery lightbox + “Live” label fix | interaction test | ⬜ |
| 5 | Perf: three.js named imports, image `loading="lazy"` + dimensions, `sitemap.xml`, `<html lang>` verify, reduced-motion audit | build chunk sizes, Lighthouse-style checks | ⬜ |
| 6 | Backend: migrations 003 (`page_sections`, `locale`, `media.deleted_at`, `password_resets`), `Sections.php`, page API, schema export script + seed importer, media delete/replace, reset-link flow | `php -l`, smoke tests extended, curl | ⬜ |
| 7 | Frontend hook: `usePageContent` merge into `useLocalizedContent`; wire ২৬ pages (batch by 6–7, each batch commit) | per-page EN/BN render with published override | ⬜ |
| 8 | Admin refactor: `screens/*`, primitives, Pages module UI (EN/BN tabs, repeatable rows, publish), Collections locale tab, media delete, confirm/toast/skeleton, tablet breakpoint, PWA manifest | browser 375/768/1440, a11y checks | ⬜ |
| 9 | cPanel package: `deploy/` checklist, `bin/check-deploy.php` (extensions, writable storage, DB, rewrite), `.htaccess` final, `README` update | script run locally | ⬜ |
| 10 | Final full review: all 26 routes × 3 widths × EN/BN, admin flows, smoke suite, build; fix regressions; update this table | full matrix | ⬜ |

প্রতিটি ধাপে যে ফাইল push হওয়ার পর সমস্যা মনে হবে, পরের commit-এ সেটাই fix করে আবার push হবে।

## Implementation log — 10 September 2026

- Baseline reconciliation: steps 1–2 were already committed upstream; the table above is the original plan, not evidence of completion. Step 3 already had its About/leadership copy changes.
- Step 3: Leadership now reads owner-published Team profiles, with pagination and loading/retry states. No sample profiles were seeded. Existing CEO copy remains as supplied; company facts still need owner verification.
- Step 4: added a native accessible vessel specification dialog, requirements prefill into the sector enquiry form, category links/hover, and Media gallery lightbox. Illustrative inventory stays labelled; unavailable seller/class/survey information is explicitly undisclosed. No real seller profiles were invented.
- Validation: TypeScript passed; Chrome at 375px passed dialog open/Escape, enquiry prefill, gallery lightbox and overflow checks. Live database-backed Team publication is included in the later CMS integration checks.
- Step 5: explicit Three.js imports, missing async/lazy image hints and static public-route sitemap added. Existing fixed image containers reserve layout space; hero/logo images remain eager. Production build passed. Globe remains 637 kB: named imports did not reduce this chunk; no performance gain is claimed. Existing reduced-motion and offscreen-render guards were inspected; final browser matrix remains pending.

## Pause checkpoint — user requested stop (10 September 2026)

Completed and pushed before this checkpoint: published Team section, vessel example detail/enquiry prefill, Media lightbox, public sitemap, image loading hints and explicit Three.js imports.

CMS foundation added in this checkpoint (not a completed CMS rollout):
- Migration 003 adds locale-aware collections, page_sections, and reserved media deletion/password reset columns/tables. Media deletion and reset endpoints are NOT implemented.
- Export script generates 26 page/shared-copy schemas and EN/BN draft templates; 508 locale sections pass schema validation. Templates are files only; no marketing content was automatically published.
- Authenticated section draft/publish API enforces owner publishing, CSRF and version checks; public API returns published snapshots. Full authenticated HTTP regression testing remains pending.
- 25 existing page content hooks plus shared homepage/navigation translations can consume published overrides with packaged-copy fallback. Direct content-driven sections support visibility/order; complete homepage layout control, every nested/shared section, SEO management and draft preview still need work.
- Collection requests now carry EN/BN locale; admin collection language controls remain pending. Existing records remain English; Bangla collections require separately published Bangla records.
- Local database backup was created privately before applying migration 003. Backup restore/offsite verification has NOT been performed.

Still pending: page/section admin editor and locale tabs; admin refactor; media delete/replace workflow; reset-link workflow; SMTP/outbox; complete CMS coverage and preview; cPanel deployment validator/package; live company/seller/evidence data; full responsive/accessibility and authenticated API regression matrix. No production deployment was performed. Work paused at the user request; do not treat original unchecked plan rows as finished.
- Pause validation: final TypeScript/Vite production build passed (existing 637 kB globe warning); PHP syntax checks passed; 508 section templates and unsafe URL rejection passed; public About section API returned valid empty overrides; Chrome About EN/BN fallback had no runtime errors. Full CMS write/publish integration remains unverified.

## Resumed implementation — 10 September 2026

- `/admin/pages`: schema-based nested fields and repeatable rows, EN/BN selection, draft save, owner publishing, visibility/order and public-page link; unsaved edits retain navigation protection. Collection editors now choose EN/BN.
- Admin screens split into separate files; media archive rejects referenced images; replacement uses new immutable upload URL followed by draft/publish and archive.
- Owner can generate a private 30-minute reset link; tokens are hashed, single-use, and password change revokes existing sessions. No reset email is sent automatically.
- Added cPanel readiness checker, deployment/restore checklist and scoped admin manifest.
- Verified: 13 real HTTP/MySQL checks for sections/reset; 508 schema templates; Chrome admin login and EN/BN nested editor at 375/768/1440 widths; production build passed.
- Remaining: SMTP/outbox, full section/SEO/preview coverage, complete route matrix and actual hosting/offsite restore verification. Earlier checkpoint remains historical.
