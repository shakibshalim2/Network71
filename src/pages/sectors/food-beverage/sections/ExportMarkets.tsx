import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

export default function ExportMarkets({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.exportMarketsCopy.eyebrow}</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">{c.exportMarketsCopy.title1}<br />{c.exportMarketsCopy.title2}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{c.exportMarketsCopy.lead}</p>
              <a
                href="#sector-contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: ORANGE, color: 'var(--s0)' }}
              >{c.exportMarketsCopy.cta}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="lg:col-span-3 space-y-3">
              {c.exportMarkets.map((market) => (
                <div key={market.region} className="flex items-start gap-5 p-5 rounded-xl border border-white/6 hover:border-orange-500/20 transition-all" style={{ background: 'var(--fill-1)' }}>
                  <div className="text-3xl flex-shrink-0">{market.flag}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-white text-sm">{market.region}</h3>
                      <span
                        className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase"
                        style={{ background: `color-mix(in srgb, ${ORANGE} 13%, transparent)`, color: ORANGE }}
                      >
                        {market.priority}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed mb-1">{market.driver}</p>
                    <p className="text-slate-600 text-[11px]">{market.countries}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  )
}
