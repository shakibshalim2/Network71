import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Risk({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{c.copy.riskEyebrow}</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">{c.copy.riskTitle}</h2>
              <p className="text-slate-500 leading-relaxed mb-5">{c.copy.riskLead1}</p>
              <p className="text-slate-500 leading-relaxed">{c.copy.riskLead2}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {c.riskItems.map((r) => (
                <div
                  key={r.title}
                  className="p-5 rounded-xl border"
                  style={{ borderColor: `color-mix(in srgb, ${BLUE} 9%, transparent)`, background: `color-mix(in srgb, ${BLUE} 2%, transparent)` }}
                >
                  <h4 className="font-semibold text-fg text-sm mb-2">{r.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  )
}
