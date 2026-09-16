import { useEffect, useState } from "react"
import { Empty } from "../Admin"
import { Loading } from "../Admin"
import { Pager, ResourceError, useResource } from "./shared"

type AuditPage = {
  items: { id: number; action: string; entity: string; entity_id: number | null; created_at: string; actor_name: string | null }[]
  entities: string[]
  actors: { id: number; name: string }[]
  total: number
  page: number
  pages: number
}

function when(value: string) {
  return new Date(value.replace(" ", "T") + "Z").toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

/** Owner-only audit trail: who did what, filtered by area, person and action. */
export function AuditLog() {
  const [page, setPage] = useState(1)
  const [entity, setEntity] = useState("")
  const [actor, setActor] = useState("")
  const [q, setQ] = useState("")
  const [draft, setDraft] = useState("")
  useEffect(() => setDraft(q), [q])
  const params = new URLSearchParams({ page: String(page) })
  if (entity) params.set("entity", entity)
  if (actor) params.set("actor", actor)
  if (q) params.set("q", q)
  const { data, error, loading, reload } = useResource<AuditPage>(`admin/audit?${params}`)
  return (
    <>
      <p className="adm-intro">Every sign-in, save, publish, export and access change is recorded here. Entries cannot be edited or removed.</p>
      <div className="adm-toolbar adm-filters__row">
        <label>
          Area
          <select value={entity} onChange={(event) => { setEntity(event.target.value); setPage(1) }}>
            <option value="">All areas</option>
            {(data?.entities ?? []).map((item) => <option key={item} value={item}>{item.replace(/_/g, " ")}</option>)}
          </select>
        </label>
        <label>
          Person
          <select value={actor} onChange={(event) => { setActor(event.target.value); setPage(1) }}>
            <option value="">Anyone</option>
            {(data?.actors ?? []).map((item) => <option key={item.id} value={String(item.id)}>{item.name}</option>)}
          </select>
        </label>
        <form className="adm-search" role="search" onSubmit={(event) => { event.preventDefault(); setQ(draft.trim()); setPage(1) }}>
          <input aria-label="Search actions" placeholder="Search actions, e.g. publish" value={draft} maxLength={60} onChange={(event) => setDraft(event.target.value)} />
          <button className="adm-button secondary">Search</button>
          {(q || entity || actor) && <button type="button" className="adm-button secondary" onClick={() => { setDraft(""); setQ(""); setEntity(""); setActor(""); setPage(1) }}>Clear</button>}
        </form>
      </div>
      <ResourceError error={error} retry={reload} />
      {loading ? <Loading /> : !error && data && (
        data.items.length ? (
          <>
            <div className="adm-panel adm-audit">
              <table>
                <thead><tr><th>When</th><th>Person</th><th>Action</th><th>Area</th><th>Record</th></tr></thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr key={item.id}>
                      <td>{when(item.created_at)}</td>
                      <td>{item.actor_name ?? "—"}</td>
                      <td><span className={`adm-tag ${/publish|approve|activate|create|hired/.test(item.action) ? "published" : /delete|archive|deactivate|reject|fail/.test(item.action) ? "rejected" : "draft"}`}>{item.action.replace(/_/g, " ")}</span></td>
                      <td>{item.entity.replace(/_/g, " ")}</td>
                      <td>{item.entity_id ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager {...data} change={setPage} />
          </>
        ) : <Empty title="No matching activity">Try another area, person or action.</Empty>
      )}
    </>
  )
}
