import type { EShipeContent } from "../content/en"
import { BG_DEEP, OCEAN, TEAL } from "../theme"

export default function Hero({ c }: { c: EShipeContent["hero"] }) {
  return (
    <section
      className="sector-hero relative min-h-screen flex items-center overflow-hidden"
      style={{ background: BG_DEEP }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 65%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12" style={{ background: OCEAN }} />
            <span
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
              style={{ color: OCEAN }}
            >
              {c.eyebrow}
            </span>
          </div>
          <div className="mb-8 inline-flex">
            <div
              className="flex items-center gap-3 px-4 py-2 rounded-full"
              style={{
                border: `1px solid color-mix(in srgb, ${OCEAN} 21%, transparent)`,
                background: `color-mix(in srgb, ${OCEAN} 5%, transparent)`,
              }}
            >
              <span className="text-2xl">⚓</span>
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold"
                style={{ color: OCEAN }}
              >
                {c.badge}
              </span>
            </div>
          </div>
          <h1
            className="font-display leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
          >
            <span style={{ color: "var(--fg)" }}>{c.title}</span>
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${OCEAN} 0%, #38BDF8 50%, ${TEAL} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {c.titleAccent}
            </span>
          </h1>
          <p
            className="text-slate-300 leading-relaxed mb-12 max-w-2xl"
            style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
          >
            {c.description}
          </p>
          <div className="flex flex-wrap gap-4 mb-20">
            <a
              href="#listings"
              className="px-8 py-3.5 font-semibold text-sm rounded-lg transition-all hover:opacity-90"
              style={{ background: OCEAN, color: "var(--s0)" }}
            >
              {c.browse}
            </a>
            <a
              href="#sector-contact"
              className="px-8 py-3.5 border text-sm font-medium text-white rounded-lg hover:bg-white/5 transition-colors"
              style={{
                borderColor: `color-mix(in srgb, ${OCEAN} 31%, transparent)`,
              }}
            >
              {c.list}
            </a>
          </div>
          <div
            className="flex flex-wrap gap-12 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {c.metrics.map((metric) => (
              <div key={metric.label}>
                <div
                  className="font-display text-4xl mb-1"
                  style={{ color: OCEAN }}
                >
                  {metric.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-12 right-8 lg:right-16 hidden lg:block opacity-25"
        style={{
          fontFamily: "monospace",
          fontSize: "11px",
          color: OCEAN,
          lineHeight: 1.9,
        }}
      >
        {c.terminal.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
    </section>
  )
}
