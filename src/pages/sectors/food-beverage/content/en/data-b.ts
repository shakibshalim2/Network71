export const facilities = [
  {
    unit: 'Processing Unit 1',
    capacity: 'On request',
    lines: ['Beverages & Juices', 'RTD Formats'],
    certs: ['Target: ISO 22000', 'Target: HACCP', 'Target: Halal'],
  },
  {
    unit: 'Processing Unit 2',
    capacity: 'On request',
    lines: ['Processed Foods', 'Condiments & Sauces'],
    certs: ['Target: ISO 22000', 'Target: GMP', 'Target: BSTI'],
  },
  {
    unit: 'Processing Unit 3',
    capacity: 'On request',
    lines: ['Snacks & Confectionery', 'Baked Goods'],
    certs: ['Target: ISO 22000', 'Target: HACCP', 'Target: Halal'],
  },
]

export const qualityMetrics = [
  { label: 'Quality Rejection Rate', value: '<2%', target: 98, note: 'Target' },
  { label: 'On-Time Delivery Rate', value: '95%+', target: 95, note: 'Target' },
  { label: 'Food Safety Audit Score', value: '98%+', target: 98, note: 'Target' },
]

export const certifications = [
  { name: 'ISO 22000', body: 'Food safety management framework — working towards' },
  { name: 'HACCP', body: 'Target hazard-analysis framework — verified implementation details pending' },
  { name: 'Halal', body: 'Halal-compliant processes — working towards per product line' },
  { name: 'GMP', body: 'Good Manufacturing Practice — target operating framework' },
  { name: 'BSTI', body: 'Registration status will be published with an approved credential where applicable' },
]

export const sustainability = [
  {
    iconId: 'icon5',
    title: 'Reducing Food Waste',
    desc: 'Production efficiency programmes targeting waste reduction at every stage — from raw material utilisation to finished goods. Yield optimisation targets data TBP.',
    stat: 'On request',
    statLabel: 'Waste reduction target',
  },
  {
    iconId: 'icon6',
    title: 'Sustainable Packaging',
    desc: 'Active programme to transition applicable product lines to biodegradable or recyclable packaging formats. Rollout timelines and targets to be published.',
    stat: 'On request',
    statLabel: 'Biodegradable packaging target',
  },
  {
    iconId: 'icon7',
    title: 'Local Sourcing',
    desc: 'Strategic partnerships with Bangladeshi farmers and ingredient suppliers — supporting local agricultural communities and reducing supply chain carbon footprint.',
    stat: 'On request',
    statLabel: 'Local sourcing target',
  },
]

export const exportMarkets = [
  {
    region: 'Middle East',
    flag: '🇸🇦',
    priority: 'Primary',
    driver: 'Halal-compliant products, large Bangladeshi diaspora, strong FMCG import demand.',
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
]

export const opportunities = [
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
    desc: 'International distributors and importers sourcing halal-compliant FMCG products from Bangladesh for diaspora and mainstream retail placement.',
    cta: 'Export Buyer Inquiry',
  },
  {
    title: 'Co-Manufacturing Partners',
    iconId: 'icon11',
    desc: 'Food brands seeking production capacity without plant investment — leveraging our facilities, quality systems, and food safety infrastructure.',
    cta: 'Co-Mfg Inquiry',
  },
]

export const roadmap = [
  { year: '2025', milestone: 'New Product Lines', detail: 'Launch of expanded processed food and beverage SKUs. Entry into condiments and sauce category under own brand.' },
  { year: '2026', milestone: 'Export-Focused Expansion', detail: 'Capacity expansion of Processing Unit 2 with dedicated export production lines. First formal Middle East distribution agreements.' },
  { year: '2027', milestone: 'Own Brand Launch', detail: 'Formal launch of Network71 consumer food brand into domestic retail. Brand identity, packaging, and trade marketing programme.' },
  { year: '2028', milestone: 'International Retail Listing', detail: 'Target listing with international grocery retailers in UK, UAE, and regional markets. Scale private label export programme.' },
]
