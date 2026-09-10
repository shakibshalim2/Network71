import { type Language } from '@/context/LanguageContext'
import { DIVISION_IDS, type DivisionId } from '@/i18n'

// ─── Division data ────────────────────────────────────────────────────────────

export const DIVISION_ICONS: Record<DivisionId, string> = {
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
export const MENU_DIVISIONS = DIVISION_IDS.filter(id => id !== 'ezyify')

// ─── Search index ─────────────────────────────────────────────────────────────

export type SearchItem = { label: string; href: string; group: string }

export const SEARCH_INDEX: SearchItem[] = [
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

export const SUGGESTED_SEARCHES = [
  'Ezyify',
  'Investor Relations',
  'Global Presence',
  'Sustainability',
  'Careers',
]

export const DEFAULT_RECENT = [
  { label: 'Ship Marketplace',   href: '/divisions/ship-marketplace' },
  { label: 'Investor Relations', href: '/investors' },
  { label: 'Global Presence',   href: '/global-presence' },
]

// ─── Language options ─────────────────────────────────────────────────────────

export const LANG_OPTIONS: { code: Language; label: string; short: string; flag: string }[] = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'bn', label: 'বাংলা',  short: 'BN', flag: '🇧🇩' },
]
