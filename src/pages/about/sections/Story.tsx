import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import type { AboutContent } from '../content/en'
import Eyebrow from './Eyebrow'
import CountUp from '@/components/motion/CountUp'

// Division accents in content order; anything past the list falls back to gold.
const DOTS = [
  'var(--accent-pink)', 'var(--accent-green)', 'var(--accent-orange)', 'var(--accent-amber)',
  'var(--accent-teal)', 'var(--brand-fg)', 'var(--accent-blue)', 'var(--accent-cyan)',
  'var(--accent-blue)', 'var(--accent-purple)',
]

export default function Story({ c }: { c: AboutContent['story'] }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const year = c.p1.match(/\b(19|20)\d{2}\b/)?.[0] ?? ''

  return (
    <section className="bg-navy section-y about-story">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="about-story__copy">
            {year && <span className="about-story__year font-display" aria-hidden="true">{year}</span>}
            <Eyebrow label={c.eyebrow} />
            <h2
              className="font-display text-white mb-5 sm:mb-6 leading-tight tracking-[-0.02em]"
              style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}
            >
              {c.title}
            </h2>
            <p className="about-story__lead text-slate-400 leading-relaxed mb-4 sm:mb-5">{c.p1}</p>
            <p className="text-slate-400 leading-relaxed mb-4 sm:mb-5 text-[14px] sm:text-base">{c.p2}</p>
            <p className="text-slate-400 leading-relaxed text-[14px] sm:text-base">{c.p3}</p>
          </div>

          {/* Dossier plate: parallax photo, accent division dots, counting figure. `force-dark` keeps it legible in both themes. */}
          <div ref={ref} className="relative">
            <div className="about-plate relative overflow-hidden rounded-2xl force-dark min-h-[340px] sm:min-h-[400px] lg:min-h-[420px]">
              <motion.img
                src={c.imageSrc}
                alt={c.imageAlt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={reduce ? undefined : { y, scale: 1.18 }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgb(4 8 14 / 0.92) 0%, rgb(4 8 14 / 0.80) 60%, rgb(4 8 14 / 0.55) 100%)' }}
              />
              <span className="about-plate__grid" aria-hidden="true" />
              <span className="about-plate__corner about-plate__corner--tl" aria-hidden="true" />
              <span className="about-plate__corner about-plate__corner--br" aria-hidden="true" />
              <div className="relative p-6 sm:p-8 lg:p-10">
                <ol className="about-plate__list grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-y-3">
                  {c.divisions.map((div, i) => (
                    <li key={div} className="about-plate__row" style={{ ['--i' as string]: i, ['--dot' as string]: DOTS[i] ?? 'var(--brand-fg)' }}>
                      <span className="about-plate__idx">{String(i + 1).padStart(2, '0')}</span>
                      <span className="about-plate__dot" aria-hidden="true" />
                      <span className="text-slate-200 text-[13px] sm:text-sm">{div}</span>
                    </li>
                  ))}
                </ol>
                <div className="about-plate__foot mt-6 pt-5 sm:mt-8 sm:pt-6">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-slate-400 uppercase">{c.activeLabel}</p>
                  <p className="font-display text-3xl sm:text-4xl text-gold mt-1"><CountUp value={c.activeValue} /></p>
                  <p className="text-slate-400 text-[12.5px] sm:text-[13px] mt-1">{c.activeSub}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
