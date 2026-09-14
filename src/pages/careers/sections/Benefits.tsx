import type { CareersContent } from '../content/en'
import { benefitIcons } from '../icons'

export default function Benefits({ c }: { c: CareersContent['benefits'] }) {
  return (
    <section className="bg-navy-dark py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium">
              {c.eyebrow}
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">
            {c.title}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {c.items.map((b) => (
            <div
              key={b.id}
              className="bg-navy border border-white/8 rounded-2xl p-8 hover:border-gold/25 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
                {benefitIcons[b.id]}
              </div>
              <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors">
                {b.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
