import { Link } from 'react-router-dom'
import SectorHeader from '@/components/sector/SectorHeader'
import MetricsBar from '@/components/sector/MetricsBar'
import ProcessFlow from '@/components/sector/ProcessFlow'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'
import { useT, DIVISION_IDS, DIVISION_HREF, DIVISION_COLOR, divKey } from '@/i18n'

const INDIGO = 'var(--accent-indigo)'
const GOLD = 'var(--brand-fg)'
const BG_DEEP = 'var(--s0)'
const BG_ALT = 'var(--s1)'

/* ─── data ─────────────────────────────────────────────────────────────── */

const metrics = [
  { value: '10', label: 'Divisions', desc: 'One connected ecosystem' },
  { value: 'JV', label: 'Structures', desc: 'Joint ventures & partnerships' },
  { value: 'Multi', label: 'Sector', desc: 'Cross-industry opportunity scope' },
  { value: 'Global', label: 'Expansion', desc: 'New markets & corridors' },
]

const ventureModels = [
  {
    title: 'Joint Ventures',
    desc: 'Co-owned operating companies with aligned partners — shared capital, shared governance, and a clear operating plan from day one.',
    color: INDIGO,
    icon: 'M8 12h8M12 8v8M4 12a8 8 0 1016 0 8 8 0 10-16 0z',
  },
  {
    title: 'Strategic Partnerships',
    desc: 'Long-term commercial alliances — distribution, sourcing, technology or market-access agreements that extend both partners’ reach.',
    color: GOLD,
    icon: 'M7 12a5 5 0 1110 0 5 5 0 01-10 0zM2 12h3m14 0h3',
  },
  {
    title: 'Market Entry',
    desc: 'Structured expansion of Network71 divisions into new countries: regulatory mapping, local partners, entity setup and launch support.',
    color: 'var(--accent-cyan)',
    icon: 'M12 2v20M2 12h20M5 5l14 14M19 5L5 19',
  },
  {
    title: 'Growth Investment',
    desc: 'Minority or majority positions in businesses that complement the ecosystem — with operational support rather than passive capital.',
    color: 'var(--accent-emerald)',
    icon: 'M3 17l6-6 4 4 8-8M14 7h7v7',
  },
  {
    title: 'Trade Corridors',
    desc: 'Bilateral business platforms connecting Bangladesh with the Middle East, Europe, East Asia and Africa across multiple divisions.',
    color: 'var(--accent-sky)',
    icon: 'M3 12h18M14 6l6 6-6 6',
  },
  {
    title: 'Incubation & Spin-outs',
    desc: 'New ventures born inside the group — validated, resourced and spun out as independent businesses when they are ready.',
    color: 'var(--accent-purple)',
    icon: 'M12 3l2.4 5 5.6.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.6-.8L12 3z',
  },
]

const processSteps = [
  { title: 'Opportunity Screening', desc: 'Sector fit, market size, partner credibility and alignment with the wider Network71 ecosystem.' },
  { title: 'Due Diligence', desc: 'Commercial, financial, legal and reputational review before any commitment is made.' },
  { title: 'Structure & Terms', desc: 'JV, partnership or investment structure; governance, capital plan and exit provisions.' },
  { title: 'Formation', desc: 'Entity setup, regulatory approvals, banking and operating agreements.' },
  { title: 'Launch & Operate', desc: 'Management team, shared services from the group and quarterly performance reviews.' },
  { title: 'Scale', desc: 'Expansion into new products, geographies or adjacent divisions once fundamentals are proven.' },
]

const principles = [
  { title: 'Aligned Incentives', desc: 'We only enter structures where partners win together — shared upside, shared accountability.' },
  { title: 'Operational Depth', desc: 'Every venture is backed by the group’s divisions, not just capital. Manufacturing, trade, tech and media resources are on call.' },
  { title: 'Governance First', desc: 'Clear boards, reporting lines and decision rights from the start. No ambiguity in ownership or control.' },
  { title: 'Long-term Horizon', desc: 'We build businesses to last. Short-term arbitrage is not our model.' },
]

const partnerProfiles = [
  { title: 'Industrial Groups', desc: 'Manufacturers and producers seeking a Bangladesh or South Asia partner with local operating capability.' },
  { title: 'Technology Companies', desc: 'Platforms and software businesses looking for distribution, localisation or a regional operating base.' },
  { title: 'Investors & Family Offices', desc: 'Capital partners who want exposure to a diversified, operator-led emerging-market portfolio.' },
  { title: 'Government & Trade Bodies', desc: 'Bilateral trade and investment programmes connecting markets through structured business platforms.' },
]

