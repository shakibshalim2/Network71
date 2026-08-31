import { useEffect, useRef, useState } from 'react'
import SectorHeader from '@/components/sector/SectorHeader'
import ProcessFlow from '@/components/sector/ProcessFlow'
import MetricsBar from '@/components/sector/MetricsBar'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'

const ACCENT = '#22c55e'

// ─── Data ─────────────────────────────────────────────────────────────────────

const metrics = [
  { value: '10K+', label: 'Acres Farmed', desc: 'Agricultural land under management' },
  { value: '500+', label: 'Tons / Month', desc: 'Monthly processing capacity' },
  { value: '100%', label: 'Organic Certified', desc: 'Certified organic produce' },
  { value: '18+', label: 'Export Markets', desc: 'Countries reached globally' },
]

const crops = [
  {
    emoji: '🌾',
    name: 'Rice & Paddy',
    desc: 'High-yield aromatic and non-aromatic varieties milled to international export specifications.',
  },
  {
    emoji: '🥦',
    name: 'Fresh Vegetables',
    desc: 'Seasonal vegetables with full traceability from verified farming networks to final destination.',
  },
  {
    emoji: '🍋',
    name: 'Tropical Fruits',
    desc: 'Tropical and sub-tropical fruits harvested at peak quality and handled with cold-chain care.',
  },
  {
    emoji: '🫘',
    name: 'Pulses & Lentils',
    desc: 'Red lentils, mung beans, chickpeas, and protein-rich legumes cleaned to export grade.',
  },
  {
    emoji: '🌶️',
    name: 'Spices & Herbs',
    desc: 'Turmeric, chilli, coriander, cardamom, and dried herbs sourced from specialty growing regions.',
  },
  {
    emoji: '🌿',
    name: 'Jute & Fibre',
    desc: 'Raw jute and processed jute fibre supporting sustainable natural textile export.',
  },
]

const values = [
  { label: 'Traceability', desc: 'Farm-to-shipment documentation at every node of the supply chain.' },
  { label: 'Farmer Welfare', desc: 'Fair pricing, advance contracting, and on-ground farmer support.' },
  { label: 'Quality Assurance', desc: 'Laboratory-verified produce meeting importing country standards.' },
  { label: 'Sustainable Practices', desc: 'Low-input, water-smart methods to protect long-term soil health.' },
]

const techCards = [
  {
    icon: '📡',
    title: 'Precision Agriculture',
    desc: 'IoT sensor networks and satellite data inform irrigation, fertilisation, and harvest timing decisions across partner farms.',
  },
  {
    icon: '🎓',
    title: 'Farmer Training Programs',
    desc: 'Seasonal workshops on Good Agricultural Practices (GAP), pesticide-free methods, and post-harvest care for every partner farmer.',
  },
  {
    icon: '🧊',
    title: 'Post-Harvest Technology',
    desc: 'Pre-cooling, vapour heat treatment, and temperature-controlled logistics that dramatically reduce spoilage between field and market.',
  },
  {
    icon: '🔗',
    title: 'Traceability Systems',
    desc: 'Blockchain-ready batch tracking allows buyers to verify origin, handling history, and certification status for every shipment.',
  },
]

const processSteps = [
  { title: 'Farmer Partnership', desc: 'Agreements with verified smallholder and commercial farmers across producing regions.' },
  { title: 'Harvest Collection', desc: 'Mobile collection points and coordinated transport that minimise post-harvest loss.' },
  { title: 'Sorting & Grading', desc: 'Mechanical and manual sorting to international export-grade specifications.' },
  { title: 'Agro-Processing', desc: 'Cleaning, milling, hulling, and value-added processing tailored to each commodity.' },
  { title: 'Quality & Lab Testing', desc: 'Pesticide residue checks, moisture testing, and export certification at accredited labs.' },
  { title: 'Cold Chain Storage', desc: 'Temperature-controlled warehousing preserving freshness through the distribution cycle.' },
  { title: 'Packaging & Export', desc: 'Retail-ready and bulk packaging with full documentation for 18+ global markets.' },
]

