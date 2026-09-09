import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

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
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
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

        {/* Data dashboard mockup */}
        <div
          className="rounded-2xl p-8 border"
          style={{
            background: "var(--fill-1)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
            <span className="text-white text-sm font-semibold">
              {c.dashboard.title}
            </span>
            <span
              className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                background: `color-mix(in srgb, ${GREEN} 13%, transparent)`,
                color: GREEN,
              }}
            >
              {c.dashboard.status}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {c.dashboard.metrics.map((d) => (
              <div
                key={d.label}
                className="p-4 rounded-xl"
                style={{ background: "var(--fill-2)" }}
              >
                <div className="font-display text-2xl text-white mb-1">
                  {d.val}
                </div>
                <div className="text-slate-500 text-[11px]">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
