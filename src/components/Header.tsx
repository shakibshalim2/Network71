import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage, type Language } from '@/context/LanguageContext'
import Logo from '@/components/brand/Logo'

// ─── Division data ────────────────────────────────────────────────────────────

const DIVISIONS = [
  {
    name: 'Garments & Apparel',
    href: '/divisions/garments',
    desc: 'Private-label manufacturing & ethical export',
    color: '#f43f5e',
    icon: 'M3 6l3-3 12 0 3 3M3 6v12l3 3h12l3-3V6M9 21V9m6 12V9M9 9H3m6 0h6m0 0h6',
  },
  {
    name: 'Agriculture & Agro',
    href: '/divisions/agriculture',
    desc: 'Sustainable farming & global commodity export',
    color: '#22c55e',
    icon: 'M12 3C8 3 5 6 5 9c0 4.5 7 12 7 12s7-7.5 7-12c0-3-3-6-7-6zm0 7a2 2 0 110-4 2 2 0 010 4z',
  },
  {
    name: 'Food & Beverage',
    href: '/divisions/food-beverage',
    desc: 'FMCG manufacturing & nutritional innovation',
    color: '#f97316',
    icon: 'M9 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-2M9 3a2 2 0 002 2h2a2 2 0 002-2M9 3h6m-6 8h6m-6 4h4',
  },
  {
    name: 'Oils & Energy',
    href: '/divisions/oils-energy',
    desc: 'Edible oils, fuel & industrial energy solutions',
    color: '#f59e0b',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    name: 'IT & Digital',
    href: '/divisions/it-software',
    desc: 'Enterprise software, AI & digital transformation',
    color: '#22D3EE',
    icon: 'M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5H9zM9 3v5h8M7 13h10M7 17h5',
  },
  {
    name: 'Global Trading',
    href: '/divisions/global-trading',
    desc: 'Cross-border import/export & supply chain',
    color: '#3b82f6',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    name: 'Network71 Media',
    href: '/divisions/media',
    desc: 'Digital newspaper & broadcast television',
    color: '#EF4444',
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z',
  },
  {
    name: 'eSHIPe Maritime',
    href: '/divisions/eshipe',
    desc: 'Global marketplace for vessels & marine assets',
    color: '#0EA5E9',
    icon: 'M7 16l-4-4m0 0l4-4m-4 4h18M17 8l4 4m0 0l-4 4',
  },
]

// ─── Search index ─────────────────────────────────────────────────────────────

const SEARCH_INDEX = [
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
  { label: 'Ezyify Platform',     href: '/ezyify',          group: 'Divisions' },
  ...DIVISIONS.map(d => ({ label: d.name, href: d.href, group: 'Divisions' })),
  { label: 'Dhaka, Bangladesh',   href: '/global-presence', group: 'Locations' },
  { label: 'Middle East',         href: '/global-presence', group: 'Locations' },
  { label: 'Europe',              href: '/global-presence', group: 'Locations' },
  { label: 'Southeast Asia',      href: '/global-presence', group: 'Locations' },
  { label: 'Network71 News',      href: '/press',           group: 'Media' },
  { label: 'Network71 TV',        href: '/divisions/media', group: 'Media' },
  { label: 'Blog & Insights',     href: '/blog',            group: 'Media' },
]

const SUGGESTED_SEARCHES = [
  'Ezyify social commerce',
  'Investor Relations',
  'Global Presence',
  'Sustainability / ESG',
  'Careers at Network71',
]

const DEFAULT_RECENT = [
  { label: 'eSHIPe Maritime',   href: '/divisions/eshipe' },
  { label: 'Investor Relations', href: '/investors' },
  { label: 'Global Presence',   href: '/global-presence' },
]

// ─── Language options ─────────────────────────────────────────────────────────

