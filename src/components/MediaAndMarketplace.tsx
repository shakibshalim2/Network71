import { Link } from 'react-router-dom'

const NEWS_STORIES = [
  {
    id: 1,
    title: 'Explore Our Business Divisions',
    date: 'Services & sectors', href: '/about',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=120&h=80&fit=crop&auto=format',
  },
  {
    id: 2,
    title: 'Responsible Agriculture & Sourcing',
    date: 'Agriculture division', href: '/divisions/agriculture',
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=120&h=80&fit=crop&auto=format',
  },
  {
    id: 3,
    title: 'Software & Digital Product Development',
    date: 'IT & software', href: '/divisions/it-software',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&h=80&fit=crop&auto=format',
  },
]

const ESHIP_STATS = [
  { val: 'Buy', label: 'Vessel enquiries' },
  { val: 'Sell', label: 'Discuss a vessel' },
  { val: 'Connect', label: 'Maritime team' },
]

export default function MediaAndMarketplace() {
  return (
    <section
      style={{ background: 'var(--s0)', borderTop: '1px solid var(--line)' }}
      className="section-y"
    >
      <div className="container-page">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 sm:gap-5 xl:gap-6">

          {/* ── MEDIA FEATURE ─────────────────────────────── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--s2)', border: '1px solid var(--line)' }}
          >
            <div className="grid md:grid-cols-[1.15fr_1fr] h-full">

              {/* Left: editorial hero image */}
              <div className="force-dark relative overflow-hidden min-h-[260px] sm:min-h-[340px]">
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=700&fit=crop&auto=format"
                  alt="Network71 Media – global journalism and broadcast"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transition: 'transform 0.7s ease', transform: 'scale(1.02)' }}
                  onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.06)' }}
                  onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.02)' }}
                />
                <div className="absolute inset-0" style={{
                  background: 'var(--img-scrim-strong)',
                }} />

                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  {/* Live badge */}
                  <div style={{ marginBottom: 14 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '3px 9px', borderRadius: 20,
                      background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.30)',
                      fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.26em',
                      textTransform: 'uppercase', color: 'var(--accent-red)',
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-red)',
                        animation: 'pulse-slow 1.8s ease-in-out infinite', flexShrink: 0,
                      }} />
                      Network71 Media
                    </span>
                  </div>

                  <h3 className="font-display" style={{
                    fontSize: 'clamp(22px, 2.6vw, 30px)',
                    color: 'var(--fg-strong)', lineHeight: 1.1,
                    letterSpacing: '-0.02em', marginBottom: 8,
                  }}>
                    Global Stories.
                    <br />
                    <em style={{ color: 'var(--brand-fg)' }}>Real Impact.</em>
                  </h3>

                  <p
                    className="max-w-[280px] sm:max-w-[220px]"
                    style={{ color: 'var(--fg-muted)', fontSize: 12, lineHeight: 1.6, marginBottom: 16 }}>
                    Stay updated with our latest news, stories and insights from around the world.
                  </p>

                  <Link
                    to="/divisions/media"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '8px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700,
                      background: 'var(--brand-wash)', border: '1px solid var(--brand-edge)',
                      color: 'var(--brand-fg)', textDecoration: 'none',
                      transition: 'all 0.18s', width: 'fit-content',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-edge)'; e.currentTarget.style.borderColor = 'var(--brand-edge)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--brand-wash)'; e.currentTarget.style.borderColor = 'var(--brand-edge)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 11, height: 11 }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Explore Media
                  </Link>
                </div>
              </div>

              {/*
                Right: news story list.
                Divider must be a top border when stacked (< md) and a left
                border once the two panes sit side by side (≥ md).
              */}
              <div className="flex flex-col p-4 sm:p-5 border-t md:border-t-0 md:border-l border-[var(--line)]">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <div style={{ height: 1, width: 18, background: 'var(--brand-edge)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, letterSpacing: '0.32em', color: 'var(--brand-fg)', textTransform: 'uppercase' }}>
                    Explore Network71
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
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                    >
                      <img
                        src={story.img}
                        alt={story.title}
                        style={{ width: 54, height: 38, objectFit: 'cover', borderRadius: 5, flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.35, marginBottom: 4 }}>
                          {story.title}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--fg-subtle)', letterSpacing: '0.06em' }}>
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
                    color: 'var(--brand-fg)', textDecoration: 'none',
                    fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
                    textTransform: 'uppercase', transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--brand-edge)' }}
                >
                  Media Division
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
            style={{ background: 'var(--s2)', border: '1px solid var(--line)' }}
          >
            <div className="px-5 pt-5 sm:px-6 sm:pt-[22px]" style={{ flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ height: 1, width: 18, background: 'rgba(14,165,233,0.45)', flexShrink: 0 }} />
                <span
                  className="text-[7px] tracking-[0.2em] sm:text-[7.5px] sm:tracking-[0.32em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-sky)', textTransform: 'uppercase' }}>
                  eSHIPe Ship Marketplace
                </span>
              </div>

              <h3 className="font-display" style={{
                fontSize: 'clamp(19px, 2.2vw, 25px)',
                color: 'var(--fg-strong)', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 8,
              }}>
                The Global Platform for{' '}
                <em style={{ color: 'var(--accent-sky)' }}>Ships & Vessels.</em>
              </h3>

              <p style={{ color: 'var(--fg-muted)', fontSize: 12.5, lineHeight: 1.65, marginBottom: 16 }}>
                Buy, sell, charter, and manage vessels — the trusted maritime trading hub connecting buyers and sellers worldwide.
              </p>

              <Link
                to="/divisions/eshipe"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', borderRadius: 8, fontSize: 12.5, fontWeight: 700,
                  background: 'var(--brand)', color: 'var(--fg-onbrand)',
                  textDecoration: 'none', transition: 'background 0.18s',
                  marginBottom: 16,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-bright)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--brand)' }}
              >
                Explore Marketplace
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Ship image */}
            <div className="min-h-[150px] sm:min-h-[180px]" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?w=700&h=400&fit=crop&auto=format"
                alt="Maritime vessel cargo ship at sea"
                className="w-full h-full object-cover"
                style={{ transition: 'transform 0.7s ease' }}
                onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'var(--img-scrim-soft)' }} />
            </div>

            {/* Stats strip */}
            <div
              className="grid grid-cols-3"
              style={{ borderTop: '1px solid var(--line)', flexShrink: 0 }}
            >
              {ESHIP_STATS.map(({ val, label }, i) => (
                <div
                  key={label}
                  className="px-2 py-3.5 sm:px-3 sm:py-4 text-center"
                  style={{
                    borderRight: i < 2 ? '1px solid var(--line)' : 'none',
                  }}
                >
                  <div className="font-display text-[17px] sm:text-[20px]" style={{ color: 'var(--accent-sky)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {val}
                  </div>
                  <div
                    className="text-[7px] tracking-[0.1em] sm:text-[8px] sm:tracking-[0.18em]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)', textTransform: 'uppercase', marginTop: 4 }}>
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
