import { motion } from 'motion/react'
import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'
import CountUp from '@/components/motion/CountUp'
import { EASE_OUT } from '@/lib/motion'

const rowV = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

/**
 * Departure-board style lane list: port pair with a travelling dot, sea and
 * air transit as flip-in figures, sailing frequency and the document set.
 */
export default function LaneBoard({ c }: { c: TradingContent }) {
  const b = c.laneBoard
  return (
    <section id="lane-board" className="py-24 bg-navy-dark slb" style={{ ['--pa' as string]: BLUE }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{b.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">{b.title1}<br /><span style={{ color: BLUE }}>{b.title2}</span></h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md lg:text-right">{b.lead}</p>
        </div>

        <motion.div
          className="slb__board"
          role="table"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          <div className="slb__head font-mono" role="row">
            <span role="columnheader">{b.labels.ports}</span>
            <span role="columnheader">{b.labels.sea}</span>
            <span role="columnheader">{b.labels.air}</span>
            <span role="columnheader">{b.labels.freq}</span>
            <span role="columnheader">{b.labels.docs}</span>
          </div>
          {b.lanes.map((l, i) => (
            <motion.div key={`${l.from}-${l.to}`} className="slb__row" role="row" variants={rowV} style={{ ['--i' as string]: i }}>
              <span className="slb__pair" role="cell">
                <span className="slb__port"><span className="slb__flag" aria-hidden="true">{l.flag1}</span>{l.from}</span>
                <span className="slb__track" aria-hidden="true"><i className="slb__dot" /></span>
                <span className="slb__port slb__port--to"><span className="slb__flag" aria-hidden="true">{l.flag2}</span>{l.to}</span>
              </span>
              <span className="slb__fig font-display" role="cell" data-label={b.labels.sea}><CountUp value={l.sea} /></span>
              <span className="slb__fig slb__fig--air font-display" role="cell" data-label={b.labels.air}><CountUp value={l.air} /></span>
              <span className="slb__freq font-mono" role="cell" data-label={b.labels.freq}><i className="slb__live" />{l.freq}</span>
              <span className="slb__docs font-mono" role="cell" data-label={b.labels.docs}>{l.docs}</span>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-slate-500 text-xs italic mt-6">{b.footnote}</p>
      </div>
    </section>
  )
}
