import { OCEAN, TEAL } from "../theme"
import { serviceItems, categoryItems, vessels } from "./en/data-a"
import { process, recyclingItems, whyItems, regions } from "./en/data-b"

const en = {
  divisionName: "Ship Marketplace",
  metrics: [
    { value: "50+", label: "Countries", desc: "Global marketplace reach" },
    {
      value: "200+",
      label: "Active Buyers",
      desc: "Registered vessel purchasers",
    },
    {
      value: "150+",
      label: "Vessel Sellers",
      desc: "Listed ship owners & brokers",
    },
    {
      value: "25+",
      label: "Recycling Yards",
      desc: "Certified demolition partners",
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
      { value: "50+", label: "Countries" },
      { value: "200+", label: "Active Buyers" },
      { value: "150+", label: "Vessel Sellers" },
      { value: "25+", label: "Recycling Yards" },
    ],
    terminal: [
      "$ eshipe --network=global --status=online",
      "✓ marketplace active — 50+ countries",
      "✓ 200+ buyers registered",
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
    eyebrow: "Vessel Listings",
    title: "Available Vessels",
    description:
      "Browse our current selection of verified vessels. Contact our brokers for full specifications and inspection arrangements.",
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
      "We connect vessel owners with certified recycling yards that put safety, environmental responsibility, and transparent documentation first.",
    items: recyclingItems,
  },
  why: {
    eyebrow: "Why eSHIPe",
    title: "The Network71 Maritime Advantage",
    description:
      "eSHIPe is backed by Network71’s global trade infrastructure — giving buyers and sellers access to a network built on decades of international commercial experience.",
    items: whyItems,
  },
  reach: {
    eyebrow: "Global Reach",
    title: "50+ Countries. One Marketplace.",
    description:
      "eSHIPe operates across the world’s major shipping corridors — from the Bay of Bengal and the Arabian " +
      "Gulf to the Mediterranean, the North Sea, and East Asia. Our buyers and sellers span every major " +
      "maritime flag state and port cluster.",
    note: "Off-market deal flows and private listings are available to registered members. Contact us to join the eSHIPe network.",
    regions,
  },
}

export type EShipeContent = typeof en
export default en
