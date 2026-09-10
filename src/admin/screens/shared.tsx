import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { api, type ContentRecord, type Module, type Page, type User } from '../api'
import { Empty, ErrorNotice, Icon, Loading } from '../Admin'
export function useResource<T>(path: string) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [revision, setRevision] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError("")
    api<T>(path, { signal: controller.signal })
      .then(setData)
      .catch((error) => {
        if (!controller.signal.aborted) setError(error.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [path, revision])
  return {
    data,
    error,
    loading,
    reload: () => setRevision((value) => value + 1),
  }
}
export function ResourceError({ error, retry }: { error: string; retry: () => void }) {
  return error ? (
    <>
      <ErrorNotice message={error} />
      <button className="adm-button secondary" onClick={retry}>
        Try again
      </button>
    </>
  ) : null
}
export function Pager({
  page,
  pages,
  total,
  change,
}: {
  page: number
  pages: number
  total: number
  change: (page: number) => void
}) {
  return (
    <div className="adm-pagination">
      <span>
        {total} items · Page {page} of {pages}
      </span>
      <div>
        <button disabled={page <= 1} onClick={() => change(page - 1)}>
          Previous
        </button>
        <button disabled={page >= pages} onClick={() => change(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}
export function time(value: string) {
  return new Date(value.replace(" ", "T") + "Z").toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
export type DashboardData = {
  total: number
  published: number
  drafts: number
  inquiries: number
  activity: {
    id: number
    action: string
    entity: string
    name: string
    created_at: string
  }[]
}
export type MediaItem = {
  id: number
  filename: string
  alt: string
  width: number
  height: number
  bytes: number
}
export type Inquiry = {
  id: number
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  reference: string
  status: string
  created_at: string
  source: string
}