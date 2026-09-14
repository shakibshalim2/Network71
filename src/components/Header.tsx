import { Link } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { ThemeToggleButton } from '@/components/ThemeToggle'
import Logo from '@/components/brand/Logo'
import { useHeaderState } from './header/useHeaderState'
import { IconSearch } from './header/icons'
import { NavLink, IconBtn } from './header/primitives'
import DivisionsMega from './header/DivisionsMega'
import LanguageMenu from './header/LanguageMenu'
import SearchOverlay from './header/SearchOverlay'
import MobileDrawer from './header/MobileDrawer'
import { usePublishedNavigation } from '@/lib/publicNavigation'
import { springSnappy } from '@/lib/motion'

export default function Header() {
  const s = useHeaderState()
  const navigation = usePublishedNavigation()
  const { pathname, t, glassy, mobileOpen, setMobileOpen, searchOpen, setSearchOpen } = s

  return (
    <>
      <header role="banner" className={`site-header${glassy ? ' is-glassy' : ''}`}>
        <div className="container-page site-header__row">

          {/* Logo */}
          <Link to="/" aria-label="Network71 — Home" className="site-header__logo mr-auto xl:mr-7">
            <span className="flex items-center sm:hidden">
              <Logo variant="auto" height={21} />
            </span>
            <span className="hidden sm:flex items-center">
              <Logo variant="auto" height={26} />
            </span>
          </Link>

          {/* Desktop nav */}
          <LayoutGroup id="primary-nav">
            <nav className="site-header__nav hidden xl:flex" aria-label="Main navigation">
              <DivisionsMega
                megaOpen={s.megaOpen} setMegaOpen={s.setMegaOpen}
                openMega={s.openMega} closeMega={s.closeMega} megaRef={s.megaRef} />

              {navigation.header.length ? navigation.header.map(item => (
                <NavLink href={item.href} active={pathname === item.href} key={item.id}>{item.title}</NavLink>
              )) : <>
                <NavLink href="/about" active={pathname === '/about'}>{t('nav.about')}</NavLink>
                <NavLink href="/projects" active={pathname.startsWith('/projects')}>{t('nav.ourWork')}</NavLink>
                <NavLink href="/global-presence" active={pathname === '/global-presence'}>{t('nav.globalPresence')}</NavLink>
                <NavLink href="/divisions/media" active={pathname === '/divisions/media'}>{t('nav.media')}</NavLink>
                <NavLink href="/investors" active={pathname === '/investors'}>{t('nav.investors')}</NavLink>
                <NavLink href="/careers" active={pathname === '/careers'}>{t('nav.careers')}</NavLink>
                <NavLink href="/contact" active={pathname === '/contact'}>{t('nav.contact')}</NavLink>
              </>}
            </nav>
          </LayoutGroup>

          {/* Desktop controls */}
          <div className="site-header__controls hidden xl:flex">
            <IconBtn label={t('header.searchSite')} onClick={() => { setMobileOpen(false); setSearchOpen(true) }}>
              <IconSearch size={16} />
            </IconBtn>
            <ThemeToggleButton size={40} />
            <LanguageMenu
              language={s.language} setLanguage={s.setLanguage} curLang={s.curLang}
              langOpen={s.langOpen} setLangOpen={s.setLangOpen}
              openLang={s.openLang} closeLang={s.closeLang} langRef={s.langRef} />
            <Link to="/contact" className="btn btn-ghost btn-sm site-header__cta">
              {t('header.connectShort')}
              <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="site-header__controls flex xl:hidden">
            <IconBtn label={t('header.searchSite')} onClick={() => setSearchOpen(true)}>
              <IconSearch size={18} />
            </IconBtn>
            <ThemeToggleButton size={40} />
            <motion.button
              type="button"
              onClick={() => { setSearchOpen(false); setMobileOpen(!mobileOpen) }}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className={`icon-btn hamburger${mobileOpen ? ' is-open' : ''}`}
              whileTap={{ scale: 0.92 }}
              transition={springSnappy}>
              <span className="hamburger__bars" aria-hidden="true">
                <motion.span animate={mobileOpen ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }} transition={springSnappy} />
                <motion.span animate={mobileOpen ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.18 }} />
                <motion.span animate={mobileOpen ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }} transition={springSnappy} />
              </span>
            </motion.button>
          </div>

        </div>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay
            key="search"
            searchQuery={s.searchQuery} setSearchQuery={s.setSearchQuery}
            searchResults={s.searchResults} byGroup={s.byGroup}
            recentSearches={s.recentSearches} setRecentSearches={s.setRecentSearches}
            closeSearch={s.closeSearch} handleResult={s.handleResult}
            searchRef={s.searchRef} searchPanelRef={s.searchPanelRef} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && !searchOpen && (
          <MobileDrawer
            key="drawer"
            pathname={pathname} setMobileOpen={setMobileOpen}
            mobileExpanded={s.mobileExpanded} toggleAccordion={s.toggleAccordion}
            language={s.language} setLanguage={s.setLanguage} drawerRef={s.drawerRef}
            publishedNavigation={navigation.header} />
        )}
      </AnimatePresence>
    </>
  )
}
