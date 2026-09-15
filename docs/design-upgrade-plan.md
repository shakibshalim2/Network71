# Public website design upgrade — section inventory & plan

Scope: every public route (admin excluded). Benchmarked against the visual systems of
Apple, Stripe, Linear, Vercel, Maersk and Tata Group: generous whitespace, a strict type
scale (nothing below 11px), one accent used with discipline, calm motion (scroll reveal,
hover lift), consistent card / button primitives, and mobile layouts that never shrink
desktop text.

## Audit findings (before)

| Area | Finding | Severity |
|------|---------|----------|
| Typography | 142× `text-[9px]`, 78× `text-[10px]`, 16× `text-[8px]`, 11× `text-[7–7.5px]`; inline `fontSize: 7.5–9`. Card body copy at 11–11.5px. | High |
| Contrast | Card descriptions use `text-slate-300/60` (≈ 3.1:1 on photo scrims). | High |
| Motion | No scroll reveal; hover states are JS-driven and inconsistent (some scale, some border, some none). | Medium |
| Buttons | 6 different CTA styles (padding 8–14px, radius 7–9px, weight 500–700). No shared primary/secondary primitive. | Medium |
| Page heroes | 4 different hero layouts (left+breadcrumb, centred badge, `pt-32` hard-coded, plain). `pt-32` = 128px on phones. | Medium |
| Mobile | Division cards in a 2-col grid keep 11.5px copy; hero stat labels 7.5px; ticker 8px; eSHIPe stats 7px. | High |
| Cards | Radius varies 12/14/16/20px; border colours vary; hover feedback inconsistent. | Low |

## Section inventory & verdict

Legend: **keep** (already strong) · **refine** (typography/spacing/hover) · **rework** (layout).

### Home `/`
1. Hero (globe + headline + CTAs) — keep; refine CTA primitive
2. Hero stats strip — refine (labels 7.5px → 11px, sub 10.5 → 12px)
3. Division ticker — refine (8px → 11px)
4. Our Work showcase — keep
5. Divisions grid (10 cards) — refine (tag 8px → 10.5px, copy 11.5 → 13px, contrast, hover lift)
6. Working together (4 steps) — keep
7. About (statement · values · photo) — refine (values 10.5px → 13px, icon tile, hover)
8. Ezyify flagship — keep
9. Trusted partners marquee — keep
10. Media + eSHIPe marketplace — refine (eyebrows 7.5px → 11px, stats 7px → 11px, story rows)
11. Leadership teaser — keep
12. Sustainability teaser — keep
13. Global CTA (3 cards) — refine (hover system)
14. Footer CTA + columns + bottom — refine (eyebrow 8px → 11px)

### Corporate pages
- `/about` — Hero (keep) · Story (keep) · Purpose (refine) · Quote (keep) · Values (refine) · Leadership (keep) · Testimonials (keep) · Timeline (keep) · CTA (keep)
- `/projects`, `/projects/:slug` — Hero (keep) · List/toolbar (keep) · Detail (keep) · Working together (keep) · Enquiry (keep)
- `/investors` — Hero (refine spacing) · Info (keep) · Thesis (refine) · Documents (keep) · Governance (refine) · Enquiry (keep)
- `/careers` — Hero (rework mobile padding) · Benefits (refine) · Openings (keep) · Process (refine) · CTA (keep) · Application dialog (keep)
- `/contact` — Hero (keep) · Methods (refine) · Form + sidebar (keep)
- `/leadership` — Hero (refine mobile) · CEO card (keep) · Team (keep) · Board (keep) · Join CTA (keep)
- `/governance` — Hero (refine) · Framework (refine) · Board (keep) · Policies (refine) · Committees (refine) · Contact (keep)
- `/sustainability` — Hero (refine mobile) · Commitments (keep) · SDGs (refine) · Programs (refine) · Metrics (keep) · Report (keep) · CTA (keep)
- `/global-presence` — Hero (refine mobile) · World map (keep) · Counts (keep) · Regions (refine) · Trade routes (keep) · Divisions (refine) · Offices (keep)
- `/timeline`, `/press`, `/press/:slug`, `/blog`, `/blog/:slug`, `/gallery`, `/legal`, `/brand`, `404` — refine via shared foundations only

### Division pages `/divisions/*` (9)
Shared chrome: SectorHeader (refine CTA) · MetricsBar (refine) · SectionEyebrow (9px → 11px) · ProcessFlow (keep) · SectorContact (refine inputs). Per-page sections (Hero, Overview, Products, Manufacturing, Facilities, Technology, Quality, Supply chain, Markets, Sustainability, Opportunity, Roadmap, …) inherit the foundation fixes; heroes get unified mobile padding.

