import { useState } from 'react'
import { motion } from 'motion/react'
import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'
import { EASE_OUT } from '@/lib/motion'

const rowV = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

/**
 * Incoterms responsibility matrix: one row per term, nine cost/risk steps.
 * Seller cells fill accent from the left up to the hand-over point, buyer
 * cells stay hollow; the hand-over cell carries a marker. Hovering a step
 * lights that column in every row.
 */
export default function Incoterms({ c }: { c: TradingContent }) {
  const t = c.incoterms
  const [col, setCol] = useState<number | null>(null)
  return (
    <section id="incoterms" className="py-24 bg-surface-1 sinco" style={{ ['--pa' as string]: BLUE }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{t.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight">{t.title1}<br /><span style={{ color: BLUE }}>{t.title2}</span></h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md lg:text-right">{t.lead}</p>
        </div>

        <div className="sinco__legend font-mono" aria-hidden="true">
          <span><i className="sinco__sw sinco__sw--seller" />{t.legend.seller}</span>
          <span><i className="sinco__sw sinco__sw--buyer" />{t.legend.buyer}</span>
          <span><i className="sinco__sw sinco__sw--hand" />{t.legend.handover}</span>
        </div>

        <div className="sinco__scroll">
          <motion.div
            className="sinco__grid"
            role="table"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            onPointerLeave={() => setCol(null)}
          >
            <div className="sinco__head" role="row">
              <span className="sinco__term sinco__term--head" role="columnheader" />
              {t.steps.map((s, i) => (
                <span key={s} role="columnheader" className={`sinco__step font-mono${col === i ? ' is-on' : ''}`} onPointerEnter={() => setCol(i)}>
                  <span className="sinco__step-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sinco__step-l">{s}</span>
                </span>
              ))}
            </div>
            {t.terms.map((term) => (
              <motion.div key={term.code} className="sinco__row" role="row" variants={rowV}>
                <span className="sinco__term" role="rowheader">
                  <span className="sinco__code font-display">{term.code}</span>
                  <span className="sinco__name">{term.name}</span>
                  <span className="sinco__note">{term.note}</span>
                </span>
                {t.steps.map((_, i) => {
                  const seller = i < term.seller
                  const hand = i === term.seller - 1
                  return (
                    <span
                      key={i}
                      role="cell"
                      className={`sinco__cell${seller ? ' is-seller' : ' is-buyer'}${hand ? ' is-hand' : ''}${col === i ? ' is-on' : ''}`}
                      style={{ ['--d' as string]: i }}
                      onPointerEnter={() => setCol(i)}
                      title={hand ? term.handover : undefined}
                      aria-label={seller ? t.legend.seller : t.legend.buyer}
                    >
                      {hand && <i className="sinco__hand" aria-hidden="true" />}
                    </span>
                  )
                })}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <p className="text-slate-500 text-xs italic mt-6">{t.footnote}</p>
      </div>
    </section>
  )
}
