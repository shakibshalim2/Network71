import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useT } from '@/i18n'
import { TAB_IDS, TAB_COLOR, FEATURE_KEYS, tabKey, type TabId } from './data'
import { springSoft, EASE_OUT } from '@/lib/motion'
import Magnetic from '@/components/motion/Magnetic'

type Props = { tabIdx: number, onSelect: (i: number) => void, autoMs: number, paused: boolean }

export default function TabPanel({ tabIdx, onSelect, autoMs, paused }: Props) {
  const { t } = useT()
  const currentId: TabId = TAB_IDS[tabIdx]
  const currentColor = TAB_COLOR[currentId]

  return (
    <div>
      <h2
        className="font-display leading-none mb-3 sm:mb-4 ezy-word"
        style={{ fontSize: 'clamp(52px, 13vw, 100px)' }}
      >
        Ezyify
      </h2>
      <p className="text-[16px] sm:text-[18px] font-light tracking-wide mb-7 sm:mb-10 leading-relaxed" style={{ maxWidth: 420, color: 'var(--fg-muted)' }}>
        {t('ezyify.tagline')}
      </p>

      {/* Tab switcher — active plate slides between rows, progress bar times the auto-rotate */}
      <div className="ezy-tabs" role="tablist" aria-label="Ezyify features">
        {TAB_IDS.map((id, i) => {
          const color = TAB_COLOR[id]
          const on = i === tabIdx
          return (
            <button
              key={id}
              role="tab"
              aria-selected={on}
              onClick={() => onSelect(i)}
              className={`ezy-tab${on ? ' is-on' : ''}`}
              style={{ ['--tab-accent' as string]: color }}
            >
              {on && (
                <motion.span layoutId="ezy-tab-plate" className="ezy-tab__plate" transition={springSoft} aria-hidden="true" />
              )}
              <span className="ezy-tab__idx font-mono">0{i + 1}</span>
              <span className="ezy-tab__body">
                <span className="ezy-tab__label">{t(tabKey(id, 'label'))}</span>
                <span className="ezy-tab__desc">{t(tabKey(id, 'desc'))}</span>
              </span>
              {on && (
                <span className="ezy-tab__progress" aria-hidden="true">
                  <motion.span
                    key={`${id}-${autoMs}`}
                    className="ezy-tab__progress-fill"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? undefined : 1 }}
                    transition={{ duration: autoMs / 1000, ease: 'linear' }}
                  />
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Feature bullets crossfade with the tab */}
      <div className="ezy-features">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentId}
            className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-y-2 gap-x-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
          >
            {FEATURE_KEYS.map(f => (
              <div key={f} className="flex items-center gap-2.5">
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: currentColor, flexShrink: 0, boxShadow: `0 0 8px ${currentColor}` }} />
                <span style={{ fontSize: 13.5, color: 'var(--fg-muted)' }}>{t(tabKey(currentId, f))}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <Magnetic strength={10} className="w-full min-[400px]:w-auto">
          <Link
            to="/ezyify"
            className="group btn w-full min-[400px]:w-auto text-white ezy-cta"
          >
            {t('ezyify.cta')}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </Magnetic>
      </div>
      <p className="font-mono text-[11px] tracking-wide mt-5" style={{ color: 'var(--fg-subtle)' }}>{t('ezyify.partOf')}</p>
    </div>
  )
}
