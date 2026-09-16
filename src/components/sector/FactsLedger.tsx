import { motion } from "motion/react"
import CountUp from "@/components/motion/CountUp"
import Magnetic from "@/components/motion/Magnetic"
import { EASE_OUT } from "@/lib/motion"

const cell = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

export interface FactsContent {
  eyebrow: string
  title1?: string
  title2?: string
  title?: string
  lead?: string
  description?: string
  facts: Array<{ value: string; unit: string; label: string; sub: string }>
  note?: string
  footnote?: string
  cta: string
}

/**
 * Commercial facts buyers screen on before opening a conversation: MOQ,
 * lead times, payment terms, incoterms. Shared across division pages.
 */
export default function FactsLedger({ c, accent, id = "buyer-facts", dark = false }: { c: FactsContent; accent: string; id?: string; dark?: boolean }) {
  const ACCENT = accent
  const lead = c.lead ?? c.description
  const note = c.note ?? c.footnote
  return (
    <section id={id} className={`py-24 ${dark ? "bg-navy" : "bg-surface-1"} sfacts${dark ? " sfacts--dark" : ""}`} style={{ ["--pa" as string]: ACCENT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ACCENT }}>
                {c.eyebrow}
              </span>
            </div>
            <h2 className={`font-display text-4xl lg:text-5xl leading-tight ${dark ? "text-white" : "text-fg"}`}>
              {c.title ?? (
                <>
                  {c.title1}
                  <br />
                  {c.title2}
                </>
              )}
            </h2>
          </div>
          {lead && <p className={`${dark ? "text-slate-400" : "text-slate-500"} text-sm leading-relaxed max-w-xs lg:max-w-sm lg:text-right`}>{lead}</p>}
        </div>

        <motion.dl
          className="sfacts__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {c.facts.map((f, i) => (
            <motion.div key={f.label} className="sfacts__cell" variants={cell} style={{ ["--i" as string]: i }}>
              <span className="sfacts__idx font-mono">{String(i + 1).padStart(2, "0")}</span>
              <dd className="sfacts__value font-display">
                <CountUp value={f.value} />
                <span className="sfacts__unit">{f.unit}</span>
              </dd>
              <dt className="sfacts__label">{f.label}</dt>
              <p className="sfacts__sub">{f.sub}</p>
              <span className="sfacts__rule" aria-hidden="true" />
            </motion.div>
          ))}
        </motion.dl>

        <div className="sfacts__foot">
          {note && <p className="text-slate-500 text-xs italic">{note}</p>}
          <Magnetic strength={8}>
            <a href="#sector-contact" className="btn btn-primary btn-sm shero__cta" style={{ background: ACCENT, color: "var(--s0)" }}>
              {c.cta}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
