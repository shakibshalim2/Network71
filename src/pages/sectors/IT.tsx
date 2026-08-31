import { Link } from 'react-router-dom'
import SectorHeader from '@/components/sector/SectorHeader'
import ProcessFlow from '@/components/sector/ProcessFlow'
import MetricsBar from '@/components/sector/MetricsBar'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'

const ACCENT = '#22d3ee'
const PURPLE = '#a855f7'
const BG_DEEP = '#030B14'
const BG_ALT = '#060F1C'

/* ─── data ─────────────────────────────────────────────────────────────── */

const metrics = [
  { value: '200+', label: 'Engineers', desc: 'Full-stack & AI specialists' },
  { value: '50+', label: 'Projects Delivered', desc: 'Enterprise-grade software' },
  { value: '99%', label: 'Client Satisfaction', desc: 'Across all engagements' },
  { value: 'Ezyify', label: 'Flagship Product', desc: 'AI commerce ecosystem' },
]

const servicePillars = [
  {
    icon: '⬡',
    title: 'Enterprise Resource Planning',
    desc: 'Custom ERP, HRM, inventory, and business-process automation for organisations operating at global scale.',
    color: '#22d3ee',
  },
  {
    icon: '⬡',
    title: 'Custom Software Development',
    desc: 'Bespoke web and desktop applications built to spec — from scoping through to production deployment.',
    color: '#6366f1',
  },
  {
    icon: '⬡',
    title: 'AI & Data Analytics',
    desc: 'Recommendation engines, predictive analytics, NLP, and computer vision — intelligent systems that create competitive advantage.',
    color: '#a855f7',
  },
  {
    icon: '⬡',
    title: 'Cloud Solutions & DevOps',
    desc: 'Scalable cloud architecture on AWS, automated CI/CD pipelines, and containerised infrastructure built for reliability.',
    color: '#22d3ee',
  },
  {
    icon: '⬡',
    title: 'Mobile & Web Applications',
    desc: 'High-performance SaaS products, cross-platform mobile apps, progressive web apps, and API ecosystems.',
    color: '#f472b6',
  },
  {
    icon: '⬡',
    title: 'Cybersecurity & Compliance',
    desc: 'Penetration testing, application security reviews, threat monitoring, and data-protection strategy aligned to OWASP standards.',
    color: '#34d399',
  },
]

const ezyifyFeatures = [
  { label: 'AR Try-On', desc: 'AI-powered virtual fitting powered by computer vision models built in-house.' },
  { label: 'Video Commerce', desc: 'Live and short-form video shopping with real-time checkout integration.' },
  { label: 'Creator Marketplace', desc: 'End-to-end monetisation tools for content creators and brand affiliates.' },
  { label: 'AI Chat Commerce', desc: 'Conversational shopping assistant driven by fine-tuned NLP models.' },
  { label: 'Smart Feed', desc: 'Personalised discovery feed powered by real-time behavioural signals.' },
  { label: 'Cross-Border Commerce', desc: 'Multi-currency, multi-language commerce with logistics integration.' },
]

const aiModels = [
  { name: 'Recommendation Engine', type: 'Commerce AI', color: ACCENT },
  { name: 'Computer Vision', type: 'Try-On AI', color: PURPLE },
  { name: 'NLP Chat Model', type: 'Conversational', color: '#f472b6' },
  { name: 'Demand Forecasting', type: 'Predictive', color: '#34d399' },
  { name: 'Image Recognition', type: 'Vision', color: '#f59e0b' },
  { name: 'Pricing Intelligence', type: 'Optimisation', color: '#6366f1' },
  { name: 'Fraud Detection', type: 'Security AI', color: '#ef4444' },
  { name: 'Sentiment Analysis', type: 'NLP', color: ACCENT },
  { name: 'Content Generation', type: 'Generative', color: PURPLE },
]

