import { Link } from 'react-router-dom'
import PageHero from '@/components/PageHero'
import type { BlogContent } from '../content/en'

export function Hero({ c }: { c: BlogContent['hero'] }) {
  return <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
}

export function Featured({ c }: { c: BlogContent['featured'] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="force-dark relative overflow-hidden rounded-2xl border border-white/8 bg-navy-light min-h-[320px] flex flex-col justify-end">
        {/* Featured post background image */}
        <img decoding="async"
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
          <Link to="/contact" className="btn btn-primary btn-sm">{c.cta}</Link>
        </div>
      </div>
    </section>
  )
}
