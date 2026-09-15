import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { api, type ContentRecord, type Module, type Page, type User } from '../api'
import { Empty, ErrorNotice, Icon, Loading } from '../Admin'
import { useResource, ResourceError, Pager, time, type DashboardData, type MediaItem, type Inquiry } from './shared'
export function Users({ user }: { user: User }) {
  const { data, error, loading, reload } = useResource<{ items: User[] }>(
    user.role === "owner" ? "admin/users" : "auth/session",
  )
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState("")
  const [notice, setNotice] = useState("")
  if (user.role !== "owner")
    return (
      <Empty title="Owner access required">
        Only website owners can manage accounts.
      </Empty>
    )
  const [resetLink,setResetLink]=useState('')
  async function resetAccount(id:number) {
    if(!window.confirm('Create a 30-minute password reset link for this account?'))return
    setBusy(true);setActionError('');setResetLink('')
    try {const result=await api<{url:string}>('admin/users/'+id+'/reset-link',{method:'POST'});setResetLink(result.url)}catch(e){setActionError((e as Error).message)}finally{setBusy(false)}
  }
  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setBusy(true)
    setActionError("")
    setNotice("")
    try {
      await api("admin/users", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      form.reset()
      reload()
      setNotice(
        "Account created. Share its credentials privately with the team member.",
      )
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusy(false)
    }
  }
  async function toggle(account: User) {
    if (
      !window.confirm(
        `${
          Number(account.active) ? "Deactivate" : "Activate"
        } access for ${account.name}?`,
      )
    )
      return
    setBusy(true)
    setActionError("")
    try {
      await api(`admin/users/${account.id}`, {
        method: "PATCH",
        body: JSON.stringify({ active: !Number(account.active) }),
      })
      reload()
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <p className="adm-intro">
        Owners publish content and manage access. Editors prepare content
        drafts.
      </p>
      <ErrorNotice message={actionError} />{resetLink && <label>Private reset link — share directly with the account holder<input readOnly value={resetLink} onFocus={e=>e.target.select()} /></label>}
      {notice && (
        <div className="adm-success" role="status">
          {notice}
        </div>
      )}
      <form className="adm-panel adm-editor" onSubmit={create}>
        <h2>Create an account</h2>
        <div className="adm-form-grid">
          <label>
            Full name
            <input name="name" maxLength={120} required autoComplete="off" />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              maxLength={190}
              required
              autoComplete="off"
            />
          </label>
          <label>
            Initial password
            <input
              name="password"
              type="password"
              minLength={12}
              maxLength={72}
              required
              autoComplete="new-password"
            />
            <small>At least 12 characters. Share privately.</small>
          </label>
          <label>
            Access role
            <select name="role">
              <option value="editor">Editor</option>
              <option value="owner">Owner</option>
            </select>
          </label>
        </div>
        <button className="adm-button" disabled={busy}>
          {busy ? "Saving…" : "Create account"}
        </button>
      </form>
      <ResourceError error={error} retry={reload} />
      {loading ? (
        <Loading />
      ) : (
        !error &&
        data && (
          <div className="adm-records">
            {data.items.map((account) => (
              <article className="adm-record" key={account.id}>
                <span className="adm-avatar">{account.name.slice(0, 1)}</span>
                <div className="adm-record-info">
                  <h3>
                    {account.name}
                    {Number(account.id) === Number(user.id) ? " (you)" : ""}
                  </h3>
                  <p>{account.email}</p>{Number(account.active) === 1 && <button type="button" className="adm-button secondary" disabled={busy} onClick={() => resetAccount(account.id)}>Reset password</button>}
                </div>
                <span className={`adm-tag ${Number(account.active) ? "active" : "inactive"}`}>
                  {account.role} ·{" "}
                  {Number(account.active) ? "active" : "inactive"}
                </span>
                {Number(account.id) !== Number(user.id) && (
                  <div className="adm-record-actions">
                    <button disabled={busy} onClick={() => toggle(account)}>
                      {Number(account.active) ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )
      )}
    </>
  )
}
