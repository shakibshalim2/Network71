import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Language = 'en' | 'ar' | 'bn'

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const isRTL = language === 'ar'
  const dir: 'ltr' | 'rtl' = isRTL ? 'rtl' : 'ltr'

  const langLabel = language === 'ar' ? 'ع' : language === 'bn' ? 'বাং' : 'EN'

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', language)
  }, [dir, language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, dir, langLabel }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
