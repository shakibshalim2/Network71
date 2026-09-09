import { useState } from 'react'
import SectorHeader from '@/components/sector/SectorHeader'
import ProcessFlow from '@/components/sector/ProcessFlow'
import MetricsBar from '@/components/sector/MetricsBar'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'

const ACCENT = 'var(--accent-orange)'

// ─── Data ────────────────────────────────────────────────────────────────────

const metrics = [
  { value: '3', label: 'Processing Units', desc: 'Active production facilities' },
  { value: 'ISO', label: 'Certified', desc: 'International quality standard' },
  { value: '50+', label: 'Products', desc: 'SKUs across all categories' },
  { value: '—', label: 'Annual Output', desc: 'Data to be published' },
]

const pillars = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Quality & Safety',
    desc: 'Every product leaves our facilities verified against strict food safety benchmarks and quality control checkpoints.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: 'Innovation',
    desc: 'In-house R&D continuously develops new product lines, flavour profiles, and formulations ahead of consumer trends.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: 'Halal Compliance',
    desc: 'Full halal certification across eligible product lines — unlocking Middle East, South Asia, and Muslim-majority export markets.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: 'Global Standards',
    desc: 'Manufacturing processes aligned with international food industry standards — enabling retail-ready products for global shelves.',
  },
]

const productCategories = [
  {
    id: 'processed',
    label: 'Processed Foods',
    icon: '🍱',
    desc: 'Convenience-forward products designed for modern households and food service operations. Shelf-stable and chilled formats across ready-to-eat and ready-to-cook segments.',
    items: ['Ready Meals & Heat-and-Serve', 'Frozen Prepared Foods', 'Canned & Jarred Goods'],
  },
  {
    id: 'beverages',
    label: 'Beverages',
    icon: '🧃',
    desc: 'Full beverage portfolio spanning juice-based drinks, carbonated beverages, and ambient ready-to-drink formats. Multiple pack sizes for retail, food service, and institutional supply.',
    items: ['Fruit Juices & Nectars', 'Flavoured Drinks & Squashes', 'Ready-to-Drink (RTD) Formats'],
  },
  {
    id: 'snacks',
    label: 'Snacks & Confectionery',
    icon: '🍪',
    desc: 'Impulse and planned-purchase snack products aligned with premium and value retail positioning. Suitable for own-brand and private label retail programmes.',
    items: ['Biscuits & Crackers', 'Pastries & Baked Goods', 'Confectionery & Sweet Snacks'],
  },
  {
    id: 'condiments',
    label: 'Condiments & Sauces',
    icon: '🫙',
    desc: 'Flavouring and condiment range serving household, food service, and export markets. Spice blends, oils, and sauce formats developed to regional taste profiles.',
    items: ['Spices & Spice Blends', 'Cooking & Table Sauces', 'Edible Oils & Seasonings'],
  },
]

const brandModels = [
  {
    title: 'Own Brand',
    tag: 'N71 Brands',
    desc: 'Network71 develops and manages its own proprietary food and beverage brands — controlling positioning, packaging, and market placement from concept to shelf.',
    points: [
      'Full brand identity development',
      'Proprietary recipe ownership',
      'Direct retail and export placement',
      'Long-term brand equity building',
    ],
    highlight: true,
  },
  {
    title: 'Private Label',
    tag: 'Retailer Brands',
    desc: 'We manufacture products to retailer or buyer specifications under their brand. Full formulation, packaging design, and regulatory compliance support included.',
    points: [
      'Retailer-spec formulation matching',
      'Confidential manufacturing agreements',
      'Full packaging and label support',
      'Flexible MOQ structures',
    ],
    highlight: false,
  },
  {
    title: 'Co-Manufacturing',
    tag: 'Brand Partners',
    desc: 'Existing food brands looking to scale or outsource production can leverage our certified facilities and expertise — without capital investment in their own plant.',
    points: [
      'Certified facility access',
      'Existing brand recipe production',
      'Scale-up capacity for growth brands',
      'Quality parity guaranteed',
    ],
    highlight: false,
  },
]

