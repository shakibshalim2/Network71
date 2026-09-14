import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'

export default function Roadmap({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: SKY, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: SKY }}>
                {c.sectionCopy.roadmapEyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl text-white mb-3">{c.roadmap.title}</h2>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              {c.sectionCopy.roadmapLead}
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: `linear-gradient(to bottom, ${AMBER}, ${SKY})` }}
            />

            <div className="space-y-8 sm:pl-20">
              {c.roadmapItems.map((item, i) => (
                <div key={item.year} className="relative flex gap-6 items-start">
                  {/* Year bubble */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-white text-sm sm:absolute sm:-left-20"
                    style={{ color: 'var(--s0)', background: i < 2 ? AMBER : SKY }}
                  >
                    {item.year}
                  </div>
                  <div
                    className="flex-1 rounded-xl p-5"
                    style={{ background: 'var(--fill-2)', border: `1px solid color-mix(in srgb, ${i < 2 ? AMBER : SKY} 13%, transparent)` }}
                  >
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  )
}