## Implementation plan (executed in this order)

1. **Foundations** — `src/styles/design-system.css`: type-scale floor, card/button primitives, unified hero rhythm, hover-lift system, scroll reveal.
2. **Scroll reveal** — `useSectionReveal` hook mounted once in the router root; respects `prefers-reduced-motion`; no-JS fallback keeps content visible.
3. **Home sections** — Hero stats, ticker, Divisions cards, About values, Media/Marketplace labels, Global CTA, Footer CTA.
4. **Shared sector chrome** — eyebrow, metrics bar, header CTA, contact form inputs.
5. **Page heroes** — Careers/Leadership/Sustainability/Global-presence mobile padding via foundation rules.
6. **Verify** — `tsc --noEmit`, `vite build`, screenshots at 390 & 1440 in dark and light.

## Phase 2 — motion, navigation chrome and small parts

Installed `motion` (Framer Motion successor, `motion/react`). A shared vocabulary lives in
`src/lib/motion.ts` (easings, springs, popover / sheet / drawer / modal variants).

| Surface | Before | After |
|---|---|---|
| Header | 40 inline `onMouseEnter` handlers, opacity-toggled menus always in DOM | `src/styles/header.css` classes; `AnimatePresence` mounts menus only while open; shared `layoutId` active-indicator slides between nav links; hamburger morphs to ✕ |
| Divisions mega menu | Instant fade | Scale/fade popover, items stagger in, flagship strip with arrow nudge |
| Language menu | Instant fade | Popover variant, animated chevron |
| Search sheet | CSS translate, 8px labels | Spring sheet + backdrop, class-based rows, `.chip`, `.kbd-pill` |
| Mobile drawer | Slide, no item motion | Spring drawer, staggered items, accordion animates height with `AnimatePresence`, segmented controls |
| Modal (`Dialog`) | Static panel | Spring panel entrance, blurred backdrop, icon close button, full-width form on phones |
| Home hero | Static | Eyebrow → title → lead → CTAs stagger on load |
| PageHero | Static | Staggered copy, drifting orbs, WebGL `AuroraCanvas` (half-res, pauses off-screen, respects reduced motion, no-WebGL fallback) |
| Sector heroes (9) | Static | Image settle-zoom + copy rise via structural CSS |
| Section reveal | Section only | Grid / rail children stagger after the section reveals |
| Route change | Hard swap | `.route-enter` fade/rise (skipped for admin) |
| Buttons | 8 ad-hoc gold buttons on corporate pages | All on `.btn` primitives; press feedback |
| Labels | 90 `text-[9px]` eyebrows in source | Rewritten to 11px / 0.2em in source (not only via CSS floor) |

## Phase 3 — signature layouts (Home)

The first two phases kept the original section grammar. Phase 3 replaces the three
most-seen Home sections with layouts that belong to Network71 alone, each with a
dedicated mobile treatment.

| Section | Was | Now |
|---|---|---|
| Hero headline | Static two-line H1 | `KineticText`: words rise out of clipped lines (editorial reveal) |
| Hero stats (mobile) | 2×2 grid of tiny tiles | Horizontal signal strip of pill cards |
| Divisions | 10 equal photo tiles | **Numbered index** (`DivisionsIndex`): rows expand on hover, accent bar slides with `layoutId`, a spring-following preview card shows the division photo. **Mobile:** tall “dossier” snap rail with numbered cards, scroll-driven depth/parallax (`animation-timeline: view()` with graceful fallback) and a swipe hint |
| About | 3-column statement/values/photo | **Statement band** (`StatementBand`): slow marquee of the brand statement, one strong paragraph, four value cards lit by a pointer-tracking spotlight |
| Connect CTA | 3 equal glass cards | **Portal** (`ConnectPortal`): segmented chooser with sliding pill; the choice re-colours the WebGL aurora and swaps copy with a blur-crossfade. Stacks vertically under 480px |

All motion honours `prefers-reduced-motion`; list/rail/portal remain fully usable without JS.

## Phase 4 — signature language on division pages + Ezyify

Shared chrome carries the identity to all nine division pages at once.

| Surface | Now |
|---|---|
| Sector hero headline (9 pages) | `useKineticHeadlines` wraps words at runtime and stages the same clipped word-reveal as Home (Web Animations API, reduced-motion aware) |
| `MetricsBar` → **Ledger strip** | Numbered facts (01–04), display-size values, accent hairline draws in per cell with stagger |
| `ProcessFlow` → **Journey line** | One accent line draws itself with scroll progress (`useScroll` + spring); nodes light and scale as the line reaches them. Horizontal on desktop, vertical rail on phones |
| Every card grid on division pages | Structural editorial identity: running counter (`counter()`), pointer-tracking spotlight via one delegated listener, tighter H2 scale — no per-file edits |
| Ezyify page hero | Staggered entrance, gradient headline shimmers slowly |

