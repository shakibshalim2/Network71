import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react'
import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import { EASE_OUT } from '@/lib/motion'

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

/**
 * Stage-gate NPD track: six gates on a timeline. The accent line draws with
 * scroll and each gate card lights as the line reaches it; every card names
 * the deliverable the buyer signs off.
 */
export default function NpdStages({ c }: { c: FoodBeverageContent }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.7 })
  const pct = useTransform(progress, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`)
  const n = c.npd.stages.length

  return (
    <section id="npd" className="py-24 bg-surface-2 snpd" style={{ ['--pa' as string]: ORANGE }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.npd.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight">{c.npd.title1}<br />{c.npd.title2}</h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md lg:text-right">{c.npd.lead}</p>
        </div>

        <div ref={ref} className="snpd__track" style={{ ['--n' as string]: n, ['--p' as string]: reduce ? '100%' : undefined }}>
          <span className="snpd__rail" aria-hidden="true" />
          <motion.span className="snpd__fill" aria-hidden="true" style={reduce ? undefined : { ['--p' as string]: pct }} />
          <motion.ol
            className="snpd__list"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          >
            {c.npd.stages.map((s, i) => (
              <motion.li key={s.code} className="snpd__stage" style={{ ['--i' as string]: i }} variants={card}>
                <span className="snpd__gate font-mono">{s.code}</span>
                <div className="snpd__card">
                  <span className="snpd__weeks font-mono">{s.weeks}</span>
                  <h3 className="font-display text-lg text-fg leading-tight mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{s.desc}</p>
                  <div className="snpd__deliv">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>{s.deliverable}</span>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
        <p className="text-slate-500 text-xs italic mt-8">{c.npd.footnote}</p>
      </div>
    </section>
  )
}
