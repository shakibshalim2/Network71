import { useRef, useState } from "react"
import { useT } from "@/i18n"

export function useInquiry() {
  const [reference, setReference] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const pending = useRef(false)
  const { t } = useT()
  const request = useRef({ key: "", payload: "" })
  async function submit(values: Record<string, string>) {
    if (pending.current) return
    pending.current = true
    setBusy(true)
    setError("")
    const payload = JSON.stringify(values)
    try {
      if (payload !== request.current.payload) {
        const key = Array.from(
          crypto.getRandomValues(new Uint8Array(20)),
          (byte) => byte.toString(16).padStart(2, "0"),
        ).join("")
        request.current = { key, payload }
      }
      const response = await fetch("/api/v1/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          request_key: request.current.key,
          source: window.location.pathname,
        }),
      })
      const data = await response.json()
      if (!response.ok)
        throw new Error(
          data.error || t("lib.sendFailed"),
        )
      setReference(data.reference)
    } catch (error) {
      setError(
        error instanceof SyntaxError || error instanceof TypeError
          ? t("lib.serviceDown")
          : (error as Error).message,
      )
    } finally {
      pending.current = false
      setBusy(false)
    }
  }
  return { reference, error, busy, submit }
}
