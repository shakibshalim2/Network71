import { Link } from 'react-router-dom'
import SectorHeader from '@/components/sector/SectorHeader'
import MetricsBar from '@/components/sector/MetricsBar'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'

const RED = 'var(--accent-red)'
const GOLD = 'var(--brand-fg)'
const BG_DEEP = 'var(--s0)'
const BG_ALT = 'var(--s1)'

/* ─── data ─────────────────────────────────────────────────────────────── */

const metrics = [
  { value: 'Live', label: 'Broadcasting', desc: '24/7 news & programme delivery' },
  { value: 'Multi', label: 'Platform', desc: 'Digital, mobile & broadcast' },
  { value: '25+', label: 'Countries', desc: 'Regional audience reach' },
  { value: '2024', label: 'Launched', desc: 'Network71 Media Division' },
]

const newsCategories = [
  {
    icon: '◈',
    title: 'Breaking News',
    desc: 'Real-time reporting on major world events. Verified, fast, and ethically sourced from correspondents across the globe.',
    color: RED,
  },
  {
    icon: '◈',
    title: 'Business & Economy',
    desc: 'In-depth analysis of global markets, trade policy, corporate developments, and emerging economic trends.',
    color: GOLD,
  },
  {
    icon: '◈',
    title: 'International Affairs',
    desc: 'Comprehensive international news coverage including geopolitics, diplomacy, and cross-border developments.',
    color: 'var(--accent-cyan)',
  },
  {
    icon: '◈',
    title: 'Technology',
    desc: 'Innovation, AI, startups, digital transformation, and the technology forces reshaping industries worldwide.',
    color: 'var(--accent-purple)',
  },
  {
    icon: '◈',
    title: 'Culture & Society',
    desc: 'Arts, heritage, social movements, sports, and the stories that define communities across every continent.',
    color: 'var(--accent-emerald)',
  },
  {
    icon: '◈',
    title: 'Investigative Reporting',
    desc: 'Long-form investigative journalism — uncovering stories that matter with evidence, rigour, and independence.',
    color: 'var(--accent-orange)',
  },
]

const tvProgrammes = [
  { title: 'The Daily Brief', time: 'Mon – Fri  |  07:00', format: 'Morning news programme', color: RED },
  { title: 'Markets Watch', time: 'Daily  |  09:30', format: 'Business & financial markets', color: GOLD },
  { title: 'World Report', time: 'Daily  |  12:00', format: 'Midday international news', color: 'var(--accent-cyan)' },
  { title: 'Evening Edition', time: 'Daily  |  18:30', format: 'Evening flagship bulletin', color: RED },
  { title: 'The Insight', time: 'Weekly', format: 'Long-form investigative feature', color: 'var(--accent-purple)' },
  { title: 'Economy Plus', time: 'Weekly', format: 'Global trade & economic affairs', color: GOLD },
  { title: 'Tech Horizon', time: 'Weekly', format: 'Technology & innovation desk', color: 'var(--accent-emerald)' },
  { title: 'Press Review', time: 'Daily  |  22:00', format: 'Media analysis & review', color: 'var(--fg-muted)' },
]

const editorialStandards = [
  { title: 'Editorial Independence', desc: 'News operations are editorially independent from commercial interests and group divisions.' },
  { title: 'Verified Sourcing', desc: 'Every story is cross-referenced with a minimum of two independent sources before publication.' },
  { title: 'Corrections Policy', desc: 'Corrections are published promptly and prominently — accountability is non-negotiable.' },
  { title: 'Privacy & Ethics', desc: 'Strict adherence to journalistic ethics, data privacy laws, and international press standards.' },
]

const platforms = [
  { name: 'Digital News Portal', desc: 'Web-first news platform with real-time updates, multimedia content, and personalised feeds.', icon: '◻', color: RED },
  { name: 'Mobile App', desc: 'Native iOS and Android app delivering breaking alerts, live streams, and saved articles.', icon: '◻', color: 'var(--accent-cyan)' },
  { name: 'TV Channel', desc: '24/7 live broadcast channel with rolling news, scheduled programmes, and live specials.', icon: '◻', color: GOLD },
  { name: 'Video & VOD', desc: 'Full video-on-demand library, including long-form documentaries and archived broadcasts.', icon: '◻', color: 'var(--accent-purple)' },
]

