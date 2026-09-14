import type { EShipeContent } from "../content/en"
import { BG_ALT, OCEAN } from "../theme"

export default function GlobalReach({ c }: { c: EShipeContent["reach"] }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <i className="h-px w-10" style={{ background: OCEAN }} />
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: OCEAN }}
              >
                {c.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {c.title}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {c.description}
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">{c.note}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {c.regions.map((region) => (
              <article
                key={region.region}
                className="p-5 rounded-xl"
                style={{
                  background: "var(--fill-1)",
                  border: "var(--border-subtle)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ background: region.color }}
                />
                <h3 className="text-white font-semibold text-sm mb-1.5">
                  {region.region}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {region.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
