import { useState, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useT, DIVISION_HREF, DIVISION_COLOR, divKey, type DivisionId, type TKey } from '@/i18n'
import { DIVISION_ICONS, MENU_DIVISIONS } from './data'
import { DivisionIcon } from './icons'
import { popover, springSnappy, springSoft, EASE_OUT } from '@/lib/motion'

type Props = {
  megaOpen: boolean
  setMegaOpen: (v: boolean | ((prev: boolean) => boolean)) => void
  openMega: () => void
  closeMega: () => void
  megaRef: RefObject<HTMLDivElement | null>
}

const IMAGE_KEY = (id: DivisionId) => `home.divisions.${id}.image` as TKey

/**
 * Desktop "Divisions" trigger + mega panel. Two panes: a numbered list on the
 * left, and a preview pane on the right that crossfades to the hovered
 * division's photo, tag and description. The active row carries a sliding
 * accent bar; the panel's ambient glow re-tints to the division colour.
 */
export default function DivisionsMega({ megaOpen, setMegaOpen, openMega, closeMega, megaRef }: Props) {
  const { t } = useT()
  const reduce = useReducedMotion()
  const [active, setActive] = useState<DivisionId>(MENU_DIVISIONS[0])
  const color = DIVISION_COLOR[active]

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
            style={{ transformOrigin: 'top left', ['--mega-accent' as string]: color }}>

            <span className="mega-panel__glow" aria-hidden="true" />

            <div className="mega-panel__head">
              <span className="mega-panel__eyebrow">
                <span className="eyebrow-rule" />
                {t('header.ourBusinesses')}
                <span className="dix__count">{MENU_DIVISIONS.length + 1}</span>
              </span>
              <Link to="/about" className="mega-panel__all">{t('header.viewAll')}</Link>
            </div>

            <div className="mega-panel__body">
              {/* ── Left: numbered list ── */}
              <motion.ul
                className="mega-list"
                role="list"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.022, delayChildren: 0.04 } } }}>
                {MENU_DIVISIONS.map((id, i) => {
                  const on = id === active
                  return (
                    <motion.li key={id} variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0, transition: { duration: 0.28, ease: EASE_OUT } } }}>
                      <Link
                        to={DIVISION_HREF[id]}
                        className={`mega-item${on ? ' is-active' : ''}`}
                        style={{ ['--item-accent' as string]: DIVISION_COLOR[id] }}
                        onMouseEnter={() => setActive(id)}
                        onFocus={() => setActive(id)}>
                        {on && <motion.span layoutId="mega-bar" className="mega-item__bar" transition={springSoft} aria-hidden="true" />}
                        <span className="mega-item__idx font-mono">{String(i + 1).padStart(2, '0')}</span>
                        <DivisionIcon path={DIVISION_ICONS[id]} color={DIVISION_COLOR[id]} />
                        <span className="mega-item__title">{t(divKey(id, 'short'))}</span>
                        <svg className="mega-item__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
                        </svg>
                      </Link>
                    </motion.li>
                  )
                })}
              </motion.ul>

              {/* ── Right: live preview ── */}
              <Link to={DIVISION_HREF[active]} className="mega-preview" aria-label={t(divKey(active, 'name'))}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={active}
                    src={t(IMAGE_KEY(active))}
                    alt=""
                    draggable={false}
                    initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  />
                </AnimatePresence>
                <span className="mega-preview__scrim" aria-hidden="true" />
                <span className="mega-preview__num font-display" aria-hidden="true">
                  {String((MENU_DIVISIONS as readonly DivisionId[]).indexOf(active) + 1).padStart(2, '0')}
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active}
                    className="mega-preview__copy"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}>
                    <span className="mega-preview__tag font-mono" style={{ color }}>{t(divKey(active, 'tag'))}</span>
                    <span className="mega-preview__name font-display">{t(divKey(active, 'name'))}</span>
                    <span className="mega-preview__desc">{t(divKey(active, 'card'))}</span>
                    <span className="mega-preview__cta" style={{ color }}>
                      {t('divisions.explore')}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
                    </span>
                  </motion.span>
                </AnimatePresence>
              </Link>
            </div>

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
