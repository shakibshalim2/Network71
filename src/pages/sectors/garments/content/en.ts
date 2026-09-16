import { data } from "./en/data"

const en = {
  divisionName: "Garments & Apparel",
  metrics: [
    { value: "Full-package", label: "Manufacturing model", desc: "Design to export under one supply chain" },
    { value: "Export", label: "Bangladesh base", desc: "Manufacturing for international buyers" },
    { value: "Audit-ready", label: "Buyer compliance", desc: "Code-of-conduct frameworks" },
    { value: "On request", label: "Capacity data", desc: "Factory capability deck available" },
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=800&fit=crop&auto=format",
    alt: "Garment manufacturing",
    eyebrow: "Network71 — Division 01",
    title1: "Garments",
    title2: "Apparel",
    lead: "Private-label manufacturing and full-package production built for demanding international fashion markets.",
    description: "From Bangladesh to the globe — sustainable fashion, uncompromising quality, and industrial precision at every stage of the supply chain.",
    ctaPrimary: "Request RFQ",
    ctaSecondary: "Explore Division",
    tags: ["Bangladesh Based", "Export Focused", "Buyer Code-of-Conduct Ready"],
    ticker: ["Private label", "Full-package", "CMT", "Sampling 7–10 days", "AQL 2.5 inspection", "Export documentation", "Woven · Knit · Denim"],
  },
  buyerFacts: {
    eyebrow: "Working With Us",
    title1: "The Numbers Buyers",
    title2: "Ask For First",
    lead: "The commercial facts that shape a first conversation — indicative, confirmed per style at RFQ stage.",
    facts: [
      { value: "500", unit: " pcs", label: "Indicative MOQ", sub: "Per style / colour — negotiable for programme buyers" },
      { value: "7–10", unit: " days", label: "First sample", sub: "Proto and fit samples from an approved tech pack" },
      { value: "45–60", unit: " days", label: "Bulk lead time", sub: "From approved PP sample to ex-factory" },
      { value: "1–3", unit: " rounds", label: "Fit iterations", sub: "Included before bulk approval" },
      { value: "LC / TT", unit: "", label: "Payment terms", sub: "Letter of credit or telegraphic transfer" },
      { value: "FOB", unit: " CTG", label: "Incoterms", sub: "Chittagong; CIF and DDP on request" },
    ],
    note: "Figures are indicative planning values and are confirmed per order in the RFQ response.",
    cta: "Start an RFQ",
  },
  faq: {
    eyebrow: "Buyer FAQ",
    title1: "Questions Buyers",
    title2: "Ask Before Ordering",
    lead: "Straight answers on sampling, minimums, compliance and how an order moves from tech pack to container.",
    items: [
      { q: "Do you manufacture from a tech pack, or can you develop one?", a: "Both. Send a tech pack, reference garment or even a mood board — our sample-development team can build the pattern, grading and spec sheet before the first proto." },
      { q: "What is the minimum order quantity?", a: "Indicatively 500 pieces per style, splittable across a size run. Colourways are usually counted as separate styles because each needs its own fabric booking. Programme buyers can negotiate lower minimums." },
      { q: "How long does sampling take and what does it cost?", a: "First protos ship within 7–10 working days of an approved spec. Sampling is quoted separately and credited against the bulk order once you proceed." },
      { q: "Which compliance frameworks do you work to?", a: "The roadmap references WRAP, amfori BSCI, ISO 9001 and OEKO-TEX. Approvals are published only once documentary confirmation is in hand — ask for the current status in your RFQ." },
      { q: "Can you handle fabric sourcing and trims?", a: "Yes — full-package production covers approved mill selection, swatch testing, trims and accessories. Buyer-nominated mills and CMT-only programmes are also supported." },
      { q: "How do you keep buyers informed during production?", a: "Milestones (fabric in-house, cutting, sewing, QC, packing, shipment) are tracked in our ERP and shared through Ezyify order management, with photo reports at each gate." },
      { q: "Can we visit the factory?", a: "Factory visits and third-party audits are welcome. Choose 'Factory Visit' in the enquiry form and we will arrange dates and the capability deck ahead of your trip." },
    ],
    cta: "Ask something else",
  },
  overview: {
    eyebrow: "Division Overview",
    title1: "Full-Package",
    title2: "Manufacturing",
    p1: "Network71's Garments & Apparel division is one of Bangladesh's emerging private-label manufacturing operations — " +
      "combining industrial-scale production capacity with the craftsmanship precision demanded by international fashion brands.",
    p2: "We serve international buyers with a full-package manufacturing model that spans design consultation, " +
      "material sourcing, cut and sew operations, quality assurance, and export logistics — all under one coordinated supply chain.",
    p3: "Our commitment to sustainable fashion is embedded in every production decision — from responsible fabric selection to worker " +
      "welfare programmes designed to support responsible apparel manufacturing in South Asia.",
    tags: ["Private Label Focus", "Sustainable Manufacturing", "Full Package Production", "Export Ready"],
    pillars: [
      { icon: "⚡", title: "Speed-to-Market", desc: "Compressed lead times with agile production scheduling and dedicated sampling teams." },
      { icon: "✓", title: "Quality Assurance", desc: "AQL-based inspection at every production stage. Zero-compromise quality control protocols." },
      { icon: "🌿", title: "Sustainable Practice", desc: "Organic and recycled fibre options, water recycling, and energy-efficient factory operations." },
      { icon: "🌐", title: "Standards Roadmap", desc: "Target frameworks include WRAP, BSCI and buyer codes of conduct; approved credentials will be published separately." },
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
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=350&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=350&fit=crop&auto=format",
    ],
    eyebrow: "Our Facilities",
    title1: "Industrial-Scale",
    title2: "Production Floors",
    lead: "Planned facility capabilities include structured production lines and dedicated quality-control zones. Verified site specifications will be published separately.",
    stats: [
      { value: "TBP", label: "Production Floor", sub: "To be published" },
      { value: "TBP", label: "Cutting Lines", sub: "To be published" },
      { value: "Multi-line", label: "Sewing floors", sub: "Trained operators" },
    ],
    note: "Detailed facility specifications to be published. Contact the division for a factory capability deck.",
    deckCta: "Request capability deck",
    alts: ["Factory production floor", "Garment production", "Textile materials"],
  },
  quality: {
    eyebrow: "Quality & Compliance",
    title: "Standards. Audits. Compliance.",
    lead: "The compliance roadmap references international buyer codes of conduct; current approvals are shown only through published credentials.",
    certifications: data.certifications,
    progressLabel: "Working towards",
    auditTitle: "Factory Audit Readiness",
    auditLead: "The audit-readiness roadmap references BSCI/amfori and WRAP codes of conduct. Current audit status requires documentary confirmation.",
    auditItems: [{ label: "AQL Inspection Standard", note: "Target inspection framework" }, { label: "Third-Party Audit", note: "Scope and availability require confirmation" }],
  },
  sustainability: {
    eyebrow: "Sustainability", title1: "Responsible Fashion", title2: "Manufacturing",
    p1: "Network71's Garments division is building a responsible apparel supply chain in Bangladesh — " +
      "embedding sustainability into sourcing decisions, production processes, and workforce development.",
    p2: "Our sustainability targets set measurable targets across material use, water management, carbon reduction, and worker welfare " +
      "— with transparent progress reporting to international buyers.",
    cta: "Sustainability Partnership Inquiry", targetLabel: "target", targets: data.sustainabilityTargets,
    note: "Progress metrics reflect divisional targets. Actual measurements to be published upon data collection completion.",
  },
  supplyChain: {
    eyebrow: "Supply Chain", title1: "Integrated Supply Chain", title2: "From Source to Buyer",
    lead: "Based in Bangladesh — the world's second-largest garment exporter — Network71 operates an integrated supply " +
      "chain connecting raw material suppliers to international buyers.",
    columns: [
      { icon: "🌾", title: "Raw Material Suppliers", items: ["Approved fabric mills", "Trim & accessory suppliers", "Sustainable fibre sources"] },
      { icon: "🏭", title: "N71 Factories", items: ["Pattern & cutting", "Sewing & assembly", "Washing & finishing"] },
      { icon: "✈️", title: "Export & Logistics", items: ["QC lab clearance", "Customs documentation", "Freight to buyer"] },
    ],
    bangladeshTitle: "Bangladesh — A Global Garment Export Hub",
    bangladeshLead: "Bangladesh is the world's second-largest apparel exporter, providing Network71 with access to one of the deepest " +
      "pools of skilled garment workers, established textile infrastructure, and competitive production economics.",
  },
  markets: {
    eyebrow: "Export Markets", title1: "Many Markets.", title2: "One Supply Chain.",
    lead: "Network71 garments are produced for buyers in major international fashion markets. Export coverage is expanding as we scale capacity and establish new buyer relationships.",
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
