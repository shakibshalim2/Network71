import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectorHeader from '@/components/sector/SectorHeader'
import MetricsBar from '@/components/sector/MetricsBar'
import ProcessFlow from '@/components/sector/ProcessFlow'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'

const OCEAN = '#0EA5E9'
const TEAL = '#0D9488'
const BG_DEEP = '#030810'
const BG_ALT = '#06101C'

/* ─── data ─────────────────────────────────────────────────────────────── */

const metrics = [
  { value: '50+', label: 'Countries', desc: 'Global marketplace reach' },
  { value: '200+', label: 'Active Buyers', desc: 'Registered vessel purchasers' },
  { value: '150+', label: 'Vessel Sellers', desc: 'Listed ship owners & brokers' },
  { value: '25+', label: 'Recycling Yards', desc: 'Certified demolition partners' },
]

const services = [
  {
    icon: '⚓',
    title: 'Buying Ships',
    desc: 'Access a curated global marketplace of vessels across all categories — from cargo and tankers to tugboats and offshore craft. Our team facilitates negotiations, due diligence, and documentation.',
    color: OCEAN,
  },
  {
    icon: '🔄',
    title: 'Selling Ships',
    desc: 'List your vessel for sale and reach 200+ qualified buyers in 50+ countries. We provide transparent pricing, market valuation, and full broker support through to contract completion.',
    color: TEAL,
  },
  {
    icon: '♻',
    title: 'Ship Recycling',
    desc: 'Responsible end-of-life ship recycling through 25+ certified yards compliant with the Hong Kong Convention and EU Ship Recycling Regulation. Competitive LDT rates with full documentation.',
    color: '#34D399',
  },
  {
    icon: '🔍',
    title: 'Inspection & Valuation',
    desc: 'Independent vessel inspection and market valuation services performed by certified marine surveyors. Full condition reports, survey documentation, and fair market value assessments.',
    color: '#F59E0B',
  },
]

const vesselCategories = [
  { name: 'Cargo Vessels', desc: 'General cargo, multipurpose, break-bulk', count: 'Available', color: OCEAN, icon: '⬡' },
  { name: 'Bulk Carriers', desc: 'Handysize, Supramax, Capesize', count: 'Available', color: TEAL, icon: '⬡' },
  { name: 'Tankers', desc: 'Chemical, product, crude oil tankers', count: 'Available', color: '#0D9488', icon: '⬡' },
  { name: 'Container Ships', desc: 'Feeder, sub-Panamax, Panamax', count: 'Available', color: '#22D3EE', icon: '⬡' },
  { name: 'Tugboats', desc: 'Harbour, offshore, ocean-going tugs', count: 'Available', color: '#F59E0B', icon: '⬡' },
  { name: 'Fishing Vessels', desc: 'Trawlers, purse seiners, longliners', count: 'Available', color: '#34D399', icon: '⬡' },
  { name: 'Offshore Vessels', desc: 'PSVs, AHTS, DSVs, survey vessels', count: 'Available', color: '#A855F7', icon: '⬡' },
  { name: 'Scrap / Demolition', desc: 'Vessels at end-of-life for recycling', count: 'Available', color: '#EF4444', icon: '⬡' },
]

