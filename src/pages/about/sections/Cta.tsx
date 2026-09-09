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
            className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 bg-gold text-[13px] sm:text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
            style={{ color: 'var(--fg-onbrand)' }}
          >
            {c.primary}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 border border-white/20 text-white text-[13px] sm:text-sm font-medium rounded-lg hover:bg-white/5 hover:border-white/40 transition-colors"
          >
            {c.secondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
