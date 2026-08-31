import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Globe3D, { type HotspotData } from '@/components/Globe3D'

const TICKER = [
  'Garments & Apparel',
  'Agriculture & Agro Products',
  'Food & Beverage Manufacturing',
  'Oils & Energy',
  'IT & Software',
  'Global Trading & Imports',
  'Network71 Media',
  'eSHIPe Maritime Marketplace',
  'Ezyify Platform',
]

const STATS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    value: '25+', label: 'Countries', sub: 'Global Presence',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    value: '8', label: 'Business Divisions', sub: 'Diverse Sectors',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    value: '5,000+', label: 'Team Members', sub: 'Worldwide',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    value: '12K+', label: 'Partners & Clients', sub: 'Global Network',
  },
]

export default function Hero() {
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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#04080E',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* ── Interactive 3D Globe — single instance, positioned right on desktop ── */}
      {/* On lg+: right 65% of viewport (sphere center ≈ 68% from left).
          On mobile: full viewport with heavy gradient overlay for readability. */}
      <Globe3D
        className="absolute top-0 bottom-0 right-0 left-0 lg:left-[35%]"
        style={{ zIndex: 1 }}
        onHotspot={setHotspot}
        onReady={() => setGlobeReady(true)}
      />

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
            background: '#C8962A',
            opacity: 0.5,
            animation: 'pulse-slow 1.8s ease-in-out infinite',
            boxShadow: '0 0 12px #C8962A',
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
            left: hotspot.screenX,
            top:  hotspot.screenY,
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
            background: 'linear-gradient(to bottom, rgba(200,150,42,0.65), transparent)',
          }} />
          {/* Panel */}
          <div style={{
            background: 'rgba(4,8,16,0.96)',
            border: '1px solid rgba(200,150,42,0.32)',
            borderRadius: 12,
            padding: '14px 18px 15px',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            boxShadow: '0 12px 48px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(200,150,42,0.10)',
            minWidth: 200, maxWidth: 252,
            textAlign: 'center',
          }}>

            {/* Role badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 9 }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%', background: '#C8962A',
                flexShrink: 0, boxShadow: '0 0 9px #C8962A',
                animation: 'pulse-slow 2.2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 8,
                letterSpacing: '0.30em', color: 'rgba(200,150,42,0.70)',
                textTransform: 'uppercase',
              }}>
                {hotspot.role}
              </span>
            </div>

            {/* City name */}
            <div className="font-display" style={{
              fontSize: 21, color: '#FFFFFF',
              lineHeight: 1.12, letterSpacing: '-0.022em', marginBottom: 3,
            }}>
              {hotspot.name}
            </div>

            {/* Country */}
            <div style={{
              fontSize: 11.5, color: 'rgba(148,163,184,0.58)', letterSpacing: '0.02em', marginBottom: 11,
            }}>
              {hotspot.country}
            </div>

            {/* Division indicator */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'rgba(200,150,42,0.08)',
              border: '1px solid rgba(200,150,42,0.15)',
              borderRadius: 6, padding: '6px 10px', marginBottom: 11,
              justifyContent: 'center',
            }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 10, height: 10, flexShrink: 0 }}>
                <circle cx="8" cy="8" r="2.5" fill="#C8962A" />
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="#C8962A" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3.5 3.5l1.5 1.5M11 11l1.5 1.5M3.5 12.5l1.5-1.5M11 5l1.5-1.5" stroke="#C8962A" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              </svg>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 8.5,
                color: 'rgba(200,150,42,0.80)', letterSpacing: '0.12em', textTransform: 'uppercase',
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
                background: '#C8962A', color: '#04080E',
                border: 'none', borderRadius: 7, cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontSize: 11.5, fontWeight: 700,
                letterSpacing: '0.03em', textTransform: 'uppercase',
                boxShadow: '0 2px 14px rgba(200,150,42,0.30)',
                transition: 'background 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E0A82E'; e.currentTarget.style.boxShadow = '0 2px 22px rgba(200,150,42,0.50)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C8962A'; e.currentTarget.style.boxShadow = '0 2px 14px rgba(200,150,42,0.30)' }}
            >
              Explore Division
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
                color: 'rgba(100,116,139,0.5)', fontSize: 16, lineHeight: 1,
                padding: 2, transition: 'color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(148,163,184,0.9)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(100,116,139,0.5)' }}
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
          background: 'linear-gradient(90deg, #04080E 0%, #04080E 30%, rgba(4,8,14,0.96) 42%, rgba(4,8,14,0.78) 55%, rgba(4,8,14,0.32) 72%, rgba(4,8,14,0.08) 88%, transparent 100%)',
        }}
      />
      {/* Desktop: subtle top/bottom vignette */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'linear-gradient(180deg, rgba(4,8,14,0.55) 0%, transparent 18%, transparent 78%, rgba(4,8,14,0.65) 100%)',
        }}
      />

      {/* Mobile: heavy overlay for text readability over globe */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'linear-gradient(180deg, rgba(4,8,14,0.97) 0%, rgba(4,8,14,0.93) 55%, rgba(4,8,14,0.75) 80%, rgba(4,8,14,0.55) 100%)',
        }}
      />

      {/* ── Subtle dot grid — left portion only on desktop ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 2,
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(200,150,42,0.07) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'linear-gradient(90deg, black 0%, black 30%, transparent 55%)',
          WebkitMaskImage: 'linear-gradient(90deg, black 0%, black 30%, transparent 55%)',
        }}
      />

      {/* ── Main text content ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full" style={{ paddingTop: 120, paddingBottom: 52 }}>
          <div style={{ maxWidth: 560 }}>

            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30 }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: '#C8962A',
                animation: 'pulse-slow 2.8s ease-in-out infinite', flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 9,
                letterSpacing: '0.38em', color: 'rgba(200,150,42,0.72)',
                textTransform: 'uppercase',
              }}>
                Global Vision. Unified Impact.
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(40px, 6vw, 84px)',
                color: '#FFFFFF',
                lineHeight: 1.04,
                letterSpacing: '-0.03em',
                marginBottom: 22,
              }}
            >
              A Global Enterprise
              <br />
              <em style={{ color: '#C8962A' }}>Built for Tomorrow.</em>
            </h1>

            {/* Body */}
            <p style={{
              color: 'rgba(226,232,240,0.7)',
              fontSize: 16.5,
              lineHeight: 1.72,
              maxWidth: 460,
              marginBottom: 36,
            }}>
              Eight distinct business divisions. One unified purpose — driving industry, innovation,
              and sustainable growth across 25+ countries worldwide.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
              <button
                onClick={() => document.getElementById('divisions')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '14px 28px', fontSize: 13.5, fontWeight: 600, borderRadius: 8,
                  background: '#C8962A', color: '#04080E', border: 'none', cursor: 'pointer',
                  boxShadow: '0 0 44px rgba(200,150,42,0.3)',
                  transition: 'all 0.18s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#E0A82E'
                  e.currentTarget.style.boxShadow = '0 0 60px rgba(200,150,42,0.5)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#C8962A'
                  e.currentTarget.style.boxShadow = '0 0 44px rgba(200,150,42,0.3)'
                }}
              >
                Explore Our Divisions
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <Link
                to="/investors"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '14px 26px', fontSize: 13.5, fontWeight: 500, borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#F1F5F9',
                  textDecoration: 'none',
                  transition: 'all 0.18s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Investor Relations
              </Link>
            </div>

            {/* Interaction hints — desktop only */}
            <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 20, marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 13, height: 13, color: 'rgba(71,85,105,0.50)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225M13.684 16.6l2.224-2.51M6.228 15.228l-3.87-3.87a1.125 1.125 0 010-1.59L6.57 5.572m0 0l.943-.943M6.57 5.572L9.228 8.23" />
                </svg>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.26em', color: 'rgba(71,85,105,0.50)', textTransform: 'uppercase' }}>
                  Drag to rotate
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 13, height: 13, color: 'rgba(71,85,105,0.50)' }}>
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" d="M12 8v4l3 3" />
                </svg>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.26em', color: 'rgba(71,85,105,0.50)', textTransform: 'uppercase' }}>
                  Click markers
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                {['↑', '↓', '←', '→'].map(k => (
                  <span key={k} style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 14, height: 14, borderRadius: 3,
                    border: '1px solid rgba(71,85,105,0.30)',
                    fontSize: 8, color: 'rgba(71,85,105,0.50)',
                  }}>{k}</span>
                ))}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.26em', color: 'rgba(71,85,105,0.50)', textTransform: 'uppercase', marginLeft: 3 }}>
                  Keys
                </span>
              </div>
            </div>

            {/* Scroll indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 20, height: 32, borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.18)',
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
                letterSpacing: '0.3em', color: 'rgba(71,85,105,0.7)',
                textTransform: 'uppercase',
              }}>
                Scroll to Discover
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div style={{
        background: 'rgba(3,6,14,0.97)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative', zIndex: 10,
        backdropFilter: 'blur(20px)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Border classes per cell: handles 2-col (mobile) and 4-col (desktop) correctly */}
          {(() => {
            const cls = [
              'border-r border-b border-white/[0.05] md:border-b-0',
              'border-b border-white/[0.05] md:border-r md:border-b-0',
              'border-r border-white/[0.05]',
              '',
            ]
            return (
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map(({ icon, value, label, sub }, i) => (
              <div
                key={label}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 16px' }}
                className={cls[i]}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(200,150,42,0.1)',
                  border: '1px solid rgba(200,150,42,0.15)',
                  color: '#C8962A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {icon}
                </div>
                <div>
                  <div className="font-display" style={{ fontSize: 23, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 8.5,
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'rgba(200,150,42,0.62)', marginTop: 3,
                  }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 10.5, color: 'rgba(100,116,139,0.6)', marginTop: 2 }}>{sub}</div>
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
        background: '#020508',
        borderTop: '1px solid rgba(255,255,255,0.03)',
        padding: '10px 0',
        overflow: 'hidden',
        position: 'relative', zIndex: 10,
      }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 44s linear infinite' }}>
          {[...TICKER, ...TICKER, ...TICKER].map((name, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 16,
                padding: '0 24px',
                fontFamily: 'var(--font-mono)', fontSize: 9,
                letterSpacing: '0.32em', color: 'rgba(71,85,105,0.42)',
                textTransform: 'uppercase',
              }}
            >
              {name}
              <span style={{ display: 'inline-block', width: 3.5, height: 3.5, borderRadius: '50%', background: 'rgba(200,150,42,0.22)', flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
