import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { openEmailDraft } from "@/lib/mailto"

const stats = [
  { value: "10M+", label: "Target Users", sub: "Global addressable audience" },
  { value: "$500M", label: "Market Potential", sub: "Projected market opportunity" },
  { value: "50+", label: "AI Models", sub: "Powering the platform" },
  { value: "99.9%", label: "Uptime SLA", sub: "Enterprise-grade reliability" },
]

const features = [
  {
    title: "AI Virtual Try-On",
    desc: "AR and image-based technology lets shoppers try products before buying — dramatically reducing return rates and boosting purchase confidence.",
    gradient: "from-purple-500 to-violet-600",
    sym: "✦",
  },
  {
    title: "Smart Personalized Feed",
    desc: "Machine learning curates a unique shopping experience for every user based on real-time behavioral signals and preferences.",
    gradient: "from-pink-500 to-rose-600",
    sym: "⬡",
  },
  {
    title: "Video Commerce",
    desc: "Shop directly from shoppable short-form video and live streams — making commerce a natural extension of content consumption.",
    gradient: "from-cyan-500 to-sky-600",
    sym: "▶",
  },
  {
    title: "Creator Marketplace",
    desc: "Creators earn commissions, build their brand, and sell digital and physical products through a dedicated storefront ecosystem.",
    gradient: "from-amber-500 to-orange-600",
    sym: "◈",
  },
  {
    title: "AI Chat Commerce",
    desc: "Conversational AI guides customers through discovery, selection, and checkout — turning engagement into revenue.",
    gradient: "from-emerald-500 to-teal-600",
    sym: "◎",
  },
  {
    title: "Cross-Border Commerce",
    desc: "Multi-currency, multi-language infrastructure enabling frictionless international buying and selling at scale.",
    gradient: "from-indigo-500 to-purple-600",
    sym: "◇",
  },
]

const segments = [
  {
    title: "Sellers",
    icon: "🏪",
    headline: "Launch your store in minutes",
    points: [
      "AI-assisted product listing and catalogue management",
      "Smart pricing recommendations powered by market data",
      "Integrated logistics, payments, and tax compliance",
      "Real-time analytics dashboard for sales and inventory",
    ],
    cta: "Start Selling",
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    title: "Creators",
    icon: "🎬",
    headline: "Build your brand. Monetise your reach.",
    points: [
      "Commission earning on every product you promote",
      "Dedicated creator storefront and digital product sales",
      "Brand collaboration tools and campaign management",
      "Audience analytics and content performance tracking",
    ],
    cta: "Join as Creator",
    gradient: "from-pink-600 to-rose-600",
  },
  {
    title: "Customers",
    icon: "🛍️",
    headline: "Discover. Try. Buy — smarter.",
    points: [
      "AI-curated product feeds tailored to your taste",
      "Try before you buy with AR virtual try-on",
      "Shop from videos, live streams, and creator posts",
      "Intelligent chatbot for discovery and support",
    ],
    cta: "Explore Products",
    gradient: "from-cyan-600 to-sky-600",
  },
  {
    title: "Network71 Divisions",
    icon: "🏢",
    headline: "The built-in supplier network",
    points: [
      "Direct access to N71&apos;s 6 business divisions",
      "Factory-to-consumer pricing advantage",
      "Verified, audited products",
      "Integrated logistics via N71 trading arm",
    ],
    cta: "Learn More",
    gradient: "from-violet-600 to-purple-700",
  },
]

const phases = [
  { phase: "Phase 1", name: "Core App", status: "completed", desc: "Platform foundation, seller onboarding, payment infrastructure" },
  { phase: "Phase 2", name: "AI Try-On", status: "in-progress", desc: "AR virtual try-on rollout across fashion and lifestyle categories" },
  { phase: "Phase 3", name: "Creator Marketplace", status: "upcoming", desc: "Full creator economy — storefronts, commissions, brand deals" },
  { phase: "Phase 4", name: "Cross-Border & Payments", status: "upcoming", desc: "Multi-currency expansion, cross-border trade, and global logistics" },
]

