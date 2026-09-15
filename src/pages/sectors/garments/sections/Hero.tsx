import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"
import Magnetic from "@/components/motion/Magnetic"

export default function Hero({
  c,
}: {
  c: GarmentsContent["hero"]
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  // Copy drifts up and fades as the hero scrolls out; the photo lags behind it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])
  const tagsOpacity = useTransform(scrollYProgress, [0, 0.4], [1, reduce ? 1 : 0])

  return (
    <section
      ref={ref}
      className="force-dark sector-hero shero relative min-h-screen flex items-center overflow-hidden"
      style={{ ["--pa" as string]: ACCENT }}
    >
      <div className="absolute inset-0">
        <img decoding="async"
          src={c.image}
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
        className="absolute inset-0 opacity-5 shero__grid"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Division numeral watermark */}
      <span className="shero__mark font-display" aria-hidden="true">01</span>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <motion.div className="max-w-3xl" style={{ y: copyY, opacity: copyOpacity }}>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 shero__rule" style={{ background: ACCENT }} />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: ACCENT }}
            >
              {c.eyebrow}
            </span>
          </div>

          <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.95] tracking-[-0.02em] mb-8">
            {c.title1}
            <br />
            <span className="shero__amp" style={{ color: ACCENT }}>&</span> {c.title2}
          </h1>

          <p className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-4 max-w-xl">
            {c.lead}
          </p>
          <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-xl">
            {c.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Magnetic strength={10}>
              <a
                href="#sector-contact"
                className="btn btn-primary shero__cta"
                style={{ background: ACCENT, color: "var(--s0)" }}
              >
                {c.ctaPrimary}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={8}>
              <a
                href="#overview"
                className="btn btn-secondary shero__cta--ghost"
              >
                {c.ctaSecondary}
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* Hero bottom tag ledger */}
        <motion.ul
          className="shero__tags hidden lg:flex"
          style={{ opacity: tagsOpacity }}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } } }}
        >
          {c.tags.map((tag, i) => (
            <motion.li
              key={tag}
              className="shero__tag"
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              <span className="shero__tag-idx font-mono">0{i + 1}</span>
              <span className="shero__tag-dot" style={{ background: ACCENT }} />
              <span className="shero__tag-label">{tag}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
