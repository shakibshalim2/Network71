import { BLUE } from '../theme'
const metrics = [
  { value: 'Multi', label: 'Trade Lanes', desc: 'South Asia ↔ Middle East, Europe, Asia' },
  { value: 'Sea · Air · Land', label: 'Logistics', desc: 'Multi-modal freight coordination' },
  { value: 'End-to-end', label: 'Sourcing', desc: 'Supplier scouting to final delivery' },
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
    desc: 'Producers and manufacturers seeking qualified international buyers and market access across our trade corridor network.',
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
  { year: '2028', milestone: 'Scaled Trade Volume Target', detail: 'Scale trade operations across all active trade corridors; volume targets to be published once baseline reporting is established.' },
]
const tradeCategories = [
  { iconId: 'agriculture', name: 'Agricultural Commodities', volume: 'High-volume seasonal trade', lanes: 'South Asia → Middle East, Europe' },
  { iconId: 'textiles', name: 'Textiles & Garments', volume: 'Core category — multiple lanes', lanes: 'Bangladesh → Europe, Middle East, USA' },
  { iconId: 'food', name: 'Food Products & Ingredients', volume: 'Processed and raw food goods', lanes: 'South Asia ↔ Middle East, Africa' },
  { iconId: 'industrial', name: 'Industrial Materials', volume: 'B2B industrial supply chain', lanes: 'Asia ↔ Middle East, Africa' },
  { iconId: 'consumer', name: 'Consumer Goods', volume: 'FMCG and retail supply', lanes: 'Asia → Middle East, Europe' },
  { iconId: 'energy', name: 'Energy Products', volume: 'Selected energy commodities', lanes: 'Middle East → South Asia, Asia' },
]
const en = {
  divisionName: 'Global Trading & Logistics',
  copy: {
    categoriesEyebrow: 'What We Trade',
    categoriesTitle: 'Trade Categories',
    categoriesLead: 'Six core commodity and product categories across our active global trade corridors.',
    complianceEyebrow: 'Trade Compliance',
    complianceTitle: 'Full Documentation Support for Every Shipment',
    complianceLead: "International trade is built on paperwork. Network71's compliance team manages every document required to move goods legally and" +
      "smoothly across borders — from origin certificates to phytosanitary approvals and letter of credit discrepancy resolution.",
    complianceDetail: 'Our in-house trade documentation specialists ensure every shipment meets the regulatory requirements of both origin and' +
      'destination jurisdictions, reducing the risk of costly delays and compliance failures.',
    financeEyebrow: 'Trade Finance',
    financeTitle: 'Supply Chain Finance',
    financeLead: 'Structured finance solutions that reduce risk and unlock working capital for buyers and sellers across every trade corridor.',
    heroEyebrow: 'Network71 — Global Trading & Logistics',
    heroTitle1: 'Global',
    heroTitle2: 'Trading & Logistics',
    heroLead: 'Connecting producers and markets across South Asia, the Middle East, Europe, Southeast Asia and Africa — with speed, compliance, and scale. Network71 is your end-to-end trade partner from source to shelf.',
    heroPrimaryCta: 'Trade Inquiry',
    heroSecondaryCta: 'Explore Categories',
    heroImageAlt: 'Shipping and logistics — global cargo',
    infrastructureEyebrow: 'Logistics',
    infrastructureTitle: 'Logistics Infrastructure',
    infrastructureLead: 'Multi-modal freight capability with vetted partner networks across all major trade corridors.',
    infrastructureCorridors: 'Active Corridors',
    lanesTitle: 'Key Trade Lanes',
    networkReach: 'Global Reach',
    networkEyebrow: 'Our Trade Network',
    networkLead: 'Five regional trading hubs connected by active corridors across three continents.',
    networkSouthAsia: 'South Asia Hub',
    networkHeadquarters: 'HQ · Origin',
    networkMiddleEast: 'Middle East',
    networkGccHub: 'GCC Trading Hub',
    networkEurope: 'European Markets',
    networkPremium: 'Import / Premium',
    networkSoutheastAsia: 'Southeast Asia',
    networkDistribution: 'Sourcing + Distribution',
    networkAfrica: 'Africa',
    networkEmerging: 'Emerging Markets',
    networkCount: '5',
    networkCountries: 'Regional Hubs',
    networkRoute: 'Trade Route',
    networkHub: 'Regional Hub',
    opportunitiesEyebrow: 'Opportunities',
    opportunitiesTitle: 'Work With Our Trading Division',
    opportunitiesLead: 'Whether you are a producer, buyer, logistics operator, or finance institution — there is a partnership model for you.',
    overviewEyebrow: 'Division Overview',
    overviewTitle: 'Bridging Producing Nations and Consuming Markets',
    overviewLead1: "Network71's Global Trading & Logistics division operates as a strategic bridge between the " +
      "world's producing economies and its consuming markets. We combine deep trade compliance expertise with logistics excellence to move goods across borders efficiently and reliably.",
    overviewLead2: 'From agricultural commodities to finished textiles, our team navigates the full complexity of international trade — regulatory' +
      'compliance, documentation, freight management, and trade finance — so our partners can focus on growth.',
    overviewLead3: 'With active trade corridors across South Asia, the Middle East, Europe, Southeast Asia and Africa, we offer producers and buyers alike a committed partner with ' +
      'established networks, in-market relationships, and the operational infrastructure to execute at scale.',
    riskEyebrow: 'Quality & Risk',
    riskTitle: 'Due Diligence and Trade Risk Management',
    riskLead1: 'Every trade transaction begins with rigorous due diligence on counterparties. We verify supplier credentials, factory conditions,' +
      'product quality, and financial standing before any commercial engagement.',
    riskLead2: 'Risk management is embedded throughout the trade cycle — from cargo insurance and pre-shipment inspection to credit risk assessment and trade dispute resolution support.',
    roadmapEyebrow: 'Strategic Vision',
    roadmapTitle: 'Growth Roadmap',
    roadmapLead: 'A four-year trajectory towards scaled trade volume and deeper global market penetration.',
    servicesEyebrow: 'What We Do',
    servicesTitle: 'Trade Services',
    servicesLead: 'Four integrated service pillars that cover every dimension of international trade.',
    sustainabilityEyebrow: 'Responsible Trade',
    sustainabilityTitle: 'Sustainability in Trade',
    sustainabilityLead: 'Trade that is good for business must also be good for people and the planet. Network71 embeds sustainability considerations throughout our trading operations.',
    technologyEyebrow: 'Technology',
    technologyTitle: 'Powered by Ezyify',
    technologyLead1: "Our trade operations are integrated with Ezyify — Network71's proprietary trade management platform — giving buyers, sellers," +
      "and logistics partners real-time visibility into every transaction and shipment.",
    technologyLead2: 'From digital document management to supplier portals and trade analytics, Ezyify transforms the traditionally fragmented trade process into a connected, data-driven operation.',
  },
  metrics,
  process: processSteps,
  processLabel: 'Full Trade Cycle',
  tradeCategories,
  tradeServices,
  complianceDocs,
  tradeLanes,
  techCapabilities,
  opportunityCards,
  roadmap,
  riskItems: [
    { title: 'Supplier Due Diligence', desc: 'Factory audits, credential verification, and trade reference checks.' },
    { title: 'Buyer Qualification', desc: 'Creditworthiness review, reference checks, and trade history assessment.' },
    { title: 'Cargo Insurance', desc: 'Marine and air cargo insurance arranged for shipments as required.' },
    { title: 'Quality Inspection', desc: 'Third-party pre-shipment inspection at origin before goods are loaded.' },
  ],
  overviewPillars: [
    { title: 'Market Access', desc: 'Opening doors to markets across five regions with established buyer and distributor relationships.' },
    { title: 'Compliance Expertise', desc: 'Deep regulatory knowledge across trade corridors — HS codes, tariffs, certificates, and documentation.' },
    { title: 'Logistics Network', desc: 'Multi-modal freight capability across sea, air, and land with vetted global forwarder partners.' },
    { title: 'Relationship Capital', desc: 'Working relationships with producers, buyers, agents, and authorities across every trade corridor.' },
  ],
  heroBadges: [
    { val: 'Sourcing', lab: 'Supplier & buyer matching' },
    { val: 'Trade', lab: 'Import / export management' },
    { val: 'Logistics', lab: 'Sea, air & land freight' },
  ],
  freightModes: [
    {
      mode: 'Sea Freight',
      tag: 'Primary Mode',
      specs: ['FCL — Full Container Load', 'LCL — Less than Container Load', 'Reefer containers available', 'Major global shipping lines'],
      note: 'Cost-effective primary mode for high-volume trade.',
    },
    {
      mode: 'Air Freight',
      tag: 'Express / High-Value',
      specs: ['Express and standard air cargo', 'Perishables and fresh goods', 'High-value and time-sensitive', 'Global airport network'],
      note: 'Speed-critical shipments and perishable goods.',
    },
    {
      mode: 'Land Transport',
      tag: 'Regional / Last Mile',
      specs: ['Cross-border truck transport', 'In-country distribution', 'Bonded transport', 'Regional last-mile delivery'],
      note: 'Regional corridors and final distribution legs.',
    },
  ],
  financeItems: [
    { title: 'LC Negotiation', desc: 'Structuring and negotiating Letters of Credit with issuing and advising banks for compliant, timely payment.' },
    { title: 'Documentary Collection', desc: 'D/P and D/A collection arrangements providing payment security for exporters on established trade lanes.' },
    { title: 'Invoice Financing', desc: 'Early payment solutions against confirmed export invoices, improving cash flow for suppliers and producers.' },
    { title: 'Forex Hedging', desc: 'Currency risk management strategies to protect trade transaction margins from adverse foreign exchange movements.' },
  ],
  sustainabilityItems: [
    { title: 'Sustainable Sourcing', desc: 'Preference for suppliers with verifiable ethical sourcing, fair labour practices, and responsible environmental management.' },
    { title: 'Carbon-Conscious Freight', desc: 'Optimising freight mode selection to reduce carbon intensity — consolidating shipments and prioritising sea over air where timeline permits.' },
    { title: 'Fair Trade Support', desc: 'Supporting fair trade principles for agricultural commodities, ensuring producer communities receive equitable value for their goods.' },
    { title: 'Supplier ESG Screening', desc: 'Environmental, Social, and Governance screening integrated into supplier qualification and onboarding processes.' },
  ],
  inquiryTypes: ['Export Inquiry', 'Import Sourcing', 'Logistics Partnership', 'Trade Finance', 'Market Entry'],
}
export type TradingContent = typeof en
export default en
