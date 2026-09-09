import { Link } from 'react-router-dom'

const allItems = [
  {
    title: 'Garments & Apparel',
    tag: 'Manufacturing',
    tagColor: 'var(--accent-rose)',
    desc: 'Ethical manufacturing, premium quality apparel solutions.',
    href: '/divisions/garments',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&auto=format',
    overlay: 'var(--img-scrim-strong)',
    hoverAccent: 'rgba(244,63,94,0.48)',
    isEzyify: false,
  },
  {
    title: 'Agriculture & Agro Products',
    tag: 'Agro Export',
    tagColor: 'var(--accent-green)',
    desc: 'Sustainable farming, quality produce, better tomorrow.',
    href: '/divisions/agriculture',
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=800&fit=crop&auto=format',
    overlay: 'var(--img-scrim-strong)',
    hoverAccent: 'rgba(34,197,94,0.42)',
    isEzyify: false,
  },
  {
    title: 'Food & Beverage Manufacturing',
    tag: 'FMCG',
    tagColor: 'var(--accent-orange)',
    desc: 'Safe, nutritious and innovative food for global markets.',
    href: '/divisions/food-beverage',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop&auto=format',
    overlay: 'var(--img-scrim-strong)',
    hoverAccent: 'rgba(249,115,22,0.42)',
    isEzyify: false,
  },
  {
    title: 'Oils & Energy',
    tag: 'Energy',
    tagColor: 'var(--accent-amber)',
    desc: 'Reliable energy solutions powering industries and lives.',
    href: '/divisions/oils-energy',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=800&fit=crop&auto=format',
    overlay: 'var(--img-scrim-strong)',
    hoverAccent: 'rgba(245,158,11,0.42)',
    isEzyify: false,
  },
  {
    title: 'IT & Software',
    tag: 'Technology',
    tagColor: 'var(--accent-cyan)',
    desc: 'Technology, software and AI-driven digital transformation.',
    href: '/divisions/it-software',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=800&fit=crop&auto=format',
    overlay: 'var(--img-scrim-strong)',
    hoverAccent: 'rgba(34,211,238,0.4)',
    isEzyify: false,
  },
  {
    title: 'Global Trading & Imports',
    tag: 'Trade',
    tagColor: 'var(--accent-blue)',
    desc: 'Connecting markets, delivering value across the world.',
    href: '/divisions/global-trading',
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=800&fit=crop&auto=format',
    overlay: 'var(--img-scrim-strong)',
    hoverAccent: 'rgba(59,130,246,0.42)',
    isEzyify: false,
  },
  {
    title: 'Media',
    tag: 'Broadcast & Digital',
    tagColor: 'var(--accent-red)',
    desc: 'Independent news, digital journalism and 24/7 broadcast TV.',
    href: '/divisions/media',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=800&fit=crop&auto=format',
    overlay: 'var(--img-scrim-strong)',
    hoverAccent: 'rgba(239,68,68,0.42)',
    isEzyify: false,
  },
  {
    title: 'eSHIPe Maritime',
    tag: 'Maritime',
    tagColor: 'var(--accent-sky)',
    desc: 'Global ship trading, recycling & maritime marketplace.',
    href: '/divisions/eshipe',
    img: 'https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?w=600&h=800&fit=crop&auto=format',
    overlay: 'var(--img-scrim-strong)',
    hoverAccent: 'rgba(14,165,233,0.42)',
    isEzyify: false,
  },
  {
    title: 'Ezyify',
    tag: 'Our Flagship Brand',
    tagColor: 'var(--accent-purple)',
    desc: 'AI-powered social commerce ecosystem for the future.',
    href: '/ezyify',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop&auto=format',
    overlay: 'linear-gradient(175deg, rgba(88,28,220,0.35) 0%, rgba(5,8,26,0.92) 100%)',
    hoverAccent: 'rgba(168,85,247,0.5)',
    isEzyify: true,
  },
]

export default function Divisions() {
  return (
    <section id="divisions" style={{ background: 'var(--s0)' }} className="section-y">
      <div className="container-page">

        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4">
            <div className="h-px w-6 sm:w-10" style={{ background: 'var(--brand-edge)' }} />
            <span
              className="text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em]"
              style={{
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                color: 'var(--brand-fg)',
              }}>
              Our Businesses
            </span>
            <div className="h-px w-6 sm:w-10" style={{ background: 'var(--brand-edge)' }} />
          </div>
          <h2 className="font-display text-balance" style={{
            fontSize: 'clamp(25px, 5.6vw, 48px)',
            color: 'var(--fg-strong)', lineHeight: 1.14, letterSpacing: '-0.025em',
          }}>
            Diverse Industries. <em style={{ color: 'var(--brand-fg)' }}>Unified Strength.</em>
          </h2>
        </div>

        {/*
          Layout strategy:
            < md  → edge-to-edge snap rail (cards stay large & legible on phones)
            ≥ md  → responsive grid, because 9 cards in one row collapse to ~140px
        */}
        <div className="card-rail no-scrollbar">
          {allItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="force-dark group relative overflow-hidden rounded-xl block"
                style={{ aspectRatio: '3/4', background: 'var(--s2)' }}
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: item.overlay }} />

                {/* Hover accent glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${item.hoverAccent} 0%, transparent 55%)` }}
                />

                {/* Border */}
                <div className="absolute inset-0 rounded-xl border border-white/[0.10] group-hover:border-white/25 transition-colors duration-300 pointer-events-none" />

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full font-mono text-[8px] font-semibold tracking-wider uppercase"
                    style={{ background: `color-mix(in srgb, ${item.tagColor} 12%, transparent)`, color: item.tagColor, border: `1px solid color-mix(in srgb, ${item.tagColor} 25%, transparent)` }}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-3 xl:p-4">
                  {item.isEzyify ? (
                    <>
                      <div
                        className="font-display text-[19px] md:text-[18px] xl:text-xl mb-1.5 leading-tight"
                        style={{
                          background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 60%, #22D3EE 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {item.title}
                      </div>
                      <p className="text-slate-300/60 text-[11.5px] md:text-[11px] leading-relaxed mb-2.5">{item.desc}</p>
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold font-mono tracking-wide"
                        style={{ color: 'var(--accent-purple)' }}>
                        Explore Platform
                        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      <h3 className="font-display text-white leading-tight mb-1.5 text-[16px] md:text-[15px] xl:text-[17px]">
                        {item.title}
                      </h3>
                      <p className="text-slate-300/60 text-[11.5px] md:text-[11px] leading-relaxed mb-2.5">{item.desc}</p>
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold font-mono tracking-wide"
                        style={{ color: item.tagColor }}>
                        Explore
                        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </>
                  )}
                </div>
              </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
