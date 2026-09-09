import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

export default function BrandModels({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ORANGE }}>{c.brandModelsCopy.eyebrow}</span>
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.brandModelsCopy.title1}<br />{c.brandModelsCopy.title2}</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">{c.brandModelsCopy.lead}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {c.brandModels.map((model) => (
              <div
                key={model.title}
                className="relative rounded-2xl p-8 transition-all"
                style={
                  model.highlight
                    ? { background: ORANGE, color: 'var(--s0)' }
                    : { background: 'var(--fill-2)', border: 'var(--border-subtle)' }
                }
              >
                {model.highlight && (
                  <div className="inline-block mb-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/10 text-inherit tracking-wider uppercase">{c.brandModelsCopy.highlightTag}</div>
                )}
                <div
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-4"
                  style={model.highlight ? { background: 'rgba(0,0,0,0.08)', color: 'inherit' } : { background: `color-mix(in srgb, ${ORANGE} 9%, transparent)`, color: ORANGE }}
                >
                  {model.tag}
                </div>
                <h3 className={`font-display text-2xl mb-3 ${model.highlight ? 'text-inherit' : 'text-white'}`}>{model.title}</h3>
                <p className={`text-sm leading-relaxed mb-6 ${model.highlight ? 'text-inherit' : 'text-slate-400'}`}>{model.desc}</p>
                <ul className="space-y-2.5">
                  {model.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm">
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: model.highlight ? 'inherit' : ORANGE }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={model.highlight ? 'text-inherit' : 'text-slate-400'}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
