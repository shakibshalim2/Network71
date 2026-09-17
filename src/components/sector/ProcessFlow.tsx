import { useEffect, useRef, useState } from "react"
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
  /** Optional small label above the heading; when set, `label` renders as a display H2. */
  eyebrow?: string
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
  eyebrow,
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
  // Horizontal only when each step has room (~170px); 7 steps need ~1280px.
  const minW = Math.max(1024, steps.length * 170 + 80)
  const [horizontal, setHorizontal] = useState(
    () => typeof window !== "undefined" && window.matchMedia(`(min-width: ${minW}px)`).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minW}px)`)
    const sync = () => setHorizontal(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [minW])
  const scaleX = useTransform(progress, (v) => (horizontal ? v : 1))
  const scaleY = useTransform(progress, (v) => (horizontal ? 1 : v))

  return (
    <section
      className="journey section-y"
      style={{ ["--journey-accent" as string]: accentHex }}
    >
      <div className="container-page" ref={ref}>
        <div className="journey__head">
          {eyebrow ? (
            <div>
              <p className="journey__eyebrow">
                <span className="eyebrow-rule" style={{ background: accentHex }} />
                {eyebrow}
              </p>
              <h2 className="journey__title font-display">{heading}</h2>
            </div>
          ) : (
            <p className="journey__eyebrow">
              <span className="eyebrow-rule" style={{ background: accentHex }} />
              {heading}
            </p>
          )}
          <span className="journey__count">
            {String(steps.length).padStart(2, "0")} {t("sector.process.steps")}
          </span>
        </div>

        <div className="journey__track" data-orient={horizontal ? "h" : "v"}>
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
