import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import type { AboutContent } from '../content/en'
import Eyebrow from './Eyebrow'
import { EASE_OUT } from '@/lib/motion'

const R = 42 // orbit radius in viewBox units (0–100)

/**
 * Ecosystem orbit: the shared core sits at the centre, ten division nodes on
 * a slowly turning ring. The selected node lights, a spoke draws to the core,
 * and the side card explains what that division gives and draws on. Idle
 * state auto-advances every few seconds until the user takes over.
 */
export default function Ecosystem({ c }: { c: AboutContent['ecosystem'] }) {
  const [active, setActive] = useState(0)
  const [manual, setManual] = useState(false)
  const reduce = useReducedMotion()
  const n = c.nodes.length
  const node = c.nodes[active]

  useEffect(() => {
    if (manual || reduce) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), 3800)
    return () => window.clearInterval(id)
  }, [manual, reduce, n])

  const pos = (i: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) }
  }
  const p = pos(active)

  return (
    <section id="ecosystem" className="bg-navy section-y about-eco" style={{ ['--na' as string]: node.color }}>
      <div className="container-page">
        <div className="about-eco__head">
          <div>
            <Eyebrow label={c.eyebrow} className="mb-4" />
            <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
              {c.title1} <span className="about-eco__t2">{c.title2}</span>
            </h2>
          </div>
          <p className="about-eco__lead">{c.lead}</p>
        </div>

        <div className="about-eco__stage">
          <div className="about-eco__orbit" onPointerDown={() => setManual(true)}>
            <svg viewBox="0 0 100 100" className="about-eco__svg" aria-hidden="true">
              <defs>
                <radialGradient id="eco-core" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="var(--brand)" stopOpacity="0.5" />
                  <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r={R} className="about-eco__ring" />
              <circle cx="50" cy="50" r={R - 9} className="about-eco__ring about-eco__ring--inner" />
              <g className="about-eco__ticks">
                {Array.from({ length: 60 }).map((_, i) => {
                  const a = (i / 60) * Math.PI * 2
                  const r1 = R + 3.2, r2 = R + (i % 5 === 0 ? 5.6 : 4.4)
                  return <line key={i} x1={50 + r1 * Math.cos(a)} y1={50 + r1 * Math.sin(a)} x2={50 + r2 * Math.cos(a)} y2={50 + r2 * Math.sin(a)} />
                })}
              </g>
              <motion.line
                className="about-eco__spoke"
                x1="50" y1="50"
                animate={{ x2: p.x, y2: p.y }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              />
              <circle cx="50" cy="50" r="17" fill="url(#eco-core)" />
              <circle cx="50" cy="50" r="10.5" className="about-eco__core" />
            </svg>

            <div className="about-eco__corelabel">
              <span className="font-mono">{c.coreLabel}</span>
              <span className="font-display">71</span>
            </div>

            {c.nodes.map((d, i) => {
              const q = pos(i)
              return (
                <button
                  key={d.id}
                  type="button"
                  className={`about-eco__node${i === active ? ' is-on' : ''}`}
                  style={{ left: `${q.x}%`, top: `${q.y}%`, ['--nc' as string]: d.color }}
                  onPointerEnter={() => { setManual(true); setActive(i) }}
                  onFocus={() => { setManual(true); setActive(i) }}
                  onClick={() => { setManual(true); setActive(i) }}
                  aria-pressed={i === active}
                  aria-label={d.name}
                >
                  <i aria-hidden="true" />
                  <span>{d.short}</span>
                </button>
              )
            })}
          </div>

          <div className="about-eco__side">
            <ul className="about-eco__core-list">
              {c.core.map((k) => (
                <li key={k}><i aria-hidden="true" />{k}</li>
              ))}
            </ul>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={node.id}
                className="about-eco__card"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <div className="about-eco__card-head">
                  <span className="about-eco__card-idx font-mono">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
                  <h3 className="font-display">{node.name}</h3>
                </div>
                <dl>
                  <div>
                    <dt className="font-mono">{c.givesLabel}</dt>
                    <dd>{node.gives}</dd>
                  </div>
                  <div>
                    <dt className="font-mono">{c.drawsLabel}</dt>
                    <dd>{node.draws}</dd>
                  </div>
                </dl>
                <Link to={node.href} className="about-eco__link">
                  {node.name}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="about-eco__foot font-mono">{c.footnote}</p>
      </div>
    </section>
  )
}
