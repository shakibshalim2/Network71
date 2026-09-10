import { useState, type FormEvent } from "react"
import Dialog from "@/components/Dialog"
import { useT } from "@/i18n"
import type { CareersContent } from "../content/en"

export type ApplicationTarget = { slug: string; title: string }

export default function ApplicationForm({
  target,
  c,
  onClose,
}: {
  target: ApplicationTarget
  c: CareersContent["application"]
  onClose: () => void
}) {
  const { language } = useT()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [reference, setReference] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    data.set("job_slug", target.slug)
    data.set("locale", language)
    data.set("request_key", crypto.randomUUID())
    setBusy(true)
    setError("")
    try {
      const response = await fetch("/api/v1/job-applications", {
        method: "POST",
        body: data,
        credentials: "same-origin",
      })
      const result = (await response.json()) as {
        reference?: string
        error?: string
      }
      if (!response.ok) throw new Error(result.error || c.error)
      setReference(result.reference || "")
      form.reset()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : c.error)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog
      title={(target.slug === "general" ? c.generalTitle : c.title).replace(
        "{job}",
        target.title,
      )}
      onClose={onClose}
    >
      {reference ? (
        <div role="status" className="career-application-success">
          <h3>{c.successTitle}</h3>
          <p>{c.successText.replace("{reference}", reference)}</p>
          <button className="public-button" type="button" onClick={onClose}>
            {c.close}
          </button>
        </div>
      ) : (
        <form className="career-application" onSubmit={submit}>
          <label>
            {c.name} *
            <input name="name" required maxLength={120} autoComplete="name" />
          </label>
          <label>
            {c.email} *
            <input
              name="email"
              type="email"
              required
              maxLength={190}
              autoComplete="email"
            />
          </label>
          <label>
            {c.phone}
            <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
          </label>
          <label>
            {c.coverLetter}
            <textarea name="cover_letter" rows={5} maxLength={5000} />
          </label>
          <label>
            {c.resume} *
            <input
              name="resume"
              type="file"
              accept="application/pdf,.pdf"
              required
            />
            <small>{c.resumeHelp}</small>
          </label>
          <label className="career-application-consent">
            <input name="consent" type="checkbox" value="yes" required />
            <span>{c.consent}</span>
          </label>
          <label className="career-honeypot" aria-hidden="true">
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          {error && (
            <p role="alert" className="career-application-error">
              {error}
            </p>
          )}
          <button className="public-button" disabled={busy}>
            {busy ? c.submitting : c.submit}
          </button>
        </form>
      )}
    </Dialog>
  )
}
