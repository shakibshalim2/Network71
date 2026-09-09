import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Divisions from '@/components/Divisions'
import Ezyify from '@/components/Ezyify'
import MediaAndMarketplace from '@/components/MediaAndMarketplace'
import TrustedPartners from '@/components/TrustedPartners'
import GlobalCTA from '@/components/GlobalCTA'
import Footer from '@/components/Footer'
import WorkShowcase, { WorkingTogether } from '@/components/WorkShowcase'

function LeadershipTeaser() {
  return (
    <section style={{ background: 'var(--s1)', borderTop: '1px solid var(--line)' }} className="section-y">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

          <div className="founder-card"><span className="public-eyebrow">THE PEOPLE BEHIND NETWORK71</span><div className="founder-monogram" aria-hidden="true">N71</div><h3>Tanjijur Rahman Topon</h3><p>Founder &amp; CEO</p><Link to="/leadership">Leadership &amp; responsibilities ↗</Link></div>

          {/* Text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(14px, 3vw, 22px)' }}>
              <div style={{ height: 1, width: 32, background: 'var(--brand-edge)', flexShrink: 0 }} />
              <span
                className="text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em]"
                style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--brand-fg)' }}>
                Leadership
              </span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(25px, 5.6vw, 44px)', color: 'var(--fg-strong)', lineHeight: 1.14, letterSpacing: '-0.025em', marginBottom: 16 }}>
              Guided by Vision.
              <br />
              <em style={{ color: 'var(--brand-fg)' }}>Driven by Integrity.</em>
            </h2>
            <p className="text-[14px] sm:text-[15px]" style={{ color: 'var(--fg-muted)', lineHeight: 1.75, maxWidth: 440, marginBottom: 12 }}>
              Network71 is led by an experienced leadership team committed to building long-term
              sustainable value across our global portfolio of businesses. Every decision is anchored
              in transparency, accountability, and ethical governance.
            </p>
            <p className="text-[13px] sm:text-[13.5px]" style={{ color: 'var(--fg-subtle)', lineHeight: 1.70, maxWidth: 440, marginBottom: 24 }}>
              Learn about our founder and the responsibilities behind our divisions in the
              leadership section.
            </p>

            {/* Attribute badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 24 }}>
              {['Ethical Governance', 'Strategic Vision', 'Long-term Value'].map((tag) => (
                <span
                  key={tag}
                  className="text-[9.5px] px-2.5 py-1 sm:text-[11px] sm:px-3 sm:py-[5px]"
                  style={{
                    display: 'inline-block',
                    borderRadius: 20, fontWeight: 500,
                    background: 'var(--brand-wash)', border: '1px solid var(--brand-edge)',
                    color: 'var(--brand-fg)', fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                  {tag}
                </span>
              ))}
            </div>

            <Link
              to="/leadership"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 26px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                border: '1px solid var(--brand-edge)', color: 'var(--brand-fg)',
                textDecoration: 'none', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-wash)'; e.currentTarget.style.borderColor = 'var(--brand-edge)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--brand-edge)' }}
            >
              Meet Our Leadership
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Sustainability teaser ────────────────────────────────────────────────────

const ESG_PILLARS = [
  {
    letter: 'E', label: 'Environmental', color: 'var(--accent-teal)',
    img: 'https://images.unsplash.com/photo-1466611653911-2b75f38f2cce?w=600&h=320&fit=crop&auto=format',
    imgAlt: 'Wind turbines generating renewable energy at sunset',
    desc: 'Carbon footprint reduction targets, sustainable sourcing, and responsible manufacturing across all divisions.',
    stat: 'Environment', statLabel: 'Responsible sourcing',
  },
  {
    letter: 'S', label: 'Social', color: 'var(--accent-cyan)',
    img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=320&fit=crop&auto=format',
    imgAlt: 'Sustainable agriculture and farming community landscapes',
    desc: 'Fair labour practices, community investment, and workforce development in every market we operate.',
    stat: 'People', statLabel: 'Fair working practices',
  },
  {
    letter: 'G', label: 'Governance', color: 'var(--brand-fg)',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=320&fit=crop&auto=format',
    imgAlt: 'Corporate governance and professional business environment',
    desc: 'Transparent corporate governance, ethical business practices, and robust accountability frameworks.',
    stat: 'Integrity', statLabel: 'Accountable decisions',
  },
]

function SustainabilityTeaser() {
  return (
    <section style={{ background: 'var(--s1)', borderTop: '1px solid var(--line)' }} className="section-y">
      <div className="container-page">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 lg:gap-10 mb-9 sm:mb-14">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(14px, 3vw, 22px)' }}>
              <div style={{ height: 1, width: 32, background: 'rgba(13,148,136,0.55)', flexShrink: 0 }} />
              <span
                className="text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em]"
                style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--accent-teal)' }}>
                Sustainability &amp; ESG
              </span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(27px, 6vw, 48px)', color: 'var(--fg-strong)', lineHeight: 1.12, letterSpacing: '-0.025em' }}>
              A Commitment to
              <br />
              <em style={{ color: 'var(--accent-teal)' }}>Responsible Growth.</em>
            </h2>
          </div>
          <div style={{ maxWidth: 400 }}>
            <p className="text-[14px] sm:text-[15px]" style={{ color: 'var(--fg-muted)', lineHeight: 1.75, marginBottom: 20 }}>
              Sustainability is embedded in our business strategy — from how we source raw materials
              to how we invest in the communities where we operate.
            </p>
            <Link
              to="/sustainability"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                border: '1px solid rgba(13,148,136,0.4)', color: 'var(--accent-teal)',
                textDecoration: 'none', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(13,148,136,0.08)'; e.currentTarget.style.borderColor = 'rgba(13,148,136,0.7)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(13,148,136,0.4)' }}
            >
              Our ESG Commitment
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {ESG_PILLARS.map(({ letter, label, desc, color, stat, statLabel, img, imgAlt }) => (
            <div
              key={label}
              style={{
                border: '1px solid var(--line)',
                borderRadius: 16, overflow: 'hidden',
                background: 'var(--fill-1)',
                transition: 'all 0.22s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `color-mix(in srgb, ${color} 19%, transparent)`; e.currentTarget.style.background = 'var(--fill-1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'rgba(255,255,255,0.018)' }}
            >
              {/* Image with overlay */}
              <div className="h-[140px] sm:h-[160px]" style={{ position: 'relative', overflow: 'hidden', background: '#0a1a10' }}>
                <img
                  src={img}
                  alt={imgAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45) saturate(0.75)', display: 'block', transition: 'filter 0.3s, transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.55) saturate(0.9)'; (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.45) saturate(0.75)'; (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                />
                {/* Color tint overlay */}
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, color-mix(in srgb, ${color} 3%, transparent) 0%, rgba(6,14,28,0.85) 100%)` }} />
                {/* ESG letter badge over image */}
                <div
                  className="bottom-3 left-4 w-10 h-10 sm:bottom-3.5 sm:left-[18px] sm:w-11 sm:h-11"
                  style={{ position: 'absolute', borderRadius: 12, background: `color-mix(in srgb, ${color} 9%, transparent)`, border: `1.5px solid color-mix(in srgb, ${color} 31%, transparent)`, backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="font-display text-[20px] sm:text-[22px]" style={{ fontWeight: 700, color }}>{letter}</span>
                </div>
                {/* Stat in top-right corner of image — capped so it can't collide with the badge */}
                <div className="top-3 right-3.5 max-w-[52%]" style={{ position: 'absolute', textAlign: 'right' }}>
                  <div className="font-display text-[20px] sm:text-[22px]" style={{ color, letterSpacing: '-0.02em', lineHeight: 1, textShadow: `0 0 20px color-mix(in srgb, ${color} 38%, transparent)` }}>{stat}</div>
                  <div
                    className="text-[7px] tracking-[0.1em] sm:text-[7.5px] sm:tracking-[0.15em]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginTop: 2, lineHeight: 1.4 }}>{statLabel}</div>
                </div>
              </div>

              {/* Text content */}
              <div className="p-4 pb-5 sm:p-[20px_22px_24px]">
                <div className="text-[14.5px] sm:text-[15px]" style={{ fontWeight: 700, color: 'var(--fg)', marginBottom: 8 }}>{label}</div>
                <div className="text-[12.5px] sm:text-[13px]" style={{ color: 'var(--fg-subtle)', lineHeight: 1.65 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Home page ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-full">
      <Header />
      <main className="public-content">
        <Hero />
        <WorkShowcase />
        <Divisions />
        <WorkingTogether />
        <About />
        <Ezyify />
        <TrustedPartners />
        <MediaAndMarketplace />
        <LeadershipTeaser />
        <SustainabilityTeaser />
        <GlobalCTA />
      </main>
      <Footer />
    </div>
  )
}
