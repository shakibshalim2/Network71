import type { OilsEnergyContent } from "./en"

const metrics = [
  { value: "1M+", label: "Liters / Month", desc: "Monthly production volume" },
  {
    value: "8",
    label: "Distribution Centers",
    desc: "Nationwide logistics network",
  },
  {
    value: "HACCP",
    label: "Certified",
    desc: "International food safety standard",
  },
  { value: "—", label: "Export Reach", desc: "Data to be published" },
]

const oilProcessSteps = [
  {
    title: "Raw Material Procurement",
    desc: "Sourcing crude vegetable oils and oilseeds from vetted domestic and international suppliers meeting quality specifications.",
  },
  {
    title: "Refining & Bleaching",
    desc: "Removal of free fatty acids, phosphatides, and colour pigments using food-grade chemical and physical refining processes.",
  },
  {
    title: "Deodorizing",
    desc: "High-temperature steam stripping eliminates volatile odour compounds to produce neutral, shelf-stable oil.",
  },
  {
    title: "Quality Testing",
    desc: "In-house laboratory tests for FFA, peroxide value, moisture content, and microbial count at every production stage.",
  },
  {
    title: "Filling & Packaging",
    desc: "Automated filling lines for bulk tankers, industrial drums, and retail PET / HDPE bottles under hygienic conditions.",
  },
  {
    title: "Distribution",
    desc: "Temperature-monitored dispatch to retail chains, food manufacturers, and export consolidators via our 8-centre network.",
  },
]

const edibleOilProducts = [
  {
    name: "Soybean Oil",
    grades: "Refined, Double Refined",
    uses: "Frying, cooking, food manufacturing",
    packaging: "Bulk tanker · 200L drum · 5L / 1L retail",
  },
  {
    name: "Palm Oil",
    grades: "RBD Palm Olein, Super Olein",
    uses: "Commercial frying, margarine, bakery",
    packaging: "Bulk tanker · 200L drum · 5L retail",
  },
  {
    name: "Sunflower Oil",
    grades: "High-oleic, Standard refined",
    uses: "Salad dressing, light frying, baking",
    packaging: "200L drum · 5L / 2L / 1L retail",
  },
  {
    name: "Mustard Oil",
    grades: "Kachi Ghani, Refined",
    uses: "Traditional cooking, pickling, marinades",
    packaging: "200L drum · 5L / 1L retail",
  },
  {
    name: "Blended Vegetable Oil",
    grades: "Standard, Fortified (Vitamin A & D)",
    uses: "Mass-market cooking, food service",
    packaging: "Bulk · 200L drum · 5L / 2L / 1L retail",
  },
]

const fuelCapabilities = [
  {
    title: "Petroleum Products",
    iconId: "petroleum",
    items: [
      "High-speed diesel (HSD)",
      "Motor spirit (petrol)",
      "Furnace oil",
      "Jet fuel coordination",
    ],
    stat: "8 centres",
    statLabel: "distribution coverage",
  },
  {
    title: "Industrial Fuel Supply",
    iconId: "industrialFuel",
    items: [
      "Factory & plant fuel programmes",
      "Standby generator fuel contracts",
      "Bulk storage management",
      "Scheduled delivery scheduling",
    ],
    stat: "Bulk",
    statLabel: "contract supply available",
  },
  {
    title: "Commercial Energy Solutions",
    iconId: "commercialEnergy",
    items: [
      "Transport fleet fuel supply",
      "Construction site energy",
      "Hotel & hospitality sector",
      "Government & institutional supply",
    ],
    stat: "TBP",
    statLabel: "contract volume data",
  },
]

const supplyChainNodes = [
  {
    label: "Raw Material Sourcing",
    sub: "Imported + Local",
    color: "var(--accent-amber)",
  },
  {
    label: "Processing Facility",
    sub: "HACCP-certified plant",
    color: "var(--accent-amber)",
  },
  {
    label: "Quality Lab",
    sub: "In-house testing",
    color: "var(--accent-emerald)",
  },
  {
    label: "8 Distribution Centers",
    sub: "Nationwide network",
    color: "var(--accent-sky)",
  },
  {
    label: "Retail / Industrial",
    sub: "End buyers",
    color: "var(--accent-sky)",
  },
]

const certifications = [
  {
    name: "HACCP",
    desc: "Hazard Analysis and Critical Control Points — the cornerstone of our food safety management system across all edible oil operations.",
    prominent: true,
  },
  {
    name: "ISO 22000",
    desc: "Food Safety Management System standard applied at processing and packaging stages.",
  },
  {
    name: "BSTI Approved",
    desc: "Bangladesh Standards and Testing Institution compliance for all products sold domestically.",
  },
  {
    name: "Halal Certified",
    desc: "All edible oils produced and packaged under Halal-compliant conditions.",
  },
  {
    name: "Lab Accreditation",
    desc: "In-house quality laboratory capable of FFA, peroxide value, moisture, and microbiological testing.",
  },
  {
    name: "Fuel Safety Compliance",
    desc: "Petroleum storage and distribution in line with applicable fire and safety regulations.",
  },
]

