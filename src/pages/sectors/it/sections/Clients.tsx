import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function Clients({ c }: { c: ITContent }) {
  return (
    <section className="py-24" style={{ background: BG_DEEP }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px w-8"
              style={{ background: ACCENT, color: "var(--s0)" }}
            />
            <span
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
              style={{ color: ACCENT }}
            >
              {c.copy.Clients.eyebrow}
            </span>
            <div className="h-px w-8" style={{ background: ACCENT }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
            {c.copy.Clients.title}
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            {c.copy.Clients.lead}
          </p>
        </div>

        <div className="relative">
          {/* central hub */}
          <div className="flex justify-center mb-10">
            <div
              className="px-8 py-5 rounded-2xl text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(34,211,238,0.1))",
                border: "1px solid rgba(168,85,247,0.35)",
                boxShadow: "0 0 60px rgba(168,85,247,0.15)",
              }}
            >
              <div
                className="font-display text-2xl mb-1"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {c.copy.Clients.ctaPrimary}
              </div>
              <div className="text-slate-400 text-xs">
                {c.copy.Clients.ctaSecondary}
              </div>
            </div>
          </div>

          {/* division cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.internalDivisions.map((d) => (
              <div
                key={d.name}
                className="p-5 rounded-xl flex items-start gap-4"
                style={{
                  background: "rgba(34,211,238,0.03)",
                  border: "1px solid rgba(34,211,238,0.1)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: ACCENT }}
                />
                <div>
                  <div className="text-white font-semibold text-sm mb-1">
                    {d.name}
                  </div>
                  <div className="text-slate-400 text-xs">{d.use}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
