import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import MeterBar from '@/components/sector/MeterBar'

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
              <ol className="svals" style={{ ['--pa' as string]: ORANGE }}>
                {c.certifications.map((cert, i) => (
                  <li key={cert.name} className="svals__row svals__row--badge" style={{ ['--i' as string]: i }}>
                    <span className="svals__badge font-mono">{cert.name}</span>
                    <div className="svals__body">
                      <h3 className="font-semibold text-sm text-fg mb-0.5">{cert.name}</h3>
                      <p className="text-xs text-slate-400">{cert.body}</p>
                    </div>
                    <span className="svals__arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-slate-400 mt-4">{c.quality.note}</p>
            </div>

            {/* Performance targets */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.quality.targetsEyebrow}</span>
              </div>
              <h2 className="font-display text-4xl text-fg mb-6">{c.quality.targetsTitle1}<br />{c.quality.targetsTitle2}</h2>
              <div className="smeters" style={{ ['--pa' as string]: ORANGE }}>
                {c.qualityMetrics.map((m, i) => (
                  <MeterBar key={m.label} label={m.label} value={m.target} display={m.value} accent={ORANGE} index={i} caption={m.note} />
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
