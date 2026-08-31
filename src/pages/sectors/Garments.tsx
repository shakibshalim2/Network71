import { useEffect, useRef, useState } from 'react'
import SectorHeader from '@/components/sector/SectorHeader'
import ProcessFlow from '@/components/sector/ProcessFlow'
import MetricsBar from '@/components/sector/MetricsBar'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'

const ACCENT = '#f43f5e'

/* ─── DATA ─────────────────────────────────────────────── */

const metrics = [
  { value: '5+', label: 'Factories', desc: 'Production facilities' },
  { value: '2,000+', label: 'Workers', desc: 'Skilled workforce' },
  { value: '15+', label: 'Export Countries', desc: 'Global reach' },
  { value: '—', label: 'Annual Capacity', desc: 'Data to be published' },
]

const processSteps = [
  {
    title: 'Design Brief',
    desc: 'Client mood boards, tech packs, and specification review to align vision with production capability.',
  },
  {
    title: 'Sampling',
    desc: 'Rapid prototype development — first samples typically delivered within 7–10 working days.',
  },
  {
    title: 'Material Sourcing',
    desc: 'Certified mill selection, swatch testing, and cost-optimised fabric procurement from trusted suppliers.',
  },
  {
    title: 'Cut & Sew',
    desc: 'Precision pattern grading, automated fabric cutting, and assembly by trained operators across multiple lines.',
  },
  {
    title: 'Quality Inspection',
    desc: 'In-line and end-line QC checks against international AQL standards at every production stage.',
  },
  {
    title: 'Finishing & Packing',
    desc: 'Pressing, trimming, tagging, retail-ready packaging, and carton consolidation per buyer specs.',
  },
  {
    title: 'Export Logistics',
    desc: 'Full documentation, customs compliance, and global freight coordination to buyer destination.',
  },
]

const productCategories = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    name: 'Woven Fabrics & Shirting',
    desc: 'Premium woven dress shirts, formal wear, and structured tops manufactured with precision loom-integrated fabrics.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" d="M3 6c3 0 3 3 6 3s3-3 6-3 3 3 6 3M3 12c3 0 3 3 6 3s3-3 6-3 3 3 6 3M3 18c3 0 3 3 6 3s3-3 6-3 3 3 6 3" />
      </svg>
    ),
    name: 'Knitwear & Jersey',
    desc: 'T-shirts, polo shirts, hoodies, sweatshirts, and knitted essentials for everyday and premium lifestyle segments.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l1 8H5L6 3zM5 11v10h14V11" />
      </svg>
    ),
    name: 'Denim & Bottoms',
    desc: 'Jeans, chinos, cargo pants, and structured bottoms for men, women, and children across all fit categories.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L4 7v5c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V7l-8-4z" />
      </svg>
    ),
    name: 'Outerwear & Jackets',
    desc: 'Windbreakers, padded jackets, coats, and weather-resistant outer layers built for global climate conditions.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    name: 'Active & Sportswear',
    desc: 'Performance apparel, yoga wear, running gear, and technical moisture-wicking fabrics for active lifestyle brands.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C8 3 5 7 5 12s3 9 7 9 7-4 7-9-3-9-7-9z" />
        <path strokeLinecap="round" d="M9 12c0-2 1-4 3-4M12 8v1M12 15v1" />
      </svg>
    ),
    name: 'Sustainable Textiles',
    desc: 'Organic cotton, recycled fibres, and eco-certified fabric lines manufactured to OEKO-TEX and sustainable standards.',
  },
]

const manufacturingPillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Full Package Production',
    abbr: 'FPP',
    desc: 'End-to-end manufacturing from raw material procurement through finished goods delivery. We handle design, sourcing, production, QC, and logistics under one roof.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6-6 6 6M6 15l6 6 6-6" />
      </svg>
    ),
    title: 'Cut Make Trim',
    abbr: 'CMT',
    desc: 'Buyer-supplied fabric converted into finished garments. Our CMT service offers precision cutting, expert construction, and professional trim application.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10M7 12h10M7 17h4" />
        <rect x="2" y="3" width="20" height="18" rx="2" />
      </svg>
    ),
    title: 'OEM & Private Label',
    abbr: 'OEM',
    desc: 'Your brand. Our production. Complete private-label manufacturing with full IP confidentiality, custom labelling, and buyer-branded packaging from first stitch.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Sample Development',
    abbr: 'R&D',
    desc: 'Rapid prototype development with dedicated sampling teams. First samples within 7–10 working days. Counter-samples, pre-production, and approval management.',
  },
]

const techCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
    title: 'CAD / Pattern Design',
    desc: 'Computer-aided design systems for precision pattern grading, marker making, and digital fabric utilisation optimisation — reducing waste and improving fit accuracy.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'ERP Production Tracking',
    desc: 'Enterprise resource planning systems providing real-time visibility into production progress, material consumption, and order status across all factory floors.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Digital Quality Control',
    desc: 'Digitised QC workflows with AQL-based defect tracking, photographic documentation, and buyer-facing audit reports generated at each inspection point.',
  },
]

const certifications = [
  {
    code: 'WRAP',
    name: 'Worldwide Responsible Accredited Production',
    status: 'active',
    desc: 'Ethical manufacturing, workplace safety, and human rights compliance certification.',
  },
  {
    code: 'ISO 9001',
    name: 'Quality Management Systems',
    status: 'active',
    desc: 'International standard for consistent quality management across production processes.',
  },
  {
    code: 'OEKO-TEX',
    name: 'Standard 100 — Textile Safety',
    status: 'progress',
    desc: 'Certification in Progress — testing every component against harmful substance limits.',
  },
  {
    code: 'BSCI',
    name: 'Business Social Compliance Initiative',
    status: 'active',
    desc: 'Social audit readiness covering labour rights, health, safety, and environmental standards.',
  },
]

const sustainabilityTargets = [
  { label: 'Organic & Recycled Material Use', target: 60, unit: '%' },
  { label: 'Water Recycling in Wet Processing', target: 50, unit: '%' },
  { label: 'Carbon Footprint Reduction', target: 40, unit: '%' },
  { label: 'Worker Welfare Programme Coverage', target: 100, unit: '%' },
]

const exportMarkets = [
  { flag: '🇺🇸', region: 'United States', note: 'Primary export market', tier: 'primary' },
  { flag: '🇬🇧', region: 'United Kingdom', note: 'Established channel', tier: 'primary' },
  { flag: '🇩🇪', region: 'Germany', note: 'Growing European hub', tier: 'secondary' },
  { flag: '🇫🇷', region: 'France', note: 'Fashion-forward segment', tier: 'secondary' },
  { flag: '🇦🇺', region: 'Australia', note: 'Active lifestyle demand', tier: 'secondary' },
  { flag: '🇯🇵', region: 'Japan', note: 'Premium quality focus', tier: 'secondary' },
  { flag: '🇦🇪', region: 'UAE', note: 'Middle East gateway', tier: 'secondary' },
  { flag: '🇨🇦', region: 'Canada', note: 'North America expansion', tier: 'secondary' },
]

const buyerTypes = [
  {
    title: 'International Brands',
    subtitle: 'Private Label Manufacturing',
    icon: '🏷️',
    desc: 'Dedicated OEM production under your brand identity with full IP confidentiality. We manage every stage from sample development to container loading.',
    points: ['Full tech pack support', 'Buyer-branded packaging', 'Dedicated production lines', 'Flexible MOQ negotiations'],
    cta: 'Request Private Label RFQ',
  },
  {
    title: 'Wholesale Buyers',
    subtitle: 'Bulk Order Fulfilment',
    icon: '📦',
    desc: 'High-volume production with consistent quality across large order quantities. Competitive pricing structures for seasonal and ongoing wholesale programmes.',
    points: ['Competitive bulk pricing', 'Consistent quality at scale', 'On-time delivery commitment', 'Multiple category sourcing'],
    cta: 'Explore Wholesale Terms',
  },
  {
    title: 'Boutique Retailers',
    subtitle: 'Small MOQ Collections',
    icon: '✨',
    desc: 'Accessible manufacturing for emerging brands and independent retailers. Small minimum order quantities with the same quality standards as major buyers.',
    points: ['Low MOQ available', 'Custom design support', 'Agile production timeline', 'Sustainable fabric options'],
    cta: 'Inquire About Small Orders',
  },
]

const roadmap = [
  {
    year: '2025',
    title: 'Capacity Expansion',
    desc: 'Scaling production floor capacity with additional cutting lines and sewing stations across existing facilities to meet growing international demand.',
  },
  {
    year: '2026',
    title: 'Sustainable Product Line',
    desc: 'Launch of dedicated sustainable garment collection using certified organic and recycled fibre inputs, targeting eco-conscious international buyers.',
  },
  {
    year: '2027',
    title: 'Tech-Integrated Production',
    desc: 'Full integration of automated cutting systems, IoT-enabled quality monitoring, and real-time buyer portals for transparent production tracking.',
  },
]

