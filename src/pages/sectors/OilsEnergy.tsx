import SectorHeader from '@/components/sector/SectorHeader'
import ProcessFlow from '@/components/sector/ProcessFlow'
import MetricsBar from '@/components/sector/MetricsBar'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'

const AMBER = 'var(--accent-amber)'
const SKY = 'var(--accent-sky)'

const metrics = [
  { value: '1M+', label: 'Liters / Month', desc: 'Monthly production volume' },
  { value: '8', label: 'Distribution Centers', desc: 'Nationwide logistics network' },
  { value: 'HACCP', label: 'Certified', desc: 'International food safety standard' },
  { value: '—', label: 'Export Reach', desc: 'Data to be published' },
]

const oilProcessSteps = [
  { title: 'Raw Material Procurement', desc: 'Sourcing crude vegetable oils and oilseeds from vetted domestic and international suppliers meeting quality specifications.' },
  { title: 'Refining & Bleaching', desc: 'Removal of free fatty acids, phosphatides, and colour pigments using food-grade chemical and physical refining processes.' },
  { title: 'Deodorizing', desc: 'High-temperature steam stripping eliminates volatile odour compounds to produce neutral, shelf-stable oil.' },
  { title: 'Quality Testing', desc: 'In-house laboratory tests for FFA, peroxide value, moisture content, and microbial count at every production stage.' },
  { title: 'Filling & Packaging', desc: 'Automated filling lines for bulk tankers, industrial drums, and retail PET / HDPE bottles under hygienic conditions.' },
  { title: 'Distribution', desc: 'Temperature-monitored dispatch to retail chains, food manufacturers, and export consolidators via our 8-centre network.' },
]

const edibleOilProducts = [
  {
    name: 'Soybean Oil',
    grades: 'Refined, Double Refined',
    uses: 'Frying, cooking, food manufacturing',
    packaging: 'Bulk tanker · 200L drum · 5L / 1L retail',
  },
  {
    name: 'Palm Oil',
    grades: 'RBD Palm Olein, Super Olein',
    uses: 'Commercial frying, margarine, bakery',
    packaging: 'Bulk tanker · 200L drum · 5L retail',
  },
  {
    name: 'Sunflower Oil',
    grades: 'High-oleic, Standard refined',
    uses: 'Salad dressing, light frying, baking',
    packaging: '200L drum · 5L / 2L / 1L retail',
  },
  {
    name: 'Mustard Oil',
    grades: 'Kachi Ghani, Refined',
    uses: 'Traditional cooking, pickling, marinades',
    packaging: '200L drum · 5L / 1L retail',
  },
  {
    name: 'Blended Vegetable Oil',
    grades: 'Standard, Fortified (Vitamin A & D)',
    uses: 'Mass-market cooking, food service',
    packaging: 'Bulk · 200L drum · 5L / 2L / 1L retail',
  },
]

const fuelCapabilities = [
  {
    title: 'Petroleum Products',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71m12.02 0-.71-.71M6.34 6.34l-.71-.71" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    items: ['High-speed diesel (HSD)', 'Motor spirit (petrol)', 'Furnace oil', 'Jet fuel coordination'],
    stat: '8 centres',
    statLabel: 'distribution coverage',
  },
  {
    title: 'Industrial Fuel Supply',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    items: ['Factory & plant fuel programmes', 'Standby generator fuel contracts', 'Bulk storage management', 'Scheduled delivery scheduling'],
    stat: 'Bulk',
    statLabel: 'contract supply available',
  },
  {
    title: 'Commercial Energy Solutions',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
    items: ['Transport fleet fuel supply', 'Construction site energy', 'Hotel & hospitality sector', 'Government & institutional supply'],
    stat: 'TBP',
    statLabel: 'contract volume data',
  },
]

