import { Link } from 'react-router-dom'
import type { TimelineContent } from '../content/en'

export default function AboutCta({ c }: { c: TimelineContent['cta'] }) {
  return (
    <section className="bg-navy-dark py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 cta-band">
        <span className="cta-band__rule" aria-hidden="true" />
        <div>
          <h2 className="font-display text-white mb-3 tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 5vw, 44px)' }}>{c.title}</h2>
          <p className="text-slate-400" style={{ fontSize: 'clamp(14.5px, 3.6vw, 17px)', maxWidth: '44ch' }}>{c.lead}</p>
        </div>
        <Link to={c.href} className="btn btn-primary">
          {c.button}
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </Link>
      </div>
    </section>
  )
}