/* ─── page ──────────────────────────────────────────────────────────────── */

export default function StrategicVentures() {
  const { t } = useT()
  const ecosystem = DIVISION_IDS.filter(id => id !== 'ventures')

  return (
    <div className="sector-page min-h-full" style={{ background: BG_DEEP, color: 'var(--fg)' }}>
      <SectorHeader divisionName="Strategic Ventures" accentClass="text-indigo-300" />
      <main className="public-content">

      {/* ── 1. HERO ── */}
      <section className="sector-hero relative min-h-screen flex items-center overflow-hidden" style={{ background: BG_DEEP }}>
        {/* Constellation grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(165,180,252,0.14) 1px, transparent 1px)`,
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse at 70% 40%, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, black 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-[800px] h-[700px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.14) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,150,42,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12" style={{ background: INDIGO }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: INDIGO }}>
                  Network71 — Division 08
                </span>
              </div>

              <div className="mb-8 inline-flex">
                <div
                  className="flex items-center gap-3 px-4 py-2 rounded-full"
                  style={{ border: `1px solid color-mix(in srgb, ${INDIGO} 25%, transparent)`, background: `color-mix(in srgb, ${INDIGO} 6%, transparent)` }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: INDIGO, boxShadow: `0 0 10px ${INDIGO}` }} />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: INDIGO }}>
                    International Business & Strategic Ventures
                  </span>
                </div>
              </div>

              <h1 className="font-display leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.25rem)' }}>
                <span style={{ color: 'var(--fg)' }}>Where New Businesses</span>
                <br />
                <span
                  style={{
                    background: `linear-gradient(135deg, ${INDIGO} 0%, #C7D2FE 45%, ${GOLD} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Take Shape.
                </span>
              </h1>

              <p className="text-slate-300 leading-relaxed mb-10 max-w-2xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
                The diversified business platform of Network71 — identifying new opportunities across industries,
                structuring joint ventures and strategic partnerships, and taking the group&apos;s divisions into
                new international markets.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#sector-contact"
                  className="px-8 py-3.5 font-semibold text-sm rounded-lg transition-all hover:opacity-90"
                  style={{ background: INDIGO, color: 'var(--s0)' }}
                >
                  Propose a Venture
                </a>
                <a
                  href="#models"
                  className="px-8 py-3.5 border text-sm font-medium text-white rounded-lg hover:bg-white/5 transition-colors"
                  style={{ borderColor: `color-mix(in srgb, ${INDIGO} 35%, transparent)` }}
                >
                  How We Partner
                </a>
              </div>
            </div>

            {/* Ecosystem map */}
            <div className="hidden lg:block">
              <div
                className="rounded-2xl p-6"
                style={{ background: 'var(--fill-1)', border: `1px solid color-mix(in srgb, ${INDIGO} 18%, transparent)`, backdropFilter: 'blur(12px)' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: INDIGO }}>Ecosystem access</span>
                  <span className="font-mono text-[9px] text-slate-500">{ecosystem.length} operating divisions</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {ecosystem.map(id => (
                    <Link
                      key={id}
                      to={DIVISION_HREF[id]}
                      className="group rounded-xl p-3 transition-all duration-200 hover:-translate-y-0.5"
                      style={{ background: 'var(--s2)', border: '1px solid var(--line)' }}
                    >
                      <span className="block w-2 h-2 rounded-full mb-2.5" style={{ background: DIVISION_COLOR[id] }} />
                      <span className="block text-[11px] font-semibold text-white leading-snug">{t(divKey(id, 'short'))}</span>
                    </Link>
                  ))}
                </div>
                <p className="mt-5 text-[11px] text-slate-500 leading-relaxed">
                  Every venture can draw on manufacturing, sourcing, logistics, technology, media and maritime capability inside the group.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. METRICS ── */}
      <MetricsBar metrics={metrics} accentHex={INDIGO} dark />

      {/* ── 3. OVERVIEW ── */}
      <section className="py-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-14">
            <div className="h-px w-10" style={{ background: INDIGO }} />
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: INDIGO }}>Division Overview</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                A Diversified Platform for What Comes Next
              </h2>
              <p className="text-slate-300 leading-relaxed mb-5 text-sm">
                Network71 grows in two ways: by strengthening each operating division, and by creating new
                businesses where an opportunity, a partner and the group&apos;s capabilities meet. The
                International Business &amp; Strategic Ventures division owns the second path.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                It evaluates opportunities across industries, structures joint ventures and strategic partnerships,
                and leads international expansion — so that the whole ecosystem, not just one division, benefits
                from every new market we enter.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="p-5 rounded-xl"
                  style={{ background: `color-mix(in srgb, ${INDIGO} 3%, transparent)`, border: `1px solid color-mix(in srgb, ${INDIGO} 12%, transparent)` }}
                >
                  <div className="text-xs font-bold mb-3" style={{ color: INDIGO }}>◈ {p.title}</div>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. VENTURE MODELS ── */}
      <section id="models" className="py-24" style={{ background: BG_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: INDIGO }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: INDIGO }}>How We Partner</span>
              <div className="h-px w-8" style={{ background: INDIGO }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">Six Ways to Build Together</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              From co-owned operating companies to market-entry programmes, each structure is chosen to fit
              the opportunity — never the other way round.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ventureModels.map((m) => (
              <div
                key={m.title}
                className="group p-7 rounded-2xl cursor-default transition-all duration-300"
                style={{ background: 'var(--fill-1)', border: 'var(--border-subtle)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 24px color-mix(in srgb, ${m.color} 14%, transparent)`
                  e.currentTarget.style.borderColor = `color-mix(in srgb, ${m.color} 28%, transparent)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in srgb, ${m.color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${m.color} 20%, transparent)`, color: m.color }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d={m.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-white text-sm mb-3">{m.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{m.desc}</p>
                <div className="mt-5 h-px w-8 transition-all duration-300 group-hover:w-16" style={{ background: m.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS ── */}
      <ProcessFlow steps={processSteps} accentHex={INDIGO} label="From Opportunity to Operating Business" />

      {/* ── 6. WHO WE PARTNER WITH ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: BG_ALT }}>
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10" style={{ background: INDIGO }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: INDIGO }}>Who We Work With</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Partners Who Want to Build, Not Just Transact
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm mb-8">
                We look for partners with real operating intent and a long-term view. If you have a business,
                a technology or a market and want a committed counterpart in Bangladesh and South Asia, this
                is the division to speak with.
              </p>
              <a
                href="#sector-contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: INDIGO, color: 'var(--s0)' }}
              >
                Start a Conversation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {partnerProfiles.map((p, i) => (
                <div
                  key={p.title}
                  className="p-6 rounded-2xl"
                  style={{ background: 'var(--fill-1)', border: '1px solid var(--line)' }}
                >
                  <div className="font-mono text-[10px] mb-4" style={{ color: INDIGO }}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-semibold text-white text-sm mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. HONEST STATUS ── */}
      <section className="py-16" style={{ background: BG_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 lg:p-10 grid lg:grid-cols-[auto_1fr_auto] gap-6 items-center"
            style={{ background: `color-mix(in srgb, ${GOLD} 4%, transparent)`, border: `1px solid color-mix(in srgb, ${GOLD} 18%, transparent)` }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `color-mix(in srgb, ${GOLD} 10%, transparent)`, color: GOLD }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 3l9 16H3L12 3z" /></svg>
            </div>
            <div>
              <h3 className="font-semibold text-white text-base mb-1.5">Active ventures are published as they are approved</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We do not list partners, deals or portfolio companies until both sides have agreed to public disclosure.
                Approved ventures and case studies appear in <Link to="/projects" className="underline underline-offset-2" style={{ color: GOLD }}>Our Work</Link>.
              </p>
            </div>
            <Link to="/investors" className="text-sm font-semibold whitespace-nowrap" style={{ color: GOLD }}>Investor Relations →</Link>
          </div>
        </div>
      </section>

      {/* ── 8. CONTACT ── */}
      <SectorContact
        divisionName="Strategic Ventures"
        accentHex={INDIGO}
        inquiryTypes={['Joint Venture Proposal', 'Strategic Partnership', 'Market Entry', 'Investment Opportunity', 'Trade Corridor / Bilateral']}
      />

      </main>
      <Footer />
    </div>
  )
}
