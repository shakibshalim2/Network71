import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"
import { icons } from "../icons"

export default function Manufacturing({
  c,
}: {
  c: GarmentsContent['manufacturing']
}) {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-10" style={{ background: ACCENT }} />
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
            style={{ color: ACCENT }}
          >
            {c.eyebrow}
          </span>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">
            {c.title1}
            <br />
            {c.title2}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed lg:pt-2">
            {c.lead}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {c.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-7 rounded-2xl group hover:-translate-y-1 transition-all"
              style={{
                background: "var(--fill-2)",
                border: "var(--border-subtle)",
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                style={{
                  color: ACCENT,
                  background: `color-mix(in srgb, ${ACCENT} 8%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${ACCENT} 15%, transparent)`,
                }}
              >
                {icons[pillar.iconId]}
              </div>
              <div
                className="text-[11px] font-bold tracking-[0.14em] mb-2"
                style={{ color: ACCENT }}
              >
                {pillar.abbr}
              </div>
              <h3 className="font-display text-lg text-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Production flow conveyor — one accent line draws through the stages */}
        <div className="mt-16 pt-12 border-t border-white/8 sflow" style={{ ["--pa" as string]: ACCENT }}>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase mb-8" style={{ color: "var(--fg-subtle)" }}>
            {c.flowLabel}
          </p>
          <ol className="sflow__track">
            <span className="sflow__line" aria-hidden="true" />
            {c.stages.map((stage, i, arr) => {
              const end = i === 0 || i === arr.length - 1
              return (
                <li key={stage} className={`sflow__stage${end ? " is-end" : ""}`} style={{ ["--i" as string]: i }}>
                  <span className="sflow__node" aria-hidden="true" />
                  <span className="sflow__label">{stage}</span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
