export const primary = {
  divisionName: "Agriculture & Agro Products",
  metrics: [
    {
      value: "Farm-to-export",
      label: "Value chain",
      desc: "Sourcing, processing and export under one division",
    },
    {
      value: "Partner farms",
      label: "Smallholder network",
      desc: "Contracted growers across producing districts",
    },
    {
      value: "Traceable",
      label: "Origin documentation",
      desc: "Batch-level documentation from farm to shipment",
    },
    {
      value: "Export",
      label: "Bangladesh base",
      desc: "Documentation prepared for destination markets",
    },
  ],
  hero: {
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&h=800&fit=crop&auto=format",
    imageAlt: "Lush agricultural fields",
    eyebrow: "Network71 — Division 02",
    title: "Agriculture",
    subtitle: "& Agro Products",
    description:
      "From fertile fields to global markets — traceable, sustainable, premium agro products connecting South Asian farmers to the world.",
    primaryCta: "Buyer Inquiry",
    secondaryCta: "View Products",
    stat: "Export",
    statLabel: "Destination Markets",
    statDescription: "Documentation on request",
  },
  vision: {
    eyebrow: "Our Vision",
    title: "Connecting South Asian Growers to the World",
    paragraphs: [
      "Network71’s Agriculture Division was founded on a single conviction: the extraordinary agricultural wealth of South Asia " +
"remains underserved by modern global trade infrastructure. We exist to change that.",
      "By embedding directly within farming communities — building trust, providing training, and offering fair pricing before a " +
"single crop is planted — we create supply chains that are genuinely sustainable rather than extractive.",
      "Our processing hubs, cold-chain logistics, and direct export relationships mean that when a buyer in Dubai or Rotterdam " +
"sources from Network71, they can trace every batch back to a named district, a documented farming practice, and a farmer who earned a " +
"fair margin.",
    ],
    values: [
      {
        label: "Traceability",
        desc: "Farm-to-shipment documentation at every node of the supply chain.",
      },
      {
        label: "Farmer Welfare",
        desc: "Fair pricing, advance contracting, and on-ground farmer support.",
      },
      {
        label: "Quality Assurance",
        desc: "Laboratory-verified produce meeting importing country standards.",
      },
      {
        label: "Sustainable Practices",
        desc: "Low-input, water-smart methods to protect long-term soil health.",
      },
    ],
  },
  crops: {
    eyebrow: "Product Range",
    title: "Crop Portfolio",
    description:
      "Six commodity categories — each processed, graded, and documented to meet the requirements of international buyers across " +
"food retail, food service, and industrial processing.",
    items: [
      {
        emoji: "🌾",
        name: "Rice & Paddy",
        desc: "High-yield aromatic and non-aromatic varieties milled to international export specifications.",
      },
      {
        emoji: "🥦",
        name: "Fresh Vegetables",
        desc: "Seasonal vegetables with full traceability from verified farming networks to final destination.",
      },
      {
        emoji: "🍋",
        name: "Tropical Fruits",
        desc: "Tropical and sub-tropical fruits harvested at peak quality and handled with cold-chain care.",
      },
      {
        emoji: "🫘",
        name: "Pulses & Lentils",
        desc: "Red lentils, mung beans, chickpeas, and protein-rich legumes cleaned to export grade.",
      },
      {
        emoji: "🌶️",
        name: "Spices & Herbs",
        desc: "Turmeric, chilli, coriander, cardamom, and dried herbs sourced from specialty growing regions.",
      },
      {
        emoji: "🌿",
        name: "Jute & Fibre",
        desc: "Raw jute and processed jute fibre supporting sustainable natural textile export.",
      },
    ],
  },
}

