import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { AboutContent } from '../content/en'
import Eyebrow from './Eyebrow'
import { EASE_OUT } from '@/lib/motion'

const cardV = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

/** Four doors deeper into the corporate site: governance, presence, ESG, brand. */
export default function Explore({ c }: { c: AboutContent['explore'] }) {
  return (
    <section id="explore" className="bg-navy section-y about-explore">
      <div className="container-page">
        <div className="mb-10 sm:mb-12 max-w-2xl">
          <Eyebrow label={c.eyebrow} className="mb-4" />
          <h2 className="font-display text-white tracking-[-0.02em] text-balance" style={{ fontSize: 'clamp(24px, 4.4vw, 40px)' }}>{c.title}</h2>
        </div>
        <motion.div
          className="about-explore__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        >
          {c.items.map((it) => (
            <motion.div key={it.k} variants={cardV}>
              <Link to={it.href} className="about-explore__card">
                <span className="about-explore__k font-display" aria-hidden="true">{it.k}</span>
                <h3 className="font-display">{it.title}</h3>
                <p>{it.desc}</p>
                <span className="about-explore__cta">
                  {it.cta}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
                <i className="about-explore__glow" aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
