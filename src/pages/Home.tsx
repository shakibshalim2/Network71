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
  { name: 'South Asia',      markets: ['Bangladesh', 'India', 'Sri Lanka'],        color: '#C8962A',  note: 'HQ & origin market',     icon: 'SAS' },
  { name: 'Middle East',     markets: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait'],  color: '#22D3EE',  note: 'Trade & logistics hub',   icon: 'ME' },
  { name: 'Southeast Asia',  markets: ['Malaysia', 'Singapore', 'Thailand'],       color: '#0D9488',  note: 'Manufacturing & finance', icon: 'SEA' },
  { name: 'Europe',          markets: ['UK', 'Germany', 'France', 'Netherlands'],  color: '#C8962A',  note: 'Retail & distribution',   icon: 'EU' },
  { name: 'Africa',          markets: ['Nigeria', 'Kenya', 'Ethiopia', 'Ghana'],   color: '#22D3EE',  note: 'Emerging markets',        icon: 'AFR' },
  { name: 'The Americas',    markets: ['USA', 'Canada', 'Brazil'],                 color: '#0D9488',  note: 'Export & import',         icon: 'AME' },
]

function GlobalPresenceTeaser() {
  return (
    <section style={{ background: '#040B18', borderTop: '1px solid rgba(255,255,255,0.04)' }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ height: 1, width: 32, background: 'rgba(200,150,42,0.45)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(200,150,42,0.65)' }}>
                Global Presence
              </span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(30px, 4vw, 50px)', color: '#FFFFFF', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Operating Across
              <br />
              <em style={{ color: '#C8962A' }}>25+ Countries.</em>
            </h2>
          </div>
          <div>
            <p style={{ color: 'rgba(148,163,184,0.72)', fontSize: 15, lineHeight: 1.75, maxWidth: 420, marginBottom: 24 }}>
              Active trade operations and strategic partnerships across six major regions — connecting global markets through one unified enterprise.
            </p>
            <Link
              to="/global-presence"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                border: '1px solid rgba(200,150,42,0.35)', color: '#C8962A',
                textDecoration: 'none', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,150,42,0.08)'; e.currentTarget.style.borderColor = 'rgba(200,150,42,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(200,150,42,0.35)' }}
            >
              View Global Presence
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Region cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {REGIONS.map(({ name, markets, color, note, icon }) => (
            <div
              key={name}
              style={{
                background: 'rgba(255,255,255,0.022)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: '20px 18px',
                transition: 'all 0.2s', cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.background = 'rgba(255,255,255,0.036)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.022)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7, fontSize: 8.5,
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', fontWeight: 700,
                  background: `${color}18`, border: `1px solid ${color}30`,
                  color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {icon}
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(100,116,139,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {note}
                </span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0', marginBottom: 8, letterSpacing: '-0.01em' }}>{name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px' }}>
                {markets.map(m => (
                  <span key={m} style={{ fontSize: 10.5, color: 'rgba(100,116,139,0.72)' }}>{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <div className="grid grid-cols-3 gap-px mt-6" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
          {[
            { val: '25+', label: 'Countries', color: '#C8962A' },
            { val: '6',   label: 'Regions',   color: '#22D3EE' },
            { val: '8',   label: 'Divisions', color: '#0D9488' },
          ].map(({ val, label, color }) => (
            <div key={label} style={{ background: 'rgba(4,11,24,0.95)', padding: '18px 0', textAlign: 'center' }}>
              <div className="font-display" style={{ fontSize: 26, color, letterSpacing: '-0.02em', lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(100,116,139,0.6)', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
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
    <section style={{ background: '#040B18', borderTop: '1px solid rgba(255,255,255,0.04)' }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Image */}
          <div style={{ borderRadius: 18, overflow: 'hidden', position: 'relative', aspectRatio: '16/10' }}>
            <img
              src={LEADERSHIP_IMG}
              alt="Network71 leadership team in strategic discussion"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,8,14,0.55) 0%, transparent 60%)' }} />

            {/* Founder tag */}
            <div style={{
              position: 'absolute', top: 20, left: 20,
              background: 'rgba(4,8,14,0.88)', border: '1px solid rgba(200,150,42,0.28)',
              borderRadius: 9, padding: '9px 14px', backdropFilter: 'blur(14px)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'rgba(200,150,42,0.72)', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 3 }}>Founder & CEO</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>Tanjijur Rahman Topon</div>
            </div>

            {/* Decorative corner accent */}
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '40%', height: '40%',
              background: 'linear-gradient(135deg, transparent 0%, rgba(200,150,42,0.06) 100%)',
              borderTop: '1px solid rgba(200,150,42,0.10)',
              borderLeft: '1px solid rgba(200,150,42,0.10)',
            }} />
          </div>

          {/* Text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ height: 1, width: 32, background: 'rgba(200,150,42,0.45)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(200,150,42,0.65)' }}>
                Leadership
              </span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#FFFFFF', lineHeight: 1.12, letterSpacing: '-0.025em', marginBottom: 18 }}>
              Guided by Vision.
              <br />
              <em style={{ color: '#C8962A' }}>Driven by Integrity.</em>
            </h2>
            <p style={{ color: 'rgba(148,163,184,0.72)', fontSize: 15, lineHeight: 1.75, maxWidth: 440, marginBottom: 12 }}>
              Network71 is led by an experienced leadership team committed to building long-term
              sustainable value across our global portfolio of businesses. Every decision is anchored
              in transparency, accountability, and ethical governance.
            </p>
            <p style={{ color: 'rgba(100,116,139,0.70)', fontSize: 13.5, lineHeight: 1.70, maxWidth: 440, marginBottom: 28 }}>
              Full leadership profiles and governance details are available in our dedicated
              leadership section.
            </p>

            {/* Attribute badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {['Ethical Governance', 'Strategic Vision', 'Long-term Value'].map((tag) => (
                <span key={tag} style={{
                  display: 'inline-block', padding: '5px 12px',
                  borderRadius: 20, fontSize: 11, fontWeight: 500,
                  background: 'rgba(200,150,42,0.07)', border: '1px solid rgba(200,150,42,0.18)',
                  color: 'rgba(200,150,42,0.75)', fontFamily: 'var(--font-mono)',
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
                border: '1px solid rgba(200,150,42,0.35)', color: '#C8962A',
                textDecoration: 'none', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,150,42,0.08)'; e.currentTarget.style.borderColor = 'rgba(200,150,42,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(200,150,42,0.35)' }}
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
    letter: 'E', label: 'Environmental', color: '#0D9488',
    img: 'https://images.unsplash.com/photo-1466611653911-2b75f38f2cce?w=600&h=320&fit=crop&auto=format',
    imgAlt: 'Wind turbines generating renewable energy at sunset',
    desc: 'Carbon footprint reduction targets, sustainable sourcing, and responsible manufacturing across all divisions.',
    stat: '40%', statLabel: 'Carbon reduction target',
  },
  {
    letter: 'S', label: 'Social', color: '#22D3EE',
    img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=320&fit=crop&auto=format',
    imgAlt: 'Sustainable agriculture and farming community landscapes',
    desc: 'Fair labour practices, community investment, and workforce development in every market we operate.',
    stat: '12K+', statLabel: 'Farmers supported',
  },
  {
    letter: 'G', label: 'Governance', color: '#C8962A',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=320&fit=crop&auto=format',
    imgAlt: 'Corporate governance and professional business environment',
    desc: 'Transparent corporate governance, ethical business practices, and robust accountability frameworks.',
    stat: '100%', statLabel: 'Policy-compliant divisions',
  },
]

function SustainabilityTeaser() {
  return (
    <section style={{ background: '#060E1C', borderTop: '1px solid rgba(255,255,255,0.04)' }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ height: 1, width: 32, background: 'rgba(13,148,136,0.55)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(13,148,136,0.75)' }}>
                Sustainability & ESG
              </span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(30px, 4vw, 48px)', color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              A Commitment to
              <br />
              <em style={{ color: '#0D9488' }}>Responsible Growth.</em>
            </h2>
          </div>
          <div style={{ maxWidth: 400 }}>
            <p style={{ color: 'rgba(148,163,184,0.72)', fontSize: 15, lineHeight: 1.75, marginBottom: 20 }}>
              Sustainability is embedded in our business strategy — from how we source raw materials
              to how we invest in the communities where we operate.
            </p>
            <Link
              to="/sustainability"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                border: '1px solid rgba(13,148,136,0.4)', color: '#0D9488',
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

        <div className="grid sm:grid-cols-3 gap-4">
          {ESG_PILLARS.map(({ letter, label, desc, color, stat, statLabel, img, imgAlt }) => (
            <div
              key={label}
              style={{
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16, overflow: 'hidden',
                background: 'rgba(255,255,255,0.018)',
                transition: 'all 0.22s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.018)' }}
            >
              {/* Image with overlay */}
              <div style={{ position: 'relative', height: 160, overflow: 'hidden', background: '#0a1a10' }}>
                <img
                  src={img}
                  alt={imgAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45) saturate(0.75)', display: 'block', transition: 'filter 0.3s, transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.55) saturate(0.9)'; (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.45) saturate(0.75)'; (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                />
                {/* Color tint overlay */}
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${color}08 0%, rgba(6,14,28,0.85) 100%)` }} />
                {/* ESG letter badge over image */}
                <div style={{ position: 'absolute', bottom: 14, left: 18, width: 44, height: 44, borderRadius: 12, background: `${color}18`, border: `1.5px solid ${color}50`, backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="font-display" style={{ fontSize: 22, fontWeight: 700, color }}>{letter}</span>
                </div>
                {/* Stat in top-right corner of image */}
                <div style={{ position: 'absolute', top: 12, right: 14, textAlign: 'right' }}>
                  <div className="font-display" style={{ fontSize: 22, color, letterSpacing: '-0.02em', lineHeight: 1, textShadow: `0 0 20px ${color}60` }}>{stat}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>{statLabel}</div>
                </div>
              </div>

              {/* Text content */}
              <div style={{ padding: '20px 22px 24px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#E2E8F0', marginBottom: 8 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'rgba(100,116,139,0.80)', lineHeight: 1.65 }}>{desc}</div>
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
