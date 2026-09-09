import { lazy, Suspense, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { HotspotData } from '@/components/Globe3D'
import { useT, DIVISION_IDS, divKey } from '@/i18n'

const Globe3D = lazy(() => import('@/components/Globe3D'))

const STAT_ICONS = [
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

export default function Hero() {
  const { t } = useT()
  const ticker = DIVISION_IDS.map(id => t(divKey(id, 'name')))
  const stats = ([1, 2, 3, 4] as const).map((n, i) => ({
    icon: STAT_ICONS[i],
    value: t(`hero.stat${n}.value`),
    label: t(`hero.stat${n}.label`),
    sub: t(`hero.stat${n}.sub`),
  }))
  const [hotspot, setHotspot]       = useState<HotspotData | null>(null)
  const [globeReady, setGlobeReady] = useState(false)

  // Close panel on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setHotspot(null) }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <section
      id="home"
      style={{
        /* dvh avoids the iOS/Android URL-bar height jump that 100vh causes */
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--s0)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* ── Interactive 3D Globe — single instance, positioned right on desktop ── */}
      {/* On lg+: right 65% of viewport (sphere center ≈ 68% from left).
          On mobile: full viewport with heavy gradient overlay for readability. */}
      <Suspense fallback={null}>
        <Globe3D
          className="hero-globe absolute top-0 bottom-0 right-0 left-0 lg:left-[35%]"
          style={{ zIndex: 1 }}
          onHotspot={setHotspot}
          onReady={() => setGlobeReady(true)}
        />
      </Suspense>

      {/* ── Globe loading shimmer — fades out once canvas is ready ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          left: 0,
          zIndex: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: globeReady ? 0 : 1,
          transition: 'opacity 1.2s ease',
          pointerEvents: 'none',
        }}
        className="lg:left-[35%]"
      >
        <div style={{ position: 'relative', width: 80, height: 80 }}>
          {/* Orbit rings */}
          {[1.0, 0.68, 0.40].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              border: `1px solid rgba(200,150,42,${0.06 + i*0.06})`,
              transform: `scale(${s})`,
              animation: `spin ${14 + i*7}s linear infinite`,
              animationDirection: i%2===0 ? 'normal' : 'reverse',
            }} />
          ))}
          {/* Core dot */}
          <div style={{
            position: 'absolute', inset: '40%',
            borderRadius: '50%',
            background: 'var(--brand)',
            opacity: 0.5,
            animation: 'pulse-slow 1.8s ease-in-out infinite',
            boxShadow: '0 0 12px var(--brand)',
          }} />
        </div>
      </div>

      {/* ── Location info panel — appears above clicked markers ── */}
      {/* Intelligent connection to CTAs: shows division + scroll-to action */}
      {hotspot && (
        <div
          key={hotspot.id}
          style={{
            position: 'fixed',
            /* Clamp so the panel never renders past either screen edge on mobile */
            left: `clamp(130px, ${hotspot.screenX}px, calc(100vw - 130px))`,
            top:  `max(${hotspot.screenY}px, calc(var(--header-h) + 190px))`,
            transform: 'translate(-50%, calc(-100% - 20px))',
            zIndex: 60,
            pointerEvents: 'auto',
            animation: 'popIn 0.22s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          {/* Connector stem */}
          <div style={{
            position: 'absolute', bottom: -11, left: '50%', transform: 'translateX(-50%)',
            width: 1, height: 11,
            background: 'linear-gradient(to bottom, var(--brand-edge), transparent)',
          }} />
          {/* Panel */}
          <div style={{
            background: 'var(--panel-bg)',
            border: '1px solid var(--brand-edge)',
            borderRadius: 12,
            padding: '14px 18px 15px',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            boxShadow: 'var(--shadow-pop)',
            width: 'min(252px, calc(100vw - var(--gutter) * 2))',
            textAlign: 'center',
          }}>

            {/* Role badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 9 }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%', background: 'var(--brand)',
                flexShrink: 0, boxShadow: '0 0 9px var(--brand)',
                animation: 'pulse-slow 2.2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 8,
                letterSpacing: '0.30em', color: 'var(--brand-fg)',
                textTransform: 'uppercase',
              }}>
                {hotspot.role}
              </span>
            </div>

            {/* City name */}
            <div className="font-display" style={{
              fontSize: 21, color: 'var(--fg-strong)',
              lineHeight: 1.12, letterSpacing: '-0.022em', marginBottom: 3,
            }}>
              {hotspot.name}
            </div>

            {/* Country */}
            <div style={{
              fontSize: 11.5, color: 'var(--fg-muted)', letterSpacing: '0.02em', marginBottom: 11,
            }}>
              {hotspot.country}
            </div>

            {/* Division indicator */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'var(--brand-wash)',
              border: '1px solid var(--brand-edge)',
              borderRadius: 6, padding: '6px 10px', marginBottom: 11,
              justifyContent: 'center',
            }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 10, height: 10, flexShrink: 0 }}>
                <circle cx="8" cy="8" r="2.5" fill="var(--brand)" />
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3.5 3.5l1.5 1.5M11 11l1.5 1.5M3.5 12.5l1.5-1.5M11 5l1.5-1.5" stroke="var(--brand)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              </svg>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 8.5,
                color: 'var(--brand-fg)', letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                {hotspot.division}
              </span>
            </div>

            {/* CTA — scrolls to the relevant section */}
            <button
              onClick={() => {
                const el = document.getElementById(hotspot.sectionLink)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                width: '100%', padding: '8px 12px',
                background: 'var(--brand)', color: 'var(--fg-onbrand)',
                border: 'none', borderRadius: 7, cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontSize: 11.5, fontWeight: 700,
                letterSpacing: '0.03em', textTransform: 'uppercase',
                boxShadow: '0 2px 14px var(--brand-edge)',
                transition: 'background 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-bright)'; e.currentTarget.style.boxShadow = '0 2px 22px var(--brand-edge)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--brand)'; e.currentTarget.style.boxShadow = '0 2px 14px var(--brand-edge)' }}
            >
              {t('hero.exploreDivision')}
              <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" style={{ width: 10, height: 10 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>

            {/* Dismiss hint */}
            <button
              onClick={() => setHotspot(null)}
              aria-label="Close location panel"
              style={{
                position: 'absolute', top: 8, right: 10,
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--fg-subtle)', fontSize: 16, lineHeight: 1,
                padding: 2, transition: 'color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg-muted)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-subtle)' }}
            >
              ×
            </button>

          </div>
        </div>
      )}

      {/* ── Gradient overlays ── */}

      {/* Desktop: left-to-right dark fade — deep on left for text, fades on right */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'var(--hero-fade-x)',
        }}
      />
      {/* Desktop: subtle top/bottom vignette */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'var(--hero-vignette)',
        }}
      />

      {/* Mobile: heavy overlay for text readability over globe */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'var(--hero-fade-y)',
        }}
      />

      {/* ── Subtle dot grid — left portion only on desktop ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 2,
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--brand-wash) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'linear-gradient(90deg, black 0%, black 30%, transparent 55%)',
          WebkitMaskImage: 'linear-gradient(90deg, black 0%, black 30%, transparent 55%)',
        }}
      />

      {/* ── Main text content ── */}
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

      {/* ── Stats strip ── */}
      <div style={{
        background: 'var(--header-bg)',
        borderTop: '1px solid var(--line)',
        position: 'relative', zIndex: 10,
        backdropFilter: 'blur(20px)',
      }}>
        <div className="container-page">
          {/* Border classes per cell: handles 2-col (mobile) and 4-col (desktop) correctly */}
          {(() => {
            const cls = [
              'border-r border-b border-[var(--line)] md:border-b-0',
              'border-b border-[var(--line)] md:border-r md:border-b-0',
              'border-r border-[var(--line)]',
              '',
            ]
            return (
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map(({ icon, value, label, sub }, i) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 sm:gap-3.5 px-2 py-3.5 sm:px-4 sm:py-[18px] ${cls[i]}`}
              >
                <div
                  className="w-8 h-8 sm:w-[38px] sm:h-[38px] rounded-lg sm:rounded-[10px]"
                  style={{
                    background: 'rgba(200,150,42,0.1)',
                    border: '1px solid var(--brand-edge)',
                    color: 'var(--brand-fg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                  {icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    className="font-display text-[19px] sm:text-[23px]"
                    style={{ color: 'var(--fg-strong)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {value}
                  </div>
                  <div
                    className="text-[7.5px] tracking-[0.14em] sm:text-[8.5px] sm:tracking-[0.22em]"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      color: 'var(--brand-fg)', marginTop: 3,
                    }}>
                    {label}
                  </div>
                  {/* Sub-caption is noise at phone widths */}
                  <div className="hidden sm:block" style={{ fontSize: 10.5, color: 'var(--fg-subtle)', marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
            )
          })()}
        </div>
      </div>

      {/* ── Marquee ticker ── */}
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
    </section>
  )
}
