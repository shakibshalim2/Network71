import { useState, type FormEvent } from "react"
import { api, type Page } from "../api"
import { Empty, ErrorNotice, Loading } from "../Admin"
import { Pager, ResourceError, time, useResource, type InquiryNote } from "./shared"
import { InboxFilters, emptyQuery, queryString, type InboxQuery } from "./InboxFilters"

type Application = {
  id: number
  reference: string
  job_title: string
  locale: string
  notes: InquiryNote[]
  name: string
  email: string
  phone: string
  cover_letter: string
  resume_original_name: string
  resume_bytes: number
  status: string
  assigned_to: number | null
  created_at: string
}
type ApplicationPage = Page<Application> & {
  assignees: { id: number; name: string }[]
  counts?: Record<string, number>
}

const STATUSES = [
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "interview", label: "Interview" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
  { value: "withdrawn", label: "Withdrawn" },
]

export function Applications() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState<InboxQuery>(emptyQuery)
  const { data, error, loading, reload } = useResource<ApplicationPage>(
    `admin/applications?${queryString(query, page)}`,
  )
  async function addNote(event: FormEvent<HTMLFormElement>, id: number) {
    event.preventDefault()
    const form = event.currentTarget
    const note = new FormData(form).get("note")
    if (typeof note !== "string" || !note.trim()) return
    setBusyId(id)
    setActionError("")
    try {
      await api(`admin/applications/${id}/notes`, { method: "POST", body: JSON.stringify({ note }) })
      form.reset()
      reload()
    } catch (caught) {
      setActionError((caught as Error).message)
    } finally {
      setBusyId(null)
    }
  }
  const [busyId, setBusyId] = useState<number | null>(null)
  const [actionError, setActionError] = useState("")

  async function update(
    id: number,
    change: Record<string, string | number | null>,
  ) {
    setBusyId(id)
    setActionError("")
    try {
      await api(`admin/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify(change),
      })
      reload()
    } catch (caught) {
      setActionError((caught as Error).message)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <p className="adm-intro">
        Review applications and download CVs. CV files stay in private storage
        and require an active admin session.
      </p>
      <InboxFilters statuses={STATUSES} counts={data?.counts} assignees={data?.assignees ?? []} query={query} onChange={(next) => { setQuery(next); setPage(1) }} exportPath="admin/applications/export" noun="applications" />
      <ErrorNotice message={actionError} />
      <ResourceError error={error} retry={reload} />
      {loading ? (
        <Loading />
      ) : (
        !error &&
        data && (
          <>
            {data.items.length ? (
              <div className="adm-inquiries">
                {data.items.map((item) => (
                  <article className="adm-panel adm-inquiry" key={item.id}>
                    <div className="adm-panel-heading">
                      <div>
                        <span className="adm-eyebrow">
                          {item.reference} · {time(item.created_at)} ·{" "}
                          {item.locale.toUpperCase()}
                        </span>
                        <h2>{item.job_title}</h2>
                      </div>
                      <span className={`adm-tag ${item.status}`}>{item.status}</span>
                    </div>
                    {item.cover_letter && (
                      <p className="adm-message">{item.cover_letter}</p>
                    )}
                    <dl>
                      <div>
                        <dt>Candidate</dt>
                        <dd>{item.name}</dd>
                      </div>
                      <div>
                        <dt>Email</dt>
                        <dd>
                          <a href={`mailto:${item.email}`}>{item.email}</a>
                        </dd>
                      </div>
                      {item.phone && (
                        <div>
                          <dt>Phone</dt>
                          <dd>{item.phone}</dd>
                        </div>
                      )}
                      <div>
                        <dt>CV</dt>
                        <dd>
                          <a
                            href={`/api/v1/admin/applications/${item.id}/resume`}
                          >
                            {item.resume_original_name} ·{" "}
                            {(item.resume_bytes / 1024).toFixed(0)} KB
                          </a>
                        </dd>
                      </div>
                    </dl>
                    <div className="adm-inquiry-controls">
                      <label>
                        Status
                        <select
                          disabled={busyId === item.id}
                          value={item.status}
                          onChange={(event) =>
                            update(item.id, { status: event.target.value })
                          }
                        >
                          <option value="new">New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="interview">Interview</option>
                          <option value="rejected">Rejected</option>
                          <option value="hired">Hired</option>
                          <option value="withdrawn">Withdrawn</option>
                        </select>
                      </label>
                      <label>
                        Assigned to
                        <select
                          disabled={busyId === item.id}
                          value={item.assigned_to ?? ""}
                          onChange={(event) =>
                            update(item.id, {
                              assigned_to: event.target.value
                                ? Number(event.target.value)
                                : null,
                            })
                          }
                        >
                          <option value="">Unassigned</option>
                          {data.assignees.map((assignee) => (
                            <option key={assignee.id} value={assignee.id}>
                              {assignee.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="adm-inquiry-notes">
                      <h3>Internal notes</h3>
                      {item.notes?.length ? (
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
            ) : (
              query.q || query.status || query.assignee ? (
                <Empty title="No matching applications">Try another status, assignee or search term.</Empty>
              ) : (
              <Empty title="No applications yet">
                Applications submitted from a published vacancy or the general
                application form will appear here.
              </Empty>
              )
            )}
            <Pager {...data} change={setPage} />
          </>
        )
      )}
    </>
  )
}
