import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import { useT } from "@/i18n"
import { EASE_OUT } from "@/lib/motion"

interface Step {
  title: string
  desc: string
}

interface ProcessFlowProps {
  steps: Step[]
  accentHex: string
  label?: string
}

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

/**
 * Journey line: a single accent path that draws itself as the reader scrolls,
 * with each step lighting up as the line reaches it. Horizontal on desktop,
 * vertical on phones — the same scroll progress drives both.
 */
export default function ProcessFlow({
  steps,
  accentHex,
  label,
}: ProcessFlowProps) {
  const { t } = useT()
  const heading = label ?? t("sector.process.default")
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 45%"],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  })
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px)").matches
  const scaleX = useTransform(progress, (v) => (isDesktop ? v : 1))
  const scaleY = useTransform(progress, (v) => (isDesktop ? 1 : v))

  return (
    <section
      className="journey section-y"
      style={{ ["--journey-accent" as string]: accentHex }}
    >
      <div className="container-page" ref={ref}>
        <div className="journey__head">
          <p className="journey__eyebrow">
            <span className="eyebrow-rule" style={{ background: accentHex }} />
            {heading}
          </p>
          <span className="journey__count">
            {String(steps.length).padStart(2, "0")} {t("sector.process.steps")}
          </span>
        </div>

        <div className="journey__track">
          {/* Base + drawn line */}
          <span className="journey__line" aria-hidden="true" />
          <motion.span
            className="journey__line journey__line--fill"
            style={{ scaleX, scaleY }}
            aria-hidden="true"
          />

          <motion.ol
            className="journey__steps"
            style={{ ["--steps" as string]: steps.length }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {steps.map((step, i) => {
              const start = i / steps.length
              const opacity = useTransform(
                progress,
                [start, Math.min(start + 0.15, 1)],
                [0.35, 1],
              )
              const scale = useTransform(
                progress,
                [start, Math.min(start + 0.15, 1)],
                [0.7, 1],
              )
              return (
                <motion.li
                  key={i}
                  className="journey__step"
                  variants={rise}
                  style={{ opacity }}
                >
                  <motion.span
                    className="journey__node font-display"
                    style={{ scale }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                  <div className="journey__body">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </motion.li>
              )
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
