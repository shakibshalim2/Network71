import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import { motion } from 'motion/react'
import Magnetic from '@/components/motion/Magnetic'
import { HeroCopy, HeroMark, useSectorHero } from '@/components/sector/HeroMotion'

export default function Hero({ c }: { c: FoodBeverageContent }) {
  const { ref, y, opacity, sideOpacity } = useSectorHero()
  return (
    <section
      ref={ref}
      className="force-dark sector-hero shero relative min-h-screen flex items-center overflow-hidden"
      style={{ ['--pa' as string]: ORANGE }}
    >
      <div className="absolute inset-0">
        <img decoding="async"
          src={c.hero.image}
          alt={c.hero.imgAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,16,40,0.92) 0%, rgba(10,16,40,0.78) 50%, rgba(30,15,5,0.72) 100%)' }} />
        {/* Warm rim light rising from the counter */}
        <div className="absolute inset-0 shero__warm" aria-hidden="true" />
      </div>

      <HeroMark>03</HeroMark>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <HeroCopy className="max-w-3xl" y={y} opacity={opacity}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 shero__rule" style={{ background: ORANGE }} />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.hero.eyebrow}</span>
          </div>
          <h1 className="font-display text-5xl lg:text-7xl text-white leading-[0.95] tracking-[-0.02em] mb-8">{c.hero.title1}<br />
            <span style={{ color: ORANGE }}>{c.hero.title2}</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed mb-10 max-w-xl">{c.hero.lead}</p>
          <div className="flex flex-wrap gap-4">
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
          </div>
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
