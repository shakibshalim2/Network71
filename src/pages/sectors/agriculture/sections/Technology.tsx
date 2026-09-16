import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"
import CountUp from "@/components/motion/CountUp"

// Decorative sparklines behind each metric (not data-bound).
const SPARKS = [
  "0,26 14,22 28,24 42,14 56,18 70,9 84,12 100,4",
  "0,20 14,24 28,16 42,19 56,10 70,14 84,6 100,8",
  "0,28 14,20 28,22 42,12 56,16 70,8 84,10 100,2",
  "0,18 14,22 28,12 42,16 56,8 70,12 84,4 100,6",
]

export default function Technology({
  c,
}: {
  c: AgricultureContent["technology"]
}) {
  return (
    <section className="py-24 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-8"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: GREEN }}
            >
              {c.eyebrow}
            </span>
            <div
              className="h-px w-8"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-4">
            {c.title}
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            {c.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {c.cards.map((t) => (
            <div
              key={t.title}
              className="p-7 rounded-2xl border transition-all duration-300 hover:border-green-500/30 group"
              style={{
                background: "var(--fill-1)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{
                  background: `color-mix(in srgb, ${GREEN} 9%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${GREEN} 19%, transparent)`,
                }}
              >
                {t.icon}
              </div>
              <h3 className="font-display text-xl text-white mb-3 leading-tight">
                {t.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Data dashboard — reads as live telemetry */}
        <div className="sdash" style={{ ["--pa" as string]: GREEN }}>
          <span className="sdash__scan" aria-hidden="true" />
          <div className="sdash__head">
            <span className="sdash__live" aria-hidden="true" />
            <span className="text-white text-sm font-semibold">{c.dashboard.title}</span>
            <span className="sdash__status font-mono">{c.dashboard.status}</span>
          </div>
          <div className="sdash__grid">
            {c.dashboard.metrics.map((d, i) => (
              <div key={d.label} className="sdash__cell" style={{ ["--i" as string]: i }}>
                <svg className="sdash__spark" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
                  <polyline pathLength="1" points={SPARKS[i % SPARKS.length]} />
                </svg>
                <div className="font-display text-2xl text-white mb-1 sdash__val"><CountUp value={d.val} /></div>
                <div className="text-slate-500 text-[11px] font-mono tracking-[0.08em] uppercase">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
