p='src/admin/screens.tsx'; s=open(p).read()
s+="export { AuditLog } from './screens/AuditLog'\nexport { Account } from './screens/Account'\n"
open(p,'w').write(s)

# ---- Admin shell: routes + nav + titles
p='src/admin/Admin.tsx'; s=open(p).read()
s=s.replace('''import {
  Applications,
  ContentEditor,
  Dashboard,
  Inbox,
  MediaLibrary,
  Users,
} from "./screens"''','''import {
  Account,
  Applications,
  AuditLog,
  ContentEditor,
  Dashboard,
  Inbox,
  MediaLibrary,
  Users,
} from "./screens"''')
s=s.replace('''      users: "Team access",
      pages: "Website pages",
      more: "Workspace tools",''','''      users: "Team access",
      audit: "Activity log",
      account: "Your account",
      pages: "Website pages",
      more: "Workspace tools",''')
s=s.replace('''      "metrics",
      "media",
      "users",
    ]''','''      "metrics",
      "media",
      "users",
      "audit",
      "account",
    ]''')
s=s.replace('''              {user.role === "owner" && nav("users", "Team access", "users")}
            </nav>''','''              {user.role === "owner" && nav("users", "Team access", "users")}
              {user.role === "owner" && nav("audit", "Activity log", "audit")}
              {nav("account", "Your account", "account")}
            </nav>''')
s=s.replace('''              ) : section === "users" ? (
                <Users user={user} />''','''              ) : section === "users" ? (
                <Users user={user} />
              ) : section === "audit" ? (
                user.role === "owner" ? <AuditLog /> : <Empty title="Owner access required">Only website owners can view the activity log.</Empty>
              ) : section === "account" ? (
                <Account user={user} />''')
# icons
s=s.replace('''    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,''','''    audit: (
      <>
        <path d="M4 5h16v14H4Z" />
        <path d="M8 10h8M8 14h5" />
      </>
    ),
    account: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,''')
# "more" grid: add cards for account (everyone) + audit (owner)
s=s.replace('''                        {user.role === "owner" && (
                          <Link className="adm-module-card" to="/admin/users">''','''                        <Link className="adm-module-card" to="/admin/account">
                          <span className="adm-module-icon">
                            <Icon name="account" />
                          </span>
                          <h3>Your account</h3>
                          <p>Change your own password.</p>
                          <span className="adm-card-arrow">
                            <Icon name="arrow" />
                          </span>
                        </Link>
                        {user.role === "owner" && (
                          <Link className="adm-module-card" to="/admin/audit">
                            <span className="adm-module-icon">
                              <Icon name="audit" />
                            </span>
                            <h3>Activity log</h3>
                            <p>Who changed what, and when.</p>
                            <span className="adm-card-arrow">
                              <Icon name="arrow" />
                            </span>
                          </Link>
                        )}
                        {user.role === "owner" && (
                          <Link className="adm-module-card" to="/admin/users">''')
open(p,'w').write(s)

# ---- Inbox: delete note
p='src/admin/screens/Inbox.tsx'; s=open(p).read()
s=s.replace('''export function Inbox() {''','''export function Inbox({ user }: { user: User }) {''')
s=s.replace('''import { api } from "../api"''','''import { api, type User } from "../api"''')
s=s.replace('''  async function addNote(event: FormEvent<HTMLFormElement>, id: number) {''','''  async function removeNote(id: number, noteId: number) {
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
  async function addNote(event: FormEvent<HTMLFormElement>, id: number) {''')
s=s.replace('''<ul>{item.notes.map((note) => <li key={note.id}><p>{note.note}</p><span>{note.author_name} · {time(note.created_at)}</span></li>)}</ul>''','''<ul>{item.notes.map((note) => <li key={note.id}><p>{note.note}</p><span>{note.author_name} · {time(note.created_at)}{(user.role === "owner" || note.author_name === user.name) && <button type="button" className="adm-inline-btn" disabled={busyId === item.id} onClick={() => removeNote(item.id, note.id)}>Remove</button>}</span></li>)}</ul>''')
open(p,'w').write(s)

# ---- Applications: delete note
p='src/admin/screens/Applications.tsx'; s=open(p).read()
s=s.replace('''export function Applications() {''','''export function Applications({ user }: { user: User }) {''')
s=s.replace('''import { api, type Page } from "../api"''','''import { api, type Page, type User } from "../api"''')
s=s.replace('''  async function addNote(event: FormEvent<HTMLFormElement>, id: number) {''','''  async function removeNote(id: number, noteId: number) {
    if (!window.confirm("Remove this internal note?")) return
    setBusyId(id)
    setActionError("")
    try {
      await api(`admin/applications/${id}/notes/${noteId}`, { method: "DELETE" })
      reload()
    } catch (caught) {
      setActionError((caught as Error).message)
    } finally {
      setBusyId(null)
    }
  }
  async function addNote(event: FormEvent<HTMLFormElement>, id: number) {''')
