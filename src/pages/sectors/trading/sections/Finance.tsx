import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Finance({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-navy relative overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5"
          style={{
            background: `radial-gradient(ellipse at right, ${BLUE} 0%, transparent 70%)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: BLUE }}>{c.copy.financeEyebrow}</span>
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.copy.financeTitle}</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">{c.copy.financeLead}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.financeItems.map((f) => (
              <div
                key={f.title}
                className="p-7 rounded-2xl border hover:border-blue-500/40 transition-all"
                style={{ borderColor: `color-mix(in srgb, ${BLUE} 13%, transparent)`, background: 'var(--fill-2)' }}
              >
                <div className="h-0.5 w-8 mb-4 rounded-full" style={{ background: BLUE, color: 'var(--s0)' }} />
                <h3 className="font-display text-lg text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
