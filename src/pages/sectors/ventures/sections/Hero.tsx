import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useT, DIVISION_IDS, DIVISION_HREF, DIVISION_COLOR, divKey } from '@/i18n'
import type { VenturesContent } from '../content/en'
import { INDIGO, BG_DEEP } from '../theme'
import Magnetic from '@/components/motion/Magnetic'
import { HeroCopy, HeroMark, useSectorHero } from '@/components/sector/HeroMotion'

const ECOSYSTEM = DIVISION_IDS.filter(id => id !== 'ventures')

export default function Hero({ c }: { c: VenturesContent['hero'] }) {
  const { t } = useT()
  const { ref, y, opacity, sideOpacity } = useSectorHero()
  const n = ECOSYSTEM.length
  return (
    <section
      ref={ref}
      className="sector-hero shero sv-hero relative min-h-screen flex items-center overflow-hidden"
      style={{ background: BG_DEEP, ['--pa' as string]: INDIGO }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(165,180,252,0.14) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse at 70% 40%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, black 0%, transparent 70%)',
        }}
      />
      <div className="absolute top-0 right-0 w-[800px] h-[700px] rounded-full blur-[200px] pointer-events-none sv-hero__glow" style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.14) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200,150,42,0.08) 0%, transparent 70%)' }} />

      <HeroMark>08</HeroMark>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
          <HeroCopy y={y} opacity={opacity}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 shero__rule" style={{ background: INDIGO }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: INDIGO }}>{c.eyebrow}</span>
            </div>
            <div className="mb-8 inline-flex">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full" style={{ border: `1px solid color-mix(in srgb, ${INDIGO} 25%, transparent)`, background: `color-mix(in srgb, ${INDIGO} 6%, transparent)` }}>
                <span className="w-2 h-2 rounded-full sv-hero__badge-dot" style={{ background: INDIGO }} />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: INDIGO }}>{c.badge}</span>
              </div>
            </div>
            <h1 className="font-display leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.25rem)' }}>
              <span style={{ color: 'var(--fg)' }}>{c.title1}</span>
              <br />
              <span className="sv-hero__word">{c.title2}</span>
            </h1>
            <p className="text-slate-300 leading-relaxed mb-10 max-w-2xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>{c.lead}</p>
            <div className="flex flex-wrap gap-4">
              <Magnetic strength={10}>
                <a href="#sector-contact" className="btn btn-primary shero__cta" style={{ background: INDIGO, color: 'var(--s0)' }}>
                  {c.ctaPrimary}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </Magnetic>
              <Magnetic strength={8}>
                <a href="#models" className="btn btn-secondary shero__cta--ghost">{c.ctaSecondary}</a>
              </Magnetic>
            </div>
          </HeroCopy>

          {/* Ecosystem constellation */}
          <motion.div className="hidden lg:block" style={{ opacity: sideOpacity }}>
            <div className="sv-orbit" aria-label={c.mapEyebrow}>
              <div className="sv-orbit__head">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: INDIGO }}>{c.mapEyebrow}</span>
                <span className="font-mono text-[10px] text-slate-500">{c.mapCount.replace('{n}', String(n))}</span>
              </div>
              <div className="sv-orbit__stage">
                <svg className="sv-orbit__svg" viewBox="0 0 400 400" aria-hidden="true">
                  <circle cx="200" cy="200" r="150" className="sv-orbit__ring" pathLength="1" />
                  <circle cx="200" cy="200" r="96" className="sv-orbit__ring sv-orbit__ring--inner" pathLength="1" />
                  {ECOSYSTEM.map((id, i) => {
                    const a = (i / n) * Math.PI * 2 - Math.PI / 2
                    const x = 200 + Math.cos(a) * 150, yy = 200 + Math.sin(a) * 150
                    return <line key={id} x1="200" y1="200" x2={x} y2={yy} className="sv-orbit__spoke" pathLength="1" style={{ ['--i' as string]: i, stroke: DIVISION_COLOR[id] }} />
                  })}
                </svg>
                <div className="sv-orbit__hub">
                  <span className="font-display">N71</span>
                </div>
                {ECOSYSTEM.map((id, i) => {
                  const a = (i / n) * Math.PI * 2 - Math.PI / 2
                  const left = `${50 + Math.cos(a) * 37.5}%`, top = `${50 + Math.sin(a) * 37.5}%`
                  return (
                    <Link
                      key={id}
                      to={DIVISION_HREF[id]}
                      className="sv-orbit__node"
                      style={{ left, top, ['--i' as string]: i, ['--pa' as string]: DIVISION_COLOR[id] }}
                    >
                      <span className="sv-orbit__dot" />
                      <span className="sv-orbit__label">{t(divKey(id, 'short'))}</span>
                    </Link>
                  )
                })}
              </div>
              <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">{c.mapNote}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
