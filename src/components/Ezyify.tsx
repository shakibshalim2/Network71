import { useState, useEffect, useRef } from 'react'
import { useInView } from 'motion/react'
import { useT } from '@/i18n'
import { TAB_IDS, TAB_COLOR } from './ezyify-section/data'
import TabPanel from './ezyify-section/TabPanel'
import PhoneStage from './ezyify-section/PhoneStage'

const AUTO_MS = 4500

export default function Ezyify() {
  const { t } = useT()
  const [tabIdx, setTabIdx] = useState(0)
  const [hover, setHover] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.25 })
  // Only rotate while the section is actually on screen and not being read.
  const paused = !inView || hover

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setTabIdx(i => (i + 1) % TAB_IDS.length), AUTO_MS)
    return () => clearInterval(id)
  }, [paused, tabIdx])

  const currentId = TAB_IDS[tabIdx]
  const currentColor = TAB_COLOR[currentId]

  return (
    <section
      id="ezyify"
      ref={ref}
      className="relative overflow-hidden ezy"
      style={{ background: 'var(--s1)', ['--ezy-accent' as string]: currentColor }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {/* Ambient glows — sized in vw so they never force horizontal overflow; tinted by the active tab */}
      <div className="ezy__glow ezy__glow--a" aria-hidden="true" />
      <div className="ezy__glow ezy__glow--b" aria-hidden="true" />
      {/* Subtle grid */}
      <div className="absolute inset-0 ezy-grid pointer-events-none" />

      <div className="relative container-page section-y">

        {/* Badge */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div
            className="flex items-center gap-2 px-3.5 py-2 sm:gap-3 sm:px-5 sm:py-2.5 rounded-full ezy-badge"
          >
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--brand)', boxShadow: '0 0 6px var(--brand)' }} />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-center" style={{ color: 'var(--fg-muted)' }}>
              {t('ezyify.badge')}
            </span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-20 items-center">
          {/* ── Left: text content ── */}
          <TabPanel tabIdx={tabIdx} onSelect={setTabIdx} autoMs={AUTO_MS} paused={paused} />
          {/* ── Right: phone mockup ── */}
          <PhoneStage tabId={currentId} color={currentColor} />
        </div>
      </div>
    </section>
  )
}