const techBadges = [
  { init: 'Re', name: 'React', cat: 'Frontend' },
  { init: 'Nd', name: 'Node.js', cat: 'Backend' },
  { init: 'Py', name: 'Python', cat: 'Backend' },
  { init: 'TF', name: 'TensorFlow', cat: 'AI / ML' },
  { init: 'PG', name: 'PostgreSQL', cat: 'Database' },
  { init: 'Mg', name: 'MongoDB', cat: 'Database' },
  { init: 'AW', name: 'AWS', cat: 'Cloud' },
  { init: 'Dk', name: 'Docker', cat: 'Cloud' },
  { init: 'K8', name: 'Kubernetes', cat: 'Cloud' },
  { init: 'Rd', name: 'Redis', cat: 'Database' },
  { init: 'Ts', name: 'TypeScript', cat: 'Frontend' },
  { init: 'Fl', name: 'Flutter', cat: 'Mobile' },
]

const processSteps = [
  { title: 'Discovery & Requirements', desc: 'Deep-dive scoping, stakeholder workshops, and technical feasibility assessment.' },
  { title: 'Architecture Design', desc: 'System design, technology selection, data modelling, and security planning.' },
  { title: 'Development Sprints', desc: 'Two-week agile sprints with daily standups, demos, and continuous integration.' },
  { title: 'QA & Testing', desc: 'Automated test suites, manual QA, security audits, and performance load testing.' },
  { title: 'Deployment', desc: 'Zero-downtime production release, monitoring setup, and full documentation handover.' },
  { title: 'Support & Scaling', desc: 'Ongoing SLA-backed maintenance, feature releases, and capacity scaling.' },
]

const internalDivisions = [
  { name: 'Garments', slug: 'garments', use: 'Production tracking & order management' },
  { name: 'Agriculture', slug: 'agriculture', use: 'Supply chain & harvest logistics' },
  { name: 'Food & Beverage', slug: 'food-bev', use: 'Inventory, QA & distribution' },
  { name: 'Oils & Energy', slug: 'oils-energy', use: 'Distribution & asset monitoring' },
  { name: 'Global Trading', slug: 'global-trading', use: 'Trade management & compliance' },
  { name: 'Media', slug: 'media', use: 'CMS, broadcast tech & digital platforms' },
  { name: 'eSHIPe Maritime', slug: 'eshipe', use: 'Marketplace platform & vessel data' },
  { name: 'Corporate', slug: 'corporate', use: 'ERP, HR, Finance & payroll' },
]

const deliveryModels = [
  {
    title: 'Fixed-Price Projects',
    icon: '◈',
    timeline: '4 – 24 weeks',
    teamSize: '3 – 12 engineers',
    bestFor: 'Well-defined products, MVPs, feature builds, and discrete integrations with clear scope.',
    color: ACCENT,
  },
  {
    title: 'Dedicated Team',
    icon: '◈',
    timeline: 'Ongoing (min 3 months)',
    teamSize: '5 – 30 engineers',
    bestFor: 'Long-term product development where clients need full team extension at speed and quality.',
    color: PURPLE,
  },
  {
    title: 'Managed Services',
    icon: '◈',
    timeline: 'Ongoing SLA',
    teamSize: '2 – 8 engineers',
    bestFor: 'Maintenance, monitoring, performance optimisation, and incident response for live platforms.',
    color: '#34d399',
  },
]

const roadmapItems = [
  { year: '2025', title: 'Scale Engineering Capacity', desc: 'Grow to 500+ engineers across full-stack, AI, mobile, and cloud disciplines.' },
  { year: '2026', title: 'Ezyify Public Launch', desc: 'Global rollout of the Ezyify commerce ecosystem across South Asia, MENA, and Europe.' },
  { year: '2027', title: 'AI Product Suite Release', desc: 'Launch standalone AI products: commerce intelligence, computer vision APIs, and NLP toolkits.' },
  { year: '2028', title: 'SaaS Revenue Scale', desc: 'Target recurring SaaS revenue from Ezyify and enterprise software products — figures to be published.' },
]

