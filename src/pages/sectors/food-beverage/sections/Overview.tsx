import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import { icons } from '../icons'

export default function Overview({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: vision */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ORANGE }}>{c.overview.eyebrow}</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">{c.overview.title1}<br />{c.overview.title2}<br />{c.overview.title3}</h2>
              <p className="text-slate-500 leading-relaxed mb-5">{c.overview.p1}</p>
              <p className="text-slate-500 leading-relaxed mb-8">{c.overview.p2}</p>
              <div className="p-5 rounded-xl text-sm text-slate-600" style={{ background: `color-mix(in srgb, ${ORANGE} 4%, transparent)`, border: `1px solid color-mix(in srgb, ${ORANGE} 13%, transparent)` }}>
                <span className="font-semibold" style={{ color: ORANGE }}>{c.overview.positioningLabel}</span>{c.overview.positioning}</div>
            </div>
            {/* Right: brand c.pillars */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ORANGE }}>{c.overview.pillarsTitle}</span>
              </div>
              <div className="space-y-4">
                {c.pillars.map((p) => (
                  <div key={p.title} className="flex gap-5 p-5 rounded-xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all group">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ background: `color-mix(in srgb, ${ORANGE} 7%, transparent)`, color: ORANGE }}
                    >
                      {icons[p.iconId]}
                    </div>
                    <div>
                      <h3 className="font-display text-base text-fg mb-1 font-semibold">{p.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