## Phase 5 — site-wide motion signature (every page, section by section)

Audit of what Phases 1–4 left untouched: corporate-page H2s were static; timelines drew
nothing; stat numbers appeared instantly; Careers "How we hire" was a plain card grid;
photos on About/Facilities/Blog popped in; the header never got out of the way; nothing
indicated reading position; theme flips were a hard colour swap. All fixed structurally
in `src/styles/motion-signature.css` + four small components — no content files touched.

| Surface | Now |
|---|---|
| **Every section H2** (all pages) | `useKineticHeadlines` now also stages section headlines: words rise from a clipped line the moment the heading enters view. Headings already on screen never flash hidden; after the animation the original text nodes are restored so language switch / CMS overrides stay live |
| **Reading progress** | `ReadProgress`: 2px brand hairline at the very top tracks scroll (spring-smoothed); hidden for admin and reduced motion |
| **Header** | Slides away when scrolling down, returns on scroll-up; never hides while a menu, drawer or search is open |
| **Division section rail** (≥1280px) | `SectionRail`: sticky dot index on the right, active dot stretches into an accent bar (`layoutId`), hover/active reveals the section eyebrow with running number; click smooth-scrolls. Accent borrowed from the division's ledger strip |
| **Stats** | `CountUp`: About facts, Global-presence counts, hero stats and division ledger values tick up on first view; years roll from a nearby value; non-numeric values unchanged |
| **Timelines** (About, /timeline) | `ScrollSpine`: the spine draws itself with scroll progress (spring) on desktop and mobile |
| **Careers → How we hire** | Uses the division **Journey line** (`ProcessFlow`, now accepts `eyebrow` + display title) |
| **Images** | Any framed photo in a revealed section uncovers with a clip-path curtain + settle-zoom |
| **Heroes** | Scroll-driven parallax (`animation-timeline: scroll(root)`): sector hero photo drifts, PageHero orb lifts and aurora fades as you leave the fold |
| **Eyebrow rules** | Hairline draws in from the left as the section reveals |
| **Corporate card grids** | Inherit the sector identity: pointer spotlight + soft accent depth edge on hover |
| **Primary buttons** | Light sweep on hover; text links draw an underline left→right |
| **Quotes** | Blur-in settle |
| **Progress bars** | Moving sheen after the width animates |
| **Mobile rails** | Edge fades hint at more content on hero-stat strip, division dossier rail, card rails |
| **Theme flip** | Brief surface-coloured veil crossfades the switch (skipped on first paint) |
| **Footer links** | Nudge right on hover |

All honour `prefers-reduced-motion`; verified `tsc --noEmit` + `vite build`, 1440/390 sweeps
for horizontal overflow and hidden headlines, EN→BN switch mid-page, dark + light.

## Admin workspace — static visual polish (no motion by design)

The admin (`src/admin/`) is a separate light-only design system and stays **static**: no
reveals, no transitions, no parallax. Only the loading spinner animates. Everything below is
in `src/admin/admin.css` plus small markup fixes; the public site's styles are untouched.

| Surface | Before → After |
|---|---|
| **Tokens** | Added `--adm-faint`, `--adm-line-strong`, `--adm-green-soft`, `--adm-gold`, `--adm-radius`, `--adm-shadow`; base ink/muted darkened for contrast |
| **Type floor** | 8–11px labels (eyebrows, breadcrumb, nav labels, stat labels, dl terms, footer) lifted to 10.5–13.5px; headings 650 → 600 weight |
| **Sidebar** | Off-white surface, 248px, active item gets a green edge marker + tinted icon; added **Website pages** entry and proper icons for Applications, Company settings, Navigation, Team access |
| **Top bar** | Sticky + blurred; "View website" is now a bordered pill |
| **Page heading** | Hairline under the title; role pill has a gold status dot |
| **Stats** | 5-up grid (was 4 + orphan), icon in a tinted tile, tabular numerals |
| **Status tags** | Pill with leading dot; semantic colours for every state (published/approved/active · draft/in review/in progress/reviewing · new/interview · archived/closed/withdrawn/inactive · rejected). Inbox, Applications, Users and Content list now pass the state class |
| **Record rows** | Symbol in a tinted tile, primary action (Edit) tinted green, disabled actions clearly muted, 36px compact buttons |
| **Notices** | Left accent bar on info / success / error |
| **Inbox & Applications** | Message quote has a left rule; meta `dl` is a 2-column grid with uppercase terms |
| **Media cards** | Title + Archive on one row, URL field in mono, footer pinned to bottom |
| **Forms** | Sticky blurred action bar at the bottom of collection forms; focus ring + hover border on inputs; readonly inputs mono |
| **Website pages editor** | Selectors sit in cards; nested fieldsets alternate surface; legends uppercase; row actions are proper buttons; sticky action bar with "View public page / Preview draft" pushed right; help text moved under the buttons |
| **Login** | Story panel gets a faded grid + gold orbit rings (static), larger eyebrows/notes |
| **Mobile** | Search input no longer stretches to 300px tall (flex-basis fix); stat grid 2-up; sticky bars clear the bottom nav |

