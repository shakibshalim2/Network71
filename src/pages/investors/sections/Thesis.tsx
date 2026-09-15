import type { InvestorsContent } from '../content/en'
import { THESIS_ICONS } from '../icons'
import Eyebrow from './Eyebrow'
import { spotlight } from '@/lib/useSpotlight'

export default function Thesis({ c }: { c: InvestorsContent['thesis'] }) {
  return (
    <section className="bg-navy py-24 dcards">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <Eyebrow label={c.eyebrow} center />
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">{c.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 dcards__grid">
          {c.items.map((t, i) => (
            <div key={t.id} className="bg-navy-light border border-white/8 rounded-2xl p-8 hover:border-gold/25 transition-colors duration-300 group dcard" onPointerMove={spotlight}>
              <span className="dcard__spot" aria-hidden="true" />
              <span className="dcard__numeral font-display" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/15 transition-colors">
                {THESIS_ICONS[t.id]}
              </div>
              <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors">{t.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
