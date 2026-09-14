import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

export default function Roadmap({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.roadmapCopy.eyebrow}</span>
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.roadmapCopy.title}</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">{c.roadmapCopy.lead}</p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px" style={{ background: `color-mix(in srgb, ${ORANGE} 15%, transparent)` }} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {c.roadmap.map((item, i) => (
                <div key={item.year} className="relative">
                  <div className="hidden lg:flex w-14 h-14 rounded-full items-center justify-center mx-auto mb-6 font-display text-fg font-bold text-sm z-10 relative" style={{ background: ORANGE, color: 'var(--s0)' }}>
                    {item.year}
                  </div>
                  <div className="p-6 rounded-2xl border border-white/6 hover:border-orange-500/20 transition-all" style={{ background: 'var(--fill-2)' }}>
                    <div className="lg:hidden font-display text-2xl mb-3" style={{ color: ORANGE }}>{item.year}</div>
                    <div className="text-[11px] font-bold tracking-[0.14em] uppercase mb-2 text-slate-500">Phase {i + 1}</div>
                    <h3 className="font-display text-lg text-white mb-3">{item.milestone}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}