const LANG_OPTIONS: { code: Language; label: string; short: string; flag: string }[] = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', short: 'AR', flag: '🇸🇦' },
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
      background: `${color}14`, border: `1px solid ${color}28`,
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
    <Link to={href} style={{
      fontSize: 13, fontWeight: 500, letterSpacing: '0.01em',
      color: active ? '#C8962A' : 'rgba(203,213,225,0.72)',
      textDecoration: 'none', position: 'relative', paddingBottom: 2,
      transition: 'color 0.15s', whiteSpace: 'nowrap',
    }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#FFFFFF' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(203,213,225,0.72)' }}>
      {children}
      {active && (
        <span style={{
          position: 'absolute', bottom: -2, left: 0, right: 0, height: 1.5,
          background: 'linear-gradient(90deg,#C8962A,#E6B840 60%,transparent)',
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
        background: 'transparent', color: 'rgba(148,163,184,0.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'color 0.15s, background 0.15s', flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(148,163,184,0.65)'; e.currentTarget.style.background = 'transparent' }}>
      {children}
    </button>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { language, setLanguage } = useLanguage()

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
    ? SEARCH_INDEX.filter(i =>
        i.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.group.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const byGroup = searchResults.reduce<Record<string, typeof SEARCH_INDEX>>((acc, item) => {
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
          height: 68,
          background: glassy ? 'rgba(3,6,14,0.96)' : 'transparent',
          backdropFilter: glassy ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: glassy ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: glassy ? '1px solid rgba(255,255,255,0.055)' : '1px solid transparent',
          boxShadow: glassy ? '0 1px 32px rgba(0,0,0,0.45)' : 'none',
          transition: 'background 0.35s, backdrop-filter 0.35s, border-color 0.35s, box-shadow 0.35s',
        }}>

        <div style={{
          maxWidth: 1360, margin: '0 auto',
          padding: '0 20px',
          height: '100%',
          display: 'flex', alignItems: 'center',
        }}>

          {/* ── Logo (always visible, exactly one) ─── */}
          <Link
            to="/"
            aria-label="Network71 — Home"
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0, marginRight: 28 }}>
            <Logo variant="primary-dark" height={26} />
          </Link>

          {/* ══════════════════════════════════════
              DESKTOP NAV  (hidden on < lg)
          ══════════════════════════════════════ */}
          <nav
            className="hidden lg:flex"
            aria-label="Main navigation"
            style={{ alignItems: 'center', gap: 22, flex: 1 }}>

            {/* Divisions mega-menu */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}>

              <button
                aria-haspopup="true"
                aria-expanded={megaOpen}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 13, fontWeight: 500, letterSpacing: '0.01em',
                  color: megaOpen ? '#C8962A' : 'rgba(203,213,225,0.72)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '2px 0', transition: 'color 0.15s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF' }}
                onMouseLeave={e => { if (!megaOpen) e.currentTarget.style.color = 'rgba(203,213,225,0.72)' }}>
                Divisions
                <svg
                  viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                  style={{ width: 10, height: 10, opacity: 0.5, transition: 'transform 0.22s', transform: megaOpen ? 'rotate(180deg)' : 'none' }}>
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </button>

              {/* Mega panel — positioned from trigger's left edge */}
              <div
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 14px)',
                  left: 0,
                  width: 'min(620px, calc(100vw - 40px))',
                  background: 'rgba(4,8,20,0.99)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  boxShadow: '0 24px 72px rgba(0,0,0,0.82)',
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
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  marginBottom: 6,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
                    textTransform: 'uppercase', color: 'rgba(200,150,42,0.45)',
                  }}>Our Businesses</span>
                  <Link to="/about" style={{
                    fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em',
                    color: 'rgba(200,150,42,0.5)', textDecoration: 'none',
                    transition: 'color 0.14s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#C8962A' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,150,42,0.5)' }}>
                    View All →
                  </Link>
                </div>

                {/* 2-column division grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 8 }}>
                  {DIVISIONS.map(d => (
                    <Link key={d.name} to={d.href} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 10px', borderRadius: 10,
                      textDecoration: 'none', transition: 'background 0.12s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                      <DivisionIcon path={d.icon} color={d.color} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#E2E8F0', lineHeight: 1.3 }}>
                          {d.name}
                        </div>
                        <div style={{
                          fontSize: 10.5, color: 'rgba(100,116,139,0.6)', marginTop: 1,
                          lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {d.desc}
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
                      </svg>
                    </span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>Ezyify</span>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 6.5, fontWeight: 700,
                          letterSpacing: '0.2em', textTransform: 'uppercase',
                          color: 'rgba(168,85,247,0.8)', padding: '2px 7px',
                          borderRadius: 4, background: 'rgba(168,85,247,0.12)',
                          border: '1px solid rgba(168,85,247,0.25)',
                        }}>Flagship</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(168,85,247,0.65)', lineHeight: 1.35 }}>
                        AI-Powered Social Commerce Innovation Platform
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

            <NavLink href="/about"            active={pathname === '/about'}>About</NavLink>
            <NavLink href="/global-presence"  active={pathname === '/global-presence'}>Global Presence</NavLink>
            <NavLink href="/divisions/media"  active={pathname === '/divisions/media'}>Media</NavLink>
            <NavLink href="/investors"        active={pathname === '/investors'}>Investors</NavLink>
            <NavLink href="/careers"          active={pathname === '/careers'}>Careers</NavLink>
            <NavLink href="/contact"          active={pathname === '/contact'}>Contact</NavLink>
          </nav>

          {/* ══════════════════════════════════════
              DESKTOP RIGHT CONTROLS  (hidden on < lg)
          ══════════════════════════════════════ */}
          <div
            className="hidden lg:flex"
            style={{ alignItems: 'center', gap: 4, marginLeft: 'auto' }}>

            {/* Search */}
            <IconBtn label="Search site" onClick={() => setSearchOpen(true)}>
              <IconSearch size={16} />
            </IconBtn>

            {/* Language */}
            <div style={{ position: 'relative' }} onMouseEnter={openLang} onMouseLeave={closeLang}>
              <button
                aria-label={`Language: ${curLang.label}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '6px 11px', borderRadius: 8,
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.09)',
                  color: 'rgba(148,163,184,0.65)', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#FFFFFF' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(148,163,184,0.65)' }}>
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
                onMouseEnter={openLang}
                onMouseLeave={closeLang}
                style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 150,
                  background: 'rgba(4,8,20,0.99)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10, boxShadow: '0 12px 36px rgba(0,0,0,0.7)',
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
                      color: language === l.code ? '#C8962A' : 'rgba(148,163,184,0.72)',
                      fontSize: 12.5, fontWeight: 500, cursor: 'pointer', transition: 'all 0.12s',
                    }}
                    onMouseEnter={e => { if (language !== l.code) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#FFFFFF' } }}
                    onMouseLeave={e => { if (language !== l.code) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(148,163,184,0.72)' } }}>
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
                border: '1px solid rgba(200,150,42,0.45)', color: '#C8962A',
                background: 'rgba(200,150,42,0.06)', textDecoration: 'none',
                transition: 'all 0.18s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#C8962A'
                e.currentTarget.style.color = '#04080E'
                e.currentTarget.style.borderColor = '#C8962A'
                e.currentTarget.style.boxShadow = '0 0 22px rgba(200,150,42,0.22)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(200,150,42,0.06)'
                e.currentTarget.style.color = '#C8962A'
                e.currentTarget.style.borderColor = 'rgba(200,150,42,0.45)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
              Connect
              <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2"
                style={{ width: 11, height: 11 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
          </div>

          {/* ══════════════════════════════════════
              MOBILE RIGHT CONTROLS  (hidden on lg+)
              NOTE: use Tailwind class "flex lg:hidden" — NO inline display property —
              so Tailwind can correctly hide this at the lg breakpoint.
          ══════════════════════════════════════ */}
          <div
            className="flex lg:hidden"
            style={{ alignItems: 'center', gap: 2, marginLeft: 'auto' }}>

            {/* Search */}
            <IconBtn label="Search site" onClick={() => setSearchOpen(true)}>
              <IconSearch size={18} />
            </IconBtn>

            {/* Hamburger / Close — single button, icon swaps */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              style={{
                width: 40, height: 40, borderRadius: 10, border: 'none', flexShrink: 0,
                background: mobileOpen ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: 'rgba(226,232,240,0.85)',
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
          background: 'rgba(1,3,9,0.82)', backdropFilter: 'blur(8px)',
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
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 81,
          background: 'rgba(4,8,18,0.98)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.8)',
          transform: `translateY(${searchOpen ? 0 : '-100%'})`,
          transition: 'transform 0.26s cubic-bezier(0.4,0,0.2,1)',
        }}>

        {/* Input row */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '20px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              style={{ width: 20, height: 20, color: 'rgba(200,150,42,0.55)', flexShrink: 0 }}>
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
              placeholder="Search Network71 — pages, divisions, locations…"
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                fontSize: 18, fontWeight: 400, color: '#F1F5F9',
                caretColor: '#C8962A',
              }}
            />
            <button
              onClick={closeSearch}
              aria-label="Close search"
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 10px', borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent', color: 'rgba(148,163,184,0.55)',
                fontSize: 11, fontFamily: 'var(--font-mono)',
                cursor: 'pointer', letterSpacing: '0.06em', transition: 'all 0.14s',
              }}>
              ESC
            </button>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginTop: 18 }} />
        </div>

        {/* Results / suggestions */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 24px', maxHeight: '70vh', overflowY: 'auto' }}>

          {/* Empty query: recent + suggestions */}
          {!searchQuery && (
            <div style={{ paddingTop: 20 }}>
              {recentSearches.length > 0 && (
                <div style={{ marginBottom: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
                      textTransform: 'uppercase', color: 'rgba(100,116,139,0.45)',
                    }}>Recent</p>
                    <button
                      onClick={() => setRecentSearches([])}
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em',
                        color: 'rgba(100,116,139,0.35)', background: 'none', border: 'none',
                        cursor: 'pointer', transition: 'color 0.14s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'rgba(200,150,42,0.65)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(100,116,139,0.35)' }}>
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
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"
                          style={{ width: 13, height: 13, color: 'rgba(100,116,139,0.35)', flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span style={{ fontSize: 13, color: 'rgba(148,163,184,0.7)' }}>{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'rgba(100,116,139,0.45)', marginBottom: 12,
              }}>Suggested</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SUGGESTED_SEARCHES.map(s => (
                  <button
                    key={s}
                    onClick={() => setSearchQuery(s)}
                    style={{
                      padding: '7px 14px', borderRadius: 20,
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(148,163,184,0.7)', fontSize: 12.5,
                      cursor: 'pointer', transition: 'all 0.14s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,150,42,0.3)'; e.currentTarget.style.color = '#C8962A'; e.currentTarget.style.background = 'rgba(200,150,42,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(148,163,184,0.7)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}>
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
                <p style={{ fontSize: 13.5, color: 'rgba(100,116,139,0.5)', paddingTop: 8 }}>
                  No results for "<strong style={{ color: 'rgba(148,163,184,0.7)' }}>{searchQuery}</strong>"
                </p>
              ) : (
                Object.entries(byGroup).map(([group, items]) => (
                  <div key={group} style={{ marginBottom: 18 }}>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
                      textTransform: 'uppercase', color: 'rgba(100,116,139,0.45)', marginBottom: 6,
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
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"
                          style={{ width: 14, height: 14, color: 'rgba(100,116,139,0.4)', flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <span style={{ fontSize: 13.5, color: '#CBD5E1' }}>{item.label}</span>
                        <span style={{
                          marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 9,
                          color: 'rgba(100,116,139,0.4)', letterSpacing: '0.1em',
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
          position: 'fixed', top: 68, left: 0, right: 0, bottom: 0, zIndex: 48,
          background: 'rgba(1,3,9,0.72)', backdropFilter: 'blur(5px)',
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
        style={{
          position: 'fixed', top: 68, right: 0, bottom: 0, zIndex: 49,
          width: 'min(320px, 88vw)',
          background: '#040A1A',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '-24px 0 60px rgba(0,0,0,0.7)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        }}>

        {/* Drawer nav items */}
        <div style={{ padding: '8px 10px 0', flex: 1 }}>

          <MobileLink href="/" active={pathname === '/'}>Home</MobileLink>

          {/* Divisions accordion */}
          <MobileAccordion
            label="Divisions"
            expanded={mobileExpanded === 'divisions'}
            onToggle={() => toggleAccordion('divisions')}>
            {DIVISIONS.map(d => (
              <Link key={d.href} to={d.href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
                transition: 'background 0.12s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: 'rgba(203,213,225,0.75)' }}>{d.name}</span>
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
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#A855F7', flexShrink: 0 }} />
              <span style={{ fontSize: 13.5, color: '#A855F7', fontWeight: 600 }}>Ezyify</span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'rgba(168,85,247,0.5)',
              }}>Flagship</span>
            </Link>
          </MobileAccordion>

          <MobileLink href="/about"           active={pathname === '/about'}>About</MobileLink>
          <MobileLink href="/global-presence" active={pathname === '/global-presence'}>Global Presence</MobileLink>
          <MobileLink href="/divisions/media" active={pathname === '/divisions/media'}>Media</MobileLink>
          <MobileLink href="/investors"       active={pathname === '/investors'}>Investor Relations</MobileLink>
          <MobileLink href="/careers"         active={pathname === '/careers'}>Careers</MobileLink>
          <MobileLink href="/contact"         active={pathname === '/contact'}>Contact</MobileLink>

          {/* More pages accordion */}
          <MobileAccordion
            label="More"
            expanded={mobileExpanded === 'more'}
            onToggle={() => toggleAccordion('more')}>
            {[
              { label: 'Leadership',      href: '/leadership' },
              { label: 'Our History',     href: '/timeline' },
              { label: 'Sustainability',  href: '/sustainability' },
              { label: 'Governance',      href: '/governance' },
              { label: 'Press Releases',  href: '/press' },
              { label: 'Blog & Insights', href: '/blog' },
              { label: 'Gallery',         href: '/gallery' },
              { label: 'Brand Identity',  href: '/brand' },
              { label: 'Legal',           href: '/legal' },
            ].map(item => (
              <Link key={item.href} to={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
                transition: 'background 0.12s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(200,150,42,0.5)', flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: 'rgba(203,213,225,0.68)' }}>{item.label}</span>
              </Link>
            ))}
          </MobileAccordion>

          {/* Language switcher */}
          <div style={{
            margin: '14px 0 0',
            padding: '14px 12px 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'rgba(100,116,139,0.42)', marginBottom: 10,
            }}>Language</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {LANG_OPTIONS.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  style={{
                    flex: 1, padding: '9px 0', borderRadius: 8, border: 'none',
                    fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    background: language === l.code ? '#C8962A' : 'rgba(255,255,255,0.05)',
                    color: language === l.code ? '#04080E' : 'rgba(148,163,184,0.65)',
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
                background: '#C8962A', color: '#04080E',
                fontSize: 13.5, fontWeight: 700, textDecoration: 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E6B840' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C8962A' }}>
              Connect With Us
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
        color: active ? '#C8962A' : 'rgba(203,213,225,0.82)',
        background: active ? 'rgba(200,150,42,0.08)' : 'transparent',
        transition: 'all 0.14s',
      }}>
      {children}
      {active && (
        <span style={{
          marginLeft: 'auto', width: 5, height: 5,
          borderRadius: '50%', background: '#C8962A', flexShrink: 0,
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
          fontSize: 14.5, fontWeight: 500, color: 'rgba(203,213,225,0.82)',
          background: expanded ? 'rgba(255,255,255,0.03)' : 'transparent',
          cursor: 'pointer', transition: 'all 0.14s',
        }}>
        {label}
        <IconChevron down={!expanded} size={11} />
      </button>

      {/* Animated accordion body */}
      <div style={{
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
