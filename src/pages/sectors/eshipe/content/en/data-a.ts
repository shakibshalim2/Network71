import { OCEAN, TEAL } from "../../theme"

export const serviceItems = [
  {
    icon: "⚓",
    title: "Buying Ships",
    desc:
      "Access a curated global marketplace of vessels across all categories — from cargo and tankers to " +
      "tugboats and offshore craft. Our team facilitates negotiations, due diligence, and documentation.",
    color: OCEAN,
  },
  {
    icon: "🔄",
    title: "Selling Ships",
    desc: "List your vessel for sale and reach qualified buyers across South Asia, the Gulf and beyond. We provide transparent pricing, market valuation, and full broker support through to contract completion.",
    color: TEAL,
  },
  {
    icon: "♻",
    title: "Ship Recycling",
    desc:
      "Responsible end-of-life ship recycling through yards that operate to Hong Kong Convention and IMO " +
      "guidelines, with EU Ship Recycling Regulation routing where required. Competitive LDT rates with full documentation.",
    color: "var(--accent-emerald)",
  },
  {
    icon: "🔍",
    title: "Inspection & Valuation",
    desc: "Independent vessel inspection and market valuation services performed by class-accredited marine surveyors. Full condition reports, survey documentation, and fair market value assessments.",
    color: "var(--accent-amber)",
  },
]

export const categoryItems = [
  {
    name: "Cargo Vessels",
    desc: "General cargo, multipurpose, break-bulk",
    color: OCEAN,
  },
  {
    name: "Bulk Carriers",
    desc: "Handysize, Supramax, Capesize",
    color: TEAL,
  },
  {
    name: "Tankers",
    desc: "Chemical, product, crude oil tankers",
    color: "var(--accent-teal)",
  },
  {
    name: "Container Ships",
    desc: "Feeder, sub-Panamax, Panamax",
    color: "var(--accent-cyan)",
  },
  {
    name: "Tugboats",
    desc: "Harbour, offshore, ocean-going tugs",
    color: "var(--accent-amber)",
  },
  {
    name: "Fishing Vessels",
    desc: "Trawlers, purse seiners, longliners",
    color: "var(--accent-emerald)",
  },
  {
    name: "Offshore Vessels",
    desc: "PSVs, AHTS, DSVs, survey vessels",
    color: "var(--accent-purple)",
  },
  {
    name: "Scrap / Demolition",
    desc: "Vessels at end-of-life for recycling",
    color: "var(--accent-red)",
  },
]

export const vessels = [
  {
    name: "MV Kalindi",
    type: "General Cargo",
    filterType: "Cargo",
    flag: "Bangladesh",
    dwt: "8,200 DWT",
    year: "2006",
    price: "On Request",
    status: "For Sale",
    condition: "Trading",
    color: OCEAN,
  },
  {
    name: "MV Oriental Star",
    type: "Bulk Carrier",
    filterType: "Bulk Carrier",
    flag: "Panama",
    dwt: "27,500 DWT",
    year: "2003",
    price: "$2.5M",
    status: "For Sale",
    condition: "Trading",
    color: TEAL,
  },
  {
    name: "MV Pacific Trader",
    type: "Container Vessel",
    filterType: "Container",
    flag: "Marshall Islands",
    dwt: "14,200 DWT",
    year: "1998",
    price: "$580 / LDT",
    status: "For Recycling",
    condition: "Scrap",
    color: "var(--accent-red)",
  },
  {
    name: "MT Crude Master",
    type: "Crude Oil Tanker",
    filterType: "Tanker",
    flag: "Liberia",
    dwt: "60,000 DWT",
    year: "1999",
    price: "$620 / LDT",
    status: "For Recycling",
    condition: "Scrap",
    color: "var(--accent-red)",
  },
  {
    name: "MV Sea Guardian",
    type: "Tugboat",
    filterType: "Tugboat",
    flag: "Singapore",
    dwt: "550 GT",
    year: "2010",
    price: "$450K",
    status: "For Sale",
    condition: "Trading",
    color: "var(--accent-amber)",
  },
  {
    name: "MV Atlantic Fisher",
    type: "Fishing Vessel",
    filterType: "Fishing",
    flag: "Spain",
    dwt: "1,200 GT",
    year: "2008",
    price: "€380K",
    status: "For Sale",
    condition: "Trading",
    color: "var(--accent-emerald)",
  },
]
