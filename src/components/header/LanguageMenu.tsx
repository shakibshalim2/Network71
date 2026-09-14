import type { RefObject } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { Language } from '@/context/LanguageContext'
import { LANG_OPTIONS } from './data'
import { popover, springSnappy } from '@/lib/motion'

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
        type="button"
        aria-label={`Language: ${curLang.label}`}
        aria-expanded={langOpen}
        aria-controls="language-menu"
        onClick={() => setLangOpen(v => !v)}
        className={`lang-trigger${langOpen ? ' is-open' : ''}`}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
          style={{ width: 12, height: 12, opacity: 0.6, flexShrink: 0 }}>
          <circle cx="10" cy="10" r="8" />
          <path d="M2.5 10h15M10 2.5a12 12 0 010 15M10 2.5a12 12 0 000 15" strokeLinecap="round" />
        </svg>
        {curLang.short}
        <motion.svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          animate={{ rotate: langOpen ? 180 : 0 }} transition={springSnappy}
          style={{ width: 8, height: 8, opacity: 0.5 }}>
          <path d="M2 3.5l3 3 3-3" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {langOpen && (
          <motion.div
            id="language-menu"
            key="lang"
            variants={popover}
            initial="hidden"
            animate="show"
            exit="hidden"
            onMouseEnter={openLang}
            onMouseLeave={closeLang}
            className="lang-menu"
            style={{ transformOrigin: 'top right' }}>
            {LANG_OPTIONS.map(l => (
              <button
                key={l.code}
                type="button"
                onClick={() => { setLanguage(l.code); setLangOpen(false) }}
                className={`lang-menu__item${language === l.code ? ' is-active' : ''}`}>
                <span style={{ fontSize: 15 }}>{l.flag}</span>
                {l.label}
                {language === l.code && (
                  <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2"
                    style={{ width: 11, height: 11, marginLeft: 'auto' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3 3 7-7" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
