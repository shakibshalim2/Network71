import type { RefObject } from 'react'
import type { Language } from '@/context/LanguageContext'
import { LANG_OPTIONS } from './data'

type Props = {
  language: Language
  setLanguage: (lang: Language) => void
  curLang: (typeof LANG_OPTIONS)[number]
  langOpen: boolean
  setLangOpen: (v: boolean | ((prev: boolean) => boolean)) => void
  openLang: () => void
  closeLang: () => void
  langRef: RefObject<HTMLDivElement | null>
}

/** Desktop language dropdown. */
export default function LanguageMenu({ language, setLanguage, curLang, langOpen, setLangOpen, openLang, closeLang, langRef }: Props) {
  return (
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
  )
}
