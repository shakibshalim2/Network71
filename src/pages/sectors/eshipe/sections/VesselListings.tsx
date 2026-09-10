import VesselCard from "./VesselCard"
import VesselDetail from "./VesselDetail"
import { useState } from "react"

import type { EShipeContent } from "../content/en"

import { BG_ALT, OCEAN } from "../theme"
import {
  safeContentUrl,
  textField,
  usePublicContent,
  type PublishedPage,
} from "@/lib/publicContent"

type Listings = EShipeContent["listings"]

export type Vessel = Listings["vessels"][number] & {
  image?: string
  published?: boolean
  classification?: string
  dimensions?: string
  engine?: string
  survey?: string
  sellerName?: string
  sellerCompany?: string
  sellerLocation?: string
  sellerProfile?: string
  sellerStatus?: string
  sellerUrl?: string
}

export default function VesselListings({ c }: { c: Listings }) {
  const { data: vesselPage } = usePublicContent<PublishedPage>("vessels?page=1")
  const { data: sellerPage } = usePublicContent<PublishedPage>("sellers?page=1")
  const [selected, setSelected] = useState<Vessel | null>(null)
  const [query, setQuery] = useState("")

  const [typeFilter, setTypeFilter] = useState("All Types")

  const [activityFilter, setActivityFilter] = useState("All")

  const publishedVessels: Vessel[] = (vesselPage?.items || []).map((item) => {
    const seller = (sellerPage?.items || []).find(
      (candidate) => candidate.slug === textField(item, "seller_slug"),
    )
    const condition =
      textField(item, "condition") === "Scrap" ? "Scrap" : "Trading"
    return {
      name: textField(item, "title"),
      type: textField(item, "vessel_type"),
      filterType: textField(item, "filter_type"),
      flag: textField(item, "flag"),
      dwt: textField(item, "capacity"),
      year: textField(item, "built_year"),
      price: textField(item, "price"),
      status: textField(item, "activity"),
      condition,
      color: condition === "Scrap" ? "var(--accent-red)" : OCEAN,
      image: safeContentUrl(textField(item, "image")),
      published: true,
      classification: textField(item, "classification"),
      dimensions: textField(item, "dimensions"),
      engine: textField(item, "engine"),
      survey: textField(item, "survey_summary"),
      sellerName: seller ? textField(seller, "title") : "",
      sellerCompany: seller ? textField(seller, "company") : "",
      sellerLocation: seller ? textField(seller, "location") : "",
      sellerProfile: seller ? textField(seller, "profile") : "",
      sellerStatus: seller ? textField(seller, "verification_status") : "",
      sellerUrl: seller ? safeContentUrl(textField(seller, "url")) : undefined,
    }
  })
  const vessels: Vessel[] = publishedVessels.length
    ? publishedVessels
    : c.vessels
  const filtered = vessels.filter((vessel) => {
    const q = query.trim().toLowerCase()

    return (
      (!q ||
        vessel.name.toLowerCase().includes(q) ||
        vessel.type.toLowerCase().includes(q) ||
        vessel.flag.toLowerCase().includes(q)) &&
      (typeFilter === "All Types" ||
        (typeFilter === "Scrap"
          ? vessel.condition === "Scrap"
          : vessel.filterType

              .toLowerCase()

              .includes(typeFilter.toLowerCase()))) &&
      (activityFilter === "All" || vessel.status === activityFilter)
    )
  })

  const active = query || typeFilter !== "All Types" || activityFilter !== "All"

  const reset = () => {
    setQuery("")

    setTypeFilter("All Types")

    setActivityFilter("All")
  }

  return (
    <section
      id="listings"
      className="py-24 relative overflow-hidden"
      style={{ background: BG_ALT }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-16">
          <span
            className="font-mono text-[9px] tracking-[0.35em] uppercase"
            style={{ color: OCEAN }}
          >
            {c.eyebrow}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-5 mb-4">
            {c.title}
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            {c.description}
          </p>
        </header>
        <div
          className="rounded-2xl p-5 mb-10"
          style={{
            background: `color-mix(in srgb, ${OCEAN} 3%, transparent)`,

            border: `1px solid color-mix(in srgb, ${OCEAN} 13%, transparent)`,
          }}
        >
          <div
            className="font-mono text-[10px] tracking-widest uppercase mb-4"
            style={{ color: OCEAN }}
          >
            {c.searchLabel}
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={c.placeholder}
              className="flex-1 min-w-[200px] px-4 py-2.5 rounded-lg text-sm text-white placeholder:text-slate-600 outline-none"
              style={{
                background: "var(--fill-2)",

                border: "var(--border-subtle)",
              }}
            />
            <select
              aria-label={c.typeLabel}
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="px-4 py-2.5 rounded-lg text-sm text-slate-300 outline-none"
              style={{ background: "var(--fill-2)" }}
            >
              {c.typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              aria-label={c.activityLabel}
              value={activityFilter}
              onChange={(event) => setActivityFilter(event.target.value)}
              className="px-4 py-2.5 rounded-lg text-sm text-slate-300 outline-none"
              style={{ background: "var(--fill-2)" }}
            >
              {c.activityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {active && (
              <button
                onClick={reset}
                className="px-4 py-2.5 rounded-lg text-sm text-slate-400"
              >
                {c.clear}
              </button>
            )}
          </div>
          {active && (
            <div className="mt-3 text-xs text-slate-500">
              {filtered.length === 0
                ? c.noFilters
                : c.showing

                    .replace("{shown}", String(filtered.length))

                    .replace("{total}", String(vessels.length))}
            </div>
          )}
        </div>
        {filtered.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((vessel) => (
              <VesselCard
                key={vessel.name}
                vessel={vessel}
                c={c}
                onOpen={() => setSelected(vessel)}
              />
            ))}
          </div>
        ) : (
          <div
            className="py-20 text-center rounded-2xl"
            style={{
              background: "var(--fill-1)",

              border: "var(--border-subtle)",
            }}
          >
            <div className="text-3xl mb-4">⚓</div>
            <div className="text-white font-semibold text-sm mb-2">
              {c.noSearch}
            </div>
            <div className="text-slate-500 text-xs mb-6">{c.noSearchDesc}</div>
            <button
              onClick={reset}
              className="px-5 py-2 rounded-lg text-xs font-semibold"
              style={{ background: OCEAN, color: "var(--s0)" }}
            >
              {c.reset}
            </button>
          </div>
        )}
      </div>
      {selected && (
        <VesselDetail
          vessel={selected}
          c={c}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
