# Sector page pattern (module split + EN/BN content)

Every division page under `src/pages/sectors/` follows the structure established by
`Media.tsx`. Use it as the reference implementation.

```
src/pages/sectors/
  Media.tsx                      # ≤ 60 lines: composes sections, no copy, no data
  media/
    theme.ts                     # accent + surface tokens for this division
    content/
      en.ts                      # ALL English copy + data; exports `type XContent = typeof en`
      bn.ts                      # `const bn: XContent = {...}` — same shape, Bangla text
    sections/
      Hero.tsx  Overview.tsx …   # one file per <section>, each ≤ ~120 lines
```

## Rules

1. **No text in JSX.** Every visible string (headings, paragraphs, labels, CTAs, alt text,
   inquiry types, `divisionName`) lives in `content/en.ts`. Sections receive their slice via
   `({ c }: { c: XContent['hero'] })`.
2. **English ships with the page chunk; Bangla is lazy.** The page calls
   `useLocalizedContent(en, { bn: () => import('./x/content/bn') })`. Never import `bn.ts`
   statically.
3. **`bn.ts` is typed against `en.ts`** (`const bn: XContent = …`), so a missing key is a
   compile error. Keep non-text fields (colors, image URLs, hrefs, icon paths) identical.
4. **Numerals**: use Bangla digits (০-৯) in `bn.ts` for display values that are pure numbers
   (`'২৫+'`), keep Latin for codes/IDs/model numbers.
5. **Shared chrome** (`SectorHeader`, `SectorContact`, `ProcessFlow`, `MetricsBar`,
   `SectionEyebrow`, `ArrowLink`) is already localized via `src/i18n` — pass content, do not
   duplicate.
6. **File size budget**: no `.tsx` over ~250 lines; no `.ts` content file over ~300 lines.
   If a content file grows past that, split by section (`content/en/hero.ts` …) and
   re-export from `content/en.ts`.
7. **Do not change visuals.** This is a refactor + translation: same classes, same
   inline styles, same DOM order. Only deduplicate obvious repetition (eyebrow rules, arrow
   links) via the shared primitives above.

## Checklist per page

- [ ] `theme.ts` extracted
- [ ] `content/en.ts` contains every string from the original file
- [ ] `content/bn.ts` complete, typed, natural business Bangla (not machine-literal)
- [ ] sections split, each takes `c` prop
- [ ] page file composes only
- [ ] `pnpm exec tsc --noEmit` passes
- [ ] page renders identically in EN; switches fully in BN
