import { useState, useEffect } from 'react'
import { useT } from '@/i18n'
import { TAB_IDS, TAB_COLOR } from './ezyify-section/data'
import TabPanel from './ezyify-section/TabPanel'
import PhoneStage from './ezyify-section/PhoneStage'

export default function Ezyify() {
  const { t } = useT()
  const [tabIdx, setTabIdx] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setTabIdx(i => (i + 1) % TAB_IDS.length), 4500)
    return () => clearInterval(id)
  }, [])

  const currentId = TAB_IDS[tabIdx]
  const currentColor = TAB_COLOR[currentId]

  return (
    <section id="ezyify" className="relative overflow-hidden" style={{ background: 'var(--s1)' }}>
      {/* Ambient glows — sized in vw so they never force horizontal overflow */}
      <div style={{ position: 'absolute', top: '-10%', left: '12%', width: 'min(700px, 90vw)', aspectRatio: '1', borderRadius: '50%', background: 'rgba(124,58,237,0.065)', filter: 'blur(140px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-5%', right: '12%', width: 'min(500px, 70vw)', aspectRatio: '1', borderRadius: '50%', background: 'rgba(236,72,153,0.045)', filter: 'blur(120px)', pointerEvents: 'none' }} />
      {/* Subtle grid */}
      <div className="absolute inset-0 ezy-grid pointer-events-none" />

      <div className="relative container-page section-y">

        {/* Badge */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div
            className="flex items-center gap-2 px-3.5 py-2 sm:gap-3 sm:px-5 sm:py-2.5 rounded-full"
            style={{ border: '1px solid rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.07)' }}>
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--brand)', boxShadow: '0 0 6px var(--brand)' }} />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-center" style={{ color: 'var(--fg-muted)' }}>
              {t('ezyify.badge')}
            </span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-20 items-center">
          {/* ── Left: text content ── */}
          <TabPanel tabIdx={tabIdx} onSelect={setTabIdx} />
          {/* ── Right: phone mockup ── */}
          <PhoneStage tabId={currentId} color={currentColor} />
        </div>
      </div>
    </section>
  )
}
