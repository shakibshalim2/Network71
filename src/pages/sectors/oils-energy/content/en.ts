import { metrics, oilProcessSteps, edibleOilProducts, fuelCapabilities, supplyChainNodes, certifications } from './en/data-a'
import { techCards, sustainabilityOils, sustainabilityEnergy, roadmapItems, marketsItems, opportunitiesItems } from './en/data-b'

const en = {
  divisionName: "Oils & Energy",
  accentClass: "text-amber-400",
  hero: {
    edibleTitle: "Edible\nOils",
    edibleLead: "Edible oil sourcing, refining & distribution enquiries",
    energyTitle: "Energy",
    fuelTitle: "& Fuel",
    energyLead: "Petroleum distribution & commercial energy supply",
    brand: "N71",
    division: "Network71 Division",
    title: "Oils & Energy",
    edibleBadge: "Edible Oils",
    fuelBadge: "Energy & Fuel",
    cta: "Partner Inquiry",
    scroll: "Scroll",
    edibleImageAlt: "Edible oils — golden olive oil pouring",
  },
  overview: {
    energyTags: ["Regional Distribution", "Bulk Contract Supply", "Industrial-Grade", "Regulatory Compliant"],
    eyebrow: "Two Divisions. One Standard.",
    title: "Essential Products. Essential Infrastructure.",
    lead: "From the cooking oil on family tables to the fuel powering factories, Network71 Oils & Energy " +
      "operates across two essential sectors with a shared commitment to quality, reliability, and responsible growth.",
    oilsTitle: "Edible Oils",
    oilsText:
      "We refine and distribute a range of vegetable oils for consumer, food-service, and industrial " +
        "markets. Food-safety controls and facility details will be published after owner verification.",
    energyTitle: "Energy & Fuel",
    energyText:
      "Our energy division supplies petroleum products and commercial fuel solutions to industrial, " +
        "transport, construction, and institutional clients through a growing regional distribution network.",
  },
  edible: {
    heading: "Five Oil Varieties.",
    eyebrow: "Edible Oils",
    title: "Refined for Every Table",
    lead: "Our edible oil portfolio is formulated for the demands of homes, food manufacturers, and commercial kitchens — with traceable sourcing and consistent quality from refinery to shelf.",
    headers: [
      "Product",
      "Grades / Variants",
      "Primary Uses",
      "Packaging Options",
    ],
    footnote:
      "* Product specifications, minimum order quantities, and private-label options are available on request.",
  },
  fuel: {
    eyebrow: "Energy & Fuel",
    title: "Powering Progress",
    lead: "Reliable fuel supply is the backbone of industry, logistics, and infrastructure. Network71 provides " +
      "coordinated petroleum distribution and commercial energy solutions built around your operational schedule.",
    cta: "Request Fuel Supply Proposal",
  },
  supply: {
    eyebrow: "Supply Chain",
    title: "From Source to Shelf",
    lead: "An integrated supply chain gives us control over quality, availability, and delivery — from international commodity markets to the customers who rely on us every day.",
    endToEnd: "End-to-end traceability",
    imageAlt: "Oil processing facility",
  },
  compliance: {
    eyebrow: "Quality & Compliance",
    title: "Standards Built Into Every Batch",
    lead: "Food safety and product integrity are built into every stage of our operations. Our quality " +
      "systems are designed to meet the standards expected by regulators, partners, and consumers.",
    badge: "Quality Commitment",
    badgeText:
      "Every batch is tested before release. Our quality assurance team monitors critical parameters from raw material intake through to final dispatch.",
  },
  technology: {
    eyebrow: "Technology & Operations",
    title: "Built for Consistency",
    lead: "Investment in modern production and logistics technology helps us deliver the same standard of quality, every time — at the scale our customers require.",
  },
  sustainability: {
    eyebrow: "Sustainability",
    title: "Responsible by Design",
    lead: "We believe essential products should not come at the cost of the environment. Our sustainability " +
      "programme focuses on practical, measurable improvements across sourcing, operations, and distribution.",
    oilsTitle: "Edible Oils",
    energyTitle: "Energy & Fuel",
    progress: "Progress",
    commitment: "Our Commitment",
    commitmentText:
      "We will publish sustainability progress updates as our programmes mature. Bars show programme targets, reviewed annually against operational baselines.",
    imageAlt: "Sustainable farming",
  },
  markets: {
    eyebrow: "Markets & Distribution",
    title: "Serving Every Segment",
    lead: "Our products reach customers across consumer retail, food service, industry, and institutional sectors — supported by a distribution network designed for reliability.",
  },
  opportunities: {
    eyebrow: "Business Opportunities",
    title: "Grow With Us",
    lead: "Network71 Oils & Energy is actively building partnerships across the value chain. Whether you " +
      "distribute, buy in bulk, or invest in essential infrastructure, there is a place to grow together.",
  },
  roadmap: {
    eyebrow: "Growth Roadmap",
    title: "Where We Are Headed",
    lead: "A four-year strategic expansion across processing capacity, product diversification, and geographic reach — anchored in operational discipline and market demand.",
  },
  metrics,
  oilProcessSteps,
  edibleOilProducts,
  fuelCapabilities,
  supplyChainNodes,
  certifications,
  techCards,
  sustainabilityOils,
  sustainabilityEnergy,
  roadmapItems,
  marketsItems,
  opportunitiesItems,

  sectionCopy: {
    overviewEyebrow: "Two Core Divisions",
    overviewLead:
      "Network71's Oils & Energy division bridges two essential commodity sectors — premium food-grade oils and reliable fuel supply — under a single, integrated operational infrastructure.",
    oilsTags: ['Food-safety systems', 'Consumer + Industrial', 'Bulk & retail packs', 'Five oil varieties'],
    oilsBody:
      "From crude sourcing to consumer-ready packaging, our edible oil operations cover soybean, palm, sunflower, olive, and " +
        "blended vegetable oils. Current facility and production status is available from the division on request.",
    fuelBody:
      "Petroleum distribution, industrial fuel supply, and commercial energy logistics through a regional network of " +
        "distribution centres. We serve transport, manufacturing, construction, and institutional clients with compliant, reliable fuel programmes.",
    edibleBody:
      "Planned supply formats include bulk tanker, industrial drum, and retail bottle options. Product, testing and facility details require confirmation for each enquiry.",
    fuelLead:
      "Our fuel distribution infrastructure is built for industrial-scale reliability. Petroleum products, industrial " +
        "fuel contracts, and commercial energy solutions — all managed through a digitally connected distribution network.",
    supplyEyebrow: "Supply Chain",
    supplyLead:
      "An integrated, traceable supply chain from raw material procurement through to retail and " +
        "industrial delivery — combining imported and locally sourced inputs with domestic processing.",
    complianceEyebrow: "Quality & Compliance",
    complianceLead:
      "The division's quality roadmap references HACCP principles and applicable BSTI or product-level requirements. Current approvals are published only through verified credentials.",
    haccpDescription:
      "Hazard Analysis and Critical Control Points is a target framework; verified implementation details have not yet been published.",
    technologyEyebrow: "Technology & Operations",
    technologyLead:
      "Operational technology across both divisions is designed to reduce variability, increase traceability, and ensure on-time delivery at volume.",
    sustainabilityEyebrow: "Sustainability",
    sustainabilityLead:
      "Across both divisions, we are building measurable sustainability commitments into operations — from palm sourcing to fuel storage protocols.",
    marketsEyebrow: "Markets & Distribution",
    marketsLead:
      "Our two divisions address distinct but complementary market segments — from supermarket shelves to industrial plant rooms.",
    opportunitiesEyebrow: "Business Opportunities",
    opportunitiesLead:
      "Three entry points — whether you are a distributor, bulk buyer, or institutional investor looking to participate in Bangladesh&apos;s growing oils and energy sector.",
    roadmapEyebrow: "Growth Roadmap",
    roadmapLead:
      "A four-year strategic expansion across processing capacity, product diversification, and geographic reach — anchored in operational discipline and market demand.",
  },
  copy: {
    oilProcessLabel: "Oil Refining Process",
    overviewTitle: "Our Business at a Glance",
    divisionA: "Division A",
    divisionB: "Division B",
    valueChain: "Value Chain",
    oilsTagline: "One Quality Standard.",
    oilCertification: "Target frameworks · verification pending",
    grades: "Grades",
    uses: "Common Uses",
    packaging: "Packaging",
    fuelTagline: "Regional Reach.",
    fuelSafety: "Safety-compliant storage & dispatch",
    verified: "Verified at Every Step.",
    haccpOperations: "HACCP Readiness Target",
    supplySchematic: "Distribution Centre Network — Schematic",
    plant: "PLANT",
    processingPlant: "Processing Plant",
    distributionCentres: "Distribution Centres",
    technologyTitle: "Built for Precision & Scale",
    marketsTitle: "Who We Serve",
    opportunitiesTitle: "Partner With Us",
    oilsSustainability: "Edible Oils — Sustainability",
    fuelSustainability: "Energy & Fuel — Sustainability",
  },
  inquiryTypes: [
    "Edible Oil Buyer",
    "Fuel Supply Inquiry",
    "Distribution Partnership",
    "Investment Inquiry",
    "Bulk Order",
  ],
}
export type OilsEnergyContent = typeof en
export default en
