import { useId, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { EASE_OUT } from "@/lib/motion"

export interface FaqContent {
  eyebrow: string
  title1?: string
  title2?: string
  title?: string
  lead?: string
  description?: string
  items: Array<{ q: string; a: string }>
  cta: string
}

/** Buyer FAQ: single-open accordion with height/blur transitions and a rotating plus. Shared across division pages. */
export default function FaqAccordion({ c, accent, dark = false }: { c: FaqContent; accent: string; dark?: boolean }) {
  const ACCENT = accent
  const [open, setOpen] = useState(0)
  const reduce = useReducedMotion()
  const base = useId()
  const lead = c.lead ?? c.description

  return (
    <section id="faq" className={`py-24 ${dark ? "bg-navy-dark" : "bg-surface-2"} sfaq${dark ? " sfaq--dark" : ""}`} style={{ ["--pa" as string]: ACCENT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ACCENT }}>
                {c.eyebrow}
              </span>
            </div>
            <h2 className={`font-display text-4xl lg:text-5xl leading-tight mb-6 ${dark ? "text-white" : "text-fg"}`}>
              {c.title ?? (
                <>
                  {c.title1}
                  <br />
                  {c.title2}
                </>
              )}
            </h2>
            {lead && <p className={`${dark ? "text-slate-400" : "text-slate-500"} text-sm leading-relaxed mb-8 max-w-md`}>{lead}</p>}
            <a href="#sector-contact" className="scard-link" style={{ color: ACCENT }}>
              {c.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <ol className="sfaq__list">
            {c.items.map((item, i) => {
              const isOpen = open === i
              const id = `${base}-${i}`
              return (
                <li key={item.q} className={`sfaq__item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="sfaq__q"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a`}
                    id={`${id}-q`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="sfaq__idx font-mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="sfaq__text">{item.q}</span>
                    <span className="sfaq__plus" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${id}-a`}
                        role="region"
                        aria-labelledby={`${id}-q`}
                        className="sfaq__a"
                        initial={reduce ? false : { height: 0, opacity: 0, filter: "blur(4px)" }}
                        animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                        exit={reduce ? undefined : { height: 0, opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
