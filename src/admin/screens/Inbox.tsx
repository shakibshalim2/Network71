import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { api, type ContentRecord, type Module, type Page, type User } from '../api'
import { Empty, ErrorNotice, Icon, Loading } from '../Admin'
import { useResource, ResourceError, Pager, time, type DashboardData, type MediaItem, type Inquiry } from './shared'
export function Inbox() {
  const [page, setPage] = useState(1)
  const { data, error, loading, reload } = useResource<Page<Inquiry>>(
    `admin/inquiries?page=${page}`,
  )
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState("")
  async function update(id: number, status: string) {
    setBusy(true)
    setActionError("")
    try {
      await api(`admin/inquiries/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
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
        Keep track of incoming conversations and their follow-up status.
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
                          {item.reference} · {time(item.created_at)}
                        </span>
                        <h2>{item.subject}</h2>
                      </div>
                      <span className="adm-tag">
                        {item.status.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="adm-message">{item.message}</p>
                    <dl>
                      <div>
                        <dt>From</dt>
                        <dd>
                          {item.name}
                          {item.company ? ` · ${item.company}` : ""}
                        </dd>
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
                      {item.source && (
                        <div>
                          <dt>Source page</dt>
                          <dd>{item.source}</dd>
                        </div>
                      )}
                    </dl>
                    <label>
                      Status
                      <select
                        disabled={busy}
                        value={item.status}
                        onChange={(event) =>
                          update(item.id, event.target.value)
                        }
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In progress</option>
                        <option value="closed">Closed</option>
                      </select>
                    </label>
                  </article>
                ))}
              </div>
            ) : (
              <Empty title="No enquiries yet">
                Messages submitted to the website enquiry API will appear here.
              </Empty>
            )}
            <Pager {...data} change={setPage} />
          </>
        )
      )}
    </>
  )
}