const listings = [
  {
    name: 'MV Kalindi',
    type: 'General Cargo',
    flag: 'Bangladesh',
    dwt: '8,200 DWT',
    year: '2006',
    price: 'On Request',
    status: 'For Sale',
    condition: 'Trading',
    color: OCEAN,
    img: 'https://images.unsplash.com/photo-1613690399151-65ea69478674?w=600&h=320&fit=crop&auto=format',
  },
  {
    name: 'MV Oriental Star',
    type: 'Bulk Carrier',
    flag: 'Panama',
    dwt: '27,500 DWT',
    year: '2003',
    price: '$2.5M',
    status: 'For Sale',
    condition: 'Trading',
    color: TEAL,
    img: 'https://images.unsplash.com/photo-1595263026408-d502567353ee?w=600&h=320&fit=crop&auto=format',
  },
  {
    name: 'MV Pacific Trader',
    type: 'Container Vessel',
    flag: 'Marshall Islands',
    dwt: '14,200 DWT',
    year: '1998',
    price: '$580 / LDT',
    status: 'For Recycling',
    condition: 'Scrap',
    color: '#EF4444',
    img: 'https://images.unsplash.com/photo-1635851801927-44c4d1c555af?w=600&h=320&fit=crop&auto=format',
  },
  {
    name: 'MT Crude Master',
    type: 'Crude Oil Tanker',
    flag: 'Liberia',
    dwt: '60,000 DWT',
    year: '1999',
    price: '$620 / LDT',
    status: 'For Recycling',
    condition: 'Scrap',
    color: '#EF4444',
    img: 'https://images.unsplash.com/photo-1598625802173-8ff2d54dde02?w=600&h=320&fit=crop&auto=format',
  },
  {
    name: 'MV Sea Guardian',
    type: 'Tugboat',
    flag: 'Singapore',
    dwt: '550 GT',
    year: '2010',
    price: '$450K',
    status: 'For Sale',
    condition: 'Trading',
    color: '#F59E0B',
    img: 'https://images.unsplash.com/photo-1658966005677-aeab72abcb52?w=600&h=320&fit=crop&auto=format',
  },
  {
    name: 'MV Atlantic Fisher',
    type: 'Fishing Vessel',
    flag: 'Spain',
    dwt: '1,200 GT',
    year: '2008',
    price: '€380K',
    status: 'For Sale',
    condition: 'Trading',
    color: '#34D399',
    img: 'https://images.unsplash.com/photo-1598408745613-178751e2ccde?w=600&h=320&fit=crop&auto=format',
  },
]

type Vessel = typeof listings[0]

const purchaseProcess = [
  { title: 'Submit Inquiry', desc: 'Contact us with your requirements — vessel type, size, budget, and intended use. Our brokers will match you with suitable listings within 24 hours.' },
  { title: 'Review & Shortlist', desc: 'We present verified vessel options with full specification sheets, survey history, flag records, and pricing details for your review.' },
  { title: 'Inspection & Survey', desc: 'Independent survey conducted by a certified marine surveyor. Full condition report issued covering hull, machinery, and class status.' },
  { title: 'Negotiation & Agreement', desc: 'Our brokers facilitate price negotiation and draft the Memorandum of Agreement (MOA) in accordance with international maritime law.' },
  { title: 'Transfer & Delivery', desc: 'Flag transfer, title documentation, payment settlement, and vessel delivery coordinated by our team through to final handover.' },
]

const compliance = [
  {
    title: 'Hong Kong Convention',
    body: 'International Maritime Organization',
    status: 'Aligned',
    statusColor: '#34D399',
    desc: 'All recycling partners are aligned with the Hong Kong International Convention for Safe and Environmentally Sound Recycling of Ships.',
  },
  {
    title: 'EU Ship Recycling Regulation',
    body: 'European Commission',
    status: 'Compliant',
    statusColor: '#34D399',
    desc: 'EU-flag and EU-owned vessels are handled through yards approved under the EU Ship Recycling Regulation (EUSRR) list.',
  },
  {
    title: 'Basel Convention',
    body: 'United Nations Environment Programme',
    status: 'Compliant',
    statusColor: '#34D399',
    desc: 'Hazardous waste generated during recycling is managed in accordance with the Basel Convention on transboundary movement of hazardous waste.',
  },
  {
    title: 'ISM Code Compliance',
    body: 'International Safety Management',
    status: 'Verified',
    statusColor: OCEAN,
    desc: 'All vessels listed for trading are verified for valid ISM certification and up-to-date safety management system documentation.',
  },
]

/* ─── vessel card ────────────────────────────────────────────────────────── */

