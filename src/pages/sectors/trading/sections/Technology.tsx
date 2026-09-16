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
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{c.copy.technologyEyebrow}</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">{c.copy.technologyTitle}</h2>
              <p className="text-slate-500 leading-relaxed mb-5">{c.copy.technologyLead1}</p>
              <p className="text-slate-500 leading-relaxed">{c.copy.technologyLead2}</p>
            </div>
            <ol className="svals" style={{ ['--pa' as string]: BLUE }}>
              {c.techCapabilities.map((t, i) => (
                <li key={t.title} className="svals__row" style={{ ['--i' as string]: i }}>
                  <span className="svals__idx font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <div className="svals__body">
                    <h3 className="font-semibold text-fg mb-1.5">{t.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                  <span className="svals__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

  )
}
