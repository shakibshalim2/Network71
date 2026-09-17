import { motion } from "motion/react"
import { OCEAN } from "../theme"
import type { EShipeContent } from "../content/en"
import Magnetic from "@/components/motion/Magnetic"
import { EASE_OUT } from "@/lib/motion"

const step = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

/** Seller on-ramp: four numbered steps with day markers, plus what every listing includes. */
export default function ListVessel({ c }: { c: EShipeContent["listVessel"] }) {
  return (
    <section id="list-vessel" className="py-24 slist" style={{ background: "var(--s0)", ["--pa" as string]: OCEAN }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: OCEAN }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: OCEAN }}>{c.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">{c.title1}<br /><span style={{ color: OCEAN }}>{c.title2}</span></h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-md">{c.lead}</p>
            <div className="slist__inc">
              <span className="font-mono slist__inc-title">{c.includedTitle}</span>
              <ul>
                {c.included.map((i) => (
                  <li key={i}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>{i}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <Magnetic strength={10}>
                <a href="#sector-contact" className="btn btn-primary shero__cta" style={{ background: OCEAN, color: "var(--s0)", ["--pa" as string]: OCEAN }}>
                  {c.cta}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </Magnetic>
              <Magnetic strength={8}>
                <a href="#sector-contact" className="btn btn-secondary">{c.secondary}</a>
              </Magnetic>
            </div>
          </div>

          <motion.ol
            className="slist__steps"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            {c.steps.map((s, i) => (
              <motion.li key={s.code} className="slist__step" variants={step} style={{ ["--i" as string]: i }}>
                <span className="slist__code font-display">{s.code}</span>
                <div className="slist__body">
                  <div className="slist__head">
                    <h3>{s.title}</h3>
                    <span className="slist__time font-mono">{s.time}</span>
                  </div>
                  <p>{s.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