function VesselCard({ vessel }: { vessel: Vessel }) {
  const isScrap = vessel.condition === 'Scrap'
  return (
    <div
      className="rounded-2xl flex flex-col overflow-hidden transition-all duration-300 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid rgba(255,255,255,0.07)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${vessel.color}40`
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 28px ${vessel.color}14`
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Vessel photo */}
      <div className="relative overflow-hidden" style={{ height: 160, background: '#0a1628' }}>
        <img
          src={vessel.img}
          alt={vessel.name}
          className="w-full h-full object-cover"
          style={{ opacity: 0.85 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(3,8,16,0.88) 100%)' }}
        />
        <span
          className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
          style={{
            background: isScrap ? 'rgba(239,68,68,0.85)' : 'rgba(52,211,153,0.85)',
            color: 'white',
            backdropFilter: 'blur(4px)',
          }}
        >
          {vessel.status}
        </span>
        <div className="absolute bottom-3 left-4">
          <div className="text-white font-semibold text-sm">{vessel.name}</div>
          <div className="text-slate-400 text-xs">{vessel.type}</div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Specs */}
        <div className="space-y-2 mb-4 flex-1">
          {[
            { label: 'Flag', value: vessel.flag },
            { label: 'DWT / GT', value: vessel.dwt },
            { label: 'Built', value: vessel.year },
          ].map((spec) => (
            <div key={spec.label} className="flex items-center justify-between">
              <span className="text-slate-500 text-xs">{spec.label}</span>
              <span className="text-slate-300 text-xs font-medium">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="h-px mb-4" style={{ background: 'rgba(255,255,255,0.05)' }} />

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-slate-500">Price</span>
          <span className="font-display text-lg font-semibold" style={{ color: vessel.color }}>{vessel.price}</span>
        </div>

        <a
          href="#sector-contact"
          className="block text-center py-2 rounded-lg text-xs font-semibold transition-all duration-200"
          style={{ background: `${vessel.color}14`, color: vessel.color, border: `1px solid ${vessel.color}25` }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${vessel.color}26` }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${vessel.color}14` }}
        >
          Enquire About This Vessel
        </a>
      </div>
    </div>
  )
}

/* ─── vessel listings (search + filter + grid) ───────────────────────────── */

const VESSEL_TYPES = ['All Types', 'Cargo', 'Bulk Carrier', 'Tanker', 'Container', 'Tugboat', 'Fishing', 'Offshore', 'Scrap']
const VESSEL_ACTIVITIES = ['All', 'For Sale', 'For Recycling']

function typeMatches(vesselType: string, vesselCondition: string, filter: string): boolean {
  if (filter === 'All Types') return true
  if (filter === 'Scrap') return vesselCondition === 'Scrap'
  return vesselType.toLowerCase().includes(filter.toLowerCase())
}

function VesselListings() {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [activityFilter, setActivityFilter] = useState('All')

  const filtered = listings.filter((v) => {
    const q = query.trim().toLowerCase()
    const matchesQuery =
      !q ||
      v.name.toLowerCase().includes(q) ||
      v.type.toLowerCase().includes(q) ||
      v.flag.toLowerCase().includes(q)
    const matchesType = typeMatches(v.type, v.condition, typeFilter)
    const matchesActivity = activityFilter === 'All' || v.status === activityFilter
    return matchesQuery && matchesType && matchesActivity
  })

  return (
    <>
      {/* Search bar */}
      <div
        className="rounded-2xl p-5 mb-10"
        style={{ background: `${OCEAN}08`, border: `1px solid ${OCEAN}20` }}
      >
        <div className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: OCEAN }}>
          Search Vessel Listings
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by vessel name, type, or flag..."
              className="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder:text-slate-600 outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = `${OCEAN}50` }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg text-sm text-slate-300 outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {VESSEL_TYPES.map((t) => <option key={t} style={{ background: '#06101C' }}>{t}</option>)}
          </select>
          <select
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg text-sm text-slate-300 outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {VESSEL_ACTIVITIES.map((a) => <option key={a} style={{ background: '#06101C' }}>{a}</option>)}
          </select>
          {(query || typeFilter !== 'All Types' || activityFilter !== 'All') && (
            <button
              onClick={() => { setQuery(''); setTypeFilter('All Types'); setActivityFilter('All') }}
              className="px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Clear
            </button>
          )}
        </div>
        {(query || typeFilter !== 'All Types' || activityFilter !== 'All') && (
          <div className="mt-3 text-xs text-slate-500">
            {filtered.length === 0 ? 'No vessels match your filters.' : `Showing ${filtered.length} of ${listings.length} listings`}
          </div>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((vessel) => (
            <VesselCard key={vessel.name} vessel={vessel} />
          ))}
        </div>
      ) : (
        <div
          className="py-20 text-center rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="text-3xl mb-4">⚓</div>
          <div className="text-white font-semibold text-sm mb-2">No vessels match your search</div>
          <div className="text-slate-500 text-xs mb-6">Try adjusting your filters or contact our team for off-market listings.</div>
          <button
            onClick={() => { setQuery(''); setTypeFilter('All Types'); setActivityFilter('All') }}
            className="px-5 py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ background: OCEAN, color: 'white' }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  )
}

/* ─── page ──────────────────────────────────────────────────────────────── */

export default function EShipe() {
  return (
    <div className="min-h-full" style={{ background: BG_DEEP, color: 'white' }}>
      <SectorHeader divisionName="eSHIPe Maritime" accentClass="text-sky-400" />

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: BG_DEEP }}>
        {/* Ocean grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            opacity: 0.7,
          }}
        />
        {/* Glows */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)' }}
        />

        {/* Horizon line */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: '55%', height: '1px', background: `linear-gradient(to right, transparent, ${OCEAN}30, transparent)` }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: OCEAN }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: OCEAN }}>
                Network71 — Division 08
              </span>
            </div>

            {/* Badge */}
            <div className="mb-8 inline-flex">
              <div
                className="flex items-center gap-3 px-4 py-2 rounded-full"
                style={{ border: `1px solid ${OCEAN}35`, background: `${OCEAN}0E` }}
              >
                <span className="text-2xl">⚓</span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: OCEAN }}>
                  eSHIPe Maritime Marketplace
                </span>
              </div>
            </div>

            <h1 className="font-display leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              <span style={{ color: 'white' }}>Your Global Partner in</span>
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${OCEAN} 0%, #38BDF8 50%, ${TEAL} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ship Trading & Recycling.
              </span>
            </h1>

            <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
              eSHIPe is Network71&apos;s dedicated maritime marketplace — connecting ship buyers, sellers, and
              recycling partners across 50+ countries. We facilitate the entire vessel lifecycle: from acquisition
              and trading to sustainable end-of-life recycling.
            </p>

            <div className="flex flex-wrap gap-4 mb-20">
              <a
                href="#listings"
                className="px-8 py-3.5 font-semibold text-sm rounded-lg transition-all hover:opacity-90"
                style={{ background: OCEAN, color: 'white' }}
              >
                Browse Listings
              </a>
              <a
                href="#sector-contact"
                className="px-8 py-3.5 border text-sm font-medium text-white rounded-lg hover:bg-white/5 transition-colors"
                style={{ borderColor: `${OCEAN}50` }}
              >
                List Your Vessel
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-12 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {[
                { v: '50+', l: 'Countries' },
                { v: '200+', l: 'Active Buyers' },
                { v: '150+', l: 'Vessel Sellers' },
                { v: '25+', l: 'Recycling Yards' },
              ].map((m) => (
                <div key={m.l}>
                  <div className="font-display text-4xl mb-1" style={{ color: OCEAN }}>{m.v}</div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coordinates decoration */}
        <div
          className="absolute bottom-12 right-8 lg:right-16 hidden lg:block opacity-25"
          style={{ fontFamily: 'monospace', fontSize: '11px', color: OCEAN, lineHeight: 1.9 }}
        >
          <div>$ eshipe --network=global --status=online</div>
          <div style={{ color: '#4ade80' }}>&#10003; marketplace active — 50+ countries</div>
          <div style={{ color: '#4ade80' }}>&#10003; 200+ buyers registered</div>
          <div style={{ color: '#4ade80' }}>&#10003; recycling yards verified</div>
          <div className="animate-pulse">&#9646; awaiting vessel enquiry_</div>
        </div>
      </section>

      {/* ── 2. METRICS BAR ── */}
      <MetricsBar metrics={metrics} accentHex={OCEAN} dark />

      {/* ── 3. SERVICES ── */}
      <section className="py-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: OCEAN }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: OCEAN }}>Our Services</span>
              <div className="h-px w-8" style={{ background: OCEAN }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
              End-to-End Maritime Solutions
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              From first contact to final transfer — eSHIPe handles every stage of the vessel transaction
              with expertise, transparency, and legal rigour.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="group p-8 rounded-2xl cursor-default transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${svc.color}40`
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${svc.color}12`
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-2xl"
                  style={{ background: `${svc.color}14`, border: `1px solid ${svc.color}30` }}
                >
                  {svc.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-4">{svc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{svc.desc}</p>
                <div className="mt-6 h-px w-10 transition-all duration-300 group-hover:w-20" style={{ background: svc.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. VESSEL CATEGORIES ── */}
      <section className="py-24" style={{ background: BG_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: OCEAN }} />
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: OCEAN }}>Vessel Types</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4 leading-tight">
            All Vessel Categories
          </h2>
          <p className="text-slate-400 text-sm mb-14 max-w-xl leading-relaxed">
            eSHIPe covers the full spectrum of commercial and specialist vessel types for trading and recycling.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vesselCategories.map((cat) => (
              <div
                key={cat.name}
                className="p-6 rounded-xl transition-all duration-200 cursor-default"
                style={{ background: `${cat.color}06`, border: `1px solid ${cat.color}18` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${cat.color}40` }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${cat.color}18` }}
              >
                <div className="text-xl mb-4" style={{ color: cat.color }}>{cat.icon}</div>
                <div className="text-white font-semibold text-sm mb-1.5">{cat.name}</div>
                <div className="text-slate-500 text-xs mb-4 leading-relaxed">{cat.desc}</div>
                <div
                  className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ background: `${cat.color}14`, color: cat.color }}
                >
                  {cat.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. VESSEL LISTINGS ── */}
      <section id="listings" className="py-24 relative overflow-hidden" style={{ background: BG_ALT }}>
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-10" style={{ background: OCEAN }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: OCEAN }}>Active Listings</span>
              </div>
              <h2 className="font-display text-4xl text-white">Featured Vessels</h2>
            </div>
            <a
              href="#sector-contact"
              className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ color: OCEAN }}
            >
              Submit a Listing
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <VesselListings />

          <div
            className="mt-10 p-5 rounded-xl text-center"
            style={{ background: `${OCEAN}08`, border: `1px solid ${OCEAN}20` }}
          >
            <p className="text-slate-400 text-sm mb-3">
              These featured listings are representative samples. Contact our team for the full live inventory and off-market opportunities.
            </p>
            <a
              href="#sector-contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: OCEAN, color: 'white' }}
            >
              Request Full Vessel Inventory
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. HOW TO BUY / PURCHASE PROCESS ── */}
      <div style={{ background: BG_DEEP }}>
        <ProcessFlow
          steps={purchaseProcess}
          accentHex={OCEAN}
          label="How the Purchase Process Works"
        />
      </div>

      {/* ── 7. SHIP RECYCLING ── */}
      <section className="py-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10" style={{ background: '#34D399' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: '#34D399' }}>Sustainable Recycling</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Responsible Ship Recycling
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                End-of-life ships contain thousands of tonnes of steel and significant volumes of hazardous
                materials. eSHIPe connects vessel owners with certified recycling yards that operate to the
                highest environmental and safety standards — maximising LDT value while minimising
                environmental impact.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                All recycling partners in our network hold valid documentation under the relevant international
                conventions and undergo periodic audit by independent surveyors. Current LDT rates and yard
                availability are provided on request.
              </p>
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl"
                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}
              >
                <span className="text-xl">♻</span>
                <div>
                  <div className="text-white font-semibold text-sm">25+ Certified Recycling Yards</div>
                  <div className="text-slate-500 text-xs">South Asia, Middle East, Turkey</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="font-mono text-[10px] tracking-widest uppercase mb-5" style={{ color: OCEAN }}>
                Regulatory Compliance
              </div>
              {compliance.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="text-white font-semibold text-sm">{item.title}</div>
                      <div className="text-slate-600 text-[10px] font-mono mt-0.5">{item.body}</div>
                    </div>
                    <span
                      className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ background: `${item.statusColor}15`, color: item.statusColor }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. WHY ESHIP ── */}
      <section className="py-24" style={{ background: BG_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: OCEAN }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: OCEAN }}>Why eSHIPe</span>
              <div className="h-px w-8" style={{ background: OCEAN }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
              The Network71 Maritime Advantage
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              eSHIPe is backed by Network71&apos;s global trade infrastructure — giving buyers and sellers
              access to a network built on decades of international commercial experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: '◈',
                title: 'Global Buyer Network',
                desc: '200+ registered buyers across 50+ countries, spanning institutional investors, shipping lines, and independent operators.',
                color: OCEAN,
              },
              {
                icon: '◈',
                title: 'Verified Listings Only',
                desc: 'Every vessel listed is verified for title, class status, and flag registry before publication. No ghost listings.',
                color: TEAL,
              },
              {
                icon: '◈',
                title: 'Neutral Brokerage',
                desc: 'Our brokers represent the transaction — not one side. Transparent fee structure, no hidden commissions.',
                color: '#34D399',
              },
              {
                icon: '◈',
                title: 'Legal Support',
                desc: 'MOA drafting, flag transfer coordination, and port agent services managed through N71\'s global legal network.',
                color: '#F59E0B',
              },
              {
                icon: '◈',
                title: 'Certified Surveyors',
                desc: 'Independent survey partners available in all major ports. Class-approved, IIMS-affiliated, and industry-credentialed.',
                color: OCEAN,
              },
              {
                icon: '◈',
                title: 'Post-Deal Support',
                desc: 'Crewing, insurance introductions, classification change support, and technical management referrals available post-close.',
                color: TEAL,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group p-7 rounded-2xl cursor-default transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}35`
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                <div className="text-xl mb-5" style={{ color: item.color }}>{item.icon}</div>
                <h3 className="font-semibold text-white text-sm mb-3">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                <div className="mt-5 h-px w-8 transition-all duration-300 group-hover:w-16" style={{ background: item.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. GLOBAL REACH MAP ── */}
      <section className="py-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10" style={{ background: OCEAN }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: OCEAN }}>Global Reach</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                50+ Countries. One Marketplace.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                eSHIPe operates across the world&apos;s major shipping corridors — from the Bay of Bengal
                and the Arabian Gulf to the Mediterranean, the North Sea, and East Asia. Our buyers and
                sellers span every major maritime flag state and port cluster.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Off-market deal flows and private listings are available to registered members.
                Contact us to join the eSHIPe network.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { region: 'South Asia', detail: 'Bangladesh · India · Pakistan · Sri Lanka', color: OCEAN },
                { region: 'Middle East', detail: 'UAE · Saudi Arabia · Kuwait · Oman', color: TEAL },
                { region: 'East Asia', detail: 'China · Japan · South Korea · Taiwan', color: '#22D3EE' },
                { region: 'Europe', detail: 'Greece · Turkey · Germany · Norway', color: '#A855F7' },
                { region: 'Southeast Asia', detail: 'Singapore · Malaysia · Philippines', color: OCEAN },
                { region: 'Americas', detail: 'USA · Panama · Brazil · Canada', color: '#34D399' },
              ].map((r) => (
                <div
                  key={r.region}
                  className="p-5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-2 h-2 rounded-full mb-3" style={{ background: r.color }} />
                  <div className="text-white font-semibold text-sm mb-1.5">{r.region}</div>
                  <div className="text-slate-500 text-xs leading-relaxed">{r.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. SECTOR CONTACT ── */}
      <SectorContact
        divisionName="eSHIPe Maritime"
        accentHex={OCEAN}
        inquiryTypes={['Buy a Vessel', 'Sell a Vessel', 'Ship Recycling Inquiry', 'Inspection & Valuation', 'Join as Broker / Yard', 'General Inquiry']}
      />

      <Footer />
    </div>
  )
}
