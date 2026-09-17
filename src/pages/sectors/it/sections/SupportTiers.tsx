import { motion } from "motion/react"
import type { ITContent } from "../content/en"
import { ACCENT } from "../theme"
import Magnetic from "@/components/motion/Magnetic"
import CountUp from "@/components/motion/CountUp"
import { EASE_OUT } from "@/lib/motion"

const col = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

/**
 * Support tiers as a comparison board: response / uptime / coverage read as
 * big figures, inclusions as a check list. The featured tier is lifted and lit.
 */
export default function SupportTiers({ c }: { c: ITContent }) {
  const t = c.supportTiers
  return (
    <section id="support" className="py-24 stier" style={{ background: "var(--s1)", ["--pa" as string]: ACCENT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ACCENT }}>{t.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">{t.title1}<br /><span style={{ color: ACCENT }}>{t.title2}</span></h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md lg:text-right">{t.lead}</p>
        </div>

        <motion.div
          className="stier__board"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {t.tiers.map((tier, i) => (
            <motion.article key={tier.code} className={`stier__tier${tier.featured ? " is-featured" : ""}`} variants={col} style={{ ["--i" as string]: i }}>
              <span className="stier__scan" aria-hidden="true" />
              <header className="stier__head">
                <span className="stier__code font-mono">{tier.code}</span>
                <h3 className="font-display text-2xl text-white">{tier.title}</h3>
                <p className="stier__who">{tier.who}</p>
              </header>
              <dl className="stier__figs">
                <div><dt className="font-mono">{t.labels.response}</dt><dd className="font-display"><CountUp value={tier.response} /></dd></div>
                <div><dt className="font-mono">{t.labels.uptime}</dt><dd className="font-display"><CountUp value={tier.uptime} /></dd></div>
                <div><dt className="font-mono">{t.labels.coverage}</dt><dd>{tier.coverage}</dd></div>
              </dl>
              <div className="stier__inc">
                <span className="font-mono stier__inc-label">{t.labels.includes}</span>
                <ul>
                  {tier.includes.map((it, j) => (
                    <li key={it} style={{ ["--j" as string]: j }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path pathLength="1" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <Magnetic strength={8}>
                <a href="#sector-contact" className={`btn btn-sm ${tier.featured ? "btn-primary" : "btn-secondary"} stier__cta`} style={tier.featured ? { background: ACCENT, color: "var(--s0)" } : undefined}>
                  {t.cta}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </Magnetic>
            </motion.article>
          ))}
        </motion.div>
        <p className="text-slate-500 text-xs italic mt-8">{t.footnote}</p>
      </div>
    </section>
  )
}
