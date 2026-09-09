import { Link } from 'react-router-dom'
import { useT } from '@/i18n'

/** Main text content: eyebrow, H1, lead, CTAs, interaction hints, scroll indicator. */
export default function HeroContent() {
  const { t } = useT()
  return (
    <div className="hero-content" style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
      <div
        className="container-page w-full"
        style={{
          paddingTop: 'calc(var(--header-h) + clamp(36px, 8vw, 60px))',
          paddingBottom: 'clamp(36px, 7vw, 52px)',
        }}>
        <div style={{ maxWidth: 560 }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(18px, 4vw, 30px)' }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: 'var(--brand)',
              animation: 'pulse-slow 2.8s ease-in-out infinite', flexShrink: 0,
            }} />
            <span
              className="text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.38em]"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand-fg)',
                textTransform: 'uppercase',
              }}>
              {t('hero.eyebrow')}
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-display"
            style={{
              /* 8.5vw lets the two lines fill small screens without overflowing */
              fontSize: 'clamp(33px, 8.5vw, 84px)',
              color: 'var(--fg-strong)',
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              marginBottom: 'clamp(14px, 3vw, 22px)',
            }}
          >
            {t('hero.title1')}
            <br />
            <em style={{ color: 'var(--brand-fg)' }}>{t('hero.title2')}</em>
          </h1>

          {/* Body */}
          <p style={{
            color: 'var(--fg)',
            fontSize: 'clamp(14.5px, 3.6vw, 16.5px)',
            lineHeight: 1.7,
            maxWidth: 460,
            marginBottom: 'clamp(24px, 5vw, 36px)',
          }}>
            {t('hero.lead')}
          </p>

          {/* CTAs — stack full-width on narrow screens, inline from 400px up */}
          <div
            className="flex flex-col min-[400px]:flex-row min-[400px]:flex-wrap"
            style={{ gap: 12, marginBottom: 'clamp(26px, 6vw, 40px)' }}>
            <Link
              to="/projects"
              className="justify-center min-[400px]:justify-start"
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', fontSize: 13.5, fontWeight: 600, borderRadius: 8,
                background: 'var(--brand-bright)', color: 'var(--fg-onbrand)', border: 'none', cursor: 'pointer',
                boxShadow: 'var(--shadow-brand)',
                transition: 'all 0.18s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--brand-bright)'
                e.currentTarget.style.boxShadow = 'var(--shadow-brand)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--brand)'
                e.currentTarget.style.boxShadow = 'var(--shadow-brand)'
              }}
            >
              {t('hero.ctaWork')}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="justify-center min-[400px]:justify-start"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 26px', fontSize: 13.5, fontWeight: 500, borderRadius: 8,
                border: '1px solid var(--line-strong)',
                color: 'var(--fg)',
                textDecoration: 'none',
                transition: 'all 0.18s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)'
                e.currentTarget.style.background = 'var(--line)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {t('hero.ctaContact')}
            </Link>
          </div>

          {/* Interaction hints — desktop only */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 20, marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 13, height: 13, color: 'var(--fg-faint)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225M13.684 16.6l2.224-2.51M6.228 15.228l-3.87-3.87a1.125 1.125 0 010-1.59L6.57 5.572m0 0l.943-.943M6.57 5.572L9.228 8.23" />
              </svg>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.26em', color: 'var(--fg-faint)', textTransform: 'uppercase' }}>
                {t('hero.drag')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 13, height: 13, color: 'var(--fg-faint)' }}>
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 8v4l3 3" />
              </svg>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.26em', color: 'var(--fg-faint)', textTransform: 'uppercase' }}>
                {t('hero.click')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              {['↑', '↓', '←', '→'].map(k => (
                <span key={k} style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 14, height: 14, borderRadius: 3,
                  border: '1px solid var(--fg-faint)',
                  fontSize: 8, color: 'var(--fg-faint)',
                }}>{k}</span>
              ))}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.26em', color: 'var(--fg-faint)', textTransform: 'uppercase', marginLeft: 3 }}>
                {t('hero.keys')}
              </span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 20, height: 32, borderRadius: 10,
              border: '1px solid var(--line-strong)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
              paddingTop: 5,
            }}>
              <div style={{
                width: 3, height: 8, borderRadius: 2,
                background: 'rgba(255,255,255,0.4)',
                animation: 'scroll-dot 1.9s ease-in-out infinite',
              }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              letterSpacing: '0.3em', color: 'var(--fg-faint)',
              textTransform: 'uppercase',
            }}>
              {t('hero.scroll')}
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}
