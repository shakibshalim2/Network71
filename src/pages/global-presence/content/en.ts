const en = {
  hero: {
    badge: 'International Operations',
    title: 'Our Global Reach',
    stats: 'Dhaka Headquarters \u00a0•\u00a0 10 Business Divisions \u00a0•\u00a0 One Vision',
    lead: 'From our headquarters in Dhaka, Network71 trades and partners across South Asia, the Middle East and Southeast Asia, with export relationships reaching Europe and Africa — connected by trade, technology, and shared purpose.',
  },
  map: {
    eyebrow: 'Where We Operate',
    title: 'Global Footprint',
    lead: 'Gold markers indicate regional operational clusters. Trade route lines show principal import/export corridors.',
    footnote: 'Map is illustrative. Markers show trade and partner locations, not a registry of subsidiaries or offices.',
    cities: [
      { cx: 676, cy: 147, label: 'Dhaka', sublabel: 'HQ', pulse: true, primary: true },
      { cx: 588, cy: 144, label: 'Dubai', sublabel: '', pulse: false, primary: false },
      { cx: 450, cy: 86, label: 'London', sublabel: '', pulse: false, primary: false },
      { cx: 521, cy: 109, label: 'Istanbul', sublabel: '', pulse: false, primary: false },
      { cx: 709, cy: 197, label: 'Singapore', sublabel: '', pulse: false, primary: false },
      { cx: 265, cy: 110, label: 'New York', sublabel: '', pulse: false, primary: false },
      { cx: 542, cy: 202, label: 'Nairobi', sublabel: '', pulse: false, primary: false },
      { cx: 632, cy: 157, label: 'Mumbai', sublabel: '', pulse: false, primary: false },
    ],
    arcs: [
      { x1: 676, y1: 147, x2: 450, y2: 86, cx: 562, cy: 60, label: 'Europe Corridor' },
      { x1: 676, y1: 147, x2: 588, y2: 144, cx: 632, cy: 115, label: 'Gulf Route' },
      { x1: 676, y1: 147, x2: 709, y2: 197, cx: 720, cy: 155, label: 'SE Asia Corridor' },
      { x1: 588, y1: 144, x2: 542, y2: 202, cx: 555, cy: 155, label: 'Africa Route' },
      { x1: 676, y1: 147, x2: 265, y2: 110, cx: 470, cy: 40, label: 'Atlantic Route' },
    ],
  },
  counts: {
    items: [
      { stat: '10', label: 'Business Divisions' },
      { stat: 'Dhaka', label: 'Group Headquarters' },
      { stat: '3', label: 'Focus Regions' },
    ],
    footnote: 'Regional presence reflects active trade relationships and partner locations; office details are published on the Contact page.',
  },
  regions: {
    eyebrow: 'Regions',
    title: 'Regional Breakdown',
    lead: "Each region plays a distinct role in Network71's global value chain.",
    countriesNote: 'Focus regions: South Asia, Middle East, Southeast Asia',
    items: [
      {
        name: 'South Asia',
        tag: 'HQ & Primary Operations',
        tagColor: 'bg-gold/15 text-gold border-gold/25',
        desc:
          'Bangladesh serves as Network71 headquarters and the centre of garment manufacturing, agro-processing, and food production operations. The region anchors our supply chain and workforce.',
        icon: '🇧🇩',
        highlights: [
          'Headquarters: Dhaka, Bangladesh',
          'Core workforce and operations',
          'Primary manufacturing base',
        ],
      },
      {
        name: 'Middle East',
        tag: 'Trading Hub',
        tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
        desc: 'A critical hub for import/export activity, re-export trade, and B2B distribution of agricultural commodities, edible oils, and consumer goods.',
        icon: '🌙',
        highlights: [
          'Commodity re-export corridor',
          'B2B distribution networks',
          'Edible oil & food trade',
        ],
      },
      {
        name: 'Europe',
        tag: 'Import/Export Markets',
        tagColor: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
        desc: 'Export destination for Network71 garments, agricultural produce, and food products. Active compliance engagement with EU trade frameworks.',
        icon: '🏰',
        highlights: [
          'Garment export destination',
          'EU compliance frameworks',
          'Premium agro-product markets',
        ],
      },
      {
        name: 'Southeast Asia',
        tag: 'Manufacturing & Sourcing',
        tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
        desc: 'Strategic sourcing region for raw materials, components, and manufacturing partnerships supporting Network71 production requirements.',
        icon: '🌴',
        highlights: [
          'Raw material sourcing',
          'Manufacturing partnerships',
          'Regional logistics corridors',
        ],
      },
      {
        name: 'Africa',
        tag: 'Emerging Markets',
        tagColor: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
        desc: 'Emerging commercial footprint in agricultural commodity trade and consumer goods, with active market development underway.',
        icon: '🌍',
        highlights: [
          'Agricultural commodity trade',
          'Consumer goods distribution',
          'Market development phase',
        ],
      },
    ],
  },
  routes: {
    eyebrow: 'Trade Corridors',
    title: 'Principal Trade Routes',
    lead: "Network71's trade flows connect production origins to end markets across three primary corridors.",
    items: [
      { from: 'Bangladesh', via: 'Indian Ocean', to: 'Middle East & Europe', color: 'from-gold to-amber-400' },
      { from: 'South Asia', via: 'South China Sea', to: 'Southeast Asia', color: 'from-blue-400 to-cyan-400' },
      { from: 'Middle East', via: 'Gulf of Aden', to: 'Africa', color: 'from-emerald-400 to-green-400' },
    ],
  },
  divisions: {
    eyebrow: 'By Division',
    title: 'Key Markets by Division',
    items: [
      { name: 'Garments & Apparel', focus: 'Manufacturing: Bangladesh → Export: Europe, North America, Middle East', href: '/divisions/garments', icon: '🧵' },
      { name: 'Agriculture & Agro', focus: 'Farming: South Asia → Trade: Middle East, Southeast Asia, Africa', href: '/divisions/agriculture', icon: '🌾' },
      { name: 'Food & Beverage', focus: 'Production: Bangladesh → Distribution: South Asia, Middle East', href: '/divisions/food-beverage', icon: '🥤' },
      { name: 'Oils & Energy', focus: 'Import: Southeast Asia, Middle East → Distribution: Bangladesh, regional', href: '/divisions/oils-energy', icon: '⚡' },
      { name: 'IT & Software', focus: 'Development: Bangladesh → Delivery: group divisions, the Ezyify platform and enterprise clients', href: '/divisions/it-software', icon: '💻' },
      { name: 'Global Trading', focus: 'Multi-corridor: sourcing and export across South Asia, the Gulf and Southeast Asia', href: '/divisions/global-trading', icon: '🚢' },
      { name: 'Media', focus: 'Newsroom: Bangladesh → Digital newspaper and TV available online', href: '/divisions/media', icon: '📺' },
      { name: 'eSHIPe Maritime', focus: 'Marketplace: cross-border vessel trade across South Asia, the Gulf and beyond', href: '/divisions/eshipe', icon: '⚓' },
      { name: 'Strategic Ventures', focus: 'Partnerships: joint ventures and market entry across our focus regions', href: '/divisions/strategic-ventures', icon: '🤝' },
      { name: 'Ezyify', focus: 'Platform: built in Bangladesh → cross-border digital commerce', href: '/ezyify', icon: '🛍️' },
    ],
  },
  offices: {
    eyebrow: 'Offices',
    title: 'Our Locations',
    hqLabel: 'Global Headquarters',
    hqCity: 'Dhaka, Bangladesh',
    hqDesc: 'All corporate functions, executive leadership, primary technology operations, and strategic coordination are headquartered in Dhaka.',
    regionalLabel: 'Regional Offices',
    regionalValue: 'On Request',
    regionalDesc: 'Regional representation is coordinated from our Dhaka headquarters. Contact our team for partner and representative details in your market.',
  },
}

export type GlobalPresenceContent = typeof en
export default en
