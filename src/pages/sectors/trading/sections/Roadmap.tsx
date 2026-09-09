import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Roadmap({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: BLUE }}>{c.copy.roadmapEyebrow}</span>
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.copy.roadmapTitle}</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">{c.copy.roadmapLead}</p>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute top-8 left-0 right-0 h-px hidden lg:block"
              style={{ background: `linear-gradient(90deg, transparent 5%, color-mix(in srgb, ${BLUE} 25%, transparent) 20%, color-mix(in srgb, ${BLUE} 25%, transparent) 80%, transparent 95%)` }}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.roadmap.map((r, i) => (
                <div key={r.year} className="relative">
                  {/* Year badge */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-lg text-white relative z-10"
                      style={{ background: BLUE, color: 'var(--s0)' }}
                    >
                      {r.year.slice(2)}
                      <span className="sr-only">{r.year}</span>
                    </div>
                  </div>
                  <div
                    className="p-6 rounded-2xl border text-center"
                    style={{ borderColor: `color-mix(in srgb, ${BLUE} 9%, transparent)`, background: i === 3 ? `color-mix(in srgb, ${BLUE} 2%, transparent)` : 'transparent' }}
                  >
                    <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: BLUE }}>{r.year}</div>
                    <h3 className="font-display text-base text-fg mb-3">{r.milestone}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  )
}
