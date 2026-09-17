import { motion } from "motion/react"
import { OCEAN, TEAL } from "../theme"
import type { EShipeContent } from "../content/en"
import { EASE_OUT } from "@/lib/motion"

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_OUT } },
}

/**
 * Two-column closing checklist — seller's documents on the left, buyer's on
 * the right — meeting at a central "PODA" exchange spine. Items tick in as
 * the section reveals.
 */
export default function ClosingDocs({ c }: { c: EShipeContent["closingDocs"] }) {
  const Col = ({ title, items, accent, side }: { title: string; items: typeof c.seller; accent: string; side: "l" | "r" }) => (
    <motion.div
      className={`sdocs__col sdocs__col--${side}`}
      style={{ ["--pa" as string]: accent }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      <h3 className="sdocs__title font-mono">{title}<span className="sdocs__count">{items.length}</span></h3>
      <ol className="sdocs__list">
        {items.map((d, i) => (
          <motion.li key={d.title} className="sdocs__item" variants={item} style={{ ["--i" as string]: i }}>
            <span className="sdocs__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path pathLength="1" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
            <span>
              <span className="sdocs__name">{d.title}</span>
              <span className="sdocs__note">{d.note}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  )
  return (
    <section id="closing-docs" className="py-24 sdocs" style={{ background: "var(--s1)", ["--pa" as string]: OCEAN }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: OCEAN }} />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: OCEAN }}>{c.eyebrow}</span>
            <div className="h-px w-8" style={{ background: OCEAN }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-4">{c.title1}<br /><span style={{ color: OCEAN }}>{c.title2}</span></h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">{c.lead}</p>
        </div>
        <div className="sdocs__grid">
          <Col title={c.sellerTitle} items={c.seller} accent={OCEAN} side="l" />
          <div className="sdocs__spine" aria-hidden="true">
            <span className="sdocs__spine-line" />
            <span className="sdocs__spine-badge font-mono">PODA</span>
            <span className="sdocs__spine-arrow sdocs__spine-arrow--l">→</span>
            <span className="sdocs__spine-arrow sdocs__spine-arrow--r">←</span>
          </div>
          <Col title={c.buyerTitle} items={c.buyer} accent={TEAL} side="r" />
        </div>
        <p className="text-slate-500 text-xs italic mt-8 text-center">{c.footnote}</p>
      </div>
    </section>
  )
}
