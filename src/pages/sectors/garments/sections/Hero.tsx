import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"
import { useState } from "react"

export default function Hero({
  c,
}: {
  c: GarmentsContent["hero"]
}) {
  const [activeStat, setActiveStat] = useState(0)

  return (
    <section className="force-dark sector-hero relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=800&fit=crop&auto=format"
          alt={c.alt}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.75) 50%, rgba(10,15,30,0.55) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, color-mix(in srgb, ${ACCENT} 9%, transparent) 0%, transparent 40%)`,
          }}
        />
      </div>

      {/* Decorative grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12" style={{ background: ACCENT }} />
            <span
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
              style={{ color: ACCENT }}
            >
              {c.eyebrow}
            </span>
          </div>

          <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.95] tracking-[-0.02em] mb-8">
            {c.title1}
            <br />
            <span style={{ color: ACCENT }}>&</span> {c.title2}
          </h1>

          <p className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-4 max-w-xl">
            {c.lead}
          </p>
          <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-xl">
            {c.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#sector-contact"
              className="px-8 py-4 font-semibold text-sm text-white rounded-lg transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: ACCENT, color: "var(--s0)" }}
            >
              {c.ctaPrimary}
            </a>
            <a
              href="#overview"
              className="px-8 py-4 border border-white/25 text-white text-sm font-medium rounded-lg hover:bg-white/8 transition-all"
            >
              {c.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Hero bottom stat strip */}
        <div className="absolute bottom-10 right-8 hidden lg:flex items-center gap-8">
          {c.tags.map(
            (tag) => (
              <div key={tag} className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: ACCENT, color: "var(--s0)" }}
                />
                <span className="text-slate-400 text-xs tracking-wide">
                  {tag}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
