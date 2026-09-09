# Public website design and responsive audit

Status: in progress. Scope: all public routes and their sections; admin is excluded.

## Plan, before implementation

1. Inventory each route's hero, content sections, interactive controls and footer. Inspect browser renders at 320, 375, 768, 1024 and 1440 pixels in light and dark themes. Record actual section headings, horizontal overflow, clipped content, oversized text, image failures and accessibility findings. Review section screenshots rather than relying on overflow checks alone.
2. Fix shared foundations first: navigation, page landmarks, readable typography, spacing, control sizes, focus states and image fallback behaviour. Avoid broad CSS changes that accidentally affect admin or intentional scrolling regions.
3. Improve the homepage's clarity and credibility: explain what the business offers, prioritise work and contact paths, distinguish capabilities from verified results, and replace unsupported headline statistics with concrete navigation/information. Never invent client work, reviews, certifications or outcomes.
4. Connect the real published Projects collection to a public work listing, detail pages and a homepage entry. Show honest empty/error states until approved material is published; keep drafts private. Improve the working process and enquiry journey.
5. Inspect and fix corporate pages, then all eight division pages, one section at a time. Record precise changes and recheck the affected interactions. Correct illustrative imagery described as actual company evidence; identify remaining business facts requiring owner verification.
6. Re-run the full route/section matrix after fixes, check keyboard/mobile interactions and selected accessibility rules, run the production build, and document results and remaining content dependencies.

## Acceptance

- No accidental horizontal overflow, clipped essential copy or overlapping content at the five widths.
- Every public page has an accessible main landmark; headings and forms remain readable on phones.
- Photo cards have useful captions/fallbacks; mobile users can access actions without hover.
- Light and dark versions have readable contrast and consistent spacing.
- Projects show published approved content only, with client/own-product and work status clearly identified.
- Public navigation has no admin bottom navigation; current admin behaviour remains scoped separately.
- Real office/team/project materials and substantiation are requested from the owner; visual polish is not presented as verification of business claims.

## Findings and resolution log

Initial code review: homepage repeats unverified scale claims in its hero and stats; actual project work has no public route; stock office/gallery imagery is labelled as company activity; many corporate/sector pages lack a main landmark; small inline labels and dense mobile grids require section-level review. Browser audit and fixes follow below.
