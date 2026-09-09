import SectorHeader from '@/components/sector/SectorHeader'
import ProcessFlow from '@/components/sector/ProcessFlow'
import MetricsBar from '@/components/sector/MetricsBar'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'

const ACCENT = 'var(--accent-blue)'

const metrics = [
  { value: '25+', label: 'Countries', desc: 'Global trade network reach' },
  { value: '1,000+', label: 'Shipments/Month', desc: 'Monthly logistics volume' },
  { value: '$50M+', label: 'Trade Volume', desc: 'Annual trade value' },
  { value: '—', label: 'Active Partners', desc: 'Data to be published' },
]

const processSteps = [
  { title: 'Trade Opportunity Identification', desc: 'Market intelligence, demand mapping, and opportunity assessment across target trade corridors.' },
  { title: 'Supplier / Buyer Matching', desc: 'Verified sourcing from qualified manufacturers and producers matched to qualified import buyers.' },
  { title: 'Contract & Compliance', desc: 'Commercial contracts, Incoterms, HS code classification, and regulatory compliance review.' },
  { title: 'Finance & Insurance', desc: 'Letter of credit structuring, documentary collection, cargo insurance, and forex risk management.' },
  { title: 'Freight Booking', desc: 'Sea, air, or land freight booking with vetted forwarder partners on optimal trade lanes.' },
  { title: 'Customs Clearance', desc: 'Import/export documentation, duties management, and customs broker coordination at origin and destination.' },
  { title: 'Final Delivery', desc: 'Port-to-door delivery, warehousing, and last-mile distribution to end buyer or facility.' },
]

const tradeCategories = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    name: 'Agricultural Commodities',
    volume: 'High-volume seasonal trade',
    lanes: 'South Asia → Middle East, Europe',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    name: 'Textiles & Garments',
    volume: 'Core category — multiple lanes',
    lanes: 'Bangladesh → Europe, Middle East, USA',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    name: 'Food Products & Ingredients',
    volume: 'Processed and raw food goods',
    lanes: 'South Asia ↔ Middle East, Africa',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    name: 'Industrial Materials',
    volume: 'B2B industrial supply chain',
    lanes: 'Asia ↔ Middle East, Africa',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    name: 'Consumer Goods',
    volume: 'FMCG and retail supply',
    lanes: 'Asia → Middle East, Europe',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    name: 'Energy Products',
    volume: 'Selected energy commodities',
    lanes: 'Middle East → South Asia, Asia',
  },
]

const tradeServices = [
  {
    title: 'Import / Export Management',
    desc: 'End-to-end management of import and export transactions including documentation, HS code classification, compliance review, and customs filing.',
    items: ['Export/import documentation', 'HS code classification', 'Compliance review', 'Customs liaison'],
  },
  {
    title: 'Sourcing & Procurement',
    desc: 'International supplier identification, qualification audits, commercial negotiation, and procurement management across key sourcing markets.',
    items: ['Supplier scouting', 'Factory audits', 'Commercial negotiation', 'Quality verification'],
  },
  {
    title: 'Freight & Logistics',
    desc: 'Multi-modal freight coordination under all major Incoterms with a global network of vetted forwarding and customs broker partners.',
    items: ['FCL / LCL sea freight', 'Air freight express', 'Land transport', 'Incoterms management'],
  },
  {
    title: 'Trade Finance',
    desc: 'Structured trade finance facilitation including Letter of Credit handling, documentary collection, invoice financing, and forex risk management.',
    items: ['LC structuring & handling', 'Documentary collection', 'Invoice financing', 'Forex hedging'],
  },
]

const complianceDocs = [
  'Letter of Credit (LC)',
  'Bill of Lading (B/L)',
  'Certificate of Origin (COO)',
  'Phytosanitary Certificate',
  'Commercial Invoice',
  'Packing List',
  'CITES (where applicable)',
  'Health Certificate',
  'Customs Entry Declaration',
  'Cargo Insurance Certificate',
]

