export type User = {
  id: number
  name: string
  email: string
  role: "owner" | "editor"
  active?: number
}
export type Field = {
  key: string
  label: string
  type: string
  required: boolean
  options: string[]
}
export type Module = {
  label: string
  description: string
  fields: Field[]
}
export type Modules = Record<string, Module>
export type ContentRecord = {
  id: number
  slug: string
  module: string
  locale: "en" | "bn"
  data: Record<string, string | boolean>
  status: string
  version: number
  sort_order: number
  updated_at: string
  review_requested_at: string | null
  review_state: "draft" | "in_review" | "approved" | "published"
}
export type Page<T> = {
  items: T[]
  total: number
  page: number
  pages: number
}

let csrf = ""
export function setCsrf(value: string) {
  csrf = value
}

export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers)
  if (options.body && !(options.body instanceof FormData))
    headers.set("Content-Type", "application/json")
  if (options.method && options.method !== "GET")
    headers.set("X-CSRF-Token", csrf)
  let response: Response
  try {
    response = await fetch(`/api/v1/${path}`, {
      ...options,
      headers,
      credentials: "same-origin",
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw error
    throw new Error(
      "Cannot reach the backend. Check the connection and try again.",
    )
  }
  let data: T & { error?: string }
  try {
    data = await response.json()
  } catch {
    throw new Error(
      "The PHP backend is unavailable. Start the API server and try again.",
    )
  }
  if (!response.ok) {
    if (response.status === 401 && path.startsWith("admin/"))
      window.dispatchEvent(new Event("n71-session-expired"))
    throw new Error(data.error || "The request could not be completed.")
  }
  return data
}