const supplyChainNodes = [
  { label: 'Raw Material Sourcing', sub: 'Imported + Local', color: AMBER },
  { label: 'Processing Facility', sub: 'HACCP-certified plant', color: AMBER },
  { label: 'Quality Lab', sub: 'In-house testing', color: 'var(--accent-emerald)' },
  { label: '8 Distribution Centers', sub: 'Nationwide network', color: SKY },
  { label: 'Retail / Industrial', sub: 'End buyers', color: SKY },
]

const certifications = [
  { name: 'HACCP', desc: 'Hazard Analysis and Critical Control Points — the cornerstone of our food safety management system across all edible oil operations.', prominent: true },
  { name: 'ISO 22000', desc: 'Food Safety Management System standard applied at processing and packaging stages.' },
  { name: 'BSTI Approved', desc: 'Bangladesh Standards and Testing Institution compliance for all products sold domestically.' },
  { name: 'Halal Certified', desc: 'All edible oils produced and packaged under Halal-compliant conditions.' },
  { name: 'Lab Accreditation', desc: 'In-house quality laboratory capable of FFA, peroxide value, moisture, and microbiological testing.' },
  { name: 'Fuel Safety Compliance', desc: 'Petroleum storage and distribution in line with applicable fire and safety regulations.' },
]

