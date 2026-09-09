import { Link } from 'react-router-dom'
import type { InvestorsContent } from '../content/en'
import Eyebrow from './Eyebrow'

export default function Hero({ c }: { c: InvestorsContent['hero'] }) {
  return (
    <section className="relative bg-navy pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link to="/" className="hover:text-gold transition-colors">{c.breadcrumbHome}</Link>
          <span>/</span>
          <span className="text-slate-400">{c.breadcrumbCurrent}</span>
        </div>
        <Eyebrow label={c.eyebrow} />
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-3xl">
          {c.title}
        </h1>
        <p className="text-slate-300 text-xl max-w-xl leading-relaxed">{c.lead}</p>
      </div>
    </section>
  )
}
