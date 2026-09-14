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