s=s.replace('''<ul>{item.notes.map((note) => <li key={note.id}><p>{note.note}</p><span>{note.author_name} · {time(note.created_at)}</span></li>)}</ul>''','''<ul>{item.notes.map((note) => <li key={note.id}><p>{note.note}</p><span>{note.author_name} · {time(note.created_at)}{(user.role === "owner" || note.author_name === user.name) && <button type="button" className="adm-inline-btn" disabled={busyId === item.id} onClick={() => removeNote(item.id, note.id)}>Remove</button>}</span></li>)}</ul>''')
open(p,'w').write(s)

# pass user to Inbox/Applications
p='src/admin/Admin.tsx'; s=open(p).read()
s=s.replace('''                <Inbox />''','''                <Inbox user={user} />''').replace('''                <Applications />''','''                <Applications user={user} />''')
open(p,'w').write(s)

# ---- Media: search
p='src/admin/screens/MediaLibrary.tsx'; s=open(p).read()
s=s.replace('''  const [page, setPage] = useState(1)
  const { data, error, loading, reload } = useResource<Page<MediaItem>>(
    `admin/media?page=${page}`,
  )''','''  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [draft, setDraft] = useState("")
  const { data, error, loading, reload } = useResource<Page<MediaItem>>(
    `admin/media?page=${page}${search ? `&q=${encodeURIComponent(search)}` : ""}`,
  )''')
s=s.replace('''      <ResourceError error={error} retry={reload} />
      {loading ? (
        <Loading />
      ) : (
        !error &&
        data && (
          <>
            {data.items.length ? (
              <div className="adm-media-grid">''','''      <form className="adm-search adm-media-search" role="search" onSubmit={(event) => { event.preventDefault(); setSearch(draft.trim()); setPage(1) }}>
        <input aria-label="Search images" placeholder="Search by description or file name…" value={draft} maxLength={150} onChange={(event) => setDraft(event.target.value)} />
        <button className="adm-button secondary">Search</button>
        {search && <button type="button" className="adm-button secondary" onClick={() => { setDraft(""); setSearch(""); setPage(1) }}>Clear</button>}
      </form>
      <ResourceError error={error} retry={reload} />
      {loading ? (
        <Loading />
      ) : (
        !error &&
        data && (
          <>
            {data.items.length ? (
              <div className="adm-media-grid">''')
s=s.replace('''              <Empty title="Your image library starts here">''','''              search ? (
                <Empty title="No matching images">Try another description or file name.</Empty>
              ) : (
              <Empty title="Your image library starts here">''')
s=s.replace('''                use.
              </Empty>
            )}''','''                use.
              </Empty>
              )
            )}''')
open(p,'w').write(s)

# ---- ContentEditor: translation status + "Create translation"
p='src/admin/screens/ContentEditor.tsx'; s=open(p).read()
s=s.replace('''  function duplicate(record: ContentRecord) {''','''  const [twins, setTwins] = useState<Record<number, { locale: string; record: { id: number; status: string; review_state: string } | null }>>({})
  async function checkTranslation(record: ContentRecord) {
    setActionError("")
    try {
      const result = await api<{ locale: string; record: { id: number; status: string; review_state: string } | null }>(`admin/content/${moduleKey}/${record.id}/translation`)
      setTwins((current) => ({ ...current, [record.id]: result }))
    } catch (error) {
      setActionError((error as Error).message)
    }
  }
  function translate(record: ContentRecord) {
    // Same slug in the other language so the public site can pair them; fields start from the source copy.
    const other = locale === "en" ? "bn" : "en"
    setLocale(other)
    setPage(1)
    setEditing({ slug: record.slug, sort_order: record.sort_order, data: { ...record.data } })
    setActionError("")
    setNotice(`Translating into ${other === "bn" ? "বাংলা" : "English"}. Replace the copied text, then save.`)
    markDirty(true)
  }
  function duplicate(record: ContentRecord) {''')
s=s.replace('''                              <button disabled={busy} onClick={() => duplicate(record)}>Duplicate</button>
                            </>
                          )}''','''                              <button disabled={busy} onClick={() => duplicate(record)}>Duplicate</button>
                              {twins[record.id] === undefined ? (
                                <button disabled={busy} onClick={() => checkTranslation(record)}>{locale === "en" ? "বাংলা" : "English"} version</button>
                              ) : twins[record.id].record ? (
                                <button disabled={busy} onClick={() => { setLocale(twins[record.id].locale); setPage(1) }}>Open {twins[record.id].locale === "bn" ? "বাংলা" : "English"} ({twins[record.id].record!.status})</button>
                              ) : (
                                <button disabled={busy} onClick={() => translate(record)}>Create {twins[record.id].locale === "bn" ? "বাংলা" : "English"} version</button>
                              )}
                            </>
                          )}''')
open(p,'w').write(s)
print('fe4 ok')
