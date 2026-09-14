import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function Hero({ c }: { c: ITContent }) {
  return (
    <section
      className="sector-hero relative min-h-screen flex items-center overflow-hidden"
      style={{ background: BG_DEEP }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(34,211,238,0.12) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.6,
        }}
      />
      {/* ambient glows */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12" style={{ background: ACCENT }} />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: ACCENT }}
            >
              {c.copy.Hero.eyebrow}
            </span>
          </div>

          <h1
            className="font-display leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
          >
            <span style={{ color: "var(--fg)" }}>IT &amp; </span>
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #67e8f9 50%, ${ACCENT} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {c.copy.Hero.title}
            </span>
          </h1>

          <p
            className="text-slate-300 leading-relaxed mb-12 max-w-2xl"
            style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
          >
            {c.copy.Hero.lead}
          </p>

          <div className="flex flex-wrap gap-4 mb-20">
            <a
              href="#sector-contact"
              className="px-8 py-3.5 font-semibold text-sm rounded-lg transition-all hover:opacity-90"
              style={{ background: ACCENT, color: "var(--s0)" }}
            >
              {c.copy.Hero.ctaPrimary}
            </a>
            <Link
              to="/ezyify"
              className="px-8 py-3.5 border text-sm font-medium text-white rounded-lg hover:bg-white/5 transition-colors"
              style={{
                borderColor: `color-mix(in srgb, ${ACCENT} 31%, transparent)`,
              }}
            >
              {c.copy.Hero.ctaSecondary}
            </Link>
          </div>

          {/* hero stats */}
          <div
            className="flex flex-wrap gap-12 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { v: "3", l: "Product Platforms" },
              { v: "8", l: "Connected Divisions" },
              { v: "A–Z", l: "Product Delivery" },
            ].map((m) => (
              <div key={m.l}>
                <div
                  className="font-display text-4xl mb-1"
                  style={{ color: ACCENT }}
                >
                  {m.v}
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* terminal decoration */}
      <div
        className="absolute bottom-12 right-8 lg:right-16 hidden lg:block opacity-30"
        style={{
          fontFamily: "monospace",
          fontSize: "11px",
          color: ACCENT,
          lineHeight: 1.8,
        }}
      >
        <div>{c.copy.Hero.detailPrimary}</div>
        <div style={{ color: "var(--accent-emerald)" }}>
          {c.copy.Hero.detailSecondary}
        </div>
        <div style={{ color: "var(--accent-emerald)" }}>
          {c.copy.Hero.detailTertiary}
        </div>
        <div style={{ color: "var(--accent-emerald)" }}>
          {c.copy.Hero.footnote}
        </div>
        <div className="animate-pulse">{c.copy.Hero.status}</div>
      </div>
    </section>
  )
}
