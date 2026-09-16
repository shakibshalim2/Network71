import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'
import ProcessLine from '@/components/motion/ProcessLine'

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

          <ProcessLine steps={c.roadmapItems.length} accent={AMBER} className="sroadv">
            <ol className="sroadv__list">
              {c.roadmapItems.map((item, i) => (
                <li key={item.year} className="sroadv__item" style={{ ['--i' as string]: i, ['--pa' as string]: i < 2 ? AMBER : SKY }}>
                  <div className="sroadv__year font-display">{item.year}</div>
                  <div className="sroadv__card">
                    <h3 className="font-semibold text-white mb-2 sroadv__title">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed sroadv__desc">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ProcessLine>
        </div>
      </section>

  )
}
