import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function Ezyify({ c }: { c: ITContent }) {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: "var(--s0)" }}
    >
      {/* strong glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.08) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
        }}
      />
      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(168,85,247,0.1) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* badge */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              border: "1px solid rgba(168,85,247,0.35)",
              background: "rgba(168,85,247,0.1)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#E6B800", boxShadow: "0 0 8px #E6B800" }}
            />
            <span className="text-[11px] text-slate-300 font-semibold tracking-[0.25em] uppercase">
              {c.copy.Ezyify.eyebrow}
            </span>
          </div>
        </div>

        {/* headline */}
        <div className="text-center mb-6">
          <h2
            className="font-display leading-tight"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              background:
                "linear-gradient(135deg, #a855f7 0%, #ec4899 40%, #22d3ee 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {c.copy.Ezyify.title}
          </h2>
          <p className="text-slate-300 text-xl mt-4 mb-3 font-light">
            {c.copy.Ezyify.lead}
          </p>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
            {c.copy.Ezyify.ctaPrimary}
          </p>
        </div>

        {/* ezyify stats */}
        <div
          className="flex flex-wrap justify-center gap-10 py-10 mb-10"
          style={{
            borderTop: "1px solid rgba(168,85,247,0.15)",
            borderBottom: "1px solid rgba(168,85,247,0.15)",
          }}
        >
          {c.ezyifyStats.map((s) => (
            <div key={s.l} className="text-center">
              <div
                className="font-display text-4xl mb-1"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.v}
              </div>
              <div className="text-white text-xs font-semibold">{s.l}</div>
              <div className="text-slate-600 text-[11px]">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {c.ezyifyFeatures.map((f) => (
            <div
              key={f.label}
              className="p-5 rounded-xl"
              style={{
                background: "rgba(168,85,247,0.06)",
                border: "1px solid rgba(168,85,247,0.18)",
              }}
            >
              <div
                className="text-xs font-bold mb-2"
                style={{ color: "#d8b4fe" }}
              >
                {f.label}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/ezyify"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              boxShadow: "0 0 40px rgba(124,58,237,0.35)",
            }}
          >
            {c.copy.Ezyify.ctaSecondary}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
          <a
            href="https://ezyify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:bg-white/5"
            style={{
              border: "1px solid rgba(168,85,247,0.4)",
              color: "#d8b4fe",
            }}
          >
            {c.copy.Ezyify.detailPrimary}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
