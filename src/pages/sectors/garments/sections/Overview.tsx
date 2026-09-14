import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"

export default function Overview({
  c,
}: {
  c: GarmentsContent['overview']
}) {
  return (
    <section id="overview" className="py-24 bg-surface-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — rich text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: ACCENT }}
              >
                {c.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">
              {c.title1}
              <br />
              {c.title2}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              {c.p1}
            </p>
            <p className="text-slate-600 leading-relaxed mb-5">
              {c.p2}
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              {c.p3}
            </p>
            <div className="flex flex-wrap gap-3">
              {c.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border"
                  style={{
                    color: ACCENT,
                    borderColor: `color-mix(in srgb, ${ACCENT} 25%, transparent)`,
                    background: `color-mix(in srgb, ${ACCENT} 3%, transparent)`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — value pillars grid */}
          <div className="grid grid-cols-2 gap-4">
            {c.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl border border-slate-100 bg-surface-2 hover:border-rose-100 hover:shadow-lg transition-all group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform"
                  style={{
                    background: `color-mix(in srgb, ${ACCENT} 6%, transparent)`,
                  }}
                >
                  {pillar.icon}
                </div>
                <h3 className="font-display text-base text-fg mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
