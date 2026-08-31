import { Link } from 'react-router-dom'

const BRANDS = [
  { name: 'EZYIFY',         sub: 'Social Commerce',          color: '#A855F7', href: '/ezyify',    font: "'Playfair Display', serif" },
  { name: 'N71 MEDIA',      sub: 'Broadcasting & News',      color: '#22D3EE', href: '/divisions', font: 'var(--font-sans)' },
  { name: 'eSHIPe',         sub: 'Maritime Marketplace',     color: '#3B82F6', href: '/divisions', font: 'var(--font-sans)' },
  { name: 'N71 GARMENTS',   sub: 'Apparel Manufacturing',    color: '#EC4899', href: '/divisions', font: 'var(--font-sans)' },
  { name: 'N71 AGRO',       sub: 'Agricultural Products',    color: '#22C55E', href: '/divisions', font: 'var(--font-sans)' },
  { name: 'N71 FOODS',      sub: 'Food & Beverage',          color: '#F97316', href: '/divisions', font: 'var(--font-sans)' },
  { name: 'N71 ENERGY',     sub: 'Oils & Renewables',        color: '#F59E0B', href: '/divisions', font: 'var(--font-sans)' },
  { name: 'N71 TECH',       sub: 'IT & Digital Services',    color: '#0D9488', href: '/divisions', font: 'var(--font-sans)' },
  { name: 'N71 TRADING',    sub: 'Global Trade',             color: '#C8962A', href: '/divisions', font: 'var(--font-sans)' },
]

const doubled = [...BRANDS, ...BRANDS]

function BrandMark({ name, sub, color, href, font }: typeof BRANDS[number]) {
  return (
    <Link
      to={href}
      style={{
        display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '8px 32px', flexShrink: 0, textDecoration: 'none', gap: 3,
        transition: 'all 0.22s',
      }}
      onMouseEnter={e => {
        const nameEl = e.currentTarget.querySelector<HTMLElement>('.brand-name')
        const subEl = e.currentTarget.querySelector<HTMLElement>('.brand-sub')
        if (nameEl) nameEl.style.color = color
        if (subEl) subEl.style.color = `${color}80`
      }}
      onMouseLeave={e => {
        const nameEl = e.currentTarget.querySelector<HTMLElement>('.brand-name')
        const subEl = e.currentTarget.querySelector<HTMLElement>('.brand-sub')
        if (nameEl) nameEl.style.color = 'rgba(148,163,184,0.25)'
        if (subEl) subEl.style.color = 'rgba(100,116,139,0.18)'
      }}
    >
      <span
        className="brand-name"
        style={{
          fontFamily: font,
          fontSize: name === 'EZYIFY' ? 18 : 15,
          fontWeight: 800,
          letterSpacing: name === 'EZYIFY' ? '-0.01em' : '0.08em',
          color: 'rgba(148,163,184,0.25)',
          whiteSpace: 'nowrap',
          textTransform: name === 'eSHIPe' ? 'none' : 'uppercase',
          transition: 'color 0.22s',
          lineHeight: 1.1,
        }}
      >
        {name}
      </span>
      <span
        className="brand-sub"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 7.5,
          letterSpacing: '0.18em',
          color: 'rgba(100,116,139,0.18)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          transition: 'color 0.22s',
        }}
      >
        {sub}
      </span>
    </Link>
  )
}

export default function TrustedPartners() {
  return (
    <section
      style={{ background: '#04080E', borderTop: '1px solid rgba(255,255,255,0.04)' }}
      className="py-14"
    >
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
        <div style={{ height: 1, flex: 1, maxWidth: 80, background: 'rgba(200,150,42,0.1)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 8.5,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: 'rgba(100,116,139,0.5)', marginBottom: 4,
          }}>
            The Network71 Ecosystem
          </div>
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 12,
            color: 'rgba(148,163,184,0.28)', letterSpacing: '0.08em',
          }}>
            Our Businesses &amp; Brands
          </div>
        </div>
        <div style={{ height: 1, flex: 1, maxWidth: 80, background: 'rgba(200,150,42,0.1)' }} />
      </div>

      {/* Marquee */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, background: 'linear-gradient(to right, #04080E 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, background: 'linear-gradient(to left, #04080E 0%, transparent 100%)', pointerEvents: 'none' }} />

        <div
          style={{ display: 'flex', animation: 'marquee 50s linear infinite', width: 'max-content' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
        >
          {doubled.map((brand, i) => (
            <BrandMark key={`${brand.name}-${i}`} {...brand} />
          ))}
        </div>
      </div>

      {/* Separator / divider dot */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24 }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ width: i === 2 ? 16 : 4, height: 1, background: 'rgba(200,150,42,0.15)', borderRadius: 1 }} />
        ))}
      </div>
    </section>
  )
}
