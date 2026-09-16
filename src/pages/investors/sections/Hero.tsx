import PageHero from '@/components/PageHero'
import CountUp from '@/components/motion/CountUp'
import { motion } from 'motion/react'
import type { InvestorsContent } from '../content/en'

export default function Hero({ c }: { c: InvestorsContent['hero'] }) {
  return (
    <PageHero
      breadcrumb={{ home: c.breadcrumbHome, current: c.breadcrumbCurrent }}
      eyebrow={c.eyebrow}
      title={c.title}
      lead={c.lead}
    >
      <motion.dl
        className="work-hero-facts"
        initial="hidden" animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.7 } } }}
      >
        {c.pillars.map((f, i) => (
          <motion.div key={f.l} className="work-hero-facts__item" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <span className="work-hero-facts__idx font-mono">0{i + 1}</span>
            <dd className="font-display"><CountUp value={f.v} /></dd>
            <dt>{f.l}</dt>
          </motion.div>
        ))}
      </motion.dl>
    </PageHero>
  )
}
