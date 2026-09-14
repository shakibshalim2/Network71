import { Link } from 'react-router-dom'
import { useT } from '@/i18n'

const values = [
  {
    key: 'v1' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    key: 'v2' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: 'v3' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    key: 'v4' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
]

/* Decorative compass/target icon */
function CompassIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" style={{ width: 80, height: 80 }}>
      <circle cx="40" cy="40" r="38" stroke="var(--brand)" strokeWidth="0.8" opacity="0.35" />
      <circle cx="40" cy="40" r="28" stroke="var(--brand)" strokeWidth="0.6" opacity="0.25" />
      <circle cx="40" cy="40" r="18" stroke="var(--brand)" strokeWidth="0.6" opacity="0.2" />
      <circle cx="40" cy="40" r="4" fill="var(--brand)" opacity="0.5" />
      {/* Cardinal lines */}
      <line x1="40" y1="2" x2="40" y2="22" stroke="var(--brand)" strokeWidth="1" opacity="0.4" />
      <line x1="40" y1="58" x2="40" y2="78" stroke="var(--brand)" strokeWidth="1" opacity="0.4" />
      <line x1="2" y1="40" x2="22" y2="40" stroke="var(--brand)" strokeWidth="1" opacity="0.4" />
      <line x1="58" y1="40" x2="78" y2="40" stroke="var(--brand)" strokeWidth="1" opacity="0.4" />
      {/* Diagonal tick marks */}
      <line x1="12" y1="12" x2="18" y2="18" stroke="var(--brand)" strokeWidth="0.6" opacity="0.25" />
      <line x1="62" y1="12" x2="68" y2="18" stroke="var(--brand)" strokeWidth="0.6" opacity="0.25" />
      <line x1="12" y1="68" x2="18" y2="62" stroke="var(--brand)" strokeWidth="0.6" opacity="0.25" />
      <line x1="62" y1="68" x2="68" y2="62" stroke="var(--brand)" strokeWidth="0.6" opacity="0.25" />
    </svg>
  )
}

export default function About() {
  const { t } = useT()
  return (
    <section
      id="about"
      style={{ background: 'var(--s0)', borderTop: '1px solid var(--line)' }}
      className="section-y"
    >
      <div className="container-page">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_1.15fr_300px] gap-7 lg:gap-8 xl:gap-12 items-stretch">

          {/* ── Left: Statement ── */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 sm:mb-5 opacity-70">
              <CompassIcon />
            </div>
            <h2 className="font-display" style={{
              fontSize: 'clamp(28px, 5vw, 38px)',
              color: 'var(--fg-strong)',
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              marginBottom: 16,
            }}>
              {t('about.title1')}
              <br />
              {t('about.title2')}
              <br />
              <em style={{ color: 'var(--brand-fg)' }}>{t('about.title3')}</em>
            </h2>
            <p className="text-[15px]" style={{
              color: 'var(--fg-muted)',
              lineHeight: 1.75,
              maxWidth: 360,
              marginBottom: 22,
            }}>
              {t('about.lead')}
            </p>
            <Link
              to={t('home.about.href')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 14, fontWeight: 600, color: 'var(--brand-fg)',
                textDecoration: 'none', minHeight: 44,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.75' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {t('about.learnMore')}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* ── Centre: 4 values in 2×2 grid ── */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 content-center">
            {values.map(({ key, icon }) => (
              <div
                key={key}
                className="card-lift p-4 sm:p-5"
                style={{
                  background: 'var(--fill-1)',
                  border: '1px solid var(--line)',
                  borderRadius: 14,
                }}
              >
                <div
                  className="w-10 h-10 mb-3.5"
                  style={{
                    color: 'var(--brand-fg)',
                    background: 'var(--brand-wash)',
                    border: '1px solid var(--brand-edge)',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  {icon}
                </div>
                <div className="text-[15px]" style={{ fontWeight: 600, color: 'var(--fg-strong)', marginBottom: 6, letterSpacing: '-0.01em' }}>{t(`about.${key}.title`)}</div>
                <div className="text-[13px]" style={{ color: 'var(--fg-muted)', lineHeight: 1.6 }}>{t(`about.${key}.desc`)}</div>
              </div>
            ))}
          </div>

          {/* ── Right: Building photo + CTA ── */}
          <div
            className="min-h-[260px] sm:min-h-[300px] lg:min-h-[320px] md:col-span-2 lg:col-span-1"
            style={{
              borderRadius: 14, overflow: 'hidden',
              position: 'relative',
            }}>
            <img
              src={t('home.about.image')}
              alt={t('about.imgAlt')}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'var(--img-scrim-soft)',
            }} />
            {/* Small Network71 brand mark on image */}
            <div style={{
              position: 'absolute', top: 16, left: 16,
              background: 'var(--glass)',
              borderRadius: 6,
              padding: '5px 10px',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--brand-fg)', letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>
                Network71
              </span>
            </div>
            {/* CTA button */}
            <div className="p-4 sm:p-[20px_18px]" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <Link
                to="/contact"
                className="btn btn-primary"
                style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
              >
                {t('about.partner')}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