const standards = [
  {
    title: 'ISO 22000 Food Safety Management',
    desc: 'International standard for food safety management systems — applied across our manufacturing operations to systematically control food safety hazards.',
    badge: 'ISO 22000',
  },
  {
    title: 'HACCP Implementation',
    desc: 'Hazard Analysis and Critical Control Points methodology embedded at every production stage — from raw material intake through to final packaged product.',
    badge: 'HACCP',
  },
  {
    title: 'Good Manufacturing Practice (GMP)',
    desc: 'GMP protocols govern hygiene, personnel, facility maintenance, and process control — ensuring baseline food safety across all product lines.',
    badge: 'GMP',
  },
  {
    title: 'Halal Certification',
    desc: 'Products eligible for halal designation are manufactured under certified halal conditions — supporting export to Muslim-majority markets worldwide.',
    badge: 'Halal',
  },
]

const processSteps = [
  { title: 'R&D & Recipe Development', desc: 'In-house food technologists develop and validate formulations against consumer and market requirements.' },
  { title: 'Raw Material Sourcing', desc: 'Verified ingredient procurement from approved local and international supplier networks.' },
  { title: 'Food Safety Testing', desc: 'Incoming material testing — microbiological, chemical, and sensory — before production approval.' },
  { title: 'Production', desc: 'Controlled manufacturing in certified processing units following SOPs and batch records.' },
  { title: 'In-Line QC', desc: 'Real-time quality checks at critical control points throughout the production run.' },
  { title: 'Packaging & Labelling', desc: 'Automated packaging with regulatory-compliant labelling for retail and export markets.' },
  { title: 'Cold / Ambient Storage', desc: 'Product-appropriate storage in temperature-controlled or ambient warehousing.' },
  { title: 'Distribution', desc: 'Last-mile delivery to retail chains, food service accounts, and export consolidation points.' },
]

const facilities = [
  {
    unit: 'Processing Unit 1',
    capacity: 'Data TBP',
    lines: ['Beverages & Juices', 'RTD Formats'],
    certs: ['ISO 22000', 'HACCP', 'Halal'],
  },
  {
    unit: 'Processing Unit 2',
    capacity: 'Data TBP',
    lines: ['Processed Foods', 'Condiments & Sauces'],
    certs: ['ISO 22000', 'GMP', 'BSTI'],
  },
  {
    unit: 'Processing Unit 3',
    capacity: 'Data TBP',
    lines: ['Snacks & Confectionery', 'Baked Goods'],
    certs: ['ISO 22000', 'HACCP', 'Halal'],
  },
]

const qualityMetrics = [
  { label: 'Quality Rejection Rate', value: '<2%', target: 98, note: 'Target' },
  { label: 'On-Time Delivery Rate', value: '95%+', target: 95, note: 'Target' },
  { label: 'Food Safety Audit Score', value: '98%+', target: 98, note: 'Target' },
]

const certifications = [
  { name: 'ISO 22000', body: 'Food Safety Management System' },
  { name: 'HACCP', body: 'Hazard Analysis Critical Control Points' },
  { name: 'Halal', body: 'Halal Certification Authority' },
  { name: 'GMP', body: 'Good Manufacturing Practice' },
  { name: 'BSTI', body: 'Bangladesh Standards & Testing Institution' },
]

const sustainability = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    title: 'Reducing Food Waste',
    desc: 'Production efficiency programmes targeting waste reduction at every stage — from raw material utilisation to finished goods. Yield optimisation targets data TBP.',
    stat: 'Data TBP',
    statLabel: 'Waste reduction target',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-9 5.25-9-5.25v-2.25" />
      </svg>
    ),
    title: 'Sustainable Packaging',
    desc: 'Active programme to transition applicable product lines to biodegradable or recyclable packaging formats. Rollout timelines and targets to be published.',
    stat: 'Data TBP',
    statLabel: 'Biodegradable packaging target',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    title: 'Local Sourcing',
    desc: 'Strategic partnerships with Bangladeshi farmers and ingredient suppliers — supporting local agricultural communities and reducing supply chain carbon footprint.',
    stat: 'Data TBP',
    statLabel: 'Local sourcing target',
  },
]

