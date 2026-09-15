import type { SustainabilityContent } from '../content/en'
import { COMMITMENT_ICONS } from '../icons'
import { spotlight } from '@/lib/useSpotlight'

export default function Commitments({ c }: { c: SustainabilityContent['commitments'] }) {
  return (
    <section className="py-24 px-6 bg-navy dcards">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 dcards__grid">
          {c.items.map((item, i) => (
            <div key={item.id} className="bg-navy-dark rounded-xl p-6 border border-white/8 hover:border-gold/25 transition-colors dcard group" onPointerMove={spotlight}>
              <span className="dcard__spot" aria-hidden="true" />
              <span className="dcard__numeral font-display" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 text-gold flex items-center justify-center mb-5">
                {COMMITMENT_ICONS[item.id]}
              </div>
              <h3 className="text-white font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
