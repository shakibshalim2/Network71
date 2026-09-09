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
    energyTags: ["8 Distribution Centers", "Bulk Contract Supply", "Industrial-Grade", "Regulatory Compliant"],
    eyebrow: "Two Divisions. One Standard.",
    title: "Essential Products. Essential Infrastructure.",
    lead: "From the cooking oil on family tables to the fuel powering factories, Network71 Oils & Energy " +
      "operates across two essential sectors with a shared commitment to quality, reliability, and responsible growth.",
    oilsTitle: "Edible Oils",
    oilsText:
      "We refine and distribute a range of vegetable oils for consumer, food-service, and industrial " +
        "markets. Our HACCP-certified facilities combine rigorous quality control with efficient, scalable production.",
    energyTitle: "Energy & Fuel",
    energyText:
      "Our energy division supplies petroleum products and commercial fuel solutions to industrial, " +
        "transport, construction, and institutional clients through a growing nationwide distribution network.",
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
    title: "Standards You Can Trust",
    lead: "Food safety and product integrity are built into every stage of our operations. Our quality " +
      "systems are designed to meet and exceed the standards expected by regulators, partners, and consumers.",
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
      "We publish annual sustainability progress updates as our programmes mature. Targets reflect current operational baselines and are reviewed annually.",
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
    oilsBody:
      "From crude sourcing to consumer-ready packaging, our edible oil operations cover soybean, palm, sunflower, olive, and " +
        "blended vegetable oils. HACCP-certified facilities serve both consumer retail and industrial food manufacturing segments.",
    fuelBody:
      "Petroleum distribution, industrial fuel supply, and commercial energy logistics spanning 8 strategically located " +
        "distribution centres. We serve transport, manufacturing, construction, and institutional clients with compliant, reliable fuel programmes.",
    edibleBody:
      "Every oil variant is refined, tested, and packaged in our HACCP-certified facility. We supply in bulk " +
        "tanker, industrial drum, and retail bottle formats — meeting the needs of food manufacturers and end consumers alike.",
    fuelLead:
      "Our fuel distribution infrastructure is built for industrial-scale reliability. Petroleum products, industrial " +
        "fuel contracts, and commercial energy solutions — all managed through a digitally connected distribution network.",
    supplyEyebrow: "Supply Chain",
    supplyLead:
      "An integrated, traceable supply chain from raw material procurement through to retail and " +
        "industrial delivery — combining imported and locally sourced inputs with domestic processing excellence.",
    complianceEyebrow: "Quality & Compliance",
    complianceLead:
      "All edible oil products meet international food safety standards. Our quality system is built on HACCP principles and " +
        "reinforced by BSTI and Halal certification — giving buyers full confidence in product integrity from plant to delivery.",
    haccpDescription:
      "Hazard Analysis and Critical Control Points certification — the cornerstone of our edible oil food safety management system.",
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
    oilCertification: "All products HACCP & BSTI certified",
    grades: "Grades",
    uses: "Common Uses",
    packaging: "Packaging",
    fuelTagline: "Nationwide Reach.",
    fuelSafety: "Safety-compliant storage & dispatch",
    verified: "Verified at Every Step.",
    haccpOperations: "HACCP Certified Operations",
    supplySchematic: "Distribution Centre Network — Schematic",
    plant: "PLANT",
    processingPlant: "Processing Plant",
    distributionCentres: "Distribution Centres (8)",
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
