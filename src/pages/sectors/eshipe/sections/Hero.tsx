import { motion } from "motion/react"
import type { EShipeContent } from "../content/en"
import { BG_DEEP, OCEAN } from "../theme"
import Magnetic from "@/components/motion/Magnetic"
import Typewriter from "@/components/motion/Typewriter"
import { HeroCopy, HeroMark, useSectorHero } from "@/components/sector/HeroMotion"

export default function Hero({ c }: { c: EShipeContent["hero"] }) {
  const { ref, y, opacity, sideOpacity } = useSectorHero()
  return (
    <section
      ref={ref}
      className="sector-hero shero es-hero relative min-h-screen flex items-center overflow-hidden"
      style={{ background: BG_DEEP, ["--pa" as string]: OCEAN }}
    >
      {/* chart grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.7,
        }}
      />
      {/* radar sweep */}
      <div className="es-radar hidden lg:block" aria-hidden="true">
        <span className="es-radar__ring" /><span className="es-radar__ring" /><span className="es-radar__ring" />
        <span className="es-radar__sweep" />
        <span className="es-radar__blip" style={{ ["--x" as string]: "62%", ["--y" as string]: "38%", ["--d" as string]: "0s" }} />
        <span className="es-radar__blip" style={{ ["--x" as string]: "30%", ["--y" as string]: "58%", ["--d" as string]: "1.4s" }} />
        <span className="es-radar__blip" style={{ ["--x" as string]: "70%", ["--y" as string]: "72%", ["--d" as string]: "2.6s" }} />
      </div>
      {/* sea line — waves at the bottom */}
      <svg className="es-waves" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path className="es-waves__a" d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z" />
        <path className="es-waves__b" d="M0,80 C240,40 480,120 720,80 C960,40 1200,120 1440,80 L1440,120 L0,120 Z" />
      </svg>
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 65%)" }}
      />

      <HeroMark>10</HeroMark>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <HeroCopy className="max-w-4xl" y={y} opacity={opacity}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 shero__rule" style={{ background: OCEAN }} />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: OCEAN }}>
              {c.eyebrow}
            </span>
          </div>
          <div className="mb-8 inline-flex">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full es-badge">
              <span className="text-2xl es-badge__anchor">⚓</span>
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: OCEAN }}>
                {c.badge}
              </span>
            </div>
          </div>
          <h1 className="font-display leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
            <span style={{ color: "var(--fg)" }}>{c.title}</span>
            <br />
            <span className="es-hero__word">{c.titleAccent}</span>
          </h1>
          <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
            {c.description}
          </p>
          <div className="flex flex-wrap gap-4 mb-20">
            <Magnetic strength={10}>
              <a href="#listings" className="btn btn-primary shero__cta" style={{ background: OCEAN, color: "var(--s0)" }}>
                {c.browse}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </Magnetic>
            <Magnetic strength={8}>
              <a href="#sector-contact" className="btn btn-secondary shero__cta--ghost">{c.list}</a>
            </Magnetic>
          </div>
          <motion.div
            className="it-hero__stats"
            initial="hidden" animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } } }}
          >
            {c.metrics.map((metric, i) => (
              <motion.div key={metric.label} className="it-hero__stat" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                <span className="it-hero__stat-idx font-mono">0{i + 1}</span>
                <div className="font-display text-3xl mb-1" style={{ color: OCEAN }}>{metric.value}</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </HeroCopy>
      </div>

      <motion.div className="it-term hidden lg:block" style={{ opacity: sideOpacity }} aria-hidden="true">
        <div className="it-term__bar"><span /><span /><span /></div>
        <Typewriter
          className="it-term__body"
          lines={c.terminal.map((line, i) => ({ text: line, color: i === 0 ? OCEAN : "var(--accent-emerald)" }))}
        />
      </motion.div>
    </section>
  )
}
