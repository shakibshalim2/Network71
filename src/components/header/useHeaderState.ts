import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import { useT, DIVISION_IDS, DIVISION_HREF, divKey } from '@/i18n'
import { useDialogFocus } from '@/lib/useDialogFocus'
import { SEARCH_INDEX, DEFAULT_RECENT, LANG_OPTIONS, type SearchItem } from './data'

export function useHeaderState() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { language, setLanguage } = useLanguage()
  const { t } = useT()

  // Division entries rebuilt per language so search + menus stay translated.
  const divisionIndex: SearchItem[] = DIVISION_IDS.map(id => ({ label: t(divKey(id, 'short')), href: DIVISION_HREF[id], group: 'Divisions' }))
  const searchIndex = [...SEARCH_INDEX, ...divisionIndex]

  const [scrolled, setScrolled]         = useState(false)
  const [hidden, setHidden]             = useState(false)
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

  // Scroll listener: glassy past 36px; hide while scrolling down, return on scroll-up.
  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        setScrolled(y > 36)
        const delta = y - last
        if (y < 120) setHidden(false)
        else if (delta > 6) setHidden(true)
        else if (delta < -6) setHidden(false)
        last = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame) }
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
  // Never hide while a menu, drawer or search is open.
  const headerHidden = hidden && !mobileOpen && !searchOpen && !megaOpen && !langOpen
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

  return {
    pathname, t, language, setLanguage,
    mobileOpen, setMobileOpen,
    megaOpen, setMegaOpen,
    langOpen, setLangOpen,
    searchOpen, setSearchOpen,
    searchQuery, setSearchQuery,
    recentSearches, setRecentSearches,
    mobileExpanded,
    searchRef, searchPanelRef, drawerRef, megaRef, langRef,
    openMega, closeMega, openLang, closeLang, closeSearch,
    glassy, headerHidden, curLang, searchResults, byGroup,
    handleResult, toggleAccordion,
  }
}

export type HeaderState = ReturnType<typeof useHeaderState>