const exportMarkets = [
  {
    region: 'Middle East',
    flag: '🇸🇦',
    priority: 'Primary',
    driver: 'Halal-certified products, large Bangladeshi diaspora, strong FMCG import demand.',
    countries: 'UAE, Saudi Arabia, Qatar, Kuwait',
  },
  {
    region: 'South Asia',
    flag: '🌏',
    priority: 'Regional',
    driver: 'Shared taste profiles, regional distribution infrastructure, proximity.',
    countries: 'India, Pakistan, Sri Lanka',
  },
  {
    region: 'Europe',
    flag: '🇬🇧',
    priority: 'Premium',
    driver: 'Diaspora retail channels, premium ethnic food segment, private label opportunities.',
    countries: 'UK, Germany, Netherlands, Italy',
  },
  {
    region: 'Southeast Asia',
    flag: '🌏',
    priority: 'Growth',
    driver: 'Halal market growth, emerging middle class, regional FMCG expansion.',
    countries: 'Malaysia, Indonesia, Singapore',
  },
  {
    region: 'Africa',
    flag: '🌍',
    priority: 'Emerging',
    driver: 'Fast-growing FMCG sector, halal demand, affordable packaged food growth.',
    countries: 'Nigeria, Kenya, South Africa',
  },
]

const opportunities = [
  {
    title: 'Retail Distribution Partners',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
    desc: 'Supermarkets, hypermarkets, and organised retail chains seeking quality-assured own-label and branded food products with consistent supply.',
    cta: 'Retailer Inquiry',
  },
  {
    title: 'B2B Food Service',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.084 1.837 2.165V19.75M3 13.12c-.387.058-.773.111-1.162.16C.77 13.44 0 14.364 0 15.445V19.75m0 0a2.25 2.25 0 002.25 2.25h19.5A2.25 2.25 0 0024 19.75m-24 0v-4.305m24 4.305v-4.305" />
      </svg>
    ),
    desc: 'Hotels, restaurants, catering operations, and institutional buyers requiring reliable bulk food supply at consistent quality standards.',
    cta: 'Foodservice Inquiry',
  },
  {
    title: 'Export Buyers',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
    desc: 'International distributors and importers sourcing halal-certified, FMCG products from Bangladesh for diaspora and mainstream retail placement.',
    cta: 'Export Buyer Inquiry',
  },
  {
    title: 'Co-Manufacturing Partners',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    desc: 'Food brands seeking certified production capacity without plant investment — leveraging our facilities, certifications, and food safety infrastructure.',
    cta: 'Co-Mfg Inquiry',
  },
]

