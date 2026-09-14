import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

export default function Markets({ c }: { c: AgricultureContent["markets"] }) {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-8"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: GREEN }}
            >
              {c.eyebrow}
            </span>
            <div
              className="h-px w-8"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-4">
            {c.title}
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            {c.description}
          </p>
        </div>

        {/* World region grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {c.items.map((m) => (
            <div
              key={m.region}
              className="p-5 rounded-2xl border transition-all hover:scale-[1.02] duration-200"
              style={{
                background: "var(--fill-1)",
                borderColor: `color-mix(in srgb, ${m.color} 19%, transparent)`,
              }}
            >
              <div className="text-3xl mb-3">{m.flag}</div>
              <div
                className="text-[11px] font-bold tracking-[0.14em] uppercase mb-1"
                style={{ color: m.color }}
              >
                {m.role}
              </div>
              <h3 className="font-display text-lg text-white mb-2">
                {m.region}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {m.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Simple SVG world strip */}
        <div className="mt-12 flex items-center justify-center gap-3 flex-wrap">
          {c.flags.map((flag, i) => (
            <span
              key={i}
              className="text-2xl grayscale hover:grayscale-0 transition-all duration-200 cursor-default"
              title={c.destinationMarketLabel}
            >
              {flag}
            </span>
          ))}
          <span className="text-slate-500 text-sm ml-2">{c.moreMarkets}</span>
        </div>
      </div>
    </section>
  )
}
