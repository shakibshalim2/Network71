import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useT } from '@/i18n'
import { EASE_OUT } from '@/lib/motion'

const rise = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT } } }

/** Main text content: eyebrow, H1, lead, CTAs, interaction hints, scroll indicator. */
export default function HeroContent() {
  const { t } = useT()
  return (
    <div className="hero-content" style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
      <div
        className="container-page w-full"
        style={{
          paddingTop: 'calc(var(--header-h) + clamp(36px, 8vw, 60px))',
          paddingBottom: 'clamp(36px, 7vw, 52px)',
        }}>
        <motion.div
          style={{ maxWidth: 560 }}
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } } }}>

          {/* Eyebrow */}
          <motion.div variants={rise} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(18px, 4vw, 30px)' }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: 'var(--brand)',
              animation: 'pulse-slow 2.8s ease-in-out infinite', flexShrink: 0,
            }} />
            <span
              className="text-[11px] tracking-[0.2em]"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand-fg)',
                textTransform: 'uppercase',
              }}>
              {t('hero.eyebrow')}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={rise}
            className="font-display"
            style={{
              /* 8.5vw lets the two lines fill small screens without overflowing */
              fontSize: 'clamp(33px, 8.5vw, 84px)',
              color: 'var(--fg-strong)',
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              marginBottom: 'clamp(14px, 3vw, 22px)',
            }}
          >
            {t('hero.title1')}
            <br />
            <em style={{ color: 'var(--brand-fg)' }}>{t('hero.title2')}</em>
          </motion.h1>

          {/* Body */}
          <motion.p variants={rise} style={{
            color: 'var(--fg)',
            fontSize: 'clamp(15.5px, 3.6vw, 17.5px)',
            lineHeight: 1.7,
            maxWidth: 460,
            marginBottom: 'clamp(24px, 5vw, 36px)',
          }}>
            {t('hero.lead')}
          </motion.p>

          {/* CTAs — stack full-width on narrow screens, inline from 400px up */}
          <motion.div
            variants={rise}
            className="flex flex-col min-[400px]:flex-row min-[400px]:flex-wrap"
            style={{ gap: 12, marginBottom: 'clamp(26px, 6vw, 40px)' }}>
            <Link to="/projects" className="btn btn-primary btn-stack">
              {t('hero.ctaWork')}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-stack">
              {t('hero.ctaContact')}
            </Link>
          </motion.div>

          {/* Interaction hints — desktop only */}
          <motion.div variants={rise} className="hidden lg:flex" style={{ alignItems: 'center', gap: 20, marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 13, height: 13, color: 'var(--fg-faint)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225M13.684 16.6l2.224-2.51M6.228 15.228l-3.87-3.87a1.125 1.125 0 010-1.59L6.57 5.572m0 0l.943-.943M6.57 5.572L9.228 8.23" />
              </svg>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--fg-subtle)', textTransform: 'uppercase' }}>
                {t('hero.drag')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 13, height: 13, color: 'var(--fg-faint)' }}>
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 8v4l3 3" />
              </svg>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--fg-subtle)', textTransform: 'uppercase' }}>
                {t('hero.click')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              {['↑', '↓', '←', '→'].map(k => (
                <span key={k} style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 18, height: 18, borderRadius: 4,
                  border: '1px solid var(--line-strong)',
                  fontSize: 10, color: 'var(--fg-subtle)',
                }}>{k}</span>
              ))}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--fg-subtle)', textTransform: 'uppercase', marginLeft: 3 }}>
                {t('hero.keys')}
              </span>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={rise} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 20, height: 32, borderRadius: 10,
              border: '1px solid var(--line-strong)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
              paddingTop: 5,
            }}>
              <div style={{
                width: 3, height: 8, borderRadius: 2,
                background: 'var(--brand)',
                animation: 'scroll-dot 1.9s ease-in-out infinite',
              }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.18em', color: 'var(--fg-subtle)',
              textTransform: 'uppercase',
            }}>
              {t('hero.scroll')}
            </span>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}
