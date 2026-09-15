import { motion, useReducedMotion } from 'motion/react'
import type { AboutContent } from '../content/en'
import { EASE_OUT } from '@/lib/motion'

/** Founder quote: words rise in sequence, the quote mark and monogram ring draw as strokes. */
export default function Quote({ c }: { c: AboutContent['quote'] }) {
  const reduce = useReducedMotion()
  const words = c.text.split(/\s+/).filter(Boolean)
  return (
    <section className="bg-navy section-y relative overflow-hidden about-quote">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/4 blur-3xl pointer-events-none"
        style={{ width: 'min(600px, 110vw)', aspectRatio: '1' }}
      />
      <motion.div
        className="relative container-page max-w-4xl text-center"
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.45 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } } }}
      >
        <svg className="about-quote__mark" viewBox="0 0 64 48" aria-hidden="true">
          <path pathLength="1" d="M14 4C7 9 4 16 4 26c0 10 5 16 12 16 6 0 10-4 10-9s-3-8-8-8c-2 0-3 0-4 1 1-8 6-14 13-18L14 4zm34 0c-7 5-10 12-10 22 0 10 5 16 12 16 6 0 10-4 10-9s-3-8-8-8c-2 0-3 0-4 1 1-8 6-14 13-18L48 4z" />
        </svg>
        <blockquote
          className="font-display text-white leading-snug mb-7 sm:mb-10 text-balance about-quote__text"
          style={{ fontSize: 'clamp(21px, 5vw, 38px)' }}
        >
          {words.map((w, i) => (
            <span key={i} className="about-quote__w">
              <motion.span
                style={{ display: 'inline-block' }}
                variants={{ hidden: { y: '105%', opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_OUT } } }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </blockquote>
        <motion.div
          className="flex items-center justify-center gap-3 sm:gap-4"
          variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } } }}
        >
          <span className="about-quote__mono">
            <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" pathLength="1" /></svg>
            <span className="text-gold font-display text-base sm:text-lg">{c.initial}</span>
          </span>
          <div className="text-left">
            <p className="text-white font-semibold text-[13px] sm:text-sm">{c.name}</p>
            <p className="text-gold text-[11px] sm:text-xs tracking-wide">{c.role}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
