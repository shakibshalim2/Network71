import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'
import ProcessLine from '@/components/motion/ProcessLine'

export default function Roadmap({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{c.copy.roadmapEyebrow}</span>
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.copy.roadmapTitle}</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">{c.copy.roadmapLead}</p>
          </div>
          <ProcessLine steps={c.roadmap.length} accent={BLUE} className="sroad">
            <ol className="sroad__list" style={{ ['--cols' as string]: c.roadmap.length }}>
              {c.roadmap.map((r, i) => (
                <li key={r.year} className="sroad__item" style={{ ['--i' as string]: i }}>
                  <div className="sroad__node sroad__node--sm font-display" style={{ ['--pa' as string]: BLUE }}>{r.year.slice(2)}<span className="sr-only">{r.year}</span></div>
                  <div className="sroad__year font-mono">{r.year}</div>
                  <h3 className="font-display text-base text-fg sroad__title">{r.milestone}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed sroad__desc">{r.detail}</p>
                  <span className="sroad__ghost font-display" aria-hidden="true">{r.year.slice(2)}</span>
                </li>
              ))}
            </ol>
          </ProcessLine>
        </div>
      </section>

  )
}
