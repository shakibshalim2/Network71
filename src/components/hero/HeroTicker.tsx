import { useT, DIVISION_IDS, divKey } from '@/i18n'

export default function HeroTicker() {
  const { t } = useT()
  const ticker = DIVISION_IDS.map(id => t(divKey(id, 'name')))

  return (
    <div style={{
      background: 'var(--s-inset)',
      borderTop: '1px solid var(--fill-1)',
      padding: '13px 0',
      overflow: 'hidden',
      position: 'relative', zIndex: 10,
      maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
    }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 44s linear infinite' }}>
        {[...ticker, ...ticker, ...ticker].map((name, i) => (
          <span
            key={i}
            className="gap-3 px-4 text-[11px] tracking-[0.16em] sm:gap-4 sm:px-6"
            style={{
              display: 'inline-flex', alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              color: 'var(--fg-subtle)',
              textTransform: 'uppercase',
            }}
          >
            {name}
            <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: 'var(--brand-edge)', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}
