import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"
import { icons } from "../icons"

export default function Products({
  c,
}: {
  c: GarmentsContent['products']
}) {
  return (
    <section className="py-24 bg-surface-1">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: ACCENT }}
              >
                {c.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight">
              {c.title1}
              <br />
              {c.title2}
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs lg:max-w-sm lg:text-right">
            {c.lead}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.categories.map((cat) => (
            <div
              key={cat.name}
              className="group p-7 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1 cursor-default"
              style={{
                background: `color-mix(in srgb, ${ACCENT} 2%, transparent)`,
                borderColor: `color-mix(in srgb, ${ACCENT} 13%, transparent)`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                style={{
                  color: ACCENT,
                  background: `color-mix(in srgb, ${ACCENT} 7%, transparent)`,
                }}
              >
                {icons[cat.iconId]}
              </div>
              <h3 className="font-display text-lg text-fg mb-2">{cat.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {cat.desc}
              </p>
              <div
                className="mt-5 h-px"
                style={{
                  background: `color-mix(in srgb, ${ACCENT} 15%, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
