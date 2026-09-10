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
      value: "Verified",
      label: "Buyer & seller profiles",
      desc: "Identity-checked counterparties",
    },
    {
      value: "Specs",
      label: "Full vessel data",
      desc: "Class, tonnage, build, survey status",
    },
    {
      value: "Recycling",
      label: "Responsible yards",
      desc: "Hong Kong Convention–aligned partners",
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
    details: "View specifications",
    detailTitle: "Vessel specifications (illustrative)",
    sellerTitle: "Seller information",
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
  processLabel: "Purchase Process",
  process,
  recycling: {
    eyebrow: "Responsible Recycling",
    title: "Ship Recycling, Done Right.",
    description:
      "We connect vessel owners with recycling yards that operate to Hong Kong Convention and IMO guidelines, putting safety, environmental responsibility, and transparent documentation first.",
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
