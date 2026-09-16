import { useState, type FormEvent } from "react"
import { api, type User } from "../api"
import { ErrorNotice, Icon } from "../Admin"

/** Self-service account screen: change your own password without asking an owner for a reset link. */
export function Account({ user }: { user: User }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    if (values.get("password") !== values.get("confirm")) { setError("New passwords must match."); return }
    setBusy(true); setError(""); setNotice("")
    try {
      await api("auth/change-password", { method: "POST", body: JSON.stringify({ current_password: values.get("current_password"), password: values.get("password") }) })
      form.reset()
      setNotice("Password changed. Other devices signed in to this account will need to sign in again.")
    } catch (caught) {
      setError((caught as Error).message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <p className="adm-intro">Signed in as <strong>{user.name}</strong> ({user.email}) · {user.role === "owner" ? "Owner access" : "Editor access"}.</p>
      <ErrorNotice message={error} />
      {notice && <div className="adm-success" role="status">{notice}</div>}
      <form className="adm-panel adm-editor" onSubmit={submit}>
        <h2>Change your password</h2>
        <div className="adm-form-grid">
          <label>
            Current password
            <input name="current_password" type="password" autoComplete="current-password" required maxLength={72} />
          </label>
          <label>
            New password
            <input name="password" type="password" autoComplete="new-password" required minLength={12} maxLength={72} />
            <small>At least 12 characters.</small>
          </label>
          <label>
            Confirm new password
            <input name="confirm" type="password" autoComplete="new-password" required minLength={12} maxLength={72} />
          </label>
        </div>
        <button className="adm-button" disabled={busy}>
          {busy ? "Saving…" : "Change password"}
          <Icon name="check" size={18} />
        </button>
      </form>
    </>
  )
}
