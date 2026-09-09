import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"
import { icons } from "../icons"

export default function Technology({
  c,
}: {
  c: GarmentsContent['technology']
}) {
  return (
    <section className="py-24 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span
                className="font-mono text-[9px] tracking-[0.35em] uppercase"
                style={{ color: ACCENT }}
              >
                {c.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">
              {c.title1}
              <br />
              {c.title2}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-slate-400 text-sm leading-relaxed">
              {c.lead}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {c.cards.map((card) => (
            <div
              key={card.title}
              className="p-8 rounded-2xl group hover:-translate-y-1 transition-all"
              style={{
                background: "var(--fill-2)",
                border: `1px solid color-mix(in srgb, ${ACCENT} 13%, transparent)`,
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{
                  color: ACCENT,
                  background: `color-mix(in srgb, ${ACCENT} 8%, transparent)`,
                }}
              >
                {icons[card.iconId]}
              </div>
              <h3 className="font-display text-xl text-white mb-3">
                {card.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Ezyify integration mention */}
        <div
          className="p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{
            background: `color-mix(in srgb, ${ACCENT} 6%, transparent)`,
            border: `1px solid color-mix(in srgb, ${ACCENT} 15%, transparent)`,
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
            style={{ background: ACCENT, color: "var(--s0)" }}
          >
            Ez
          </div>
          <div>
            <div className="text-white font-semibold text-sm mb-1">
              {c.integrationTitle}
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {c.integrationLead}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
