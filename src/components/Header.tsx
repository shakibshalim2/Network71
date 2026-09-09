import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage, type Language } from '@/context/LanguageContext'
import { useT, DIVISION_IDS, DIVISION_HREF, DIVISION_COLOR, divKey, type DivisionId } from '@/i18n'
import { ThemeToggleButton, ThemeSegmented } from '@/components/ThemeToggle'
import Logo from '@/components/brand/Logo'
import { useDialogFocus } from '@/lib/useDialogFocus'

// ─── Division data ────────────────────────────────────────────────────────────

const DIVISION_ICONS: Record<DivisionId, string> = {
  garments:    'M3 6l3-3 12 0 3 3M3 6v12l3 3h12l3-3V6M9 21V9m6 12V9M9 9H3m6 0h6m0 0h6',
  agriculture: 'M12 3C8 3 5 6 5 9c0 4.5 7 12 7 12s7-7.5 7-12c0-3-3-6-7-6zm0 7a2 2 0 110-4 2 2 0 010 4z',
  food:        'M9 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-2M9 3a2 2 0 002 2h2a2 2 0 002-2M9 3h6m-6 8h6m-6 4h4',
  energy:      'M13 10V3L4 14h7v7l9-11h-7z',
  it:          'M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5H9zM9 3v5h8M7 13h10M7 17h5',
  trading:     'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  ventures:    'M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8L12 3zM3 21h18',
  media:       'M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z',
  ship:        'M3 17l1.5 3h15L21 17M3 17c3 1.5 6 1.5 9 0s6-1.5 9 0M5 17V9h14v8M9 9V5h6v4M12 3v2',
  ezyify:      'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z',
}

// Mega-menu / drawer list: every division except Ezyify, which has its own flagship strip.
const MENU_DIVISIONS = DIVISION_IDS.filter(id => id !== 'ezyify')

// ─── Search index ─────────────────────────────────────────────────────────────

const SEARCH_INDEX = [
  { label: 'Our Work & Projects', href: '/projects', group: 'Pages' },
  { label: 'Home',                href: '/',                group: 'Pages' },
  { label: 'About Us',            href: '/about',           group: 'Pages' },
  { label: 'Leadership',          href: '/leadership',      group: 'Pages' },
  { label: 'Our History',         href: '/timeline',        group: 'Pages' },
  { label: 'Sustainability',      href: '/sustainability',  group: 'Pages' },
  { label: 'Global Presence',     href: '/global-presence', group: 'Pages' },
  { label: 'Gallery',             href: '/gallery',         group: 'Pages' },
  { label: 'Brand Identity',      href: '/brand',           group: 'Pages' },
  { label: 'Investor Relations',  href: '/investors',       group: 'Pages' },
  { label: 'Corporate Governance',href: '/governance',      group: 'Pages' },
  { label: 'Press Releases',      href: '/press',           group: 'Pages' },
  { label: 'Blog & Insights',     href: '/blog',            group: 'Pages' },
  { label: 'Careers',             href: '/careers',         group: 'Pages' },
  { label: 'Contact',             href: '/contact',         group: 'Pages' },
  { label: 'Legal',               href: '/legal',           group: 'Pages' },
  { label: 'Dhaka, Bangladesh',   href: '/global-presence', group: 'Locations' },
  { label: 'Middle East',         href: '/global-presence', group: 'Locations' },
  { label: 'Europe',              href: '/global-presence', group: 'Locations' },
  { label: 'Southeast Asia',      href: '/global-presence', group: 'Locations' },
  { label: 'Network71 News',      href: '/press',           group: 'Media' },
  { label: 'Network71 TV',        href: '/divisions/media', group: 'Media' },
  { label: 'Blog & Insights',     href: '/blog',            group: 'Media' },
]

const SUGGESTED_SEARCHES = [
  'Ezyify',
  'Investor Relations',
  'Global Presence',
  'Sustainability',
  'Careers',
]

const DEFAULT_RECENT = [
  { label: 'Ship Marketplace',   href: '/divisions/eshipe' },
  { label: 'Investor Relations', href: '/investors' },
  { label: 'Global Presence',   href: '/global-presence' },
]

// ─── Language options ─────────────────────────────────────────────────────────

