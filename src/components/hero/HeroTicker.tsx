import { useT, DIVISION_IDS, divKey } from '@/i18n'

export default function HeroTicker() {
  const { t } = useT()
  const ticker = DIVISION_IDS.map(id => t(divKey(id, 'name')))

  return (
    <div style={{
      background: 'var(--s-inset)',
      borderTop: '1px solid var(--fill-1)',
      padding: '10px 0',
      overflow: 'hidden',
      position: 'relative', zIndex: 10,
    }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 44s linear infinite' }}>
        {[...ticker, ...ticker, ...ticker].map((name, i) => (
          <span
            key={i}
            className="gap-2.5 px-3.5 text-[8px] tracking-[0.2em] sm:gap-4 sm:px-6 sm:text-[9px] sm:tracking-[0.32em]"
            style={{
              display: 'inline-flex', alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              color: 'var(--fg-faint)',
              textTransform: 'uppercase',
            }}
          >
            {name}
            <span style={{ display: 'inline-block', width: 3.5, height: 3.5, borderRadius: '50%', background: 'var(--brand-edge)', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}
