import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'
import { icons } from '../icons'

export default function Technology({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: SKY, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: SKY }}>
                {c.sectionCopy.technologyEyebrow}
              </span>
              <div className="h-px w-8" style={{ background: SKY, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl text-white mb-3">{c.copy.technologyTitle}</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              {c.sectionCopy.technologyLead}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {c.techCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-7 transition-all hover:scale-[1.01] duration-300"
                style={{ background: 'var(--fill-2)', border: `1px solid color-mix(in srgb, ${card.accent} 15%, transparent)` }}
              >
                <div
                  className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in srgb, ${card.accent} 9%, transparent)`, color: card.accent }}
                >
                  {icons[card.iconId]}
                </div>
                <h3 className="font-display text-xl text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                <div className="mt-5 h-0.5 w-12 rounded-full" style={{ background: card.accent }} />
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
