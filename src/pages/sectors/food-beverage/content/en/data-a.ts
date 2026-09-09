export const metrics = [
  { value: '3', label: 'Processing Units', desc: 'Active production facilities' },
  { value: 'Food safety', label: 'Systems in place', desc: 'HACCP and GMP-based production controls' },
  { value: 'Multi', label: 'Product categories', desc: 'Processed foods, beverages, snacks, condiments' },
  { value: '—', label: 'Annual Output', desc: 'Data to be published' },
]

export const pillars = [
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
    desc: 'Halal-compliant processes across eligible product lines — supporting export to Middle East, South Asia, and Muslim-majority markets.',
  },
  {
    iconId: 'icon4',
    title: 'Global Standards',
    desc: 'Manufacturing processes aligned with international food industry standards — enabling retail-ready products for global shelves.',
  },
]

export const productCategories = [
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
]

export const brandModels = [
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
    desc: 'Existing food brands looking to scale or outsource production can leverage our facilities and expertise — without capital investment in their own plant.',
    points: [
      'Food-safety-controlled facility access',
      'Existing brand recipe production',
      'Scale-up capacity for growth brands',
      'Quality parity as a contractual standard',
    ],
    highlight: false,
  },
]

export const standards = [
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
    title: 'Halal Compliance',
    desc: 'Products eligible for halal designation are manufactured under halal-compliant conditions, with certification pursued per product line — supporting export to Muslim-majority markets worldwide.',
    badge: 'Halal',
  },
]

export const processSteps = [
  { title: 'R&D & Recipe Development', desc: 'In-house food technologists develop and validate formulations against consumer and market requirements.' },
  { title: 'Raw Material Sourcing', desc: 'Verified ingredient procurement from approved local and international supplier networks.' },
  { title: 'Food Safety Testing', desc: 'Incoming material testing — microbiological, chemical, and sensory — before production approval.' },
  { title: 'Production', desc: 'Controlled manufacturing in processing units following SOPs and batch records.' },
  { title: 'In-Line QC', desc: 'Real-time quality checks at critical control points throughout the production run.' },
  { title: 'Packaging & Labelling', desc: 'Automated packaging with regulatory-compliant labelling for retail and export markets.' },
  { title: 'Cold / Ambient Storage', desc: 'Product-appropriate storage in temperature-controlled or ambient warehousing.' },
  { title: 'Distribution', desc: 'Last-mile delivery to retail chains, food service accounts, and export consolidation points.' },
]
