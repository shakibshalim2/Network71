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
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8 lg:gap-16 items-start">
          <p className="text-slate-300 max-w-xl leading-relaxed" style={{ fontSize: 'clamp(15px, 3.8vw, 20px)' }}>
            {c.lead}
          </p>
          <VisionPanel c={c} />
        </div>
      </div>
    </section>
  )
}

/* Vision statement + verifiable facts; replaces a stock hero photo with something we can stand behind. */
function VisionPanel({ c }: { c: AboutContent['hero'] }) {
  return (
    <aside
      className="relative rounded-2xl p-6 sm:p-7 lg:p-8 animate-fade-up"
      style={{ background: 'var(--fill-1)', border: '1px solid var(--line)', animationDelay: '120ms' }}
      aria-label={c.visionLabel}
    >
      <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--brand-fg)' }}>
        {c.visionLabel}
      </p>
      <p className="font-display leading-[1.15] tracking-[-0.02em]" style={{ fontSize: 'clamp(20px, 3.2vw, 28px)' }}>
        {c.visionLines.map((line, i) => (
          <span
            key={line}
            className="block"
            style={{ color: i === 1 ? 'var(--brand-fg)' : i === 2 ? 'var(--fg-subtle)' : 'var(--fg-strong)' }}
          >
            {line}
          </span>
        ))}
      </p>
      <dl className="grid grid-cols-3 gap-3 mt-6 pt-5" style={{ borderTop: '1px solid var(--line)' }}>
        {c.facts.map((f) => (
          <div key={f.label} className="min-w-0">
            <dd className="font-display text-xl sm:text-2xl" style={{ color: 'var(--fg-strong)' }}>{f.value}</dd>
            <dt className="text-[10.5px] sm:text-xs mt-0.5 leading-snug" style={{ color: 'var(--fg-subtle)' }}>{f.label}</dt>
          </div>
        ))}
      </dl>
    </aside>
  )
}
