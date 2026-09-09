import { Link } from 'react-router-dom'
import type { BlogContent } from '../content/en'

export function Hero({ c }: { c: BlogContent['hero'] }) {
  return (
    <section className="relative pt-[68px] overflow-hidden bg-navy-dark">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal/8 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-gold" />
          <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">{c.eyebrow}</span>
        </div>
        <h1 className="font-display text-5xl lg:text-6xl text-white mb-5">{c.title}</h1>
        <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
          {c.lead}
        </p>
      </div>
    </section>
  )
}

export function Featured({ c }: { c: BlogContent['featured'] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="force-dark relative overflow-hidden rounded-2xl border border-white/8 bg-navy-light min-h-[320px] flex flex-col justify-end">
        {/* Featured post background image */}
        <img
          src={c.imageSrc}
          alt={c.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/80 to-transparent" />
        <div className="relative p-8 md:p-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider">{c.badge}</span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-medium">{c.tag}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
            {c.title}
          </h2>
          <p className="text-slate-300 text-base max-w-xl leading-relaxed mb-6">
            {c.text}
          </p>
          <Link to="/contact" className="inline-flex px-6 py-3 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors">{c.cta}</Link>
        </div>
      </div>
    </section>
  )
}
