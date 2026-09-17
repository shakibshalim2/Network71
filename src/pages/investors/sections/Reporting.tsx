import { motion } from 'motion/react'
import type { InvestorsContent } from '../content/en'
import Eyebrow from './Eyebrow'
import { EASE_OUT } from '@/lib/motion'

const itemV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
}

/** Reporting cadence: four period tiles on a drawn rule, plus the access channels an investor gets. */
export default function Reporting({ c }: { c: InvestorsContent['reporting'] }) {
  return (
    <section id="reporting" className="bg-navy section-y invrep">
      <div className="container-page">
        <div className="invrep__head">
          <div>
            <Eyebrow label={c.eyebrow} />
            <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
              {c.title1}<br /><span className="text-gold">{c.title2}</span>
            </h2>
          </div>
          <p className="invrep__lead">{c.lead}</p>
        </div>

        <motion.ol
          className="invrep__cadence"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.i className="invrep__rule" aria-hidden="true" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease: EASE_OUT } } }} />
          {c.items.map((it, i) => (
            <motion.li key={it.period} variants={itemV} style={{ ['--i' as string]: i }}>
              <span className="invrep__dot" aria-hidden="true" />
              <span className="invrep__period font-mono">{it.period}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </motion.li>
          ))}
        </motion.ol>

        <div className="invrep__access">
          <span className="font-mono">{c.accessLabel}</span>
          <ul>
            {c.access.map((a) => <li key={a}><i aria-hidden="true" />{a}</li>)}
          </ul>
        </div>
        <p className="invrep__foot font-mono">{c.footnote}</p>
      </div>
    </section>
  )
}
