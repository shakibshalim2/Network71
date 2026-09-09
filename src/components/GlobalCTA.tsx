import { Link } from 'react-router-dom'

const InvestIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)
const TeamIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
)
const GlobeIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
)

const cards = [
  {
    Icon: InvestIcon,
    title: 'Invest With Us',
    desc: 'Access investment opportunities across our diversified industrial portfolio spanning eight high-growth sectors globally.',
    cta: 'Investor Relations',
    href: '/investors',
    accent: 'var(--brand)',
  },
  {
    Icon: TeamIcon,
    title: 'Join Our Team',
    desc: 'Build your career with a growing multinational enterprise. We welcome ambitious talent from every corner of the world.',
    cta: 'View Careers',
    href: '/careers',
    accent: 'var(--accent-cyan)',
  },
  {
    Icon: GlobeIcon,
    title: 'Partner With Us',
    desc: 'Explore strategic joint ventures, supply-chain partnerships, and global trade collaboration across our network.',
    cta: 'Global Partnerships',
    href: '/contact',
    accent: 'var(--accent-teal)',
  },
]

export default function GlobalCTA() {
  return (
    <section
      className="section-y force-dark"
      style={{ background: 'var(--s1)', position: 'relative', overflow: 'hidden' }}>
      {/* Cinematic background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'var(--cta-img-dim)', transform: 'scale(1.02)' }}
        />
        {/* Scrim keeps the headline legible over the photo in both themes */}
        <div style={{ position: 'absolute', inset: 0, background: 'var(--cta-scrim)' }} />
        {/* Subtle gold vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, var(--brand-wash) 0%, transparent 70%)' }} />
      </div>
      <div className="relative container-page" style={{ zIndex: 1 }}>

        {/* Header */}
        <div className="text-center mb-9 sm:mb-14">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            <div className="h-px w-6 sm:w-10" style={{ background: 'var(--brand-edge)' }} />
            <span className="font-mono text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em] font-semibold uppercase" style={{ color: 'var(--brand-fg)' }}>
              Work With Network71
            </span>
            <div className="h-px w-6 sm:w-10" style={{ background: 'var(--brand-edge)' }} />
          </div>
          <h2
            className="font-display tracking-[-0.02em] mb-3 sm:mb-4"
            style={{ fontSize: 'clamp(26px, 6vw, 48px)', lineHeight: 1.14, color: 'var(--fg-strong)' }}>
            Connect With Our Ecosystem
          </h2>
          <p className="max-w-lg mx-auto text-[14px] sm:text-[15px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            Whether you&apos;re an investor, a talented professional, or a potential global partner — there&apos;s a place for you in the Network71 family.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {cards.map(({ Icon, title, desc, cta, href, accent }) => (
            <Link
              key={title}
              to={href}
              className="group block p-6 sm:p-7 lg:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'var(--glass)', border: '1px solid var(--line-strong)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `color-mix(in srgb, ${accent} 21%, transparent)`; e.currentTarget.style.background = 'var(--s3)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.background = 'var(--glass)' }}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-colors duration-300"
                style={{ background: `color-mix(in srgb, ${accent} 8%, transparent)`, color: accent }}>
                <Icon />
              </div>
              <h3 className="font-display text-xl sm:text-2xl mb-2.5 sm:mb-3" style={{ color: 'var(--fg-strong)' }}>{title}</h3>
              <p className="text-[13px] sm:text-sm leading-relaxed mb-4 sm:mb-6" style={{ color: 'var(--fg-subtle)' }}>{desc}</p>
              <span className="flex items-center gap-2 text-[13px] sm:text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                style={{ color: accent }}>
                {cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Contact line */}
        <div className="mt-9 pt-8 sm:mt-12 sm:pt-10 text-center" style={{ borderTop: '1px solid var(--line)' }}>
          <p className="font-mono text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--fg-faint)' }}>Direct inquiries</p>
          <a href="mailto:info@network71.com"
            className="font-semibold text-base sm:text-lg wrap-anywhere transition-colors duration-150" style={{ color: 'var(--brand-fg)' }}>
            info@network71.com
          </a>
        </div>
      </div>
    </section>
  )
}
