import { useState, useEffect, useRef, type ReactNode } from "react"
import { Link } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// ── Count-up hook (same pattern as Hero.tsx) ──────────────────────────────────
function useCountUp(target: number, duration = 2400, enabled = false): number {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!enabled) return
    let raf: number
    const start = Date.now()
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, enabled])
  return count
}

const statsData = [
  { value: 25, suffix: "+", label: "Countries", sub: "Global reach" },
  { value: 5000, suffix: "+", label: "Employees", sub: "Worldwide team" },
  { value: 8, suffix: "", label: "Divisions", sub: "Industry sectors" },
  { value: 150, suffix: "M+", label: "Revenue (USD)", sub: "Annual turnover" },
]

function StatItem({
  target,
  suffix,
  label,
  sub,
  enabled,
}: {
  target: number
  suffix: string
  label: string
  sub: string
  enabled: boolean
}) {
  const count = useCountUp(target, 2400, enabled)
  return (
    <div className="text-center">
      <div className="font-display text-4xl sm:text-5xl text-white">
        {count}
        {suffix}
      </div>
      <div className="text-gold text-xs font-semibold tracking-widest uppercase mt-1">{label}</div>
      <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
    </div>
  )
}

// SVG icon paths for Core Values — consistent with the rest of the site
const VALUE_ICONS: Record<string, ReactNode> = {
  Integrity: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  Innovation: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  Collaboration: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  Excellence: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  Sustainability: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.249 2.249 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643" />
    </svg>
  ),
}

const values = [
  { title: "Integrity",      desc: "Honest dealings in every market we serve.",       color: '#C8962A' },
  { title: "Innovation",     desc: "Technology and fresh thinking at our core.",       color: '#22D3EE' },
  { title: "Collaboration",  desc: "Partners, teams, and communities unified.",        color: '#0D9488' },
  { title: "Excellence",     desc: "World-class standards across all divisions.",      color: '#C8962A' },
  { title: "Sustainability", desc: "Building responsibly for future generations.",     color: '#0D9488' },
]

