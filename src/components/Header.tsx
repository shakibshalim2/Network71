import { Link } from 'react-router-dom'
import { ThemeToggleButton } from '@/components/ThemeToggle'
import Logo from '@/components/brand/Logo'
import { useHeaderState } from './header/useHeaderState'
import { IconSearch } from './header/icons'
import { NavLink, IconBtn } from './header/primitives'
import DivisionsMega from './header/DivisionsMega'
import LanguageMenu from './header/LanguageMenu'
import SearchOverlay from './header/SearchOverlay'
import MobileDrawer from './header/MobileDrawer'

export default function Header() {
  const s = useHeaderState()
  const { pathname, t, glassy, mobileOpen, setMobileOpen, searchOpen, setSearchOpen } = s

  return (
    <>
      {/* ════════════════════════════════════════════
          STICKY HEADER BAR
      ════════════════════════════════════════════ */}
      <header
        role="banner"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          height: 'var(--header-h)',
          background: glassy ? 'var(--header-bg)' : 'var(--header-idle-bg)',
          backdropFilter: glassy ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: glassy ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: glassy ? '1px solid var(--line)' : '1px solid transparent',
          boxShadow: glassy ? 'var(--shadow-card)' : 'none',
          transition: 'background 0.35s, backdrop-filter 0.35s, border-color 0.35s, box-shadow 0.35s',
        }}>

        <div
          className="container-page"
          style={{
            height: '100%',
            display: 'flex', alignItems: 'center',
          }}>

          {/* ── Logo (always visible, exactly one) ─── */}
          <Link
            to="/"
            aria-label="Network71 — Home"
            className="mr-auto xl:mr-7"
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0, minWidth: 0 }}>
            <span className="flex items-center sm:hidden">
              <Logo variant="auto" height={21} />
            </span>
            <span className="hidden sm:flex items-center">
              <Logo variant="auto" height={26} />
            </span>
          </Link>

          {/* ══════════════════════════════════════
              DESKTOP NAV  (hidden on < lg)
          ══════════════════════════════════════ */}
          <nav
            className="hidden xl:flex gap-3.5 xl:gap-5 2xl:gap-[22px]"
            aria-label="Main navigation"
            style={{ alignItems: 'center', flex: 1, minWidth: 0 }}>

            {/* Divisions mega-menu */}
            <DivisionsMega
              megaOpen={s.megaOpen} setMegaOpen={s.setMegaOpen}
              openMega={s.openMega} closeMega={s.closeMega} megaRef={s.megaRef} />

            <NavLink href="/about"            active={pathname === '/about'}>{t('nav.about')}</NavLink>
            <NavLink href="/projects" active={pathname.startsWith('/projects')}>{t('nav.ourWork')}</NavLink>
            <NavLink href="/global-presence"  active={pathname === '/global-presence'}>{t('nav.globalPresence')}</NavLink>
            <NavLink href="/divisions/media"  active={pathname === '/divisions/media'}>{t('nav.media')}</NavLink>
            <NavLink href="/investors"        active={pathname === '/investors'}>{t('nav.investors')}</NavLink>
            <NavLink href="/careers"          active={pathname === '/careers'}>{t('nav.careers')}</NavLink>
            <NavLink href="/contact"          active={pathname === '/contact'}>{t('nav.contact')}</NavLink>
          </nav>

          {/* ══════════════════════════════════════
              DESKTOP RIGHT CONTROLS  (hidden on < lg)
          ══════════════════════════════════════ */}
          <div
            className="hidden xl:flex"
            style={{ alignItems: 'center', gap: 4, marginLeft: 'auto', flexShrink: 0 }}>

            {/* Search */}
            <IconBtn label={t('header.searchSite')} onClick={() => { setMobileOpen(false); setSearchOpen(true) }}>
              <IconSearch size={16} />
            </IconBtn>

            {/* Theme */}
            <ThemeToggleButton size={40} />

            {/* Language */}
            <LanguageMenu
              language={s.language} setLanguage={s.setLanguage} curLang={s.curLang}
              langOpen={s.langOpen} setLangOpen={s.setLangOpen}
              openLang={s.openLang} closeLang={s.closeLang} langRef={s.langRef} />

            {/* CTA */}
            <Link
              to="/contact"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 8, marginLeft: 4,
                fontSize: 12.5, fontWeight: 600, letterSpacing: '0.02em',
                border: '1px solid var(--brand-edge)', color: 'var(--brand-fg)',
                background: 'var(--brand-wash)', textDecoration: 'none',
                transition: 'all 0.18s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--brand)'
                e.currentTarget.style.color = 'var(--s0)'
                e.currentTarget.style.borderColor = 'var(--brand)'
                e.currentTarget.style.boxShadow = '0 0 22px var(--brand-edge)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--brand-wash)'
                e.currentTarget.style.color = 'var(--brand)'
                e.currentTarget.style.borderColor = 'var(--brand-edge)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
              {t('header.connectShort')}
              <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2"
                style={{ width: 11, height: 11 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
          </div>

          {/* ══════════════════════════════════════
              MOBILE RIGHT CONTROLS  (hidden on lg+)
              NOTE: use Tailwind class "flex xl:hidden" — NO inline display property —
              so Tailwind can correctly hide this at the lg breakpoint.
          ══════════════════════════════════════ */}
          <div
            className="flex xl:hidden"
            style={{ alignItems: 'center', gap: 2, marginLeft: 'auto' }}>

            {/* Search */}
            <IconBtn label={t('header.searchSite')} onClick={() => setSearchOpen(true)}>
              <IconSearch size={18} />
            </IconBtn>

            {/* Theme — one tap, no need to open the drawer */}
            <ThemeToggleButton size={40} />

            {/* Hamburger / Close — single button, icon swaps */}
            <button
              onClick={() => { setSearchOpen(false); setMobileOpen(v => !v) }}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              style={{
                width: 40, height: 40, borderRadius: 10, border: 'none', flexShrink: 0,
                background: mobileOpen ? 'var(--line-strong)' : 'transparent',
                color: 'var(--fg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'background 0.15s',
              }}>
              <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ width: 20, height: 20, transition: 'opacity 0.15s' }}>
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 5l12 12M17 5L5 17" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 7h15M3.5 11h15M3.5 15h15" />}
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* ════════════════════════════════════════════
          SEARCH OVERLAY
      ════════════════════════════════════════════ */}
      <SearchOverlay
        searchOpen={searchOpen} searchQuery={s.searchQuery} setSearchQuery={s.setSearchQuery}
        searchResults={s.searchResults} byGroup={s.byGroup}
        recentSearches={s.recentSearches} setRecentSearches={s.setRecentSearches}
        closeSearch={s.closeSearch} handleResult={s.handleResult}
        searchRef={s.searchRef} searchPanelRef={s.searchPanelRef} />

      {/* ════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════ */}
      <MobileDrawer
        pathname={pathname} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} searchOpen={searchOpen}
        mobileExpanded={s.mobileExpanded} toggleAccordion={s.toggleAccordion}
        language={s.language} setLanguage={s.setLanguage} drawerRef={s.drawerRef} />
    </>
  )
}
