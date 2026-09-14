import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function Services({ c }: { c: ITContent }) {
  return (
    <section className="py-24" style={{ background: BG_DEEP }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: ACCENT }} />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: ACCENT }}
            >
              {c.copy.Services.eyebrow}
            </span>
            <div className="h-px w-8" style={{ background: ACCENT }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
            {c.copy.Services.title}
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            {c.copy.Services.lead}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.servicePillars.map((s) => (
            <div
              key={s.title}
              className="group p-7 rounded-2xl cursor-default transition-all duration-300"
              style={{
                background: "var(--fill-1)",
                border: "var(--border-subtle)",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px rgba(34,211,238,0.15)`
                ;(e.currentTarget as HTMLDivElement).style.borderColor = `color-mix(in srgb, ${s.color} 25%, transparent)`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = "none"
                ;(e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(255,255,255,0.07)"
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-lg font-bold"
                style={{
                  background: `color-mix(in srgb, ${s.color} 8%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${s.color} 19%, transparent)`,
                  color: s.color,
                }}
              >
                {s.icon}
              </div>
              <h3 className="font-semibold text-white text-sm mb-3">
                {s.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
              <div
                className="mt-5 h-px w-8 transition-all duration-300 group-hover:w-16"
                style={{ background: s.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