const techCards = [
  {
    title: 'Automated Refining Lines',
    desc: 'Continuous refining and bleaching systems with programmable logic controllers reduce batch variability and ensure consistent output quality across production runs.',
    accent: AMBER,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Quality Monitoring',
    desc: 'Inline sensors and automated sampling stations track key quality parameters continuously during production, triggering alerts before a batch can drift out of specification.',
    accent: 'var(--accent-emerald)',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Digital Distribution Management',
    desc: 'Ezyify-integrated logistics platform provides real-time dispatch tracking, route optimisation, and delivery confirmation across all 8 distribution centres, serving both oil and fuel operations.',
    accent: SKY,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
]

const sustainabilityOils = [
  { label: 'RSPO-Aligned Palm Sourcing', target: 'Target: 100% certified supply by 2027', pct: 40 },
  { label: 'Reduced Plastic Packaging', target: 'Target: 30% recycled content in retail bottles', pct: 20 },
  { label: 'Waste Oil Recycling', target: 'Target: Zero process waste to landfill', pct: 55 },
]

const sustainabilityEnergy = [
  { label: 'Responsible Fuel Storage', target: 'Secondary containment at all 8 centres', pct: 100 },
  { label: 'Spill Prevention Programme', target: 'Target: Zero reportable spill incidents', pct: 80 },
  { label: 'Environmental Compliance Audits', target: 'Annual third-party environmental audit', pct: 100 },
]

const roadmap = [
  { year: '2025', title: 'Processing Capacity Expansion', desc: 'Increase monthly refining throughput by adding a second production line at the primary facility.' },
  { year: '2026', title: 'Premium Organic Oil Line', desc: 'Launch certified organic and cold-pressed premium oil SKUs for health-conscious and export markets.' },
  { year: '2027', title: 'Renewable Energy Exploration', desc: 'Feasibility study and pilot programme for solar-powered processing operations and EV distribution fleet.' },
  { year: '2028', title: 'Cross-Border Fuel Distribution', desc: 'Expand fuel distribution capabilities to serve regional markets pending regulatory approvals and infrastructure build-out.' },
]

const markets = [
  {
    division: 'Edible Oils',
    accent: AMBER,
    segments: [
      { name: 'Consumer Retail', desc: 'Supermarkets, grocery chains, and neighbourhood retailers across Bangladesh.' },
      { name: 'Food Service', desc: 'Restaurants, caterers, fast-food chains requiring bulk and semi-bulk supply.' },
      { name: 'Industrial Food Manufacturers', desc: 'Bakeries, confectionery, snack producers, and food processing factories.' },
      { name: 'Export Markets', desc: 'Selective export to regional markets — data to be published as programmes formalise.' },
    ],
  },
  {
    division: 'Fuel & Energy',
    accent: SKY,
    segments: [
      { name: 'Commercial Transport', desc: 'Freight operators, logistics companies, and transport fleet operators.' },
      { name: 'Industrial Facilities', desc: 'Factories, power plants, and manufacturing units requiring continuous fuel supply.' },
      { name: 'Construction Sector', desc: 'Heavy equipment, generators, and site operations for infrastructure projects.' },
      { name: 'Institutional & Government', desc: 'Public sector organisations requiring compliant, documented fuel supply contracts.' },
    ],
  },
]

const opportunities = [
  {
    title: 'Edible Oil Distributors',
    desc: 'We are expanding our regional distribution partner network for edible oils across all divisions. Partners gain exclusive territory rights, competitive margins, and full marketing support.',
    cta: 'Become a Distributor',
    accent: AMBER,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7" />
      </svg>
    ),
  },
  {
    title: 'Industrial Fuel Buyers',
    desc: 'Bulk fuel supply contracts for manufacturing facilities, logistics fleets, and construction operations. Scheduled delivery, volume pricing, and dedicated account management.',
    cta: 'Discuss Bulk Supply',
    accent: SKY,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Investment Partners',
    desc: 'Capacity expansion across both edible oil processing and fuel distribution infrastructure presents structured investment opportunities for institutional and strategic partners.',
    cta: 'Investment Inquiry',
    accent: 'var(--accent-emerald)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function OilsEnergy() {
  return (
    <div className="sector-page min-h-full bg-navy">
      <SectorHeader divisionName="Oils & Energy" accentClass="text-amber-400" />
      <main className="public-content">

      {/* ── 1. SPLIT-SCREEN HERO ─────────────────────────────────── */}
      <section className="oil-hero force-dark sector-hero relative flex flex-col overflow-hidden">
        {/* Two half backgrounds */}
        <div className="absolute inset-0 flex">
          {/* Left — Edible Oils (amber) */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=700&h=800&fit=crop&auto=format"
              alt="Edible oils — golden olive oil pouring"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(120,53,15,0.82) 0%, rgba(245,158,11,0.45) 60%, transparent 100%)' }}
            />
          </div>
          {/* Right — Energy & Fuel (sky blue / dark) */}
          <div className="flex-1 relative overflow-hidden">
            <div className="energy-blueprint" aria-hidden="true"><svg viewBox="0 0 400 700" fill="none"><path d="M35 650V360h100v290M150 650V270h65v380M240 650V410h125v240M163 270V95h39v175M48 360V210h28v150M90 360V250h26v110M30 590h345M30 550h345M135 450h105M75 210h75v110h90M0 680h400" stroke="currentColor" strokeWidth="2"/><path d="M0 120h400M0 220h400M0 320h400M0 420h400M0 520h400M50 0v700M150 0v700M250 0v700M350 0v700" stroke="currentColor" strokeWidth=".5" opacity=".3"/></svg></div>
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to left, rgba(3,27,78,0.88) 0%, rgba(14,165,233,0.35) 60%, transparent 100%)' }}
            />
          </div>
        </div>

        {/* Left label — Edible Oils */}
        <div className="oil-side absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-10 max-w-[220px]">
          <div
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase mb-3 px-3 py-1 rounded-full"
            style={{ background: `color-mix(in srgb, ${AMBER} 13%, transparent)`, color: AMBER, border: `1px solid color-mix(in srgb, ${AMBER} 27%, transparent)` }}
          >
            Division A
          </div>
          <h2 className="font-display text-3xl lg:text-4xl text-white leading-snug mb-2">
            Edible<br />
            <span style={{ color: AMBER }}>Oils</span>
          </h2>
          <p className="text-amber-100/70 text-xs leading-relaxed">
            Edible oil sourcing, refining &amp; distribution enquiries
          </p>
        </div>

        {/* Right label — Energy & Fuel */}
        <div className="oil-side absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-10 max-w-[220px] text-right">
          <div
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase mb-3 px-3 py-1 rounded-full"
            style={{ background: `color-mix(in srgb, ${SKY} 13%, transparent)`, color: SKY, border: `1px solid color-mix(in srgb, ${SKY} 27%, transparent)` }}
          >
            Division B
          </div>
          <h2 className="font-display text-3xl lg:text-4xl text-white leading-snug mb-2">
            Energy<br />
            <span style={{ color: SKY }}>&amp; Fuel</span>
          </h2>
          <p className="text-sky-100/70 text-xs leading-relaxed">
            Petroleum distribution &amp; commercial energy supply
          </p>
        </div>

        {/* Center badge */}
        <div className="oil-intro absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div
            className="flex flex-col items-center text-center px-8 py-7 rounded-2xl"
            style={{
              background: 'rgba(10,20,50,0.82)',
              border: 'var(--border-strong)',
              backdropFilter: 'blur(18px)',
            }}
          >
            {/* N71 badge */}
            <div className="w-14 h-14 bg-gold rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-on-brand font-bold text-base font-display tracking-tight">N71</span>
            </div>
            <div
              className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2"
              style={{ color: AMBER }}
            >
              Network71 Division
            </div>
            <h1 className="font-display text-2xl lg:text-3xl text-white leading-tight tracking-[-0.02em] mb-3">
              Oils &amp; Energy
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `color-mix(in srgb, ${AMBER} 13%, transparent)`, color: AMBER, border: `1px solid color-mix(in srgb, ${AMBER} 25%, transparent)` }}
              >
                Edible Oils
              </span>
              <span className="text-white/30 text-xs">·</span>
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `color-mix(in srgb, ${SKY} 13%, transparent)`, color: SKY, border: `1px solid color-mix(in srgb, ${SKY} 25%, transparent)` }}
              >
                Energy &amp; Fuel
              </span>
            </div>
            <a
              href="#sector-contact"
              className="pointer-events-auto px-6 py-2.5 text-fg text-xs font-bold rounded-lg transition-all hover:opacity-90"
              style={{ background: AMBER, color: 'var(--s0)' }}
            >
              Partner Inquiry
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-50">
          <div className="w-px h-8 bg-white/40" />
          <span className="text-white text-[9px] tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* ── 2. METRICS BAR ──────────────────────────────────────── */}
      <MetricsBar metrics={metrics} accentHex={AMBER} dark />

      {/* ── 3. TWO-DIVISION OVERVIEW ────────────────────────────── */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: AMBER }}>
                Two Core Divisions
              </span>
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl text-fg mb-3">Our Business at a Glance</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              Network71&apos;s Oils &amp; Energy division bridges two essential commodity sectors — premium food-grade oils and reliable fuel supply — under a single, integrated operational infrastructure.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Edible Oils card */}
            <div
              className="rounded-2xl p-8 bg-surface-2 border hover:shadow-2xl transition-all duration-300 group"
              style={{ borderColor: `color-mix(in srgb, ${AMBER} 15%, transparent)` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `color-mix(in srgb, ${AMBER} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${AMBER} 15%, transparent)` }}
                >
                  <svg className="w-7 h-7" style={{ color: AMBER }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: AMBER }}>Division A</div>
                  <h3 className="font-display text-2xl text-fg">Edible Oils</h3>
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                From crude sourcing to consumer-ready packaging, our edible oil operations cover soybean, palm, sunflower, olive, and blended vegetable oils. HACCP-certified facilities serve both consumer retail and industrial food manufacturing segments.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {['HACCP Certified', 'Consumer + Industrial', '1M+ L/Month', '5 Oil Varieties'].map((tag) => (
                  <div
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{ background: `color-mix(in srgb, ${AMBER} 6%, transparent)`, color: 'var(--accent-amber)' }}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className="border-t pt-5" style={{ borderColor: `color-mix(in srgb, ${AMBER} 9%, transparent)` }}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Value Chain</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
                  {['Sourcing', 'Refining', 'Blending', 'Packaging', 'Distribution'].map((s, i, arr) => (
                    <span key={s} className="flex items-center gap-1.5">
                      <span>{s}</span>
                      {i < arr.length - 1 && <span className="font-bold" style={{ color: AMBER }}>›</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Energy & Fuel card */}
            <div
              className="rounded-2xl p-8 bg-surface-2 border hover:shadow-2xl transition-all duration-300 group"
              style={{ borderColor: `color-mix(in srgb, ${SKY} 15%, transparent)` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `color-mix(in srgb, ${SKY} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${SKY} 15%, transparent)` }}
                >
                  <svg className="w-7 h-7" style={{ color: SKY }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: SKY }}>Division B</div>
                  <h3 className="font-display text-2xl text-fg">Energy &amp; Fuel</h3>
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Petroleum distribution, industrial fuel supply, and commercial energy logistics spanning 8 strategically located distribution centres. We serve transport, manufacturing, construction, and institutional clients with compliant, reliable fuel programmes.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {['8 Distribution Centers', 'Bulk Contract Supply', 'Industrial-Grade', 'Regulatory Compliant'].map((tag) => (
                  <div
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{ background: `color-mix(in srgb, ${SKY} 6%, transparent)`, color: 'var(--accent-sky)' }}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className="border-t pt-5" style={{ borderColor: `color-mix(in srgb, ${SKY} 9%, transparent)` }}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Value Chain</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
                  {['Procurement', 'Storage', 'Distribution', 'Logistics', 'Client Delivery'].map((s, i, arr) => (
                    <span key={s} className="flex items-center gap-1.5">
                      <span>{s}</span>
                      {i < arr.length - 1 && <span className="font-bold" style={{ color: SKY }}>›</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. EDIBLE OILS DEEP DIVE ────────────────────────────── */}
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: AMBER }}>
                Edible Oils — Product Range
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h2 className="font-display text-4xl text-fg mb-3">
                  Five Oil Varieties.<br />
                  <span style={{ color: AMBER }}>One Quality Standard.</span>
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                  Every oil variant is refined, tested, and packaged in our HACCP-certified facility. We supply in bulk tanker, industrial drum, and retail bottle formats — meeting the needs of food manufacturers and end consumers alike.
                </p>
              </div>
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-xl flex-shrink-0"
                style={{ background: `color-mix(in srgb, ${AMBER} 6%, transparent)`, border: `1px solid color-mix(in srgb, ${AMBER} 19%, transparent)` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: AMBER, color: 'var(--s0)' }} />
                <span className="text-xs font-semibold text-amber-800">All products HACCP &amp; BSTI certified</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {edibleOilProducts.map((oil, i) => (
              <div
                key={oil.name}
                className={`rounded-2xl p-6 border transition-all hover:shadow-lg ${i === 0 ? 'lg:col-span-1' : ''}`}
                style={{ borderColor: `color-mix(in srgb, ${AMBER} 13%, transparent)`, background: i % 2 === 0 ? `color-mix(in srgb, ${AMBER} 2%, transparent)` : 'var(--s2)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `color-mix(in srgb, ${AMBER} 8%, transparent)` }}
                >
                  <svg className="w-5 h-5" style={{ color: AMBER }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-fg mb-3">{oil.name}</h3>
                <div className="space-y-2.5">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Grades</div>
                    <div className="text-xs text-slate-600">{oil.grades}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Common Uses</div>
                    <div className="text-xs text-slate-600">{oil.uses}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Packaging</div>
                    <div className="text-xs text-slate-600">{oil.packaging}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ENERGY & FUEL DEEP DIVE ──────────────────────────── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: SKY, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: SKY }}>
                Energy &amp; Fuel — Distribution Capabilities
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h2 className="font-display text-4xl text-white mb-3">
                  8 Centres.<br />
                  <span style={{ color: SKY }}>Nationwide Reach.</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                  Our fuel distribution infrastructure is built for industrial-scale reliability. Petroleum products, industrial fuel contracts, and commercial energy solutions — all managed through a digitally connected distribution network.
                </p>
              </div>
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-xl flex-shrink-0"
                style={{ background: `color-mix(in srgb, ${SKY} 7%, transparent)`, border: `1px solid color-mix(in srgb, ${SKY} 19%, transparent)` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: SKY, color: 'var(--s0)' }} />
                <span className="text-xs font-semibold" style={{ color: SKY }}>Safety-compliant storage &amp; dispatch</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {fuelCapabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-2xl p-7"
                style={{ background: 'var(--fill-2)', border: `1px solid color-mix(in srgb, ${SKY} 13%, transparent)` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in srgb, ${SKY} 8%, transparent)`, color: SKY }}
                >
                  {cap.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-3">{cap.title}</h3>
                <ul className="space-y-2 mb-6">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: SKY, color: 'var(--s0)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: `color-mix(in srgb, ${SKY} 9%, transparent)` }}
                >
                  <div>
                    <div className="font-display text-2xl" style={{ color: SKY }}>{cap.stat}</div>
                    <div className="text-slate-500 text-[11px]">{cap.statLabel}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PROCESS FLOW (Oils) ──────────────────────────────── */}
      <ProcessFlow
        steps={oilProcessSteps}
        accentHex={AMBER}
        label="Edible Oil Processing Flow"
      />

      {/* ── 7. SUPPLY CHAIN NETWORK ─────────────────────────────── */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: AMBER }}>
                Supply Chain
              </span>
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl text-fg mb-3">From Source to Shelf</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              An integrated, traceable supply chain from raw material procurement through to retail and industrial delivery — combining imported and locally sourced inputs with domestic processing excellence.
            </p>
          </div>

          {/* Horizontal flow visual */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-0 right-0 h-px hidden lg:block" style={{ background: 'linear-gradient(to right, #f59e0b60, #10b98160, #0ea5e960)' }} />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {supplyChainNodes.map((node, i) => (
                <div key={node.label} className="flex flex-col items-center text-center relative">
                  {/* Node circle */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4 z-10 text-white font-bold text-lg font-display shadow-lg"
                    style={{ background: node.color, color: 'var(--s0)', border: '4px solid var(--s2)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-semibold text-fg text-sm mb-1">{node.label}</div>
                  <div className="text-slate-500 text-xs">{node.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SVG decorative network map */}
          <div className="mt-14 rounded-2xl overflow-hidden border border-slate-200 bg-surface-2 p-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Distribution Centre Network — Schematic</div>
            <svg viewBox="0 0 800 260" className="w-full" style={{ maxHeight: 260 }}>
              {/* Background */}
              <rect width="800" height="260" fill="#f8fafc" rx="12" />

              {/* Processing hub */}
              <circle cx="400" cy="130" r="36" fill={AMBER} opacity="0.15" />
              <circle cx="400" cy="130" r="22" fill={AMBER} />
              <text x="400" y="134" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PLANT</text>

              {/* Distribution centres — arranged in a ring */}
              {[
                { x: 140, y: 60, label: 'DC 1' },
                { x: 280, y: 40, label: 'DC 2' },
                { x: 520, y: 40, label: 'DC 3' },
                { x: 660, y: 60, label: 'DC 4' },
                { x: 700, y: 180, label: 'DC 5' },
                { x: 560, y: 210, label: 'DC 6' },
                { x: 240, y: 210, label: 'DC 7' },
                { x: 100, y: 180, label: 'DC 8' },
              ].map((dc) => (
                <g key={dc.label}>
                  <line x1="400" y1="130" x2={dc.x} y2={dc.y} stroke={SKY} strokeWidth="1.5" strokeDasharray="5,4" opacity="0.5" />
                  <circle cx={dc.x} cy={dc.y} r="18" fill={SKY} opacity="0.15" />
                  <circle cx={dc.x} cy={dc.y} r="12" fill={SKY} />
                  <text x={dc.x} y={dc.y + 4} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">{dc.label}</text>
                </g>
              ))}

              {/* Legend */}
              <circle cx="30" cy="240" r="6" fill={AMBER} />
              <text x="42" y="244" fill="#64748b" fontSize="9">Processing Plant</text>
              <circle cx="140" cy="240" r="6" fill={SKY} />
              <text x="152" y="244" fill="#64748b" fontSize="9">Distribution Centres (8)</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ── 8. QUALITY & COMPLIANCE ─────────────────────────────── */}
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: AMBER }}>
                  Quality &amp; Compliance
                </span>
              </div>
              <h2 className="font-display text-4xl text-fg mb-4">
                International Standards.<br />
                <span style={{ color: AMBER }}>Verified at Every Step.</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                All edible oil products meet international food safety standards. Our quality system is built on HACCP principles and reinforced by BSTI and Halal certification — giving buyers full confidence in product integrity from plant to delivery.
              </p>

              {/* HACCP prominent badge */}
              <div
                className="flex items-center gap-5 p-5 rounded-2xl mb-6"
                style={{ background: `color-mix(in srgb, ${AMBER} 6%, transparent)`, border: `2px solid color-mix(in srgb, ${AMBER} 19%, transparent)` }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-fg text-sm"
                  style={{ background: AMBER, color: 'var(--s0)' }}
                >
                  HACCP
                </div>
                <div>
                  <div className="font-semibold text-fg text-sm mb-1">HACCP Certified Operations</div>
                  <div className="text-slate-500 text-xs leading-relaxed">
                    Hazard Analysis and Critical Control Points certification — the cornerstone of our edible oil food safety management system.
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.filter((c) => !c.prominent).map((cert) => (
                <div
                  key={cert.name}
                  className="p-5 rounded-xl border hover:shadow-md transition-all"
                  style={{ borderColor: `color-mix(in srgb, ${AMBER} 9%, transparent)` }}
                >
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded inline-block"
                    style={{ background: `color-mix(in srgb, ${AMBER} 7%, transparent)`, color: 'var(--accent-amber)' }}
                  >
                    {cert.name}
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. TECHNOLOGY & OPERATIONS ──────────────────────────── */}
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: SKY, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: SKY }}>
                Technology &amp; Operations
              </span>
              <div className="h-px w-8" style={{ background: SKY, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl text-white mb-3">Built for Precision &amp; Scale</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              Operational technology across both divisions is designed to reduce variability, increase traceability, and ensure on-time delivery at volume.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {techCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-7 transition-all hover:scale-[1.01] duration-300"
                style={{ background: 'var(--fill-2)', border: `1px solid color-mix(in srgb, ${card.accent} 15%, transparent)` }}
              >
                <div
                  className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in srgb, ${card.accent} 9%, transparent)`, color: card.accent }}
                >
                  {card.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                <div className="mt-5 h-0.5 w-12 rounded-full" style={{ background: card.accent }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. SUSTAINABILITY ──────────────────────────────────── */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: 'var(--accent-emerald)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-emerald-600">
                Sustainability
              </span>
              <div className="h-px w-8" style={{ background: 'var(--accent-emerald)' }} />
            </div>
            <h2 className="font-display text-4xl text-fg mb-3">Responsible by Design</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              Across both divisions, we are building measurable sustainability commitments into operations — from palm sourcing to fuel storage protocols.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Oils sustainability */}
            <div className="bg-surface-2 rounded-2xl p-8 border" style={{ borderColor: `color-mix(in srgb, ${AMBER} 13%, transparent)` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in srgb, ${AMBER} 8%, transparent)` }}>
                  <svg className="w-5 h-5" style={{ color: AMBER }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-fg">Edible Oils — Sustainability</h3>
              </div>
              <div className="space-y-5">
                {sustainabilityOils.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-sm font-medium text-fg">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.pct}%</div>
                    </div>
                    <div className="h-2 bg-amber-100 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.pct}%`, background: AMBER }}
                      />
                    </div>
                    <div className="text-[11px] text-slate-400">{item.target}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Energy sustainability */}
            <div className="bg-surface-2 rounded-2xl p-8 border" style={{ borderColor: `color-mix(in srgb, ${SKY} 13%, transparent)` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in srgb, ${SKY} 8%, transparent)` }}>
                  <svg className="w-5 h-5" style={{ color: SKY }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-fg">Energy &amp; Fuel — Sustainability</h3>
              </div>
              <div className="space-y-5">
                {sustainabilityEnergy.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-sm font-medium text-fg">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.pct}%</div>
                    </div>
                    <div className="h-2 bg-sky-100 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.pct}%`, background: SKY }}
                      />
                    </div>
                    <div className="text-[11px] text-slate-400">{item.target}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. MARKETS & DISTRIBUTION ──────────────────────────── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: AMBER }}>
                Markets &amp; Distribution
              </span>
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl text-white mb-3">Who We Serve</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              Our two divisions address distinct but complementary market segments — from supermarket shelves to industrial plant rooms.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {markets.map((mkt) => (
              <div
                key={mkt.division}
                className="rounded-2xl p-8"
                style={{ background: 'var(--fill-2)', border: `1px solid color-mix(in srgb, ${mkt.accent} 15%, transparent)` }}
              >
                <div
                  className="text-[10px] font-bold uppercase tracking-widest mb-3"
                  style={{ color: mkt.accent }}
                >
                  {mkt.division}
                </div>
                <div className="space-y-4">
                  {mkt.segments.map((seg) => (
                    <div key={seg.name} className="flex gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `color-mix(in srgb, ${mkt.accent} 13%, transparent)` }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: mkt.accent }} />
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold mb-0.5">{seg.name}</div>
                        <div className="text-slate-400 text-xs leading-relaxed">{seg.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. BUSINESS OPPORTUNITIES ──────────────────────────── */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: AMBER }}>
                Business Opportunities
              </span>
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl text-fg mb-3">Partner With Us</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              Three entry points — whether you are a distributor, bulk buyer, or institutional investor looking to participate in Bangladesh&apos;s growing oils and energy sector.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <div
                key={opp.title}
                className="bg-surface-2 rounded-2xl p-7 border hover:shadow-xl transition-all group"
                style={{ borderColor: `color-mix(in srgb, ${opp.accent} 13%, transparent)` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in srgb, ${opp.accent} 8%, transparent)`, color: opp.accent }}
                >
                  {opp.icon}
                </div>
                <h3 className="font-display text-xl text-fg mb-3">{opp.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{opp.desc}</p>
                <a
                  href="#sector-contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                  style={{ color: opp.accent }}
                >
                  {opp.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. GROWTH ROADMAP ──────────────────────────────────── */}
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: SKY, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: SKY }}>
                Growth Roadmap
              </span>
            </div>
            <h2 className="font-display text-4xl text-white mb-3">Where We Are Headed</h2>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              A four-year strategic expansion across processing capacity, product diversification, and geographic reach — anchored in operational discipline and market demand.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: `linear-gradient(to bottom, ${AMBER}, ${SKY})` }}
            />

            <div className="space-y-8 sm:pl-20">
              {roadmap.map((item, i) => (
                <div key={item.year} className="relative flex gap-6 items-start">
                  {/* Year bubble */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-white text-sm sm:absolute sm:-left-20"
                    style={{ color: 'var(--s0)', background: i < 2 ? AMBER : SKY }}
                  >
                    {item.year}
                  </div>
                  <div
                    className="flex-1 rounded-xl p-5"
                    style={{ background: 'var(--fill-2)', border: `1px solid color-mix(in srgb, ${i < 2 ? AMBER : SKY} 13%, transparent)` }}
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

      {/* ── 14. SECTOR CONTACT ──────────────────────────────────── */}
      <SectorContact
        divisionName="Oils & Energy"
        accentHex={AMBER}
        inquiryTypes={['Edible Oil Buyer', 'Fuel Supply Inquiry', 'Distribution Partnership', 'Investment Inquiry', 'Bulk Order']}
      />

      {/* ── 15. FOOTER ──────────────────────────────────────────── */}
      </main>
      <Footer />
    </div>
  )
}
