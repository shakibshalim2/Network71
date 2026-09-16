import { motion } from "motion/react"
import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"
import Magnetic from "@/components/motion/Magnetic"
import CountUp from "@/components/motion/CountUp"
import { HeroCopy, HeroMark, useSectorHero } from "@/components/sector/HeroMotion"

export default function Hero({ c }: { c: AgricultureContent["hero"] }) {
  const { ref, y, opacity, sideOpacity } = useSectorHero()
  return (
    <section
      ref={ref}
      className="force-dark sector-hero shero relative min-h-screen flex items-center overflow-hidden"
      style={{ ["--pa" as string]: GREEN }}
    >
      <div className="absolute inset-0">
        <img decoding="async"
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
        {/* Organic curve overlay — breathes slowly like a field in wind */}
        <svg
          className="absolute bottom-0 left-0 w-full shero__wave"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ height: 80 }}
          aria-hidden="true"
        >
          <path
            d="M0,80 C360,0 1080,80 1440,20 L1440,80 Z"
            fill="rgb(10,18,35)"
          />
        </svg>
      </div>

      <HeroMark>02</HeroMark>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <HeroCopy className="max-w-2xl" y={y} opacity={opacity}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 shero__rule" style={{ background: GREEN }} />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
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
            <Magnetic strength={10}>
              <a
                href="#sector-contact"
                className="btn btn-primary shero__cta"
                style={{ background: GREEN, color: "var(--s0)" }}
              >
                {c.primaryCta}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={8}>
              <a href="#crop-portfolio" className="btn btn-secondary shero__cta--ghost">
                {c.secondaryCta}
              </a>
            </Magnetic>
          </div>
        </HeroCopy>
      </div>

      {/* Floating stat plate — glass, accent hairline, ring draws in */}
      <motion.div
        className="shero__stat hidden lg:flex"
        style={{ opacity: sideOpacity }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <span className="font-display shero__stat-val" style={{ color: GREEN }}>
          <CountUp value={c.stat} />
        </span>
        <span className="shero__stat-label">{c.statLabel}</span>
        <span className="shero__stat-sub font-mono">{c.statDescription}</span>
      </motion.div>
    </section>
  )
}
