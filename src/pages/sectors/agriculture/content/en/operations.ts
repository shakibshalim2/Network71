export const operations = {
  technology: {
    eyebrow: "AgriTechnology",
    title: "Smart Farming & Technology",
    description:
      "Traditional agricultural knowledge amplified by modern data tools — improving yield, reducing waste, and creating transparent " +
"supply chains.",
    cards: [
      {
        icon: "📡",
        title: "Precision Agriculture",
        desc: "IoT sensor networks and satellite data inform irrigation, fertilisation, and harvest timing decisions across partner farms.",
      },
      {
        icon: "🎓",
        title: "Farmer Training Programs",
        desc: "Seasonal workshops on Good Agricultural Practices (GAP), pesticide-free methods, and post-harvest care for every partner farmer.",
      },
      {
        icon: "🧊",
        title: "Post-Harvest Technology",
        desc: "Pre-cooling, vapour heat treatment, and temperature-controlled logistics that dramatically reduce spoilage between field and market.",
      },
      {
        icon: "🔗",
        title: "Traceability Systems",
        desc: "Batch tracking allows buyers to verify origin, handling history, and supporting documentation for every shipment.",
      },
    ],
    dashboard: {
      title: "N71 AgriOps Dashboard",
      status: "Live",
      metrics: [
        { label: "Farm Lot Registry", val: "Live" },
        { label: "Yield Tracking", val: "Per lot" },
        { label: "Cold Chain Monitoring", val: "Continuous" },
        { label: "Shipment Status", val: "Tracked" },
      ],
    },
  },
  processLabel: "Farm-to-Market Journey",
  processSteps: [
    {
      title: "Farmer Partnership",
      desc: "Agreements with verified smallholder and commercial farmers across producing regions.",
    },
    {
      title: "Harvest Collection",
      desc: "Mobile collection points and coordinated transport that minimise post-harvest loss.",
    },
    {
      title: "Sorting & Grading",
      desc: "Mechanical and manual sorting to international export-grade specifications.",
    },
    {
      title: "Agro-Processing",
      desc: "Cleaning, milling, hulling, and value-added processing tailored to each commodity.",
    },
    {
      title: "Quality & Lab Testing",
      desc: "Pesticide residue, moisture and export testing can be specified; laboratory accreditation must be confirmed per report.",
    },
    {
      title: "Cold Chain Storage",
      desc: "Temperature-controlled warehousing preserving freshness through the distribution cycle.",
    },
    {
      title: "Packaging & Export",
      desc: "Retail-ready and bulk packaging with full documentation for destination markets.",
    },
  ],
  supplyChain: {
    eyebrow: "Supply Chain",
    title: "End-to-End Value Chain",
    farmerTitle: "Farmer Network",
    farmerPoints: [
      "Partner farming network",
      "Managed and contracted acreage",
      "Multiple producing districts",
      "Organic & conventional lots",
    ],
    hubTitle: "N71 Processing Hub",
    hubPoints: [
      "Sorting & Grading",
      "Cleaning & Milling",
      "Quality Lab Testing",
      "Cold Chain Storage",
      "Value-Add Processing",
      "Export Packaging",
    ],
    buyerTitle: "Global Markets",
    buyerPoints: [
      "Export documentation for destination markets",
      "Retail supermarket chains",
      "Industrial food processors",
      "Institutional bulk buyers",
    ],
  },
  quality: {
    eyebrow: "Standards",
    title: "Quality & Compliance",
    description:
      "Quality requirements are confirmed for each shipment. Verified certificates and laboratory records are shared only when available and approved.",
    certifications: [
      {
        name: "HACCP",
        desc: "Target hazard-analysis framework; no current certification or facility-wide implementation is claimed here.",
      },
      {
        name: "Organic Programme",
        desc: "Organic status must be confirmed for each lot through an approved third-party certificate.",
      },
      {
        name: "Phytosanitary Compliance",
        desc: "Phytosanitary documents are shipment-specific and supplied only when issued by the relevant authority.",
      },
      {
        name: "Export Documentation",
        desc: "Certificate of Origin, Bill of Lading, packing lists, and all supporting commercial documentation.",
      },
    ],
    performanceTitle: "Performance Metrics",
    bars: [
      { label: "Target: traceable sourcing across all lots", value: 100 },
      { label: "Target: quality pass rate ≥ 98%", value: 98 },
      { label: "Target: post-harvest loss below 5%", value: 95 },
    ],
    footnote:
      "* Metrics reflect division targets. Verified data to be published upon completion of current audit cycle.",
  },
}
