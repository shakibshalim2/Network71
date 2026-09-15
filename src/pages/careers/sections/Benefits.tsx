import type { CareersContent } from '../content/en'
import { benefitIcons } from '../icons'
import { spotlight } from '@/lib/useSpotlight'

/**
 * Six reasons as dossier cards with a pointer spotlight and an oversized
 * hairline numeral. On phones the same items render as a compact icon ledger
 * (`.dcard-ledger`) instead of six tall cards.
 */
export default function Benefits({ c }: { c: CareersContent['benefits'] }) {
  return (
    <section className="bg-navy-dark py-24 dcards">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="dcards__head">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium">{c.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">{c.title}</h2>
          </div>
          <span className="dcards__count font-display" aria-hidden="true">
            {String(c.items.length).padStart(2, '0')}<span>{c.eyebrow}</span>
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 dcards__grid">
          {c.items.map((b, i) => (
            <div
              key={b.id}
              className="bg-navy border border-white/8 rounded-2xl p-8 hover:border-gold/25 transition-colors duration-300 group dcard"
              onPointerMove={spotlight}
            >
              <span className="dcard__spot" aria-hidden="true" />
              <span className="dcard__numeral font-display" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
                {benefitIcons[b.id]}
              </div>
              <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors">{b.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
