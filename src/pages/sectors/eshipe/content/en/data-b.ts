import { OCEAN, TEAL } from "../../theme"

export const process = [
  {
    title: "Submit Inquiry",
    desc: "Contact us with your requirements — vessel type, size, budget, and intended use. Our brokers will match you with suitable listings within 24 hours.",
  },
  {
    title: "Review & Shortlist",
    desc: "We present verified vessel options with full specification sheets, survey history, flag records, and pricing details for your review.",
  },
  {
    title: "Inspection & Survey",
    desc: "An independent survey may be arranged; surveyor accreditation and report scope must be confirmed for the vessel.",
  },
  {
    title: "Negotiation & Agreement",
    desc: "Our brokers facilitate price negotiation and draft the Memorandum of Agreement (MOA) in accordance with international maritime law.",
  },
  {
    title: "Transfer & Delivery",
    desc: "Flag transfer, title documentation, payment settlement, and vessel delivery coordinated by our team through to final handover.",
  },
]

export const recyclingItems = [
  {
    title: "Hong Kong Convention",
    body: "International Maritime Organization",
    status: "Verify per yard",
    statusColor: "var(--accent-emerald)",
    desc: "Convention alignment and permits must be verified for each proposed recycling yard.",
  },
  {
    title: "EU Ship Recycling Regulation",
    body: "European Commission",
    status: "Compliant",
    statusColor: "var(--accent-emerald)",
    desc: "EU-flag and EU-owned vessels are handled through yards approved under the EU Ship Recycling Regulation (EUSRR) list.",
  },
  {
    title: "Basel Convention",
    body: "United Nations Environment Programme",
    status: "Compliant",
    statusColor: "var(--accent-emerald)",
    desc: "Hazardous waste generated during recycling is managed in accordance with the Basel Convention on transboundary movement of hazardous waste.",
  },
  {
    title: "ISM Code Compliance",
    body: "International Safety Management",
    status: "Verify per vessel",
    statusColor: OCEAN,
    desc: "ISM and safety-management documents must be verified for each vessel before a transaction.",
  },
]

export const whyItems = [
  {
    icon: "◈",
    title: "Cross-Border Buyer Network",
    desc: "Registered buyers across South Asia, the Middle East, Southeast Asia and beyond — spanning institutional investors, shipping lines, and independent operators.",
    color: OCEAN,
  },
  {
    icon: "◈",
    title: "Verified Listings Only",
    desc: "Every vessel listed is verified for title, class status, and flag registry before publication. No ghost listings.",
    color: TEAL,
  },
  {
    icon: "◈",
    title: "Neutral Brokerage",
    desc: "Our brokers represent the transaction — not one side. Transparent fee structure, no hidden commissions.",
    color: "var(--accent-emerald)",
  },
  {
    icon: "◈",
    title: "Legal Support",
    desc: "MOA drafting, flag transfer coordination, and port agent services managed through Network71’s legal and trading partners.",
    color: "var(--accent-amber)",
  },
  {
    icon: "◈",
    title: "Independent Surveyors",
    desc: "Survey support may be arranged at the vessel’s port of call; accreditation and availability require confirmation.",
    color: OCEAN,
  },
  {
    icon: "◈",
    title: "End-to-End Service",
    desc: "From first inquiry to final delivery or recycling, one team coordinates every stage of your transaction.",
    color: TEAL,
  },
]

export const regions = [
  {
    region: "South Asia",
    detail: "Bangladesh · India · Pakistan · Sri Lanka",
    color: OCEAN,
  },
  {
    region: "Middle East",
    detail: "UAE · Saudi Arabia · Kuwait · Oman",
    color: TEAL,
  },
  {
    region: "East Asia",
    detail: "China · Japan · South Korea · Taiwan",
    color: "var(--accent-cyan)",
  },
  {
    region: "Europe",
    detail: "Greece · Turkey · Germany · Norway",
    color: "var(--accent-purple)",
  },
  {
    region: "Southeast Asia",
    detail: "Singapore · Malaysia · Philippines",
    color: OCEAN,
  },
  {
    region: "Americas",
    detail: "USA · Panama · Brazil · Canada",
    color: "var(--accent-emerald)",
  },
]
