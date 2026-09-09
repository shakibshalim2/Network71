import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'

export default function Compliance({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: AMBER }}>
                  {c.sectionCopy.complianceEyebrow}
                </span>
              </div>
              <h2 className="font-display text-4xl text-fg mb-4">
                International Standards.<br />
                <span style={{ color: AMBER }}>{c.copy.verified}</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {c.sectionCopy.complianceLead}
              </p>

              {/* HACCP prominent badge */}
              <div
                className="flex items-center gap-5 p-5 rounded-2xl mb-6"
                style={{ background: `color-mix(in srgb, ${AMBER} 6%, transparent)`, border: `2px solid color-mix(in srgb, ${AMBER} 19%, transparent)` }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-fg text-sm"
                  style={{ background: AMBER, color: 'var(--s0)' }}
                >
                  HACCP
                </div>
                <div>
                  <div className="font-semibold text-fg text-sm mb-1">{c.copy.haccpOperations}</div>
                  <div className="text-slate-500 text-xs leading-relaxed">
                    {c.sectionCopy.haccpDescription}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {c.certifications.filter((c) => !c.prominent).map((cert) => (
                <div
                  key={cert.name}
                  className="p-5 rounded-xl border hover:shadow-md transition-all"
                  style={{ borderColor: `color-mix(in srgb, ${AMBER} 9%, transparent)` }}
                >
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded inline-block"
                    style={{ background: `color-mix(in srgb, ${AMBER} 7%, transparent)`, color: 'var(--accent-amber)' }}
                  >
                    {cert.name}
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  )
}