const advertisingOptions = [
  {
    title: 'Display Advertising',
    tag: 'Digital',
    desc: 'Premium display placements across the Network71 Media digital portfolio including news portal, mobile app, and video player pre/mid-rolls.',
    color: RED,
  },
  {
    title: 'Broadcast Sponsorship',
    tag: 'TV',
    desc: 'Named sponsorship of flagship programmes — brand exposure across our 24/7 TV channel reach with verified audience metrics.',
    color: GOLD,
  },
  {
    title: 'Strategic Content Partnership',
    tag: 'Branded Content',
    desc: 'Custom editorial content, advertorials, and co-produced features that integrate brand messaging within trusted editorial context.',
    color: 'var(--accent-cyan)',
  },
]

/* ─── page ──────────────────────────────────────────────────────────────── */

export default function Media() {
  return (
    <div className="sector-page min-h-full" style={{ background: BG_DEEP, color: 'var(--fg)' }}>
      <SectorHeader divisionName="Media" accentClass="text-red-400" />
      <main className="public-content">

      {/* ── 1. HERO ── */}
      <section className="sector-hero relative min-h-screen flex items-center overflow-hidden" style={{ background: BG_DEEP }}>
        {/* Scanline texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(239,68,68,0.012) 3px, rgba(239,68,68,0.012) 4px)`,
            opacity: 0.8,
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(239,68,68,0.08) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            opacity: 0.5,
          }}
        />
        {/* Ambient glows */}
        <div
          className="absolute top-0 right-0 w-[800px] h-[600px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,150,42,0.07) 0%, transparent 70%)' }}
        />

        <div className="media-intro-strip">NETWORK71 MEDIA <span>Digital storytelling &amp; editorial enquiries</span></div>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-40">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: RED }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: RED }}>
                Network71 — Division 07
              </span>
            </div>

            <h1 className="font-display leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              <span style={{ color: 'var(--fg)' }}>Where News Meets</span>
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${RED} 0%, #F97316 60%, ${RED} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                the World.
              </span>
            </h1>

            <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
              Network71 Media is the Group&apos;s dedicated media division — delivering credible, independent,
              and high-quality journalism across digital news and broadcast television. Serving audiences across
              South Asia, the Middle East, and beyond.
            </p>

            <div className="flex flex-wrap gap-4 mb-20">
              <a
                href="#sector-contact"
                className="px-8 py-3.5 font-semibold text-sm rounded-lg transition-all hover:opacity-90"
                style={{ background: RED, color: 'var(--s0)' }}
              >
                Media Partnerships
              </a>
              <a
                href="#programmes"
                className="px-8 py-3.5 border text-sm font-medium text-white rounded-lg hover:bg-white/5 transition-colors"
                style={{ borderColor: `color-mix(in srgb, ${RED} 31%, transparent)` }}
              >
                View Programmes
              </a>
            </div>

            {/* LIVE tag + stats */}
            <div className="flex flex-wrap items-center gap-8 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {/* Live badge */}
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: RED, color: 'var(--s0)', boxShadow: `0 0 10px ${RED}, 0 0 20px color-mix(in srgb, ${RED} 38%, transparent)`, animation: 'pulse-slow 2s ease-in-out infinite' }}
                />
                <span className="font-mono text-[10px] text-white tracking-[0.2em] uppercase font-semibold">Live Now</span>
              </div>
              <div className="h-5 w-px" style={{ background: 'rgba(255,255,255,0.12)' }} />
              {[
                { v: '24/7', l: 'Broadcast' },
                { v: 'Multi', l: 'Platform' },
                { v: '25+', l: 'Countries' },
              ].map((m) => (
                <div key={m.l}>
                  <div className="font-display text-3xl mb-0.5" style={{ color: RED }}>{m.v}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Broadcast signal decoration */}
        <div
          className="absolute bottom-12 right-8 lg:right-16 hidden lg:block opacity-25"
          style={{ fontFamily: 'monospace', fontSize: '11px', color: RED, lineHeight: 1.8 }}
        >
          <div>$ n71-media --channel=live --stream=active</div>
          <div style={{ color: 'var(--accent-green)' }}>&#10003; broadcast signal confirmed</div>
          <div style={{ color: 'var(--accent-green)' }}>&#10003; editorial desk online</div>
          <div style={{ color: 'var(--accent-green)' }}>&#10003; 25+ country distribution</div>
          <div className="animate-pulse">&#9646; transmitting_</div>
        </div>
      </section>

      {/* ── 2. METRICS BAR ── */}
      <MetricsBar metrics={metrics} accentHex={RED} dark />

      {/* ── 3. DIVISION OVERVIEW ── */}
      <section className="py-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-14">
            <div className="h-px w-10" style={{ background: RED }} />
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: RED }}>Division Overview</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Independent Media for a Connected World
              </h2>
              <p className="text-slate-300 leading-relaxed mb-5 text-sm">
                Network71 Media operates two parallel channels of content delivery: a digital news portal
                and mobile platform providing real-time reporting, analysis, and multimedia journalism; and
                a dedicated television channel broadcasting 24 hours a day, 7 days a week.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                Editorial independence is the non-negotiable foundation of our media operations.
                Our newsroom operates with full separation from commercial and group interests, upholding the
                highest standards of accuracy, verification, and public accountability. The division serves
                audiences across South Asia, the Middle East, Southeast Asia, and diaspora communities worldwide.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className="p-5 rounded-xl"
                  style={{ background: `color-mix(in srgb, ${p.color} 2%, transparent)`, border: `1px solid color-mix(in srgb, ${p.color} 9%, transparent)` }}
                >
                  <div className="text-xs font-bold mb-3" style={{ color: p.color }}>{p.icon} {p.name}</div>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. NEWS CATEGORIES ── */}
      <section className="py-24" style={{ background: BG_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: RED }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: RED }}>Editorial Coverage</span>
              <div className="h-px w-8" style={{ background: RED }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">Six Coverage Desks</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Our editorial team is organised across six specialist desks — each staffed by dedicated journalists
              and editors with deep subject expertise.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {newsCategories.map((cat) => (
              <div
                key={cat.title}
                className="group p-7 rounded-2xl cursor-default transition-all duration-300"
                style={{ background: 'var(--fill-1)', border: 'var(--border-subtle)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px color-mix(in srgb, ${cat.color} 13%, transparent)`
                  ;(e.currentTarget as HTMLDivElement).style.borderColor = `color-mix(in srgb, ${cat.color} 25%, transparent)`
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                  ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-lg font-bold"
                  style={{ background: `color-mix(in srgb, ${cat.color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${cat.color} 19%, transparent)`, color: cat.color }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-white text-sm mb-3">{cat.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{cat.desc}</p>
                <div className="mt-5 h-px w-8 transition-all duration-300 group-hover:w-16" style={{ background: cat.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TV CHANNEL & PROGRAMMES ── */}
      <section id="programmes" className="py-28 relative overflow-hidden" style={{ background: 'var(--s0)' }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Channel badge */}
          <div className="flex items-center gap-4 mb-14">
            <div
              className="flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{ border: `1px solid color-mix(in srgb, ${RED} 25%, transparent)`, background: `color-mix(in srgb, ${RED} 7%, transparent)` }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: RED, boxShadow: `0 0 8px ${RED}`, animation: 'pulse-slow 2s ease-in-out infinite' }} />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: RED }}>Network71 TV — Live 24/7</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Broadcast Television.
                <br />
                <span
                  style={{
                    background: `linear-gradient(135deg, ${RED}, #F97316)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Around the Clock.
                </span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Network71 TV is a dedicated 24-hour news and current affairs channel broadcasting live coverage,
                scheduled news bulletins, analysis programmes, and investigative documentaries.
                The channel serves our regional audiences and is distributed across cable, satellite, and digital
                streaming platforms.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Programme scheduling, carriage agreements, and distribution reach details will be
                published as broadcast partnerships are confirmed.
              </p>
              <div
                className="mt-8 p-5 rounded-xl"
                style={{ background: `color-mix(in srgb, ${RED} 3%, transparent)`, border: `1px solid color-mix(in srgb, ${RED} 13%, transparent)` }}
              >
                <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: RED }}>
                  Broadcast Signal Status
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Digital Streaming', status: 'Active', color: 'var(--accent-green)' },
                    { label: 'Cable Distribution', status: 'In Negotiation', color: GOLD },
                    { label: 'Satellite Coverage', status: 'In Progress', color: GOLD },
                    { label: 'Mobile Live', status: 'Active', color: 'var(--accent-green)' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-slate-400 text-xs">{item.label}</span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: item.color, background: `color-mix(in srgb, ${item.color} 8%, transparent)` }}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Programme grid */}
            <div>
              <div className="font-mono text-[10px] tracking-widest uppercase mb-5" style={{ color: 'var(--fg-muted)' }}>
                Programme Schedule
              </div>
              <div className="space-y-2">
                {tvProgrammes.map((prog) => (
                  <div
                    key={prog.title}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 cursor-default group"
                    style={{ background: 'var(--fill-1)', border: 'var(--border-subtle)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `color-mix(in srgb, ${prog.color} 19%, transparent)` }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.05)' }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: prog.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold">{prog.title}</div>
                      <div className="text-slate-500 text-[11px]">{prog.format}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono text-[10px]" style={{ color: prog.color }}>{prog.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-slate-600 text-xs font-mono">
                * Schedule subject to change. Full listings published on official channel guides.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. EDITORIAL STANDARDS ── */}
      <section className="py-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10" style={{ background: 'var(--accent-green)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: 'var(--accent-green)' }}>Editorial Charter</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Journalism Built on Trust
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                In an era of accelerating misinformation, our editorial charter is a public commitment —
                not merely an internal policy. Every story Network71 Media publishes is held to the same
                standard: independently verified, fairly presented, and subject to immediate correction
                when found to be in error.
              </p>
            </div>
            <div className="space-y-4">
              {editorialStandards.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-5 rounded-xl"
                  style={{ background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.12)' }}
                >
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--accent-green)' }} />
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. ADVERTISING & PARTNERSHIPS ── */}
      <section className="py-24" style={{ background: BG_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: RED }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: RED }}>Commercial Opportunities</span>
              <div className="h-px w-8" style={{ background: RED }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
              Reach Our Audiences
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Network71 Media provides advertising and partnership opportunities across digital, mobile, and television
              platforms — connecting brands with engaged, informed audiences.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {advertisingOptions.map((opt) => (
              <div
                key={opt.title}
                className="p-7 rounded-2xl flex flex-col"
                style={{ background: 'var(--fill-1)', border: `1px solid color-mix(in srgb, ${opt.color} 15%, transparent)` }}
              >
                <div
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold mb-5"
                  style={{ background: `color-mix(in srgb, ${opt.color} 8%, transparent)`, color: opt.color }}
                >
                  {opt.tag}
                </div>
                <h3 className="font-display text-xl text-white mb-4">{opt.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-7">{opt.desc}</p>
                <a
                  href="#sector-contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: opt.color }}
                >
                  Enquire Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. MEDIA GALLERY PLACEHOLDER ── */}
      <section className="py-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-10" style={{ background: RED, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: RED }}>Media Gallery</span>
              </div>
              <h2 className="font-display text-4xl text-white">From the Newsroom</h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: RED }}
            >
              View Full Gallery
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop&auto=format',
                label: 'Breaking News Desk',
              },
              {
                img: 'https://images.unsplash.com/photo-1586339949216-35c2747cc36d?w=600&h=400&fit=crop&auto=format',
                label: 'Broadcast Studio',
              },
              {
                img: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600&h=400&fit=crop&auto=format',
                label: 'Field Reporting',
              },
              {
                img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop&auto=format',
                label: 'Digital News Portal',
              },
              {
                img: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=400&fit=crop&auto=format',
                label: 'Business Desk',
              },
              {
                img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop&auto=format',
                label: 'International Coverage',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="group relative rounded-xl overflow-hidden aspect-[3/2]"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(175deg, transparent 40%, rgba(3,6,8,0.88) 100%)' }}
                />
                <div className="absolute inset-0 rounded-xl border border-white/[0.06] group-hover:border-white/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'rgba(239,68,68,0.75)' }}>
                    Network71 Media
                  </div>
                  <div className="text-white text-sm font-semibold">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-slate-600 text-xs font-mono">Gallery content updated regularly. All editorial imagery is sourced from licensed and original photography.</p>
        </div>
      </section>

      {/* ── 9. SECTOR CONTACT ── */}
      <SectorContact
        divisionName="Media"
        accentHex={RED}
        inquiryTypes={['Advertising Inquiry', 'Broadcast Partnership', 'Content Partnership', 'Press Credentials', 'Editorial Contact']}
      />

      </main>
      <Footer />
    </div>
  )
}
