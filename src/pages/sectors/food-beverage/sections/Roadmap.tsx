import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import ProcessLine from '@/components/motion/ProcessLine'

export default function Roadmap({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.roadmapCopy.eyebrow}</span>
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.roadmapCopy.title}</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">{c.roadmapCopy.lead}</p>
          </div>
          <ProcessLine steps={c.roadmap.length} accent={ORANGE} className="sroad">
            <ol className="sroad__list" style={{ ['--cols' as string]: c.roadmap.length }}>
              {c.roadmap.map((item, i) => (
                <li key={item.year} className="sroad__item" style={{ ['--i' as string]: i }}>
                  <div className="sroad__node sroad__node--sm font-display" style={{ ['--pa' as string]: ORANGE }}>{String(item.year).slice(2)}</div>
                  <div className="sroad__year font-mono">Phase {i + 1} · {item.year}</div>
                  <h3 className="font-display text-lg text-white sroad__title">{item.milestone}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed sroad__desc">{item.detail}</p>
                  <span className="sroad__ghost font-display" aria-hidden="true">{String(item.year).slice(2)}</span>
                </li>
              ))}
            </ol>
          </ProcessLine>
        </div>
      </section>
  )
}
