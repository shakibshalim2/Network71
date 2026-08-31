import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Avatar({ initials, gradient, size = "lg" }: { initials: string; gradient: string; size?: "lg" | "md" | "sm" }) {
  const sizes = {
    lg: "w-28 h-28 text-3xl",
    md: "w-20 h-20 text-xl",
    sm: "w-16 h-16 text-lg",
  };
  return (
    <div className={`${sizes[size]} rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 font-display font-bold text-white shadow-lg`}>
      {initials}
    </div>
  );
}

const seniorLeaders = [
  {
    title: "Chief Financial Officer",
    abbr: "CFO",
    gradient: "from-blue-500 to-indigo-600",
    initials: "CFO",
    responsibilities: "Financial strategy, treasury, investor relations, and compliance across all Network71 divisions.",
  },
  {
    title: "Chief Operating Officer",
    abbr: "COO",
    gradient: "from-emerald-500 to-teal-600",
    initials: "COO",
    responsibilities: "Cross-divisional operations, supply chain coordination, and enterprise performance management.",
  },
  {
    title: "Chief Technology Officer",
    abbr: "CTO",
    gradient: "from-purple-500 to-violet-600",
    initials: "CTO",
    responsibilities: "Technology vision, Ezyify platform leadership, digital transformation, and IT infrastructure.",
  },
];

const advisors = [
  {
    gradient: "from-amber-500 to-orange-600",
    initials: "ADV",
    area: "Strategic Advisory",
    desc: "Senior industry advisor with expertise in international trade and multi-sector conglomerate development.",
  },
  {
    gradient: "from-pink-500 to-rose-600",
    initials: "ADV",
    area: "ESG & Governance Advisory",
    desc: "Independent advisor specialising in sustainability reporting, corporate governance, and stakeholder engagement.",
  },
];

export default function Leadership() {
  return (
    <div className="min-h-screen bg-navy text-slate-100">
      <Header />

      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-[68px] bg-navy-dark">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-dark/50 to-navy-dark" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Executive Team
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-[-0.02em]">
            Our Leadership
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            The executive team driving Network71&apos;s vision of a diversified, technology-enabled global enterprise — built on integrity, innovation, and long-term thinking.
          </p>
        </div>
      </section>

      {/* ── CEO Feature Card ── */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">Founder & CEO</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">Chief Executive</h2>
          </div>

          {/* CEO Card — prominent, gold accent border */}
          <div className="relative rounded-2xl p-8 sm:p-10 border-2 border-gold/40 bg-navy-dark overflow-hidden shadow-2xl shadow-gold/5">
            {/* Gold glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-8 pointer-events-none" style={{ background: "radial-gradient(circle, #E6B800, transparent)" }} />
            <div className="absolute top-0 right-0 w-48 h-px bg-gradient-to-l from-gold/60 to-transparent" />
            <div className="absolute bottom-0 left-0 w-48 h-px bg-gradient-to-r from-gold/60 to-transparent" />

            <div className="relative z-10 flex flex-col sm:flex-row gap-8">
              {/* Avatar */}
              <div className="flex flex-col items-center sm:items-start gap-4">
                <Avatar initials="TRT" gradient="from-gold to-amber-500" size="lg" />
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/15 border border-gold/30 rounded-full text-gold text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    Founder & CEO
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
                  Tanjijur Rahman Topon
                </h3>
                <p className="text-slate-400 text-sm mb-6">Founder &amp; Chief Executive Officer &nbsp;&bull;&nbsp; Dhaka, Bangladesh</p>

                {/* Quote */}
                <blockquote className="border-l-2 border-gold pl-5 mb-6">
                  <p className="text-slate-300 italic leading-relaxed text-lg">
                    "We are building more than a company — we are building an institution. One that creates value across borders, empowers communities, and stands for something beyond profit."
                  </p>
                </blockquote>

                <div className="bg-white/4 rounded-xl p-5 border border-white/8">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <span className="text-white text-sm font-semibold">Executive Profile</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Full biography and executive profile to be published. Tanjijur Rahman Topon founded Network71 with a vision to build a world-class multi-sector conglomerate headquartered in Bangladesh and operating globally across eight core industries.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Global Strategy", "Multi-Sector Operations", "Entrepreneurship", "Technology Vision", "International Trade"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300 text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Senior Leadership Grid ── */}
      <section className="py-24 px-6 bg-navy-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">Executive Team</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">Senior Leadership</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Network71&apos;s senior executive team oversees the strategic and operational functions across all divisions.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {seniorLeaders.map((leader) => (
              <div key={leader.abbr} className="bg-navy rounded-xl p-6 border border-white/8 hover:border-white/15 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <Avatar initials={leader.initials} gradient={leader.gradient} size="md" />
                  <div className="mt-5 mb-2">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-2">
                      {leader.abbr}
                    </div>
                    <h3 className="text-white font-semibold">{leader.title}</h3>
                    <p className="text-gold/80 text-xs mt-1 font-medium">Name: To be published</p>
                  </div>
                  <div className="w-full h-px bg-white/8 my-4" />
                  <p className="text-slate-400 text-xs leading-relaxed">{leader.responsibilities}</p>
                  <div className="mt-4 w-full py-2.5 rounded-lg bg-white/4 border border-white/8 text-slate-500 font-mono text-[9px] tracking-wide uppercase">
                    Profile: Coming Soon
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Board of Directors ── */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">Governance</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">Board of Directors</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              The Board provides strategic oversight, fiduciary responsibility, and governance guidance for Network71 globally.
            </p>
          </div>

          <div className="bg-navy-dark rounded-2xl p-10 border border-white/8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div className="inline-block px-4 py-1.5 bg-amber-500/15 text-amber-400 border border-amber-500/25 mb-5 font-mono text-[9px] tracking-wide uppercase rounded-full">
              To Be Published
            </div>
            <h3 className="text-white font-semibold text-xl mb-3">Board Composition</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              The full composition of Network71&apos;s Board of Directors — including independent directors, committee assignments, and governance charter — will be published in the upcoming Corporate Governance Report.
            </p>
          </div>
        </div>
      </section>

      {/* ── Advisors ── */}
      <section className="py-24 px-6 bg-navy-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">Advisory</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">Strategic Advisors</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Our advisory panel brings deep expertise across international business, technology, and governance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {advisors.map((a, i) => (
              <div key={i} className="bg-navy rounded-xl p-6 border border-white/8 hover:border-white/15 transition-colors">
                <div className="flex items-start gap-5">
                  <Avatar initials={a.initials} gradient={a.gradient} size="sm" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-2">{a.area}</div>
                    <h3 className="text-white font-semibold mb-1">Name: To be published</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{a.desc}</p>
                    <div className="mt-4 inline-block px-3 py-1 bg-white/4 border border-white/10 rounded-full text-slate-500 font-mono text-[9px] tracking-wide uppercase">
                      Profile: Coming Soon
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join Our Leadership Team CTA ── */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-navy-dark rounded-2xl p-10 border border-white/8 relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/25 flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-5 tracking-[-0.02em]">
                Join Our Leadership Team
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Network71 is actively building its executive and senior management team. If you are a driven leader with experience in multi-sector operations, we would like to hear from you.
              </p>
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gold text-navy font-semibold hover:bg-gold-light transition-colors"
              >
                Explore Opportunities
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
