import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

export default function Hero({ c }: { c: AgricultureContent["hero"] }) {
  return (
    <section className="force-dark sector-hero relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={c.imageUrl}
          alt={c.imageAlt}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,18,35,0.95) 0%, rgba(10,18,35,0.75) 55%, rgba(10,18,35,0.40) 100%)",
          }}
        />
        {/* Organic curve overlay */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ height: 80 }}
        >
          <path
            d="M0,80 C360,0 1080,80 1440,20 L1440,80 Z"
            fill="rgb(10,18,35)"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="h-px w-10"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
            <span
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
              style={{ color: GREEN }}
            >
              {c.eyebrow}
            </span>
          </div>
          <h1 className="font-display text-5xl lg:text-7xl text-white leading-tight tracking-[-0.02em] mb-6">
            {c.title}
            <br />
            <span style={{ color: GREEN }}>{c.subtitle}</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl">
            {c.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#sector-contact"
              className="px-8 py-3.5 font-bold text-sm text-fg rounded-lg transition-all hover:opacity-90 shadow-lg"
              style={{ background: GREEN, color: "var(--s0)" }}
            >
              {c.primaryCta}
            </a>
            <a
              href="#crop-portfolio"
              className="px-8 py-3.5 border border-white/25 text-white text-sm font-medium rounded-lg hover:bg-white/8 transition-colors"
            >
              {c.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      {/* Floating stat badge */}
      <div
        className="absolute bottom-16 right-8 lg:right-16 hidden lg:flex flex-col items-center gap-1 px-6 py-4 rounded-2xl border backdrop-blur-md"
        style={{
          borderColor: `color-mix(in srgb, ${GREEN} 25%, transparent)`,
          background: "rgba(10,18,35,0.75)",
        }}
      >
        <span className="font-display text-3xl" style={{ color: GREEN }}>
          {c.stat}
        </span>
        <span className="text-white text-xs font-semibold tracking-wide">
          {c.statLabel}
        </span>
        <span className="text-slate-500 text-[10px]">{c.statDescription}</span>
      </div>
    </section>
  )
}
