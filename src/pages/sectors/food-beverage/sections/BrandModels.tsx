import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

export default function BrandModels({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.brandModelsCopy.eyebrow}</span>
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.brandModelsCopy.title1}<br />{c.brandModelsCopy.title2}</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">{c.brandModelsCopy.lead}</p>
          </div>
          <div className="splans" style={{ ['--pa' as string]: ORANGE }}>
            {c.brandModels.map((model, i) => (
              <div
                key={model.title}
                className={`splan${model.highlight ? ' is-hot' : ''}`}
                style={{ ['--i' as string]: i }}
              >
                <span className="splan__idx font-mono">0{i + 1}</span>
                {model.highlight && <span className="splan__flag font-mono">{c.brandModelsCopy.highlightTag}</span>}
                <span className="splan__tag font-mono">{model.tag}</span>
                <h3 className="font-display text-2xl mb-3 splan__title">{model.title}</h3>
                <p className="text-sm leading-relaxed mb-6 splan__desc">{model.desc}</p>
                <ul className="splan__points">
                  {model.points.map((pt, j) => (
                    <li key={pt} style={{ ['--j' as string]: j }}>
                      <span className="splan__check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path pathLength="1" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <span className="splan__glow" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
