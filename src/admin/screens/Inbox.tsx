import { useState, type FormEvent } from "react"
import { api } from "../api"
import { Empty, ErrorNotice, Loading } from "../Admin"
import { useResource, ResourceError, Pager, time, type InquiryPage } from "./shared"

export function Inbox() {
  const [page, setPage] = useState(1)
  const { data, error, loading, reload } = useResource<InquiryPage>(`admin/inquiries?page=${page}`)
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
                    <span className="adm-tag">{item.status.replace(/_/g, " ")}</span>
                  </div>
                  <p className="adm-message">{item.message}</p>
                  <dl>
                    <div><dt>From</dt><dd>{item.name}{item.company ? ` · ${item.company}` : ""}</dd></div>
                    <div><dt>Email</dt><dd><a href={`mailto:${item.email}`}>{item.email}</a></dd></div>
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
                      <ul>{item.notes.map((note) => <li key={note.id}><p>{note.note}</p><span>{note.author_name} · {time(note.created_at)}</span></li>)}</ul>
                    ) : <p className="adm-help">No internal notes yet.</p>}
                    <form onSubmit={(event) => addNote(event, item.id)}>
                      <label>Add a note<textarea name="note" maxLength={2000} required rows={3} /></label>
                      <button className="adm-button secondary" disabled={busyId === item.id}>{busyId === item.id ? "Saving…" : "Add note"}</button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          ) : <Empty title="No enquiries yet">Messages submitted to the website enquiry API will appear here.</Empty>}
          <Pager {...data} change={setPage} />
        </>
      )}
    </>
  )
}
