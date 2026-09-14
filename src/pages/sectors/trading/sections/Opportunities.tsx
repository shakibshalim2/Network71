import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Opportunities({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{c.copy.opportunitiesEyebrow}</span>
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.copy.opportunitiesTitle}</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">{c.copy.opportunitiesLead}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.opportunityCards.map((o) => (
              <div
                key={o.title}
                className="p-7 rounded-2xl border hover:border-blue-500/40 transition-all group"
                style={{ borderColor: `color-mix(in srgb, ${BLUE} 9%, transparent)`, background: 'var(--fill-2)' }}
              >
                <h3 className="font-display text-xl text-white mb-3">{o.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{o.desc}</p>
                <a
                  href="#sector-contact"
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: BLUE }}
                >
                  {o.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