/* ─── page ──────────────────────────────────────────────────────────────── */

export default function IT() {
  return (
    <div className="min-h-full" style={{ background: BG_DEEP, color: 'white' }}>
      <SectorHeader divisionName="IT & Software" accentClass="text-cyan-400" />

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: BG_DEEP }}>
        {/* dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(34,211,238,0.12) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            opacity: 0.6,
          }}
        />
        {/* ambient glows */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Network71 — Division 05
              </span>
            </div>

            <h1 className="font-display leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              <span style={{ color: 'white' }}>IT &amp; </span>
              <span
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #67e8f9 50%, ${ACCENT} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Software
              </span>
            </h1>

            <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
              Engineering the digital backbone of a global enterprise — and building tomorrow&apos;s platforms.
              From internal ERP to AI-powered consumer products, Network71&apos;s technology division delivers
              software that scales without limits.
            </p>

            <div className="flex flex-wrap gap-4 mb-20">
              <a
                href="#sector-contact"
                className="px-8 py-3.5 font-semibold text-sm rounded-lg transition-all hover:opacity-90"
                style={{ background: ACCENT, color: '#030B14' }}
              >
                Start a Project
              </a>
              <Link
                to="/ezyify"
                className="px-8 py-3.5 border text-sm font-medium text-white rounded-lg hover:bg-white/5 transition-colors"
                style={{ borderColor: `${ACCENT}50` }}
              >
                Explore Ezyify
              </Link>
            </div>

            {/* hero stats */}
            <div className="flex flex-wrap gap-12 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {[
                { v: '200+', l: 'Engineers' },
                { v: '50+', l: 'Projects Delivered' },
                { v: '99%', l: 'Client Satisfaction' },
              ].map((m) => (
                <div key={m.l}>
                  <div className="font-display text-4xl mb-1" style={{ color: ACCENT }}>{m.v}</div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* terminal decoration */}
        <div
          className="absolute bottom-12 right-8 lg:right-16 hidden lg:block opacity-30"
          style={{ fontFamily: 'monospace', fontSize: '11px', color: ACCENT, lineHeight: 1.8 }}
        >
          <div>$ n71 deploy --division=it --env=production</div>
          <div style={{ color: '#34d399' }}>&#10003; 200 engineers online</div>
          <div style={{ color: '#34d399' }}>&#10003; AI cluster ready</div>
          <div style={{ color: '#34d399' }}>&#10003; Ezyify pipeline active</div>
          <div className="animate-pulse">&#9646; awaiting instructions_</div>
        </div>
      </section>

      {/* ── 2. METRICS BAR ── */}
      <MetricsBar metrics={metrics} accentHex={ACCENT} dark />

      {/* ── 3. DIVISION OVERVIEW ── */}
      <section className="py-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-14">
            <div className="h-px w-10" style={{ background: ACCENT }} />
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Division Overview</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* left */}
            <div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                The Technology Division That Powers Every Business Unit
              </h2>
              <p className="text-slate-300 leading-relaxed mb-5 text-sm">
                Network71&apos;s IT &amp; Software division operates on two parallel tracks. Internally, it builds and maintains the
                enterprise technology infrastructure that powers all eight N71 business divisions — from garment production tracking
                to cross-border trade management. Externally, it develops commercial software products, most notably Ezyify, our
                AI-powered social commerce ecosystem positioned to redefine how the world shops online.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                With a team of 200+ engineers spanning full-stack development, AI/ML, mobile, cloud infrastructure, and
                cybersecurity, the division operates as a world-class software house embedded within a diversified global conglomerate.
                Every system we build is production-grade, security-first, and designed to scale.
              </p>
            </div>
            {/* right: capability pillars */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Enterprise Software', desc: 'ERP, HRM, CRM, inventory, and workflow automation at group level.', icon: '◻' },
                { title: 'AI & Machine Learning', desc: 'Recommendation systems, NLP, computer vision, and predictive analytics.', icon: '◻' },
                { title: 'Cloud & Infrastructure', desc: 'Multi-cloud architecture, DevOps, containerisation, and SRE practices.', icon: '◻' },
                { title: 'Cybersecurity', desc: 'Threat modelling, pen testing, OWASP compliance, and data protection.', icon: '◻' },
              ].map((p) => (
                <div
                  key={p.title}
                  className="p-5 rounded-xl"
                  style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}
                >
                  <div className="text-xs font-bold mb-3" style={{ color: ACCENT }}>{p.icon} {p.title}</div>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SIX SERVICE PILLARS ── */}
      <section className="py-24" style={{ background: BG_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Service Pillars</span>
              <div className="h-px w-8" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">Six Technology Disciplines</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              From enterprise back-office systems to consumer-facing AI products — our practice spans the full digital stack.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicePillars.map((s) => (
              <div
                key={s.title}
                className="group p-7 rounded-2xl cursor-default transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px rgba(34,211,238,0.15)`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${s.color}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-lg font-bold"
                  style={{ background: `${s.color}14`, border: `1px solid ${s.color}30`, color: s.color }}
                >
                  {s.icon}
                </div>
                <h3 className="font-semibold text-white text-sm mb-3">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                <div className="mt-5 h-px w-8 transition-all duration-300 group-hover:w-16" style={{ background: s.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. EZYIFY — THE CROWN JEWEL ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: '#040813' }}>
        {/* strong glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.08) 50%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)' }}
        />
        {/* dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(168,85,247,0.1) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            opacity: 0.5,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* badge */}
          <div className="flex justify-center mb-10">
            <div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{ border: '1px solid rgba(168,85,247,0.35)', background: 'rgba(168,85,247,0.1)' }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#E6B800', boxShadow: '0 0 8px #E6B800' }} />
              <span className="text-[11px] text-slate-300 font-semibold tracking-[0.25em] uppercase">Flagship Innovation Product</span>
            </div>
          </div>

          {/* headline */}
          <div className="text-center mb-6">
            <h2
              className="font-display leading-tight"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 40%, #22d3ee 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ezyify
            </h2>
            <p className="text-slate-300 text-xl mt-4 mb-3 font-light">
              N71&apos;s flagship AI-powered social commerce ecosystem
            </p>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
              Built entirely in-house by Network71&apos;s IT division, Ezyify fuses social media, AI commerce, and creator monetisation
              into a single, seamless platform. Every feature — from AR try-on to conversational checkout — is engineered
              by our team, proving the full depth of our technology capability.
            </p>
          </div>

          {/* ezyify stats */}
          <div className="flex flex-wrap justify-center gap-10 py-10 mb-10" style={{ borderTop: '1px solid rgba(168,85,247,0.15)', borderBottom: '1px solid rgba(168,85,247,0.15)' }}>
            {[
              { v: '10M+', l: 'Target Users', sub: 'At full scale' },
              { v: '$500M', l: 'Market Potential', sub: 'Serviceable market' },
              { v: '50+', l: 'AI Models', sub: 'In development' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div
                  className="font-display text-4xl mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.v}
                </div>
                <div className="text-white text-xs font-semibold">{s.l}</div>
                <div className="text-slate-600 text-[11px]">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* feature cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {ezyifyFeatures.map((f) => (
              <div
                key={f.label}
                className="p-5 rounded-xl"
                style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.18)' }}
              >
                <div className="text-xs font-bold mb-2" style={{ color: '#d8b4fe' }}>{f.label}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/ezyify"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                boxShadow: '0 0 40px rgba(124,58,237,0.35)',
              }}
            >
              Explore Ezyify
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
            <a
              href="https://ezyify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:bg-white/5"
              style={{ border: '1px solid rgba(168,85,247,0.4)', color: '#d8b4fe' }}
            >
              ezyify.com
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. AI LAB ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: BG_ALT }}>
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: PURPLE }} />
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: PURPLE }}>AI Research &amp; Development</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* left */}
            <div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                The N71 AI Lab
              </h2>
              <p className="text-slate-300 leading-relaxed mb-8 text-sm">
                Network71&apos;s AI Lab is the engine behind Ezyify&apos;s intelligence and the research arm of our software practice.
                Our scientists and engineers are building production-grade AI systems — not prototypes — that power real commerce
                at scale. From computer vision models that enable AR try-on to demand-forecasting systems that reduce supply-chain waste,
                every model we train has a concrete business application.
              </p>
              <div className="space-y-5">
                {[
                  { title: 'Commerce AI', desc: 'Behavioural recommendation, personalisation, and conversion optimisation.' },
                  { title: 'Computer Vision', desc: 'Image recognition and 3D modelling for virtual product try-on.' },
                  { title: 'NLP &amp; Chat AI', desc: 'Conversational assistants for commerce, support, and content creation.' },
                  { title: 'Predictive Systems', desc: 'Demand forecasting, pricing intelligence, and inventory prediction.' },
                ].map((a) => (
                  <div key={a.title} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: PURPLE }} />
                    <div>
                      <span className="text-white font-semibold text-sm" dangerouslySetInnerHTML={{ __html: a.title }} />
                      <span className="text-slate-400 text-sm"> — {a.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right: model grid */}
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: PURPLE }}>Active Model Types</div>
              <div className="grid grid-cols-3 gap-3">
                {aiModels.map((m) => (
                  <div
                    key={m.name}
                    className="p-3.5 rounded-xl text-center"
                    style={{ background: 'rgba(168,85,247,0.05)', border: `1px solid ${m.color}25` }}
                  >
                    <div
                      className="text-[10px] font-bold tracking-wider mb-1.5 uppercase"
                      style={{ color: m.color }}
                    >
                      {m.type}
                    </div>
                    <div className="text-slate-300 text-[10px] leading-tight">{m.name}</div>
                  </div>
                ))}
              </div>
              <div
                className="mt-5 p-4 rounded-xl"
                style={{ background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.2)', fontFamily: 'monospace', fontSize: '11px', color: PURPLE, lineHeight: 1.9 }}
              >
                <div style={{ color: '#67e8f9' }}>{'>'} model.train(dataset=commerce_signals)</div>
                <div style={{ color: '#34d399' }}>epoch 1/50 — loss: 0.3412 — acc: 0.8870</div>
                <div style={{ color: '#34d399' }}>epoch 50/50 — loss: 0.0182 — acc: 0.9940</div>
                <div>{'>'} model.deploy(env=&quot;ezyify-prod&quot;)</div>
                <div style={{ color: '#34d399' }}>&#10003; deployed — latency 18ms p99</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TECH STACK ── */}
      <section className="py-24" style={{ background: BG_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Technology Ecosystem</span>
              <div className="h-px w-8" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl text-white mb-3">Technology Capabilities</h2>
            <p className="text-slate-500 text-sm">Core technologies our engineers build with across every engagement.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {techBadges.map((t) => (
              <div
                key={t.name}
                className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-200 cursor-default"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${ACCENT}30`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs"
                  style={{ background: `${ACCENT}14`, color: ACCENT, border: `1px solid ${ACCENT}25` }}
                >
                  {t.init}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-[10px] font-medium uppercase tracking-wider mt-0.5" style={{ color: `${ACCENT}80` }}>{t.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. PROCESS FLOW ── */}
      <div style={{ background: BG_ALT }}>
        <ProcessFlow
          steps={processSteps}
          accentHex={ACCENT}
          label="Software Delivery Process"
        />
      </div>

      {/* ── 9. INTERNAL CLIENTS — ENTERPRISE BACKBONE ── */}
      <section className="py-24" style={{ background: BG_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Internal Enterprise Backbone</span>
              <div className="h-px w-8" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">IT Powers Every N71 Division</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              The IT division is the connective tissue of Network71 — running enterprise systems that keep all eight business
              divisions operating at peak efficiency, unified through the Ezyify platform.
            </p>
          </div>

          <div className="relative">
            {/* central hub */}
            <div className="flex justify-center mb-10">
              <div
                className="px-8 py-5 rounded-2xl text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(34,211,238,0.1))',
                  border: '1px solid rgba(168,85,247,0.35)',
                  boxShadow: '0 0 60px rgba(168,85,247,0.15)',
                }}
              >
                <div
                  className="font-display text-2xl mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Ezyify Platform
                </div>
                <div className="text-slate-400 text-xs">N71 Digital Operations Hub</div>
              </div>
            </div>

            {/* division cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {internalDivisions.map((d) => (
                <div
                  key={d.name}
                  className="p-5 rounded-xl flex items-start gap-4"
                  style={{ background: 'rgba(34,211,238,0.03)', border: '1px solid rgba(34,211,238,0.1)' }}
                >
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: ACCENT }} />
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{d.name}</div>
                    <div className="text-slate-400 text-xs">{d.use}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. DELIVERY MODELS ── */}
      <section className="py-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-14">
            <div className="h-px w-10" style={{ background: ACCENT }} />
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>How We Engage</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">Delivery Models</h2>
          <p className="text-slate-400 text-sm mb-14 max-w-xl leading-relaxed">
            We structure every engagement around your project type and timeline. Choose the model that fits your needs.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {deliveryModels.map((m) => (
              <div
                key={m.title}
                className="p-7 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${m.color}25` }}
              >
                <div className="text-2xl mb-5" style={{ color: m.color }}>{m.icon}</div>
                <h3 className="font-display text-xl text-white mb-5">{m.title}</h3>
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs">Timeline</span>
                    <span className="text-white text-xs font-semibold">{m.timeline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs">Team Size</span>
                    <span className="text-white text-xs font-semibold">{m.teamSize}</span>
                  </div>
                </div>
                <div className="h-px mb-5" style={{ background: `${m.color}20` }} />
                <p className="text-slate-400 text-xs leading-relaxed">{m.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. QUALITY & SECURITY ── */}
      <section className="py-24" style={{ background: BG_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10" style={{ background: '#34d399' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: '#34d399' }}>Quality &amp; Security</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Built to the Highest Standards
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Security and quality are not afterthoughts — they are architectural principles. Every system we deliver
                is reviewed, tested, and hardened before it reaches production. Our compliance roadmap aligns with internationally
                recognised frameworks.
              </p>
              <a
                href="#sector-contact"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: '#34d399' }}
              >
                Request a Security Briefing
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
            <div className="grid gap-4">
              {[
                { title: 'ISO 27001', status: 'In Progress', desc: 'Information security management standard — certification in progress.', color: '#f59e0b' },
                { title: 'OWASP Top 10 Compliance', status: 'Active', desc: 'Every application is assessed and hardened against the OWASP Top 10 vulnerabilities.', color: '#34d399' },
                { title: 'Penetration Testing', status: 'Active', desc: 'Regular third-party pen testing across all customer-facing and internal platforms.', color: '#34d399' },
                { title: 'Code Review Process', status: 'Active', desc: 'Mandatory peer review, static analysis, and security linting in every CI pipeline.', color: '#34d399' },
                { title: 'SOC Compliance Roadmap', status: 'Planned', desc: 'SOC 2 Type II compliance roadmap aligned to Ezyify enterprise launch timeline.', color: ACCENT },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-white font-semibold text-sm">{item.title}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: `${item.color}18`, color: item.color }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. GLOBAL REACH ── */}
      <section className="py-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10" style={{ background: ACCENT }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Global Reach</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Remote Delivery. Global Impact.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Our engineering headquarters is in Dhaka, Bangladesh — giving us access to an exceptional talent pool,
                competitive cost structures, and a time zone that enables productive overlap with Europe, the Middle East, and Asia.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                We deliver projects entirely remotely using battle-tested async workflows, with optional embedded team arrangements
                for clients requiring on-site presence. Through the wider Network71 network, we have supported projects in
                25+ countries across the globe.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '25+', label: 'Countries Served', icon: '◈' },
                { value: 'Dhaka', label: 'Engineering HQ', icon: '◈' },
                { value: 'Remote-First', label: 'Delivery Model', icon: '◈' },
                { value: '24 / 5', label: 'Support Coverage', icon: '◈' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-6 rounded-xl text-center"
                  style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}
                >
                  <div className="text-2xl mb-3" style={{ color: ACCENT }}>{s.icon}</div>
                  <div className="font-display text-2xl text-white mb-1">{s.value}</div>
                  <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. BUSINESS OPPORTUNITIES ── */}
      <section className="py-24" style={{ background: BG_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Opportunities</span>
              <div className="h-px w-8" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">Work With Us</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              Three distinct engagement pathways — each opening a different door into the N71 technology ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Enterprise Software Clients',
                desc: 'Organisations looking for a reliable, experienced software partner to build custom enterprise applications, digital platforms, or AI-powered products.',
                cta: 'Start a Project',
                href: '#sector-contact',
                color: ACCENT,
                tag: 'Custom Development',
              },
              {
                title: 'Technology Partners',
                desc: 'SaaS vendors, cloud providers, and system integrators seeking reseller arrangements, white-label development capacity, or deep integration partnerships.',
                cta: 'Explore Partnership',
                href: '#sector-contact',
                color: PURPLE,
                tag: 'Integration &amp; Reseller',
              },
              {
                title: 'Ezyify Early Adopters',
                desc: 'Sellers, creators, and investors who want early access to Ezyify — whether to list products, build a creator presence, or discuss strategic investment.',
                cta: 'Join Ezyify',
                href: '/ezyify',
                color: '#f472b6',
                tag: 'Sellers · Creators · Investors',
              },
            ].map((o) => (
              <div
                key={o.title}
                className="p-7 rounded-2xl flex flex-col"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${o.color}25` }}
              >
                <div
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold mb-5"
                  style={{ background: `${o.color}15`, color: o.color }}
                  dangerouslySetInnerHTML={{ __html: o.tag }}
                />
                <h3 className="font-display text-xl text-white mb-4">{o.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-7">{o.desc}</p>
                <Link
                  to={o.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: o.color }}
                >
                  {o.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. GROWTH ROADMAP ── */}
      <section className="py-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: ACCENT }} />
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Strategic Roadmap</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4 leading-tight">Growth Roadmap</h2>
          <p className="text-slate-400 text-sm mb-14 max-w-xl leading-relaxed">
            The trajectory of Network71&apos;s technology division over the next four years.
          </p>
          <div className="relative">
            {/* connector line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-px hidden lg:block"
              style={{ background: `linear-gradient(to bottom, ${ACCENT}60, ${PURPLE}40, transparent)` }}
            />
            <div className="space-y-6">
              {roadmapItems.map((item, i) => (
                <div key={item.year} className="grid lg:grid-cols-[4rem_1fr] gap-6 lg:gap-10 items-start">
                  <div className="relative flex items-center justify-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-center flex-shrink-0 relative z-10"
                      style={{
                        background: i === 0 ? ACCENT : `${ACCENT}14`,
                        border: `1px solid ${ACCENT}40`,
                        color: i === 0 ? BG_DEEP : ACCENT,
                      }}
                    >
                      <span className="font-display text-sm font-bold">{item.year}</span>
                    </div>
                  </div>
                  <div
                    className="p-6 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 15. SECTOR CONTACT ── */}
      <SectorContact
        divisionName="IT & Software"
        accentHex={ACCENT}
        inquiryTypes={['Custom Development', 'Enterprise Software', 'Ezyify Partnership', 'AI/ML Projects', 'Investment Inquiry']}
      />

      {/* ── 16. FOOTER ── */}
      <Footer />
    </div>
  )
}
