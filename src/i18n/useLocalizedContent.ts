import { useEffect, useState, useMemo } from 'react'
import { usePageOverrides, mergeContent, contentMeta } from '@/lib/pageContent'
import { useLanguage, type Language } from '@/context/LanguageContext'

type Loader<T> = () => Promise<{ default: T }>

// Resolved locale modules, keyed by loader identity so every page shares one cache.
const cache = new WeakMap<Loader<unknown>, unknown>()
const inflight = new WeakMap<Loader<unknown>, Promise<unknown>>()

function load<T>(loader: Loader<T>): Promise<T> {
  const hit = cache.get(loader)
  if (hit) return Promise.resolve(hit as T)
  let p = inflight.get(loader) as Promise<T> | undefined
  if (!p) {
    p = loader().then(m => { cache.set(loader, m.default); inflight.delete(loader); return m.default })
    inflight.set(loader, p)
  }
  return p
}

/**
 * Page-level localized content. English ships with the page chunk; other
 * languages are code-split and fetched on demand, so the default bundle never
 * carries unused translations. English is shown until the translation resolves.
 */
export function useLocalizedContent<T>(
  en: T,
  loaders: Partial<Record<Exclude<Language, 'en'>, Loader<T>>>,
  options?: { page: string },
): T {
  const overrides = usePageOverrides(options?.page)
  const { language } = useLanguage()
  const loader = language === 'en' ? undefined : loaders[language]
  const [resolved, setResolved] = useState<{ lang: Language; data: T } | null>(() => {
    if (!loader) return null
    const hit = cache.get(loader) as T | undefined
    return hit ? { lang: language, data: hit } : null
  })

  useEffect(() => {
    if (!loader) return
    let alive = true
    void load(loader).then(data => { if (alive) setResolved({ lang: language, data }) }).catch(() => { /* Retain English when a translation chunk is unavailable. */ })
    return () => { alive = false }
  }, [loader, language])

  const base = language === 'en' || !loader ? en : resolved?.lang === language ? resolved.data : en
  return useMemo(() => {
    const result = mergeContent(base, overrides.sections)
    if (result && typeof result === 'object') contentMeta.set(result, overrides.meta)
    return result
  }, [base, overrides])
}
