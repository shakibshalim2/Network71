import { RED } from '../theme'
import type { MediaContent } from '../content/en'
import Magnetic from '@/components/motion/Magnetic'

/** Newsroom contact routes with response SLAs, visually separated from the commercial form. */
export default function PressDesk({ c }: { c: MediaContent['pressDesk'] }) {
  return (
    <section id="press-desk" className="py-24 mpress" style={{ background: 'var(--s0)', ['--pa' as string]: RED }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: RED }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: RED }}>{c.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">{c.title1}<br /><span style={{ color: RED }}>{c.title2}</span></h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md">{c.lead}</p>
            <p className="mpress__note">{c.note}</p>
            <div className="mt-8">
              <Magnetic strength={8}>
                <a href="#sector-contact" className="btn btn-primary btn-sm" style={{ background: RED, color: '#fff' }}>
                  {c.cta}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </Magnetic>
            </div>
          </div>
          <ol className="mpress__list">
            {c.channels.map((ch, i) => (
              <li key={ch.title} className="mpress__row" style={{ ['--i' as string]: i }}>
                <span className="mpress__icon" aria-hidden="true">{ch.icon}</span>
                <div className="mpress__body">
                  <h3>{ch.title}</h3>
                  <p>{ch.desc}</p>
                </div>
                <span className="mpress__sla font-mono"><i />{ch.sla}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
