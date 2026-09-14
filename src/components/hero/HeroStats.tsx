import { useT } from '@/i18n'

export const STAT_ICONS = [
  <svg key="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>,
  <svg key="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>,
  <svg key="d" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
]

// Border classes per cell: handles 2-col (mobile) and 4-col (desktop) correctly
const cls = [
  'border-r border-b border-[var(--line)] md:border-b-0',
  'border-b border-[var(--line)] md:border-r md:border-b-0',
  'border-r border-[var(--line)]',
  '',
]

export default function HeroStats() {
  const { t } = useT()
  const stats = ([1, 2, 3, 4] as const).map((n, i) => ({
    icon: STAT_ICONS[i],
    value: t(`hero.stat${n}.value`),
    label: t(`hero.stat${n}.label`),
    sub: t(`hero.stat${n}.sub`),
  }))

  return (
    <div style={{
      background: 'var(--header-bg)',
      borderTop: '1px solid var(--line)',
      position: 'relative', zIndex: 10,
      backdropFilter: 'blur(20px)',
    }}>
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map(({ icon, value, label, sub }, i) => (
            <div
              key={label}
              className={`flex items-center gap-3 sm:gap-4 px-2 py-4 sm:px-5 sm:py-5 ${cls[i]}`}
            >
              <div
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-[10px] sm:rounded-xl"
                style={{
                  background: 'var(--brand-wash)',
                  border: '1px solid var(--brand-edge)',
                  color: 'var(--brand-fg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                {icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  className="font-display text-[21px] sm:text-[24px]"
                  style={{ color: 'var(--fg-strong)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {value}
                </div>
                <div
                  className="text-[11px] tracking-[0.14em]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    color: 'var(--brand-fg)', marginTop: 5,
                  }}>
                  {label}
                </div>
                {/* Sub-caption is noise at phone widths */}
                <div className="hidden sm:block" style={{ fontSize: 12.5, color: 'var(--fg-subtle)', marginTop: 3 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
