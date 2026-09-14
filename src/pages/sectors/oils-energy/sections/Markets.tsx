import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'

export default function Markets({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: AMBER }}>
                {c.sectionCopy.marketsEyebrow}
              </span>
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl text-white mb-3">{c.copy.marketsTitle}</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              {c.sectionCopy.marketsLead}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {c.marketsItems.map((mkt) => (
              <div
                key={mkt.division}
                className="rounded-2xl p-8"
                style={{ background: 'var(--fill-2)', border: `1px solid color-mix(in srgb, ${mkt.accent} 15%, transparent)` }}
              >
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.14em] mb-3"
                  style={{ color: mkt.accent }}
                >
                  {mkt.division}
                </div>
                <div className="space-y-4">
                  {mkt.segments.map((seg) => (
                    <div key={seg.name} className="flex gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `color-mix(in srgb, ${mkt.accent} 13%, transparent)` }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: mkt.accent }} />
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold mb-0.5">{seg.name}</div>
                        <div className="text-slate-400 text-xs leading-relaxed">{seg.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
