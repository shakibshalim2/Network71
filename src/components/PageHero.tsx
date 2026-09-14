import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { EASE_OUT } from "@/lib/motion"
import AuroraCanvas from "@/components/AuroraCanvas"

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
}

interface Crumb {
  home: string
  current: string
}

interface PageHeroProps {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  /** Secondary line rendered between title and lead (e.g. a stats string). */
  kicker?: ReactNode
  breadcrumb?: Crumb
  /** `start` = editorial left-aligned (default); `center` = statement hero. */
  align?: "start" | "center"
  /** Accent colour for the eyebrow rule/label and glow. Defaults to brand gold. */
  accent?: string
  /** Hex colour for the WebGL aurora backdrop; defaults to brand gold. */
  auroraHex?: string
  /** Rendered beneath the lead — CTAs, chips, facts. */
  children?: ReactNode
  /** Rendered as a right-hand column on large screens (start alignment only). */
  aside?: ReactNode
  className?: string
}

/**
 * Shared hero for corporate pages. One rhythm, one type scale, one glow —
 * every page opens with the same confidence instead of four competing layouts.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  kicker,
  breadcrumb,
  align = "start",
  accent = "var(--brand-fg)",
  auroraHex = "#C8962A",
  children,
  aside,
  className = "",
}: PageHeroProps) {
  const centered = align === "center"
  return (
    <section
      className={`page-hero relative overflow-hidden ${className}`}
      data-align={align}
      style={{ ["--hero-accent" as string]: accent }}
    >
      <AuroraCanvas color={auroraHex} secondary="#0D9488" intensity={0.7} />
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="page-hero__orb page-hero__orb--a" aria-hidden="true" />
      <div className="page-hero__orb page-hero__orb--b" aria-hidden="true" />
      <div
        className={`relative container-page ${centered ? "text-center" : ""}`}
      >
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="page-hero__crumb">
            <Link to="/" className="tap-inline">
              {breadcrumb.home}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{breadcrumb.current}</span>
          </nav>
        )}
        <div
          className={
            aside
              ? "grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-10 lg:gap-16 items-start"
              : ""
          }
        >
          <motion.div
            className={centered ? "mx-auto max-w-3xl" : "max-w-3xl"}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
          >
            {eyebrow && (
              <motion.p
                variants={rise}
                className={`page-hero__eyebrow ${
                  centered ? "justify-center" : ""
                }`}
              >
                <span className="page-hero__rule" aria-hidden="true" />
                {eyebrow}
                {centered && (
                  <span className="page-hero__rule" aria-hidden="true" />
                )}
              </motion.p>
            )}
            <motion.h1
              variants={rise}
              className="page-hero__title font-display"
            >
              {title}
            </motion.h1>
            {kicker && (
              <motion.p variants={rise} className="page-hero__kicker">
                {kicker}
              </motion.p>
            )}
            {lead && (
              <motion.p
                variants={rise}
                className={`page-hero__lead ${centered ? "mx-auto" : ""}`}
              >
                {lead}
              </motion.p>
            )}
            {children && (
              <motion.div
                variants={rise}
                className={`page-hero__actions ${
                  centered ? "justify-center" : ""
                }`}
              >
                {children}
              </motion.div>
            )}
          </motion.div>
          {aside && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE_OUT }}
            >
              {aside}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