const aiModels = [
  {
    title: "Computer Vision",
    use: "AR Virtual Try-On",
    desc: "Deep learning models trained on millions of product images to enable real-time augmented reality fitting and overlay.",
    gradient: "from-purple-500 to-violet-600",
    icon: "👁",
  },
  {
    title: "NLP & Chatbots",
    use: "Chat Commerce",
    desc: "Large language models powering conversational shopping assistants that understand intent, recommend products, and process orders.",
    gradient: "from-pink-500 to-rose-600",
    icon: "💬",
  },
  {
    title: "Recommendation Systems",
    use: "Personalised Feed",
    desc: "Collaborative filtering and neural network rankers that learn each user&apos;s unique taste from behavioural signals in real time.",
    gradient: "from-cyan-500 to-sky-600",
    icon: "🎯",
  },
  {
    title: "Predictive Analytics",
    use: "Demand & Pricing",
    desc: "Time-series forecasting and dynamic pricing engines that help sellers optimise stock levels and maximise margin.",
    gradient: "from-emerald-500 to-teal-600",
    icon: "📈",
  },
]

const techBadges = [
  "React Native", "Python", "TensorFlow", "AWS",
  "PostgreSQL", "Redis", "Kubernetes", "WebGL",
]

const revenueStreams = [
  {
    title: "Marketplace Commission",
    icon: "💸",
    desc: "A percentage fee applied to every completed transaction on the platform. Scales directly with GMV as the seller base grows.",
    tag: "% TBP",
    gradient: "from-purple-500 to-indigo-600",
    donutColor: "var(--accent-purple)",
    share: 40,
  },
  {
    title: "SaaS Subscriptions",
    icon: "📊",
    desc: "Premium seller plans unlocking advanced analytics, brand tools, priority placement, and dedicated account management.",
    tag: "Monthly / Annual",
    gradient: "from-pink-500 to-rose-600",
    donutColor: "var(--accent-pink)",
    share: 30,
  },
  {
    title: "Creator Monetisation",
    icon: "🎬",
    desc: "Revenue share on creator-driven sales, brand deal facilitation fees, and digital product marketplace cuts.",
    tag: "Commission Split",
    gradient: "from-cyan-500 to-sky-600",
    donutColor: "#06B6D4",
    share: 20,
  },
  {
    title: "Data Intelligence",
    icon: "🔮",
    desc: "Enterprise-grade market insight reports and anonymised consumer trend data sold to brands and manufacturers.",
    tag: "Coming Soon",
    gradient: "from-amber-500 to-orange-600",
    donutColor: "var(--accent-amber)",
    share: 10,
  },
]

const n71Spokes = [
  { label: "Garments", icon: "👗", desc: "Sell fashion on Ezyify", angle: 0 },
  { label: "Agriculture", icon: "🌾", desc: "Fresh produce marketplace", angle: 60 },
  { label: "Food & Bev", icon: "🍽️", desc: "Food delivery + grocery", angle: 120 },
  { label: "Oils & Energy", icon: "⚡", desc: "B2B commodity trade", angle: 180 },
  { label: "IT & Software", icon: "💻", desc: "Platform builders", angle: 240 },
  { label: "Global Trading", icon: "🚢", desc: "Cross-border logistics", angle: 300 },
]

