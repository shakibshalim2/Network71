import { useState } from 'react'
import { motion } from 'motion/react'
import type { AboutContent } from '../content/en'
import { VALUE_ICONS } from '../icons'
import Eyebrow from './Eyebrow'
import { springSoft } from '@/lib/motion'

/**
 * Numbered value ledger: one row per value, the active row expands and takes
 * its accent (same language as the Home divisions index). Replaces five small
 * centred icon cards.
 */
export default function Values({ c }: { c: AboutContent['values'] }) {
  const values = c.items
  const [active, setActive] = useState(0)
  return (
    <section className="bg-navy-dark section-y about-values">
      <div className="container-page">
        <div className="about-values__head">
          <div>
            <Eyebrow label={c.eyebrow} className="mb-4" />
            <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
              {c.title}
            </h2>
          </div>
          <span className="about-values__count font-display" aria-hidden="true">
            {String(active + 1).padStart(2, '0')}<span>/ {String(values.length).padStart(2, '0')}</span>
          </span>
        </div>
        <ol className="vled" onPointerLeave={() => undefined}>
          {values.map((v, i) => {
            const on = i === active
            return (
              <li
                key={v.id}
                className={`vled__row${on ? ' is-active' : ''}`}
                style={{ ['--va' as string]: v.color }}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                tabIndex={0}
              >
                {on && <motion.span layoutId="vled-bar" className="vled__bar" transition={springSoft} />}
                <span className="vled__idx font-display">{String(i + 1).padStart(2, '0')}</span>
                <span className="vled__icon" aria-hidden="true">{VALUE_ICONS[v.id]}</span>
                <h3 className="vled__title font-display">{v.title}</h3>
                <p className="vled__desc">{v.desc}</p>
                <span className="vled__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
