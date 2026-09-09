import type { RefObject } from 'react'
import { useT } from '@/i18n'
import { SUGGESTED_SEARCHES, type SearchItem } from './data'
import { IconClose } from './icons'

type Props = {
  searchOpen: boolean
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

/** Full-screen search dialog: input, grouped results, recent + suggested. */
export default function SearchOverlay({
  searchOpen, searchQuery, setSearchQuery, searchResults, byGroup,
  recentSearches, setRecentSearches, closeSearch, handleResult, searchRef, searchPanelRef,
}: Props) {
  const { t } = useT()
  return (
    <>
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
    </>
  )
}
