import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '@/components/brand/Logo'

// ─── Footer columns ───────────────────────────────────────────────────────────

const COLUMNS = [
  {
    title: 'Network71',
    links: [
      { label: 'About Network71',  href: '/about' },
      { label: 'Our Story',        href: '/timeline' },
      { label: 'Leadership',       href: '/leadership' },
      { label: 'Global Presence',  href: '/global-presence' },
      { label: 'Sustainability / ESG', href: '/sustainability' },
      { label: 'Gallery',              href: '/gallery' },
      { label: 'Brand Identity',       href: '/brand' },
    ],
  },
  {
    title: 'Our Divisions',
    links: [
      { label: 'Ezyify Platform',     href: '/ezyify' },
      { label: 'Network71 Media',     href: '/divisions/media' },
      { label: 'eSHIPe Maritime',     href: '/divisions/eshipe' },
      { label: 'Garments & Apparel',  href: '/divisions/garments' },
      { label: 'Agriculture & Agro',  href: '/divisions/agriculture' },
      { label: 'Food & Beverage',     href: '/divisions/food-beverage' },
      { label: 'Oils & Energy',       href: '/divisions/oils-energy' },
      { label: 'IT & Digital',        href: '/divisions/it-software' },
      { label: 'Global Trading',      href: '/divisions/global-trading' },
    ],
  },
  {
    title: 'Business',
    links: [
      { label: 'Investor Relations',      href: '/investors' },
      { label: 'Corporate Governance',    href: '/governance' },
      { label: 'Partnerships',            href: '/contact' },
      { label: 'Careers',                 href: '/careers' },
      { label: 'Business Enquiries',      href: '/contact' },
      { label: 'Supplier Enquiries',      href: '/contact' },
    ],
  },
  {
    title: 'Media',
    links: [
      { label: 'Latest News',         href: '/press' },
      { label: 'Newspaper',           href: '/divisions/media' },
      { label: 'Television / TV',     href: '/divisions/media' },
      { label: 'Video',               href: '/divisions/media' },
      { label: 'Programs',            href: '/divisions/media' },
      { label: 'Media Partnerships',  href: '/contact' },
    ],
  },
  {
    title: 'Global',
    links: [
      { label: 'Global Presence',  href: '/global-presence' },
      { label: 'Our Regions',      href: '/global-presence' },
      { label: 'Countries',        href: '/global-presence' },
      { label: 'Contact Us',       href: '/contact' },
      { label: 'Legal',            href: '/legal' },
    ],
  },
]

const SOCIAL_PATHS: Record<string, string> = {
  linkedin:  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  twitter:   'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  facebook:  'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  youtube:   'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z',
}

const SOCIALS = ['linkedin', 'twitter', 'facebook', 'instagram', 'youtube'] as const

const LEGAL = [
  { label: 'Privacy Policy', href: '/legal' },
  { label: 'Terms of Use',   href: '/legal' },
  { label: 'Cookie Policy',  href: '/legal' },
  { label: 'Accessibility',  href: '/legal' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 style={{
        fontFamily: 'var(--font-mono)', fontSize: 8.5, fontWeight: 700,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: 'rgba(200,150,42,0.45)', marginBottom: 20,
      }}>
        {title}
      </h4>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link to={href} style={{
              fontSize: 12.5, lineHeight: 1.45,
              color: 'rgba(100,116,139,0.58)', textDecoration: 'none',
              transition: 'color 0.14s', display: 'inline-block',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(226,232,240,0.85)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(100,116,139,0.58)' }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer style={{ background: '#020810' }}>

      {/* ── Closing CTA section ────────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse, rgba(200,150,42,0.055) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 1360, margin: '0 auto', padding: '80px 28px 72px',
          textAlign: 'center', position: 'relative',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.36em',
            textTransform: 'uppercase', color: 'rgba(200,150,42,0.45)', marginBottom: 24,
          }}>
            Network71 Global Group
          </p>

          <h2 className="font-display" style={{
            fontSize: 'clamp(28px, 5vw, 56px)',
            lineHeight: 1.1, letterSpacing: '-0.025em',
            color: '#FFFFFF', marginBottom: 0,
          }}>
            Building Businesses.
            <br />
            <span style={{ color: '#C8962A' }}>Connecting Markets.</span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.55)' }}>Creating the Future.</span>
          </h2>

          <p style={{
            fontSize: 15, color: 'rgba(100,116,139,0.62)', lineHeight: 1.7,
            maxWidth: 480, margin: '24px auto 36px',
          }}>
            A diversified enterprise operating across eight industries in 25+ countries — built for scale, driven by purpose.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 9,
              background: '#C8962A', color: '#04080E',
              fontSize: 13.5, fontWeight: 700, textDecoration: 'none',
              transition: 'background 0.17s, box-shadow 0.17s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E6B840'; e.currentTarget.style.boxShadow = '0 0 28px rgba(200,150,42,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C8962A'; e.currentTarget.style.boxShadow = 'none' }}>
              Explore Our Divisions
              <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2"
                style={{ width: 12, height: 12 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 9,
              border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(203,213,225,0.8)',
              fontSize: 13.5, fontWeight: 600, textDecoration: 'none',
              background: 'transparent', transition: 'all 0.17s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(203,213,225,0.8)'; e.currentTarget.style.background = 'transparent' }}>
              Contact Network71
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '56px 28px 0' }}>
        <div
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr]"
          style={{ gap: '40px 32px', paddingBottom: 52, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {COLUMNS.map(col => (
            <Col key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
        <div style={{
          padding: '22px 0 28px',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          gap: '14px 28px', justifyContent: 'space-between',
        }}>

          {/* Logo + copyright */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <Link to="/" aria-label="Network71 Home" style={{ display: 'inline-flex', opacity: 0.55, transition: 'opacity 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.55' }}>
              <Logo variant="primary-dark" height={19} />
            </Link>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9.5,
              color: 'rgba(71,85,105,0.42)',
            }}>
              © {new Date().getFullYear()} Network71 Group. All rights reserved.
            </span>
          </div>

          {/* Legal links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 20px' }}>
            {LEGAL.map(({ label, href }) => (
              <Link key={label} to={href} style={{
                fontFamily: 'var(--font-mono)', fontSize: 9.5,
                color: 'rgba(71,85,105,0.4)', textDecoration: 'none', transition: 'color 0.14s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(100,116,139,0.72)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(71,85,105,0.4)' }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', gap: 6 }}>
            {SOCIALS.map(s => (
              <a key={s} href="#" aria-label={`Network71 on ${s}`} style={{
                width: 30, height: 30, borderRadius: 7, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(100,116,139,0.38)', transition: 'all 0.16s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(200,150,42,0.32)'
                  e.currentTarget.style.color = '#C8962A'
                  e.currentTarget.style.background = 'rgba(200,150,42,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.color = 'rgba(100,116,139,0.38)'
                  e.currentTarget.style.background = 'transparent'
                }}>
                <svg style={{ width: 11, height: 11 }} fill="currentColor" viewBox="0 0 24 24">
                  <path d={SOCIAL_PATHS[s]} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
