import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function Roadmap({ c }: { c: ITContent }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: ACCENT }} />
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
            style={{ color: ACCENT }}
          >
            {c.copy.Roadmap.eyebrow}
          </span>
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-white mb-4 leading-tight">
          {c.copy.Roadmap.title}
        </h2>
        <p className="text-slate-400 text-sm mb-14 max-w-xl leading-relaxed">
          {c.copy.Roadmap.lead}
        </p>
        <div className="relative">
          {/* connector line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden lg:block"
            style={{
              background: `linear-gradient(to bottom, color-mix(in srgb, ${ACCENT} 38%, transparent), color-mix(in srgb, ${PURPLE} 25%, transparent), transparent)`,
            }}
          />
          <div className="space-y-6">
            {c.roadmapItems.map((item, i) => (
              <div
                key={item.year}
                className="grid lg:grid-cols-[4rem_1fr] gap-6 lg:gap-10 items-start"
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-center flex-shrink-0 relative z-10"
                    style={{
                      background:
                        i === 0
                          ? ACCENT
                          : `color-mix(in srgb, ${ACCENT} 8%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${ACCENT} 25%, transparent)`,
                      color: i === 0 ? BG_DEEP : ACCENT,
                    }}
                  >
                    <span className="font-display text-sm font-bold">
                      {item.year}
                    </span>
                  </div>
                </div>
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: "var(--fill-1)",
                    border: "var(--border-subtle)",
                  }}
                >
                  <h3 className="font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
