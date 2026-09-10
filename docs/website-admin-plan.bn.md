# Network71: পুরো ওয়েবসাইটের admin ও backend

Status (১০ সেপ্টেম্বর ২০২৬): core admin, ৫৬০টি EN/BN page-section template, server draft autosave, ১৬টি collection consumer, বাধ্যতামূলক Draft → In review → Approved → Published workflow, revision preview/restore, inquiry inbox/outbox, private career application inbox, project evidence vault, media archive, reset links এবং deployment package implemented। Production deployment, offsite restore verification ও owner content acceptance open।

এই পরিকল্পনা আগের project-কেন্দ্রিক MVP scope-কে সম্প্রসারিত করে। লক্ষ্য হলো পুরো ওয়েবসাইটের content management; project showcase তার একটি module।

## কী নিয়ন্ত্রণ করা যাবে

| Admin module | দায়িত্ব |
| --- | --- |
| Dashboard | Draft/published content, incoming inquiries, recent changes |
| Pages | Home, About, Investors, Sustainability, Governance, Legal, Brand ও অন্য static page-এর text, section ও SEO |
| Divisions | আটটি বিভাগের পরিচিতি, services, process, metrics ও contact |
| Projects | Client work, own product, location/duration, deliverables, captioned gallery, result baseline/source/date, approved testimonial, public evidence link ও authenticated private evidence vault |
| Vessels / Sellers | eSHIPe inventory, vessel specifications, approved seller profile ও slug-based relation |
| Team | Leadership ও team পরিচিতি |
| Insights / Press | Blog এবং press releases |
| Careers | Job opening, EN/BN application form, private PDF CV, consent/retention policy, status ও assignment inbox |
| Media / Gallery | Image upload, alt text, captions, published gallery |
| Brands | নিজস্ব brands ও products |
| Locations / Timeline | Global presence ও milestones |
| Testimonials / Credentials / Metrics | Permission-সহ feedback, certifications ও verified claims |
| Navigation | Header/footer links ও ordering |
| Settings | `company-profile` record থেকে global general/careers/press/legal/investor contacts, phone, website, business hours, operating/registered address ও social profiles; server secrets নয় |
| Inquiries | Website থেকে আসা message, reference ও follow-up status |
| Users / Activity | Owner/editor accounts, role checks এবং audit trail |

## Admin mobile behaviour

Desktop-এ sidebar, tablet-এ compact layout, mobile-এ app-এর মতো fixed bottom navigation: Home, Content, Projects, Inbox, More। Content ও More screens থেকে সব module পাওয়া যাবে; horizontal overflowing tab bar থাকবে না।

প্রতিটি module-এর list mobile-এ card হবে। Forms এক column, input font অন্তত 16px, touch target অন্তত 44px, safe-area inset এবং bottom navigation-এর জন্য content padding থাকবে। Save action keyboard ও ছোট viewport-এ ব্যবহারযোগ্য থাকবে। Unsaved changes থাকলে navigation-এর আগে draft হারানোর সতর্কতা থাকবে।

Bottom navigation শুধু `/admin/*`-এ থাকবে। Public website-এর বর্তমান responsive behaviour অপরিবর্তিত; user-facing mobile app navigation যোগ হচ্ছে না।

## বাস্তবায়নের ধাপ

1. **এই কাজের প্রথম ধাপ:** PHP/PDO MySQL schema ও setup tools, secure session login, Owner/Editor permissions, schema-driven content editor, draft/published snapshots, media upload, inquiry API/inbox, account management, audit log এবং responsive admin shell। Public collection APIs থাকবে; existing page content migration আলাদা কাজ হিসেবে দৃশ্যমান থাকবে।
2. **Public content migration:** বর্তমান প্রতিটি page/component থেকে business content structured data-তে আনা; admin field-এর সাথে renderer mapping; homepage section ordering/visibility/images/destinations, header/footer/settings, sector pages, articles/jobs/team/gallery। প্রতিটি migrated section edit/publish করে public site-এ যাচাই করতে হবে। Layout/route implementation code-managed থাকবে।
3. **Project showcase:** Featured work, project list/detail, actual client material, approved evidence, share metadata এবং related inquiry।
4. **Operations:** Authenticated SMTP/outbox retry, password reset এবং private documents implemented; image derivatives, verified offsite backup/restore, cPanel staging, production hardening ও deployment external operations।

## Data ও security

প্রথম ধাপে shared content records ব্যবহার হবে: module + unique slug + draft JSON + separately published JSON + version + status + ordering। Server-owned schemas field validation করবে; arbitrary JSON/HTML editor public interface হবে না। Public API শুধু published snapshot ফেরত দেবে। Draft edit live data বদলাবে না। Editor draft save/review request করতে পারবেন; Owner approval ছাড়া current version publish হবে না। পুরোনো revision preview/restore করা যায় এবং restore হলে approval reset হয়। Optimistic version check stale overwrite আটকাবে।

Schema-driven প্রথম ধাপের পরে page-specific repeatable blocks এবং প্রয়োজনীয় relational project evidence/result tables যোগ হবে। Existing content-এর প্রতিটি field-এর migration inventory থাকবে।

PDO prepared queries, password hashing, expiring sessions, CSRF checks, login/inquiry rate limits, role checks এবং transactional audit logs থাকবে। Public Media raster image decode/re-encode করে। Confidential project evidence আলাদা private storage-এ PDF/JPEG/PNG allowlist, signature/size validation ও authenticated download ব্যবহার করে; কোনো public URL তৈরি হয় না।

Production target PHP 8.2+ এবং supported MySQL/MariaDB। Local environment-এ উপলব্ধ PHP 8.3 এবং isolated MariaDB দিয়ে functionality test করা হয়েছে; actual cPanel PHP/MySQL environment staging acceptance-এর অংশ। cPanel-এ static React build + PHP API, private application files public_html-এর বাইরে, same-origin API এবং HTTPS cookie।

## Acceptance

সব admin module-এ loading/error/empty states; save এবং reload persistence; draft/public isolation; Editor publish/users access নিষিদ্ধ; stale write 409; CSRF ও login throttling; media validation; inquiry storage; logout/session expiry; 320–1440px layout, keyboard navigation ও mobile bottom-nav isolation। পরবর্তী public migration ধাপে প্রতিটি content section-এর end-to-end public update test যোগ হবে।

পূর্ণ ওয়েবসাইট নিয়ন্ত্রণ শেষ হয়েছে বলা হবে কেবল public migration এবং operational/deployment ধাপ শেষ হওয়ার পরে। কোনো demo record বা যাচাইহীন দাবি production-এ seed/publish হবে না।