const partnerCards = [
  {
    icon: "🏪",
    audience: "Sellers & Brands",
    headline: "List your products on Ezyify",
    desc: "Get early access to millions of AI-matched shoppers. List your catalogue and benefit from our smart pricing and logistics tools from day one.",
    cta: "Join Seller Waitlist",
    href: null,
    gradient: "from-purple-500 to-indigo-600",
    borderHover: "rgba(168,85,247,0.3)",
  },
  {
    icon: "📈",
    audience: "Investors",
    headline: "Join the Ezyify growth story",
    desc: "Ezyify is Network71&apos;s flagship innovation platform targeting a $500M+ social commerce opportunity across South Asia, the Middle East, and beyond.",
    cta: "View Investor Deck",
    href: "/investors",
    gradient: "from-pink-500 to-rose-600",
    borderHover: "rgba(236,72,153,0.3)",
  },
  {
    icon: "🤝",
    audience: "Technology Partners",
    headline: "Integrate with our AI commerce platform",
    desc: "Build on top of the Ezyify API ecosystem. Payment gateways, logistics providers, and SaaS tools — let&apos;s build the future of commerce together.",
    cta: "Get in Touch",
    href: "/contact",
    gradient: "from-cyan-500 to-sky-600",
    borderHover: "rgba(6,182,212,0.3)",
  },
]

