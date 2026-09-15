import { Link } from 'react-router-dom'
import type { AboutContent } from '../content/en'

export default function Cta({ c }: { c: AboutContent['cta'] }) {
  return (
    <section className="bg-navy section-y relative overflow-hidden about-cta">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="relative container-page about-cta__band">
        <span className="about-cta__rule" aria-hidden="true" />
        <div className="about-cta__copy">
          <h2
            className="font-display text-white mb-3 sm:mb-4 tracking-[-0.02em]"
            style={{ fontSize: 'clamp(26px, 5vw, 44px)' }}
          >
            {c.title}
          </h2>
          <p className="text-slate-400" style={{ fontSize: 'clamp(14.5px, 3.6vw, 17px)', maxWidth: '44ch' }}>
            {c.text}
          </p>
        </div>
        <div className="about-cta__actions flex flex-col min-[400px]:flex-row min-[400px]:flex-wrap gap-3 sm:gap-4">
          <Link
            to="/careers"
            className="btn btn-primary"
            style={{ color: 'var(--fg-onbrand)' }}
          >
            {c.primary}
          </Link>
          <Link
            to="/contact"
            className="btn btn-secondary"
          >
            {c.secondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
