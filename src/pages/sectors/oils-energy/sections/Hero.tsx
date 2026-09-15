import { useState } from 'react'
import { motion } from 'motion/react'
import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'
import Magnetic from '@/components/motion/Magnetic'
import { EASE_OUT } from '@/lib/motion'

type Side = 'a' | 'b' | null

/**
 * Split hero. Hovering a half lets it breathe wider while the other recedes;
 * the centre plate floats and the blueprint draws itself in.
 */
export default function Hero({ c }: { c: OilsEnergyContent }) {
  const [side, setSide] = useState<Side>(null)
  const grow = (s: Side) => (side === null ? 1 : side === s ? 1.35 : 0.65)
  return (
      <section
        className={`oil-hero force-dark sector-hero relative flex flex-col overflow-hidden${side ? ` is-${side}` : ''}`}
        style={{ ['--pa' as string]: AMBER }}
      >
        {/* Two half backgrounds — flex-grow animates the split */}
        <div className="absolute inset-0 flex">
          {/* Left — edible oils (amber) */}
          <motion.div
            className="oil-half relative overflow-hidden"
            animate={{ flexGrow: grow('a') }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            onPointerEnter={() => setSide('a')}
            onPointerLeave={() => setSide(null)}
          >
            <img decoding="async"
              src={c.hero.edibleImage}
              alt={c.hero.edibleImageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(120,53,15,0.82) 0%, rgba(245,158,11,0.45) 60%, transparent 100%)' }}
            />
          </motion.div>
          {/* Right — Energy & Fuel (sky blue / dark) */}
          <motion.div
            className="oil-half relative overflow-hidden"
            animate={{ flexGrow: grow('b') }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            onPointerEnter={() => setSide('b')}
            onPointerLeave={() => setSide(null)}
          >
            <div className="energy-blueprint" aria-hidden="true"><svg viewBox="0 0 400 700" fill="none"><path pathLength="1" d="M35 650V360h100v290M150 650V270h65v380M240 650V410h125v240M163 270V95h39v175M48 360V210h28v150M90 360V250h26v110M30 590h345M30 550h345M135 450h105M75 210h75v110h90M0 680h400" stroke="currentColor" strokeWidth="2"/><path d="M0 120h400M0 220h400M0 320h400M0 420h400M0 520h400M50 0v700M150 0v700M250 0v700M350 0v700" stroke="currentColor" strokeWidth=".5" opacity=".3"/></svg></div>
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to left, rgba(3,27,78,0.88) 0%, rgba(14,165,233,0.35) 60%, transparent 100%)' }}
            />
          </motion.div>
        </div>
        {/* Seam — hairline between the halves that glows with the hovered side */}
        <span className="oil-seam" aria-hidden="true" />

        {/* Left label — {c.overview.oilsTitle} */}
        <div className="oil-side oil-side--a absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-10 max-w-[220px]">
          <div
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase font-medium mb-3 px-3 py-1 rounded-full"
            style={{ background: `color-mix(in srgb, ${AMBER} 13%, transparent)`, color: AMBER, border: `1px solid color-mix(in srgb, ${AMBER} 27%, transparent)` }}
          >
            {c.copy.divisionA}
          </div>
          <h2 className="font-display text-3xl lg:text-4xl text-white leading-snug mb-2">
            {c.hero.edibleTitle.split('\n')[0]}<br />
            <span style={{ color: AMBER }}>{c.hero.edibleTitle.split('\n')[1]}</span>
          </h2>
          <p className="text-amber-100/70 text-xs leading-relaxed">
            {c.hero.edibleLead}
          </p>
        </div>

        {/* Right label — Energy & Fuel */}
        <div className="oil-side oil-side--b absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-10 max-w-[220px] text-right">
          <div
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase font-medium mb-3 px-3 py-1 rounded-full"
            style={{ background: `color-mix(in srgb, ${SKY} 13%, transparent)`, color: SKY, border: `1px solid color-mix(in srgb, ${SKY} 27%, transparent)` }}
          >
            {c.copy.divisionB}
          </div>
          <h2 className="font-display text-3xl lg:text-4xl text-white leading-snug mb-2">
            {c.hero.energyTitle}<br />
            <span style={{ color: SKY }}>{c.hero.fuelTitle}</span>
          </h2>
          <p className="text-sky-100/70 text-xs leading-relaxed">
            {c.hero.energyLead}
          </p>
        </div>

        {/* Center badge */}
        <div className="oil-intro absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <motion.div
            className="oil-plate flex flex-col items-center text-center px-8 py-7 rounded-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
          >
            {/* N71 badge */}
            <div className="w-14 h-14 bg-gold rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-on-brand font-bold text-base font-display tracking-tight">{c.hero.brand}</span>
            </div>
            <div
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium mb-2"
              style={{ color: AMBER }}
            >
              {c.hero.division}
            </div>
            <h1 className="font-display text-2xl lg:text-3xl text-white leading-tight tracking-[-0.02em] mb-3">
              {c.hero.title}
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `color-mix(in srgb, ${AMBER} 13%, transparent)`, color: AMBER, border: `1px solid color-mix(in srgb, ${AMBER} 25%, transparent)` }}
              >
                {c.overview.oilsTitle}
              </span>
              <span className="text-white/30 text-xs">·</span>
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `color-mix(in srgb, ${SKY} 13%, transparent)`, color: SKY, border: `1px solid color-mix(in srgb, ${SKY} 25%, transparent)` }}
              >
                {c.overview.energyTitle}
              </span>
            </div>
            <Magnetic strength={8} className="pointer-events-auto">
              <a
                href="#sector-contact"
                className="btn btn-primary btn-sm shero__cta"
                style={{ background: AMBER, color: 'var(--s0)' }}
              >
                {c.hero.cta}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="shero__cue oil-cue" aria-hidden="true">
          <span className="shero__cue-line" />
          <span className="shero__cue-dot" />
          <span className="oil-cue__label font-mono">{c.hero.scroll}</span>
        </div>
      </section>

  )
}