export const trade = {
  calendar: {
    eyebrow: "Harvest & Availability",
    title: "Season Calendar",
    description:
      "When each commodity is harvested in Bangladesh and when export-grade lots are typically available — plan bookings against the season, not the catalogue.",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    legend: { harvest: "Harvest", available: "Export lots available", storage: "From storage" },
    rows: [
      { crop: "Rice & Paddy", emoji: "🌾", harvest: [4, 5, 11, 12], available: [1, 2, 3, 6, 7, 8, 9, 10], note: "Boro (Apr–May) and Aman (Nov–Dec) seasons" },
      { crop: "Fresh Vegetables", emoji: "🥦", harvest: [11, 12, 1, 2, 3], available: [11, 12, 1, 2, 3], note: "Winter (Rabi) season peak" },
      { crop: "Tropical Fruits", emoji: "🍋", harvest: [5, 6, 7, 8], available: [5, 6, 7, 8], note: "Mango, jackfruit, lychee — air-freight window" },
      { crop: "Pulses & Lentils", emoji: "🫘", harvest: [2, 3, 4], available: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], note: "Shelf-stable; year-round from storage" },
      { crop: "Spices & Herbs", emoji: "🌶️", harvest: [1, 2, 3, 4], available: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], note: "Turmeric & chilli dried and graded post-harvest" },
      { crop: "Jute & Fibre", emoji: "🌿", harvest: [7, 8, 9], available: [8, 9, 10, 11, 12, 1, 2], note: "Retting and baling Aug–Sep" },
    ],
    footnote: "Indicative windows; exact availability is confirmed per lot at enquiry.",
  },
  specs: {
    eyebrow: "Export Specifications",
    title: "What Ships in the Container",
    description:
      "Indicative export-grade specifications per commodity. Final specs, lab reports and packing are agreed in the pro-forma for each lot.",
    labels: { grade: "Grade", moisture: "Moisture", purity: "Purity", packing: "Packing", shelf: "Shelf life", origin: "Origin districts" },
    items: [
      { crop: "Rice & Paddy", emoji: "🌾", grade: "Long / medium grain, 5% & 25% broken", moisture: "≤ 14%", purity: "≥ 98%", packing: "25 / 50 kg PP or jute bags", shelf: "12 months", origin: "Dinajpur, Naogaon, Bogura" },
      { crop: "Pulses & Lentils", emoji: "🫘", grade: "Red lentil (whole & split), mung, chickpea", moisture: "≤ 12%", purity: "≥ 99%", packing: "25 / 50 kg PP bags, big-bags", shelf: "18 months", origin: "Faridpur, Rajshahi, Pabna" },
      { crop: "Spices & Herbs", emoji: "🌶️", grade: "Turmeric finger 3–5% curcumin, chilli S4/S17", moisture: "≤ 10%", purity: "≥ 99%, ASTA colour on request", packing: "10 / 25 kg multi-wall paper or jute", shelf: "18–24 months", origin: "Bogura, Nilphamari, Panchagarh" },
      { crop: "Fresh Vegetables", emoji: "🥦", grade: "Class I, size-graded", moisture: "—", purity: "Field-packed, pre-cooled", packing: "5 / 10 kg vented cartons", shelf: "7–21 days cold chain", origin: "Jashore, Cumilla, Narsingdi" },
      { crop: "Tropical Fruits", emoji: "🍋", grade: "Export grade, VHT where required", moisture: "—", purity: "Brix specified per variety", packing: "4 / 5 kg cartons", shelf: "14–28 days cold chain", origin: "Rajshahi, Chapainawabganj, Dinajpur" },
      { crop: "Jute & Fibre", emoji: "🌿", grade: "Tossa / white, BTR–BTD", moisture: "≤ 13%", purity: "Retted, graded, baled", packing: "180 kg press bales", shelf: "24 months dry storage", origin: "Faridpur, Rangpur, Jamalpur" },
    ],
    footnote: "Values are planning references drawn from Bangladesh export norms; certificates of analysis are issued per shipment.",
  },
  terms: {
    eyebrow: "Trade Terms",
    title: "How a Shipment Comes Together",
    description: "The commercial frame buyers screen on before requesting a quote.",
    facts: [
      { value: "1", unit: " FCL", label: "Minimum order", sub: "20ft container per commodity; LCL for spices and samples" },
      { value: "500", unit: " g–2 kg", label: "Samples", sub: "Courier samples for lab testing before booking" },
      { value: "FOB", unit: " CTG", label: "Incoterms", sub: "Chattogram; CIF / CFR to destination on request" },
      { value: "LC", unit: " / TT", label: "Payment", sub: "Sight LC or 30% TT advance, balance against documents" },
      { value: "21–35", unit: " days", label: "Lead time", sub: "Booking to ex-works for in-season lots" },
      { value: "6", unit: " docs", label: "Shipping documents", sub: "CoO, phytosanitary, packing list, BL, invoice, CoA" },
    ],
    footnote: "Indicative; confirmed in the pro-forma invoice for each order.",
    cta: "Request a quote",
  },
  faq: {
    eyebrow: "Buyer FAQ",
    title: "Before You Book a Container",
    description: "Direct answers on sourcing, testing, documentation and how a lot moves from farm to port.",
    items: [
      { q: "Can you send samples before we commit to a container?", a: "Yes. We courier 500 g–2 kg samples from the lot on offer so your lab can run moisture, purity and residue tests. Sample cost is credited against the first order." },
      { q: "How is traceability documented?", a: "Every export lot carries a lot ID that maps to the farm cluster, district, harvest date, processing hub and QC record. The lot card ships with the documents and can be verified on request." },
      { q: "Which certificates accompany a shipment?", a: "Certificate of Origin, phytosanitary certificate from the Bangladesh Plant Quarantine Wing, packing list, commercial invoice, bill of lading and a certificate of analysis from the testing lab. Organic or other third-party certificates are supplied per lot when held." },
      { q: "Do you handle fumigation and destination-country requirements?", a: "Yes — fumigation, VHT for fruit where required, and destination-specific labelling are arranged before stuffing. Tell us the destination at enquiry so the documentation is prepared to that market's import rules." },
      { q: "What are the minimum order and payment terms?", a: "One 20ft container per commodity is the working minimum; spices and samples can ship LCL. Payment is by sight LC or 30% TT advance with the balance against shipping documents." },
      { q: "Can we buy out of season?", a: "Shelf-stable commodities (rice, pulses, spices, jute) ship year-round from controlled storage. Fresh produce follows the harvest calendar above; we hold a booking window and confirm as the season opens." },
      { q: "Can we visit farms or the processing hub?", a: "Buyer and auditor visits are welcome. Select 'Buyer Inquiry' and mention a visit — we arrange district travel, farm cluster meetings and hub walkthroughs." },
    ],
    cta: "Ask something else",
  },
}
