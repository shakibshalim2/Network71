import { useEffect, useState } from "react"
import { useT } from "@/i18n"

export type PublishedItem = {
  id: number
  slug: string
  data: Record<string, string | boolean>
  published_at: string
}
export type PublishedPage = {
  items: PublishedItem[]
  total: number
  page: number
  pages: number
}

export function usePublicContent<T>(path: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [notFound, setNotFound] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const { t, language } = useT()
  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => {
      setError(t("lib.timeout"))
      setLoading(false)
      controller.abort()
    }, 15000)
    setLoading(true)
    setError("")
    setNotFound(false)
    setData(null)
    fetch(`/api/v1/content/${path}${path.includes("?") ? "&" : "?"}locale=${language}`, { signal: controller.signal })
      .then(async (response) => {
        if (response.status === 404) {
          setNotFound(true)
          return null
        }
        if (!response.ok) throw new Error(t("lib.unavailable"))
        return response.json() as Promise<T>
      })
      .then((result) => {
        if (!controller.signal.aborted) setData(result)
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError(t("lib.loadFailed"))
      })
      .finally(() => {
        window.clearTimeout(timeout)
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => {
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [path, attempt, language])
  return {
    data,
    loading,
    error,
    notFound,
    retry: () => setAttempt((value) => value + 1),
  }
}

export function textField(item: PublishedItem, key: string): string {
  return typeof item.data[key] === "string" ? item.data[key] as string : ""
}

export function safeContentUrl(value: string): string | undefined {
  if (/^\/(?!\/)/.test(value) && !/[\\\s]/.test(value)) return value
  try {
    const url = new URL(value)
    if (["https:", "http:"].includes(url.protocol)) return url.href
  } catch {
    /* No link when content has an invalid URL. */
  }
  return undefined
}