const LANG_OPTIONS: { code: Language; label: string; short: string; flag: string }[] = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'bn', label: 'বাংলা',  short: 'BN', flag: '🇧🇩' },
]

// ─── Icon helpers ─────────────────────────────────────────────────────────────

function IconSearch({ size = 17 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      style={{ width: size, height: size, flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function IconClose({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
      style={{ width: size, height: size, flexShrink: 0 }}>
      <path strokeLinecap="round" d="M3 3l10 10M13 3L3 13" />
    </svg>
  )
}

function IconChevron({ down, size = 10 }: { down?: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      style={{ width: size, height: size, opacity: 0.5, flexShrink: 0 }}>
      <path d={down ? 'M2 4l4 4 4-4' : 'M4 2l4 4-4 4'} />
    </svg>
  )
}

function DivisionIcon({ path, color }: { path: string; color: string }) {
  return (
    <span style={{
      width: 34, height: 34, borderRadius: 8, flexShrink: 0,
      background: `color-mix(in srgb, ${color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 16%, transparent)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ width: 14, height: 14, opacity: 0.85 }}>
        <path d={path} />
      </svg>
    </span>
  )
}

// ─── Nav link (desktop) ───────────────────────────────────────────────────────

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link to={href} aria-current={active ? 'page' : undefined} style={{
      fontSize: 13, fontWeight: 500, letterSpacing: '0.01em', minHeight: 44, display: 'inline-flex', alignItems: 'center',
      color: active ? 'var(--brand)' : 'var(--fg-muted)',
      textDecoration: 'none', position: 'relative', paddingBottom: 2,
      transition: 'color 0.15s', whiteSpace: 'nowrap',
    }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--fg-strong)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--fg-muted)' }}>
      {children}
      {active && (
        <span style={{
          position: 'absolute', bottom: -2, left: 0, right: 0, height: 1.5,
          background: 'linear-gradient(90deg,var(--brand),var(--brand-bright) 60%,transparent)',
          borderRadius: 1,
        }} />
      )}
    </Link>
  )
}

// ─── Icon button (shared for Search, etc.) ────────────────────────────────────

function IconBtn({
  label, onClick, children,
}: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        width: 40, height: 40, borderRadius: 10, border: 'none',
        background: 'transparent', color: 'var(--fg-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'color 0.15s, background 0.15s', flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg-strong)'; e.currentTarget.style.background = 'var(--line-strong)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.background = 'transparent' }}>
      {children}
    </button>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { language, setLanguage } = useLanguage()
  const { t } = useT()

  // Division entries rebuilt per language so search + menus stay translated.
  const divisionIndex = DIVISION_IDS.map(id => ({ label: t(divKey(id, 'short')), href: DIVISION_HREF[id], group: 'Divisions' }))
  const searchIndex = [...SEARCH_INDEX, ...divisionIndex]

  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [megaOpen, setMegaOpen]         = useState(false)
  const [langOpen, setLangOpen]         = useState(false)
  const [searchOpen, setSearchOpen]     = useState(false)
  const [searchQuery, setSearchQuery]   = useState('')
  const [recentSearches, setRecentSearches] = useState(DEFAULT_RECENT)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  const megaTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const langTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const searchRef  = useRef<HTMLInputElement>(null)
  const searchPanelRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const megaRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)
  useDialogFocus(searchOpen, searchPanelRef)
  useDialogFocus(mobileOpen && !searchOpen, drawerRef)
  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!megaRef.current?.contains(event.target as Node)) setMegaOpen(false)
      if (!langRef.current?.contains(event.target as Node)) setLangOpen(false)
    }
    const breakpoint = window.matchMedia('(min-width: 1280px)')
    const onResize = () => { setMobileOpen(false); setMegaOpen(false); setLangOpen(false) }
    document.addEventListener('pointerdown', onPointer)
    breakpoint.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      breakpoint.removeEventListener('change', onResize)
      clearTimeout(megaTimer.current); clearTimeout(langTimer.current)
    }
  }, [])

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
    setLangOpen(false)
    setSearchOpen(false)
    setSearchQuery('')
    setMobileExpanded(null)
  }, [pathname])

  // Lock body scroll when drawer or search is open
  useEffect(() => {
    document.body.style.overflow = (mobileOpen || searchOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, searchOpen])

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 60)
  }, [searchOpen])

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false); setLangOpen(false)
        if (searchOpen) { setSearchOpen(false); setSearchQuery('') }
        if (mobileOpen) setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen, mobileOpen])

  const openMega = () => { clearTimeout(megaTimer.current); setMegaOpen(true) }
  const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(false), 180) }
  const openLang  = () => { clearTimeout(langTimer.current);  setLangOpen(true) }
  const closeLang = () => { langTimer.current  = setTimeout(() => setLangOpen(false), 180) }

  const closeSearch = useCallback(() => { setSearchOpen(false); setSearchQuery('') }, [])

  const isHome  = pathname === '/'
  const glassy  = scrolled || !isHome
  const curLang = LANG_OPTIONS.find(l => l.code === language)!

  const searchResults = searchQuery.trim()
    ? searchIndex.filter(i =>
        i.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.group.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const byGroup = searchResults.reduce<Record<string, typeof searchIndex>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {})

  const handleResult = useCallback((href: string, label: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(r => r.href !== href)
      return [{ label, href }, ...filtered].slice(0, 4)
    })
    navigate(href)
    closeSearch()
  }, [navigate, closeSearch])

  const toggleAccordion = (key: string) =>
    setMobileExpanded(prev => (prev === key ? null : key))

  // ── Render ─────────────────────────────────────────────────────────────────

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
            <div
              ref={megaRef}
              onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setMegaOpen(false) }}
              style={{ position: 'relative' }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}>

              <button
                aria-haspopup="true"
                aria-controls="division-menu"
                onClick={() => setMegaOpen(v => !v)}
                aria-expanded={megaOpen}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 13, fontWeight: 500, letterSpacing: '0.01em',
                  color: megaOpen ? 'var(--brand)' : 'var(--fg-muted)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '2px 0', transition: 'color 0.15s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg-strong)' }}
                onMouseLeave={e => { if (!megaOpen) e.currentTarget.style.color = 'var(--fg-muted)' }}>
                {t('nav.divisions')}
                <svg
                  viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                  style={{ width: 10, height: 10, opacity: 0.5, transition: 'transform 0.22s', transform: megaOpen ? 'rotate(180deg)' : 'none' }}>
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </button>

              {/* Mega panel — positioned from trigger's left edge */}
              <div
                id="division-menu"
                inert={!megaOpen}
                aria-hidden={!megaOpen}
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 14px)',
                  left: 0,
                  width: 'min(620px, calc(100vw - var(--gutter) * 2))',
                  maxHeight: 'calc(100dvh - var(--header-h) - 28px)',
                  overflowY: 'auto',
                  background: 'var(--panel-bg)',
                  border: '1px solid var(--line-strong)',
                  borderRadius: 16,
                  boxShadow: 'var(--shadow-pop)',
                  padding: 10,
                  opacity: megaOpen ? 1 : 0,
                  transform: `translateY(${megaOpen ? 0 : -8}px)`,
                  pointerEvents: megaOpen ? 'auto' : 'none',
                  transition: 'opacity 0.18s, transform 0.18s',
                  zIndex: 60,
                }}>

                {/* Panel header */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '4px 10px 10px',
                  borderBottom: '1px solid var(--line)',
                  marginBottom: 6,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
                    textTransform: 'uppercase', color: 'var(--brand-fg)',
                  }}>{t('header.ourBusinesses')}</span>
                  <Link to="/about" style={{
                    fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em',
                    color: 'var(--brand-fg)', textDecoration: 'none',
                    transition: 'color 0.14s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--brand-edge)' }}>
                    {t('header.viewAll')}
                  </Link>
                </div>

                {/* Division grid — 1 col on very narrow panels, 2 col otherwise */}
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 2, marginBottom: 8 }}>
                  {MENU_DIVISIONS.map(id => (
                    <Link key={id} to={DIVISION_HREF[id]} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 10px', borderRadius: 10,
                      textDecoration: 'none', transition: 'background 0.12s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                      <DivisionIcon path={DIVISION_ICONS[id]} color={DIVISION_COLOR[id]} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.3 }}>
                          {t(divKey(id, 'short'))}
                        </div>
                        <div style={{
                          fontSize: 10.5, color: 'var(--fg-subtle)', marginTop: 1,
                          lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {t(divKey(id, 'desc'))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Ezyify flagship strip */}
                <Link to="/ezyify" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', borderRadius: 10,
                  background: 'linear-gradient(135deg,rgba(88,28,220,0.12) 0%,rgba(168,85,247,0.07) 100%)',
                  border: '1px solid rgba(124,58,237,0.22)',
                  textDecoration: 'none', transition: 'background 0.15s, border-color 0.15s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg,rgba(88,28,220,0.2) 0%,rgba(168,85,247,0.12) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg,rgba(88,28,220,0.12) 0%,rgba(168,85,247,0.07) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.22)'
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                      background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
                      </svg>
                    </span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>Ezyify</span>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 6.5, fontWeight: 700,
                          letterSpacing: '0.2em', textTransform: 'uppercase',
                          color: 'rgba(168,85,247,0.8)', padding: '2px 7px',
                          borderRadius: 4, background: 'rgba(168,85,247,0.12)',
                          border: '1px solid rgba(168,85,247,0.25)',
                        }}>{t('header.flagship')}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(168,85,247,0.65)', lineHeight: 1.35 }}>
                        {t(divKey('ezyify', 'desc'))}
                      </div>
                    </div>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                    style={{ width: 13, height: 13, color: 'rgba(168,85,247,0.5)', flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

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
            <div ref={langRef} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setLangOpen(false) }} style={{ position: 'relative' }} onMouseEnter={openLang} onMouseLeave={closeLang}>
              <button
                aria-label={`Language: ${curLang.label}`}
                aria-expanded={langOpen}
                aria-controls="language-menu"
                onClick={() => setLangOpen(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '6px 11px', borderRadius: 8,
                  background: 'transparent', border: '1px solid var(--line-strong)',
                  color: 'var(--fg-muted)', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--fg-strong)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.color = 'var(--fg-muted)' }}>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
                  style={{ width: 11, height: 11, opacity: 0.55, flexShrink: 0 }}>
                  <circle cx="10" cy="10" r="8" />
                  <path d="M2.5 10h15M10 2.5a12 12 0 010 15M10 2.5a12 12 0 000 15" strokeLinecap="round" />
                </svg>
                {curLang.short}
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                  style={{ width: 8, height: 8, opacity: 0.4, transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}>
                  <path d="M2 3.5l3 3 3-3" />
                </svg>
              </button>

              {/* Language dropdown */}
              <div
                id="language-menu"
                inert={!langOpen}
                aria-hidden={!langOpen}
                onMouseEnter={openLang}
                onMouseLeave={closeLang}
                style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 150,
                  background: 'var(--panel-bg)', border: '1px solid var(--line-strong)',
                  borderRadius: 10, boxShadow: 'var(--shadow-pop)',
                  padding: 5,
                  opacity: langOpen ? 1 : 0,
                  transform: `translateY(${langOpen ? 0 : -5}px)`,
                  pointerEvents: langOpen ? 'auto' : 'none',
                  transition: 'opacity 0.15s, transform 0.15s',
                  zIndex: 60,
                }}>
                {LANG_OPTIONS.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLanguage(l.code); setLangOpen(false) }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 9,
                      padding: '8px 11px', borderRadius: 7, border: 'none',
                      background: language === l.code ? 'rgba(200,150,42,0.1)' : 'transparent',
                      color: language === l.code ? 'var(--brand)' : 'var(--fg-muted)',
                      fontSize: 12.5, fontWeight: 500, cursor: 'pointer', transition: 'all 0.12s',
                    }}
                    onMouseEnter={e => { if (language !== l.code) { e.currentTarget.style.background = 'var(--line)'; e.currentTarget.style.color = 'var(--fg-strong)' } }}
                    onMouseLeave={e => { if (language !== l.code) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg-muted)' } }}>
                    <span style={{ fontSize: 14 }}>{l.flag}</span>
                    {l.label}
                    {language === l.code && (
                      <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2"
                        style={{ width: 10, height: 10, marginLeft: 'auto' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3 3 7-7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

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

      {/* Backdrop */}
      <div
        onClick={closeSearch}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 80,
          background: 'var(--scrim)', backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: searchOpen ? 1 : 0,
          pointerEvents: searchOpen ? 'auto' : 'none',
          transition: 'opacity 0.22s',
        }}
      />

      {/* Search panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site search"
        ref={searchPanelRef}
        tabIndex={-1}
        inert={!searchOpen}
        aria-hidden={!searchOpen}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 81,
          background: 'var(--overlay-bg)',
          borderBottom: '1px solid var(--line-strong)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: 'var(--shadow-pop)',
          transform: `translateY(${searchOpen ? 0 : '-100%'})`,
          transition: 'transform 0.26s cubic-bezier(0.4,0,0.2,1)',
        }}>

        {/* Input row */}
        <div className="px-4 sm:px-6" style={{ maxWidth: 760, margin: '0 auto', paddingTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              style={{ width: 20, height: 20, color: 'var(--brand-fg)', flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && searchResults.length > 0) {
                  handleResult(searchResults[0].href, searchResults[0].label)
                }
              }}
              placeholder={t('header.searchPlaceholder')}
              style={{
                flex: 1, minWidth: 0, background: 'none', border: 'none', outline: 'none',
                /* 16px min prevents iOS Safari auto-zoom on focus */
                fontSize: 16, fontWeight: 400, color: 'var(--fg)',
                caretColor: 'var(--brand)',
              }}
            />
            <button
              onClick={closeSearch}
              aria-label="Close search"
              className="hidden sm:flex"
              style={{
                alignItems: 'center', gap: 5,
                padding: '5px 10px', borderRadius: 6,
                border: '1px solid var(--line-strong)',
                background: 'transparent', color: 'var(--fg-muted)',
                fontSize: 11, fontFamily: 'var(--font-mono)',
                cursor: 'pointer', letterSpacing: '0.06em', transition: 'all 0.14s',
              }}>
              ESC
            </button>
            {/* Mobile: icon close button instead of ESC pill */}
            <button
              onClick={closeSearch}
              aria-label="Close search"
              className="flex sm:hidden"
              style={{
                width: 36, height: 36, flexShrink: 0, borderRadius: 8,
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--line-strong)',
                background: 'transparent', color: 'var(--fg-muted)',
                cursor: 'pointer',
              }}>
              <IconClose size={15} />
            </button>
          </div>
          <div style={{ height: 1, background: 'var(--line-strong)', marginTop: 16 }} />
        </div>

        {/* Results / suggestions — dvh so mobile browser chrome can't clip it */}
        <div
          className="px-4 sm:px-6 no-scrollbar"
          style={{
            maxWidth: 760, margin: '0 auto',
            paddingBottom: 'calc(20px + var(--safe-b))',
            maxHeight: 'calc(100dvh - var(--header-h) - 60px)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}>

          {/* Empty query: recent + suggestions */}
          {!searchQuery && (
            <div style={{ paddingTop: 20 }}>
              {recentSearches.length > 0 && (
                <div style={{ marginBottom: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
                      textTransform: 'uppercase', color: 'var(--fg-subtle)',
                    }}>{t('header.recent')}</p>
                    <button
                      onClick={() => setRecentSearches([])}
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em',
                        color: 'var(--fg-subtle)', background: 'none', border: 'none',
                        cursor: 'pointer', transition: 'color 0.14s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-edge)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-subtle)' }}>
                      Clear
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {recentSearches.map(r => (
                      <button
                        key={r.href + r.label}
                        onClick={() => handleResult(r.href, r.label)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '9px 10px', borderRadius: 8, border: 'none',
                          background: 'transparent', cursor: 'pointer', textAlign: 'left',
                          transition: 'background 0.12s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"
                          style={{ width: 13, height: 13, color: 'var(--fg-subtle)', flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 12,
              }}>{t('header.suggested')}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SUGGESTED_SEARCHES.map(s => (
                  <button
                    key={s}
                    onClick={() => setSearchQuery(s)}
                    style={{
                      padding: '7px 14px', borderRadius: 20,
                      background: 'var(--line)', border: '1px solid var(--line-strong)',
                      color: 'var(--fg-muted)', fontSize: 12.5,
                      cursor: 'pointer', transition: 'all 0.14s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-edge)'; e.currentTarget.style.color = 'var(--brand)'; e.currentTarget.style.background = 'var(--brand-wash)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.background = 'var(--line)' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {searchQuery && (
            <div style={{ paddingTop: 16 }}>
              {searchResults.length === 0 ? (
                <p style={{ fontSize: 13.5, color: 'var(--fg-subtle)', paddingTop: 8 }}>
                  {t('header.noResults')} "<strong style={{ color: 'var(--fg-muted)' }}>{searchQuery}</strong>"
                </p>
              ) : (
                Object.entries(byGroup).map(([group, items]) => (
                  <div key={group} style={{ marginBottom: 18 }}>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
                      textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 6,
                    }}>{group}</p>
                    {items.map(item => (
                      <button
                        key={item.href + item.label}
                        onClick={() => handleResult(item.href, item.label)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                          padding: '10px 12px', borderRadius: 9, border: 'none',
                          background: 'transparent', cursor: 'pointer', textAlign: 'left',
                          transition: 'background 0.12s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"
                          style={{ width: 14, height: 14, color: 'var(--fg-subtle)', flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <span style={{ fontSize: 13.5, color: 'var(--fg)', minWidth: 0, flex: 1 }}>{item.label}</span>
                        {/* Path hint is desktop-only — it overflows narrow screens */}
                        <span
                          className="hidden sm:inline"
                          style={{
                            marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 9,
                            color: 'var(--fg-subtle)', letterSpacing: '0.1em',
                            whiteSpace: 'nowrap', flexShrink: 0,
                          }}>{item.href}</span>
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MOBILE BACKDROP
      ════════════════════════════════════════════ */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 'var(--header-h)', left: 0, right: 0, bottom: 0, zIndex: 48,
          background: 'var(--scrim)', backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s',
        }}
      />

      {/* ════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════ */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        ref={drawerRef}
        tabIndex={-1}
        inert={!mobileOpen || searchOpen}
        aria-hidden={!mobileOpen || searchOpen}
        className="no-scrollbar"
        style={{
          position: 'fixed', top: 'var(--header-h)', right: 0, bottom: 0, zIndex: 49,
          width: 'min(340px, 90vw)',
          background: 'var(--s2)',
          borderLeft: '1px solid var(--line)',
          boxShadow: 'var(--shadow-pop)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1), visibility 0.28s',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          visibility: mobileOpen ? 'visible' : 'hidden',
          paddingBottom: 'calc(24px + var(--safe-b))',
        }}>

        {/* Drawer nav items */}
        <div style={{ padding: '8px 10px 0', flex: 1 }}>

          <MobileLink href="/" active={pathname === '/'}>{t('nav.home')}</MobileLink>

          {/* Divisions accordion */}
          <MobileAccordion
            label={t('nav.divisions')}
            expanded={mobileExpanded === 'divisions'}
            onToggle={() => toggleAccordion('divisions')}>
            {MENU_DIVISIONS.map(id => (
              <Link key={id} to={DIVISION_HREF[id]} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
                transition: 'background 0.12s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: DIVISION_COLOR[id], flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: 'var(--fg-muted)' }}>{t(divKey(id, 'short'))}</span>
              </Link>
            ))}
            <Link to="/ezyify" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, marginTop: 6, textDecoration: 'none',
              background: 'rgba(88,28,220,0.08)', border: '1px solid rgba(124,58,237,0.2)',
              transition: 'background 0.12s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(88,28,220,0.14)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(88,28,220,0.08)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-purple)', flexShrink: 0 }} />
              <span style={{ fontSize: 13.5, color: 'var(--accent-purple)', fontWeight: 600 }}>Ezyify</span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'rgba(168,85,247,0.5)',
              }}>{t('header.flagship')}</span>
            </Link>
          </MobileAccordion>

          <MobileLink href="/about"           active={pathname === '/about'}>{t('nav.about')}</MobileLink>
          <MobileLink href="/projects" active={pathname.startsWith('/projects')}>{t('nav.ourWork')}</MobileLink>
          <MobileLink href="/global-presence" active={pathname === '/global-presence'}>{t('nav.globalPresence')}</MobileLink>
          <MobileLink href="/divisions/media" active={pathname === '/divisions/media'}>{t('nav.media')}</MobileLink>
          <MobileLink href="/investors"       active={pathname === '/investors'}>{t('nav.investorRelations')}</MobileLink>
          <MobileLink href="/careers"         active={pathname === '/careers'}>{t('nav.careers')}</MobileLink>
          <MobileLink href="/contact"         active={pathname === '/contact'}>{t('nav.contact')}</MobileLink>

          {/* More pages accordion */}
          <MobileAccordion
            label={t('nav.more')}
            expanded={mobileExpanded === 'more'}
            onToggle={() => toggleAccordion('more')}>
            {[
              { label: t('nav.leadership'),      href: '/leadership' },
              { label: t('nav.history'),     href: '/timeline' },
              { label: t('nav.sustainability'),  href: '/sustainability' },
              { label: t('nav.governance'),      href: '/governance' },
              { label: t('nav.press'),  href: '/press' },
              { label: t('nav.blog'), href: '/blog' },
              { label: t('nav.gallery'),         href: '/gallery' },
              { label: t('nav.brand'),  href: '/brand' },
              { label: t('nav.legal'),           href: '/legal' },
            ].map(item => (
              <Link key={item.href} to={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
                transition: 'background 0.12s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--brand-edge)', flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: 'var(--fg-muted)' }}>{item.label}</span>
              </Link>
            ))}
          </MobileAccordion>

          {/* Appearance — Light / Dark / Auto */}
          <div style={{
            margin: '14px 0 0',
            padding: '14px 12px 0',
            borderTop: '1px solid var(--line)',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: 10,
            }}>{t('header.appearance')}</p>
            <ThemeSegmented />
          </div>

          {/* Language switcher */}
          <div style={{
            margin: '14px 0 0',
            padding: '14px 12px 0',
            borderTop: '1px solid var(--line)',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: 10,
            }}>{t('header.language')}</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {LANG_OPTIONS.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  style={{
                    flex: 1, padding: '9px 0', borderRadius: 8, border: 'none',
                    fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    background: language === l.code ? 'var(--brand)' : 'var(--line)',
                    color: language === l.code ? 'var(--s0)' : 'var(--fg-muted)',
                    transition: 'all 0.15s',
                  }}>
                  {l.short}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile CTA */}
          <div style={{ paddingTop: 14 }}>
            <Link
              to="/contact"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 0', borderRadius: 10,
                background: 'var(--brand)', color: 'var(--fg-onbrand)',
                fontSize: 13.5, fontWeight: 700, textDecoration: 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-bright)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--brand)' }}>
              {t('header.connect')}
              <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.5"
                style={{ width: 12, height: 12 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

// ─── Mobile helper components ─────────────────────────────────────────────────

function MobileLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={href}
      style={{
        display: 'flex', alignItems: 'center',
        padding: '12px 12px', borderRadius: 9,
        fontSize: 14.5, fontWeight: 500, textDecoration: 'none',
        color: active ? 'var(--brand)' : 'var(--fg-muted)',
        background: active ? 'var(--brand-wash)' : 'transparent',
        transition: 'all 0.14s',
      }}>
      {children}
      {active && (
        <span style={{
          marginLeft: 'auto', width: 5, height: 5,
          borderRadius: '50%', background: 'var(--brand)', flexShrink: 0,
        }} />
      )}
    </Link>
  )
}

function MobileAccordion({ label, expanded, onToggle, children }: {
  label: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 12px', borderRadius: 9, border: 'none',
          fontSize: 14.5, fontWeight: 500, color: 'var(--fg-muted)',
          background: expanded ? 'var(--fill-1)' : 'transparent',
          cursor: 'pointer', transition: 'all 0.14s',
        }}>
        {label}
        <IconChevron down={!expanded} size={11} />
      </button>

      {/* Animated accordion body */}
      <div inert={!expanded} style={{
        overflow: 'hidden',
        maxHeight: expanded ? 600 : 0,
        opacity: expanded ? 1 : 0,
        transition: 'max-height 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.22s',
      }}>
        <div style={{ paddingLeft: 6, paddingBottom: 6 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
