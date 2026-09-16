import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Sustainability({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{c.copy.sustainabilityEyebrow}</span>
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.copy.sustainabilityTitle}</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">{c.copy.sustainabilityLead}</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {c.sustainabilityItems.map((s, i) => (
              <div
                key={s.title}
                className="bg-surface-2 p-7 rounded-2xl ssus"
                style={{ ['--pa' as string]: 'var(--accent-green)', ['--i' as string]: i }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="ssus__pulse" aria-hidden="true" />
                  <span className="ssus__idx font-mono">0{i + 1}</span>
                </div>
                <h3 className="font-semibold text-fg mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                <span className="ssus__rule" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
