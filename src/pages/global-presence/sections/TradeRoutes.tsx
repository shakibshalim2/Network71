import type { GlobalPresenceContent } from '../content/en'

// Tailwind gradient class → corridor accent
const ROUTE_HEX: Record<string, string> = {
  'from-gold to-amber-400': 'var(--brand-bright)',
  'from-blue-400 to-cyan-400': 'var(--accent-cyan)',
  'from-emerald-400 to-green-400': 'var(--accent-green)',
}

/**
 * Corridor ledger: each route is a drawn line from origin to destination with
 * a particle travelling along it and a mono "via" label sitting on the line.
 */
export default function TradeRoutes({ c }: { c: GlobalPresenceContent['routes'] }) {
  return (
    <section className="py-24 px-6 bg-navy-dark corr">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{c.lead}</p>
        </div>
        <ol className="corr__list">
          {c.items.map((r, i) => (
            <li key={r.from + r.to} className="corr__row" style={{ ['--rc' as string]: ROUTE_HEX[r.color] ?? 'var(--pa)', ['--i' as string]: i }}>
              <span className="corr__idx font-mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="corr__end corr__end--from">
                <span className="corr__dot" aria-hidden="true" />
                <span className="corr__place">{r.from}</span>
              </span>
              <span className="corr__line" aria-hidden="true">
                <span className="corr__base" />
                <span className="corr__fill" />
                <span className="corr__particle" />
                <span className="corr__via font-mono">{r.via}</span>
              </span>
              <span className="corr__end corr__end--to">
                <span className="corr__place">{r.to}</span>
                <span className="corr__dot corr__dot--to" aria-hidden="true" />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