Verified with a mock API (`.hoplite/artifacts/mock-api.mjs`, not committed — PHP is not
available in the sandbox) at 1440 and 390: dashboard, content, projects list + form, inbox,
applications, media, team access, website pages, more, login. `tsc --noEmit` + `vite build` pass.

## Phase 6 — editorial density on corporate pages + per-page accent

Divisions had earned a "dossier" identity; corporate pages (Investors, Sustainability,
Governance, Leadership, Careers, Global presence, Contact) still read as one gold template of
3-up icon cards and flat placeholder boxes. Everything below is in `src/styles/editorial.css`,
`src/lib/usePageAccent.ts` and a route→accent map in `PageHero`; no content files touched.

| Surface | Now |
|---|---|
| **Per-page accent** | `PageHero` maps routes to an accent + aurora hue (Sustainability teal, Careers cyan, Global sky, Leadership indigo, Governance emerald, Press rose, Blog purple, Gallery pink, Timeline amber, Legal blue; brand pages stay gold). `usePageAccent` publishes it as `--page-accent` on `<html>` (falls back to a division's ledger accent) |
| **Chrome follows the accent** | Reading-progress hairline, section rail, eyebrow rules, card hairlines, footer poem italic line + Dhaka clock all take `--page-accent` |
| **Section rail** | Now mounts on every long page (≥4 sections, not Home), not just divisions |
| **Icon-card grids** | Running counter top-right, accent hairline along the top edge that grows on hover, icon tiles become outlined accent marks, titles hover to the page accent, soft accent wash at the top of each card |
| **Investors → Board structure** | Four "pending" tiles → a numbered ledger list with a mono "TO BE PUBLISHED" pill |
| **Investors → Documents** | Boxed request cards → numbered filing rows with a hairline, amber availability dot and inline request link |
| **Placeholder boxes** (Leadership board, Governance board, Sustainability report) | Center-stacked icon + badge + copy → left-anchored notice band with accent bar, outlined icon and display title |
| **Centered section headers** | Eyebrow gets a drawn rule pair in the accent (scales in on reveal); corporate H2s adopt the division editorial scale |
| **Sustainability targets** | Tiles that already carry a display figure skip the running number |
| **Programs headline figure** | Gold box → ledger figure on surface with an accent tick |
| **Project stories / openings empty states** | Left-aligned editorial plate with a hairline "N71" watermark and accent wash |

Verified `tsc --noEmit` + `vite build`; sweeps at 1440 and 390 (no horizontal overflow) for
Investors, Sustainability, Leadership, Governance, Careers, Global presence, About, Projects;
light theme checked on Investors; division pages still read their ledger accent (rail + progress).

## Phase 7 — second full audit: section-by-section push toward top-tier

Re-audited every Home and Contact section in the running app at 1440 and 390 (dark), after
Phases 1–6. Verdicts below are against the Apple / Stripe / Linear / Vercel / Maersk bar: a
section is **keep** only if it already has a signature move *and* holds up on a phone.

### Home `/` — inventory and verdict

| # | Section | Desktop | Mobile | Verdict → what changes |
|---|---|---|---|---|
| 1 | Hero (globe + kinetic H1 + CTAs) | strong | globe is faded to black; the phone sees a plain dark field under the headline | **refine mobile** — reposition the globe as a lit crescent low-right behind the CTAs with a lighter top fade so the phone hero has the same "object" desktop has; scroll cue actually animates |
| 2 | Hero stats strip | fine | horizontal rail clips the second card mid-word ("BUSINESS DIVIS…") | **rework mobile** — 2×2 hairline grid (no clipping), value + label only |
| 3 | Division ticker | fine | fine | keep |
| 4 | Our Work (empty state plate) | generic bordered card, 01–02–03 mark duplicates the process section beneath | same, stacked | **rework** — editorial enquiry plate: hairline "N71" watermark, left-anchored display title, CTA with magnetic hover; the numeric mark becomes a live "brief → scope → people" hairline strip |
| 5 | Divisions index | signature (cursor preview, accent bar) | dossier rail good, but "swipe to browse" is a static hint | **refine** — desktop row gets an accent wash that follows the active row; mobile rail gets a live position indicator (dots + `01 / 10` counter) that tracks scroll-snap, replacing the static hint |
| 6 | Working together (4 steps) | static numbered columns | 2-col stack | **rework motion** — steps sit on a scroll-drawn process line with a travelling node (horizontal on desktop, vertical spine on mobile); numbers rise in sequence |
| 7 | Statement band | marquee + spotlight values | fine | **refine** — marquee speed/skew reacts to scroll velocity (Linear/Stripe move); pauses on hover already |
| 8 | Ezyify flagship | strong | strong | keep |
| 9 | Brands strip | one thin marquee, small labels, weak centred heading | same | **rework** — two-row counter-scrolling brand wall with larger marks, hairline frame and accent on hover; heading becomes a proper eyebrow + count |
| 10 | Media + eSHIPe | good | good | keep |
| 11 | Leadership teaser | founder card is flat | fine | **refine** — monogram ring draws on reveal, card gets pointer spotlight like the value cards |
| 12 | Sustainability teaser | good | good | keep |
| 13 | Connect portal | good | good | keep |
| 14 | Footer | signature | good | keep |

### Contact `/contact` — inventory and verdict

| # | Section | Verdict → what changes |
|---|---|---|
| 1 | Page hero | keep (accent chrome from Phase 6) |
| 2 | Methods (3 dossier cards) | keep |
| 3 | Contact form | **rework** — floating labels with an accent underline that draws on focus, department as segmented chips (select stays for a11y fallback), message counter, submit button shows progress and a success plate; sidebar division list gets accent arrows and hover translate |
| 4 | Sidebar (offices + by division) | **refine** — office card gets a live Dhaka clock; by-division rows become ledger rows |

### Other pages
Everything below Home and Contact inherits the shared motion primitives added here (process
line, brand wall, floating-label form). Per-page passes are logged as they land.

### Execution order
Hero mobile → stats grid → Work plate → Divisions indicator → Process line → Brand wall →
Statement velocity → Leadership polish → Contact form → Contact sidebar → remaining pages.
Every task: `tsc --noEmit`, 1440 + 390 check, `prefers-reduced-motion` static path, one commit.

### Phase 7 — landed (Home + Contact)

| Task | Commit scope |
|---|---|
| Hero (mobile) | `--hero-fade-y` rebalanced so the globe shows as a lit crescent low-right; `.hero-atmos` CSS rim + two counter-rotating orbit rings + pulsing satellite give the phone hero a focal object even before WebGL paints. Stats strip → 2×2 hairline ledger (no more clipped "BUSINESS DIVIS…") |
| Our Work plate | `.work-intro` is now an editorial plate: faint 64px grid + N71 hairline watermark, left-anchored display title, three-step **Brief → Scope → People** strip whose hairlines draw and nodes light in sequence on reveal |
| Divisions index | Mobile rail: live accent indicator (dots + `01 / 10`) tracks scroll-snap via rAF; desktop active row gets a gutter-bleed accent wash |
| Working together | New `ProcessLine` motion primitive (`src/components/motion/ProcessLine.tsx`): scroll-driven fill + travelling node; horizontal across the step row on desktop, vertical spine on phones; steps light via `--pline-lit` |
| Brand wall | `TrustedPartners` → two counter-scrolling rows of numbered marks in hairline frames, brand-accent hover, eyebrow + count heading. CMS brands still replace the built-ins |
| Statement band | Marquee speed and skew follow scroll velocity (`useVelocity`), spring-smoothed; static under reduced motion |
| Leadership teaser | Founder monogram ring draws on reveal (`pathLength`), pointer spotlight, N71 watermark |
| Contact form | Floating labels with accent underline that draws on focus, department as segmented radio chips (hidden `<select>` remains the submitted control), message counter, busy-state progress bar + arrow "fly", success plate with drawn ring/tick and mono REF pill. Fields use `autocomplete`/`inputmode` |
| Contact sidebar | Office card: accent hairline, pulsing dot, live Dhaka clock (`useDhakaTime`, shared with footer), display city, N71 watermark. Division list → numbered ledger rows with hover translate + arrow |

Verified: `tsc --noEmit` + `vite build`; 1440 and 390 (no horizontal overflow on Home or
Contact); light theme on Home hero/work/brands; every new animation has a
`prefers-reduced-motion` static path.
