import { OCEAN, TEAL } from "../theme"

const en = {
  divisionName: "Ship Marketplace",
  metrics: [
    { value: "50+", label: "Countries", desc: "Global marketplace reach" },
    {
      value: "200+",
      label: "Active Buyers",
      desc: "Registered vessel purchasers",
    },
    {
      value: "150+",
      label: "Vessel Sellers",
      desc: "Listed ship owners & brokers",
    },
    {
      value: "25+",
      label: "Recycling Yards",
      desc: "Certified demolition partners",
    },
  ],
  inquiryTypes: [
    "Buy a Vessel",
    "Sell a Vessel",
    "Ship Recycling Inquiry",
    "Inspection & Valuation",
    "Join as Broker / Yard",
    "General Inquiry",
  ],
  hero: {
    eyebrow: "Network71 — Division 10",
    badge: "Ship Marketplace · eSHIPe",
    title: "The Global Marketplace for",
    titleAccent: "Ships & Marine Assets.",
    description:
      "Network71’s Ship Marketplace (eSHIPe) is where ships, vessels and marine assets are bought, sold, " +
      "leased and discovered — vessel listings with full specifications, search and filters, verified buyer-seller " +
      "profiles, structured inquiries and maritime services through to recycling.",
    browse: "Browse Listings",
    list: "List Your Vessel",
    metrics: [
      { value: "50+", label: "Countries" },
      { value: "200+", label: "Active Buyers" },
      { value: "150+", label: "Vessel Sellers" },
      { value: "25+", label: "Recycling Yards" },
    ],
    terminal: [
      "$ eshipe --network=global --status=online",
      "✓ marketplace active — 50+ countries",
      "✓ 200+ buyers registered",
      "✓ recycling yards verified",
      "▌ awaiting vessel enquiry_",
    ],
  },
  services: {
    eyebrow: "Our Services",
    title: "One Marketplace. Every Maritime Need.",
    description:
      "From vessel acquisition to responsible recycling, eSHIPe provides the expertise and network to move your maritime business forward.",
    items: [
      {
        icon: "⚓",
        title: "Buying Ships",
        desc:
          "Access a curated global marketplace of vessels across all categories — from cargo and tankers to " +
          "tugboats and offshore craft. Our team facilitates negotiations, due diligence, and documentation.",
        color: OCEAN,
      },
      {
        icon: "🔄",
        title: "Selling Ships",
        desc: "List your vessel for sale and reach 200+ qualified buyers in 50+ countries. We provide transparent pricing, market valuation, and full broker support through to contract completion.",
        color: TEAL,
      },
      {
        icon: "♻",
        title: "Ship Recycling",
        desc:
          "Responsible end-of-life ship recycling through 25+ certified yards compliant with the Hong Kong " +
          "Convention and EU Ship Recycling Regulation. Competitive LDT rates with full documentation.",
        color: "var(--accent-emerald)",
      },
      {
        icon: "🔍",
        title: "Inspection & Valuation",
        desc: "Independent vessel inspection and market valuation services performed by certified marine surveyors. Full condition reports, survey documentation, and fair market value assessments.",
        color: "var(--accent-amber)",
      },
    ],
  },
  categories: {
    eyebrow: "Browse by Category",
    title: "Find the Right Vessel",
    description:
      "Explore vessels across every major commercial and offshore category.",
    available: "Available",
    items: [
      {
        name: "Cargo Vessels",
        desc: "General cargo, multipurpose, break-bulk",
        color: OCEAN,
      },
      {
        name: "Bulk Carriers",
        desc: "Handysize, Supramax, Capesize",
        color: TEAL,
      },
      {
        name: "Tankers",
        desc: "Chemical, product, crude oil tankers",
        color: "var(--accent-teal)",
      },
      {
        name: "Container Ships",
        desc: "Feeder, sub-Panamax, Panamax",
        color: "var(--accent-cyan)",
      },
      {
        name: "Tugboats",
        desc: "Harbour, offshore, ocean-going tugs",
        color: "var(--accent-amber)",
      },
      {
        name: "Fishing Vessels",
        desc: "Trawlers, purse seiners, longliners",
        color: "var(--accent-emerald)",
      },
      {
        name: "Offshore Vessels",
        desc: "PSVs, AHTS, DSVs, survey vessels",
        color: "var(--accent-purple)",
      },
      {
        name: "Scrap / Demolition",
        desc: "Vessels at end-of-life for recycling",
        color: "var(--accent-red)",
      },
    ],
  },
  listings: {
    eyebrow: "Vessel Listings",
    title: "Available Vessels",
    description:
      "Browse our current selection of verified vessels. Contact our brokers for full specifications and inspection arrangements.",
    searchLabel: "Search Vessel Listings",
    placeholder: "Search by vessel name, type, or flag...",
    typeLabel: "Vessel type",
    activityLabel: "Vessel activity",
    clear: "Clear",
    showing: "Showing {shown} of {total} listings",
    noFilters: "No vessels match your filters.",
    noSearch: "No vessels match your search",
    noSearchDesc:
      "Try adjusting your filters or contact our team for off-market listings.",
    reset: "Reset Filters",
    illustrativeAlt:
      "Illustrative cargo vessel photograph; not the vessel described",
    example: "{type} example",
    specs: [{ label: "Flag" }, { label: "DWT / GT" }, { label: "Built" }],
    price: "Price",
    onEnquiry: "On enquiry",
    discuss: "Discuss These Requirements",
    typeOptions: [
      { value: "All Types", label: "All Types" },
      { value: "Cargo", label: "Cargo" },
      { value: "Bulk Carrier", label: "Bulk Carrier" },
      { value: "Tanker", label: "Tanker" },
      { value: "Container", label: "Container" },
      { value: "Tugboat", label: "Tugboat" },
      { value: "Fishing", label: "Fishing" },
      { value: "Offshore", label: "Offshore" },
      { value: "Scrap", label: "Scrap" },
    ],
    activityOptions: [
      { value: "All", label: "All" },
      { value: "For Sale", label: "For Sale" },
      { value: "For Recycling", label: "For Recycling" },
    ],
    vessels: [
      {
        name: "MV Kalindi",
        type: "General Cargo",
        filterType: "Cargo",
        flag: "Bangladesh",
        dwt: "8,200 DWT",
        year: "2006",
        price: "On Request",
        status: "For Sale",
        condition: "Trading",
        color: OCEAN,
      },
      {
        name: "MV Oriental Star",
        type: "Bulk Carrier",
        filterType: "Bulk Carrier",
        flag: "Panama",
        dwt: "27,500 DWT",
        year: "2003",
        price: "$2.5M",
        status: "For Sale",
        condition: "Trading",
        color: TEAL,
      },
      {
        name: "MV Pacific Trader",
        type: "Container Vessel",
        filterType: "Container",
        flag: "Marshall Islands",
        dwt: "14,200 DWT",
        year: "1998",
        price: "$580 / LDT",
        status: "For Recycling",
        condition: "Scrap",
        color: "var(--accent-red)",
      },
      {
        name: "MT Crude Master",
        type: "Crude Oil Tanker",
        filterType: "Tanker",
        flag: "Liberia",
        dwt: "60,000 DWT",
        year: "1999",
        price: "$620 / LDT",
        status: "For Recycling",
        condition: "Scrap",
        color: "var(--accent-red)",
      },
      {
        name: "MV Sea Guardian",
        type: "Tugboat",
        filterType: "Tugboat",
        flag: "Singapore",
        dwt: "550 GT",
        year: "2010",
        price: "$450K",
        status: "For Sale",
        condition: "Trading",
        color: "var(--accent-amber)",
      },
      {
        name: "MV Atlantic Fisher",
        type: "Fishing Vessel",
        filterType: "Fishing",
        flag: "Spain",
        dwt: "1,200 GT",
        year: "2008",
        price: "€380K",
        status: "For Sale",
        condition: "Trading",
        color: "var(--accent-emerald)",
      },
    ],
  },
  processLabel: "Purchase Process",
  process: [
    {
      title: "Submit Inquiry",
      desc: "Contact us with your requirements — vessel type, size, budget, and intended use. Our brokers will match you with suitable listings within 24 hours.",
    },
    {
      title: "Review & Shortlist",
      desc: "We present verified vessel options with full specification sheets, survey history, flag records, and pricing details for your review.",
    },
    {
      title: "Inspection & Survey",
      desc: "Independent survey conducted by a certified marine surveyor. Full condition report issued covering hull, machinery, and class status.",
    },
    {
      title: "Negotiation & Agreement",
      desc: "Our brokers facilitate price negotiation and draft the Memorandum of Agreement (MOA) in accordance with international maritime law.",
    },
    {
      title: "Transfer & Delivery",
      desc: "Flag transfer, title documentation, payment settlement, and vessel delivery coordinated by our team through to final handover.",
    },
  ],
  recycling: {
    eyebrow: "Responsible Recycling",
    title: "Ship Recycling, Done Right.",
    description:
      "We connect vessel owners with certified recycling yards that put safety, environmental responsibility, and transparent documentation first.",
    items: [
      {
        title: "Hong Kong Convention",
        body: "International Maritime Organization",
        status: "Aligned",
        statusColor: "var(--accent-emerald)",
        desc: "All recycling partners are aligned with the Hong Kong International Convention for Safe and Environmentally Sound Recycling of Ships.",
      },
      {
        title: "EU Ship Recycling Regulation",
        body: "European Commission",
        status: "Compliant",
        statusColor: "var(--accent-emerald)",
        desc: "EU-flag and EU-owned vessels are handled through yards approved under the EU Ship Recycling Regulation (EUSRR) list.",
      },
      {
        title: "Basel Convention",
        body: "United Nations Environment Programme",
        status: "Compliant",
        statusColor: "var(--accent-emerald)",
        desc: "Hazardous waste generated during recycling is managed in accordance with the Basel Convention on transboundary movement of hazardous waste.",
      },
      {
        title: "ISM Code Compliance",
        body: "International Safety Management",
        status: "Verified",
        statusColor: OCEAN,
        desc: "All vessels listed for trading are verified for valid ISM certification and up-to-date safety management system documentation.",
      },
    ],
  },
  why: {
    eyebrow: "Why eSHIPe",
    title: "The Network71 Maritime Advantage",
    description:
      "eSHIPe is backed by Network71’s global trade infrastructure — giving buyers and sellers access to a network built on decades of international commercial experience.",
    items: [
      {
        icon: "◈",
        title: "Global Buyer Network",
        desc: "200+ registered buyers across 50+ countries, spanning institutional investors, shipping lines, and independent operators.",
        color: OCEAN,
      },
      {
        icon: "◈",
        title: "Verified Listings Only",
        desc: "Every vessel listed is verified for title, class status, and flag registry before publication. No ghost listings.",
        color: TEAL,
      },
      {
        icon: "◈",
        title: "Neutral Brokerage",
        desc: "Our brokers represent the transaction — not one side. Transparent fee structure, no hidden commissions.",
        color: "var(--accent-emerald)",
      },
      {
        icon: "◈",
        title: "Legal Support",
        desc: "MOA drafting, flag transfer coordination, and port agent services managed through N71’s global legal network.",
        color: "var(--accent-amber)",
      },
      {
        icon: "◈",
        title: "Certified Surveyors",
        desc: "Independent survey partners available in all major ports. Class-approved, IIMS-affiliated, and industry-credentialed.",
        color: OCEAN,
      },
      {
        icon: "◈",
        title: "End-to-End Service",
        desc: "From first inquiry to final delivery or recycling, one team coordinates every stage of your transaction.",
        color: TEAL,
      },
    ],
  },
  reach: {
    eyebrow: "Global Reach",
    title: "50+ Countries. One Marketplace.",
    description:
      "eSHIPe operates across the world’s major shipping corridors — from the Bay of Bengal and the Arabian " +
      "Gulf to the Mediterranean, the North Sea, and East Asia. Our buyers and sellers span every major " +
      "maritime flag state and port cluster.",
    note: "Off-market deal flows and private listings are available to registered members. Contact us to join the eSHIPe network.",
    regions: [
      {
        region: "South Asia",
        detail: "Bangladesh · India · Pakistan · Sri Lanka",
        color: OCEAN,
      },
      {
        region: "Middle East",
        detail: "UAE · Saudi Arabia · Kuwait · Oman",
        color: TEAL,
      },
      {
        region: "East Asia",
        detail: "China · Japan · South Korea · Taiwan",
        color: "var(--accent-cyan)",
      },
      {
        region: "Europe",
        detail: "Greece · Turkey · Germany · Norway",
        color: "var(--accent-purple)",
      },
      {
        region: "Southeast Asia",
        detail: "Singapore · Malaysia · Philippines",
        color: OCEAN,
      },
      {
        region: "Americas",
        detail: "USA · Panama · Brazil · Canada",
        color: "var(--accent-emerald)",
      },
    ],
  },
}

export type EShipeContent = typeof en
export default en
