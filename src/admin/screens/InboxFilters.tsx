import { useEffect, useState } from "react"

export type InboxQuery = { status: string; assignee: string; q: string }

export const emptyQuery: InboxQuery = { status: "", assignee: "", q: "" }

export function queryString(query: InboxQuery, page: number) {
  const params = new URLSearchParams()
  params.set("page", String(page))
  if (query.status) params.set("status", query.status)
  if (query.assignee) params.set("assignee", query.assignee)
  if (query.q) params.set("q", query.q)
  return params.toString()
}

/** Status chips with live counts, assignee filter, search and CSV export — shared by both inboxes. */
export function InboxFilters({
  statuses,
  counts,
  assignees,
  query,
  onChange,
  exportPath,
  noun,
}: {
  statuses: { value: string; label: string }[]
  counts: Record<string, number> | undefined
  assignees: { id: number; name: string }[]
  query: InboxQuery
  onChange: (next: InboxQuery) => void
  exportPath: string
  noun: string
}) {
  const [search, setSearch] = useState(query.q)
  useEffect(() => setSearch(query.q), [query.q])
  const all = counts ? Object.values(counts).reduce((sum, n) => sum + n, 0) : undefined
  const exportHref = `/api/v1/${exportPath}?${queryString(query, 1).replace(/^page=1&?/, "")}`
  return (
    <div className="adm-filters">
      <div className="adm-chips" role="group" aria-label={`Filter ${noun} by status`}>
        <button type="button" className={`adm-chip${query.status ? "" : " is-on"}`} onClick={() => onChange({ ...query, status: "" })} aria-pressed={!query.status}>
          All{all !== undefined && <b>{all}</b>}
        </button>
        {statuses.map((status) => (
          <button
            key={status.value}
            type="button"
            className={`adm-chip ${status.value}${query.status === status.value ? " is-on" : ""}`}
            onClick={() => onChange({ ...query, status: query.status === status.value ? "" : status.value })}
            aria-pressed={query.status === status.value}
          >
            {status.label}{counts && <b>{counts[status.value] ?? 0}</b>}
          </button>
        ))}
      </div>
      <div className="adm-toolbar adm-filters__row">
        <label>
          Assigned to
          <select value={query.assignee} onChange={(event) => onChange({ ...query, assignee: event.target.value })}>
            <option value="">Anyone</option>
            <option value="unassigned">Unassigned</option>
            {assignees.map((assignee) => <option key={assignee.id} value={String(assignee.id)}>{assignee.name}</option>)}
          </select>
        </label>
        <form
          className="adm-search"
          role="search"
          onSubmit={(event) => { event.preventDefault(); onChange({ ...query, q: search.trim() }) }}
        >
          <input aria-label={`Search ${noun}`} placeholder={`Search ${noun} by name, email or reference…`} value={search} maxLength={150} onChange={(event) => setSearch(event.target.value)} />
          <button className="adm-button secondary">Search</button>
          {(query.q || query.status || query.assignee) && (
            <button type="button" className="adm-button secondary" onClick={() => { setSearch(""); onChange(emptyQuery) }}>Clear</button>
          )}
        </form>
        <a className="adm-button secondary adm-export" href={exportHref} download>
          Export CSV
        </a>
      </div>
    </div>
  )
}
