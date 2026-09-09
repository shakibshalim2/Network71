import { Link } from 'react-router-dom'
import type { SustainabilityContent } from '../content/en'

export default function Cta({ c }: { c: SustainabilityContent['cta'] }) {
  return (
    <section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-5 tracking-[-0.02em]">
          {c.title}
        </h2>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">{c.text}</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gold text-on-brand font-semibold hover:bg-gold-light transition-colors"
        >
          {c.button}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
