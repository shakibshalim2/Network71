import re
# ---- shared types
p='src/admin/screens/shared.tsx'; s=open(p).read()
s=s.replace('''export type InquiryPage = Page<Inquiry> & {
  assignees: { id: number; name: string }[]
}''','''export type InquiryPage = Page<Inquiry> & {
  assignees: { id: number; name: string }[]
  counts?: Record<string, number>
}''')
open(p,'w').write(s)

# ---- Inbox
p='src/admin/screens/Inbox.tsx'; s=open(p).read()
s=s.replace('''import { useResource, ResourceError, Pager, time, type InquiryPage } from "./shared"''','''import { useResource, ResourceError, Pager, time, type InquiryPage } from "./shared"
import { InboxFilters, emptyQuery, queryString, type InboxQuery } from "./InboxFilters"

const STATUSES = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In progress" },
  { value: "closed", label: "Closed" },
]''')
s=s.replace('''  const [page, setPage] = useState(1)
  const { data, error, loading, reload } = useResource<InquiryPage>(`admin/inquiries?page=${page}`)''','''  const [page, setPage] = useState(1)
  const [query, setQuery] = useState<InboxQuery>(emptyQuery)
  const { data, error, loading, reload } = useResource<InquiryPage>(`admin/inquiries?${queryString(query, page)}`)
  const [copied, setCopied] = useState<number | null>(null)
  function copyEmail(id: number, email: string) {
    void navigator.clipboard?.writeText(email).then(() => { setCopied(id); window.setTimeout(() => setCopied(null), 1600) })
  }''')
s=s.replace('''      <p className="adm-intro">Keep track of incoming conversations, ownership and internal follow-up.</p>
      <ErrorNotice message={actionError} />''','''      <p className="adm-intro">Keep track of incoming conversations, ownership and internal follow-up.</p>
      <InboxFilters statuses={STATUSES} counts={data?.counts} assignees={data?.assignees ?? []} query={query} onChange={(next) => { setQuery(next); setPage(1) }} exportPath="admin/inquiries/export" noun="enquiries" />
      <ErrorNotice message={actionError} />''')
s=s.replace('''                    <div><dt>Email</dt><dd><a href={`mailto:${item.email}`}>{item.email}</a></dd></div>''','''                    <div><dt>Email</dt><dd><a href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.subject} (${item.reference})`)}`}>{item.email}</a> <button type="button" className="adm-inline-btn" onClick={() => copyEmail(item.id, item.email)}>{copied === item.id ? "Copied" : "Copy"}</button></dd></div>''')
s=s.replace('''          ) : <Empty title="No enquiries yet">Messages submitted to the website enquiry API will appear here.</Empty>}''','''          ) : query.q || query.status || query.assignee ? (
            <Empty title="No matching enquiries">Try another status, assignee or search term.</Empty>
          ) : <Empty title="No enquiries yet">Messages submitted to the website enquiry API will appear here.</Empty>}''')
open(p,'w').write(s)

# ---- Applications
p='src/admin/screens/Applications.tsx'; s=open(p).read()
s=s.replace('import { useState } from "react"','import { useState, type FormEvent } from "react"')
s=s.replace('''export function Applications() {
  const [page, setPage] = useState(1)
  const { data, error, loading, reload } = useResource<ApplicationPage>(
    `admin/applications?page=${page}`,
  )''','''const STATUSES = [
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
  }''')
# imports
s=re.sub(r'import \{ useResource, ResourceError, Pager, time[^\n]*\n', lambda m: m.group(0)+'import { InboxFilters, emptyQuery, queryString, type InboxQuery } from "./InboxFilters"\nimport type { InquiryNote } from "./shared"\n', s, count=1)
# type: add notes
s=s.replace('  locale: string\n','  locale: string\n  notes: InquiryNote[]\n',1)
s=s.replace('''      <ErrorNotice message={actionError} />
      <ResourceError error={error} retry={reload} />
      {loading ? (
        <Loading />
      ) : (
        !error &&
        data && (
          <>
            {data.items.length ? (''','''      <InboxFilters statuses={STATUSES} counts={data?.counts} assignees={data?.assignees ?? []} query={query} onChange={(next) => { setQuery(next); setPage(1) }} exportPath="admin/applications/export" noun="applications" />
      <ErrorNotice message={actionError} />
      <ResourceError error={error} retry={reload} />
      {loading ? (
        <Loading />
      ) : (
        !error &&
        data && (
          <>
            {data.items.length ? (''')
# notes block before </article>
s=s.replace('''                    </div>
                  </article>
                ))}''','''                    </div>
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
                ))}''')
s=s.replace('''              <Empty title="No applications yet">''','''              query.q || query.status || query.assignee ? (
                <Empty title="No matching applications">Try another status, assignee or search term.</Empty>
              ) : (
              <Empty title="No applications yet">''')
s=s.replace('''                application form will appear here.
              </Empty>
            )}''','''                application form will appear here.
              </Empty>
              )
            )}''')
open(p,'w').write(s)
print('fe1 ok')
