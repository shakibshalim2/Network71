import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export type Language = 'en' | 'bn'

export const LANG_STORAGE_KEY = 'n71-lang'

const SUPPORTED: Language[] = ['en', 'bn']

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  langLabel: string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  langLabel: 'EN',
})

function readStoredLanguage(): Language {
  if (typeof localStorage === 'undefined') return 'en'
  let raw: string | null = null
  try { raw = localStorage.getItem(LANG_STORAGE_KEY) } catch { return 'en' }
  return raw && (SUPPORTED as string[]).includes(raw) ? (raw as Language) : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage)

  const langLabel = language === 'bn' ? 'বাং' : 'EN'

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    try { localStorage.setItem(LANG_STORAGE_KEY, lang) } catch { /* private mode */ }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('lang', language)
    root.setAttribute('dir', 'ltr')
    // Drives the Bengali font stack and line-height tweaks in index.css.
    root.classList.toggle('lang-bn', language === 'bn')
  }, [language])

  // Keep other open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LANG_STORAGE_KEY) setLanguageState(readStoredLanguage())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, langLabel }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
