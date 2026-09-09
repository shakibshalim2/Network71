import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Divisions from '@/components/Divisions'
import Ezyify from '@/components/Ezyify'
import Innovation from '@/components/Innovation'
import MediaAndMarketplace from '@/components/MediaAndMarketplace'
import TrustedPartners from '@/components/TrustedPartners'
import Stats from '@/components/Stats'
import GlobalCTA from '@/components/GlobalCTA'
import Footer from '@/components/Footer'

// ─── Global Presence teaser ───────────────────────────────────────────────────

const REGIONS = [
  { name: 'South Asia',      markets: ['Bangladesh', 'India', 'Sri Lanka'],        color: 'var(--brand-fg)',  note: 'HQ & origin market',     icon: 'SAS' },
  { name: 'Middle East',     markets: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait'],  color: 'var(--accent-cyan)',  note: 'Trade & logistics hub',   icon: 'ME' },
  { name: 'Southeast Asia',  markets: ['Malaysia', 'Singapore', 'Thailand'],       color: 'var(--accent-teal)',  note: 'Manufacturing & finance', icon: 'SEA' },
  { name: 'Europe',          markets: ['UK', 'Germany', 'France', 'Netherlands'],  color: 'var(--brand-fg)',  note: 'Retail & distribution',   icon: 'EU' },
  { name: 'Africa',          markets: ['Nigeria', 'Kenya', 'Ethiopia', 'Ghana'],   color: 'var(--accent-cyan)',  note: 'Emerging markets',        icon: 'AFR' },
  { name: 'The Americas',    markets: ['USA', 'Canada', 'Brazil'],                 color: 'var(--accent-teal)',  note: 'Export & import',         icon: 'AME' },
]

function GlobalPresenceTeaser() {
  return (
    <section style={{ background: 'var(--s1)', borderTop: '1px solid var(--line)' }} className="section-y">
      <div className="container-page">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-end mb-9 sm:mb-14">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(14px, 3vw, 22px)' }}>
              <div style={{ height: 1, width: 32, background: 'var(--brand-edge)', flexShrink: 0 }} />
              <span
                className="text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em]"
                style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--brand-fg)' }}>
                Global Presence
              </span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(27px, 6vw, 50px)', color: 'var(--fg-strong)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Operating Across
              <br />
              <em style={{ color: 'var(--brand-fg)' }}>25+ Countries.</em>
            </h2>
          </div>
          <div>
            <p className="text-[14px] sm:text-[15px]" style={{ color: 'var(--fg-muted)', lineHeight: 1.75, maxWidth: 420, marginBottom: 22 }}>
              Active trade operations and strategic partnerships across six major regions — connecting global markets through one unified enterprise.
            </p>
            <Link
              to="/global-presence"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                border: '1px solid var(--brand-edge)', color: 'var(--brand-fg)',
                textDecoration: 'none', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-wash)'; e.currentTarget.style.borderColor = 'var(--brand-edge)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--brand-edge)' }}
            >
              View Global Presence
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Region cards */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
          {REGIONS.map(({ name, markets, color, note, icon }) => (
            <div
              key={name}
              className="p-4 sm:p-[18px_20px]"
              style={{
                background: 'var(--fill-1)',
                border: '1px solid var(--line)',
                borderRadius: 14,
                transition: 'all 0.2s', cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `color-mix(in srgb, ${color} 19%, transparent)`; e.currentTarget.style.background = 'rgba(255,255,255,0.036)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--fill-1)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7, fontSize: 8.5, flexShrink: 0,
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', fontWeight: 700,
                  background: `color-mix(in srgb, ${color} 9%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 19%, transparent)`,
                  color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {icon}
                </div>
                {/* Note is allowed to wrap rather than overflow the card */}
                <span
                  className="text-[7px] tracking-[0.08em] sm:text-[8px] sm:tracking-[0.14em] text-right"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)', textTransform: 'uppercase', lineHeight: 1.35, minWidth: 0 }}>
                  {note}
                </span>
              </div>
              <div className="text-[13.5px] sm:text-[14px]" style={{ fontWeight: 700, color: 'var(--fg)', marginBottom: 8, letterSpacing: '-0.01em' }}>{name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px' }}>
                {markets.map(m => (
                  <span key={m} style={{ fontSize: 10.5, color: 'var(--fg-subtle)' }}>{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <div className="grid grid-cols-3 gap-px mt-6" style={{ background: 'var(--line)', borderRadius: 12, overflow: 'hidden' }}>
          {[
            { val: '25+', label: 'Countries', color: 'var(--brand-fg)' },
            { val: '6',   label: 'Regions',   color: 'var(--accent-cyan)' },
            { val: '8',   label: 'Divisions', color: 'var(--accent-teal)' },
          ].map(({ val, label, color }) => (
            <div key={label} className="py-4 sm:py-[18px] text-center" style={{ background: 'var(--s1)' }}>
              <div className="font-display text-[22px] sm:text-[26px]" style={{ color, letterSpacing: '-0.02em', lineHeight: 1 }}>{val}</div>
              <div
                className="text-[8px] tracking-[0.14em] sm:text-[9px] sm:tracking-[0.22em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Leadership teaser ────────────────────────────────────────────────────────

const LEADERSHIP_IMG = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop&auto=format'

function LeadershipTeaser() {
  return (
    <section style={{ background: 'var(--s1)', borderTop: '1px solid var(--line)' }} className="section-y">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Image */}
          <div className="rounded-xl sm:rounded-[18px]" style={{ overflow: 'hidden', position: 'relative', aspectRatio: '16/10' }}>
            <img
              src={LEADERSHIP_IMG}
              alt="Network71 leadership team in strategic discussion"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,8,14,0.55) 0%, transparent 60%)' }} />

            {/* Founder tag */}
            <div
              className="top-3 left-3 px-3 py-2 sm:top-5 sm:left-5 sm:px-3.5 sm:py-2.5"
              style={{
                position: 'absolute',
                background: 'var(--glass)', border: '1px solid var(--brand-edge)',
                borderRadius: 9, backdropFilter: 'blur(14px)', maxWidth: 'calc(100% - 24px)',
              }}>
              <div
                className="text-[7.5px] tracking-[0.16em] sm:text-[8.5px] sm:tracking-[0.24em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-fg)', textTransform: 'uppercase', marginBottom: 3 }}>Founder &amp; CEO</div>
              <div className="text-[12px] sm:text-[13px]" style={{ fontWeight: 700, color: 'var(--fg)' }}>Tanjijur Rahman Topon</div>
            </div>

            {/* Decorative corner accent */}
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '40%', height: '40%',
              background: 'linear-gradient(135deg, transparent 0%, var(--brand-wash) 100%)',
              borderTop: '1px solid var(--brand-wash)',
              borderLeft: '1px solid var(--brand-wash)',
            }} />
          </div>

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
              Full leadership profiles and governance details are available in our dedicated
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
    stat: '40%', statLabel: 'Carbon reduction target',
  },
  {
    letter: 'S', label: 'Social', color: 'var(--accent-cyan)',
    img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=320&fit=crop&auto=format',
    imgAlt: 'Sustainable agriculture and farming community landscapes',
    desc: 'Fair labour practices, community investment, and workforce development in every market we operate.',
    stat: '12K+', statLabel: 'Farmers supported',
  },
  {
    letter: 'G', label: 'Governance', color: 'var(--brand-fg)',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=320&fit=crop&auto=format',
    imgAlt: 'Corporate governance and professional business environment',
    desc: 'Transparent corporate governance, ethical business practices, and robust accountability frameworks.',
    stat: '100%', statLabel: 'Policy-compliant divisions',
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
      <main>
        <Hero />
        <Ezyify />
        <TrustedPartners />
        <Divisions />
        <MediaAndMarketplace />
        <GlobalPresenceTeaser />
        <Stats />
        <About />
        <LeadershipTeaser />
        <Innovation />
        <SustainabilityTeaser />
        <GlobalCTA />
      </main>
      <Footer />
    </div>
  )
}
