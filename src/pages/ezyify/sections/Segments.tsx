import { BG, SURFACE } from "../theme"
import type { EzyifyContent } from "../content/en"

export default function Segments({ c }: { c: EzyifyContent["ai"] }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: SURFACE }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-violet-400 text-xs font-semibold tracking-widest uppercase mb-4">
            {c.eyebrow}
          </p>
          <h2 className="font-display text-4xl text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {c.lead}
          </p>
        </div>

        {/* 50+ models callout */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex flex-col items-center gap-2 px-10 py-6 rounded-2xl border border-white/5"
            style={{ backgroundColor: BG }}
          >
            <span
              className="font-display text-5xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #A855F7, #EC4899, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              50+
            </span>
            <span className="text-white font-semibold text-sm">
              {c.modelTitle}
            </span>
            <span className="text-slate-500 text-xs text-center max-w-xs">
              {c.modelLead}
            </span>
          </div>
        </div>

        {/* AI model category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {c.models.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
              style={{ backgroundColor: BG }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-xl mb-4`}
              >
                {m.icon}
              </div>
              <h3 className="font-display text-white font-semibold text-base mb-1">
                {m.title}
              </h3>
              <p
                className="text-xs font-semibold mb-3"
                style={{
                  background: "linear-gradient(135deg, #A855F7, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Used for: {m.use}
              </p>
              <p
                className="text-slate-400 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: m.desc }}
              />
            </div>
          ))}
        </div>

        {/* Tech infrastructure badges */}
        <div className="text-center">
          <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-5">
            {c.stack}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {c.badges.map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 rounded-full border border-white/10 text-slate-300 text-sm font-medium"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