const tradeLanes = [
  { origin: 'Bangladesh', dest: 'Middle East', goods: 'Food products, garments, agricultural goods', flag1: '🇧🇩', flag2: '🌙' },
  { origin: 'Bangladesh', dest: 'Europe', goods: 'Ready-made garments, specialty foods', flag1: '🇧🇩', flag2: '🇪🇺' },
  { origin: 'South Asia', dest: 'Africa', goods: 'Commodities, food ingredients, consumer goods', flag1: '🌏', flag2: '🌍' },
  { origin: 'Asia', dest: 'Asia', goods: 'Cross-border sourcing and distribution', flag1: '🌏', flag2: '🌏' },
]

const techCapabilities = [
  {
    title: 'Real-Time Shipment Tracking',
    desc: 'Live shipment visibility from origin to destination with proactive exception alerts and milestone notifications via the Ezyify platform.',
  },
  {
    title: 'Document Management',
    desc: 'Centralised digital document repository for all trade documentation — accessible, searchable, and audit-ready at every shipment stage.',
  },
  {
    title: 'Trade Analytics & Reporting',
    desc: 'Data-driven trade performance dashboards, lane analytics, cost benchmarking, and compliance reporting for informed decision-making.',
  },
]

const opportunityCards = [
  {
    title: 'Export Partners',
    desc: 'Producers and manufacturers seeking qualified international buyers and market access across our 25+ country network.',
    cta: 'Register as Exporter',
  },
  {
    title: 'Import Buyers',
    desc: 'Companies seeking reliable sourcing, supplier qualification, and managed procurement from South and Southeast Asia.',
    cta: 'Sourcing Inquiry',
  },
  {
    title: 'Logistics Partners',
    desc: 'Freight forwarders, customs agents, and regional logistics operators looking to join our global partner network.',
    cta: 'Partner Inquiry',
  },
  {
    title: 'Trade Finance Partners',
    desc: 'Banks, insurance companies, and trade finance institutions seeking collaboration on structured trade transactions.',
    cta: 'Finance Inquiry',
  },
]

const roadmap = [
  { year: '2025', milestone: 'Expand Middle East Trade Desk', detail: 'Dedicated trade desk for GCC markets — food, garments, and consumer goods.' },
  { year: '2026', milestone: 'Enter West African Markets', detail: 'Establish trade corridors into West Africa for agricultural commodities and food products.' },
  { year: '2027', milestone: 'Launch Online B2B Trade Portal', detail: 'Ezyify-integrated B2B platform for buyer-supplier matching, document exchange, and real-time shipment tracking.' },
  { year: '2028', milestone: '$100M+ Trade Volume Target', detail: 'Scale trade operations to exceed $100M annual volume across all active trade corridors.' },
]

