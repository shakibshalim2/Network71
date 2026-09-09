import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

export default function QualityLab({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ORANGE }}>{c.facilitiesCopy.eyebrow}</span>
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.facilitiesCopy.title}</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">{c.facilitiesCopy.lead}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {c.facilities.map((f) => (
              <div key={f.unit} className="bg-surface-2 rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-slate-100" style={{ background: `color-mix(in srgb, ${ORANGE} 2%, transparent)` }}>
                  <div className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: ORANGE }}>{c.facilitiesCopy.colUnit}</div>
                  <h3 className="font-display text-xl text-fg">{f.unit.replace('Processing Unit ', '')}</h3>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2">{c.facilitiesCopy.colCapacity}</div>
                    <div className="text-sm text-slate-600 font-medium">{f.capacity}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2">{c.facilitiesCopy.colLines}</div>
                    <div className="space-y-1">
                      {f.lines.map((line) => (
                        <div key={line} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1 h-1 rounded-full" style={{ background: ORANGE, color: 'var(--s0)' }} />
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2">{c.facilitiesCopy.colCerts}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {f.certs.map((cert) => (
                        <span
                          key={cert}
                          className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wide"
                          style={{ background: `color-mix(in srgb, ${ORANGE} 6%, transparent)`, color: ORANGE }}
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lab & QC panel */}
          <div className="bg-surface-2 rounded-2xl border border-slate-100 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-6" style={{ background: ORANGE, color: 'var(--s0)' }} />
                  <span className="text-[10px] font-semibold tracking-[0.25em] uppercase" style={{ color: ORANGE }}>{c.facilitiesCopy.qcEyebrow}</span>
                </div>
                <h3 className="font-display text-2xl text-fg mb-3">{c.facilitiesCopy.qcTitle}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{c.facilitiesCopy.qcLead}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {c.facilitiesCopy.qcItems.map((item) => (
                  <div key={item} className="p-4 rounded-xl text-center border border-slate-100" style={{ background: `color-mix(in srgb, ${ORANGE} 2%, transparent)` }}>
                    <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: `color-mix(in srgb, ${ORANGE} 8%, transparent)` }}>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: ORANGE, color: 'var(--s0)' }} />
                    </div>
                    <div className="text-xs font-semibold text-fg">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
