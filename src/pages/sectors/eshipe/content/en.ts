import { OCEAN, TEAL } from "../theme"
import { serviceItems, categoryItems, vessels } from "./en/data-a"
import { process, recyclingItems, whyItems, regions } from "./en/data-b"

const en = {
  divisionName: "Ship Marketplace",
  metrics: [
    {
      value: "Buy · Sell · Lease",
      label: "Transaction modes",
      desc: "Purchase, sale, charter and lease",
    },
    {
      value: "Verify",
      label: "Buyer & seller profiles",
      desc: "Counterparty checks required per enquiry",
    },
    {
      value: "Specs",
      label: "Full vessel data",
      desc: "Class, tonnage, build, survey status",
    },
    {
      value: "Recycling",
      label: "Responsible yards",
      desc: "Compliance checked per enquiry",
    },
  ],
  inquiryTypes: [
    "Buy a Vessel",
    "Sell a Vessel",
    "Ship Recycling Inquiry",
    "Inspection & Valuation",
    "Join as Broker / Yard",
    "General Inquiry",
  ],
  hero: {
    eyebrow: "Network71 — Division 10",
    badge: "Ship Marketplace · eSHIPe",
    title: "The Global Marketplace for",
    titleAccent: "Ships & Marine Assets.",
    description:
      "Network71’s Ship Marketplace (eSHIPe) is where ships, vessels and marine assets are bought, sold, " +
      "leased and discovered — vessel listings with full specifications, search and filters, verified buyer-seller " +
      "profiles, structured inquiries and maritime services through to recycling.",
    browse: "Browse Listings",
    list: "List Your Vessel",
    metrics: [
      { value: "Buy · Sell · Lease", label: "Transaction modes" },
      { value: "Verified", label: "Buyer & seller profiles" },
      { value: "Specs", label: "Full vessel data" },
      { value: "Recycling", label: "Responsible yards" },
    ],
    terminal: [
      "$ eshipe --network=global --status=online",
      "✓ listings with full specifications",
      "✓ structured inquiry routing",
      "✓ recycling yards verified",
      "▌ awaiting vessel enquiry_",
    ],
  },
  services: {
    eyebrow: "Our Services",
    title: "One Marketplace. Every Maritime Need.",
    description:
      "From vessel acquisition to responsible recycling, eSHIPe provides the expertise and network to move your maritime business forward.",
    items: serviceItems,
  },
  categories: {
    eyebrow: "Browse by Category",
    title: "Find the Right Vessel",
    description:
      "Explore vessels across every major commercial and offshore category.",
    available: "Available",
    items: categoryItems,
  },
  listings: {
    illustrativeImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=400&fit=crop&auto=format",
    details: "View specifications",
    detailTitle: "Vessel specifications (illustrative)",
    sellerTitle: "Seller information",
    sellerWebsite: "Visit seller website ↗",
    sellerNote: "Seller identity and availability have not been published for this example. Contact Network71 for a current, approved listing.",
    specNote: "Class, dimensions, engine and survey records are available on request for actual listings.",
    enquiryIntro: "I would like to discuss a vessel with these requirements:",
    eyebrow: "Vessel Listings",
    title: "Available Vessels",
    description:
      "Listings shown are illustrative; live inventory is shared on request. Contact our brokers for full specifications and inspection arrangements.",
    searchLabel: "Search Vessel Listings",
    placeholder: "Search by vessel name, type, or flag...",
    typeLabel: "Vessel type",
    activityLabel: "Vessel activity",
    clear: "Clear",
    showing: "Showing {shown} of {total} listings",
    noFilters: "No vessels match your filters.",
    noSearch: "No vessels match your search",
    noSearchDesc:
      "Try adjusting your filters or contact our team for off-market listings.",
    reset: "Reset Filters",
    illustrativeAlt:
      "Illustrative cargo vessel photograph; not the vessel described",
    example: "{type} example",
    specs: [{ label: "Flag" }, { label: "DWT / GT" }, { label: "Built" }],
    extendedSpecs: [
      { key: "classification" as const, label: "Class status" },
      { key: "dimensions" as const, label: "Dimensions" },
      { key: "engine" as const, label: "Engine" },
    ],
    price: "Price",
    onEnquiry: "On enquiry",
    discuss: "Discuss These Requirements",
    typeOptions: [
      { value: "All Types", label: "All Types" },
      { value: "Cargo", label: "Cargo" },
      { value: "Bulk Carrier", label: "Bulk Carrier" },
      { value: "Tanker", label: "Tanker" },
      { value: "Container", label: "Container" },
      { value: "Tugboat", label: "Tugboat" },
      { value: "Fishing", label: "Fishing" },
      { value: "Offshore", label: "Offshore" },
      { value: "Scrap", label: "Scrap" },
    ],
    activityOptions: [
      { value: "All", label: "All" },
      { value: "For Sale", label: "For Sale" },
      { value: "For Recycling", label: "For Recycling" },
    ],
    vessels,
  },
  dealTerms: {
    eyebrow: "Transaction Terms",
    title1: "How an S&P Deal",
    title2: "Is Structured",
    lead: "The commercial frame every buyer and seller asks about before the first inspection — standard across our brokered transactions.",
    facts: [
      { value: "10", unit: " %", label: "Deposit", sub: "Lodged in joint escrow within 3 banking days of MOA signature" },
      { value: "1", unit: " %", label: "Brokerage commission", sub: "Of the purchase price, payable by the seller on delivery — no cure, no pay" },
      { value: "NSF", unit: " 2012", label: "Standard MOA form", sub: "Norwegian Saleform 2012; BIMCO SHIPSALE 22 or Nipponsale on request" },
      { value: "72", unit: " h", label: "Class confirmation", sub: "Class maintained certificate issued within 72 hours of delivery" },
      { value: "5–7", unit: " days", label: "Inspection window", sub: "Afloat inspection and class-records review before a firm offer" },
      { value: "≥ 3", unit: " days", label: "Delivery notice", sub: "Seller gives 20 / 10 / 5 / 3-day approximate and definite notices" },
    ],
    note: "Indicative; each transaction is governed by the MOA the parties sign and the broker's commission agreement.",
    cta: "Discuss a transaction",
  },
  closingDocs: {
    eyebrow: "Closing Documents",
    title1: "What Changes Hands",
    title2: "at Delivery",
    lead: "The document set exchanged when the Protocol of Delivery and Acceptance is signed. We check each item against the MOA before closing is called.",
    sellerTitle: "Seller delivers",
    buyerTitle: "Buyer delivers",
    seller: [
      { title: "Bill of Sale", note: "Notarised and apostilled, transferring title free of encumbrances" },
      { title: "Certificate of Ownership & Encumbrance", note: "From the current flag registry, dated within 3 days of delivery" },
      { title: "Deletion undertaking / certificate", note: "Flag deletion issued after delivery to allow re-registration" },
      { title: "Class maintained certificate", note: "Confirming class without condition or recommendation" },
      { title: "Corporate authority", note: "Board resolution, power of attorney and good-standing certificate" },
      { title: "Bunkers & lubes statement", note: "Remaining on board quantities and invoice at agreed prices" },
      { title: "Commercial invoice & PODA", note: "Protocol of Delivery and Acceptance, signed by both masters" },
    ],
    buyer: [
      { title: "Balance of purchase price", note: "90 % plus bunkers and lubes, released against the document set" },
      { title: "Escrow release instruction", note: "Joint instruction to release the 10 % deposit to the seller" },
      { title: "Corporate authority", note: "Board resolution and power of attorney for the signatory" },
      { title: "Flag registration evidence", note: "Provisional registration ready so the vessel is never flagless" },
      { title: "Insurance cover note", note: "H&M and P&I entry effective from delivery" },
    ],
    footnote: "Certificates required under the ISM / ISPS code, radio licence and continuous synopsis record are handed over on board with the vessel's logbooks.",
  },
  listVessel: {
    eyebrow: "Sell With eSHIPe",
    title1: "List Your Vessel",
    title2: "in Four Steps",
    lead: "From the first call to a verified listing our buyers can act on. Listings are never published without owner authority and current class records.",
    steps: [
      { code: "01", title: "Owner authority & particulars", desc: "Signed listing mandate plus the vessel's particulars: type, DWT/GT, built, flag, class, dimensions, main engine, last dry-dock.", time: "Day 1" },
      { code: "02", title: "Records & photo set", desc: "Class status report, latest survey, GA plan and a 20-photo set. We redact confidential details for the public listing.", time: "Day 2–5" },
      { code: "03", title: "Valuation & pricing", desc: "Desktop valuation against recent comparable sales and demolition value; you set the asking price and delivery range.", time: "Day 5–7" },
      { code: "04", title: "Live to qualified buyers", desc: "Published to registered buyers and our broker network, with off-market option for sensitive sales. Enquiries screened before introduction.", time: "Day 7" },
    ],
    included: ["Confidential handling under NDA", "Buyer qualification and LOI screening", "Inspection scheduling and indemnities", "Negotiation and MOA drafting support", "Escrow coordination and closing documents", "No fee until delivery"],
    includedTitle: "Included with every listing",
    cta: "List your vessel",
    secondary: "Talk to a broker first",
  },
  faq: {
    eyebrow: "Buyer & Seller FAQ",
    title1: "Before You Make",
    title2: "or Accept an Offer",
    lead: "Straight answers on inspections, deposits, documents, recycling sales and how eSHIPe is paid.",
    items: [
      { q: "Are the listed vessels real and available?", a: "Listings marked illustrative are examples of the categories we broker. Live inventory is shared with registered buyers after a short qualification call, because owners require confidentiality until an LOI is received." },
      { q: "Can we inspect before making an offer?", a: "Yes. Send a Letter of Intent on company letterhead; we arrange an afloat inspection and class-records review, normally within 5–7 days. Buyers' surveyors provide a letter of indemnity and passport copies to the owner." },
      { q: "How are deposit and payment handled?", a: "On MOA signature the buyer lodges 10 % in a joint escrow account with the seller's lawyer or an agreed stakeholder. The 90 % balance, plus bunkers and lubes, is paid at closing against the delivery documents." },
      { q: "Which MOA form do you use?", a: "Norwegian Saleform 2012 by default; BIMCO SHIPSALE 22 or Nipponsale 1999 where the seller prefers. Both parties should have counsel review the MOA before signature." },
      { q: "What does eSHIPe charge?", a: "A brokerage commission of 1 % of the purchase price, payable by the seller on delivery and receipt of the full price — no cure, no pay. Valuation and inspection coordination are included." },
      { q: "How do recycling sales work?", a: "End-of-life tonnage is sold on a light displacement tonnage (LDT) basis to yards whose Hong Kong Convention and local permits we verify per transaction. The inventory of hazardous materials (IHM) must be current before delivery." },
      { q: "Can you help with flag, finance or crew?", a: "Yes — through the Network71 network we coordinate provisional flag registration, introductions to ship finance and P&I, and crew management partners so the vessel is never flagless or uninsured at delivery." },
    ],
    cta: "Ask something else",
  },
  processLabel: "Purchase Process",
  process,
  recycling: {
    eyebrow: "Responsible Recycling",
    title: "Ship Recycling, Done Right.",
    description:
      "We can route enquiries to recycling yards. Convention alignment, permits and documentation must be verified for each yard before engagement.",
    items: recyclingItems,
  },
  why: {
    eyebrow: "Why eSHIPe",
    title: "The Network71 Maritime Advantage",
    description:
      "eSHIPe is backed by Network71’s trading and logistics infrastructure — giving buyers and sellers access to the Group’s cross-border commercial network from its Dhaka headquarters.",
    items: whyItems,
  },
  reach: {
    eyebrow: "Global Reach",
    title: "Cross-Border by Design.",
    description:
      "eSHIPe is built to serve the major shipping corridors — from the Bay of Bengal and the Arabian " +
      "Gulf to the Mediterranean, the North Sea, and East Asia — connecting buyers and sellers across " +
      "South Asia, the Middle East, Southeast Asia and beyond.",
    note: "Off-market deal flows and private listings are available to registered members. Contact us to join the eSHIPe network.",
    regions,
  },
}

export type EShipeContent = typeof en
export default en
