import { Link } from 'react-router-dom'
import type { VenturesContent } from '../content/en'
import { GOLD, BG_DEEP } from '../theme'

export default function Status({ c }: { c: VenturesContent['status'] }) {
  return (
    <section className="py-16" style={{ background: BG_DEEP }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="rounded-2xl p-8 lg:p-10 grid lg:grid-cols-[auto_1fr_auto] gap-6 items-center sv-status" style={{ ['--pa' as string]: GOLD, background: `color-mix(in srgb, ${GOLD} 4%, transparent)`, border: `1px solid color-mix(in srgb, ${GOLD} 18%, transparent)` }}>
          <span className="sv-status__sheen" aria-hidden="true" />
          <div className="sv-status__seal" style={{ color: GOLD }}>
            <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" pathLength="1" className="sv-status__ring" /></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 3l9 16H3L12 3z" /></svg>
          </div>
          <div>
            <h3 className="font-semibold text-white text-base mb-1.5">{c.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {c.p}<Link to="/projects" className="underline underline-offset-2" style={{ color: GOLD }}>{c.link}</Link>{c.p2}
            </p>
          </div>
          <Link to="/investors" className="text-sm font-semibold whitespace-nowrap sv-status__cta" style={{ color: GOLD }}>{c.cta}</Link>
        </div>
      </div>
    </section>
  )
}
