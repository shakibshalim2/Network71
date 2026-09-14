import type { RefObject } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useT, DIVISION_HREF, DIVISION_COLOR, divKey } from '@/i18n'
import { DIVISION_ICONS, MENU_DIVISIONS } from './data'
import { DivisionIcon } from './icons'
import { popover, springSnappy } from '@/lib/motion'

type Props = {
  megaOpen: boolean
  setMegaOpen: (v: boolean | ((prev: boolean) => boolean)) => void
  openMega: () => void
  closeMega: () => void
  megaRef: RefObject<HTMLDivElement | null>
}

/** Desktop "Divisions" trigger + mega panel. */
export default function DivisionsMega({ megaOpen, setMegaOpen, openMega, closeMega, megaRef }: Props) {
  const { t } = useT()
  return (
    <div
      ref={megaRef}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setMegaOpen(false) }}
      style={{ position: 'relative' }}
      onMouseEnter={openMega}
      onMouseLeave={closeMega}>

      <button
        type="button"
        aria-haspopup="true"
        aria-controls="division-menu"
        onClick={() => setMegaOpen(v => !v)}
        aria-expanded={megaOpen}
        className={`nav-link nav-link--button${megaOpen ? ' is-open' : ''}`}>
        <span className="nav-link__label">{t('nav.divisions')}</span>
        <motion.svg
          viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          animate={{ rotate: megaOpen ? 180 : 0 }}
          transition={springSnappy}
          style={{ width: 10, height: 10, opacity: 0.6 }}>
          <path d="M2 4l4 4 4-4" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {megaOpen && (
          <motion.div
            id="division-menu"
            key="mega"
            variants={popover}
            initial="hidden"
            animate="show"
            exit="hidden"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            className="mega-panel no-scrollbar"
            style={{ transformOrigin: 'top left' }}>

            <div className="mega-panel__head">
              <span className="mega-panel__eyebrow">{t('header.ourBusinesses')}</span>
              <Link to="/about" className="mega-panel__all">{t('header.viewAll')}</Link>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2"
              style={{ gap: 2, marginBottom: 8 }}
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025, delayChildren: 0.04 } } }}>
              {MENU_DIVISIONS.map(id => (
                <motion.div key={id} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}>
                  <Link to={DIVISION_HREF[id]} className="mega-item">
                    <DivisionIcon path={DIVISION_ICONS[id]} color={DIVISION_COLOR[id]} />
                    <div style={{ minWidth: 0 }}>
                      <div className="mega-item__title">{t(divKey(id, 'short'))}</div>
                      <div className="mega-item__desc">{t(divKey(id, 'desc'))}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Ezyify flagship strip */}
            <Link to="/ezyify" className="mega-flagship">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <span className="mega-flagship__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span className="mega-flagship__title">Ezyify</span>
                    <span className="mega-flagship__badge">{t('header.flagship')}</span>
                  </div>
                  <div className="mega-flagship__desc">{t(divKey('ezyify', 'desc'))}</div>
                </div>
              </div>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                className="mega-flagship__arrow">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
