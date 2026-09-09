import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"

export default function Markets({
  c,
}: {
  c: GarmentsContent["markets"]
}) {
  return (
    <section className="py-24 bg-surface-1">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span
                className="font-mono text-[9px] tracking-[0.35em] uppercase"
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
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            {c.lead}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {c.markets.map((market) => (
            <div
              key={market.region}
              className="p-5 rounded-2xl bg-surface-2 border border-slate-100 hover:border-rose-100 hover:shadow-md transition-all text-center group"
            >
              <div className="text-3xl mb-3">{market.flag}</div>
              <h3 className="font-semibold text-fg text-sm mb-1">
                {market.region}
              </h3>
              <p className="text-slate-400 text-xs">{market.note}</p>
              {market.tier === "primary" && (
                <div
                  className="mt-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold inline-block"
                  style={{
                    background: `color-mix(in srgb, ${ACCENT} 7%, transparent)`,
                    color: ACCENT,
                  }}
                >
                  {c.primary}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-5 rounded-xl bg-surface-2 border border-slate-100 text-center">
          <p className="text-slate-400 text-sm">
            {c.additionalLabel}{" "}
            <span className="text-fg font-medium">{c.dataNote}</span> —
            {c.note}
          </p>
        </div>
      </div>
    </section>
  )
}
