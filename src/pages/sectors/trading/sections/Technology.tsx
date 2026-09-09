import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Technology({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: BLUE }}>{c.copy.technologyEyebrow}</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">{c.copy.technologyTitle}</h2>
              <p className="text-slate-500 leading-relaxed mb-5">{c.copy.technologyLead1}</p>
              <p className="text-slate-500 leading-relaxed">{c.copy.technologyLead2}</p>
            </div>
            <div className="space-y-5">
              {c.techCapabilities.map((t, i) => (
                <div
                  key={t.title}
                  className="flex gap-5 p-6 rounded-2xl border hover:shadow-md transition-all"
                  style={{ borderColor: `color-mix(in srgb, ${BLUE} 9%, transparent)` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
                    style={{ background: `color-mix(in srgb, ${BLUE} 7%, transparent)`, color: BLUE }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-fg mb-1.5">{t.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  )
}
