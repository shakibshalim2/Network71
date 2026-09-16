import { motion } from 'motion/react'
import { useT } from '@/i18n'
import CountUp from '@/components/motion/CountUp'
import { EASE_OUT } from '@/lib/motion'

export const STAT_ICONS = [
  <svg key="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>,
  <svg key="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>,
  <svg key="d" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
]

const cell = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

/** Hairline ledger under the hero: cells rise in sequence, light up on hover. */
export default function HeroStats() {
  const { t } = useT()
  const stats = ([1, 2, 3, 4] as const).map((n, i) => ({
    icon: STAT_ICONS[i],
    value: t(`hero.stat${n}.value`),
    label: t(`hero.stat${n}.label`),
    sub: t(`hero.stat${n}.sub`),
  }))

  return (
    <div className="hero-stats">
      <div className="container-page">
        <motion.div
          className="grid hstat__grid"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.9 } } }}
        >
          {stats.map(({ icon, value, label, sub }, i) => (
            <motion.div key={label} className="hstat" variants={cell}>
              <span className="hstat__idx" aria-hidden="true">0{i + 1}</span>
              <div className="hstat__icon">{icon}</div>
              <div style={{ minWidth: 0 }}>
                <div className="hstat__value font-display">
                  <CountUp value={value} />
                </div>
                <div className="hstat__label text-[11px]">{label}</div>
                <div className="hstat__sub hidden sm:block">{sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
