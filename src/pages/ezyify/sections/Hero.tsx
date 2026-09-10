import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { BG, SURFACE } from "../theme"
import type { EzyifyContent } from "../content/en"

export default function Hero({ c }: { c: EzyifyContent["hero"] }) {
  const heroRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    el.addEventListener("mousemove", handler)
    return () => el.removeEventListener("mousemove", handler)
  }, [])
  return (
    <section
      ref={heroRef}
      className="ezyify-page-hero relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[68px]"
      style={{ backgroundColor: BG }}
    >
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(167,139,250,0.2) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20"
        style={{
          background: "radial-gradient(circle, #a855f7, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15"
        style={{
          background: "radial-gradient(circle, #06b6d4, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[180px] opacity-10"
        style={{
          background: "radial-gradient(ellipse, #ec4899, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10"
          style={{
            border: "1px solid rgba(168,85,247,0.3)",
            background: "rgba(168,85,247,0.08)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-purple-400"
            style={{ animation: "pulse-slow 3s ease-in-out infinite" }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.16em] uppercase"
            style={{ color: "var(--accent-purple)" }}
          >
            {c.eyebrow}
          </span>
        </div>

        <h1
          className="font-display font-bold mb-5 leading-none tracking-[-0.02em]"
          style={{
            fontSize: "clamp(72px, 13vw, 130px)",
            background:
              "linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #06B6D4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {c.title}
        </h1>

        <p className="text-2xl sm:text-3xl text-white font-light mb-4 leading-snug">
          {c.subtitle}
          <br className="hidden sm:block" /> {c.subtitle2}
        </p>
        <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed mb-12">
          {c.lead}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <a
            href={c.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #EC4899, #0891B2)",
            }}
          >
            {c.visit}
          </a>
          <Link
            to="/investors"
            className="px-9 py-4 rounded-xl font-semibold text-slate-300 border border-white/15 hover:border-purple-500/40 hover:text-white transition-colors"
          >
            {c.invest}
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {c.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-5 border border-white/5 text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="font-display text-2xl sm:text-3xl font-bold mb-1"
                style={{
                  background: "linear-gradient(135deg, #A855F7, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div className="text-white text-xs font-semibold mb-0.5">
                {s.label}
              </div>
              <div className="text-slate-500 text-[10px]">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${SURFACE})`,
        }}
      />
    </section>
  )
}
