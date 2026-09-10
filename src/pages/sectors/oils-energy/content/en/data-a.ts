export const metrics = [
  { value: "Edible + fuel", label: "Two product lines", desc: "Refined oils and petroleum distribution" },
  {
    value: "Regional",
    label: "Distribution network",
    desc: "Centres serving retail and industrial buyers",
  },
  {
    value: "Food safety",
    label: "Systems",
    desc: "HACCP-based controls in edible oil production",
  },
  { value: "—", label: "Export Reach", desc: "Data to be published" },
]

export const oilProcessSteps = [
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
    desc: "Temperature-monitored dispatch to retail chains, food manufacturers, and export consolidators via our distribution network.",
  },
]

export const edibleOilProducts = [
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

export const fuelCapabilities = [
  {
    title: "Petroleum Products",
    iconId: "petroleum",
    items: [
      "High-speed diesel (HSD)",
      "Motor spirit (petrol)",
      "Furnace oil",
      "Jet fuel coordination",
    ],
    stat: "Regional",
    statLabel: "distribution network",
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
    stat: "On request",
    statLabel: "contract volume data",
  },
]

export const supplyChainNodes = [
  {
    label: "Raw Material Sourcing",
    sub: "Imported + Local",
    color: "var(--accent-amber)",
  },
  {
    label: "Processing Facility",
    sub: "HACCP-based controls",
    color: "var(--accent-amber)",
  },
  {
    label: "Quality Lab",
    sub: "In-house testing",
    color: "var(--accent-emerald)",
  },
  {
    label: "Distribution Centres",
    sub: "Regional network",
    color: "var(--accent-sky)",
  },
  {
    label: "Retail / Industrial",
    sub: "End buyers",
    color: "var(--accent-sky)",
  },
]

export const certifications = [
  {
    name: "HACCP",
    desc: "Hazard Analysis and Critical Control Points — the framework our edible oil food safety management system is built on.",
    prominent: true,
  },
  {
    name: "ISO 22000",
    desc: "Food safety management framework we are working towards at processing and packaging stages.",
  },
  {
    name: "BSTI",
    desc: "Bangladesh Standards and Testing Institution registration where applicable for products sold domestically.",
  },
  {
    name: "Halal Compliance",
    desc: "Edible oils produced and packaged under Halal-compliant conditions; working towards formal recognition per product line.",
  },
  {
    name: "Quality Laboratory",
    desc: "In-house quality laboratory for FFA, peroxide value, moisture, and microbiological testing.",
  },
  {
    name: "Fuel Safety Compliance",
    desc: "Petroleum storage and distribution in line with applicable fire and safety regulations.",
  },
]