export default function Trading() {
  return (
    <div className="sector-page min-h-full bg-navy">
      <SectorHeader divisionName="Global Trading" accentClass="text-blue-400" />
      <main className="public-content">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="force-dark sector-hero relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1400&h=800&fit=crop&auto=format"
            alt="Shipping and logistics — global cargo"
            className="w-full h-full object-cover"
          />
          {/* Dark navy overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,20,45,0.97) 0%, rgba(10,20,45,0.88) 55%, rgba(10,20,45,0.75) 100%)' }} />
          {/* Blue glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
          {/* Dashed trade route lines decorative */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1400 800" fill="none" preserveAspectRatio="xMidYMid slice">
            <line x1="0" y1="600" x2="1400" y2="200" stroke="var(--accent-blue)" strokeWidth="1" strokeDasharray="8 6" />
            <line x1="0" y1="400" x2="1400" y2="500" stroke="var(--accent-blue)" strokeWidth="1" strokeDasharray="6 8" />
            <line x1="200" y1="0" x2="800" y2="800" stroke="var(--accent-blue)" strokeWidth="0.5" strokeDasharray="4 10" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Network71 — Global Trading &amp; Imports
              </span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-6">
              Global<br />
              <span style={{ color: ACCENT }}>Trading &amp; Imports</span>
            </h1>
            <p className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl">
              Connecting producers and markets across 25+ countries — with speed, compliance, and scale. Network71 is your end-to-end trade partner from source to shelf.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#sector-contact"
                className="px-8 py-3.5 font-semibold text-sm text-white rounded-lg transition-all hover:opacity-90"
                style={{ background: ACCENT, color: 'var(--s0)' }}
              >
                Trade Inquiry
              </a>
              <a
                href="#trade-categories"
                className="px-8 py-3.5 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-colors"
              >
                Explore Categories
              </a>
            </div>
          </div>

          {/* Floating stat badges */}
          <div className="absolute bottom-12 right-8 hidden lg:flex flex-col gap-3">
            {[
              { val: '25+', lab: 'Countries' },
              { val: '$50M+', lab: 'Trade Volume' },
              { val: '1,000+', lab: 'Shipments/Month' },
            ].map((s) => (
              <div
                key={s.lab}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border"
                style={{ background: 'rgba(10,20,45,0.8)', borderColor: `color-mix(in srgb, ${ACCENT} 19%, transparent)`, backdropFilter: 'blur(8px)' }}
              >
                <span className="font-display text-lg font-bold" style={{ color: ACCENT }}>{s.val}</span>
                <span className="text-slate-300 text-xs">{s.lab}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. METRICS BAR ──────────────────────────────────────────────────── */}
      <MetricsBar metrics={metrics} accentHex={ACCENT} dark />

      {/* ── 3. DIVISION OVERVIEW ────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Vision text */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Division Overview</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">
                Bridging Producing Nations and Consuming Markets
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                Network71&apos;s Global Trading &amp; Imports division operates as a strategic bridge between the world&apos;s producing economies and its consuming markets. We combine deep trade compliance expertise with logistics excellence to move goods across borders efficiently and reliably.
              </p>
              <p className="text-slate-500 leading-relaxed mb-5">
                From agricultural commodities to finished textiles, our team navigates the full complexity of international trade — regulatory compliance, documentation, freight management, and trade finance — so our partners can focus on growth.
              </p>
              <p className="text-slate-500 leading-relaxed">
                With active trade operations spanning 25+ countries, we offer producers and buyers alike a trusted partner with established networks, in-market relationships, and the operational infrastructure to execute at scale.
              </p>
            </div>

            {/* Right: 4 Trade Pillars */}
            <div className="grid grid-cols-2 gap-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  ),
                  title: 'Market Access',
                  desc: 'Opening doors to 25+ country markets with established buyer and distributor relationships.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: 'Compliance Expertise',
                  desc: 'Deep regulatory knowledge across trade corridors — HS codes, tariffs, certificates, and documentation.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  ),
                  title: 'Logistics Network',
                  desc: 'Multi-modal freight capability across sea, air, and land with vetted global forwarder partners.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  ),
                  title: 'Relationship Capital',
                  desc: 'Trusted relationships with producers, buyers, agents, and authorities across every trade corridor.',
                },
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl border"
                  style={{ borderColor: `color-mix(in srgb, ${ACCENT} 13%, transparent)`, background: `color-mix(in srgb, ${ACCENT} 2%, transparent)` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `color-mix(in srgb, ${ACCENT} 8%, transparent)`, color: ACCENT }}
                  >
                    {pillar.icon}
                  </div>
                  <h3 className="font-display text-base text-fg mb-2">{pillar.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. TRADE CATEGORIES ─────────────────────────────────────────────── */}
      <section id="trade-categories" className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>What We Trade</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">Trade Categories</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Six core commodity and product categories across our active global trade corridors.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tradeCategories.map((cat) => (
              <div
                key={cat.name}
                className="bg-surface-2 p-7 rounded-2xl border-l-4 hover:shadow-xl transition-all group cursor-default"
                style={{ borderColor: ACCENT }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in srgb, ${ACCENT} 7%, transparent)`, color: ACCENT }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-display text-lg text-fg mb-1.5">{cat.name}</h3>
                <p className="text-xs font-medium mb-3" style={{ color: ACCENT }}>{cat.volume}</p>
                <p className="text-slate-400 text-xs">Trade lanes: {cat.lanes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. GLOBAL TRADE NETWORK (SVG World Map) ─────────────────────────── */}
      <section className="py-24 bg-navy relative overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Global Reach</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
              Our Trade Network
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Five regional trading hubs connected by active corridors spanning 25+ countries across three continents.
            </p>
          </div>

          {/* SVG World Map */}
          <div
            className="relative rounded-3xl overflow-hidden border"
            style={{ borderColor: `color-mix(in srgb, ${ACCENT} 15%, transparent)`, background: 'var(--fill-1)' }}
          >
            <svg
              viewBox="0 0 900 480"
              className="w-full"
              style={{ minHeight: '340px' }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ocean background */}
              <rect width="900" height="480" fill="rgba(10,20,45,0.6)" />

              {/* Simplified continent shapes */}
              {/* Europe */}
              <path d="M380 60 L430 55 L460 70 L470 90 L450 110 L420 115 L395 100 L375 80 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Africa */}
              <path d="M390 140 L440 130 L470 150 L480 200 L470 260 L440 300 L410 295 L385 260 L375 210 L380 160 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Asia (simplified) */}
              <path d="M480 50 L600 40 L680 55 L720 80 L730 130 L700 160 L650 155 L600 170 L550 160 L510 140 L480 110 L470 80 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* South Asia extension */}
              <path d="M580 160 L620 165 L635 200 L615 220 L590 210 L570 185 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Southeast Asia */}
              <path d="M670 170 L720 165 L750 185 L740 215 L710 220 L680 205 L665 190 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Middle East */}
              <path d="M490 130 L540 120 L560 140 L555 170 L530 180 L500 165 L485 150 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Americas (simplified) */}
              <path d="M80 60 L160 50 L200 80 L210 140 L195 200 L170 260 L140 270 L115 240 L90 180 L70 120 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              {/* Australia */}
              <path d="M730 270 L790 260 L820 290 L815 330 L775 345 L735 330 L720 300 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

              {/* ── Trade route lines (dashed blue) ── */}
              {/* South Asia → Middle East */}
              <line x1="600" y1="192" x2="522" y2="155" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.7" />
              {/* South Asia → Europe */}
              <line x1="600" y1="192" x2="430" y2="88" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.6" />
              {/* South Asia → Southeast Asia */}
              <line x1="600" y1="192" x2="710" y2="193" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.7" />
              {/* South Asia → Africa */}
              <line x1="600" y1="192" x2="425" y2="215" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.5" />
              {/* Middle East → Europe */}
              <line x1="522" y1="155" x2="430" y2="88" stroke={ACCENT} strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
              {/* Middle East → Africa */}
              <line x1="522" y1="155" x2="425" y2="215" stroke={ACCENT} strokeWidth="1" strokeDasharray="4 6" opacity="0.35" />

              {/* Animated pulse dots along routes (decorative) */}
              <circle cx="560" cy="175" r="2" fill={ACCENT} opacity="0.6" />
              <circle cx="515" cy="120" r="2" fill={ACCENT} opacity="0.5" />
              <circle cx="655" cy="192" r="2" fill={ACCENT} opacity="0.6" />

              {/* ── Hub markers ── */}

              {/* 1. South Asia Hub (HQ) — cx=600 cy=192 */}
              <circle cx="600" cy="192" r="12" fill={ACCENT} opacity="0.2" />
              <circle cx="600" cy="192" r="7" fill={ACCENT} opacity="0.5" />
              <circle cx="600" cy="192" r="4" fill={ACCENT} />
              {/* HQ label */}
              <rect x="610" y="178" width="82" height="28" rx="5" fill="rgba(10,20,45,0.92)" stroke={ACCENT} strokeWidth="0.8" />
              <text x="651" y="196" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">South Asia Hub</text>
              <text x="651" y="205" textAnchor="middle" fill={ACCENT} fontSize="7.5" fontFamily="system-ui">HQ · Origin</text>

              {/* 2. Middle East Hub — cx=522 cy=155 */}
              <circle cx="522" cy="155" r="10" fill={ACCENT} opacity="0.18" />
              <circle cx="522" cy="155" r="6" fill={ACCENT} opacity="0.4" />
              <circle cx="522" cy="155" r="3.5" fill={ACCENT} />
              <rect x="530" y="143" width="80" height="26" rx="5" fill="rgba(10,20,45,0.92)" stroke={ACCENT} strokeWidth="0.7" />
              <text x="570" y="159" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">Middle East</text>
              <text x="570" y="167" textAnchor="middle" fill={ACCENT} fontSize="7.5" fontFamily="system-ui">GCC Trading Hub</text>

              {/* 3. Europe Hub — cx=430 cy=88 */}
              <circle cx="430" cy="88" r="10" fill={ACCENT} opacity="0.18" />
              <circle cx="430" cy="88" r="6" fill={ACCENT} opacity="0.4" />
              <circle cx="430" cy="88" r="3.5" fill={ACCENT} />
              <rect x="438" y="77" width="78" height="26" rx="5" fill="rgba(10,20,45,0.92)" stroke={ACCENT} strokeWidth="0.7" />
              <text x="477" y="92" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">European Markets</text>
              <text x="477" y="100" textAnchor="middle" fill={ACCENT} fontSize="7.5" fontFamily="system-ui">Import / Premium</text>

              {/* 4. Southeast Asia Hub — cx=710 cy=193 */}
              <circle cx="710" cy="193" r="10" fill={ACCENT} opacity="0.18" />
              <circle cx="710" cy="193" r="6" fill={ACCENT} opacity="0.4" />
              <circle cx="710" cy="193" r="3.5" fill={ACCENT} />
              <rect x="718" y="181" width="82" height="26" rx="5" fill="rgba(10,20,45,0.92)" stroke={ACCENT} strokeWidth="0.7" />
              <text x="759" y="197" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">Southeast Asia</text>
              <text x="759" y="205" textAnchor="middle" fill={ACCENT} fontSize="7.5" fontFamily="system-ui">Sourcing + Distribution</text>

              {/* 5. Africa Hub — cx=425 cy=215 */}
              <circle cx="425" cy="215" r="10" fill={ACCENT} opacity="0.18" />
              <circle cx="425" cy="215" r="6" fill={ACCENT} opacity="0.4" />
              <circle cx="425" cy="215" r="3.5" fill={ACCENT} />
              <rect x="433" y="204" width="76" height="26" rx="5" fill="rgba(10,20,45,0.92)" stroke={ACCENT} strokeWidth="0.7" />
              <text x="471" y="219" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">Africa</text>
              <text x="471" y="227" textAnchor="middle" fill={ACCENT} fontSize="7.5" fontFamily="system-ui">Emerging Markets</text>

              {/* 25+ countries callout badge */}
              <rect x="30" y="360" width="115" height="50" rx="10" fill={ACCENT} />
              <text x="87" y="382" textAnchor="middle" fill="white" fontSize="18" fontFamily="system-ui" fontWeight="700">25+</text>
              <text x="87" y="398" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="system-ui">Countries Active</text>

              {/* Legend */}
              <line x1="30" y1="430" x2="60" y2="430" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="6 4" />
              <text x="66" y="434" fill="rgba(255,255,255,0.5)" fontSize="8.5" fontFamily="system-ui">Trade Route</text>
              <circle cx="44" cy="450" r="4" fill={ACCENT} />
              <text x="55" y="454" fill="rgba(255,255,255,0.5)" fontSize="8.5" fontFamily="system-ui">Regional Hub</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ── 6. TRADE SERVICES ───────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>What We Do</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">Trade Services</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              Four integrated service pillars that cover every dimension of international trade.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {tradeServices.map((svc) => (
              <div
                key={svc.title}
                className="p-8 rounded-2xl border hover:shadow-lg transition-all"
                style={{ borderColor: `color-mix(in srgb, ${ACCENT} 9%, transparent)` }}
              >
                <div
                  className="inline-block h-0.5 w-10 mb-5 rounded-full"
                  style={{ background: ACCENT, color: 'var(--s0)' }}
                />
                <h3 className="font-display text-xl text-fg mb-3">{svc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{svc.desc}</p>
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {svc.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT, color: 'var(--s0)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PROCESS FLOW ─────────────────────────────────────────────────── */}
      <ProcessFlow steps={processSteps} accentHex={ACCENT} label="Full Trade Cycle" />

      {/* ── 8. COMPLIANCE & DOCUMENTATION ──────────────────────────────────── */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${ACCENT} 0, ${ACCENT} 1px, transparent 1px, transparent 80px)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Trade Compliance</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">
                Full Documentation Support for Every Shipment
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                International trade is built on paperwork. Network71&apos;s compliance team manages every document required to move goods legally and smoothly across borders — from origin certificates to phytosanitary approvals and letter of credit discrepancy resolution.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Our in-house trade documentation specialists ensure every shipment meets the regulatory requirements of both origin and destination jurisdictions, eliminating costly delays and compliance failures.
              </p>
            </div>
            {/* Compliance badge grid */}
            <div>
              <div className="grid grid-cols-2 gap-3">
                {complianceDocs.map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                    style={{ borderColor: `color-mix(in srgb, ${ACCENT} 15%, transparent)`, background: `color-mix(in srgb, ${ACCENT} 3%, transparent)` }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-slate-300 text-xs font-medium">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. LOGISTICS INFRASTRUCTURE ─────────────────────────────────────── */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Logistics</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">Logistics Infrastructure</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              Multi-modal freight capability with vetted partner networks across all major trade corridors.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                mode: 'Sea Freight',
                tag: 'Primary Mode',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                ),
                specs: ['FCL — Full Container Load', 'LCL — Less than Container Load', 'Reefer containers available', 'Major global shipping lines'],
                note: 'Cost-effective primary mode for high-volume trade.',
              },
              {
                mode: 'Air Freight',
                tag: 'Express / High-Value',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                ),
                specs: ['Express and standard air cargo', 'Perishables and fresh goods', 'High-value and time-sensitive', 'Global airport network'],
                note: 'Speed-critical shipments and perishable goods.',
              },
              {
                mode: 'Land Transport',
                tag: 'Regional / Last Mile',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ),
                specs: ['Cross-border truck transport', 'In-country distribution', 'Bonded transport', 'Regional last-mile delivery'],
                note: 'Regional corridors and final distribution legs.',
              },
            ].map((t) => (
              <div
                key={t.mode}
                className="bg-surface-2 rounded-2xl p-8 border-t-4 hover:shadow-xl transition-all"
                style={{ borderColor: ACCENT }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in srgb, ${ACCENT} 7%, transparent)`, color: ACCENT }}
                >
                  {t.icon}
                </div>
                <div className="mb-1">
                  <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: ACCENT }}>{t.tag}</span>
                </div>
                <h3 className="font-display text-2xl text-fg mb-4">{t.mode}</h3>
                <ul className="space-y-2.5 mb-5">
                  {t.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: ACCENT, color: 'var(--s0)' }} />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-400 text-xs italic">{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. TECHNOLOGY ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Technology</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">
                Powered by Ezyify
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                Our trade operations are integrated with Ezyify — Network71&apos;s proprietary trade management platform — giving buyers, sellers, and logistics partners real-time visibility into every transaction and shipment.
              </p>
              <p className="text-slate-500 leading-relaxed">
                From digital document management to supplier portals and trade analytics, Ezyify transforms the traditionally fragmented trade process into a connected, data-driven operation.
              </p>
            </div>
            <div className="space-y-5">
              {techCapabilities.map((t, i) => (
                <div
                  key={t.title}
                  className="flex gap-5 p-6 rounded-2xl border hover:shadow-md transition-all"
                  style={{ borderColor: `color-mix(in srgb, ${ACCENT} 9%, transparent)` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
                    style={{ background: `color-mix(in srgb, ${ACCENT} 7%, transparent)`, color: ACCENT }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-fg mb-1.5">{t.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. SUPPLY CHAIN FINANCE ────────────────────────────────────────── */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5"
          style={{
            background: `radial-gradient(ellipse at right, ${ACCENT} 0%, transparent 70%)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Trade Finance</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">Supply Chain Finance</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Structured finance solutions that reduce risk and unlock working capital for buyers and sellers across every trade corridor.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'LC Negotiation', desc: 'Structuring and negotiating Letters of Credit with issuing and advising banks for compliant, timely payment.' },
              { title: 'Documentary Collection', desc: 'D/P and D/A collection arrangements providing payment security for exporters on established trade lanes.' },
              { title: 'Invoice Financing', desc: 'Early payment solutions against confirmed export invoices, improving cash flow for suppliers and producers.' },
              { title: 'Forex Hedging', desc: 'Currency risk management strategies to protect trade transaction margins from adverse foreign exchange movements.' },
            ].map((f) => (
              <div
                key={f.title}
                className="p-7 rounded-2xl border hover:border-blue-500/40 transition-all"
                style={{ borderColor: `color-mix(in srgb, ${ACCENT} 13%, transparent)`, background: 'var(--fill-2)' }}
              >
                <div className="h-0.5 w-8 mb-4 rounded-full" style={{ background: ACCENT, color: 'var(--s0)' }} />
                <h3 className="font-display text-lg text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. KEY TRADE LANES ─────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Active Corridors</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">Key Trade Lanes</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {tradeLanes.map((lane) => (
              <div
                key={`${lane.origin}-${lane.dest}`}
                className="bg-surface-2 rounded-2xl p-7 border hover:shadow-lg transition-all"
                style={{ borderColor: `color-mix(in srgb, ${ACCENT} 8%, transparent)` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{lane.flag1}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-px" style={{ background: `color-mix(in srgb, ${ACCENT} 25%, transparent)`, borderTop: `1px dashed ${ACCENT}` }} />
                    <svg className="w-4 h-4" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <div className="flex-1 h-px" style={{ background: `color-mix(in srgb, ${ACCENT} 25%, transparent)`, borderTop: `1px dashed ${ACCENT}` }} />
                  </div>
                  <span className="text-2xl">{lane.flag2}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-fg text-lg">{lane.origin}</span>
                  <span className="font-display text-fg text-lg">{lane.dest}</span>
                </div>
                <p className="text-slate-500 text-sm">{lane.goods}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. QUALITY & RISK ──────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Quality &amp; Risk</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">
                Due Diligence and Trade Risk Management
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                Every trade transaction begins with rigorous due diligence on counterparties. We verify supplier credentials, factory conditions, product quality, and financial standing before any commercial engagement.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Risk management is embedded throughout the trade cycle — from cargo insurance and pre-shipment inspection to credit risk assessment and trade dispute resolution support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Supplier Due Diligence', desc: 'Factory audits, credential verification, and trade reference checks.' },
                { title: 'Buyer Qualification', desc: 'Creditworthiness review, reference checks, and trade history assessment.' },
                { title: 'Cargo Insurance', desc: 'All-risk marine and air cargo insurance arranged for every shipment.' },
                { title: 'Quality Inspection', desc: 'Third-party pre-shipment inspection at origin before goods are loaded.' },
              ].map((r) => (
                <div
                  key={r.title}
                  className="p-5 rounded-xl border"
                  style={{ borderColor: `color-mix(in srgb, ${ACCENT} 9%, transparent)`, background: `color-mix(in srgb, ${ACCENT} 2%, transparent)` }}
                >
                  <h4 className="font-semibold text-fg text-sm mb-2">{r.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 14. SUSTAINABILITY IN TRADE ─────────────────────────────────────── */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Responsible Trade</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">Sustainability in Trade</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Trade that is good for business must also be good for people and the planet. Network71 embeds sustainability considerations throughout our trading operations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Sustainable Sourcing',
                desc: 'Preference for suppliers with verifiable ethical sourcing, fair labour practices, and responsible environmental management.',
              },
              {
                title: 'Carbon-Conscious Freight',
                desc: 'Optimising freight mode selection to reduce carbon intensity — consolidating shipments and prioritising sea over air where timeline permits.',
              },
              {
                title: 'Fair Trade Support',
                desc: 'Supporting fair trade principles for agricultural commodities, ensuring producer communities receive equitable value for their goods.',
              },
              {
                title: 'Supplier ESG Screening',
                desc: 'Environmental, Social, and Governance screening integrated into supplier qualification and onboarding processes.',
              },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-surface-2 p-7 rounded-2xl border hover:shadow-lg transition-all"
                style={{ borderColor: `color-mix(in srgb, ${ACCENT} 8%, transparent)` }}
              >
                <div className="w-2 h-2 rounded-full mb-4" style={{ background: 'var(--accent-green)' }} />
                <h3 className="font-semibold text-fg mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 15. BUSINESS OPPORTUNITIES ──────────────────────────────────────── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Opportunities</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">Work With Our Trading Division</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Whether you are a producer, buyer, logistics operator, or finance institution — there is a partnership model for you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {opportunityCards.map((o) => (
              <div
                key={o.title}
                className="p-7 rounded-2xl border hover:border-blue-500/40 transition-all group"
                style={{ borderColor: `color-mix(in srgb, ${ACCENT} 9%, transparent)`, background: 'var(--fill-2)' }}
              >
                <h3 className="font-display text-xl text-white mb-3">{o.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{o.desc}</p>
                <a
                  href="#sector-contact"
                  className="flex items-center gap-2 text-sm font-semibold"
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

      {/* ── 16. GROWTH ROADMAP ──────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Strategic Vision</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">Growth Roadmap</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              A four-year trajectory towards $100M+ trade volume and deeper global market penetration.
            </p>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute top-8 left-0 right-0 h-px hidden lg:block"
              style={{ background: `linear-gradient(90deg, transparent 5%, color-mix(in srgb, ${ACCENT} 25%, transparent) 20%, color-mix(in srgb, ${ACCENT} 25%, transparent) 80%, transparent 95%)` }}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roadmap.map((r, i) => (
                <div key={r.year} className="relative">
                  {/* Year badge */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-lg text-white relative z-10"
                      style={{ background: ACCENT, color: 'var(--s0)' }}
                    >
                      {r.year.slice(2)}
                      <span className="sr-only">{r.year}</span>
                    </div>
                  </div>
                  <div
                    className="p-6 rounded-2xl border text-center"
                    style={{ borderColor: `color-mix(in srgb, ${ACCENT} 9%, transparent)`, background: i === 3 ? `color-mix(in srgb, ${ACCENT} 2%, transparent)` : 'transparent' }}
                  >
                    <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: ACCENT }}>{r.year}</div>
                    <h3 className="font-display text-base text-fg mb-3">{r.milestone}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 17. SECTOR CONTACT ──────────────────────────────────────────────── */}
      <SectorContact
        divisionName="Global Trading"
        accentHex={ACCENT}
        inquiryTypes={['Export Inquiry', 'Import Sourcing', 'Logistics Partnership', 'Trade Finance', 'Market Entry']}
      />

      {/* ── 18. FOOTER ──────────────────────────────────────────────────────── */}
      </main>
      <Footer />
    </div>
  )
}
