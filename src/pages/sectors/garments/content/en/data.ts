export const data = {
  divisionName: "Garments & Apparel",
  metrics: [
    { value: "5+", label: "Factories", desc: "Production facilities" },
    { value: "2,000+", label: "Workers", desc: "Skilled workforce" },
    { value: "15+", label: "Export Countries", desc: "Global reach" },
    { value: "—", label: "Annual Capacity", desc: "Data to be published" },
  ],

  processSteps: [
    {
      title: "Design Brief",
      desc: "Client mood boards, tech packs, and specification review to align vision with production capability.",
    },
    {
      title: "Sampling",
      desc: "Rapid prototype development — first samples typically delivered within 7–10 working days.",
    },
    {
      title: "Material Sourcing",
      desc: "Certified mill selection, swatch testing, and cost-optimised fabric procurement from trusted suppliers.",
    },
    {
      title: "Cut & Sew",
      desc: "Precision pattern grading, automated fabric cutting, and assembly by trained operators across multiple lines.",
    },
    {
      title: "Quality Inspection",
      desc: "In-line and end-line QC checks against international AQL standards at every production stage.",
    },
    {
      title: "Finishing & Packing",
      desc: "Pressing, trimming, tagging, retail-ready packaging, and carton consolidation per buyer specs.",
    },
    {
      title: "Export Logistics",
      desc: "Full documentation, customs compliance, and global freight coordination to buyer destination.",
    },
  ],

  productCategories: [
    {
      iconId: "product0",
      name: "Woven Fabrics & Shirting",
      desc: "Premium woven dress shirts, formal wear, and structured tops manufactured with precision loom-integrated fabrics.",
    },
    {
      iconId: "product1",
      name: "Knitwear & Jersey",
      desc: "T-shirts, polo shirts, hoodies, sweatshirts, and knitted essentials for everyday and premium lifestyle segments.",
    },
    {
      iconId: "product2",
      name: "Denim & Bottoms",
      desc: "Jeans, chinos, cargo pants, and structured bottoms for men, women, and children across all fit categories.",
    },
    {
      iconId: "product3",
      name: "Outerwear & Jackets",
      desc: "Windbreakers, padded jackets, coats, and weather-resistant outer layers built for global climate conditions.",
    },
    {
      iconId: "product4",
      name: "Active & Sportswear",
      desc: "Performance apparel, yoga wear, running gear, and technical moisture-wicking fabrics for active lifestyle brands.",
    },
    {
      iconId: "product5",
      name: "Sustainable Textiles",
      desc: "Organic cotton, recycled fibres, and eco-certified fabric lines manufactured to OEKO-TEX and sustainable standards.",
    },
  ],

  manufacturingPillars: [
    {
      iconId: "pillar0",
      title: "Full Package Production",
      abbr: "FPP",
      desc: "End-to-end manufacturing from raw material procurement through finished goods delivery. We handle design, sourcing, production, QC, and logistics under one roof.",
    },
    {
      iconId: "pillar1",
      title: "Cut Make Trim",
      abbr: "CMT",
      desc: "Buyer-supplied fabric converted into finished garments. Our CMT service offers precision cutting, expert construction, and professional trim application.",
    },
    {
      iconId: "pillar2",
      title: "OEM & Private Label",
      abbr: "OEM",
      desc: "Your brand. Our production. Complete private-label manufacturing with full IP confidentiality, custom labelling, and buyer-branded packaging from first stitch.",
    },
    {
      iconId: "pillar3",
      title: "Sample Development",
      abbr: "R&D",
      desc: "Rapid prototype development with dedicated sampling teams. First samples within 7–10 working days. Counter-samples, pre-production, and approval management.",
    },
  ],

  techCards: [
    {
      iconId: "tech0",
      title: "CAD / Pattern Design",
      desc: "Computer-aided design systems for precision pattern grading, marker making, and digital fabric utilisation optimisation — reducing waste and improving fit accuracy.",
    },
    {
      iconId: "tech1",
      title: "ERP Production Tracking",
      desc: "Enterprise resource planning systems providing real-time visibility into production progress, material consumption, and order status across all factory floors.",
    },
    {
      iconId: "tech2",
      title: "Digital Quality Control",
      desc: "Digitised QC workflows with AQL-based defect tracking, photographic documentation, and buyer-facing audit reports generated at each inspection point.",
    },
  ],

  certifications: [
    {
      code: "WRAP",
      name: "Worldwide Responsible Accredited Production",
      status: "active",
      desc: "Ethical manufacturing, workplace safety, and human rights compliance certification.",
    },
    {
      code: "ISO 9001",
      name: "Quality Management Systems",
      status: "active",
      desc: "International standard for consistent quality management across production processes.",
    },
    {
      code: "OEKO-TEX",
      name: "Standard 100 — Textile Safety",
      status: "progress",
      desc: "Certification in Progress — testing every component against harmful substance limits.",
    },
    {
      code: "BSCI",
      name: "Business Social Compliance Initiative",
      status: "active",
      desc: "Social audit readiness covering labour rights, health, safety, and environmental standards.",
    },
  ],

  sustainabilityTargets: [
    { label: "Organic & Recycled Material Use", target: 60, unit: "%" },
    { label: "Water Recycling in Wet Processing", target: 50, unit: "%" },
    { label: "Carbon Footprint Reduction", target: 40, unit: "%" },
    { label: "Worker Welfare Programme Coverage", target: 100, unit: "%" },
  ],

  exportMarkets: [
    {
      flag: "🇺🇸",
      region: "United States",
      note: "Primary export market",
      tier: "primary",
    },
    {
      flag: "🇬🇧",
      region: "United Kingdom",
      note: "Established channel",
      tier: "primary",
    },
    {
      flag: "🇩🇪",
      region: "Germany",
      note: "Growing European hub",
      tier: "secondary",
    },
    {
      flag: "🇫🇷",
      region: "France",
      note: "Fashion-forward segment",
      tier: "secondary",
    },
    {
      flag: "🇦🇺",
      region: "Australia",
      note: "Active lifestyle demand",
      tier: "secondary",
    },
    {
      flag: "🇯🇵",
      region: "Japan",
      note: "Premium quality focus",
      tier: "secondary",
    },
    {
      flag: "🇦🇪",
      region: "UAE",
      note: "Middle East gateway",
      tier: "secondary",
    },
    {
      flag: "🇨🇦",
      region: "Canada",
      note: "North America expansion",
      tier: "secondary",
    },
  ],

  buyerTypes: [
    {
      title: "International Brands",
      subtitle: "Private Label Manufacturing",
      icon: "🏷️",
      desc: "Dedicated OEM production under your brand identity with full IP confidentiality. We manage every stage from sample development to container loading.",
      points: [
        "Full tech pack support",
        "Buyer-branded packaging",
        "Dedicated production lines",
        "Flexible MOQ negotiations",
      ],
      cta: "Request Private Label RFQ",
    },
    {
      title: "Wholesale Buyers",
      subtitle: "Bulk Order Fulfilment",
      icon: "📦",
      desc: "High-volume production with consistent quality across large order quantities. Competitive pricing structures for seasonal and ongoing wholesale programmes.",
      points: [
        "Competitive bulk pricing",
        "Consistent quality at scale",
        "On-time delivery commitment",
        "Multiple category sourcing",
      ],
      cta: "Explore Wholesale Terms",
    },
    {
      title: "Boutique Retailers",
      subtitle: "Small MOQ Collections",
      icon: "✨",
      desc: "Accessible manufacturing for emerging brands and independent retailers. Small minimum order quantities with the same quality standards as major buyers.",
      points: [
        "Low MOQ available",
        "Custom design support",
        "Agile production timeline",
        "Sustainable fabric options",
      ],
      cta: "Inquire About Small Orders",
    },
  ],

  roadmap: [
    {
      year: "2025",
      title: "Capacity Expansion",
      desc: "Scaling production floor capacity with additional cutting lines and sewing stations across existing facilities to meet growing international demand.",
    },
    {
      year: "2026",
      title: "Sustainable Product Line",
      desc: "Launch of dedicated sustainable garment collection using certified organic and recycled fibre inputs, targeting eco-conscious international buyers.",
    },
    {
      year: "2027",
      title: "Tech-Integrated Production",
      desc: "Full integration of automated cutting systems, IoT-enabled quality monitoring, and real-time buyer portals for transparent production tracking.",
    },
  ],
  processLabel: "Our Process",
  inquiryTypes: [
    "Buyer Inquiry",
    "Private Label Partnership",
    "Wholesale Inquiry",
    "Factory Visit",
    "Sustainability Partnership",
  ],
}

