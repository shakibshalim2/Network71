import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"
import Magnetic from "@/components/motion/Magnetic"

export default function Facilities({
  c,
}: {
  c: GarmentsContent['facilities']
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  // Three plates drift at different rates so the gallery has depth on scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40])
  const y2 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 70, reduce ? 0 : -30])
  const y3 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 20, reduce ? 0 : -60])
  return (
    <section ref={ref} className="py-24 bg-surface-2 overflow-hidden sfac" style={{ ["--pa" as string]: ACCENT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: ACCENT }}
              >
                {c.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">
              {c.title1}
              <br />
              {c.title2}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              {c.lead}
            </p>

            {/* Facility stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {c.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border border-slate-100 text-center bg-surface-1"
                >
                  <div
                    className="font-display text-xl text-fg mb-1"
                    style={{ color: ACCENT }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-fg text-[11px] font-semibold mb-0.5">
                    {stat.label}
                  </div>
                  <div className="text-slate-400 text-[10px]">{stat.sub}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 italic mb-6">
              {c.note}
            </p>
            <Magnetic strength={8}>
              <a href="#sector-contact" className="btn btn-secondary btn-sm">
                {c.deckCta}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                </svg>
              </a>
            </Magnetic>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 gap-3 sfac__gallery">
            <motion.figure className="col-span-2 sfac__plate h-56 sm:h-64" style={{ y: y1 }}>
              <img decoding="async" loading="lazy" src={c.images[0]} alt={c.alts[0]} />
              <figcaption className="font-mono">01 — {c.alts[0]}</figcaption>
            </motion.figure>
            <motion.figure className="sfac__plate h-44 sm:h-52" style={{ y: y2 }}>
              <img decoding="async" loading="lazy" src={c.images[1]} alt={c.alts[1]} />
              <figcaption className="font-mono">02 — {c.alts[1]}</figcaption>
            </motion.figure>
            <motion.figure className="sfac__plate h-44 sm:h-52" style={{ y: y3 }}>
              <img decoding="async" loading="lazy" src={c.images[2]} alt={c.alts[2]} />
              <figcaption className="font-mono">03 — {c.alts[2]}</figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  )
}