const timeline = [
  { year: "2018", title: "Founded", detail: "Network71 established in Dhaka, Bangladesh. Began with trading operations, laying the groundwork for a diversified global enterprise.", side: "left" },
  { year: "2019", title: "First Manufacturing Facility", detail: "Opened our first manufacturing facility, accelerating production capacity and establishing Network71 as a credible industrial operator.", side: "right" },
  { year: "2020", title: "Multi-Sector Portfolio", detail: "Added Food & Beverage and Oils & Energy divisions, building a resilient multi-sector portfolio and diversified revenue base.", side: "left" },
  { year: "2021", title: "Five Divisions Established", detail: "Expanded to five business divisions including IT & Software — beginning the technology transformation that would define our next chapter.", side: "right" },
  { year: "2022", title: "International Scale", detail: "Trade network extended across the Middle East, Europe, and Southeast Asia. Revenue trajectory accelerating toward global benchmarks.", side: "left" },
  { year: "2023", title: "Ezyify AI Platform Launched", detail: "Launched Ezyify — an AI-powered global e-commerce and social media ecosystem. A landmark step in our technology-led growth strategy.", side: "right" },
  { year: "2024", title: "Today", detail: "Present operations spanning 25+ countries with $150M+ annual revenue across eight diversified sectors.", side: "left" },
]

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-full">
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-400">About</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-12 bg-gold" />
            <span className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium">Our Story</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-6">
            About Network71
          </h1>
          <p className="text-slate-300 text-xl max-w-xl leading-relaxed">
            {"Building tomorrow's global enterprise, today."}
          </p>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy-dark border-y border-white/8">
        <div ref={statsRef} className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {statsData.map((s) => (
              <StatItem
                key={s.label}
                target={s.value}
                suffix={s.suffix}
                label={s.label}
                sub={s.sub}
                enabled={started}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Company story ─────────────────────────────────────────────────────── */}
      <section className="bg-navy py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-12 bg-gold" />
                <span className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium">Our Origins</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-white mb-6 leading-tight tracking-[-0.02em]">
                From Dhaka to the World
              </h2>
              <p className="text-slate-400 leading-relaxed mb-5">
                Network71 was founded in 2018 in Dhaka, Bangladesh. What began as a trading company with a clear vision quickly grew into one of the region's most ambitious diversified enterprises — spanning eight distinct industry sectors across 25+ countries.
              </p>
              <p className="text-slate-400 leading-relaxed mb-5">
                Our journey is rooted in a belief that emerging markets hold extraordinary potential. By combining local expertise with global networks, we have built bridges between communities, businesses, and opportunity on a scale rarely seen from South Asia.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Today, Network71 operates eight business divisions — from garments and agriculture to technology and maritime — united by a shared commitment to excellence, sustainability, and long-term value creation for every stakeholder we serve.
              </p>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: 420 }}>
                {/* Background image */}
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=700&fit=crop&auto=format"
                  alt="Network71 global headquarters"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(4,8,14,0.88) 0%, rgba(4,8,14,0.75) 60%, rgba(4,8,14,0.55) 100%)' }} />
                {/* Content overlay */}
                <div className="relative p-10">
                  <div className="grid grid-cols-2 gap-4">
                    {["Garments & Apparel", "Agriculture & Agro", "Food & Beverage", "Oils & Energy", "IT & Software", "Global Trading", "Media", "eSHIPe Maritime"].map((div) => (
                      <div key={div} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                        <span className="text-slate-200 text-sm">{div}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                    <p className="text-xs text-slate-400 uppercase tracking-widest">Active Divisions</p>
                    <p className="font-display text-4xl text-gold mt-1">8 Divisions</p>
                    <p className="text-slate-400 text-xs mt-1">Across 25+ countries globally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision / Mission ──────────────────────────────────────────────────── */}
      <section className="bg-navy-dark py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium">Purpose</span>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">Vision & Mission</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-navy border border-white/8 rounded-2xl p-10 relative overflow-hidden group hover:border-gold/30 transition-colors duration-300">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold/5 blur-2xl pointer-events-none group-hover:bg-gold/8 transition-colors duration-300" />
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">Vision</p>
              <h3 className="font-display text-2xl text-white mb-4">Leading Multinational</h3>
              <p className="text-slate-400 leading-relaxed">
                To be a leading multinational enterprise driving economic transformation across emerging markets.
              </p>
            </div>
            <div className="bg-navy border border-white/8 rounded-2xl p-10 relative overflow-hidden group hover:border-gold/30 transition-colors duration-300">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-teal/5 blur-2xl pointer-events-none group-hover:bg-teal/8 transition-colors duration-300" />
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">Mission</p>
              <h3 className="font-display text-2xl text-white mb-4">Sustainable Value</h3>
              <p className="text-slate-400 leading-relaxed">
                To create sustainable value through diversified industry leadership, innovation, and global connectivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CEO Quote ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/4 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="font-display text-[120px] leading-none text-gold/15 select-none mb-[-2rem]">"</div>
          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl text-white leading-snug mb-10">
            We are building more than a company — we are building a bridge between emerging markets and global opportunity.
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <span className="text-gold font-display text-lg">T</span>
            </div>
            <div className="text-left">
              <p className="text-white font-semibold text-sm">Tanjijur Rahman Topon</p>
              <p className="text-gold text-xs tracking-wide">Founder & CEO, Network71</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────────────────── */}
      <section className="bg-navy-dark py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium">Principles</span>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl p-6 text-center group transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.028)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${v.color}30`; e.currentTarget.style.background = 'rgba(255,255,255,0.042)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.028)' }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 11,
                  background: `${v.color}14`, border: `1px solid ${v.color}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px', color: v.color,
                }}>
                  {VALUE_ICONS[v.title]}
                </div>
                <h3 className="font-display text-base text-white mb-2" style={{ letterSpacing: '-0.01em' }}>{v.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership teaser ─────────────────────────────────────────────────── */}
      <section className="bg-navy py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gold" />
                <span className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium">Team</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">Leadership</h2>
            </div>
            <Link
              to="/leadership"
              className="text-sm text-gold border border-gold/30 px-5 py-2.5 rounded hover:bg-gold/10 transition-colors"
            >
              View Full Team →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { name: "Tanjijur Rahman Topon", title: "Founder & CEO" },
              { name: "To Be Announced", title: "Executive Director" },
              { name: "To Be Announced", title: "Chief Operating Officer" },
            ].map((person) => (
              <div key={person.title} className="bg-navy-light border border-white/8 rounded-2xl overflow-hidden group hover:border-gold/25 transition-colors duration-300">
                <div className="w-full h-52 bg-slate-800/60 flex items-center justify-center">
                  <svg className="w-16 h-16 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-white mb-1 group-hover:text-gold transition-colors">{person.name}</h3>
                  <p className="text-gold text-xs tracking-wide">{person.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────────── */}
      <section className="bg-navy-dark py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium">History</span>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">Our Journey</h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-white/10 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((entry, i) => (
                <div key={entry.year} className={`relative flex flex-col md:flex-row items-center gap-6 ${entry.side === "right" ? "md:flex-row-reverse" : ""}`}>
                  {/* Content box */}
                  <div className="md:w-[45%]">
                    <div className={`bg-navy border border-white/8 rounded-xl p-6 hover:border-gold/25 transition-colors duration-300 ${entry.side === "right" ? "md:text-right" : ""}`}>
                      <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">{entry.year}</p>
                      <h3 className="font-display text-xl text-white mb-2">{entry.title}</h3>
                      <p className="text-slate-500 text-sm">{entry.detail}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-navy-dark border-2 border-gold items-center justify-center z-10">
                    <span className="font-display text-gold text-xs">{i + 1}</span>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────────── */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4 tracking-[-0.02em]">Join Our Global Team</h2>
          <p className="text-slate-400 text-lg mb-10">
            {"Be part of the team that's shaping the future of emerging markets."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/careers"
              className="px-8 py-3.5 bg-gold text-navy text-sm font-semibold rounded hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
            >
              Explore Careers
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-white/20 text-white text-sm font-medium rounded hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