const roadmap = [
  { year: '2025', milestone: 'New Product Lines', detail: 'Launch of expanded processed food and beverage SKUs. Entry into condiments and sauce category under own brand.' },
  { year: '2026', milestone: 'Export-Focused Expansion', detail: 'Capacity expansion of Processing Unit 2 with dedicated export production lines. First formal Middle East distribution agreements.' },
  { year: '2027', milestone: 'Own Brand Launch', detail: 'Formal launch of Network71 consumer food brand into domestic retail. Brand identity, packaging, and trade marketing programme.' },
  { year: '2028', milestone: 'International Retail Listing', detail: 'Target listing with international grocery retailers in UK, UAE, and regional markets. Scale private label export programme.' },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function FoodBeverage() {
  const [activeCategory, setActiveCategory] = useState('processed')
  const activeProduct = productCategories.find((c) => c.id === activeCategory)!

  return (
    <div className="sector-page min-h-full bg-navy">
      <SectorHeader divisionName="Food & Beverage Manufacturing" accentClass="text-orange-400" />
      <main className="public-content">

      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section className="force-dark sector-hero relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=1400&h=800&fit=crop&auto=format"
            alt="Food manufacturing facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,16,40,0.92) 0%, rgba(10,16,40,0.78) 50%, rgba(30,15,5,0.72) 100%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Network71 — Food &amp; Beverage Division
              </span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl text-white leading-[0.95] tracking-[-0.02em] mb-8">
              Food &amp; Beverage<br />
              <span style={{ color: ACCENT }}>Manufacturing</span>
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed mb-10 max-w-xl">
              World-class food manufacturing from Bangladesh to global retail shelves.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#sector-contact"
                className="px-8 py-4 font-semibold text-sm text-white rounded-lg transition-all hover:opacity-90 active:scale-95"
                style={{ background: ACCENT, color: 'var(--s0)' }}
              >
                Partner With Us
              </a>
              <a
                href="#product-portfolio"
                className="px-8 py-4 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-colors"
              >
                View Product Range
              </a>
            </div>
          </div>
        </div>
        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12" style={{ background: ACCENT, color: 'var(--s0)' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT, color: 'var(--s0)' }} />
        </div>
      </section>

      {/* ── 2. MetricsBar ───────────────────────────────────────────────────── */}
      <MetricsBar metrics={metrics} accentHex={ACCENT} dark />

      {/* ── 3. Overview & Vision ────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: vision */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                  Our Vision
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">
                Manufacturing Excellence,<br />From Bangladesh to<br />Global Shelves
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                Network71&apos;s Food &amp; Beverage division operates certified manufacturing facilities producing a comprehensive range of food and beverage products — from raw ingredient sourcing through to retail-ready packaging.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Our ambition is to establish Network71 as a leading FMCG manufacturer from Bangladesh: supplying domestic retail, developing proprietary brands, and placing products on international shelves across the Middle East, Europe, and beyond.
              </p>
              <div className="p-5 rounded-xl text-sm text-slate-600" style={{ background: `color-mix(in srgb, ${ACCENT} 4%, transparent)`, border: `1px solid color-mix(in srgb, ${ACCENT} 13%, transparent)` }}>
                <span className="font-semibold" style={{ color: ACCENT }}>Key positioning:</span> Halal-certified, ISO-standard, export-ready — competitive on quality, not just price.
              </div>
            </div>
            {/* Right: brand pillars */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                  Brand Pillars
                </span>
              </div>
              <div className="space-y-4">
                {pillars.map((p) => (
                  <div key={p.title} className="flex gap-5 p-5 rounded-xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all group">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ background: `color-mix(in srgb, ${ACCENT} 7%, transparent)`, color: ACCENT }}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-base text-fg mb-1 font-semibold">{p.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Product Portfolio ────────────────────────────────────────────── */}
      <section id="product-portfolio" className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Product Portfolio</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">What We Manufacture</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              A comprehensive food and beverage range designed for multiple consumer segments, retail channels, and export markets.
            </p>
          </div>

          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={
                  activeCategory === cat.id
                    ? { background: ACCENT, color: 'var(--s0)' }
                    : { background: 'var(--s2)', color: 'var(--fg-muted)', border: '1px solid #e2e8f0' }
                }
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active category panel */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-surface-2 rounded-2xl p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{activeProduct.icon}</span>
                <h3 className="font-display text-2xl text-fg">{activeProduct.label}</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{activeProduct.desc}</p>
              <div className="space-y-3">
                {activeProduct.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 py-3 border-b border-slate-100">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: `color-mix(in srgb, ${ACCENT} 8%, transparent)` }}
                    >
                      <svg className="w-3.5 h-3.5" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category grid overview */}
            <div className="grid grid-cols-2 gap-4">
              {productCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="p-5 rounded-xl text-left transition-all border"
                  style={
                    activeCategory === cat.id
                      ? { background: `color-mix(in srgb, ${ACCENT} 6%, transparent)`, borderColor: ACCENT }
                      : { background: 'var(--s2)', borderColor: '#f1f5f9' }
                  }
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-semibold text-sm text-fg mb-1">{cat.label}</div>
                  <div className="text-[11px] text-slate-400">{cat.items.length} product lines</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Brand Development ────────────────────────────────────────────── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Brand Development</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">Three Brand Models,<br />One Manufacturing Partner</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              A key differentiator of the N71 Food &amp; Beverage division is our ability to operate across three distinct brand models — serving our own brands, retail partners, and manufacturing clients simultaneously.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {brandModels.map((model) => (
              <div
                key={model.title}
                className="relative rounded-2xl p-8 transition-all"
                style={
                  model.highlight
                    ? { background: ACCENT, color: 'var(--s0)' }
                    : { background: 'var(--fill-2)', border: 'var(--border-subtle)' }
                }
              >
                {model.highlight && (
                  <div className="inline-block mb-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/10 text-inherit tracking-wider uppercase">
                    Key Differentiator
                  </div>
                )}
                <div
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-4"
                  style={model.highlight ? { background: 'rgba(0,0,0,0.08)', color: 'inherit' } : { background: `color-mix(in srgb, ${ACCENT} 9%, transparent)`, color: ACCENT }}
                >
                  {model.tag}
                </div>
                <h3 className={`font-display text-2xl mb-3 ${model.highlight ? 'text-inherit' : 'text-white'}`}>{model.title}</h3>
                <p className={`text-sm leading-relaxed mb-6 ${model.highlight ? 'text-inherit' : 'text-slate-400'}`}>{model.desc}</p>
                <ul className="space-y-2.5">
                  {model.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm">
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: model.highlight ? 'inherit' : ACCENT }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={model.highlight ? 'text-inherit' : 'text-slate-400'}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Manufacturing Standards ──────────────────────────────────────── */}
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Manufacturing Standards</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">
                Certified to the<br />Highest Standards
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Our facilities are built around internationally recognised food safety management systems. Certification is not a box-tick — it is embedded in our daily production operations.
              </p>
              <div className="space-y-4">
                {standards.map((s) => (
                  <div key={s.title} className="flex gap-5 p-5 rounded-xl border border-white/6 hover:border-orange-500/20 transition-all">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-white text-center leading-tight"
                      style={{ background: `color-mix(in srgb, ${ACCENT} 15%, transparent)`, border: `1px solid color-mix(in srgb, ${ACCENT} 19%, transparent)` }}
                    >
                      <span style={{ color: ACCENT }} className="text-[10px] font-bold tracking-wide">{s.badge}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-1">{s.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Lab */}
            <div className="flex flex-col justify-center">
              <div className="p-8 rounded-2xl border border-white/6" style={{ background: 'var(--fill-1)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in srgb, ${ACCENT} 13%, transparent)` }}>
                    <svg className="w-5 h-5" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.7-1.27 2.4l-7.5-1.87a2.75 2.75 0 00-1.34 0L4.87 18.7c-1.3.3-2.27-1.4-1.27-2.4l1.402-1.402M5 14.5l-.75-.75" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl text-white">Quality Laboratory</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  In-house laboratory capability supports pre-production, in-line, and finished goods testing across our product range.
                </p>
                <div className="space-y-3">
                  {[
                    'Microbiological analysis (bacteria, yeast, mould)',
                    'Chemical composition and nutritional testing',
                    'Sensory evaluation panels',
                    'Shelf-life and stability studies',
                    'Allergen management and testing',
                    'Packaging integrity and seal testing',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: ACCENT, color: 'var(--s0)' }} />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/6 text-xs text-slate-600">
                  Third-party laboratory verification available on request. Contact division for current testing scope.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. ProcessFlow ──────────────────────────────────────────────────── */}
      <ProcessFlow steps={processSteps} accentHex={ACCENT} label="From Concept to Consumer" />

      {/* ── 8. Facilities ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Facilities</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">Three Processing Units</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
              Each unit is configured for a specific product category cluster, with dedicated certification and quality systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {facilities.map((f) => (
              <div key={f.unit} className="bg-surface-2 rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-slate-100" style={{ background: `color-mix(in srgb, ${ACCENT} 2%, transparent)` }}>
                  <div className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: ACCENT }}>Processing Unit</div>
                  <h3 className="font-display text-xl text-fg">{f.unit.replace('Processing Unit ', '')}</h3>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2">Capacity</div>
                    <div className="text-sm text-slate-600 font-medium">{f.capacity}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2">Product Lines</div>
                    <div className="space-y-1">
                      {f.lines.map((line) => (
                        <div key={line} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1 h-1 rounded-full" style={{ background: ACCENT, color: 'var(--s0)' }} />
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2">Certifications</div>
                    <div className="flex flex-wrap gap-1.5">
                      {f.certs.map((cert) => (
                        <span
                          key={cert}
                          className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wide"
                          style={{ background: `color-mix(in srgb, ${ACCENT} 6%, transparent)`, color: ACCENT }}
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lab & QC panel */}
          <div className="bg-surface-2 rounded-2xl border border-slate-100 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-6" style={{ background: ACCENT, color: 'var(--s0)' }} />
                  <span className="text-[10px] font-semibold tracking-[0.25em] uppercase" style={{ color: ACCENT }}>On-Site Laboratory & QC</span>
                </div>
                <h3 className="font-display text-2xl text-fg mb-3">Integrated Quality Control</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Each processing unit is supported by on-site quality control infrastructure. Lab results directly gate production release — no batch leaves without QC sign-off.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['Incoming QC', 'In-Process QC', 'Finished Goods QC', 'Environmental Monitoring'].map((item) => (
                  <div key={item} className="p-4 rounded-xl text-center border border-slate-100" style={{ background: `color-mix(in srgb, ${ACCENT} 2%, transparent)` }}>
                    <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: `color-mix(in srgb, ${ACCENT} 8%, transparent)` }}>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: ACCENT, color: 'var(--s0)' }} />
                    </div>
                    <div className="text-xs font-semibold text-fg">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Quality & Compliance ─────────────────────────────────────────── */}
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Certification grid */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Certifications</span>
              </div>
              <h2 className="font-display text-4xl text-fg mb-6">Quality &amp; Compliance</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Our manufacturing operations are subject to multiple certification frameworks — ensuring confidence for retail buyers, export partners, and regulators worldwide.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-orange-200 transition-all">
                    <div
                      className="w-14 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold tracking-wide text-center"
                      style={{ background: `color-mix(in srgb, ${ACCENT} 7%, transparent)`, color: ACCENT }}
                    >
                      {cert.name}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-fg">{cert.name}</div>
                      <div className="text-xs text-slate-400">{cert.body}</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 rounded-full" style={{ background: ACCENT, color: 'var(--s0)' }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4">
                Certification registration numbers withheld. Contact division for formal compliance documentation.
              </p>
            </div>

            {/* Performance targets */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Performance Targets</span>
              </div>
              <h2 className="font-display text-4xl text-fg mb-6">Measurable Quality<br />Standards</h2>
              <div className="space-y-8">
                {qualityMetrics.map((m) => (
                  <div key={m.label}>
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <div className="font-semibold text-sm text-fg">{m.label}</div>
                        <div className="text-[11px] text-slate-400">{m.note}</div>
                      </div>
                      <div className="font-display text-2xl" style={{ color: ACCENT }}>{m.value}</div>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${m.target}%`, background: ACCENT }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-5 rounded-xl" style={{ background: `color-mix(in srgb, ${ACCENT} 3%, transparent)`, border: `1px solid color-mix(in srgb, ${ACCENT} 9%, transparent)` }}>
                <h4 className="font-semibold text-sm text-fg mb-2">Continuous Improvement Culture</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Performance metrics are reviewed monthly against targets. Non-conformances trigger root-cause analysis and corrective action within defined SLAs. Third-party audits are welcomed as validation of our internal quality management posture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Supply Chain ────────────────────────────────────────────────── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Supply Chain</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">End-to-End Supply Chain</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              From verified raw material suppliers through certified manufacturing to domestic and export distribution — a fully integrated value chain.
            </p>
          </div>

          {/* Flow */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {['Supplier', 'Manufacturing', 'QC & Testing', 'Packing', 'Distribution'].map((stage, i) => (
              <div key={stage} className="relative">
                <div className="p-5 rounded-xl text-center border border-white/8" style={{ background: 'var(--fill-2)' }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-xs font-bold text-fg"
                    style={{ background: ACCENT, color: 'var(--s0)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="text-white text-xs font-semibold">{stage}</div>
                </div>
                {i < 4 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-2 z-10 w-4 h-4 items-center justify-center -translate-y-1/2">
                    <svg className="w-4 h-4" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl border border-white/6" style={{ background: 'var(--fill-1)' }}>
              <h3 className="font-display text-xl text-white mb-3">Raw Material Sourcing</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Primary ingredient sourcing from Bangladeshi farms and manufacturers — supporting local agriculture with direct procurement relationships.
              </p>
              <div className="space-y-2">
                {['Local Bangladesh raw materials (primary)', 'Imported specialty ingredients (supplementary)', 'Approved supplier audits and quality agreements', 'Dual-source strategy for critical ingredients'].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-slate-500">
                    <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: ACCENT, color: 'var(--s0)' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-7 rounded-2xl border border-white/6" style={{ background: 'var(--fill-1)' }}>
              <h3 className="font-display text-xl text-white mb-3">Distribution Reach</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Products distributed through domestic retail networks and export logistics partners — covering modern trade, traditional retail, and international channels.
              </p>
              <div className="space-y-2">
                {[
                  'Bangladesh domestic retail (modern & traditional trade)',
                  'Export consolidation via Dhaka and Chittagong',
                  'Cold-chain distribution for temperature-sensitive products',
                  'Halal-export documentation and compliance',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-slate-500">
                    <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: ACCENT, color: 'var(--s0)' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Sustainability ──────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Sustainability</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">Responsible Manufacturing</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
              Building a food manufacturing division that is commercially excellent and environmentally responsible — for people, planet, and future consumers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sustainability.map((s) => (
              <div key={s.title} className="bg-surface-2 rounded-2xl p-8 border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `color-mix(in srgb, ${ACCENT} 7%, transparent)`, color: ACCENT }}
                >
                  {s.icon}
                </div>
                <h3 className="font-display text-xl text-fg mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="p-4 rounded-xl" style={{ background: `color-mix(in srgb, ${ACCENT} 3%, transparent)`, border: `1px solid color-mix(in srgb, ${ACCENT} 8%, transparent)` }}>
                  <div className="font-display text-xl mb-0.5" style={{ color: ACCENT }}>{s.stat}</div>
                  <div className="text-xs text-slate-400">{s.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. Export Markets ──────────────────────────────────────────────── */}
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Export Markets</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Bangladesh to<br />Global Retail
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Our halal certification, BSTI compliance, and international food safety standards position Network71 products for placement in key export markets — particularly where Bangladeshi diaspora and halal consumer segments drive FMCG demand.
              </p>
              <a
                href="#sector-contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: ACCENT, color: 'var(--s0)' }}
              >
                Export Buyer Inquiry
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="lg:col-span-3 space-y-3">
              {exportMarkets.map((market) => (
                <div key={market.region} className="flex items-start gap-5 p-5 rounded-xl border border-white/6 hover:border-orange-500/20 transition-all" style={{ background: 'var(--fill-1)' }}>
                  <div className="text-3xl flex-shrink-0">{market.flag}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-white text-sm">{market.region}</h3>
                      <span
                        className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase"
                        style={{ background: `color-mix(in srgb, ${ACCENT} 13%, transparent)`, color: ACCENT }}
                      >
                        {market.priority}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed mb-1">{market.driver}</p>
                    <p className="text-slate-600 text-[11px]">{market.countries}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. Business Opportunities ──────────────────────────────────────── */}
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Business Opportunities</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">Partner With Our<br />Food Division</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
              We are actively seeking partners across four business models. If your business aligns with any of these, we want to hear from you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {opportunities.map((opp) => (
              <div
                key={opp.title}
                className="group p-7 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors"
                  style={{ background: `color-mix(in srgb, ${ACCENT} 6%, transparent)`, color: ACCENT }}
                >
                  {opp.icon}
                </div>
                <h3 className="font-display text-lg text-fg mb-3">{opp.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{opp.desc}</p>
                <a
                  href="#sector-contact"
                  className="flex items-center gap-2 text-sm font-semibold transition-colors group-hover:opacity-90"
                  style={{ color: ACCENT }}
                >
                  {opp.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. Growth Roadmap ──────────────────────────────────────────────── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>Growth Roadmap</span>
              <div className="h-px w-8" style={{ background: ACCENT, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">The Path to Global Shelves</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              A four-year plan taking the Food &amp; Beverage division from manufacturing excellence to own-brand international retail listing.
            </p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px" style={{ background: `color-mix(in srgb, ${ACCENT} 15%, transparent)` }} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {roadmap.map((item, i) => (
                <div key={item.year} className="relative">
                  <div className="hidden lg:flex w-14 h-14 rounded-full items-center justify-center mx-auto mb-6 font-display text-fg font-bold text-sm z-10 relative" style={{ background: ACCENT, color: 'var(--s0)' }}>
                    {item.year}
                  </div>
                  <div className="p-6 rounded-2xl border border-white/6 hover:border-orange-500/20 transition-all" style={{ background: 'var(--fill-2)' }}>
                    <div className="lg:hidden font-display text-2xl mb-3" style={{ color: ACCENT }}>{item.year}</div>
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-slate-500">Phase {i + 1}</div>
                    <h3 className="font-display text-lg text-white mb-3">{item.milestone}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 15. SectorContact ───────────────────────────────────────────────── */}
      <SectorContact
        divisionName="Food & Beverage Manufacturing"
        accentHex={ACCENT}
        inquiryTypes={['Retail Distribution', 'Export Buyer', 'Co-Manufacturing', 'Private Label', 'B2B Supply']}
      />

      {/* ── 16. Footer ──────────────────────────────────────────────────────── */}
      </main>
      <Footer />
    </div>
  )
}
