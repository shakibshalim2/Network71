import type { RefObject } from 'react'
import { motion } from 'motion/react'
import { useT } from '@/i18n'
import { SUGGESTED_SEARCHES, type SearchItem } from './data'
import { IconClose } from './icons'
import { backdrop, sheetDown } from '@/lib/motion'

type Props = {
  searchQuery: string
  setSearchQuery: (q: string) => void
  searchResults: SearchItem[]
  byGroup: Record<string, SearchItem[]>
  recentSearches: { label: string; href: string }[]
  setRecentSearches: (r: { label: string; href: string }[]) => void
  closeSearch: () => void
  handleResult: (href: string, label: string) => void
  searchRef: RefObject<HTMLInputElement | null>
  searchPanelRef: RefObject<HTMLDivElement | null>
}

/** Full-screen search dialog: input, grouped results, recent + suggested. Mounted only while open. */
export default function SearchOverlay({
  searchQuery, setSearchQuery, searchResults, byGroup,
  recentSearches, setRecentSearches, closeSearch, handleResult, searchRef, searchPanelRef,
}: Props) {
  const { t } = useT()
  return (
    <>
      <motion.div
        onClick={closeSearch}
        aria-hidden="true"
        className="overlay-backdrop"
        style={{ zIndex: 80 }}
        variants={backdrop} initial="hidden" animate="show" exit="hidden"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Site search"
        ref={searchPanelRef}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        className="search-sheet"
        variants={sheetDown} initial="hidden" animate="show" exit="hidden">

        <div className="search-sheet__inner">
          <div className="search-sheet__input-row">
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
              className="search-sheet__input"
            />
            <button type="button" onClick={closeSearch} aria-label="Close search" className="kbd-pill hidden sm:flex">ESC</button>
            <button type="button" onClick={closeSearch} aria-label="Close search" className="icon-btn icon-btn--outlined flex sm:hidden">
              <IconClose size={15} />
            </button>
          </div>
          <div className="search-sheet__rule" />
        </div>

        <div className="search-sheet__body no-scrollbar">
          {!searchQuery && (
            <div style={{ paddingTop: 22 }}>
              {recentSearches.length > 0 && (
                <div style={{ marginBottom: 26 }}>
                  <div className="search-sheet__group-head">
                    <p className="search-sheet__label">{t('header.recent')}</p>
                    <button type="button" onClick={() => setRecentSearches([])} className="search-sheet__clear">Clear</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {recentSearches.map(r => (
                      <button key={r.href + r.label} type="button" onClick={() => handleResult(r.href, r.label)} className="search-result">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"
                          style={{ width: 14, height: 14, color: 'var(--fg-subtle)', flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="search-result__label" style={{ color: 'var(--fg-muted)' }}>{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <p className="search-sheet__label" style={{ marginBottom: 12 }}>{t('header.suggested')}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SUGGESTED_SEARCHES.map(s => (
                  <button key={s} type="button" onClick={() => setSearchQuery(s)} className="chip">{s}</button>
                ))}
              </div>
            </div>
          )}

          {searchQuery && (
            <div style={{ paddingTop: 18 }}>
              {searchResults.length === 0 ? (
                <p style={{ fontSize: 14.5, color: 'var(--fg-subtle)', paddingTop: 8 }}>
                  {t('header.noResults')} "<strong style={{ color: 'var(--fg-muted)' }}>{searchQuery}</strong>"
                </p>
              ) : (
                Object.entries(byGroup).map(([group, items]) => (
                  <div key={group} style={{ marginBottom: 20 }}>
                    <p className="search-sheet__label" style={{ marginBottom: 6 }}>{group}</p>
                    {items.map(item => (
                      <button key={item.href + item.label} type="button" onClick={() => handleResult(item.href, item.label)} className="search-result">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"
                          style={{ width: 14, height: 14, color: 'var(--fg-subtle)', flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="search-result__label">{item.label}</span>
                        <span className="search-result__path hidden sm:inline">{item.href}</span>
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}
