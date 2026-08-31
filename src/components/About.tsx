import { Link } from 'react-router-dom'

const BUILDING_IMG =
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=880&fit=crop&auto=format'

const values = [
  {
    title: 'Innovation',
    desc: 'Future-ready solutions driving progress.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Integrity',
    desc: 'Building trust through ethics and transparency.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Sustainability',
    desc: 'Responsible today for a better tomorrow.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    desc: 'Delivering quality that creates lasting value.',
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
      <circle cx="40" cy="40" r="38" stroke="#C8962A" strokeWidth="0.8" opacity="0.35" />
      <circle cx="40" cy="40" r="28" stroke="#C8962A" strokeWidth="0.6" opacity="0.25" />
      <circle cx="40" cy="40" r="18" stroke="#C8962A" strokeWidth="0.6" opacity="0.2" />
      <circle cx="40" cy="40" r="4" fill="#C8962A" opacity="0.5" />
      {/* Cardinal lines */}
      <line x1="40" y1="2" x2="40" y2="22" stroke="#C8962A" strokeWidth="1" opacity="0.4" />
      <line x1="40" y1="58" x2="40" y2="78" stroke="#C8962A" strokeWidth="1" opacity="0.4" />
      <line x1="2" y1="40" x2="22" y2="40" stroke="#C8962A" strokeWidth="1" opacity="0.4" />
      <line x1="58" y1="40" x2="78" y2="40" stroke="#C8962A" strokeWidth="1" opacity="0.4" />
      {/* Diagonal tick marks */}
      <line x1="12" y1="12" x2="18" y2="18" stroke="#C8962A" strokeWidth="0.6" opacity="0.25" />
      <line x1="62" y1="12" x2="68" y2="18" stroke="#C8962A" strokeWidth="0.6" opacity="0.25" />
      <line x1="12" y1="68" x2="18" y2="62" stroke="#C8962A" strokeWidth="0.6" opacity="0.25" />
      <line x1="62" y1="68" x2="68" y2="62" stroke="#C8962A" strokeWidth="0.6" opacity="0.25" />
    </svg>
  )
}

export default function About() {
  return (
    <section
      id="about"
      style={{ background: '#04080E', borderTop: '1px solid rgba(255,255,255,0.04)' }}
      className="py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.15fr_300px] gap-8 xl:gap-12 items-stretch">

          {/* ── Left: Statement ── */}
          <div className="flex flex-col justify-center">
            <div className="mb-5 opacity-70">
              <CompassIcon />
            </div>
            <h2 className="font-display" style={{
              fontSize: 'clamp(22px, 3vw, 34px)',
              color: '#FFFFFF',
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              marginBottom: 14,
            }}>
              Building Businesses.
              <br />
              Connecting Markets.
              <br />
              <em style={{ color: '#C8962A' }}>Creating the Future.</em>
            </h2>
            <p style={{
              color: 'rgba(148,163,184,0.68)',
              fontSize: 13,
              lineHeight: 1.72,
              maxWidth: 320,
              marginBottom: 20,
            }}>
              Network71 is committed to innovation, sustainability and creating lasting impact
              worldwide — connecting markets through one unified enterprise.
            </p>
            <Link
              to="/about"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, fontWeight: 600, color: '#C8962A',
                textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.75' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Learn More About Us
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* ── Centre: 4 values in 2×2 grid ── */}
          <div className="grid grid-cols-2 gap-3 content-center">
            {values.map(({ title, desc, icon }) => (
              <div
                key={title}
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                  padding: '18px 16px',
                }}
              >
                <div style={{
                  color: '#C8962A',
                  marginBottom: 10,
                  width: 34, height: 34,
                  background: 'rgba(200,150,42,0.1)',
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {icon}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: 11, color: 'rgba(100,116,139,0.8)', lineHeight: 1.55 }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* ── Right: Building photo + CTA ── */}
          <div style={{
            borderRadius: 14, overflow: 'hidden',
            position: 'relative',
            minHeight: 320,
          }}>
            <img
              src={BUILDING_IMG}
              alt="Network71 corporate headquarters"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(4,8,14,0.92) 0%, rgba(4,8,14,0.4) 50%, rgba(4,8,14,0.1) 100%)',
            }} />
            {/* Small Network71 brand mark on image */}
            <div style={{
              position: 'absolute', top: 16, left: 16,
              background: 'rgba(4,8,14,0.7)',
              borderRadius: 6,
              padding: '5px 10px',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 9,
                color: 'rgba(200,150,42,0.8)', letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>
                Network71
              </span>
            </div>
            {/* CTA button */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 18px' }}>
              <Link
                to="/contact"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 18px', borderRadius: 8,
                  background: '#C8962A', color: '#04080E',
                  fontSize: 13, fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E6B840' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C8962A' }}
              >
                Partner With Us
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
