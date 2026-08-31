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
    accent: '#C8962A',
  },
  {
    Icon: TeamIcon,
    title: 'Join Our Team',
    desc: 'Build your career with a growing multinational enterprise. We welcome ambitious talent from every corner of the world.',
    cta: 'View Careers',
    href: '/careers',
    accent: '#22D3EE',
  },
  {
    Icon: GlobeIcon,
    title: 'Partner With Us',
    desc: 'Explore strategic joint ventures, supply-chain partnerships, and global trade collaboration across our network.',
    cta: 'Global Partnerships',
    href: '/contact',
    accent: '#0D9488',
  },
]

export default function GlobalCTA() {
  return (
    <section style={{ background: '#06101E', position: 'relative', overflow: 'hidden' }} className="py-24">
      {/* Cinematic background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.28) saturate(0.6)', transform: 'scale(1.02)' }}
        />
        {/* Dark gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,16,30,0.65) 0%, rgba(6,16,30,0.82) 40%, rgba(6,16,30,0.96) 100%)' }} />
        {/* Subtle gold vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(200,150,42,0.06) 0%, transparent 70%)' }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8" style={{ zIndex: 1 }}>

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: 'rgba(200,150,42,0.3)' }} />
            <span className="font-mono text-[9px] font-semibold tracking-[0.35em] uppercase" style={{ color: 'rgba(200,150,42,0.6)' }}>
              Work With Network71
            </span>
            <div className="h-px w-10" style={{ background: 'rgba(200,150,42,0.3)' }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white tracking-[-0.02em] mb-4">
            Connect With Our Ecosystem
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-[15px] leading-relaxed">
            Whether you&apos;re an investor, a talented professional, or a potential global partner — there&apos;s a place for you in the Network71 family.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map(({ Icon, title, desc, cta, href, accent }) => (
            <Link
              key={title}
              to={href}
              className="group block p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(9,17,31,0.72)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}35`; e.currentTarget.style.background = 'rgba(9,17,31,0.85)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(9,17,31,0.72)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                style={{ background: `${accent}15`, color: accent }}>
                <Icon />
              </div>
              <h3 className="font-display text-2xl text-white mb-3">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
              <span className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
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
        <div className="mt-12 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-slate-600 mb-3">Direct inquiries</p>
          <a href="mailto:info@network71.com"
            className="font-semibold text-lg hover:text-gold transition-colors duration-150" style={{ color: '#C8962A' }}>
            info@network71.com
          </a>
        </div>
      </div>
    </section>
  )
}
