import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import { icons } from '../icons'
import CountUp from '@/components/motion/CountUp'

export default function Sustainability({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.sustainabilityCopy.eyebrow}</span>
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.sustainabilityCopy.title}</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">{c.sustainabilityCopy.lead}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {c.sustainability.map((s) => (
              <div key={s.title} className="bg-surface-2 rounded-2xl p-8 border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `color-mix(in srgb, ${ORANGE} 7%, transparent)`, color: ORANGE }}
                >
                  {icons[s.iconId]}
                </div>
                <h3 className="font-display text-xl text-fg mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="p-4 rounded-xl" style={{ background: `color-mix(in srgb, ${ORANGE} 3%, transparent)`, border: `1px solid color-mix(in srgb, ${ORANGE} 8%, transparent)` }}>
                  <div className="font-display text-xl mb-0.5" style={{ color: ORANGE }}><CountUp value={s.stat} /></div>
                  <div className="text-xs text-slate-400">{s.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
