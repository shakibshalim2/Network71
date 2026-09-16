import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function Technology({ c }: { c: ITContent }) {
  return (
    <section className="py-24" style={{ background: BG_DEEP }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px w-8"
              style={{ background: ACCENT, color: "var(--s0)" }}
            />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: ACCENT }}
            >
              {c.copy.Technology.eyebrow}
            </span>
            <div className="h-px w-8" style={{ background: ACCENT }} />
          </div>
          <h2 className="font-display text-4xl text-white mb-3">
            {c.copy.Technology.title}
          </h2>
          <p className="text-slate-500 text-sm">{c.copy.Technology.lead}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {c.techBadges.map((t, i) => (
            <div
              key={t.name}
              className="group flex items-center gap-4 p-4 rounded-xl cursor-default it-badge"
              style={{
                background: "var(--fill-1)",
                border: "var(--border-subtle)",
                ["--pa" as string]: ACCENT,
                ["--i" as string]: i,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs"
                style={{
                  background: `color-mix(in srgb, ${ACCENT} 8%, transparent)`,
                  color: ACCENT,
                  border: `1px solid color-mix(in srgb, ${ACCENT} 15%, transparent)`,
                }}
              >
                {t.init}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{t.name}</div>
                <div
                  className="text-[10px] font-medium uppercase tracking-wider mt-0.5"
                  style={{ color: ACCENT }}
                >
                  {t.cat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
