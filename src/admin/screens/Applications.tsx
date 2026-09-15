import { useState } from "react"
import { api, type Page } from "../api"
import { Empty, ErrorNotice, Loading } from "../Admin"
import { Pager, ResourceError, time, useResource } from "./shared"

type Application = {
  id: number
  reference: string
  job_title: string
  locale: string
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
}

export function Applications() {
  const [page, setPage] = useState(1)
  const { data, error, loading, reload } = useResource<ApplicationPage>(
    `admin/applications?page=${page}`,
  )
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
                  </article>
                ))}
              </div>
            ) : (
              <Empty title="No applications yet">
                Applications submitted from a published vacancy or the general
                application form will appear here.
              </Empty>
            )}
            <Pager {...data} change={setPage} />
          </>
        )
      )}
    </>
  )
}
