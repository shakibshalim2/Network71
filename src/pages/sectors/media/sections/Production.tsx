import { RED } from '../theme'
import type { MediaContent } from '../content/en'
import Magnetic from '@/components/motion/Magnetic'

/** Production services as a six-cell hairline grid with turnaround + booking chips. */
export default function Production({ c }: { c: MediaContent['production'] }) {
  return (
    <section id="production" className="py-24 mprod" style={{ background: 'var(--s1)', ['--pa' as string]: RED }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: RED }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: RED }}>{c.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">{c.title1}<br /><span style={{ color: RED }}>{c.title2}</span></h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md lg:text-right">{c.lead}</p>
        </div>
        <ol className="swow__grid mprod__grid">
          {c.items.map((it, i) => (
            <li key={it.title} className="swow__cell" style={{ ['--i' as string]: i }}>
              <span className="swow__idx font-mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="swow__icon" aria-hidden="true">{it.icon}</span>
              <h3 className="swow__title">{it.title}</h3>
              <p className="swow__desc">{it.desc}</p>
              <dl className="mprod__meta font-mono">
                <div><dt>{c.labels.turnaround}</dt><dd>{it.turnaround}</dd></div>
                <div><dt>{c.labels.from}</dt><dd>{it.from}</dd></div>
              </dl>
              <span className="swow__rule" aria-hidden="true" />
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Magnetic strength={8}>
            <a href="#sector-contact" className="btn btn-secondary btn-sm">
              {c.cta}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