const certifications = [
  { name: 'HACCP', desc: 'Hazard Analysis & Critical Control Points — systematic food safety management across all processing facilities.' },
  { name: 'Organic Certification', desc: 'Third-party organic certification verifying zero synthetic pesticide use throughout the supply chain.' },
  { name: 'Phytosanitary Compliance', desc: 'Plant health inspection and government-issued certificates meeting importing country requirements.' },
  { name: 'Export Documentation', desc: 'Certificate of Origin, Bill of Lading, packing lists, and all supporting commercial documentation.' },
]

const qualityBars = [
  { label: 'Organic Sourcing Rate', value: 100 },
  { label: 'Quality Pass Rate (Target 98%+)', value: 98 },
  { label: 'Post-Harvest Loss Reduction (Target <5%)', value: 95 },
]

const sustainBars = [
  { label: 'Farmers on Fair Pricing Agreements', value: 87 },
  { label: 'Farms using Water-Smart Irrigation', value: 72 },
  { label: 'Packaging with Recyclable Materials', value: 90 },
]

const markets = [
  { region: 'South Asia', role: 'Origin', flag: '🌱', detail: 'Bangladesh, India — primary sourcing heartland', color: '#16a34a' },
  { region: 'Middle East', role: 'Primary Market', flag: '🌍', detail: 'UAE, Saudi Arabia, Qatar — largest buyer volume', color: ACCENT },
  { region: 'Europe', role: 'Premium Market', flag: '🌐', detail: 'UK, Netherlands, Germany — high-value organic channel', color: '#4ade80' },
  { region: 'Southeast Asia', role: 'Growing Market', flag: '🌏', detail: 'Malaysia, Singapore — growing middle-class demand', color: '#86efac' },
  { region: 'Africa', role: 'Emerging Market', flag: '🌍', detail: 'East & West Africa — early-stage channel expansion', color: '#bbf7d0' },
]

const opportunities = [
  {
    title: 'International Food Processors',
    desc: 'Secure reliable, certified bulk raw commodities from South Asia — rice, pulses, spices — with consistent grading and export documentation.',
    cta: 'Buyer Inquiry',
  },
  {
    title: 'Retail Importers',
    desc: 'Source retail-ready packaged organic produce carrying full chain-of-custody documentation for supermarket and e-commerce channels.',
    cta: 'Export Partnership',
  },
  {
    title: 'Processing JV Partners',
    desc: 'Co-invest in agro-processing infrastructure in Bangladesh — shared facilities, integrated logistics, and direct market access.',
    cta: 'Processing JV',
  },
]

const farmerBenefits = [
  { icon: '💰', title: 'Fair & Advance Pricing', desc: 'Pre-season price agreements that give farmers income certainty before planting.' },
  { icon: '📚', title: 'Agricultural Training', desc: 'Hands-on workshops in GAP, organic practices, water management, and post-harvest handling.' },
  { icon: '🧪', title: 'Input Supply Support', desc: 'Access to quality seeds, bio-fertilisers, and pest management resources at subsidised rates.' },
  { icon: '🏦', title: 'Financial Inclusion', desc: 'Linkage to micro-finance, crop insurance, and digital payment infrastructure for rural farmers.' },
]

const roadmap = [
  { year: '2025', milestone: 'Expand Cold Chain Network', desc: 'Add four additional cold storage hubs across primary sourcing districts.' },
  { year: '2026', milestone: 'Organic Certification Expansion', desc: 'Scale certified organic acreage to 6,000+ acres under formal certification.' },
  { year: '2027', milestone: 'Direct Export Channels', desc: 'Establish direct buyer relationships in three new European and GCC markets.' },
  { year: '2028', milestone: 'Agro-Processing Facilities', desc: 'Commission dedicated value-added processing plant for pulses and spices.' },
]

