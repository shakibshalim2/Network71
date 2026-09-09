import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'

export default function EdibleOils({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: AMBER }}>
                {c.overview.oilsTitle} — Product Range
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h2 className="font-display text-4xl text-fg mb-3">
                  {c.edible.heading}<br />
                  <span style={{ color: AMBER }}>{c.copy.oilsTagline}</span>
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                  {c.sectionCopy.edibleBody}
                </p>
              </div>
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-xl flex-shrink-0"
                style={{ background: `color-mix(in srgb, ${AMBER} 6%, transparent)`, border: `1px solid color-mix(in srgb, ${AMBER} 19%, transparent)` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: AMBER, color: 'var(--s0)' }} />
                <span className="text-xs font-semibold text-amber-800">{c.copy.oilCertification}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.edibleOilProducts.map((oil, i) => (
              <div
                key={oil.name}
                className={`rounded-2xl p-6 border transition-all hover:shadow-lg ${i === 0 ? 'lg:col-span-1' : ''}`}
                style={{ borderColor: `color-mix(in srgb, ${AMBER} 13%, transparent)`, background: i % 2 === 0 ? `color-mix(in srgb, ${AMBER} 2%, transparent)` : 'var(--s2)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `color-mix(in srgb, ${AMBER} 8%, transparent)` }}
                >
                  <svg className="w-5 h-5" style={{ color: AMBER }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-fg mb-3">{oil.name}</h3>
                <div className="space-y-2.5">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{c.copy.grades}</div>
                    <div className="text-xs text-slate-600">{oil.grades}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{c.copy.uses}</div>
                    <div className="text-xs text-slate-600">{oil.uses}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{c.copy.packaging}</div>
                    <div className="text-xs text-slate-600">{oil.packaging}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
