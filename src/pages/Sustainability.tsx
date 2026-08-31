import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const metrics = [
  { label: "Carbon Reduction", value: 40, unit: "%", desc: "Reduction in operational carbon emissions vs. 2021 baseline", color: "from-emerald-400 to-green-500" },
  { label: "Renewable Energy", value: 35, unit: "%", desc: "Of total energy consumption from renewable sources", color: "from-teal-400 to-cyan-500" },
  { label: "Waste Reduction", value: 60, unit: "%", desc: "Less solid waste sent to landfill across production facilities", color: "from-amber-400 to-yellow-500" },
  { label: "Water Conservation", value: 60, unit: "%", desc: "Improvement in water use efficiency at agricultural operations", color: "from-blue-400 to-indigo-500" },
];

const sdgs = [
  {
    number: "8",
    title: "Decent Work & Economic Growth",
    desc: "Creating quality employment across all eight divisions, with fair wages, safe conditions, and career development pathways for 5,000+ employees.",
    color: "bg-amber-600",
  },
  {
    number: "9",
    title: "Industry, Innovation & Infrastructure",
    desc: "Investing in modern manufacturing infrastructure and digital platforms like Ezyify to drive industrial innovation across Bangladesh and beyond.",
    color: "bg-orange-600",
  },
  {
    number: "12",
    title: "Responsible Consumption & Production",
    desc: "Reducing waste, adopting circular economy practices, and sourcing raw materials from verified responsible suppliers.",
    color: "bg-amber-700",
  },
  {
    number: "13",
    title: "Climate Action",
    desc: "Committed to reducing our carbon footprint through renewable energy investment, emissions tracking, and science-based reduction targets.",
    color: "bg-green-700",
  },
  {
    number: "17",
    title: "Partnerships for the Goals",
    desc: "Collaborating with NGOs, government bodies, and international organisations to amplify sustainable development outcomes in our communities.",
    color: "bg-blue-700",
  },
];

