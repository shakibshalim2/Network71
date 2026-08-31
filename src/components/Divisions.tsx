import { Link } from 'react-router-dom'

const allItems = [
  {
    title: 'Garments & Apparel',
    tag: 'Manufacturing',
    tagColor: '#f43f5e',
    desc: 'Ethical manufacturing, premium quality apparel solutions.',
    href: '/divisions/garments',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&auto=format',
    overlay: 'linear-gradient(175deg, rgba(4,8,14,0.22) 0%, rgba(4,8,14,0.9) 100%)',
    hoverAccent: 'rgba(244,63,94,0.48)',
    isEzyify: false,
  },
  {
    title: 'Agriculture & Agro Products',
    tag: 'Agro Export',
    tagColor: '#22c55e',
    desc: 'Sustainable farming, quality produce, better tomorrow.',
    href: '/divisions/agriculture',
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=800&fit=crop&auto=format',
    overlay: 'linear-gradient(175deg, rgba(4,8,14,0.22) 0%, rgba(4,8,14,0.9) 100%)',
    hoverAccent: 'rgba(34,197,94,0.42)',
    isEzyify: false,
  },
  {
    title: 'Food & Beverage Manufacturing',
    tag: 'FMCG',
    tagColor: '#f97316',
    desc: 'Safe, nutritious and innovative food for global markets.',
    href: '/divisions/food-beverage',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop&auto=format',
    overlay: 'linear-gradient(175deg, rgba(4,8,14,0.22) 0%, rgba(4,8,14,0.9) 100%)',
    hoverAccent: 'rgba(249,115,22,0.42)',
    isEzyify: false,
  },
  {
    title: 'Oils & Energy',
    tag: 'Energy',
    tagColor: '#f59e0b',
    desc: 'Reliable energy solutions powering industries and lives.',
    href: '/divisions/oils-energy',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=800&fit=crop&auto=format',
    overlay: 'linear-gradient(175deg, rgba(4,8,14,0.22) 0%, rgba(4,8,14,0.9) 100%)',
    hoverAccent: 'rgba(245,158,11,0.42)',
    isEzyify: false,
  },
  {
    title: 'IT & Software',
    tag: 'Technology',
    tagColor: '#22D3EE',
    desc: 'Technology, software and AI-driven digital transformation.',
    href: '/divisions/it-software',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=800&fit=crop&auto=format',
    overlay: 'linear-gradient(175deg, rgba(4,8,14,0.22) 0%, rgba(4,8,14,0.9) 100%)',
    hoverAccent: 'rgba(34,211,238,0.4)',
    isEzyify: false,
  },
  {
    title: 'Global Trading & Imports',
    tag: 'Trade',
    tagColor: '#3b82f6',
    desc: 'Connecting markets, delivering value across the world.',
    href: '/divisions/global-trading',
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=800&fit=crop&auto=format',
    overlay: 'linear-gradient(175deg, rgba(4,8,14,0.22) 0%, rgba(4,8,14,0.9) 100%)',
    hoverAccent: 'rgba(59,130,246,0.42)',
    isEzyify: false,
  },
  {
    title: 'Media',
    tag: 'Broadcast & Digital',
    tagColor: '#EF4444',
    desc: 'Independent news, digital journalism and 24/7 broadcast TV.',
    href: '/divisions/media',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=800&fit=crop&auto=format',
    overlay: 'linear-gradient(175deg, rgba(4,8,14,0.22) 0%, rgba(4,8,14,0.9) 100%)',
    hoverAccent: 'rgba(239,68,68,0.42)',
    isEzyify: false,
  },
  {
    title: 'eSHIPe Maritime',
    tag: 'Maritime',
    tagColor: '#0EA5E9',
    desc: 'Global ship trading, recycling & maritime marketplace.',
    href: '/divisions/eshipe',
    img: 'https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?w=600&h=800&fit=crop&auto=format',
    overlay: 'linear-gradient(175deg, rgba(4,8,14,0.22) 0%, rgba(4,8,14,0.9) 100%)',
    hoverAccent: 'rgba(14,165,233,0.42)',
    isEzyify: false,
  },
  {
    title: 'Ezyify',
    tag: 'Our Flagship Brand',
    tagColor: '#A855F7',
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
    <section id="divisions" style={{ background: '#04080E' }} className="py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'rgba(200,150,42,0.3)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              letterSpacing: '0.35em', textTransform: 'uppercase',
              color: 'rgba(200,150,42,0.65)',
            }}>
              Our Businesses
            </span>
            <div className="h-px w-10" style={{ background: 'rgba(200,150,42,0.3)' }} />
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(30px, 4vw, 48px)',
            color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.025em',
          }}>
            Diverse Industries. <em style={{ color: '#C8962A' }}>Unified Strength.</em>
          </h2>
        </div>

        {/* ── 7-card single row — horizontal scroll on all sizes, fills row on lg+ ── */}
        <div
          className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0 pb-4 lg:pb-0"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex gap-3 lg:gap-2.5">
            {allItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="group relative overflow-hidden rounded-xl block flex-shrink-0 snap-start lg:flex-1 lg:min-w-0"
                style={{ width: 'min(72vw, 260px)', aspectRatio: '3/4' }}
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
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
                <div className="absolute inset-0 rounded-xl border border-white/[0.06] group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full font-mono text-[8px] font-semibold tracking-wider uppercase"
                    style={{ background: `${item.tagColor}1E`, color: item.tagColor, border: `1px solid ${item.tagColor}40` }}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {item.isEzyify ? (
                    <>
                      <div
                        className="font-display text-xl mb-1.5 leading-tight"
                        style={{
                          background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 60%, #22D3EE 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {item.title}
                      </div>
                      <p className="text-slate-300/60 text-[11px] leading-relaxed mb-2.5">{item.desc}</p>
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold font-mono tracking-wide"
                        style={{ color: '#A855F7' }}>
                        Explore Platform
                        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      <h3 className="font-display text-white leading-tight mb-1.5" style={{ fontSize: 'clamp(14px, 1.5vw, 17px)' }}>
                        {item.title}
                      </h3>
                      <p className="text-slate-300/60 text-[11px] leading-relaxed mb-2.5">{item.desc}</p>
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

      </div>
    </section>
  )
}
