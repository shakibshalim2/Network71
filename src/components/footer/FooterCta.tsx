import { useRef } from "react"
import { useDhakaTime } from "@/lib/useDhakaTime"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { useT } from "@/i18n"
import { EASE_OUT } from "@/lib/motion"
import Magnetic from "@/components/motion/Magnetic"

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}


/**
 * Closing signature: an oversized wordmark that reveals on scroll, the brand
 * statement as a three-line poem, and a live Dhaka clock — the footer reads
 * as a place, not a sitemap.
 */
export default function FooterCta() {
  const { t } = useT()
  const time = useDhakaTime()
  const lines = [t("about.title1"), t("about.title2"), t("about.title3")]
  const reduce = useReducedMotion()
  // Wordmark slides sideways with scroll so the footer reads as one long strip.
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const markX = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : "-6%", "0%"])

  return (
    <div className="foot-sig" ref={ref}>
      <div className="container-page foot-sig__inner">
        <motion.div
          className="foot-sig__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <div>
            <motion.p variants={rise} className="foot-sig__eyebrow">
              <span className="eyebrow-rule" />
              {t("footer.eyebrow")}
            </motion.p>
            <h2 className="foot-sig__poem font-display">
              {lines.map((line, i) => (
                <motion.span
                  key={line}
                  variants={rise}
                  className={`foot-sig__line foot-sig__line--${i}`}
                >
                  {line}
                </motion.span>
              ))}
            </h2>
          </div>

          <motion.div variants={rise} className="foot-sig__side">
            <p className="foot-sig__lead">{t("footer.lead")}</p>
            <div className="foot-sig__actions">
              <Magnetic strength={10}>
                <Link to="/contact" className="btn btn-primary">
                  {t("footer.ctaContact")}
                  <svg
                    fill="none"
                    viewBox="0 0 16 16"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8h10M8 3l5 5-5 5"
                    />
                  </svg>
                </Link>
              </Magnetic>
              <Magnetic strength={8}>
                <Link to="/about" className="btn btn-secondary">
                  {t("footer.ctaAbout")}
                </Link>
              </Magnetic>
            </div>
            <dl className="foot-sig__meta">
              <div>
                <dt>{t("hero.stat1.label")}</dt>
                <dd>
                  {t("hero.stat1.value")}{" "}
                  <span className="foot-sig__clock" aria-live="off">
                    {time}
                  </span>
                </dd>
              </div>
              <div>
                <dt>{t("hero.stat2.label")}</dt>
                <dd>{t("hero.stat2.value")}</dd>
              </div>
            </dl>
          </motion.div>
        </motion.div>
      </div>

      {/* Oversized wordmark — clipped at the bottom edge like a watermark */}
      <div className="foot-sig__mark" aria-hidden="true">
        <motion.span
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
          className="font-display"
          style={{ x: markX }}
        >
          Network71
        </motion.span>
      </div>
    </div>
  )
}