const techCards = [
  {
    title: "Automated Refining Lines",
    desc: "Continuous refining and bleaching systems with programmable logic controllers reduce batch variability and ensure consistent output quality across production runs.",
    accent: "var(--accent-amber)",
    iconId: "refining",
  },
  {
    title: "Real-Time Quality Monitoring",
    desc: "Inline sensors and automated sampling stations track key quality parameters continuously during production, triggering alerts before a batch can drift out of specification.",
    accent: "var(--accent-emerald)",
    iconId: "monitoring",
  },
  {
    title: "Digital Distribution Management",
    desc: "Ezyify-integrated logistics platform provides real-time dispatch tracking, route optimisation, " +
      "and delivery confirmation across all 8 distribution centres, serving both oil and fuel operations.",
    accent: "var(--accent-sky)",
    iconId: "distribution",
  },
]

const sustainabilityOils = [
  {
    label: "RSPO-Aligned Palm Sourcing",
    target: "Target: 100% certified supply by 2027",
    pct: 40,
  },
  {
    label: "Reduced Plastic Packaging",
    target: "Target: 30% recycled content in retail bottles",
    pct: 20,
  },
  {
    label: "Waste Oil Recycling",
    target: "Target: Zero process waste to landfill",
    pct: 55,
  },
]

const sustainabilityEnergy = [
  {
    label: "Responsible Fuel Storage",
    target: "Secondary containment at all 8 centres",
    pct: 100,
  },
  {
    label: "Spill Prevention Programme",
    target: "Target: Zero reportable spill incidents",
    pct: 80,
  },
  {
    label: "Environmental Compliance Audits",
    target: "Annual third-party environmental audit",
    pct: 100,
  },
]

const roadmapItems = [
  {
    year: "2025",
    title: "Processing Capacity Expansion",
    desc: "Increase monthly refining throughput by adding a second production line at the primary facility.",
  },
  {
    year: "2026",
    title: "Premium Organic Oil Line",
    desc: "Launch certified organic and cold-pressed premium oil SKUs for health-conscious and export markets.",
  },
  {
    year: "2027",
    title: "Renewable Energy Exploration",
    desc: "Feasibility study and pilot programme for solar-powered processing operations and EV distribution fleet.",
  },
  {
    year: "2028",
    title: "Cross-Border Fuel Distribution",
    desc: "Expand fuel distribution capabilities to serve regional markets pending regulatory approvals and infrastructure build-out.",
  },
]

const marketsItems = [
  {
    division: "Edible Oils",
    accent: "var(--accent-amber)",
    segments: [
      {
        name: "Consumer Retail",
        desc: "Supermarkets, grocery chains, and neighbourhood retailers across Bangladesh.",
      },
      {
        name: "Food Service",
        desc: "Restaurants, caterers, fast-food chains requiring bulk and semi-bulk supply.",
      },
      {
        name: "Industrial Food Manufacturers",
        desc: "Bakeries, confectionery, snack producers, and food processing factories.",
      },
      {
        name: "Export Markets",
        desc: "Selective export to regional markets — data to be published as programmes formalise.",
      },
    ],
  },
  {
    division: "Fuel & Energy",
    accent: "var(--accent-sky)",
    segments: [
      {
        name: "Commercial Transport",
        desc: "Freight operators, logistics companies, and transport fleet operators.",
      },
      {
        name: "Industrial Facilities",
        desc: "Factories, power plants, and manufacturing units requiring continuous fuel supply.",
      },
      {
        name: "Construction Sector",
        desc: "Heavy equipment, generators, and site operations for infrastructure projects.",
      },
      {
        name: "Institutional & Government",
        desc: "Public sector organisations requiring compliant, documented fuel supply contracts.",
      },
    ],
  },
]

const opportunitiesItems = [
  {
    title: "Edible Oil Distributors",
    desc: "We are expanding our regional distribution partner network for edible oils across all divisions. Partners gain exclusive territory rights, competitive margins, and full marketing support.",
    cta: "Become a Distributor",
    accent: "var(--accent-amber)",
    iconId: "distributor",
  },
  {
    title: "Industrial Fuel Buyers",
    desc: "Bulk fuel supply contracts for manufacturing facilities, logistics fleets, and construction operations. Scheduled delivery, volume pricing, and dedicated account management.",
    cta: "Discuss Bulk Supply",
    accent: "var(--accent-sky)",
    iconId: "buyer",
  },
  {
    title: "Investment Partners",
    desc: "Capacity expansion across both edible oil processing and fuel distribution infrastructure presents structured investment opportunities for institutional and strategic partners.",
    cta: "Investment Inquiry",
    accent: "var(--accent-emerald)",
    iconId: "investor",
  },
]

const bn: OilsEnergyContent = {
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
export default bn
