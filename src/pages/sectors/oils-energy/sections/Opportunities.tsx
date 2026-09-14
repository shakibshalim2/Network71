import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'
import { icons } from '../icons'

export default function Opportunities({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: AMBER }}>
                {c.sectionCopy.opportunitiesEyebrow}
              </span>
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl text-fg mb-3">{c.copy.opportunitiesTitle}</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              {c.sectionCopy.opportunitiesLead}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {c.opportunitiesItems.map((opp) => (
              <div
                key={opp.title}
                className="bg-surface-2 rounded-2xl p-7 border hover:shadow-xl transition-all group"
                style={{ borderColor: `color-mix(in srgb, ${opp.accent} 13%, transparent)` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in srgb, ${opp.accent} 8%, transparent)`, color: opp.accent }}
                >
                  {icons[opp.iconId]}
                </div>
                <h3 className="font-display text-xl text-fg mb-3">{opp.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{opp.desc}</p>
                <a
                  href="#sector-contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                  style={{ color: opp.accent }}
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
