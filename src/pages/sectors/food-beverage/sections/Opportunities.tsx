import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import { icons } from '../icons'

export default function Opportunities({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.opportunitiesCopy.eyebrow}</span>
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.opportunitiesCopy.title1}<br />{c.opportunitiesCopy.title2}</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">{c.opportunitiesCopy.lead}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.opportunities.map((opp) => (
              <div
                key={opp.title}
                className="group p-7 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors"
                  style={{ background: `color-mix(in srgb, ${ORANGE} 6%, transparent)`, color: ORANGE }}
                >
                  {icons[opp.iconId]}
                </div>
                <h3 className="font-display text-lg text-fg mb-3">{opp.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{opp.desc}</p>
                <a
                  href="#sector-contact"
                  className="scard-link"
                  style={{ color: ORANGE }}
                >
                  {opp.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