/* ─── COMPONENT ─────────────────────────────────────────── */

export default function Garments() {
  const sustainRef = useRef<HTMLDivElement>(null)
  const [sustainVisible, setSustainVisible] = useState(false)

  useEffect(() => {
    const el = sustainRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSustainVisible(true)
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-full bg-white">
      <SectorHeader divisionName="Garments & Apparel" accentClass="text-rose-400" />

      {/* ── 1. HERO ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=800&fit=crop&auto=format"
            alt="Garment manufacturing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.75) 50%, rgba(10,15,30,0.55) 100%)' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${ACCENT}18 0%, transparent 40%)` }} />
        </div>

        {/* Decorative grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Network71 — Division 01
              </span>
            </div>

            <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.95] tracking-[-0.02em] mb-8">
              Garments<br />
              <span style={{ color: ACCENT }}>&</span> Apparel
            </h1>

            <p className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-4 max-w-xl">
              Private-label manufacturing and full-package production built for the world&apos;s most demanding fashion markets.
            </p>
            <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-xl">
              From Bangladesh to the globe — sustainable fashion, uncompromising quality, and industrial precision at every stage of the supply chain.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#sector-contact"
                className="px-8 py-4 font-semibold text-sm text-white rounded-lg transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: ACCENT }}
              >
                Request RFQ
              </a>
              <a
                href="#overview"
                className="px-8 py-4 border border-white/25 text-white text-sm font-medium rounded-lg hover:bg-white/8 transition-all"
              >
                Explore Division
              </a>
            </div>
          </div>

          {/* Hero bottom stat strip */}
          <div className="absolute bottom-10 right-8 hidden lg:flex items-center gap-8">
            {['Bangladesh Based', '15+ Export Markets', 'ISO Compliant'].map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                <span className="text-slate-400 text-xs tracking-wide">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. METRICS BAR ────────────────────────────────── */}
      <MetricsBar metrics={metrics} accentHex={ACCENT} dark />

      {/* ── 3. DIVISION OVERVIEW / VISION ─────────────────── */}
      <section id="overview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — rich text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10" style={{ background: ACCENT }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                  Division Overview
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-6">
                Manufacturing<br />Leadership at Scale
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Network71&apos;s Garments &amp; Apparel division is one of Bangladesh&apos;s emerging private-label manufacturing operations — combining industrial-scale production capacity with the craftsmanship precision demanded by international fashion brands.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                We serve international buyers across 15+ countries with a full-package manufacturing model that spans design consultation, material sourcing, cut and sew operations, quality assurance, and export logistics — all under one coordinated supply chain.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our commitment to sustainable fashion is embedded in every production decision — from certified fabric selection to worker welfare programmes that set a benchmark for responsible apparel manufacturing in South Asia.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Private Label Focus', 'Sustainable Manufacturing', 'Full Package Production', 'Export Ready'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium rounded-full border"
                    style={{ color: ACCENT, borderColor: `${ACCENT}40`, background: `${ACCENT}08` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — value pillars grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', title: 'Speed-to-Market', desc: 'Compressed lead times with agile production scheduling and dedicated sampling teams.' },
                { icon: '✓', title: 'Quality Assurance', desc: 'AQL-based inspection at every production stage. Zero-compromise quality control protocols.' },
                { icon: '🌿', title: 'Sustainable Practice', desc: 'Certified organic fibres, water recycling, and energy-efficient factory operations.' },
                { icon: '🌐', title: 'Global Standards', desc: 'WRAP, BSCI, and international buyer code-of-conduct compliance across all facilities.' },
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-rose-100 hover:shadow-lg transition-all group"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform"
                    style={{ background: `${ACCENT}10` }}
                  >
                    {pillar.icon}
                  </div>
                  <h3 className="font-display text-base text-navy mb-2">{pillar.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PRODUCT CATEGORIES ─────────────────────────── */}
      <section className="py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background: ACCENT }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                  Product Portfolio
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">
                Six Core<br />Category Verticals
              </h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs lg:max-w-sm lg:text-right">
              Our manufacturing capability spans a comprehensive range — from mass-market essentials to technically demanding performance and sustainable lines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {productCategories.map((cat) => (
              <div
                key={cat.name}
                className="group p-7 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1 cursor-default"
                style={{ background: `${ACCENT}06`, borderColor: `${ACCENT}20` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ color: ACCENT, background: `${ACCENT}12` }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-display text-lg text-navy mb-2">{cat.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{cat.desc}</p>
                <div className="mt-5 h-px" style={{ background: `${ACCENT}25` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. MANUFACTURING EXCELLENCE ───────────────────── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: ACCENT }} />
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
              Manufacturing Excellence
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">
              Four Production<br />Service Modes
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed lg:pt-2">
              Network71&apos;s garment factories operate across four distinct service models — enabling us to meet the precise requirements of each buyer relationship, from turnkey full-package production to buyer-supplied CMT operations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {manufacturingPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-7 rounded-2xl group hover:-translate-y-1 transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ color: ACCENT, background: `${ACCENT}15`, border: `1px solid ${ACCENT}25` }}
                >
                  {pillar.icon}
                </div>
                <div className="text-[10px] font-bold tracking-[0.25em] mb-2" style={{ color: ACCENT }}>{pillar.abbr}</div>
                <h3 className="font-display text-lg text-white mb-3">{pillar.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Production process visual diagram */}
          <div className="mt-16 pt-12 border-t border-white/8">
            <p className="text-slate-500 text-[10px] tracking-[0.2em] uppercase mb-8">Production Flow Overview</p>
            <div className="flex flex-wrap items-center gap-0">
              {['Raw Materials', 'Pattern Making', 'Fabric Cutting', 'Sewing Lines', 'QC Inspection', 'Finishing', 'Export'].map((stage, i, arr) => (
                <div key={stage} className="flex items-center">
                  <div
                    className="px-4 py-2.5 rounded-lg text-[11px] font-semibold text-white"
                    style={{ background: i === 0 || i === arr.length - 1 ? ACCENT : 'rgba(255,255,255,0.06)', border: `1px solid ${i === 0 || i === arr.length - 1 ? ACCENT : 'rgba(255,255,255,0.1)'}` }}
                  >
                    {stage}
                  </div>
                  {i < arr.length - 1 && (
                    <svg className="w-5 h-5 mx-1 flex-shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PROCESS FLOW COMPONENT ─────────────────────── */}
      <ProcessFlow
        steps={processSteps}
        accentHex={ACCENT}
        label="From Concept to Container"
      />

      {/* ── 7. TECHNOLOGY & INNOVATION ────────────────────── */}
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background: ACCENT }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                  Technology & Innovation
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">
                Digital Infrastructure<br />Behind Every Order
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-slate-400 text-sm leading-relaxed">
                Our technology stack enables real-time visibility, precision manufacturing, and transparent buyer communication throughout every production cycle.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {techCards.map((card) => (
              <div
                key={card.title}
                className="p-8 rounded-2xl group hover:-translate-y-1 transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${ACCENT}20` }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ color: ACCENT, background: `${ACCENT}15` }}
                >
                  {card.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Ezyify integration mention */}
          <div
            className="p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}25` }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
              style={{ background: ACCENT, color: 'white' }}
            >
              Ez
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-1">Ezyify Platform Integration</div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Network71&apos;s Garments division integrates with the Ezyify platform — enabling streamlined order management, buyer communication, and production milestone tracking in a single digital environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FACILITIES ─────────────────────────────────── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background: ACCENT }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                  Our Facilities
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-6">
                Industrial-Scale<br />Production Floors
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Network71 operates multiple production facilities in Bangladesh — equipped with modern machinery, structured production lines, and dedicated quality control zones engineered to meet international buyer standards.
              </p>

              {/* Facility stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: 'TBP', label: 'Production Floor', sub: 'To be published' },
                  { value: 'TBP', label: 'Cutting Lines', sub: 'To be published' },
                  { value: '2,000+', label: 'Sewing Stations', sub: 'Skilled operators' },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl border border-slate-100 text-center bg-neutral">
                    <div className="font-display text-xl text-navy mb-1" style={{ color: ACCENT }}>{stat.value}</div>
                    <div className="text-navy text-[11px] font-semibold mb-0.5">{stat.label}</div>
                    <div className="text-slate-400 text-[10px]">{stat.sub}</div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 italic">
                Detailed facility specifications to be published. Contact the division for a factory capability deck.
              </p>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 rounded-2xl overflow-hidden h-52">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&auto=format"
                  alt="Factory production floor"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-44">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=350&fit=crop&auto=format"
                  alt="Garment production"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-44">
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=350&fit=crop&auto=format"
                  alt="Textile materials"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. QUALITY & COMPLIANCE ───────────────────────── */}
      <section className="py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Quality & Compliance
              </span>
              <div className="h-px w-10" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-4">
              Certified. Audited. Compliant.
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              Our quality management system and compliance framework meet the requirements of the world&apos;s most stringent international buyer codes of conduct.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {certifications.map((cert) => (
              <div
                key={cert.code}
                className="p-7 rounded-2xl bg-white border border-slate-100 hover:shadow-lg hover:border-rose-100 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="px-3 py-1 rounded-lg text-xs font-bold tracking-wider"
                    style={{ background: cert.status === 'active' ? `${ACCENT}12` : 'rgba(251,191,36,0.12)', color: cert.status === 'active' ? ACCENT : '#d97706' }}
                  >
                    {cert.code}
                  </div>
                  {cert.status === 'active' ? (
                    <svg className="w-4 h-4" style={{ color: ACCENT }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <h3 className="font-semibold text-navy text-sm mb-2">{cert.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{cert.desc}</p>
                {cert.status === 'progress' && (
                  <div className="mt-3 text-[10px] text-amber-600 font-medium">Certification in Progress</div>
                )}
              </div>
            ))}
          </div>

          {/* Audit compliance bar */}
          <div className="p-8 rounded-2xl bg-white border border-slate-100">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-display text-xl text-navy mb-2">Factory Audit Ready</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  All Network71 facilities maintain continuous audit readiness for BSCI, amfori, and buyer-commissioned third-party social compliance audits.
                </p>
              </div>
              {[
                { label: 'AQL Inspection Standard', note: 'Applied at every production stage' },
                { label: 'Third-Party Audit', note: 'Available on buyer request' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: ACCENT }} />
                  <div>
                    <div className="text-navy font-semibold text-sm mb-1">{item.label}</div>
                    <div className="text-slate-400 text-xs">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. SUSTAINABILITY ────────────────────────────── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left text */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background: ACCENT }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                  Sustainability
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">
                Responsible Fashion<br />Manufacturing
              </h2>
              <p className="text-slate-400 leading-relaxed mb-5">
                Network71&apos;s Garments division is actively building one of the most responsible apparel supply chains in Bangladesh — embedding sustainability into sourcing decisions, production processes, and workforce development.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Our sustainability roadmap sets measurable targets across material use, water management, carbon reduction, and worker welfare — with transparent progress reporting to international buyers.
              </p>
              <a
                href="#sector-contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: ACCENT }}
              >
                Sustainability Partnership Inquiry
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Right — progress bars */}
            <div ref={sustainRef} className="space-y-6">
              {sustainabilityTargets.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: ACCENT }}>
                      {item.target}{item.unit} <span className="text-slate-500 font-normal text-xs">target</span>
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}cc)`,
                        width: sustainVisible ? `${item.target}%` : '0%',
                        transitionDelay: `${i * 150}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-slate-500 text-xs mt-4 italic">
                Progress metrics reflect divisional targets. Actual measurements to be published upon data collection completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. SUPPLY CHAIN ──────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Supply Chain
              </span>
              <div className="h-px w-10" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight mb-4">
              Integrated Supply Chain<br />From Source to Buyer
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
              Based in Bangladesh — the world&apos;s second-largest garment exporter — Network71 operates a vertically integrated supply chain connecting global raw material suppliers to international buyers across 15+ countries.
            </p>
          </div>

          {/* Supply chain flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch mb-12">
            {[
              {
                icon: '🌾',
                title: 'Raw Material Suppliers',
                items: ['Certified fabric mills', 'Trim & accessory suppliers', 'Sustainable fibre sources'],
              },
              null,
              {
                icon: '🏭',
                title: 'N71 Factories',
                items: ['Pattern & cutting', 'Sewing & assembly', 'Washing & finishing'],
              },
              null,
              {
                icon: '✈️',
                title: 'Export & Logistics',
                items: ['QC lab clearance', 'Customs documentation', 'Freight to buyer'],
              },
            ].map((col, i) => {
              if (col === null) {
                return (
                  <div key={i} className="flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-300 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )
              }
              return (
                <div
                  key={col.title}
                  className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-rose-100 hover:shadow-lg transition-all text-center"
                >
                  <div className="text-3xl mb-4">{col.icon}</div>
                  <h3 className="font-display text-base text-navy mb-3">{col.title}</h3>
                  <ul className="space-y-1.5">
                    {col.items.map((item) => (
                      <li key={item} className="text-xs text-slate-500 flex items-center gap-2 justify-center">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Bangladesh context */}
          <div
            className="p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{ background: `${ACCENT}06`, border: `1px solid ${ACCENT}15` }}
          >
            <div className="text-4xl">🇧🇩</div>
            <div className="flex-1">
              <h4 className="font-semibold text-navy text-sm mb-1">Bangladesh — World&apos;s Premier Garment Export Hub</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Bangladesh is the world&apos;s second-largest apparel exporter, providing Network71 with access to one of the deepest pools of skilled garment workers, established textile infrastructure, and competitive production economics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. KEY EXPORT MARKETS ────────────────────────── */}
      <section className="py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background: ACCENT }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                  Export Markets
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">
                15+ Countries.<br />One Supply Chain.
              </h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Network71 garments reach buyers across major fashion markets on four continents. Export coverage is expanding as we scale capacity and establish new buyer relationships.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {exportMarkets.map((market) => (
              <div
                key={market.region}
                className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-rose-100 hover:shadow-md transition-all text-center group"
              >
                <div className="text-3xl mb-3">{market.flag}</div>
                <h3 className="font-semibold text-navy text-sm mb-1">{market.region}</h3>
                <p className="text-slate-400 text-xs">{market.note}</p>
                {market.tier === 'primary' && (
                  <div
                    className="mt-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold inline-block"
                    style={{ background: `${ACCENT}12`, color: ACCENT }}
                  >
                    Primary
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-100 text-center">
            <p className="text-slate-400 text-sm">
              Additional export markets: <span className="text-navy font-medium">Data to be published</span> — Contact the division for full market coverage details.
            </p>
          </div>
        </div>
      </section>

      {/* ── 13. BUSINESS OPPORTUNITY ──────────────────────── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Business Opportunity
              </span>
              <div className="h-px w-10" style={{ background: ACCENT }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-4">
              Work With Our<br />Garments Division
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
              Whether you are an international brand seeking private-label production, a wholesale buyer, or an emerging boutique — we have a manufacturing model built for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {buyerTypes.map((buyer) => (
              <div
                key={buyer.title}
                className="p-8 rounded-2xl group hover:-translate-y-1 transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <div className="text-3xl mb-5">{buyer.icon}</div>
                <div className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: ACCENT }}>
                  {buyer.subtitle}
                </div>
                <h3 className="font-display text-2xl text-white mb-4">{buyer.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{buyer.desc}</p>
                <ul className="space-y-2 mb-8">
                  {buyer.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href="#sector-contact"
                  className="flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                  style={{ color: ACCENT }}
                >
                  {buyer.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. GROWTH ROADMAP ────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background: ACCENT }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                  Growth Strategy
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">
                Division Roadmap<br />2025 — 2027
              </h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed lg:pt-2">
              Network71&apos;s Garments division is executing a phased growth strategy — expanding physical capacity, launching sustainable product lines, and integrating advanced production technologies over the next three years.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-[calc(1/6*100%)] right-[calc(1/6*100%)] h-px bg-slate-100" />
            <div className="hidden lg:block absolute top-8 left-[calc(1/6*100%)] w-[calc(4/6*100%)] h-px" style={{ background: `linear-gradient(90deg, ${ACCENT}60, ${ACCENT}60)` }} />

            <div className="grid lg:grid-cols-3 gap-8">
              {roadmap.map((item, i) => (
                <div key={item.year} className="relative">
                  {/* Node */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center font-display text-xl font-bold relative z-10 flex-shrink-0"
                      style={{ background: ACCENT, color: 'white', boxShadow: `0 0 0 4px ${ACCENT}20` }}
                    >
                      {item.year.slice(2)}
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] tracking-widest uppercase">{item.year}</div>
                      <h3 className="font-display text-lg text-navy">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed pl-0">{item.desc}</p>
                  {i < roadmap.length - 1 && (
                    <div className="lg:hidden h-px bg-slate-100 my-8" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 15. SECTOR CONTACT ────────────────────────────── */}
      <SectorContact
        divisionName="Garments & Apparel"
        accentHex={ACCENT}
        inquiryTypes={[
          'Buyer Inquiry',
          'Private Label Partnership',
          'Wholesale Inquiry',
          'Factory Visit',
          'Sustainability Partnership',
        ]}
      />

      {/* ── 16. FOOTER ────────────────────────────────────── */}
      <Footer />
    </div>
  )
}
