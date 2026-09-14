import type { ReactNode } from "react"
import { Link } from "react-router-dom"

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
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="page-hero__glow pointer-events-none" aria-hidden="true" />
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
          <div className={centered ? "mx-auto max-w-3xl" : "max-w-3xl"}>
            {eyebrow && (
              <p
                className={`page-hero__eyebrow ${
                  centered ? "justify-center" : ""
                }`}
              >
                <span className="page-hero__rule" aria-hidden="true" />
                {eyebrow}
                {centered && (
                  <span className="page-hero__rule" aria-hidden="true" />
                )}
              </p>
            )}
            <h1 className="page-hero__title font-display">{title}</h1>
            {kicker && <p className="page-hero__kicker">{kicker}</p>}
            {lead && (
              <p className={`page-hero__lead ${centered ? "mx-auto" : ""}`}>
                {lead}
              </p>
            )}
            {children && (
              <div
                className={`page-hero__actions ${
                  centered ? "justify-center" : ""
                }`}
              >
                {children}
              </div>
            )}
          </div>
          {aside}
        </div>
      </div>
    </section>
  )
}
