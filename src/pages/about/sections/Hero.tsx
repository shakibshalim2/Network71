import { Link } from 'react-router-dom'
import type { AboutContent } from '../content/en'
import Eyebrow from './Eyebrow'

export default function Hero({ c }: { c: AboutContent['hero'] }) {
  return (
    <section
      className="relative bg-navy overflow-hidden"
      style={{
        /* Clear the fixed header on every device rather than a flat pt-32 */
        paddingTop: 'calc(var(--header-h) + clamp(36px, 8vw, 72px))',
        paddingBottom: 'clamp(44px, 9vw, 80px)',
      }}
    >
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div
        className="absolute -top-24 -right-24 rounded-full bg-gold/5 blur-3xl pointer-events-none"
        style={{ width: 'min(384px, 80vw)', aspectRatio: '1' }}
      />
      <div className="relative container-page">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6 sm:mb-8">
          <Link to="/" className="tap-inline hover:text-gold transition-colors">{c.breadcrumbHome}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-400" aria-current="page">{c.breadcrumbCurrent}</span>
        </nav>
        <Eyebrow label={c.eyebrow} />
        <h1
          className="font-display text-white leading-[1.06] tracking-[-0.02em] mb-4 sm:mb-6"
          style={{ fontSize: 'clamp(34px, 8.5vw, 72px)' }}
        >
          {c.title}
        </h1>
        <p className="text-slate-300 max-w-xl leading-relaxed" style={{ fontSize: 'clamp(15px, 3.8vw, 20px)' }}>
          {c.lead}
        </p>
      </div>
    </section>
  )
}
