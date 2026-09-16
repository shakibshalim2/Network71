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
            <ol className="srisk" style={{ ['--pa' as string]: BLUE }}>
              {c.riskItems.map((r, i) => (
                <li key={r.title} className="srisk__item" style={{ ['--i' as string]: i }}>
                  <span className="srisk__shield" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path pathLength="1" strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" /><path pathLength="1" className="srisk__check" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-fg text-sm mb-1.5">{r.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

  )
}
