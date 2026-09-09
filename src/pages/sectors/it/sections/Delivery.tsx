import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function Delivery({ c }: { c: ITContent }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-14">
          <div className="h-px w-10" style={{ background: ACCENT }} />
          <span
            className="font-mono text-[9px] tracking-[0.35em] uppercase"
            style={{ color: ACCENT }}
          >
            {c.copy.Delivery.eyebrow}
          </span>
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
          {c.copy.Delivery.title}
        </h2>
        <p className="text-slate-400 text-sm mb-14 max-w-xl leading-relaxed">
          {c.copy.Delivery.lead}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {c.deliveryModels.map((m) => (
            <div
              key={m.title}
              className="p-7 rounded-2xl"
              style={{
                background: "var(--fill-1)",
                border: `1px solid color-mix(in srgb, ${m.color} 15%, transparent)`,
              }}
            >
              <div className="text-2xl mb-5" style={{ color: m.color }}>
                {m.icon}
              </div>
              <h3 className="font-display text-xl text-white mb-5">
                {m.title}
              </h3>
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-xs">
                    {c.copy.Delivery.ctaPrimary}
                  </span>
                  <span className="text-white text-xs font-semibold">
                    {m.timeline}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-xs">
                    {c.copy.Delivery.ctaSecondary}
                  </span>
                  <span className="text-white text-xs font-semibold">
                    {m.teamSize}
                  </span>
                </div>
              </div>
              <div
                className="h-px mb-5"
                style={{
                  background: `color-mix(in srgb, ${m.color} 13%, transparent)`,
                }}
              />
              <p className="text-slate-400 text-xs leading-relaxed">
                {m.bestFor}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
