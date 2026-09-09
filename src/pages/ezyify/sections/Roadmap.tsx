import { BG, SURFACE } from "../theme"
import type { EzyifyContent } from "../content/en"

export default function Roadmap({ c }: { c: EzyifyContent["revenue"] }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "var(--s2)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-4">
            {c.eyebrow}
          </p>
          <h2 className="font-display text-4xl text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{c.lead}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Revenue stream cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {c.items.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
                style={{ backgroundColor: SURFACE }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-lg`}
                  >
                    {r.icon}
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-slate-400 font-medium">
                    {r.tag}
                  </span>
                </div>
                <h3 className="font-display text-white font-semibold text-sm mb-2">
                  {r.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Donut chart placeholder */}
          <div className="lg:col-span-2 flex flex-col items-center gap-6">
            <div className="relative w-52 h-52">
              {/* CSS concentric ring approximation of a donut chart */}
              <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                {/* Background ring */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="24"
                />
                {/* Purple — 40% */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="var(--accent-purple)"
                  strokeWidth="24"
                  strokeDasharray={`${40 * 3.77} ${100 * 3.77}`}
                  strokeDashoffset="0"
                  strokeLinecap="butt"
                />
                {/* Pink — 30% */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="var(--accent-pink)"
                  strokeWidth="24"
                  strokeDasharray={`${30 * 3.77} ${100 * 3.77}`}
                  strokeDashoffset={`${-(40 * 3.77)}`}
                  strokeLinecap="butt"
                />
                {/* Cyan — 20% */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="24"
                  strokeDasharray={`${20 * 3.77} ${100 * 3.77}`}
                  strokeDashoffset={`${-(70 * 3.77)}`}
                  strokeLinecap="butt"
                />
                {/* Amber — 10% */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="var(--accent-amber)"
                  strokeWidth="24"
                  strokeDasharray={`${10 * 3.77} ${100 * 3.77}`}
                  strokeDashoffset={`${-(90 * 3.77)}`}
                  strokeLinecap="butt"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white font-bold text-lg font-display">
                  4
                </span>
                <span className="text-slate-500 text-[10px]">{c.streams}</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 w-full max-w-[200px]">
              {c.items.map((r) => (
                <div key={r.title} className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: r.donutColor }}
                  />
                  <span className="text-slate-400 text-xs">{r.title}</span>
                  <span className="ml-auto text-slate-500 text-xs font-mono">
                    {r.share}%
                  </span>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-[10px] text-center">{c.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
