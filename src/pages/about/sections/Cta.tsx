import { Link } from 'react-router-dom'
import type { AboutContent } from '../content/en'

export default function Cta({ c }: { c: AboutContent['cta'] }) {
  return (
    <section className="bg-navy section-y relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="relative container-page max-w-4xl text-center">
        <h2
          className="font-display text-white mb-3 sm:mb-4 tracking-[-0.02em]"
          style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}
        >
          {c.title}
        </h2>
        <p className="text-slate-400 mb-7 sm:mb-10" style={{ fontSize: 'clamp(14.5px, 3.6vw, 18px)' }}>
          {c.text}
        </p>
        <div className="flex flex-col min-[400px]:flex-row min-[400px]:flex-wrap justify-center gap-3 sm:gap-4">
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
