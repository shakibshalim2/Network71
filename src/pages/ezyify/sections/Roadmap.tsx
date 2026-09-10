import { Link } from "react-router-dom"
import { BG, SURFACE } from "../theme"
import type { EzyifyContent } from "../content/en"

export default function Roadmap({ c }: { c: EzyifyContent["roadmap"] }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: SURFACE }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">
            {c.eyebrow}
          </p>
          <h2 className="font-display text-4xl text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{c.lead}</p>
        </div>

        <div className="space-y-4">
          {c.phases.map((p, i) => (
            <div
              key={p.phase}
              className="flex gap-6 items-start p-6 rounded-2xl border transition-colors"
              style={{
                backgroundColor:
                  p.status === "completed" ? "rgba(124,58,237,0.08)" : BG,
                borderColor:
                  p.status === "completed"
                    ? "rgba(168,85,247,0.3)"
                    : p.status === "in-progress"
                      ? "rgba(236,72,153,0.3)"
                      : "rgba(255,255,255,0.06)",
              }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                  p.status === "completed"
                    ? "bg-purple-500 text-white"
                    : p.status === "in-progress"
                      ? "bg-pink-500 text-white"
                      : "bg-white/10 text-slate-400"
                }`}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-slate-500 text-xs font-medium">
                    {p.phase}
                  </span>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                      p.status === "completed"
                        ? "bg-purple-500/20 text-purple-300"
                        : p.status === "in-progress"
                          ? "bg-pink-500/20 text-pink-300 animate-pulse"
                          : "bg-white/5 text-slate-500"
                    }`}
                  >
                    {p.status === "completed"
                      ? "Completed"
                      : p.status === "in-progress"
                        ? "In Progress"
                        : "Upcoming"}
                  </span>
                </div>
                <div className="text-white font-semibold mb-1">{p.name}</div>
                <div className="text-slate-400 text-sm">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
