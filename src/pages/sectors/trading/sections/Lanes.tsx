import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Lanes({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{c.copy.infrastructureCorridors}</span>
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.copy.lanesTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {c.tradeLanes.map((lane, i) => (
              <div
                key={`${lane.origin}-${lane.dest}`}
                className="bg-surface-2 rounded-2xl p-7 border slane"
                style={{ ['--pa' as string]: BLUE, ['--i' as string]: i, borderColor: `color-mix(in srgb, ${BLUE} 8%, transparent)` }}
              >
                <span className="slane__idx font-mono">0{i + 1}</span>
                <div className="slane__row">
                  <span className="slane__flag">{lane.flag1}</span>
                  <div className="slane__track">
                    <span className="slane__dash" />
                    <span className="slane__ship" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </span>
                  </div>
                  <span className="slane__flag">{lane.flag2}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-fg text-lg">{lane.origin}</span>
                  <span className="font-display text-fg text-lg">{lane.dest}</span>
                </div>
                <p className="text-slate-500 text-sm">{lane.goods}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
