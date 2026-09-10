import type { EShipeContent } from "../content/en"
type Listings = EShipeContent["listings"]
type Vessel = Listings["vessels"][number]
interface VesselCardProps {
  vessel: Vessel
  c: Listings
  onOpen: () => void
}

export default function VesselCard({ vessel, c, onOpen }: VesselCardProps) {
  const isScrap = vessel.condition === "Scrap"
  const specs = [vessel.flag, vessel.dwt, vessel.year]
  return (
    <div
      className="rounded-2xl flex flex-col overflow-hidden transition-all duration-300"
      style={{
        background: "var(--fill-1)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ height: 160, background: "var(--s3)" }}
      >
        <img
          src={c.illustrativeImage}
          alt={c.illustrativeAlt} loading="lazy" decoding="async" width="800" height="400"
          className="w-full h-full object-cover"
          style={{ opacity: 0.85 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 30%, rgba(3,8,16,0.88) 100%)",
          }}
        />
        <span
          className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
          style={{
            background: isScrap
              ? "rgba(239,68,68,0.85)"
              : "rgba(52,211,153,0.85)",
            color: "var(--fg)",
          }}
        >
          {c.activityOptions.find((o) => o.value === vessel.status)?.label ?? vessel.status}
        </span>
        <div className="absolute bottom-3 left-4">
          <div className="text-white font-semibold text-sm">
            {c.example.replace("{type}", vessel.type)}
          </div>
          <div className="text-slate-400 text-xs">{vessel.type}</div>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="space-y-2 mb-4 flex-1">
          {c.specs.map((spec, index) => (
            <div key={spec.label} className="flex items-center justify-between">
              <span className="text-slate-500 text-xs">{spec.label}</span>
              <span className="text-slate-300 text-xs font-medium">
                {specs[index]}
              </span>
            </div>
          ))}
        </div>
        <div className="h-px mb-4" style={{ background: "var(--fill-2)" }} />
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-slate-500">{c.price}</span>
          <span
            className="font-display text-lg font-semibold"
            style={{ color: vessel.color }}
          >
            {c.onEnquiry}
          </span>
        </div>
        <button type="button" onClick={onOpen}
          className="block text-center py-2 rounded-lg text-xs font-semibold"
          style={{
            background: `color-mix(in srgb, ${vessel.color} 8%, transparent)`,
            color: vessel.color,
          }}
        >
          {c.details}
        </button>
      </div>
    </div>
  )
}
