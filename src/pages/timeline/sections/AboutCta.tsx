import { Link } from 'react-router-dom'
import type { TimelineContent } from '../content/en'

export default function AboutCta({ c }: { c: TimelineContent['cta'] }) {
  return (
    <section className="bg-navy-dark border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="font-display text-3xl text-white mb-2 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 text-sm max-w-lg">
            {c.lead}
          </p>
        </div>
        <Link
          to={c.href}
          className="flex-shrink-0 px-8 py-3.5 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
        >
          {c.button}
        </Link>
      </div>
    </section>
  )
}