// ─── Animated Progress Bar ────────────────────────────────────────────────────

function AnimatedBar({ label, value, accentHex, triggered }: { label: string; value: number; accentHex: string; triggered: boolean }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-bold" style={{ color: accentHex }}>{value}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: triggered ? `${value}%` : '0%',
            background: accentHex,
            transitionDelay: '200ms',
          }}
        />
      </div>
    </div>
  )
}

// ─── useInView hook ───────────────────────────────────────────────────────────

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Agriculture() {
  const qualityRef = useInView()
  const sustainRef = useInView()

  return (
    <div className="min-h-full bg-navy">
      <SectorHeader divisionName="Agriculture & Agro Products" accentClass="text-green-400" />

      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1400&h=800&fit=crop&auto=format"
            alt="Lush agricultural fields"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,18,35,0.95) 0%, rgba(10,18,35,0.75) 55%, rgba(10,18,35,0.40) 100%)' }} />
          {/* Organic curve overlay */}
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: 80 }}>
            <path d="M0,80 C360,0 1080,80 1440,20 L1440,80 Z" fill="rgb(10,18,35)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Network71 &mdash; Division 02
              </span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl text-white leading-tight tracking-[-0.02em] mb-6">
              Agriculture<br />
              <span style={{ color: ACCENT }}>&amp; Agro Products</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl">
              From fertile fields to global markets &mdash; traceable, sustainable, premium agro products connecting South Asian farmers to the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#sector-contact"
                className="px-8 py-3.5 font-bold text-sm text-navy rounded-lg transition-all hover:opacity-90 shadow-lg"
                style={{ background: ACCENT }}
              >
                Buyer Inquiry
              </a>
              <a
                href="#crop-portfolio"
                className="px-8 py-3.5 border border-white/25 text-white text-sm font-medium rounded-lg hover:bg-white/8 transition-colors"
              >
                View Products
              </a>
            </div>
          </div>
        </div>

        {/* Floating stat badge */}
        <div
          className="absolute bottom-16 right-8 lg:right-16 hidden lg:flex flex-col items-center gap-1 px-6 py-4 rounded-2xl border backdrop-blur-md"
          style={{ borderColor: `${ACCENT}40`, background: 'rgba(10,18,35,0.75)' }}
        >
          <span className="font-display text-3xl" style={{ color: ACCENT }}>18+</span>
          <span className="text-white text-xs font-semibold tracking-wide">Export Countries</span>
          <span className="text-slate-500 text-[10px]">Active markets</span>
        </div>
      </section>

      {/* ── 2. MetricsBar ───────────────────────────────────────────────────── */}
      <MetricsBar metrics={metrics} accentHex={ACCENT} dark />

      {/* ── 3. Vision & Mission ─────────────────────────────────────────────── */}
      <section className="py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — rich text */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: ACCENT }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Our Vision</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-6">
                Connecting South Asian Growers to the World
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5 text-sm">
                Network71&apos;s Agriculture Division was founded on a single conviction: the extraordinary agricultural wealth of South Asia remains underserved by modern global trade infrastructure. We exist to change that.
              </p>
              <p className="text-slate-500 leading-relaxed mb-5 text-sm">
                By embedding directly within farming communities &mdash; building trust, providing training, and offering fair pricing before a single crop is planted &mdash; we create supply chains that are genuinely sustainable rather than extractive.
              </p>
              <p className="text-slate-500 leading-relaxed text-sm">
                Our processing hubs, cold-chain logistics, and direct export relationships mean that when a buyer in Dubai or Rotterdam sources from Network71, they can trace every batch back to a named district, a certified practice, and a farmer who earned a fair margin.
              </p>
            </div>

            {/* Right — values */}
            <div className="space-y-4">
              {values.map((v) => (
                <div
                  key={v.label}
                  className="flex gap-5 items-start p-5 bg-white rounded-xl border border-slate-100 hover:border-green-200 transition-colors"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: ACCENT }}
                  />
                  <div>
                    <h3 className="font-display text-lg text-navy mb-1">{v.label}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Crop Portfolio ───────────────────────────────────────────────── */}
      <section id="crop-portfolio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Product Range</span>
              <div className="h-px w-8" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-4">Crop Portfolio</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
              Six commodity categories — each processed, graded, and documented to meet the requirements of international buyers across food retail, food service, and industrial processing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {crops.map((c) => (
              <div
                key={c.name}
                className="group p-7 rounded-2xl border border-slate-100 hover:border-green-300 bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${ACCENT}12` }}
                  >
                    {c.emoji}
                  </div>
                  <div
                    className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: ACCENT }}
                  />
                </div>
                <h3 className="font-display text-xl text-navy mb-2 leading-tight">{c.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Smart Farming & Technology ───────────────────────────────────── */}
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>AgriTechnology</span>
              <div className="h-px w-8" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-4">Smart Farming &amp; Technology</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              Traditional agricultural knowledge amplified by modern data tools &mdash; improving yield, reducing waste, and creating transparent supply chains.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-14">
            {techCards.map((t) => (
              <div
                key={t.title}
                className="p-7 rounded-2xl border transition-all duration-300 hover:border-green-500/30 group"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: `${ACCENT}18`, border: `1px solid ${ACCENT}30` }}
                >
                  {t.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-3 leading-tight">{t.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Data dashboard mockup */}
          <div
            className="rounded-2xl p-8 border"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full" style={{ background: ACCENT }} />
              <span className="text-white text-sm font-semibold">N71 AgriOps Dashboard</span>
              <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${ACCENT}20`, color: ACCENT }}>Live</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Active Farm Lots', val: '847' },
                { label: 'Avg Yield Index', val: '94.2' },
                { label: 'Cold Chain Uptime', val: '99.1%' },
                { label: 'Pending Shipments', val: '23' },
              ].map((d) => (
                <div key={d.label} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="font-display text-2xl text-white mb-1">{d.val}</div>
                  <div className="text-slate-500 text-[11px]">{d.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. ProcessFlow ──────────────────────────────────────────────────── */}
      <ProcessFlow steps={processSteps} accentHex={ACCENT} label="Farm-to-Market Journey" />

      {/* ── 7. Supply Chain ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Supply Chain</span>
              <div className="h-px w-8" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">End-to-End Value Chain</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-0 items-stretch">
            {/* LEFT */}
            <div className="relative p-8 rounded-2xl lg:rounded-r-none border border-slate-100 bg-neutral">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-xl" style={{ background: `${ACCENT}15` }}>🌱</div>
              <h3 className="font-display text-xl text-navy mb-3">Farmer Network</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                  500+ farming partners
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                  10,000+ acres under management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                  Multiple producing districts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                  Organic &amp; conventional lots
                </li>
              </ul>
              {/* Arrow right — hidden on mobile */}
              <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center border-2 border-white" style={{ background: ACCENT }}>
                <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* CENTER */}
            <div className="relative p-8 border border-slate-100 lg:border-x-0 text-center" style={{ background: '#f0fdf4' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 text-2xl" style={{ background: ACCENT }}>🏭</div>
              <h3 className="font-display text-xl text-navy mb-3">N71 Processing Hub</h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                {['Sorting & Grading', 'Cleaning & Milling', 'Quality Lab Testing', 'Cold Chain Storage', 'Value-Add Processing', 'Export Packaging'].map((item) => (
                  <div key={item} className="px-2 py-1.5 rounded-lg bg-white border border-slate-100">{item}</div>
                ))}
              </div>
              {/* Arrow right — hidden on mobile */}
              <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center border-2 border-white" style={{ background: ACCENT }}>
                <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-8 rounded-2xl lg:rounded-l-none border border-slate-100 bg-neutral">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-xl" style={{ background: `${ACCENT}15` }}>🌍</div>
              <h3 className="font-display text-xl text-navy mb-3">Global Markets</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                  18+ destination countries
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                  Retail supermarket chains
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                  Industrial food processors
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                  Institutional bulk buyers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Quality & Compliance ─────────────────────────────────────────── */}
      <section className="py-24 bg-neutral" ref={qualityRef.ref}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Standards</span>
              <div className="h-px w-8" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-4">Quality &amp; Compliance</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
              Every shipment leaves our facility backed by rigorous laboratory verification and internationally recognised certifications.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Certifications */}
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex gap-5 p-5 bg-white rounded-xl border border-slate-100">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}25` }}
                  >
                    <svg className="w-4 h-4" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-sm mb-1">{cert.name}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bars */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100">
              <h3 className="font-display text-xl text-navy mb-6">Performance Metrics</h3>
              {qualityBars.map((bar) => (
                <AnimatedBar key={bar.label} label={bar.label} value={bar.value} accentHex={ACCENT} triggered={qualityRef.inView} />
              ))}
              <p className="text-slate-400 text-xs mt-4">* Metrics reflect division targets. Verified data to be published upon completion of current audit cycle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Sustainability ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white" ref={sustainRef.ref}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — story */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: ACCENT }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Sustainability</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-6">
                Responsible Agriculture, Real Impact
              </h2>

              {/* Impact callout */}
              <div
                className="flex items-center gap-5 p-5 rounded-2xl mb-8"
                style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}25` }}
              >
                <div className="font-display text-4xl text-navy" style={{ color: ACCENT }}>37,500+</div>
                <div>
                  <div className="text-navy font-semibold text-sm">Lives Impacted</div>
                  <div className="text-slate-500 text-xs">Across farming families and rural communities in our supply network</div>
                </div>
              </div>

              {/* Three pillars */}
              <div className="space-y-5">
                {[
                  { title: 'Farmer Livelihoods', desc: 'Fair pricing, pre-season contracts, and on-farm training that raise household income and reduce vulnerability.' },
                  { title: 'Environmental Stewardship', desc: 'Promoting water-smart irrigation, soil health practices, and reduction of synthetic inputs across partner farms.' },
                  { title: 'Community Development', desc: 'Investment in rural infrastructure, school programmes, and women-led agricultural micro-enterprises.' },
                ].map((p) => (
                  <div key={p.title} className="flex gap-4 items-start">
                    <div className="w-1 h-16 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                    <div>
                      <h3 className="font-semibold text-navy text-sm mb-1">{p.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — progress bars */}
            <div>
              <h3 className="font-display text-xl text-navy mb-6">Sustainability Progress</h3>
              {sustainBars.map((bar) => (
                <AnimatedBar key={bar.label} label={bar.label} value={bar.value} accentHex={ACCENT} triggered={sustainRef.inView} />
              ))}
              <p className="text-slate-400 text-xs mt-2 mb-8">* Figures reflect current programme coverage across registered partner farms.</p>

              {/* UN SDG callout */}
              <div className="p-5 rounded-xl border border-slate-100 bg-neutral">
                <div className="text-xs font-semibold text-slate-500 mb-3 tracking-wide uppercase">Aligned with UN SDGs</div>
                <div className="flex flex-wrap gap-2">
                  {['SDG 1 — No Poverty', 'SDG 2 — Zero Hunger', 'SDG 8 — Decent Work', 'SDG 12 — Responsible Consumption'].map((sdg) => (
                    <span
                      key={sdg}
                      className="px-2.5 py-1 text-[10px] font-semibold rounded-full"
                      style={{ background: `${ACCENT}15`, color: '#15803d' }}
                    >
                      {sdg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Key Markets ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Global Reach</span>
              <div className="h-px w-8" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-4">Key Markets</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              From the origin farms of South Asia to premium retail shelves in Europe, our agricultural products reach 18+ markets across five world regions.
            </p>
          </div>

          {/* World region grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {markets.map((m) => (
              <div
                key={m.region}
                className="p-5 rounded-2xl border transition-all hover:scale-[1.02] duration-200"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: `${m.color}30` }}
              >
                <div className="text-3xl mb-3">{m.flag}</div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: m.color }}>{m.role}</div>
                <h3 className="font-display text-lg text-white mb-2">{m.region}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>

          {/* Simple SVG world strip */}
          <div className="mt-12 flex items-center justify-center gap-3 flex-wrap">
            {['🇧🇩', '🇮🇳', '🇦🇪', '🇸🇦', '🇶🇦', '🇬🇧', '🇩🇪', '🇳🇱', '🇲🇾', '🇸🇬', '🇰🇪', '🇬🇭'].map((flag, i) => (
              <span key={i} className="text-2xl grayscale hover:grayscale-0 transition-all duration-200 cursor-default" title="Destination market">{flag}</span>
            ))}
            <span className="text-slate-500 text-sm ml-2">+6 more markets</span>
          </div>
        </div>
      </section>

      {/* ── 11. Business Opportunities ──────────────────────────────────────── */}
      <section className="py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Opportunities</span>
              <div className="h-px w-8" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-4">Work With Our Agriculture Division</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">Three pathways for businesses looking to access South Asian agricultural supply.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {opportunities.map((o) => (
              <div
                key={o.title}
                className="group relative flex flex-col p-8 rounded-2xl bg-white border border-slate-100 hover:border-green-300 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="absolute top-0 left-8 w-16 h-0.5 rounded-full"
                  style={{ background: ACCENT }}
                />
                <h3 className="font-display text-xl text-navy mt-4 mb-3 leading-tight">{o.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{o.desc}</p>
                <a
                  href="#sector-contact"
                  className="flex items-center gap-2 text-sm font-bold transition-all"
                  style={{ color: ACCENT }}
                >
                  {o.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. Farmer Partnership Program ──────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — content */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: ACCENT }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Farmer Program</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-5">
                Join the Network71 Farmer Partnership
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                We are actively expanding our network of farming partners across Bangladesh and South Asia. Whether you manage smallholder plots or commercial farmland, Network71 offers a structured partnership model that provides guaranteed market access, fair pricing, and on-farm support.
              </p>
              <a
                href="#sector-contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-bold text-sm text-navy rounded-lg transition-all hover:opacity-90"
                style={{ background: ACCENT }}
              >
                Register as Supplier
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Right — benefit cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {farmerBenefits.map((b) => (
                <div key={b.title} className="p-6 rounded-xl border border-slate-100 bg-neutral hover:border-green-200 transition-colors">
                  <div className="text-2xl mb-3">{b.icon}</div>
                  <h3 className="font-semibold text-navy text-sm mb-2">{b.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. Growth Roadmap ──────────────────────────────────────────────── */}
      <section className="py-24 bg-neutral overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Roadmap</span>
              <div className="h-px w-8" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">Growth Roadmap</h2>
          </div>

          {/* Horizontal timeline */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-px" style={{ background: `${ACCENT}30` }} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {roadmap.map((r, i) => (
                <div key={r.year} className="relative">
                  <div className="flex lg:flex-col items-start gap-4 lg:gap-0">
                    {/* Year bubble */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-display text-sm font-bold text-navy flex-shrink-0 lg:mb-6 relative z-10"
                      style={{ background: ACCENT }}
                    >
                      {r.year.slice(2)}
                    </div>
                    <div>
                      <div className="font-bold text-navy text-sm mb-1" style={{ color: ACCENT }}>{r.year}</div>
                      <h3 className="font-display text-lg text-navy mb-2 leading-tight">{r.milestone}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 14. SectorContact ───────────────────────────────────────────────── */}
      <SectorContact
        divisionName="Agriculture & Agro Products"
        accentHex={ACCENT}
        inquiryTypes={['Buyer Inquiry', 'Export Partnership', 'Processing JV', 'Farmer/Supplier Registration', 'Investment Inquiry']}
      />

      {/* ── 15. Footer ──────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  )
}