export default function EzyifyPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty("--mx", `${x}%`)
      el.style.setProperty("--my", `${y}%`)
    }
    el.addEventListener("mousemove", handler)
    return () => el.removeEventListener("mousemove", handler)
  }, [])

  const DARK = "var(--s0)"
  const DARK2 = "var(--s1)"

  return (
    <div className="min-h-screen" style={{ backgroundColor: DARK, color: 'var(--fg)' }}>
      <Header />
      <main className="public-content">

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="ezyify-page-hero relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[68px]"
        style={{ backgroundColor: DARK }}
      >
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(167,139,250,0.2) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20" style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15" style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[180px] opacity-10" style={{ background: "radial-gradient(ellipse, #ec4899, transparent 70%)" }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10" style={{ border: '1px solid rgba(168,85,247,0.3)', background: 'rgba(168,85,247,0.08)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" style={{ animation: 'pulse-slow 3s ease-in-out infinite' }} />
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: 'var(--accent-purple)' }}>Network71 · Product &amp; platform vision</span>
          </div>

          <h1
            className="font-display font-bold mb-5 leading-none tracking-[-0.02em]"
            style={{
              fontSize: "clamp(72px, 13vw, 130px)",
              background: "linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #06B6D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ezyify
          </h1>

          <p className="text-2xl sm:text-3xl text-white font-light mb-4 leading-snug">
            AI-Powered Global<br className="hidden sm:block" /> E-commerce Social Media Ecosystem
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed mb-12">
            Connecting sellers, creators, and customers through AI virtual try-on,
            video commerce, and intelligent personalization — on one unified platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <a
              href="https://ezyify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899, #0891B2)" }}
            >
              Visit Ezyify.com
            </a>
            <Link
              to="/investors"
              className="px-9 py-4 rounded-xl font-semibold text-slate-300 border border-white/15 hover:border-purple-500/40 hover:text-white transition-colors"
            >
              Invest in Ezyify
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-5 border border-white/5 text-center"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                <div className="font-display text-2xl sm:text-3xl font-bold mb-1" style={{ background: "linear-gradient(135deg, #A855F7, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {s.value}
                </div>
                <div className="text-white text-xs font-semibold mb-0.5">{s.label}</div>
                <div className="text-slate-500 text-[10px]">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${DARK2})` }} />
      </section>

      {/* ── User Segments ── */}
      <section className="py-24 px-6" style={{ backgroundColor: DARK2 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-4">Who It&apos;s For</p>
            <h2 className="font-display text-4xl text-white mb-4">Built for Four Ecosystems</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Ezyify unifies sellers, creators, customers, and the entire Network71 supplier network on one intelligent platform — creating value at every connection point.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {segments.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors"
                style={{ backgroundColor: DARK }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-2xl mb-6`}>
                  {s.icon}
                </div>
                <h3 className="font-display text-2xl text-white mb-1">{s.title}</h3>
                <p className="text-slate-400 text-sm mb-5">{s.headline}</p>
                <ul className="space-y-3 mb-8">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-slate-300">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span dangerouslySetInnerHTML={{ __html: p }} />
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${s.gradient} hover:opacity-90 transition-opacity`}>
                  {s.cta} — Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Grid ── */}
      <section className="py-24 px-6" style={{ backgroundColor: DARK }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-4">Platform Features</p>
            <h2 className="font-display text-4xl text-white mb-4">The Commerce Engine</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Six interlocking features that transform how people discover, try, and buy — powered by AI at every layer.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl p-7 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 duration-300"
                style={{ backgroundColor: DARK2 }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: "rgba(124,58,237,0.04)" }} />
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-xl text-white mb-5`}>
                  {f.sym}
                </div>
                <h3 className="relative text-white font-semibold text-base mb-2">{f.title}</h3>
                <p className="relative text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── A. Technology Architecture ── */}
      <section className="py-24 px-6" style={{ backgroundColor: DARK2 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-xs font-semibold tracking-widest uppercase mb-4">Under the Hood</p>
            <h2 className="font-display text-4xl text-white mb-4">Technology Architecture</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Built by Network71&apos;s 200+ engineer team in Dhaka — Ezyify runs on a proprietary AI stack purpose-built for social commerce at scale.
            </p>
          </div>

          {/* 50+ models callout */}
          <div className="flex justify-center mb-12">
            <div
              className="inline-flex flex-col items-center gap-2 px-10 py-6 rounded-2xl border border-white/5"
              style={{ backgroundColor: DARK }}
            >
              <span
                className="font-display text-5xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #A855F7, #EC4899, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                50+
              </span>
              <span className="text-white font-semibold text-sm">Proprietary AI Models</span>
              <span className="text-slate-500 text-xs text-center max-w-xs">Purpose-trained on commerce, fashion, and consumer behaviour data across South Asia and the Middle East</span>
            </div>
          </div>

          {/* AI model category cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {aiModels.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
                style={{ backgroundColor: DARK }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-xl mb-4`}>
                  {m.icon}
                </div>
                <h3 className="font-display text-white font-semibold text-base mb-1">{m.title}</h3>
                <p className="text-xs font-semibold mb-3" style={{ background: "linear-gradient(135deg, #A855F7, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Used for: {m.use}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: m.desc }} />
              </div>
            ))}
          </div>

          {/* Tech infrastructure badges */}
          <div className="text-center">
            <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-5">Infrastructure Stack</p>
            <div className="flex flex-wrap justify-center gap-3">
              {techBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 rounded-full border border-white/10 text-slate-300 text-sm font-medium"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── B. Business Model ── */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--s2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-4">Monetisation</p>
            <h2 className="font-display text-4xl text-white mb-4">Business Model</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Four diversified revenue streams designed to grow with the platform and align incentives across sellers, creators, and brands.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Revenue stream cards */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
              {revenueStreams.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
                  style={{ backgroundColor: DARK2 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-lg`}>
                      {r.icon}
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-slate-400 font-medium">
                      {r.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-white font-semibold text-sm mb-2">{r.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>

            {/* Donut chart placeholder */}
            <div className="lg:col-span-2 flex flex-col items-center gap-6">
              <div className="relative w-52 h-52">
                {/* CSS concentric ring approximation of a donut chart */}
                <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                  {/* Background ring */}
                  <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="24" />
                  {/* Purple — 40% */}
                  <circle cx="80" cy="80" r="60" fill="none" stroke="var(--accent-purple)" strokeWidth="24"
                    strokeDasharray={`${40 * 3.77} ${100 * 3.77}`} strokeDashoffset="0" strokeLinecap="butt" />
                  {/* Pink — 30% */}
                  <circle cx="80" cy="80" r="60" fill="none" stroke="var(--accent-pink)" strokeWidth="24"
                    strokeDasharray={`${30 * 3.77} ${100 * 3.77}`} strokeDashoffset={`${-(40 * 3.77)}`} strokeLinecap="butt" />
                  {/* Cyan — 20% */}
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#06B6D4" strokeWidth="24"
                    strokeDasharray={`${20 * 3.77} ${100 * 3.77}`} strokeDashoffset={`${-(70 * 3.77)}`} strokeLinecap="butt" />
                  {/* Amber — 10% */}
                  <circle cx="80" cy="80" r="60" fill="none" stroke="var(--accent-amber)" strokeWidth="24"
                    strokeDasharray={`${10 * 3.77} ${100 * 3.77}`} strokeDashoffset={`${-(90 * 3.77)}`} strokeLinecap="butt" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-lg font-display">4</span>
                  <span className="text-slate-500 text-[10px]">Streams</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 w-full max-w-[200px]">
                {revenueStreams.map((r) => (
                  <div key={r.title} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: r.donutColor }} />
                    <span className="text-slate-400 text-xs">{r.title}</span>
                    <span className="ml-auto text-slate-500 text-xs font-mono">{r.share}%</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 text-[10px] text-center">Indicative revenue mix — subject to change</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── C. Market Opportunity ── */}
      <section className="py-24 px-6" style={{ backgroundColor: DARK }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">The Opportunity</p>
            <h2 className="font-display text-4xl text-white mb-4">Market Opportunity</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Social commerce is the fastest-growing retail channel globally. Ezyify positions Network71 at the intersection of AI, social media, and e-commerce.
            </p>
          </div>

          {/* Three market metric cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-14">
            {/* TAM */}
            <div
              className="rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors"
              style={{ backgroundColor: DARK2 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-xl mb-5">
                🌐
              </div>
              <div
                className="font-display text-4xl font-bold mb-2"
                style={{
                  background: "linear-gradient(135deg, #A855F7, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                $500M+
              </div>
              <h3 className="font-display text-white font-semibold text-lg mb-2">Total Addressable Market</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The global social commerce market is projected to reach trillions in the coming decade. Ezyify targets a high-growth slice across emerging and diaspora markets where mobile-first commerce is exploding.
              </p>
            </div>

            {/* Target Markets */}
            <div
              className="rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors"
              style={{ backgroundColor: DARK2 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-xl mb-5">
                🗺️
              </div>
              <div
                className="font-display text-4xl font-bold mb-2"
                style={{
                  background: "linear-gradient(135deg, #EC4899, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                4 Regions
              </div>
              <h3 className="font-display text-white font-semibold text-lg mb-3">Target Markets</h3>
              <div className="space-y-2">
                {["South Asia", "Middle East", "Southeast Asia", "Western Markets (Diaspora)"].map((m) => (
                  <div key={m} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div
              className="rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors"
              style={{ backgroundColor: DARK2 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-xl mb-5">
                🚀
              </div>
              <div
                className="font-display text-4xl font-bold mb-2"
                style={{
                  background: "linear-gradient(135deg, #06B6D4, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                2025–2026
              </div>
              <h3 className="font-display text-white font-semibold text-lg mb-2">Launch Timeline</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Progressive rollout beginning with core markets in South Asia, expanding through the Middle East and Southeast Asia, with Western diaspora markets targeted in 2026.
              </p>
            </div>
          </div>

          {/* Pull-quote */}
          <div
            className="rounded-2xl p-8 border text-center"
            style={{ backgroundColor: "rgba(124,58,237,0.06)", borderColor: "rgba(168,85,247,0.2)" }}
          >
            <p className="text-white text-lg font-light leading-relaxed max-w-3xl mx-auto">
              &ldquo;Social commerce is the fastest-growing retail channel globally. Ezyify positions Network71 at the intersection of AI, social media, and e-commerce — capturing a market that existing platforms are only beginning to address.&rdquo;
            </p>
            <p className="text-purple-400 text-sm font-semibold mt-4">Network71 Strategic Vision</p>
          </div>
        </div>
      </section>

      {/* ── D. Network71 Integration ── */}
      <section className="py-24 px-6" style={{ backgroundColor: DARK2 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-xs font-semibold tracking-widest uppercase mb-4">Ecosystem Integration</p>
            <h2 className="font-display text-4xl text-white mb-4">The N71 Ecosystem Hub</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Ezyify is not just a standalone platform — it is the digital marketplace layer connecting all Network71 business divisions to end consumers and businesses globally.
            </p>
          </div>

          {/* Hub-and-spoke diagram */}
          <div className="relative flex items-center justify-center mb-14">
            <div className="relative w-full max-w-2xl aspect-square max-h-[520px]">
              {/* SVG diagram */}
              <svg viewBox="0 0 500 500" className="w-full h-full" aria-label="N71 ecosystem hub diagram">
                {/* Spoke lines */}
                {n71Spokes.map((spoke) => {
                  const rad = (spoke.angle * Math.PI) / 180
                  const cx = 250 + Math.cos(rad) * 168
                  const cy = 250 + Math.sin(rad) * 168
                  return (
                    <line
                      key={spoke.label}
                      x1="250" y1="250"
                      x2={cx} y2={cy}
                      stroke="rgba(168,85,247,0.25)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  )
                })}
                {/* Centre glow */}
                <circle cx="250" cy="250" r="68" fill="url(#centreGrad)" opacity="0.18" />
                <circle cx="250" cy="250" r="52" fill="url(#centreGrad)" opacity="0.35" />
                {/* Spoke node circles */}
                {n71Spokes.map((spoke) => {
                  const rad = (spoke.angle * Math.PI) / 180
                  const cx = 250 + Math.cos(rad) * 168
                  const cy = 250 + Math.sin(rad) * 168
                  return (
                    <circle
                      key={spoke.label + "-circle"}
                      cx={cx} cy={cy} r="36"
                      fill="var(--s1)"
                      stroke="rgba(168,85,247,0.3)"
                      strokeWidth="1"
                    />
                  )
                })}
                <defs>
                  <radialGradient id="centreGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--accent-purple)" />
                    <stop offset="100%" stopColor="var(--accent-pink)" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Centre label — absolutely positioned */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center">
                  <span
                    className="font-display font-bold text-2xl"
                    style={{
                      background: "linear-gradient(135deg, #A855F7, #EC4899, #06B6D4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Ezyify
                  </span>
                  <span className="text-slate-500 text-[10px] mt-0.5">Marketplace Hub</span>
                </div>
              </div>

              {/* Spoke labels — positioned via absolute + transform */}
              {n71Spokes.map((spoke) => {
                const rad = (spoke.angle * Math.PI) / 180
                const pct_x = 50 + Math.cos(rad) * 33.6
                const pct_y = 50 + Math.sin(rad) * 33.6
                return (
                  <div
                    key={spoke.label + "-label"}
                    className="absolute flex flex-col items-center pointer-events-none"
                    style={{
                      left: `${pct_x}%`,
                      top: `${pct_y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span className="text-xl leading-none">{spoke.icon}</span>
                    <span className="text-white text-[9px] font-semibold mt-1 whitespace-nowrap">{spoke.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Division cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {n71Spokes.map((spoke) => (
              <div
                key={spoke.label}
                className="flex items-center gap-4 rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors"
                style={{ backgroundColor: DARK }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2))", border: "1px solid rgba(168,85,247,0.2)" }}
                >
                  {spoke.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{spoke.label}</p>
                  <p className="text-slate-500 text-xs">{spoke.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── E. Partnership Opportunities ── */}
      <section className="py-24 px-6" style={{ backgroundColor: DARK }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-4">Get Involved</p>
            <h2 className="font-display text-4xl text-white mb-4">Partnership Opportunities</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Whether you are a seller ready to scale, an investor seeking high-growth exposure, or a technology company looking to integrate — there is a place for you in the Ezyify ecosystem.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {partnerCards.map((card) => (
              <div
                key={card.audience}
                className="rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 duration-300 flex flex-col"
                style={{ backgroundColor: DARK2 }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl mb-6`}>
                  {card.icon}
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ background: `linear-gradient(135deg, #A855F7, #EC4899)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {card.audience}
                </p>
                <h3 className="font-display text-white text-xl font-semibold mb-3">{card.headline}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-8" dangerouslySetInnerHTML={{ __html: card.desc }} />
                {card.href ? (
                  <Link
                    to={card.href}
                    className={`w-full py-3 rounded-xl text-sm font-semibold text-white text-center bg-gradient-to-r ${card.gradient} hover:opacity-90 transition-opacity`}
                  >
                    {card.cta}
                  </Link>
                ) : (
                  <button className={`w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${card.gradient} hover:opacity-90 transition-opacity`}>
                    {card.cta} — Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Launch Roadmap ── */}
      <section className="py-24 px-6" style={{ backgroundColor: DARK2 }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">Roadmap</p>
            <h2 className="font-display text-4xl text-white mb-4">Launch Phases</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Ezyify is rolling out in deliberate phases — each one expanding capability and market reach.
            </p>
          </div>

          <div className="space-y-4">
            {phases.map((p, i) => (
              <div
                key={p.phase}
                className="flex gap-6 items-start p-6 rounded-2xl border transition-colors"
                style={{
                  backgroundColor: p.status === "completed" ? "rgba(124,58,237,0.08)" : DARK,
                  borderColor: p.status === "completed" ? "rgba(168,85,247,0.3)" : p.status === "in-progress" ? "rgba(236,72,153,0.3)" : "rgba(255,255,255,0.06)",
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                  p.status === "completed" ? "bg-purple-500 text-white" :
                  p.status === "in-progress" ? "bg-pink-500 text-white" :
                  "bg-white/10 text-slate-400"
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-slate-500 text-xs font-medium">{p.phase}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                      p.status === "completed" ? "bg-purple-500/20 text-purple-300" :
                      p.status === "in-progress" ? "bg-pink-500/20 text-pink-300 animate-pulse" :
                      "bg-white/5 text-slate-500"
                    }`}>
                      {p.status === "completed" ? "Completed" : p.status === "in-progress" ? "In Progress" : "Upcoming"}
                    </span>
                  </div>
                  <div className="text-white font-semibold mb-1">{p.name}</div>
                  <div className="text-slate-400 text-sm">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Early Access / CTA ── */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ backgroundColor: DARK }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[400px] rounded-full blur-[160px] opacity-20" style={{ background: "radial-gradient(ellipse, #7C3AED 0%, #EC4899 50%, #0891B2 100%)" }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-semibold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            Coming Soon
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-5">
            Be First to Experience Ezyify
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-10">
            Join the waitlist and get early access when we launch. Sellers, creators, and early adopters get priority onboarding.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-purple-500/40 bg-purple-500/10 text-purple-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Your email draft is ready — send it to request early access.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                openEmailDraft("info@network71.com", "Ezyify early-access request", { Email: email })
                setSubmitted(true)
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                aria-label="Email address for Ezyify early access"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-purple-500/50"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-xl font-semibold text-white text-sm whitespace-nowrap hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
              >
                Join Waitlist
              </button>
            </form>
          )}

          <div className="mt-10 flex flex-wrap gap-x-4 gap-y-3 justify-center">
            <a href="https://ezyify.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
              Visit Ezyify.com
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <span className="text-slate-600 hidden sm:block">·</span>
            <Link to="/investors" className="text-slate-400 hover:text-white text-sm transition-colors">
              Investor Information
            </Link>
            <span className="text-slate-600 hidden sm:block">·</span>
            <Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">
              Partner with Us
            </Link>
            <span className="text-slate-600 hidden sm:block">·</span>
            <Link to="/investors" className="text-slate-400 hover:text-white text-sm transition-colors">
              Ezyify Investor Deck
            </Link>
            <span className="text-slate-600 hidden sm:block">·</span>
            <Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">
              Partner Programs
            </Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
