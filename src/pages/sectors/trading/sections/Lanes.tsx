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
            {c.tradeLanes.map((lane) => (
              <div
                key={`${lane.origin}-${lane.dest}`}
                className="bg-surface-2 rounded-2xl p-7 border hover:shadow-lg transition-all"
                style={{ borderColor: `color-mix(in srgb, ${BLUE} 8%, transparent)` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{lane.flag1}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-px" style={{ background: `color-mix(in srgb, ${BLUE} 25%, transparent)`, borderTop: `1px dashed ${BLUE}` }} />
                    <svg className="w-4 h-4" style={{ color: BLUE }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <div className="flex-1 h-px" style={{ background: `color-mix(in srgb, ${BLUE} 25%, transparent)`, borderTop: `1px dashed ${BLUE}` }} />
                  </div>
                  <span className="text-2xl">{lane.flag2}</span>
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
