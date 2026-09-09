import { useCallback } from 'react'
import { useLanguage, type Language } from '@/context/LanguageContext'
import { en, type TKey } from './en'
import { bn } from './bn'

const DICTIONARIES: Record<Language, Record<TKey, string>> = { en, bn }

export type { TKey }

export function translate(lang: Language, key: TKey): string {
  return DICTIONARIES[lang][key] ?? en[key]
}

/** Returns `t(key)` bound to the active language. */
export function useT() {
  const { language } = useLanguage()
  const t = useCallback((key: TKey) => translate(language, key), [language])
  return { t, language }
}

/** Every business division in canonical order. Labels resolve through `t()`. */
export type DivisionId =
  | 'garments' | 'agriculture' | 'food' | 'energy' | 'ezyify'
  | 'it' | 'trading' | 'ventures' | 'media' | 'ship'

export const DIVISION_IDS: DivisionId[] = [
  'garments', 'agriculture', 'food', 'energy', 'ezyify',
  'it', 'trading', 'ventures', 'media', 'ship',
]

export const DIVISION_HREF: Record<DivisionId, string> = {
  garments: '/divisions/garments',
  agriculture: '/divisions/agriculture',
  food: '/divisions/food-beverage',
  energy: '/divisions/oils-energy',
  ezyify: '/ezyify',
  it: '/divisions/it-software',
  trading: '/divisions/global-trading',
  ventures: '/divisions/strategic-ventures',
  media: '/divisions/media',
  ship: '/divisions/eshipe',
}

export const DIVISION_COLOR: Record<DivisionId, string> = {
  garments: 'var(--accent-rose)',
  agriculture: 'var(--accent-green)',
  food: 'var(--accent-orange)',
  energy: 'var(--accent-amber)',
  ezyify: 'var(--accent-purple)',
  it: 'var(--accent-cyan)',
  trading: 'var(--accent-blue)',
  ventures: 'var(--accent-indigo)',
  media: 'var(--accent-red)',
  ship: 'var(--accent-sky)',
}

export const divKey = (id: DivisionId, field: 'name' | 'short' | 'desc' | 'tag' | 'card'): TKey =>
  `div.${id}.${field}` as TKey
