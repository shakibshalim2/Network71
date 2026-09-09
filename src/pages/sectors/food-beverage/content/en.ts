const en = {
  divisionName: 'Food & Beverage Manufacturing',
  processLabel: 'From Concept to Consumer',
  inquiryTypes: ['Retail Distribution', 'Export Buyer', 'Co-Manufacturing', 'Private Label', 'B2B Supply'],
  metrics: [
  { value: '3', label: 'Processing Units', desc: 'Active production facilities' },
  { value: 'ISO', label: 'Certified', desc: 'International quality standard' },
  { value: '50+', label: 'Products', desc: 'SKUs across all categories' },
  { value: '—', label: 'Annual Output', desc: 'Data to be published' },
],

  pillars: [
  {
    iconId: 'icon1',
    title: 'Quality & Safety',
    desc: 'Every product leaves our facilities verified against strict food safety benchmarks and quality control checkpoints.',
  },
  {
    iconId: 'icon2',
    title: 'Innovation',
    desc: 'In-house R&D continuously develops new product lines, flavour profiles, and formulations ahead of consumer trends.',
  },
  {
    iconId: 'icon3',
    title: 'Halal Compliance',
    desc: 'Full halal certification across eligible product lines — unlocking Middle East, South Asia, and Muslim-majority export markets.',
  },
  {
    iconId: 'icon4',
    title: 'Global Standards',
    desc: 'Manufacturing processes aligned with international food industry standards — enabling retail-ready products for global shelves.',
  },
],

  productCategories: [
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
],

  brandModels: [
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
],

  standards: [
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
],

  processSteps: [
  { title: 'R&D & Recipe Development', desc: 'In-house food technologists develop and validate formulations against consumer and market requirements.' },
  { title: 'Raw Material Sourcing', desc: 'Verified ingredient procurement from approved local and international supplier networks.' },
  { title: 'Food Safety Testing', desc: 'Incoming material testing — microbiological, chemical, and sensory — before production approval.' },
  { title: 'Production', desc: 'Controlled manufacturing in certified processing units following SOPs and batch records.' },
  { title: 'In-Line QC', desc: 'Real-time quality checks at critical control points throughout the production run.' },
  { title: 'Packaging & Labelling', desc: 'Automated packaging with regulatory-compliant labelling for retail and export markets.' },
  { title: 'Cold / Ambient Storage', desc: 'Product-appropriate storage in temperature-controlled or ambient warehousing.' },
  { title: 'Distribution', desc: 'Last-mile delivery to retail chains, food service accounts, and export consolidation points.' },
],

  facilities: [
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
],

  qualityMetrics: [
  { label: 'Quality Rejection Rate', value: '<2%', target: 98, note: 'Target' },
  { label: 'On-Time Delivery Rate', value: '95%+', target: 95, note: 'Target' },
  { label: 'Food Safety Audit Score', value: '98%+', target: 98, note: 'Target' },
],

  certifications: [
  { name: 'ISO 22000', body: 'Food Safety Management System' },
  { name: 'HACCP', body: 'Hazard Analysis Critical Control Points' },
  { name: 'Halal', body: 'Halal Certification Authority' },
  { name: 'GMP', body: 'Good Manufacturing Practice' },
  { name: 'BSTI', body: 'Bangladesh Standards & Testing Institution' },
],

  sustainability: [
  {
    iconId: 'icon5',
    title: 'Reducing Food Waste',
    desc: 'Production efficiency programmes targeting waste reduction at every stage — from raw material utilisation to finished goods. Yield optimisation targets data TBP.',
    stat: 'Data TBP',
    statLabel: 'Waste reduction target',
  },
  {
    iconId: 'icon6',
    title: 'Sustainable Packaging',
    desc: 'Active programme to transition applicable product lines to biodegradable or recyclable packaging formats. Rollout timelines and targets to be published.',
    stat: 'Data TBP',
    statLabel: 'Biodegradable packaging target',
  },
  {
    iconId: 'icon7',
    title: 'Local Sourcing',
    desc: 'Strategic partnerships with Bangladeshi farmers and ingredient suppliers — supporting local agricultural communities and reducing supply chain carbon footprint.',
    stat: 'Data TBP',
    statLabel: 'Local sourcing target',
  },
],

  exportMarkets: [
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
],

  opportunities: [
  {
    title: 'Retail Distribution Partners',
    iconId: 'icon8',
    desc: 'Supermarkets, hypermarkets, and organised retail chains seeking quality-assured own-label and branded food products with consistent supply.',
    cta: 'Retailer Inquiry',
  },
  {
    title: 'B2B Food Service',
    iconId: 'icon9',
    desc: 'Hotels, restaurants, catering operations, and institutional buyers requiring reliable bulk food supply at consistent quality standards.',
    cta: 'Foodservice Inquiry',
  },
  {
    title: 'Export Buyers',
    iconId: 'icon10',
    desc: 'International distributors and importers sourcing halal-certified, FMCG products from Bangladesh for diaspora and mainstream retail placement.',
    cta: 'Export Buyer Inquiry',
  },
  {
    title: 'Co-Manufacturing Partners',
    iconId: 'icon11',
    desc: 'Food brands seeking certified production capacity without plant investment — leveraging our facilities, certifications, and food safety infrastructure.',
    cta: 'Co-Mfg Inquiry',
  },
],

  roadmap: [
  { year: '2025', milestone: 'New Product Lines', detail: 'Launch of expanded processed food and beverage SKUs. Entry into condiments and sauce category under own brand.' },
  { year: '2026', milestone: 'Export-Focused Expansion', detail: 'Capacity expansion of Processing Unit 2 with dedicated export production lines. First formal Middle East distribution agreements.' },
  { year: '2027', milestone: 'Own Brand Launch', detail: 'Formal launch of Network71 consumer food brand into domestic retail. Brand identity, packaging, and trade marketing programme.' },
  { year: '2028', milestone: 'International Retail Listing', detail: 'Target listing with international grocery retailers in UK, UAE, and regional markets. Scale private label export programme.' },
],

  hero: {
    eyebrow: 'Network71 — Food & Beverage Division',
    title1: 'Food & Beverage',
    title2: 'Manufacturing',
    lead: 'World-class food manufacturing from Bangladesh to global retail shelves.',
    ctaPrimary: 'Partner With Us',
    ctaSecondary: 'View Product Range',
    imgAlt: 'Food manufacturing facility',
  },
  overview: {
    eyebrow: 'Our Vision',
    title1: 'Manufacturing Excellence,',
    title2: 'From Bangladesh to',
    title3: 'Global Shelves',
    p1: 'Network71\'s Food & Beverage division operates certified manufacturing facilities producing a comprehensive range of food and beverage products — from raw ingredient sourcing through to retail-ready packaging.',
    p2: 'Our ambition is to establish Network71 as a leading FMCG manufacturer from Bangladesh: supplying domestic retail, developing proprietary brands, and placing products on international shelves across the Middle East, Europe, and beyond.',
    positioningLabel: 'Key positioning:',
    positioning: 'Halal-certified, ISO-standard, export-ready — competitive on quality, not just price.',
    pillarsTitle: 'Brand Pillars',
  },
  products: {
    eyebrow: 'Product Portfolio',
    title: 'What We Manufacture',
    lead: 'A comprehensive food and beverage range designed for multiple consumer segments, retail channels, and export markets.',
  },
  brandModelsCopy: {
    eyebrow: 'Brand Development',
    title1: 'Three Brand Models,',
    title2: 'One Manufacturing Partner',
    lead: 'A key differentiator of the N71 Food & Beverage division is our ability to operate across three distinct brand models — serving our own brands, retail partners, and manufacturing clients simultaneously.',
    highlightTag: 'Key Differentiator',
  },
  standardsCopy: {
    eyebrow: 'Manufacturing Standards',
    title1: 'Certified to the',
    title2: 'Highest Standards',
    lead: 'Our facilities are built around internationally recognised food safety management systems. Certification is not a box-tick — it is embedded in our daily production operations.',
    labTitle: 'Quality Laboratory',
    labLead: 'In-house laboratory capability supports pre-production, in-line, and finished goods testing across our product range.',
    labNote: 'Third-party laboratory verification available on request. Contact division for current testing scope.',
  },
  facilitiesCopy: {
    eyebrow: 'Facilities',
    title: 'Three Processing Units',
    lead: 'Each unit is configured for a specific product category cluster, with dedicated certification and quality systems.',
    colUnit: 'Processing Unit',
    colCapacity: 'Capacity',
    colLines: 'Product Lines',
    colCerts: 'Certifications',
    qcEyebrow: 'On-Site Laboratory & QC',
    qcTitle: 'Integrated Quality Control',
    qcLead: 'Each processing unit is supported by on-site quality control infrastructure. Lab results directly gate production release — no batch leaves without QC sign-off.',
  },
  quality: {
    eyebrow: 'Certifications',
    title: 'Quality & Compliance',
    lead: 'Our manufacturing operations are subject to multiple certification frameworks — ensuring confidence for retail buyers, export partners, and regulators worldwide.',
    note: 'Certification registration numbers withheld. Contact division for formal compliance documentation.',
    targetsEyebrow: 'Performance Targets',
    targetsTitle1: 'Measurable Quality',
    targetsTitle2: 'Standards',
    cultureTitle: 'Continuous Improvement Culture',
    cultureLead: 'Performance metrics are reviewed monthly against targets. Non-conformances trigger root-cause analysis and corrective action within defined SLAs. Third-party audits are welcomed as validation of our internal quality management posture.',
  },
  supplyChain: {
    eyebrow: 'Supply Chain',
    title: 'End-to-End Supply Chain',
    lead: 'From verified raw material suppliers through certified manufacturing to domestic and export distribution — a fully integrated value chain.',
    sourcingTitle: 'Raw Material Sourcing',
    sourcingLead: 'Primary ingredient sourcing from Bangladeshi farms and manufacturers — supporting local agriculture with direct procurement relationships.',
    distributionTitle: 'Distribution Reach',
    distributionLead: 'Products distributed through domestic retail networks and export logistics partners — covering modern trade, traditional retail, and international channels.',
  },
  sustainabilityCopy: {
    eyebrow: 'Sustainability',
    title: 'Responsible Manufacturing',
    lead: 'Building a food manufacturing division that is commercially excellent and environmentally responsible — for people, planet, and future consumers.',
  },
  exportMarketsCopy: {
    eyebrow: 'Export Markets',
    title1: 'Bangladesh to',
    title2: 'Global Retail',
    lead: 'Our halal certification, BSTI compliance, and international food safety standards position Network71 products for placement in key export markets — particularly where Bangladeshi diaspora and halal consumer segments drive FMCG demand.',
    cta: 'Export Buyer Inquiry',
  },
  opportunitiesCopy: {
    eyebrow: 'Business Opportunities',
    title1: 'Partner With Our',
    title2: 'Food Division',
    lead: 'We are actively seeking partners across four business models. If your business aligns with any of these, we want to hear from you.',
  },
  roadmapCopy: {
    eyebrow: 'Growth Roadmap',
    title: 'The Path to Global Shelves',
    lead: 'A four-year plan taking the Food & Beverage division from manufacturing excellence to own-brand international retail listing.',
  },
}

export type FoodBeverageContent = typeof en
export default en
