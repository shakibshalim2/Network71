import { BG, SURFACE } from "../theme"
import type { EzyifyContent } from "../content/en"

export default function AI({ c }: { c: EzyifyContent["segments"] }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: BG }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">
            {c.eyebrow}
          </p>
          <h2 className="font-display text-4xl text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{c.lead}</p>
        </div>

        {/* Three market metric cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-14">
          {/* TAM */}
          <div
            className="rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors"
            style={{ backgroundColor: SURFACE }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-xl mb-5">
              🌐
            </div>
            <div
              className="font-display text-4xl font-bold mb-2"
              style={{
                background: "linear-gradient(135deg, #A855F7, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              $500M+
            </div>
            <h3 className="font-display text-white font-semibold text-lg mb-2">
              {c.tam}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {c.marketLead}
            </p>
          </div>

          {/* Target Markets */}
          <div
            className="rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors"
            style={{ backgroundColor: SURFACE }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-xl mb-5">
              🗺️
            </div>
            <div
              className="font-display text-4xl font-bold mb-2"
              style={{
                background: "linear-gradient(135deg, #EC4899, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {c.regions}
            </div>
            <h3 className="font-display text-white font-semibold text-lg mb-3">
              {c.markets}
            </h3>
            <div className="space-y-2">
              {c.regionList.map((m) => (
                <div
                  key={m}
                  className="flex items-center gap-2.5 text-sm text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />
                  {m}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div
            className="rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors"
            style={{ backgroundColor: SURFACE }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-xl mb-5">
              🚀
            </div>
            <div
              className="font-display text-4xl font-bold mb-2"
              style={{
                background: "linear-gradient(135deg, #06B6D4, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              2025–2026
            </div>
            <h3 className="font-display text-white font-semibold text-lg mb-2">
              {c.timeline}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {c.timelineLead}
            </p>
          </div>
        </div>

        {/* Pull-quote */}
        <div
          className="rounded-2xl p-8 border text-center"
          style={{
            backgroundColor: "rgba(124,58,237,0.06)",
            borderColor: "rgba(168,85,247,0.2)",
          }}
        >
          <p className="text-white text-lg font-light leading-relaxed max-w-3xl mx-auto">
            &ldquo;{c.quote}&rdquo;
          </p>
          <p className="text-purple-400 text-sm font-semibold mt-4">
            {c.vision}
          </p>
        </div>
      </div>
    </section>
  )
}
