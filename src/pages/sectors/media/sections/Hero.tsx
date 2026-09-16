import { motion } from 'motion/react'
import type { MediaContent } from '../content/en'
import { RED, BG_DEEP } from '../theme'
import Magnetic from '@/components/motion/Magnetic'
import CountUp from '@/components/motion/CountUp'
import Typewriter from '@/components/motion/Typewriter'
import { HeroCopy, HeroMark, useSectorHero } from '@/components/sector/HeroMotion'

export default function Hero({ c }: { c: MediaContent['hero'] }) {
  const { ref, y, opacity, sideOpacity } = useSectorHero()
  return (
    <section
      ref={ref}
      className="sector-hero shero med-hero relative min-h-screen flex items-center overflow-hidden"
      style={{ background: BG_DEEP, ['--pa' as string]: RED }}
    >
      {/* scanlines + dot grid */}
      <div className="absolute inset-0 pointer-events-none med-hero__scan" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(239,68,68,0.08) 1px, transparent 1px)', backgroundSize: '36px 36px', opacity: 0.5 }}
      />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] rounded-full blur-[200px] pointer-events-none med-hero__glow" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200,150,42,0.07) 0%, transparent 70%)' }} />

      {/* Broadcast strip — marquee of the brand + sub */}
      <div className="media-intro-strip med-strip" aria-label={`${c.strip} — ${c.stripSub}`}>
        <div className="med-strip__track" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="med-strip__item">
              <span className="med-strip__dot" />{c.strip} <span>{c.stripSub}</span>
            </span>
          ))}
        </div>
      </div>

      <HeroMark>09</HeroMark>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-40 w-full">
        <HeroCopy className="max-w-4xl" y={y} opacity={opacity}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 shero__rule" style={{ background: RED }} />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: RED }}>{c.eyebrow}</span>
          </div>

          <h1 className="font-display leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            <span style={{ color: 'var(--fg)' }}>{c.title1}</span>
            <br />
            <span className="med-hero__word">{c.title2}</span>
          </h1>

          <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>{c.lead}</p>

          <div className="flex flex-wrap gap-4 mb-20">
            <Magnetic strength={10}>
              <a href="#sector-contact" className="btn btn-primary shero__cta" style={{ background: RED, color: 'var(--s0)' }}>
                {c.ctaPrimary}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </Magnetic>
            <Magnetic strength={8}>
              <a href="#programmes" className="btn btn-secondary shero__cta--ghost">{c.ctaSecondary}</a>
            </Magnetic>
          </div>

          <motion.div
            className="it-hero__stats"
            initial="hidden" animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } } }}
          >
            <motion.div className="it-hero__stat med-live" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <span className="med-live__dot" />
              <span className="font-mono text-[10.5px] text-white tracking-[0.2em] uppercase font-semibold">{c.live}</span>
            </motion.div>
            {c.stats.map((m, i) => (
              <motion.div key={m.l} className="it-hero__stat" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                <span className="it-hero__stat-idx font-mono">0{i + 1}</span>
                <div className="font-display text-3xl mb-0.5" style={{ color: RED }}><CountUp value={m.v} /></div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{m.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </HeroCopy>
      </div>

      <motion.div className="it-term hidden lg:block" style={{ opacity: sideOpacity, ['--pa' as string]: RED }} aria-hidden="true">
        <div className="it-term__bar"><span /><span /><span /></div>
        <Typewriter
          className="it-term__body"
          lines={[
            { text: c.terminal.command, color: RED },
            ...c.terminal.checks.map((l) => ({ text: `✓ ${l}`, color: 'var(--accent-green)' })),
            { text: `▮ ${c.terminal.status}`, color: RED },
          ]}
        />
      </motion.div>
    </section>
  )
}
