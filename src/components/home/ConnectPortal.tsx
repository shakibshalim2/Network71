import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { useT, type TKey } from "@/i18n"
import { useCompanySettings } from "@/lib/companySettings"
import AuroraCanvas from "@/components/AuroraCanvas"
import Magnetic from "@/components/motion/Magnetic"
import { EASE_OUT, springSoft } from "@/lib/motion"

const PATHS = [
  {
    key: "c1",
    hrefKey: "home.cta.c1.href" as TKey,
    hex: "#C8962A",
    accent: "var(--brand-bright)",
  },
  {
    key: "c2",
    hrefKey: "home.cta.c2.href" as TKey,
    hex: "#22D3EE",
    accent: "var(--accent-cyan)",
  },
  {
    key: "c3",
    hrefKey: "home.cta.c3.href" as TKey,
    hex: "#2DD4BF",
    accent: "var(--accent-teal)",
  },
] as const

/**
 * Closing "portal": a tabbed chooser instead of three equal cards. The chosen
 * path recolours the aurora backdrop and swaps the copy, so the section reads
 * as one conversation rather than a menu.
 */
export default function ConnectPortal() {
  const { t } = useT()
  const { generalEmail } = useCompanySettings()
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const active = PATHS[idx]

  return (
    <section className="portal force-dark section-y" id="connect">
      <AuroraCanvas
        key={active.hex}
        color={active.hex}
        secondary="#0D9488"
        intensity={0.85}
      />
      <div className="portal__grid" aria-hidden="true" />
      <div className="container-page portal__inner">
        <motion.p
          className="public-eyebrow portal__eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {t("cta.eyebrow")}
        </motion.p>
        <motion.h2
          className="portal__title font-display"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT }}
        >
          {t("cta.title")}
        </motion.h2>

        <div
          className="portal__tabs"
          role="tablist"
          aria-label={t("cta.eyebrow")}
        >
          {PATHS.map((p, i) => (
            <button
              key={p.key}
              role="tab"
              type="button"
              aria-selected={i === idx}
              className={`portal__tab${i === idx ? " is-active" : ""}`}
              style={{ ["--tab-accent" as string]: p.accent }}
              onClick={() => setIdx(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setIdx((idx + 1) % PATHS.length)
                if (e.key === "ArrowLeft") setIdx((idx - 1 + PATHS.length) % PATHS.length)
              }}
            >
              <span className="portal__tab-idx">0{i + 1}</span>
              <span className="portal__tab-label">
                {t(`cta.${p.key}.title` as TKey)}
              </span>
              {i === idx && (
                <motion.span
                  layoutId="portal-tab"
                  className="portal__tab-bg"
                  transition={springSoft}
                />
              )}
            </button>
          ))}
        </div>

        <div className="portal__panel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.key}
              className="portal__copy"
              initial={
                reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <p className="portal__desc">
                {t(`cta.${active.key}.desc` as TKey)}
              </p>
              <Magnetic strength={12}>
                <Link
                  to={t(active.hrefKey)}
                  className="btn btn-primary portal__cta"
                  style={{ background: active.accent }}
                >
                  {t(`cta.${active.key}.cta` as TKey)}
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
              </Magnetic>
            </motion.div>
          </AnimatePresence>

          <div className="portal__direct">
            <span className="portal__direct-label">{t("cta.direct")}</span>
            <a
              href={`mailto:${generalEmail}`}
              className="portal__email wrap-anywhere"
              style={{ ["--tab-accent" as string]: active.accent }}
            >
              <span className="portal__email-text">{generalEmail}</span>
              <span className="portal__email-line" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
