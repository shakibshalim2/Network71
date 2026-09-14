import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

export default function Facilities({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Certification grid */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.quality.eyebrow}</span>
              </div>
              <h2 className="font-display text-4xl text-fg mb-6">{c.quality.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">{c.quality.lead}</p>
              <div className="grid grid-cols-1 gap-3">
                {c.certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-orange-200 transition-all">
                    <div
                      className="w-14 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold tracking-wide text-center"
                      style={{ background: `color-mix(in srgb, ${ORANGE} 7%, transparent)`, color: ORANGE }}
                    >
                      {cert.name}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-fg">{cert.name}</div>
                      <div className="text-xs text-slate-400">{cert.body}</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 rounded-full" style={{ background: ORANGE, color: 'var(--s0)' }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4">{c.quality.note}</p>
            </div>

            {/* Performance targets */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.quality.targetsEyebrow}</span>
              </div>
              <h2 className="font-display text-4xl text-fg mb-6">{c.quality.targetsTitle1}<br />{c.quality.targetsTitle2}</h2>
              <div className="space-y-8">
                {c.qualityMetrics.map((m) => (
                  <div key={m.label}>
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <div className="font-semibold text-sm text-fg">{m.label}</div>
                        <div className="text-[11px] text-slate-400">{m.note}</div>
                      </div>
                      <div className="font-display text-2xl" style={{ color: ORANGE }}>{m.value}</div>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${m.target}%`, background: ORANGE }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-5 rounded-xl" style={{ background: `color-mix(in srgb, ${ORANGE} 3%, transparent)`, border: `1px solid color-mix(in srgb, ${ORANGE} 9%, transparent)` }}>
                <h4 className="font-semibold text-sm text-fg mb-2">{c.quality.cultureTitle}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{c.quality.cultureLead}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
