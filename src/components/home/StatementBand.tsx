import { useRef, type PointerEvent } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useVelocity, useSpring, useTransform, useReducedMotion } from "motion/react"
import { useT, type TKey } from "@/i18n"
import { EASE_OUT } from "@/lib/motion"

const VALUES = ["v1", "v2", "v3", "v4"] as const
const WORDS: TKey[] = ["about.title1", "about.title2", "about.title3"]

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

/**
 * Replaces the three-column About block with a kinetic statement band:
 * a slow marquee of the brand statement, one strong paragraph, and four
 * value cards lit by a pointer-tracking spotlight.
 */
export default function StatementBand() {
  const { t } = useT()
  const words = [...WORDS, ...WORDS, ...WORDS]
  const reduce = useReducedMotion()

  // Scroll velocity drives the marquee: faster scrolling speeds it up and
  // skews the words slightly in the scroll direction (Linear/Stripe move).
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { stiffness: 220, damping: 40, mass: 0.8 })
  const skew = useTransform(smooth, [-2400, 0, 2400], [-8, 0, 8])
  const rate = useTransform(smooth, (v) => `${Math.max(0.35, 1 - Math.min(Math.abs(v), 2400) / 3200)}`)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <section id="about" className="stmt">
      <motion.div
        className="stmt__marquee"
        aria-hidden="true"
        style={reduce ? undefined : { skewX: skew, ["--mq-rate" as string]: rate }}
      >
        <div className="stmt__marquee-track">
          {words.map((k, i) => (
            <span className="stmt__word" key={i}>
              {i % 3 === 1 ? <em>{t(k)}</em> : t(k)}
            </span>
          ))}
        </div>
        <div className="stmt__marquee-track">
          {words.map((k, i) => (
            <span className="stmt__word" key={`b${i}`}>
              {i % 3 === 1 ? <em>{t(k)}</em> : t(k)}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="container-page section-y">
        <div className="stmt__grid">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.p
              variants={rise}
              className="public-eyebrow"
              style={{ marginBottom: 22 }}
            >
              {t("footer.link.about")}
            </motion.p>
            <motion.p variants={rise} className="stmt__lead">
              <strong>Network71</strong>
              {t("about.lead").replace(/^Network71/, "")}
            </motion.p>
            <motion.div variants={rise} className="stmt__links">
              <Link to={t("home.about.href")} className="btn btn-secondary">
                {t("about.learnMore")}
              </Link>
              <Link to="/contact" className="btn btn-primary">
                {t("about.partner")}
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="stmt__values"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.09, delayChildren: 0.2 },
              },
            }}
          >
            {VALUES.map((k, i) => (
              <motion.div
                key={k}
                variants={rise}
                className="stmt__value"
                onPointerMove={onMove}
              >
                <span className="stmt__value-idx">0{i + 1}</span>
                <h3>{t(`about.${k}.title`)}</h3>
                <p>{t(`about.${k}.desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
