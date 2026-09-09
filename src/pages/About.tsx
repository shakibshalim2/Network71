import { type ReactNode } from "react"
import { Link } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

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
  { title: "Innovation",     desc: "Technology and fresh thinking at our core.",       color: 'var(--accent-cyan)' },
  { title: "Collaboration",  desc: "Partners, teams, and communities unified.",        color: 'var(--accent-teal)' },
  { title: "Excellence",     desc: "World-class standards across all divisions.",      color: '#C8962A' },
  { title: "Sustainability", desc: "Building responsibly for future generations.",     color: 'var(--accent-teal)' },
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
  return (
    <div className="min-h-full">
      <Header />
      <main className="public-content">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-navy overflow-hidden"
        style={{
          /* Clear the fixed header on every device rather than a flat pt-32 */
          paddingTop: 'calc(var(--header-h) + clamp(36px, 8vw, 72px))',
          paddingBottom: 'clamp(44px, 9vw, 80px)',
        }}
      >
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div
          className="absolute -top-24 -right-24 rounded-full bg-gold/5 blur-3xl pointer-events-none"
          style={{ width: 'min(384px, 80vw)', aspectRatio: '1' }}
        />
        <div className="relative container-page">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6 sm:mb-8">
            <Link to="/" className="tap-inline hover:text-gold transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-400" aria-current="page">About</span>
          </nav>
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="h-px w-8 sm:w-12 bg-gold shrink-0" />
            <span className="font-mono text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em] text-gold uppercase font-medium">Our Story</span>
          </div>
          <h1
            className="font-display text-white leading-[1.06] tracking-[-0.02em] mb-4 sm:mb-6"
            style={{ fontSize: 'clamp(34px, 8.5vw, 72px)' }}
          >
            About Network71
          </h1>
          <p className="text-slate-300 max-w-xl leading-relaxed" style={{ fontSize: 'clamp(15px, 3.8vw, 20px)' }}>
            {"Building tomorrow's global enterprise, today."}
          </p>
        </div>
      </section>

      {/* ── Company story ─────────────────────────────────────────────────────── */}
      <section className="bg-navy section-y">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="h-px w-8 sm:w-12 bg-gold shrink-0" />
                <span className="font-mono text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em] text-gold uppercase font-medium">Our Origins</span>
              </div>
              <h2
                className="font-display text-white mb-5 sm:mb-6 leading-tight tracking-[-0.02em]"
                style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}
              >
                From Dhaka to the World
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4 sm:mb-5 text-[14px] sm:text-base">
                Network71 was founded in 2018 in Dhaka, Bangladesh. What began as a trading company with a clear vision quickly grew into one of the region's most ambitious diversified enterprises — spanning ten business divisions and international markets.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4 sm:mb-5 text-[14px] sm:text-base">
                Our journey is rooted in a belief that emerging markets hold extraordinary potential. By combining local expertise with global networks, we have built bridges between communities, businesses, and opportunity on a scale rarely seen from South Asia.
              </p>
              <p className="text-slate-400 leading-relaxed text-[14px] sm:text-base">
                Today, Network71 operates eight business divisions — from garments and agriculture to technology and maritime — united by a shared commitment to excellence, sustainability, and long-term value creation for every stakeholder we serve.
              </p>
            </div>
            {/*
              Photo panel with the division list laid over it. Kept as a
              permanently dark card in both themes so the white list text and
              the photograph stay legible — hence `force-dark`.
            */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl force-dark min-h-[340px] sm:min-h-[400px] lg:min-h-[420px]">
                {/* Background image */}
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=700&fit=crop&auto=format"
                  alt="Network71 global headquarters"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgb(4 8 14 / 0.90) 0%, rgb(4 8 14 / 0.78) 60%, rgb(4 8 14 / 0.58) 100%)' }}
                />
                {/* Content overlay */}
                <div className="relative p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-4 gap-y-3 sm:gap-4">
                    {["Garments & Apparel", "Agriculture & Agro", "Food & Beverage", "Oils & Energy", "IT & Software", "Global Trading", "Media", "eSHIPe Maritime"].map((div) => (
                      <div key={div} className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                        <span className="text-slate-200 text-[13px] sm:text-sm">{div}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-white/12">
                    <p className="text-[10.5px] sm:text-xs text-slate-400 uppercase tracking-widest">Active Divisions</p>
                    <p className="font-display text-3xl sm:text-4xl text-gold mt-1">8 Divisions</p>
                    <p className="text-slate-400 text-[10.5px] sm:text-xs mt-1">Across 25+ countries globally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision / Mission ──────────────────────────────────────────────────── */}
      <section className="bg-navy-dark section-y">
        <div className="container-page">
          <div className="text-center mb-9 sm:mb-14">
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4">
              <div className="h-px w-8 sm:w-12 bg-gold" />
              <span className="font-mono text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em] text-gold uppercase font-medium">Purpose</span>
              <div className="h-px w-8 sm:w-12 bg-gold" />
            </div>
            <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
              Vision &amp; Mission
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
            <div className="bg-navy border border-white/8 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group hover:border-gold/30 transition-colors duration-300">
              <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gold/5 blur-2xl pointer-events-none group-hover:bg-gold/8 transition-colors duration-300" />
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gold text-[10.5px] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-widest uppercase mb-3">Vision</p>
              <h3 className="font-display text-xl sm:text-2xl text-white mb-3 sm:mb-4">Leading Multinational</h3>
              <p className="text-slate-400 leading-relaxed text-[14px] sm:text-base">
                To be a leading multinational enterprise driving economic transformation across emerging markets.
              </p>
            </div>
            <div className="bg-navy border border-white/8 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group hover:border-gold/30 transition-colors duration-300">
              <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-teal/5 blur-2xl pointer-events-none group-hover:bg-teal/8 transition-colors duration-300" />
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <p className="text-gold text-[10.5px] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-widest uppercase mb-3">Mission</p>
              <h3 className="font-display text-xl sm:text-2xl text-white mb-3 sm:mb-4">Sustainable Value</h3>
              <p className="text-slate-400 leading-relaxed text-[14px] sm:text-base">
                To create sustainable value through diversified industry leadership, innovation, and global connectivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CEO Quote ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy section-y relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/4 blur-3xl pointer-events-none"
          style={{ width: 'min(600px, 110vw)', aspectRatio: '1' }}
        />
        <div className="relative container-page max-w-4xl text-center">
          <div
            className="font-display leading-none text-gold select-none"
            style={{ fontSize: 'clamp(72px, 16vw, 120px)', marginBottom: 'clamp(-2rem, -3vw, -1rem)' }}
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <blockquote
            className="font-display text-white leading-snug mb-7 sm:mb-10 text-balance"
            style={{ fontSize: 'clamp(19px, 5vw, 36px)' }}
          >
            We are building more than a company — we are building a bridge between emerging markets and global opportunity.
          </blockquote>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <span className="text-gold font-display text-base sm:text-lg">T</span>
            </div>
            <div className="text-left">
              <p className="text-white font-semibold text-[13px] sm:text-sm">Tanjijur Rahman Topon</p>
              <p className="text-gold text-[11px] sm:text-xs tracking-wide">Founder &amp; CEO, Network71</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────────────────── */}
      <section className="bg-navy-dark section-y">
        <div className="container-page">
          <div className="text-center mb-9 sm:mb-14">
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4">
              <div className="h-px w-8 sm:w-12 bg-gold" />
              <span className="font-mono text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em] text-gold uppercase font-medium">Principles</span>
              <div className="h-px w-8 sm:w-12 bg-gold" />
            </div>
            <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
              Core Values
            </h2>
          </div>
          {/*
            Five items never divide evenly. At sm/md the last card would sit
            alone, so it is centred across both columns; from lg the row of 5
            works as designed.
          */}
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`rounded-xl p-5 sm:p-6 text-center group transition-all duration-300 ${
                  i === values.length - 1
                    ? 'min-[420px]:col-span-2 min-[420px]:max-w-sm min-[420px]:mx-auto min-[420px]:w-full md:col-span-1 md:max-w-none'
                    : ''
                }`}
                style={{
                  background: 'var(--fill-1)',
                  border: '1px solid var(--line-strong)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `color-mix(in srgb, ${v.color} 19%, transparent)`; e.currentTarget.style.background = 'var(--fill-2)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.background = 'var(--fill-1)' }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 11,
                  background: `color-mix(in srgb, ${v.color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${v.color} 16%, transparent)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px', color: v.color,
                }}>
                  {VALUE_ICONS[v.title]}
                </div>
                <h3 className="font-display text-[15px] sm:text-base text-white mb-2" style={{ letterSpacing: '-0.01em' }}>{v.title}</h3>
                <p className="text-slate-500 text-[11.5px] sm:text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership teaser ─────────────────────────────────────────────────── */}
      <section className="bg-navy section-y">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-5 sm:gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 sm:w-12 bg-gold shrink-0" />
                <span className="font-mono text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em] text-gold uppercase font-medium">Team</span>
              </div>
              <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
                Leadership
              </h2>
            </div>
            <Link
              to="/leadership"
              className="inline-flex items-center justify-center text-[13px] sm:text-sm text-gold border border-gold/30 px-5 py-2.5 rounded-lg hover:bg-gold/10 transition-colors self-start sm:self-auto shrink-0"
            >
              View Full Team →
            </Link>
          </div>
          <div className="grid min-[420px]:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { name: "Tanjijur Rahman Topon", title: "Founder & CEO" },
              { name: "To Be Announced", title: "Executive Director" },
              { name: "To Be Announced", title: "Chief Operating Officer" },
            ].map((person) => (
              <div key={person.title} className="bg-navy-light border border-white/8 rounded-2xl overflow-hidden group hover:border-gold/25 transition-colors duration-300">
                {/* Placeholder portrait — uses fill tokens so it reads in both themes */}
                <div
                  className="w-full h-40 sm:h-48 lg:h-52 flex items-center justify-center"
                  style={{ background: 'var(--fill-2)' }}
                >
                  <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--fg-faint)' }}>
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="font-display text-base sm:text-lg text-white mb-1 group-hover:text-gold transition-colors">{person.name}</h3>
                  <p className="text-gold text-[11px] sm:text-xs tracking-wide">{person.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────────── */}
      <section className="bg-navy-dark section-y">
        <div className="container-page max-w-5xl">
          <div className="text-center mb-9 sm:mb-16">
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4">
              <div className="h-px w-8 sm:w-12 bg-gold" />
              <span className="font-mono text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em] text-gold uppercase font-medium">History</span>
              <div className="h-px w-8 sm:w-12 bg-gold" />
            </div>
            <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
              Our Journey
            </h2>
          </div>

          {/*
            Two timeline treatments:
              < md  → single left-hand spine with inline markers, so entries
                      stay visually connected (previously the spine and the
                      numbered dots were simply hidden on mobile).
              ≥ md  → original alternating left/right layout.
          */}
          <div className="relative">
            {/* Spine — left on mobile, centred on desktop */}
            <div className="absolute top-0 bottom-0 w-px bg-white/10 left-[15px] md:left-1/2 md:-translate-x-px" />

            <ol className="space-y-7 sm:space-y-10 md:space-y-12 list-none m-0 p-0">
              {timeline.map((entry, i) => (
                <li
                  key={entry.year}
                  className={`relative flex items-start gap-4 md:items-center md:gap-6 ${
                    entry.side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  {/* Mobile marker — sits on the left spine */}
                  <div
                    className="md:hidden relative z-10 flex w-8 h-8 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-navy-dark"
                    aria-hidden="true"
                  >
                    <span className="font-display text-gold text-[10px]">{i + 1}</span>
                  </div>

                  {/* Content box */}
                  <div className="min-w-0 flex-1 md:flex-none md:w-[45%]">
                    <div className={`bg-navy border border-white/8 rounded-xl p-4 sm:p-5 md:p-6 hover:border-gold/25 transition-colors duration-300 ${entry.side === 'right' ? 'md:text-right' : ''}`}>
                      <p className="text-gold text-[10.5px] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-widest uppercase mb-2">{entry.year}</p>
                      <h3 className="font-display text-lg sm:text-xl text-white mb-2">{entry.title}</h3>
                      <p className="text-slate-500 text-[13px] sm:text-sm leading-relaxed">{entry.detail}</p>
                    </div>
                  </div>

                  {/* Desktop centre dot */}
                  <div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-navy-dark border-2 border-gold items-center justify-center z-10"
                    aria-hidden="true"
                  >
                    <span className="font-display text-gold text-xs">{i + 1}</span>
                  </div>

                  {/* Spacer keeps the alternating columns balanced */}
                  <div className="hidden md:block md:w-[45%]" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────────── */}
      <section className="bg-navy section-y relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="relative container-page max-w-4xl text-center">
          <h2
            className="font-display text-white mb-3 sm:mb-4 tracking-[-0.02em]"
            style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}
          >
            Join Our Global Team
          </h2>
          <p className="text-slate-400 mb-7 sm:mb-10" style={{ fontSize: 'clamp(14.5px, 3.6vw, 18px)' }}>
            {"Be part of the team that's shaping the future of emerging markets."}
          </p>
          <div className="flex flex-col min-[400px]:flex-row min-[400px]:flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              to="/careers"
              className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 bg-gold text-[13px] sm:text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
              style={{ color: 'var(--fg-onbrand)' }}
            >
              Explore Careers
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 border border-white/20 text-white text-[13px] sm:text-sm font-medium rounded-lg hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
