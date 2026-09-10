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
      desc: "Pesticide residue checks, moisture testing, and export test reports from accredited labs.",
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
      "Every shipment leaves our facility backed by laboratory verification and the documentation required by importing markets.",
    certifications: [
      {
        name: "HACCP",
        desc: "Hazard Analysis & Critical Control Points — systematic food safety management across all processing facilities.",
      },
      {
        name: "Organic Programme",
        desc: "Organic lots are grown under third-party certification schemes; certificates for specific lots are shared on request.",
      },
      {
        name: "Phytosanitary Compliance",
        desc: "Plant health inspection and government-issued certificates meeting importing country requirements.",
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
