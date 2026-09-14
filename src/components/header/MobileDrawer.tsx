import type { RefObject } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Language } from '@/context/LanguageContext'
import { useT, DIVISION_HREF, DIVISION_COLOR, divKey } from '@/i18n'
import { ThemeSegmented } from '@/components/ThemeToggle'
import { MENU_DIVISIONS, LANG_OPTIONS } from './data'
import { MobileLink, MobileAccordion } from './primitives'
import type { PublicNavItem } from '@/lib/publicNavigation'
import { backdrop, drawerRight, EASE_OUT } from '@/lib/motion'

type Props = {
  pathname: string
  setMobileOpen: (v: boolean) => void
  mobileExpanded: string | null
  toggleAccordion: (key: string) => void
  language: Language
  setLanguage: (lang: Language) => void
  drawerRef: RefObject<HTMLDivElement | null>
  publishedNavigation: PublicNavItem[]
}

const item = { hidden: { opacity: 0, x: 14 }, show: { opacity: 1, x: 0, transition: { duration: 0.32, ease: EASE_OUT } } }

/** Mobile backdrop + slide-in navigation drawer. Mounted only while open. */
export default function MobileDrawer({
  pathname, setMobileOpen, mobileExpanded, toggleAccordion, language, setLanguage, drawerRef, publishedNavigation,
}: Props) {
  const { t } = useT()
  const morePages = [
    { label: t('nav.leadership'), href: '/leadership' },
    { label: t('nav.history'), href: '/timeline' },
    { label: t('nav.sustainability'), href: '/sustainability' },
    { label: t('nav.governance'), href: '/governance' },
    { label: t('nav.press'), href: '/press' },
    { label: t('nav.blog'), href: '/blog' },
    { label: t('nav.gallery'), href: '/gallery' },
    { label: t('nav.brand'), href: '/brand' },
    { label: t('nav.legal'), href: '/legal' },
  ]
  return (
    <>
      <motion.div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className="overlay-backdrop"
        style={{ top: 'var(--header-h)', zIndex: 48 }}
        variants={backdrop} initial="hidden" animate="show" exit="hidden"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        ref={drawerRef}
        tabIndex={-1}
        className="mobile-drawer no-scrollbar"
        variants={drawerRight} initial="hidden" animate="show" exit="hidden">

        <motion.div
          className="mobile-drawer__body"
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.08 } } }}>

          <motion.div variants={item}><MobileLink href="/" active={pathname === '/'}>{t('nav.home')}</MobileLink></motion.div>

          <motion.div variants={item}>
            <MobileAccordion
              label={t('nav.divisions')}
              expanded={mobileExpanded === 'divisions'}
              onToggle={() => toggleAccordion('divisions')}>
              {MENU_DIVISIONS.map(id => (
                <Link key={id} to={DIVISION_HREF[id]} className="mobile-sublink">
                  <span className="mobile-sublink__dot" style={{ background: DIVISION_COLOR[id] }} />
                  <span>{t(divKey(id, 'short'))}</span>
                </Link>
              ))}
              <Link to="/ezyify" className="mobile-sublink mobile-sublink--flagship">
                <span className="mobile-sublink__dot" style={{ background: 'var(--accent-purple)' }} />
                <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>Ezyify</span>
                <span className="mobile-sublink__tag">{t('header.flagship')}</span>
              </Link>
            </MobileAccordion>
          </motion.div>

          {publishedNavigation.length ? publishedNavigation.map(nav => (
            <motion.div variants={item} key={nav.id}>
              <MobileLink href={nav.href} active={pathname === nav.href}>{nav.title}</MobileLink>
            </motion.div>
          )) : <>
            <motion.div variants={item}><MobileLink href="/about" active={pathname === '/about'}>{t('nav.about')}</MobileLink></motion.div>
            <motion.div variants={item}><MobileLink href="/projects" active={pathname.startsWith('/projects')}>{t('nav.ourWork')}</MobileLink></motion.div>
            <motion.div variants={item}><MobileLink href="/global-presence" active={pathname === '/global-presence'}>{t('nav.globalPresence')}</MobileLink></motion.div>
            <motion.div variants={item}><MobileLink href="/divisions/media" active={pathname === '/divisions/media'}>{t('nav.media')}</MobileLink></motion.div>
            <motion.div variants={item}><MobileLink href="/investors" active={pathname === '/investors'}>{t('nav.investorRelations')}</MobileLink></motion.div>
            <motion.div variants={item}><MobileLink href="/careers" active={pathname === '/careers'}>{t('nav.careers')}</MobileLink></motion.div>
            <motion.div variants={item}><MobileLink href="/contact" active={pathname === '/contact'}>{t('nav.contact')}</MobileLink></motion.div>
          </>}

          <motion.div variants={item}>
            <MobileAccordion
              label={t('nav.more')}
              expanded={mobileExpanded === 'more'}
              onToggle={() => toggleAccordion('more')}>
              {morePages.map(page => (
                <Link key={page.href} to={page.href} className="mobile-sublink">
                  <span className="mobile-sublink__dot mobile-sublink__dot--small" />
                  <span>{page.label}</span>
                </Link>
              ))}
            </MobileAccordion>
          </motion.div>

          <motion.div variants={item} className="mobile-drawer__section">
            <p className="mobile-drawer__label">{t('header.appearance')}</p>
            <ThemeSegmented />
          </motion.div>

          <motion.div variants={item} className="mobile-drawer__section">
            <p className="mobile-drawer__label">{t('header.language')}</p>
            <div className="seg">
              {LANG_OPTIONS.map(l => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`seg__opt${language === l.code ? ' is-active' : ''}`}>
                  {l.short}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} style={{ paddingTop: 18 }}>
            <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
              {t('header.connect')}
              <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
          </motion.div>

        </motion.div>
      </motion.div>
    </>
  )
}
