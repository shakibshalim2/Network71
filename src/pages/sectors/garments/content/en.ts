import { data } from "./en/data"

const en = {
  divisionName: "Garments & Apparel",
  metrics: [
    { value: "5+", label: "Factories", desc: "Production facilities" },
    { value: "2,000+", label: "Workers", desc: "Skilled workforce" },
    { value: "15+", label: "Export Countries", desc: "Global reach" },
    { value: "—", label: "Annual Capacity", desc: "Data to be published" },
  ],
  processLabel: "Our Process",
  processSteps: data.processSteps,
  inquiryTypes: [
    "Buyer Inquiry",
    "Private Label Partnership",
    "Wholesale Inquiry",
    "Factory Visit",
    "Sustainability Partnership",
  ],
  hero: {
    alt: "Garment manufacturing",
    eyebrow: "Network71 — Division 01",
    title1: "Garments",
    title2: "Apparel",
    lead: "Private-label manufacturing and full-package production built for the world's most demanding fashion markets.",
    description: "From Bangladesh to the globe — sustainable fashion, uncompromising quality, and industrial precision at every stage of the supply chain.",
    ctaPrimary: "Request RFQ",
    ctaSecondary: "Explore Division",
    tags: ["Bangladesh Based", "15+ Export Markets", "ISO Compliant"],
  },
  overview: {
    eyebrow: "Division Overview",
    title1: "Manufacturing",
    title2: "Leadership at Scale",
    p1: "Network71's Garments & Apparel division is one of Bangladesh's emerging private-label manufacturing operations — " +
      "combining industrial-scale production capacity with the craftsmanship precision demanded by international fashion brands.",
    p2: "We serve international buyers across 15+ countries with a full-package manufacturing model that spans design consultation, " +
      "material sourcing, cut and sew operations, quality assurance, and export logistics — all under one coordinated supply chain.",
    p3: "Our commitment to sustainable fashion is embedded in every production decision — from certified fabric selection to worker " +
      "welfare programmes that set a benchmark for responsible apparel manufacturing in South Asia.",
    tags: ["Private Label Focus", "Sustainable Manufacturing", "Full Package Production", "Export Ready"],
    pillars: [
      { icon: "⚡", title: "Speed-to-Market", desc: "Compressed lead times with agile production scheduling and dedicated sampling teams." },
      { icon: "✓", title: "Quality Assurance", desc: "AQL-based inspection at every production stage. Zero-compromise quality control protocols." },
      { icon: "🌿", title: "Sustainable Practice", desc: "Certified organic fibres, water recycling, and energy-efficient factory operations." },
      { icon: "🌐", title: "Global Standards", desc: "WRAP, BSCI, and international buyer code-of-conduct compliance across all facilities." },
    ],
  },
  products: {
    eyebrow: "Product Portfolio",
    title1: "Six Core",
    title2: "Category Verticals",
    lead: "Our manufacturing capability spans a comprehensive range — from mass-market essentials to technically demanding performance and sustainable lines.",
    categories: data.productCategories,
  },
  manufacturing: {
    eyebrow: "Manufacturing Excellence",
    title1: "Four Production",
    title2: "Service Modes",
    lead: "Network71's garment factories operate across four distinct service models — enabling us to meet the precise requirements " +
      "of each buyer relationship, from turnkey full-package production to buyer-supplied CMT operations.",
    pillars: data.manufacturingPillars,
    flowLabel: "Production Flow Overview",
    stages: ["Raw Materials", "Pattern Making", "Fabric Cutting", "Sewing Lines", "QC Inspection", "Finishing", "Export"],
  },
  technology: {
    eyebrow: "Technology & Innovation",
    title1: "Digital Infrastructure",
    title2: "Behind Every Order",
    lead: "Our technology stack enables real-time visibility, precision manufacturing, and transparent buyer communication throughout every production cycle.",
    cards: data.techCards,
    integrationTitle: "Ezyify Platform Integration",
    integrationLead: "Network71's Garments division integrates with the Ezyify platform — enabling streamlined order management, " +
      "buyer communication, and production milestone tracking in a single digital environment.",
  },
  facilities: {
    eyebrow: "Our Facilities",
    title1: "Industrial-Scale",
    title2: "Production Floors",
    lead: "Network71 operates multiple production facilities in Bangladesh — equipped with modern machinery, structured production " +
      "lines, and dedicated quality control zones engineered to meet international buyer standards.",
    stats: [
      { value: "TBP", label: "Production Floor", sub: "To be published" },
      { value: "TBP", label: "Cutting Lines", sub: "To be published" },
      { value: "2,000+", label: "Sewing Stations", sub: "Skilled operators" },
    ],
    note: "Detailed facility specifications to be published. Contact the division for a factory capability deck.",
    alts: ["Factory production floor", "Garment production", "Textile materials"],
  },
  quality: {
    eyebrow: "Quality & Compliance",
    title: "Certified. Audited. Compliant.",
    lead: "Our quality management system and compliance framework meet the requirements of the world's most stringent international buyer codes of conduct.",
    certifications: data.certifications,
    progressLabel: "Certification in Progress",
    auditTitle: "Factory Audit Ready",
    auditLead: "All Network71 facilities maintain continuous audit readiness for BSCI, amfori, and buyer-commissioned third-party social compliance audits.",
    auditItems: [{ label: "AQL Inspection Standard", note: "Applied at every production stage" }, { label: "Third-Party Audit", note: "Available on buyer request" }],
  },
  sustainability: {
    eyebrow: "Sustainability", title1: "Responsible Fashion", title2: "Manufacturing",
    p1: "Network71's Garments division is actively building one of the most responsible apparel supply chains in Bangladesh — " +
      "embedding sustainability into sourcing decisions, production processes, and workforce development.",
    p2: "Our sustainability targets set measurable targets across material use, water management, carbon reduction, and worker welfare " +
      "— with transparent progress reporting to international buyers.",
    cta: "Sustainability Partnership Inquiry", targetLabel: "target", targets: data.sustainabilityTargets,
    note: "Progress metrics reflect divisional targets. Actual measurements to be published upon data collection completion.",
  },
  supplyChain: {
    eyebrow: "Supply Chain", title1: "Integrated Supply Chain", title2: "From Source to Buyer",
    lead: "Based in Bangladesh — the world's second-largest garment exporter — Network71 operates a vertically integrated supply " +
      "chain connecting global raw material suppliers to international buyers across 15+ countries.",
    columns: [
      { icon: "🌾", title: "Raw Material Suppliers", items: ["Certified fabric mills", "Trim & accessory suppliers", "Sustainable fibre sources"] },
      { icon: "🏭", title: "N71 Factories", items: ["Pattern & cutting", "Sewing & assembly", "Washing & finishing"] },
      { icon: "✈️", title: "Export & Logistics", items: ["QC lab clearance", "Customs documentation", "Freight to buyer"] },
    ],
    bangladeshTitle: "Bangladesh — World's Premier Garment Export Hub",
    bangladeshLead: "Bangladesh is the world's second-largest apparel exporter, providing Network71 with access to one of the deepest " +
      "pools of skilled garment workers, established textile infrastructure, and competitive production economics.",
  },
  markets: {
    eyebrow: "Export Markets", title1: "15+ Countries.", title2: "One Supply Chain.",
    lead: "Network71 garments reach buyers across major fashion markets on four continents. Export coverage is expanding as we scale capacity and establish new buyer relationships.",
    markets: data.exportMarkets, primary: "Primary", additionalLabel: "Additional export markets:", dataNote: "Data to be published", note: "Contact the division for full market coverage details.",
  },
  opportunity: {
    eyebrow: "Business Opportunity", title1: "Work With Our", title2: "Garments Division",
    lead: "Whether you are an international brand seeking private-label production, a wholesale buyer, or an emerging boutique — we have a manufacturing model built for you.",
    buyers: data.buyerTypes,
  },
  roadmap: {
    eyebrow: "Growth Strategy", title1: "Division Roadmap", title2: "2025 — 2027",
    lead: "Network71's Garments division is executing a phased growth strategy — expanding physical capacity, launching " +
      "sustainable product lines, and integrating advanced production technologies over the next three years.",
    items: data.roadmap,
  },
}

export type GarmentsContent = typeof en
export default en
