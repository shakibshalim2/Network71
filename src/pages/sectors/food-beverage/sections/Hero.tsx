import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import KineticText from '@/components/motion/KineticText'
import Magnetic from '@/components/motion/Magnetic'
import { HeroCopy, HeroMark, useSectorHero } from '@/components/sector/HeroMotion'

export default function Hero({ c }: { c: FoodBeverageContent }) {
  const { ref, y, opacity, sideOpacity } = useSectorHero()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.12, 1])
  return (
    <section
      ref={ref}
      className="force-dark sector-hero shero relative min-h-screen flex items-center overflow-hidden"
      style={{ ['--pa' as string]: ORANGE }}
    >
      <motion.div className="absolute inset-0 shero__photo" style={{ y: imgY, scale: imgScale }}>
        <img decoding="async"
          src={c.hero.image}
          alt={c.hero.imgAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,16,40,0.92) 0%, rgba(10,16,40,0.78) 50%, rgba(30,15,5,0.72) 100%)' }} />
        {/* Warm rim light rising from the counter */}
        <div className="absolute inset-0 shero__warm" aria-hidden="true" />
      </motion.div>
      <span className="shero__sweep" aria-hidden="true" />

      <HeroMark>03</HeroMark>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <HeroCopy className="max-w-3xl" y={y} opacity={opacity}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 shero__rule" style={{ background: ORANGE }} />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.hero.eyebrow}</span>
          </div>
          <h1 className="font-display hero-kinetic text-5xl lg:text-7xl text-white leading-[0.95] tracking-[-0.02em] mb-8">
            <KineticText text={c.hero.title1} delay={0.2} />
            <KineticText text={c.hero.title2} delay={0.42} as="em" style={{ color: ORANGE, fontStyle: 'normal' }} />
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed mb-10 max-w-xl">{c.hero.lead}</p>
          <motion.div className="flex flex-wrap gap-4" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}>
            <Magnetic strength={10}>
              <a href="#sector-contact" className="btn btn-primary shero__cta" style={{ background: ORANGE, color: 'var(--s0)' }}>
                {c.hero.ctaPrimary}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={8}>
              <a href="#product-portfolio" className="btn btn-secondary shero__cta--ghost">{c.hero.ctaSecondary}</a>
            </Magnetic>
          </motion.div>
        </HeroCopy>
      </div>

      {/* Scroll cue — line draws down, dot drops, repeats */}
      <motion.div className="shero__cue" aria-hidden="true" style={{ opacity: sideOpacity }}>
        <span className="shero__cue-line" />
        <span className="shero__cue-dot" />
      </motion.div>
    </section>
  )
}
