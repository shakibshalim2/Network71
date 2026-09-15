import type { SustainabilityContent } from '../content/en'

// Tailwind bg-* utility → concrete hex so the ring/numeral can use the goal colour directly.
const SDG_HEX: Record<string, string> = {
  'bg-amber-600': '#D97706',
  'bg-orange-600': '#EA580C',
  'bg-yellow-700': '#A16207',
  'bg-green-700': '#15803D',
  'bg-blue-800': '#1E40AF',
  'bg-red-600': '#DC2626',
  'bg-sky-600': '#0284C7',
  'bg-emerald-600': '#059669',
  'bg-rose-600': '#E11D48',
}

/**
 * SDG alignment as goal tiles: oversized numeral with a drawn colour ring in
 * the goal's official hue, title, one-line description. The filler card is an
 * editorial notice in the page accent. Phones: numbered ledger.
 */
export default function Sdgs({ c }: { c: SustainabilityContent['sdgs'] }) {
  return (
    <section className="py-24 px-6 bg-navy-dark sdg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{c.lead}</p>
        </div>
        <ol className="sdg__grid">
          {c.items.map((sdg, i) => {
            const hex = SDG_HEX[sdg.color] ?? 'var(--pa)'
            return (
              <li key={sdg.number} className="sdg__tile" style={{ ['--sdg' as string]: hex, ['--i' as string]: i }}>
                <span className="sdg__badge" aria-hidden="true">
                  <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" pathLength="1" /></svg>
                  <span className="sdg__num font-display">{sdg.number}</span>
                </span>
                <div className="sdg__body">
                  <span className="sdg__tag">{c.tagPrefix} {sdg.number}</span>
                  <h3 className="sdg__title">{sdg.title}</h3>
                  <p className="sdg__desc">{sdg.desc}</p>
                </div>
                <span className="sdg__numeral font-display" aria-hidden="true">{sdg.number}</span>
              </li>
            )
          })}
          <li className="sdg__more" aria-label={c.filler}>
            <span className="sdg__more-rule" aria-hidden="true" />
            <span className="sdg__more-idx font-mono">{String(c.items.length + 1).padStart(2, '0')}+</span>
            <p>{c.filler}</p>
          </li>
        </ol>
      </div>
    </section>
  )
}
