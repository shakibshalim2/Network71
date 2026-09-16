import { useState, type FormEvent } from "react"
import { api, type User } from "../api"
import { Empty, ErrorNotice, Loading } from "../Admin"
import { useResource, ResourceError, Pager, time, type InquiryPage } from "./shared"
import { InboxFilters, emptyQuery, queryString, type InboxQuery } from "./InboxFilters"

const STATUSES = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In progress" },
  { value: "closed", label: "Closed" },
]

export function Inbox({ user }: { user: User }) {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState<InboxQuery>(emptyQuery)
  const { data, error, loading, reload } = useResource<InquiryPage>(`admin/inquiries?${queryString(query, page)}`)
  const [copied, setCopied] = useState<number | null>(null)
  function copyEmail(id: number, email: string) {
    void navigator.clipboard?.writeText(email).then(() => { setCopied(id); window.setTimeout(() => setCopied(null), 1600) })
  }
  const [busyId, setBusyId] = useState<number | null>(null)
  const [actionError, setActionError] = useState("")

  async function update(id: number, change: Record<string, string | number | null>) {
    setBusyId(id)
    setActionError("")
    try {
      await api(`admin/inquiries/${id}`, { method: "PATCH", body: JSON.stringify(change) })
      reload()
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusyId(null)
    }
  }

  async function removeNote(id: number, noteId: number) {
    if (!window.confirm("Remove this internal note?")) return
    setBusyId(id)
    setActionError("")
    try {
      await api(`admin/inquiries/${id}/notes/${noteId}`, { method: "DELETE" })
      reload()
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusyId(null)
    }
  }
  async function addNote(event: FormEvent<HTMLFormElement>, id: number) {
    event.preventDefault()
    const form = event.currentTarget
    const note = new FormData(form).get("note")
    if (typeof note !== "string" || !note.trim()) return
    setBusyId(id)
    setActionError("")
    try {
      await api(`admin/inquiries/${id}/notes`, { method: "POST", body: JSON.stringify({ note }) })
      form.reset()
      reload()
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <p className="adm-intro">Keep track of incoming conversations, ownership and internal follow-up.</p>
      <InboxFilters statuses={STATUSES} counts={data?.counts} assignees={data?.assignees ?? []} query={query} onChange={(next) => { setQuery(next); setPage(1) }} exportPath="admin/inquiries/export" noun="enquiries" />
      <ErrorNotice message={actionError} />
      <ResourceError error={error} retry={reload} />
      {loading ? <Loading /> : !error && data && (
        <>
          {data.items.length ? (
            <div className="adm-inquiries">
              {data.items.map((item) => (
                <article className="adm-panel adm-inquiry" key={item.id}>
                  <div className="adm-panel-heading">
                    <div>
                      <span className="adm-eyebrow">{item.reference} · {time(item.created_at)}</span>
                      <h2>{item.subject}</h2>
                    </div>
                    <span className={`adm-tag ${item.status}`}>{item.status.replace(/_/g, " ")}</span>
                  </div>
                  <p className="adm-message">{item.message}</p>
                  <dl>
                    <div><dt>From</dt><dd>{item.name}{item.company ? ` · ${item.company}` : ""}</dd></div>
                    <div><dt>Email</dt><dd><a href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.subject} (${item.reference})`)}`}>{item.email}</a> <button type="button" className="adm-inline-btn" onClick={() => copyEmail(item.id, item.email)}>{copied === item.id ? "Copied" : "Copy"}</button></dd></div>
                    {item.phone && <div><dt>Phone</dt><dd>{item.phone}</dd></div>}
                    {item.source && <div><dt>Source page</dt><dd>{item.source}</dd></div>}
                  </dl>
                  <div className="adm-inquiry-controls">
                    <label>
                      Status
                      <select disabled={busyId === item.id} value={item.status} onChange={(event) => update(item.id, { status: event.target.value })}>
                        <option value="new">New</option>
                        <option value="in_progress">In progress</option>
                        <option value="closed">Closed</option>
                      </select>
                    </label>
                    <label>
                      Assigned to
                      <select disabled={busyId === item.id} value={item.assigned_to ?? ""} onChange={(event) => update(item.id, { assigned_to: event.target.value ? Number(event.target.value) : null })}>
                        <option value="">Unassigned</option>
                        {data.assignees.map((assignee) => <option key={assignee.id} value={assignee.id}>{assignee.name}</option>)}
                      </select>
                    </label>
                  </div>
                  <div className="adm-inquiry-notes">
                    <h3>Internal notes</h3>
                    {item.notes.length ? (
                      <ul>{item.notes.map((note) => <li key={note.id}><p>{note.note}</p><span>{note.author_name} · {time(note.created_at)}{(user.role === "owner" || note.author_name === user.name) && <button type="button" className="adm-inline-btn" disabled={busyId === item.id} onClick={() => removeNote(item.id, note.id)}>Remove</button>}</span></li>)}</ul>
                    ) : <p className="adm-help">No internal notes yet.</p>}
                    <form onSubmit={(event) => addNote(event, item.id)}>
                      <label>Add a note<textarea name="note" maxLength={2000} required rows={3} /></label>
                      <button className="adm-button secondary" disabled={busyId === item.id}>{busyId === item.id ? "Saving…" : "Add note"}</button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          ) : query.q || query.status || query.assignee ? (
            <Empty title="No matching enquiries">Try another status, assignee or search term.</Empty>
          ) : <Empty title="No enquiries yet">Messages submitted to the website enquiry API will appear here.</Empty>}
          <Pager {...data} change={setPage} />
        </>
      )}
    </>
  )
}
