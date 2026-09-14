import PageHero from '@/components/PageHero'
import type { AboutContent } from '../content/en'

export default function Hero({ c }: { c: AboutContent['hero'] }) {
  return (
    <PageHero
      breadcrumb={{ home: c.breadcrumbHome, current: c.breadcrumbCurrent }}
      eyebrow={c.eyebrow}
      title={c.title}
      lead={c.lead}
      aside={<VisionPanel c={c} />}
    />
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
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--brand-fg)' }}>
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
            <dt className="text-[12px] sm:text-[13px] mt-1 leading-snug" style={{ color: 'var(--fg-subtle)' }}>{f.label}</dt>
          </div>
        ))}
      </dl>
    </aside>
  )
}
