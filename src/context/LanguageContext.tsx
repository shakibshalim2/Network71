import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export type Language = 'en' | 'ar' | 'bn'

export const LANG_STORAGE_KEY = 'n71-lang'

const SUPPORTED: Language[] = ['en', 'ar', 'bn']

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
  dir: 'ltr' | 'rtl'
  langLabel: string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  isRTL: false,
  dir: 'ltr',
  langLabel: 'EN',
})

function readStoredLanguage(): Language {
  if (typeof localStorage === 'undefined') return 'en'
  let raw: Language | null = null
  try { raw = localStorage.getItem(LANG_STORAGE_KEY) as Language | null } catch { return 'en' }
  return raw && SUPPORTED.includes(raw) ? raw : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage)

  const isRTL = language === 'ar'
  const dir: 'ltr' | 'rtl' = isRTL ? 'rtl' : 'ltr'
  const langLabel = language === 'ar' ? 'ع' : language === 'bn' ? 'বাং' : 'EN'

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    try { localStorage.setItem(LANG_STORAGE_KEY, lang) } catch { /* private mode */ }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', language)
  }, [dir, language])

  // Keep other open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LANG_STORAGE_KEY) setLanguageState(readStoredLanguage())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, dir, langLabel }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
