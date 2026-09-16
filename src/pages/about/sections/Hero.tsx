import PageHero from '@/components/PageHero'
import CountUp from '@/components/motion/CountUp'
import Tilt from '@/components/motion/Tilt'
import { motion } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'
import type { AboutContent } from '../content/en'

export default function Hero({ c }: { c: AboutContent['hero'] }) {
  return (
    <PageHero
      breadcrumb={{ home: c.breadcrumbHome, current: c.breadcrumbCurrent }}
      eyebrow={c.eyebrow}
      title={c.title}
      lead={c.lead}
      aside={<VisionPanel c={c} />}
    />
  )
}

/* Vision statement + verifiable facts; replaces a stock hero photo with something we can stand behind. */
function VisionPanel({ c }: { c: AboutContent['hero'] }) {
  return (
    <Tilt max={4} className="about-vision-wrap">
    <motion.aside
      className="relative rounded-2xl p-6 sm:p-7 lg:p-8 about-vision"
      style={{ background: 'var(--fill-1)', border: '1px solid var(--line)' }}
      aria-label={c.visionLabel}
      initial="hidden" animate="show"
      variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT, delay: 0.15, staggerChildren: 0.14, delayChildren: 0.45 } } }}
    >
      <span className="about-vision__corner about-vision__corner--tl" aria-hidden="true" />
      <span className="about-vision__corner about-vision__corner--br" aria-hidden="true" />
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-2.5" style={{ color: 'var(--brand-fg)' }}>
        <span className="about-vision__dot" aria-hidden="true" />{c.visionLabel}
      </p>
      <p className="font-display leading-[1.15] tracking-[-0.02em]" style={{ fontSize: 'clamp(20px, 3.2vw, 28px)' }}>
        {c.visionLines.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block"
              style={{ color: i === 1 ? 'var(--brand-fg)' : i === 2 ? 'var(--fg-subtle)' : 'var(--fg-strong)' }}
              variants={{ hidden: { y: '110%', opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_OUT } } }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </p>
      <dl className="grid grid-cols-3 gap-3 mt-6 pt-5" style={{ borderTop: '1px solid var(--line)' }}>
        {c.facts.map((f, i) => (
          <motion.div key={f.label} className="min-w-0 about-vision__fact" style={{ ['--i' as string]: i }} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } } }}>
            <dd className="font-display text-xl sm:text-2xl" style={{ color: 'var(--fg-strong)' }}><CountUp value={f.value} /></dd>
            <dt className="text-[12px] sm:text-[13px] mt-1 leading-snug" style={{ color: 'var(--fg-subtle)' }}>{f.label}</dt>
          </motion.div>
        ))}
      </dl>
    </motion.aside>
    </Tilt>
  )
}
