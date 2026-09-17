import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { DIVISION_COLOR, DIVISION_HREF, divKey, useT, type DivisionId } from "@/i18n"
import type { ProjectsContent } from "../content/en"
import { EASE_OUT } from "@/lib/motion"

/**
 * Work-types board: a division rail on the left, the selected division's
 * work types and typical hand-over on the right. Lets a visitor judge fit
 * even while public case studies are still sparse.
 */
export default function Capabilities({ c }: { c: ProjectsContent["capabilities"] }) {
  const { t } = useT()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const item = c.items[active]
  const id = item.id as DivisionId
  const color = DIVISION_COLOR[id]

  return (
    <section id="capabilities" className="section-y wcap" style={{ ["--pa" as string]: color }}>
      <div className="container-page">
        <div className="wcap__head">
          <div>
            <span className="public-eyebrow"><span className="eyebrow-rule" />{c.eyebrow}</span>
            <h2 className="font-display wcap__title">{c.title1}<br /><em>{c.title2}</em></h2>
          </div>
          <p className="wcap__lead">{c.lead}</p>
        </div>

        <div className="wcap__board">
          <ol className="wcap__rail" role="tablist">
            {c.items.map((it, i) => {
              const did = it.id as DivisionId
              const on = i === active
              return (
                <li key={it.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    className={`wcap__tab${on ? " is-on" : ""}`}
                    style={{ ["--dc" as string]: DIVISION_COLOR[did] }}
                    onClick={() => setActive(i)}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span className="wcap__tab-idx font-mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="wcap__tab-name">{t(divKey(did, "short"))}</span>
                    <i className="wcap__tab-dot" aria-hidden="true" />
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="wcap__panel" role="tabpanel">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                className="wcap__card"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <span className="wcap__ghost font-display" aria-hidden="true">{String(active + 1).padStart(2, "0")}</span>
                <h3 className="font-display wcap__name">{t(divKey(id, "name"))}</h3>
                <ul className="wcap__types">
                  {item.types.map((ty, i) => (
                    <motion.li
                      key={ty}
                      initial={reduce ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 + i * 0.06, ease: EASE_OUT }}
                    >
                      <i aria-hidden="true" />{ty}
                    </motion.li>
                  ))}
                </ul>
                <div className="wcap__handover">
                  <span className="font-mono">{c.handoverLabel}</span>
                  <p>{item.handover}</p>
                </div>
                <Link to={DIVISION_HREF[id]} className="wcap__link">
                  {t(divKey(id, "short"))}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="wcap__foot font-mono">{c.footnote}</p>
      </div>
    </section>
  )
}
