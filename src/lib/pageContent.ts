import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export type SectionMeta = { visible: boolean; order: number }
export type PageOverrides = { sections: Record<string, unknown>; meta: Record<string, SectionMeta> }
const entries = new Map<string, { data: PageOverrides; time: number }>()
const pending = new Map<string, Promise<PageOverrides>>()
const EMPTY: PageOverrides = { sections: {}, meta: {} }
export const contentMeta = new WeakMap<object, Record<string, SectionMeta>>()

export function usePageOverrides(page?: string) {
  const { language } = useLanguage()
  const key = page ? `${page}?locale=${language}` : ''
  const [result, setResult] = useState<{ key: string; data: PageOverrides } | null>(null)
  useEffect(() => {
    if (!key) return
    let live = true
    const cached = entries.get(key)
    if (cached) setResult({ key, data: cached.data })
    if (cached && Date.now() - cached.time < 10000) return
    let request = pending.get(key)
    if (!request) {
      request = fetch(`/api/v1/page/${key}`, { signal: AbortSignal.timeout(10000) }).then(async r => {
        if (!r.ok) throw new Error('Page content unavailable')
        const data = await r.json() as PageOverrides
        if (!data.sections || !data.meta) throw new Error('Invalid page response')
        entries.set(key, { data, time: Date.now() }); return data
      }).finally(() => pending.delete(key))
      pending.set(key, request)
    }
    request.then(data => { if (live) setResult({ key, data }) }).catch(() => { /* Keep packaged copy during API outages. */ })
    return () => { live = false }
  }, [key])
  return result?.key === key ? result.data : entries.get(key)?.data || EMPTY
}

export function mergeContent<T>(base: T, override: unknown): T {
  if (override === undefined) return base
  if (Array.isArray(base)) return (Array.isArray(override) ? override : base) as T
  if (base && typeof base === 'object' && override && typeof override === 'object' && !Array.isArray(override)) {
    return Object.fromEntries(Object.entries(base).map(([key, value]) => [key, mergeContent(value, (override as Record<string, unknown>)[key])])) as T
  }
  return (typeof base === typeof override ? override : base) as T
}
