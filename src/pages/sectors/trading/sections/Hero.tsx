import { motion } from 'motion/react'
import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'
import Magnetic from '@/components/motion/Magnetic'
import CountUp from '@/components/motion/CountUp'
import { HeroCopy, HeroMark, useSectorHero } from '@/components/sector/HeroMotion'

export default function Hero({ c }: { c: TradingContent }) {
  const { ref, y, opacity, sideOpacity } = useSectorHero()
  return (
      <section ref={ref} className="force-dark sector-hero shero relative min-h-screen flex items-center overflow-hidden" style={{ ['--pa' as string]: BLUE }}>
        <div className="absolute inset-0">
          <img decoding="async"
            src={c.copy.heroImage}
            alt={c.copy.heroImageAlt}
            className="w-full h-full object-cover"
          />
          {/* Dark navy overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,20,45,0.97) 0%, rgba(10,20,45,0.88) 55%, rgba(10,20,45,0.75) 100%)' }} />
          {/* Blue glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
          {/* Dashed trade route lines decorative */}
          <svg className="absolute inset-0 w-full h-full opacity-15 tr-routes" viewBox="0 0 1400 800" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <line x1="0" y1="600" x2="1400" y2="200" stroke="var(--accent-blue)" strokeWidth="1" strokeDasharray="8 6" />
            <line x1="0" y1="400" x2="1400" y2="500" stroke="var(--accent-blue)" strokeWidth="1" strokeDasharray="6 8" />
            <line x1="200" y1="0" x2="800" y2="800" stroke="var(--accent-blue)" strokeWidth="0.5" strokeDasharray="4 10" />
            <circle r="3" fill="var(--accent-blue)"><animateMotion dur="9s" repeatCount="indefinite" path="M0,600 L1400,200" /></circle>
            <circle r="2.5" fill="var(--accent-blue)"><animateMotion dur="12s" begin="3s" repeatCount="indefinite" path="M0,400 L1400,500" /></circle>
          </svg>
        </div>

        <HeroMark>07</HeroMark>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <HeroCopy className="max-w-3xl" y={y} opacity={opacity}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 shero__rule" style={{ background: BLUE }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{c.copy.heroEyebrow}</span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-6">{c.copy.heroTitle1}<br />
              <span style={{ color: BLUE }}>{c.copy.heroTitle2}</span>
            </h1>
            <p className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl">{c.copy.heroLead}</p>
            <div className="flex flex-wrap gap-4">
              <Magnetic strength={10}>
                <a href="#sector-contact" className="btn btn-primary shero__cta" style={{ background: BLUE, color: 'var(--s0)' }}>
                  {c.copy.heroPrimaryCta}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </Magnetic>
              <Magnetic strength={8}>
                <a href="#trade-categories" className="btn btn-secondary shero__cta--ghost">{c.copy.heroSecondaryCta}</a>
              </Magnetic>
            </div>
          </HeroCopy>

          {/* Floating stat badges */}
          <motion.ul
            className="tr-badges hidden lg:flex"
            style={{ opacity: sideOpacity }}
            initial="hidden" animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } } }}
          >
            {c.heroBadges.map((s, i) => (
              <motion.li
                key={s.lab}
                className="tr-badge"
                style={{ ['--i' as string]: i }}
                variants={{ hidden: { opacity: 0, x: 18 }, show: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              >
                <span className="tr-badge__idx font-mono">0{i + 1}</span>
                <span className="font-display text-lg font-bold" style={{ color: BLUE }}><CountUp value={s.val} /></span>
                <span className="text-slate-300 text-xs">{s.lab}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

  )
}