const commitments = [
  {
    title: "Net Zero by 2040",
    desc: "We are working toward net-zero operational carbon emissions by 2040 across all Network71 divisions and subsidiaries globally.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "Responsible Sourcing",
    desc: "All agricultural and manufacturing inputs are subject to environmental and social due diligence, prioritising local and certified suppliers.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: "Transparency & Reporting",
    desc: "Annual sustainability reports aligned with GRI standards, providing stakeholders with verified data on our environmental and social performance.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
];

const programs = [
  {
    title: "Farmer Support Program",
    desc: "Direct financial aid, training, and market access for smallholder farmers supplying Network71 agro divisions.",
    stat: "12,000+",
    statLabel: "Farmers Supported",
    color: "from-green-500 to-emerald-600",
    icon: "🌾",
  },
  {
    title: "Skills Training Initiative",
    desc: "Vocational training programs providing job-ready skills in garment manufacturing, food processing, and logistics.",
    stat: "8,500+",
    statLabel: "People Trained",
    color: "from-blue-500 to-indigo-600",
    icon: "📚",
  },
  {
    title: "Education Initiative",
    desc: "Scholarships and school infrastructure investment in underserved communities near our operational zones.",
    stat: "3,200+",
    statLabel: "Students Reached",
    color: "from-purple-500 to-violet-600",
    icon: "🎓",
  },
  {
    title: "Women in Workforce",
    desc: "Dedicated recruitment, mentorship, and leadership pathways empowering women across all Network71 divisions.",
    stat: "13,800+",
    statLabel: "Women Employed",
    color: "from-pink-500 to-rose-600",
    icon: "👩‍💼",
  },
];

function ProgressBar({ metric, animate }: { metric: typeof metrics[0]; animate: boolean }) {
  return (
    <div className="bg-navy-light rounded-xl p-6 border border-white/8">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-white font-semibold">{metric.label}</h3>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed">{metric.desc}</p>
        </div>
        <span className={`text-3xl font-display font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent ml-4 flex-shrink-0`}>
          {metric.value}{metric.unit}
        </span>
      </div>
      <div className="h-2.5 bg-white/8 rounded-full overflow-hidden mt-4">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-1000 ease-out`}
          style={{ width: animate ? `${metric.value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function Sustainability() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMetricsVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-navy text-slate-100">
      <Header />

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-[68px] bg-navy-dark">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-dark/50 to-navy-dark" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            ESG & Sustainability
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-[-0.02em]">
            Building for Tomorrow
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Sustainable business is not a commitment we make to the future — it is how we operate today. Across every division, every country, every decision.
          </p>
        </div>
      </section>

      {/* ── Progress Metrics ── */}
      <section className="py-24 px-6 bg-navy" ref={metricsRef}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">Our Progress</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">Measurable Impact</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Key environmental performance indicators tracked against our 2021 baseline year.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {metrics.map((m) => (
              <ProgressBar key={m.label} metric={m} animate={metricsVisible} />
            ))}
          </div>
          <p className="text-slate-500 text-xs text-center mt-6">
            * Data represents internal estimates. Verified third-party audit in progress for FY2025 report.
          </p>
        </div>
      </section>

      {/* ── SDG Alignment ── */}
      <section className="py-24 px-6 bg-navy-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">UN SDGs</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">SDG Alignment</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Network71 aligns its operations and community investments with five UN Sustainable Development Goals.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sdgs.map((sdg) => (
              <div key={sdg.number} className="bg-navy rounded-xl p-6 border border-white/8 hover:border-gold/20 transition-colors group">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${sdg.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-display font-bold text-lg">{sdg.number}</span>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-1">SDG {sdg.number}</div>
                    <h3 className="text-white font-semibold text-sm leading-snug">{sdg.title}</h3>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{sdg.desc}</p>
              </div>
            ))}
            {/* Filler card to balance grid */}
            <div className="bg-navy rounded-xl p-6 border border-white/5 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-3">🌱</div>
                <p className="text-slate-400 text-sm">Additional SDG alignments to be published in our 2025 Sustainability Report.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Environmental Commitments ── */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">Commitments</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">Environmental Commitments</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {commitments.map((c) => (
              <div key={c.title} className="bg-navy-dark rounded-xl p-6 border border-white/8 hover:border-gold/25 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 text-gold flex items-center justify-center mb-5">
                  {c.icon}
                </div>
                <h3 className="text-white font-semibold mb-3">{c.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Programs ── */}
      <section className="py-24 px-6 bg-navy-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">Social Impact</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">Community Programs</h2>
          </div>

          {/* Headline stat */}
          <div className="text-center mb-14">
            <div className="inline-flex flex-col items-center bg-gold/10 border border-gold/20 rounded-2xl px-12 py-8">
              <span className="text-5xl sm:text-6xl font-display font-bold text-gold mb-2">37,500+</span>
              <span className="text-white font-medium text-lg">Lives Impacted</span>
              <span className="text-slate-400 text-sm mt-1">Through community programs across our operating regions</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((p) => (
              <div key={p.title} className="bg-navy rounded-xl p-5 border border-white/8 hover:border-white/15 transition-colors">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl mb-4`}>
                  {p.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{p.desc}</p>
                <div className="border-t border-white/8 pt-3">
                  <div className={`text-xl font-display font-bold bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>{p.stat}</div>
                  <div className="text-slate-500 text-xs">{p.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Report Download ── */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-3xl mx-auto">
          <div className="bg-navy-dark rounded-2xl p-8 border border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-amber-500/15 text-amber-400 border border-amber-500/25 mb-3 font-mono text-[9px] tracking-wide uppercase rounded-full">
                Coming Soon
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">FY2025 Sustainability Report</h3>
              <p className="text-slate-400 text-sm">
                Our comprehensive annual sustainability report — including verified environmental data, community impact metrics, and governance disclosure — will be published in Q1 2026.
              </p>
            </div>
            <button disabled className="px-6 py-3 rounded-lg bg-white/5 text-slate-400 text-sm font-medium border border-white/10 cursor-not-allowed flex-shrink-0">
              Download PDF
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-navy-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-5 tracking-[-0.02em]">
            Sustainability Inquiries
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            For partnership opportunities, ESG data requests, or to learn more about our sustainability programmes, reach out to our team.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gold text-navy font-semibold hover:bg-gold-light transition-colors"
          >
            Contact Our ESG Team
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
