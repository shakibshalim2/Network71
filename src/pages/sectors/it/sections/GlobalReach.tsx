import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function GlobalReach({ c }: { c: ITContent }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="h-px w-10"
                style={{ background: ACCENT, color: "var(--s0)" }}
              />
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: ACCENT }}
              >
                {c.copy.GlobalReach.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {c.copy.GlobalReach.title}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {c.copy.GlobalReach.lead}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              {c.copy.GlobalReach.ctaPrimary}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {c.reachStats.map((s) => (
              <div
                key={s.label}
                className="p-6 rounded-xl text-center"
                style={{
                  background: "rgba(34,211,238,0.04)",
                  border: "1px solid rgba(34,211,238,0.12)",
                }}
              >
                <div className="text-2xl mb-3" style={{ color: ACCENT }}>
                  {s.icon}
                </div>
                <div className="font-display text-2xl text-white mb-1">
                  {s.value}
                </div>
                <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
