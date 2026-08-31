import { Link } from 'react-router-dom'

const NEWS_STORIES = [
  {
    id: 1,
    title: 'Network71 Expands Operations in Europe',
    date: 'May 10, 2024',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=120&h=80&fit=crop&auto=format',
  },
  {
    id: 2,
    title: 'Sustainable Innovation in Agriculture for the Future',
    date: 'May 08, 2024',
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=120&h=80&fit=crop&auto=format',
  },
  {
    id: 3,
    title: 'Digital Transformation Driving Global Impact',
    date: 'May 05, 2024',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&h=80&fit=crop&auto=format',
  },
]

const ESHIP_STATS = [
  { val: '2,500+', label: 'Ships Listed' },
  { val: '150+',   label: 'Countries' },
  { val: 'Active', label: 'Marketplace' },
]

export default function MediaAndMarketplace() {
  return (
    <section
      style={{ background: '#04080E', borderTop: '1px solid rgba(255,255,255,0.04)' }}
      className="py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5 xl:gap-6">

          {/* ── MEDIA FEATURE ─────────────────────────────── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#070D1A', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="grid md:grid-cols-[1.15fr_1fr] h-full">

              {/* Left: editorial hero image */}
              <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=700&fit=crop&auto=format"
                  alt="Network71 Media – global journalism and broadcast"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transition: 'transform 0.7s ease', transform: 'scale(1.02)' }}
                  onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.06)' }}
                  onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.02)' }}
                />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(180deg, rgba(7,13,26,0.18) 0%, rgba(7,13,26,0.92) 100%)',
                }} />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Live badge */}
                  <div style={{ marginBottom: 14 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '3px 9px', borderRadius: 20,
                      background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.30)',
                      fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.26em',
                      textTransform: 'uppercase', color: '#EF4444',
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%', background: '#EF4444',
                        animation: 'pulse-slow 1.8s ease-in-out infinite', flexShrink: 0,
                      }} />
                      Network71 Media
                    </span>
                  </div>

                  <h3 className="font-display" style={{
                    fontSize: 'clamp(22px, 2.6vw, 30px)',
                    color: '#FFFFFF', lineHeight: 1.1,
                    letterSpacing: '-0.02em', marginBottom: 8,
                  }}>
                    Global Stories.
                    <br />
                    <em style={{ color: '#C8962A' }}>Real Impact.</em>
                  </h3>

                  <p style={{ color: 'rgba(148,163,184,0.62)', fontSize: 12, lineHeight: 1.6, marginBottom: 16, maxWidth: 220 }}>
                    Stay updated with our latest news, stories and insights from around the world.
                  </p>

                  <Link
                    to="/divisions/media"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '8px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700,
                      background: 'rgba(200,150,42,0.12)', border: '1px solid rgba(200,150,42,0.35)',
                      color: '#C8962A', textDecoration: 'none',
                      transition: 'all 0.18s', width: 'fit-content',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,150,42,0.22)'; e.currentTarget.style.borderColor = 'rgba(200,150,42,0.6)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,150,42,0.12)'; e.currentTarget.style.borderColor = 'rgba(200,150,42,0.35)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 11, height: 11 }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Live
                  </Link>
                </div>
              </div>

              {/* Right: news story list */}
              <div className="flex flex-col p-5" style={{ borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <div style={{ height: 1, width: 18, background: 'rgba(200,150,42,0.35)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, letterSpacing: '0.32em', color: 'rgba(200,150,42,0.60)', textTransform: 'uppercase' }}>
                    Latest Stories
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                  {NEWS_STORIES.map((story) => (
                    <Link
                      key={story.id}
                      to="/divisions/media"
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '10px 8px', borderRadius: 8,
                        transition: 'background 0.15s', textDecoration: 'none',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                    >
                      <img
                        src={story.img}
                        alt={story.title}
                        style={{ width: 54, height: 38, objectFit: 'cover', borderRadius: 5, flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11.5, fontWeight: 600, color: '#E2E8F0', lineHeight: 1.35, marginBottom: 4 }}>
                          {story.title}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'rgba(100,116,139,0.50)', letterSpacing: '0.06em' }}>
                          {story.date}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/divisions/media"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    marginTop: 14, fontSize: 10.5, fontWeight: 600,
                    color: 'rgba(200,150,42,0.70)', textDecoration: 'none',
                    fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
                    textTransform: 'uppercase', transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#C8962A' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,150,42,0.70)' }}
                >
                  All Stories
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ width: 10, height: 10 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* ── eSHIPe MARKETPLACE ─────────────────────────── */}
          <div
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: '#070D1A', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div style={{ padding: '22px 24px 0', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ height: 1, width: 18, background: 'rgba(14,165,233,0.45)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, letterSpacing: '0.32em', color: 'rgba(14,165,233,0.65)', textTransform: 'uppercase' }}>
                  eSHIPe Ship Marketplace
                </span>
              </div>

              <h3 className="font-display" style={{
                fontSize: 'clamp(19px, 2.2vw, 25px)',
                color: '#FFFFFF', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 8,
              }}>
                The Global Platform for{' '}
                <em style={{ color: '#0EA5E9' }}>Ships & Vessels.</em>
              </h3>

              <p style={{ color: 'rgba(148,163,184,0.58)', fontSize: 12.5, lineHeight: 1.65, marginBottom: 16 }}>
                Buy, sell, charter, and manage vessels — the trusted maritime trading hub connecting buyers and sellers worldwide.
              </p>

              <Link
                to="/divisions/eshipe"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', borderRadius: 8, fontSize: 12.5, fontWeight: 700,
                  background: '#C8962A', color: '#04080E',
                  textDecoration: 'none', transition: 'background 0.18s',
                  marginBottom: 16,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E6B840' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C8962A' }}
              >
                Explore Marketplace
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Ship image */}
            <div style={{ flex: 1, position: 'relative', minHeight: 180, overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?w=700&h=400&fit=crop&auto=format"
                alt="Maritime vessel cargo ship at sea"
                className="w-full h-full object-cover"
                style={{ transition: 'transform 0.7s ease' }}
                onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,13,26,0.85) 0%, transparent 55%)' }} />
            </div>

            {/* Stats strip */}
            <div
              className="grid grid-cols-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}
            >
              {ESHIP_STATS.map(({ val, label }, i) => (
                <div
                  key={label}
                  style={{
                    padding: '16px 12px', textAlign: 'center',
                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <div className="font-display" style={{ fontSize: 20, color: '#0EA5E9', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {val}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(100,116,139,0.50)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
