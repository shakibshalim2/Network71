import { useRef, useState, type PointerEvent } from "react"
import { Link } from "react-router-dom"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react"
import {
  useT,
  DIVISION_IDS,
  DIVISION_COLOR,
  DIVISION_HREF,
  divKey,
  type DivisionId,
  type TKey,
} from "@/i18n"
import { EASE_OUT, springSoft } from "@/lib/motion"

const IMAGE_KEY = (id: DivisionId) => `home.divisions.${id}.image` as TKey
const ORDER: DivisionId[] = [
  ...DIVISION_IDS.filter((id) => id !== "ezyify"),
  "ezyify",
]

/**
 * Editorial index of the ten divisions. Desktop: a numbered list where the
 * hovered row expands and a floating preview card follows the cursor.
 * Mobile: horizontal "dossier" snap rail with tall numbered cards.
 */
export default function DivisionsIndex() {
  const { t } = useT()
  const reduce = useReducedMotion()
  const [active, setActive] = useState<DivisionId>(ORDER[0])
  const [hovering, setHovering] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  // Preview card tracks the pointer with a spring so it lags a touch behind.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 260, damping: 32, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 260, damping: 32, mass: 0.6 })

  const point = (e: PointerEvent<HTMLDivElement>) => {
    const rect = listRef.current?.getBoundingClientRect()
    if (!rect) return null
    // Keep the card inside the list horizontally so it never covers the heading or clips the edge.
    const px = Math.min(Math.max(e.clientX - rect.left, 0), rect.width - 300)
    return { x: px, y: e.clientY - rect.top }
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const p = point(e)
    if (!p) return
    rawX.set(p.x)
    rawY.set(p.y)
  }
  const onEnter = (e: PointerEvent<HTMLDivElement>) => {
    const p = point(e)
    if (p) {
      x.jump(p.x)
      y.jump(p.y)
    }
    setHovering(true)
  }

  return (
    <section
      id="divisions"
      className="dix section-y"
      style={{ background: "var(--s0)" }}
    >
      <div className="container-page">
        <div className="dix__head">
          <div>
            <p className="dix__eyebrow">
              <span className="eyebrow-rule" />
              {t("divisions.eyebrow")}
              <span className="dix__count">10</span>
            </p>
            <h2 className="dix__title font-display">
              {t("divisions.title1")} <em>{t("divisions.title2")}</em>
            </h2>
          </div>
          <p className="dix__hint">{t("divisions.hint")}</p>
        </div>

        {/* ── Desktop numbered index ── */}
        <div
          ref={listRef}
          className="dix__list hidden md:block"
          onPointerMove={onMove}
          onPointerEnter={onEnter}
          onPointerLeave={() => setHovering(false)}
        >
          {ORDER.map((id, i) => {
            const isActive = active === id
            const color = DIVISION_COLOR[id]
            return (
              <Link
                key={id}
                to={DIVISION_HREF[id]}
                className={`dix__row${isActive ? " is-active" : ""}${
                  id === "ezyify" ? " is-flagship" : ""
                }`}
                style={{ ["--row-accent" as string]: color }}
                onPointerEnter={() => setActive(id)}
                onMouseEnter={() => setActive(id)}
                onFocus={() => setActive(id)}
              >
                <span className="dix__num font-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="dix__name font-display">
                  {t(divKey(id, "name"))}
                </span>
                <span className="dix__tag">{t(divKey(id, "tag"))}</span>
                <span className="dix__desc">{t(divKey(id, "card"))}</span>
                <span className="dix__arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M8 7h9v9"
                    />
                  </svg>
                </span>
                {isActive && (
                  <motion.span
                    layoutId="dix-bar"
                    className="dix__bar"
                    transition={springSoft}
                  />
                )}
              </Link>
            )
          })}

          {/* Floating preview */}
          <AnimatePresence>
            {hovering && !reduce && (
              <motion.div
                key="preview"
                className="dix__preview"
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0.86, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                transition={{ duration: 0.32, ease: EASE_OUT }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={active}
                    src={t(IMAGE_KEY(active))}
                    alt=""
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    draggable={false}
                  />
                </AnimatePresence>
                <span
                  className="dix__preview-label"
                  style={{ color: DIVISION_COLOR[active] }}
                >
                  {t(divKey(active, "tag"))}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Mobile dossier rail ── */}
        <div className="dix__rail no-scrollbar md:hidden">
          {ORDER.map((id, i) => (
            <Link
              key={id}
              to={DIVISION_HREF[id]}
              className={`dix__card force-dark${
                id === "ezyify" ? " is-flagship" : ""
              }`}
              style={{ ["--row-accent" as string]: DIVISION_COLOR[id] }}
            >
              <img
                src={t(IMAGE_KEY(id))}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <span className="dix__card-scrim" />
              <span className="dix__card-num font-display">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="dix__card-body">
                <span className="dix__card-tag">{t(divKey(id, "tag"))}</span>
                <span className="dix__card-name font-display">
                  {t(divKey(id, "name"))}
                </span>
                <span className="dix__card-desc">{t(divKey(id, "card"))}</span>
                <span className="dix__card-cta">
                  {t("divisions.explore")}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M8 7h9v9"
                    />
                  </svg>
                </span>
              </span>
            </Link>
          ))}
        </div>
        <div className="dix__rail-hint md:hidden" aria-hidden="true">
          <span />
          <span />
          <span />
          {t("divisions.swipe")}
        </div>
      </div>
    </section>
  )
}
