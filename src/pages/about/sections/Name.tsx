import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { AboutContent } from '../content/en'
import Eyebrow from './Eyebrow'
import { EASE_OUT } from '@/lib/motion'

const noteV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

/** Why "71": a giant outlined numeral that fills with brand red on reveal, three notes beside it. */
export default function Name({ c }: { c: AboutContent['name'] }) {
  const reduce = useReducedMotion()
  const [lit, setLit] = useState(false)
  return (
    <section id="name" className="bg-navy-dark section-y about-name">
      <div className="container-page">
        <motion.div
          className="about-name__grid"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
          onViewportEnter={() => setLit(true)}
        >
          <div className="about-name__numeral-wrap">
            <span className={`about-name__numeral font-display${lit || reduce ? ' is-lit' : ''}`} aria-hidden="true">
              <span className="about-name__numeral-stroke">{c.numeral}</span>
              <span className="about-name__numeral-fill">{c.numeral}</span>
            </span>
            <span className="about-name__badge" aria-hidden="true" />
          </div>
          <div className="about-name__copy">
            <Eyebrow label={c.eyebrow} className="mb-4" />
            <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
              {c.title1} <span className="about-name__t2">{c.title2}</span>
            </h2>
            <p className="about-name__lead">{c.lead}</p>
            <ol className="about-name__notes">
              {c.notes.map((n) => (
                <motion.li key={n.k} variants={noteV}>
                  <span className="about-name__k font-mono">{n.k}</span>
                  <div>
                    <h3>{n.title}</h3>
                    <p>{n.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
