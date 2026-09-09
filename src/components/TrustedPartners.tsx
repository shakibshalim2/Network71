import { Link } from 'react-router-dom'

const BRANDS = [
  { name: 'EZYIFY',         sub: 'Social Commerce',          color: 'var(--accent-purple)', href: '/ezyify',    font: "'Playfair Display', serif" },
  { name: 'N71 MEDIA',      sub: 'Broadcasting & News',      color: 'var(--accent-cyan)', href: '/divisions/media', font: 'var(--font-sans)' },
  { name: 'eSHIPe',         sub: 'Maritime Marketplace',     color: 'var(--accent-blue)', href: '/divisions/eshipe', font: 'var(--font-sans)' },
  { name: 'N71 GARMENTS',   sub: 'Apparel Manufacturing',    color: 'var(--accent-pink)', href: '/divisions/garments', font: 'var(--font-sans)' },
  { name: 'N71 AGRO',       sub: 'Agricultural Products',    color: 'var(--accent-green)', href: '/divisions/agriculture', font: 'var(--font-sans)' },
  { name: 'N71 FOODS',      sub: 'Food & Beverage',          color: 'var(--accent-orange)', href: '/divisions/food-beverage', font: 'var(--font-sans)' },
  { name: 'N71 ENERGY',     sub: 'Oils & Renewables',        color: 'var(--accent-amber)', href: '/divisions/oils-energy', font: 'var(--font-sans)' },
  { name: 'N71 TECH',       sub: 'IT & Digital Services',    color: 'var(--accent-teal)', href: '/divisions/it-software', font: 'var(--font-sans)' },
  { name: 'N71 TRADING',    sub: 'Global Trade',             color: 'var(--brand-fg)', href: '/divisions/global-trading', font: 'var(--font-sans)' },
]

const doubled = [...BRANDS, ...BRANDS]

function BrandMark({ name, sub, color, href, font }: typeof BRANDS[number]) {
  return (
    <Link
      to={href}
      className="px-5 sm:px-8"
      style={{
        display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        paddingTop: 8, paddingBottom: 8, flexShrink: 0, textDecoration: 'none', gap: 3,
        transition: 'all 0.22s',
      }}
      onMouseEnter={e => {
        const nameEl = e.currentTarget.querySelector<HTMLElement>('.brand-name')
        const subEl = e.currentTarget.querySelector<HTMLElement>('.brand-sub')
        if (nameEl) nameEl.style.color = color
        if (subEl) subEl.style.color = `color-mix(in srgb, ${color} 50%, transparent)`
      }}
      onMouseLeave={e => {
        const nameEl = e.currentTarget.querySelector<HTMLElement>('.brand-name')
        const subEl = e.currentTarget.querySelector<HTMLElement>('.brand-sub')
        if (nameEl) nameEl.style.color = 'var(--fg-muted)'
        if (subEl) subEl.style.color = 'var(--fg-subtle)'
      }}
    >
      <span
        className={`brand-name ${name === 'EZYIFY' ? 'text-[16px] sm:text-[18px]' : 'text-[13.5px] sm:text-[15px]'}`}
        style={{
          fontFamily: font,
          fontWeight: 800,
          letterSpacing: name === 'EZYIFY' ? '-0.01em' : '0.08em',
          color: 'var(--fg-muted)',
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
          color: 'var(--fg-subtle)',
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
      style={{ background: 'var(--s0)', borderTop: '1px solid var(--line)' }}
      className="py-10 sm:py-14"
    >
      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 mb-7 sm:mb-8">
        <div className="hidden min-[420px]:block" style={{ height: 1, flex: 1, maxWidth: 80, background: 'rgba(200,150,42,0.1)' }} />
        <div style={{ textAlign: 'center' }}>
          <div
            className="text-[7.5px] tracking-[0.22em] sm:text-[8.5px] sm:tracking-[0.35em]"
            style={{
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              color: 'var(--fg-subtle)', marginBottom: 4,
            }}>
            The Network71 Ecosystem
          </div>
          <div
            className="text-[11px] sm:text-[12px]"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--fg-muted)', letterSpacing: '0.08em',
            }}>
            Our Businesses &amp; Brands
          </div>
        </div>
        <div className="hidden min-[420px]:block" style={{ height: 1, flex: 1, maxWidth: 80, background: 'rgba(200,150,42,0.1)' }} />
      </div>

      {/* Marquee */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Fade edges — narrow on phones so logos stay visible */}
        <div className="w-10 sm:w-20 lg:w-[120px]" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 2, background: 'linear-gradient(to right, var(--s0) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div className="w-10 sm:w-20 lg:w-[120px]" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 2, background: 'linear-gradient(to left, var(--s0) 0%, transparent 100%)', pointerEvents: 'none' }} />

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
      <div className="flex items-center justify-center gap-2 mt-5 sm:mt-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ width: i === 2 ? 16 : 4, height: 1, background: 'var(--brand-edge)', borderRadius: 1 }} />
        ))}
      </div>
    </section>
  )
}
