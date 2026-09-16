import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'motion/react'
import { useT } from '@/i18n'
import ScaledPhone from './PhoneMockup'
import type { TabId } from './data'
import Tilt from '@/components/motion/Tilt'
import { EASE_OUT } from '@/lib/motion'

export default function PhoneStage({ tabId, color }: { tabId: TabId, color: string }) {
  const { t } = useT()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  // Device floats up slightly against the page as the section scrolls through.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40])
  const badgeY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 70, reduce ? 0 : -70])

  return (
    <div ref={ref} className="force-dark phone-ui flex justify-center items-center relative py-6 sm:py-12">
      {/* Ambient glow tied to active tab */}
      <div className="w-[240px] h-[240px] sm:w-[340px] sm:h-[340px]" style={{ position: 'absolute', borderRadius: '50%', background: `color-mix(in srgb, ${color} 9%, transparent)`, filter: 'blur(72px)', transition: 'background 0.6s', pointerEvents: 'none' }} />

      {/* Floating notification badge — kept inside bounds on small screens */}
      <motion.div
        className="left-0 sm:-left-[4%] px-2.5 py-1.5 sm:px-3 sm:py-2"
        style={{ y: badgeY, position: 'absolute', top: '6%', borderRadius: 13, background: 'rgba(9,9,18,0.92)', border: '1px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(14px)', boxShadow: 'var(--shadow-device)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, animation: 'floatY 4s ease-in-out infinite' }}>
          <div className="w-6 h-6 sm:w-7 sm:h-7 text-[11px] sm:text-[13px]" style={{ borderRadius: 8, background: 'linear-gradient(135deg,#A855F7,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🛍️</div>
          <div>
            <div className="text-[8.5px] sm:text-[9.5px]" style={{ fontWeight: 700, color: 'var(--fg)' }}>{t('ezyify.float.newOrder')}</div>
            <div className="text-[7px] sm:text-[8px]" style={{ color: 'var(--fg-subtle)' }}>{t('ezyify.float.orderItem')}</div>
          </div>
        </div>
      </motion.div>

      {/* Floating AI badge */}
      <motion.div
        className="right-0 sm:-right-[4%] px-2.5 py-1.5 sm:px-3 sm:py-2"
        style={{ y: badgeY, position: 'absolute', bottom: '8%', borderRadius: 13, background: 'rgba(9,9,18,0.92)', border: '1px solid rgba(236,72,153,0.25)', backdropFilter: 'blur(14px)', boxShadow: 'var(--shadow-device)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, animation: 'floatY 4s ease-in-out infinite', animationDelay: '2s' }}>
          <div className="w-6 h-6 sm:w-7 sm:h-7 text-[11px] sm:text-[13px]" style={{ borderRadius: 8, background: 'linear-gradient(135deg,#EC4899,#f43f5e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✦</div>
          <div>
            <div className="text-[8.5px] sm:text-[9.5px]" style={{ fontWeight: 700, color: 'var(--fg)' }}>{t('ezyify.float.aiSuggestion')}</div>
            <div className="text-[7px] sm:text-[8px]" style={{ color: 'var(--accent-pink)' }}>{t('ezyify.float.match')}</div>
          </div>
        </div>
      </motion.div>

      <motion.div style={{ y, width: '100%' }}>
        <Tilt max={6} perspective={1400} className="ezy-device">
          <span className="ezy-device__shine" aria-hidden="true" />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={tabId}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <ScaledPhone tabId={tabId} color={color} />
            </motion.div>
          </AnimatePresence>
        </Tilt>
      </motion.div>
    </div>
  )
}
