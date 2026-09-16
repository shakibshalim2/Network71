import { metrics, oilProcessSteps, edibleOilProducts, fuelCapabilities, supplyChainNodes, certifications } from './en/data-a'
import { techCards, sustainabilityOils, sustainabilityEnergy, roadmapItems, marketsItems, opportunitiesItems } from './en/data-b'

const en = {
  divisionName: "Oils & Energy",
  accentClass: "text-amber-400",
  hero: {
    edibleImage: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=700&h=800&fit=crop&auto=format",
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
  oilSpecs: {
    eyebrow: "Product Specifications",
    title1: "Certificate of Analysis,",
    title2: "Before You Ask",
    lead: "Indicative refined-oil specifications per variety against the parameters buyers test on the CoA. Final values are certified per batch by the QC lab.",
    labels: { ffa: "FFA (as oleic)", pv: "Peroxide value", moisture: "Moisture & volatiles", iv: "Iodine value", colour: "Colour (Lovibond 5¼\")", shelf: "Shelf life", hs: "HS code" },
    items: [
      { name: "Soybean Oil", grade: "Refined / Double refined", ffa: "≤ 0.10 %", pv: "≤ 2.0 meq/kg", moisture: "≤ 0.10 %", iv: "120 – 143", colour: "≤ 1.5 R / 15 Y", shelf: "12 months", hs: "1507.90" },
      { name: "RBD Palm Olein", grade: "CP8 super olein / CP10", ffa: "≤ 0.10 %", pv: "≤ 2.0 meq/kg", moisture: "≤ 0.10 %", iv: "56 – 62", colour: "≤ 3.0 R / 30 Y", shelf: "12 months", hs: "1511.90" },
      { name: "Sunflower Oil", grade: "Refined / High-oleic", ffa: "≤ 0.10 %", pv: "≤ 2.0 meq/kg", moisture: "≤ 0.10 %", iv: "118 – 141", colour: "≤ 1.5 R / 15 Y", shelf: "12 months", hs: "1512.19" },
      { name: "Mustard Oil", grade: "Kachi Ghani / Refined", ffa: "≤ 1.0 % (KG) · ≤ 0.25 % (ref.)", pv: "≤ 5.0 meq/kg", moisture: "≤ 0.25 %", iv: "96 – 112", colour: "Natural amber", shelf: "9 months", hs: "1514.19" },
      { name: "Blended Vegetable Oil", grade: "Standard / Fortified (Vit. A & D)", ffa: "≤ 0.15 %", pv: "≤ 2.0 meq/kg", moisture: "≤ 0.10 %", iv: "Per blend", colour: "≤ 2.0 R / 20 Y", shelf: "12 months", hs: "1517.90" },
    ],
    footnote: "Planning references aligned to BSTI / Codex Alimentarius ranges; a batch CoA (FFA, PV, moisture, IV, colour, vitamin A where fortified) is issued with every dispatch.",
  },
  oilTerms: {
    eyebrow: "Trade Terms",
    title1: "Bulk, Drum or Retail —",
    title2: "How We Ship Oil",
    lead: "The commercial frame for edible-oil buyers, from tanker parcels to private-label PET.",
    facts: [
      { value: "20", unit: " MT", label: "Bulk minimum", sub: "One flexitank / road tanker; ISO tank and parcel tanker on request" },
      { value: "1", unit: " FCL", label: "Drum & retail minimum", sub: "≈ 80 × 200 L drums or ≈ 12,000 L in PET / HDPE per 20ft" },
      { value: "500", unit: " ml", label: "Samples", sub: "Sealed sample with provisional CoA before booking" },
      { value: "7–14", unit: " days", label: "Lead time", sub: "Ex-refinery for standard grades; fortified and private-label 3–4 weeks" },
      { value: "FOB", unit: " CTG", label: "Incoterms", sub: "Chattogram; CIF / CFR to destination; ex-works and DAP domestic" },
      { value: "LC", unit: " / TT", label: "Payment", sub: "Sight LC for export; domestic distributors on approved credit terms" },
    ],
    note: "Indicative; confirmed in the pro-forma for each parcel. Private-label bottling quoted per SKU.",
    cta: "Request an oil quotation",
  },
  fuelModels: {
    eyebrow: "Fuel Supply Models",
    title1: "Three Ways",
    title2: "to Contract Fuel",
    lead: "Industrial and institutional buyers choose the model that matches their consumption pattern — every one comes with metered delivery and a calibration certificate.",
    items: [
      { code: "SPOT", title: "Spot Delivery", who: "Construction sites, generators, one-off demand", points: ["Order-to-delivery within 24–48 h in served districts", "Minimum 3,000 L per drop; bowser 5,000–20,000 L", "Metered discharge with sealed calibration certificate", "Pay on delivery or 7-day terms"], sla: "24–48 h" },
      { code: "TERM", title: "Term Contract", who: "Factories, fleets, cold storage, telecom towers", points: ["Monthly volume commitment with scheduled drops", "Price formula indexed to BPC posted price", "Dedicated account manager and consumption reporting", "30-day credit on approved accounts"], sla: "Scheduled", featured: true },
      { code: "SITE", title: "On-Site Storage & Refuel", who: "Large plants, ports, mining and infrastructure projects", points: ["Above-ground tanks 5–50 kL with secondary containment", "Telemetry-based auto-replenishment", "Fleet refuelling with card or tag authorisation", "Spill-response kit and HSE induction included"], sla: "Auto-replenish" },
    ],
    footnote: "Fuel storage, fire safety and licensing requirements are confirmed per site before the first delivery.",
    cta: "Request a fuel supply proposal",
  },
  faq: {
    eyebrow: "Buyer FAQ",
    title1: "Before You Book",
    title2: "a Tanker",
    lead: "Straight answers on specifications, samples, packaging, fuel contracts and documentation.",
    items: [
      { q: "What comes with an edible-oil shipment?", a: "Certificate of analysis for the batch (FFA, peroxide value, moisture, iodine value, colour, vitamin A where fortified), packing list, commercial invoice, bill of lading and certificate of origin. Halal and BSTI documentation is supplied per product where the registration is held." },
      { q: "Can we get a sample and CoA before ordering?", a: "Yes — a sealed 500 ml sample from the offered batch ships by courier with its provisional CoA, so your lab can verify FFA, PV and colour before the parcel is booked." },
      { q: "Do you bottle under our brand?", a: "Yes. Private-label PET / HDPE from 1 L to 5 L with your artwork; we handle label compliance (BSTI mark, nutrition, fortification statement) and shrink-wrapped cartons. Quoted per SKU with a one-FCL minimum." },
      { q: "How is bulk oil shipped and stored?", a: "Flexitank in a 20ft container (≈ 20 MT), ISO tank, or road tanker for domestic delivery. Tanks are food-grade, nitrogen-blanketed where required, and temperature-logged for palm olein to stay above cloud point." },
      { q: "Which fuel products and grades do you supply?", a: "Diesel (HSD), furnace oil, kerosene and lubricants for industrial and fleet use, at BPC-specified grades. Every delivery is metered with a calibration certificate; density and flash point are recorded on the delivery note." },
      { q: "How is fuel priced under a term contract?", a: "A formula indexed to the Bangladesh Petroleum Corporation posted price plus an agreed logistics margin, reviewed monthly. Volume commitments earn tiered discounts; consumption reports are shared each month." },
      { q: "What safety standards apply to on-site fuel storage?", a: "Above-ground tanks with secondary containment, fire-safety clearance from the relevant authority, explosives-licence compliance where applicable, spill kits and an HSE induction for site staff. We survey the site before installation." },
    ],
    cta: "Ask something else",
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
