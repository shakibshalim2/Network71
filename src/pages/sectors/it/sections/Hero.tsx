import { Link } from "react-router-dom"
import { motion } from "motion/react"
import type { ITContent } from "../content/en"
import { ACCENT, BG_DEEP } from "../theme"
import Magnetic from "@/components/motion/Magnetic"
import CountUp from "@/components/motion/CountUp"
import Typewriter from "@/components/motion/Typewriter"
import { HeroCopy, HeroMark, useSectorHero } from "@/components/sector/HeroMotion"

export default function Hero({ c }: { c: ITContent }) {
  const { ref, y, opacity, sideOpacity } = useSectorHero()
  return (
    <section
      ref={ref}
      className="sector-hero shero it-hero relative min-h-screen flex items-center overflow-hidden"
      style={{ background: BG_DEEP, ["--pa" as string]: ACCENT }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`)
        e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`)
      }}
    >
      {/* dot grid — a pointer spotlight lights the dots near the cursor */}
      <div
        className="absolute inset-0 pointer-events-none it-hero__grid"
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

      <HeroMark>06</HeroMark>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <HeroCopy className="max-w-4xl" y={y} opacity={opacity}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 shero__rule" style={{ background: ACCENT }} />
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
            <span className="it-hero__word">
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
            <Magnetic strength={10}>
              <a href="#sector-contact" className="btn btn-primary shero__cta" style={{ background: ACCENT, color: "var(--s0)" }}>
                {c.copy.Hero.ctaPrimary}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </Magnetic>
            <Magnetic strength={8}>
              <Link to="/ezyify" className="btn btn-secondary shero__cta--ghost">
                {c.copy.Hero.ctaSecondary}
              </Link>
            </Magnetic>
          </div>

          {/* hero stats */}
          <motion.div
            className="it-hero__stats"
            initial="hidden" animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } } }}
          >
            {[
              { v: "3", l: "Product Platforms" },
              { v: "8", l: "Connected Divisions" },
              { v: "A–Z", l: "Product Delivery" },
            ].map((m, i) => (
              <motion.div key={m.l} className="it-hero__stat" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                <span className="it-hero__stat-idx font-mono">0{i + 1}</span>
                <div className="font-display text-4xl mb-1" style={{ color: ACCENT }}>
                  <CountUp value={m.v} />
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{m.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </HeroCopy>
      </div>

      {/* terminal — types itself out */}
      <motion.div className="it-term hidden lg:block" style={{ opacity: sideOpacity }} aria-hidden="true">
        <div className="it-term__bar"><span /><span /><span /></div>
        <Typewriter
          className="it-term__body"
          lines={[
            { text: c.copy.Hero.detailPrimary, color: ACCENT },
            { text: c.copy.Hero.detailSecondary, color: "var(--accent-emerald)" },
            { text: c.copy.Hero.detailTertiary, color: "var(--accent-emerald)" },
            { text: c.copy.Hero.footnote, color: "var(--accent-emerald)" },
            { text: c.copy.Hero.status, color: ACCENT },
          ]}
        />
      </motion.div>
    </section>
  )
}
