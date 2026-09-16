# ---- ContentEditor: status filter + duplicate
p='src/admin/screens/ContentEditor.tsx'; s=open(p).read()
s=s.replace('''  const [search, setSearch] = useState("")
  const [locale, setLocale] = useState("en")''','''  const [search, setSearch] = useState("")
  const [locale, setLocale] = useState("en")
  const [statusFilter, setStatusFilter] = useState("")''')
s=s.replace('''    `admin/content/${moduleKey}?locale=${locale}&page=${page}&q=${encodeURIComponent(search)}`,''','''    `admin/content/${moduleKey}?locale=${locale}&page=${page}&q=${encodeURIComponent(search)}${statusFilter ? `&status=${statusFilter}` : ""}`,''')
s=s.replace('''  function open(record?: ContentRecord) {
    setEditing(
      record
        ? { ...record, data: { ...record.data } }''','''  function duplicate(record: ContentRecord) {
    // New unsaved draft carrying the source data; slug is cleared so the server assigns a fresh one.
    setEditing({ slug: "", sort_order: record.sort_order, data: { ...record.data, title: `${String(record.data.title ?? "")} (copy)` } })
    setActionError("")
    setNotice("Duplicated as a new draft. Give it a slug and save.")
    markDirty(true)
  }
  function open(record?: ContentRecord) {
    setEditing(
      record
        ? { ...record, data: { ...record.data } }''')
s=s.replace('''<option value="en">English</option><option value="bn">বাংলা</option></select></label>''','''<option value="en">English</option><option value="bn">বাংলা</option></select></label>
            <label>Status<select aria-label="Filter by status" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}><option value="">All</option><option value="draft">Draft</option><option value="in_review">In review</option><option value="approved">Approved</option><option value="published">Published</option><option value="changes">Published · unpublished changes</option><option value="archived">Archived</option></select></label>''')
s=s.replace('''                          {writable && (
                            <button
                              disabled={busy}
                              onClick={() => open(record)}
                            >
                              Edit
                            </button>
                          )}''','''                          {writable && (
                            <>
                              <button
                                disabled={busy}
                                onClick={() => open(record)}
                              >
                                Edit
                              </button>
                              <button disabled={busy} onClick={() => duplicate(record)}>Duplicate</button>
                            </>
                          )}''')
s=s.replace('''                    title={
                      search
                        ? "No matching content"
                        : `No ${module.label.toLowerCase()} yet`
                    }
                  >
                    {search
                      ? "Try another search term."''','''                    title={
                      search || statusFilter
                        ? "No matching content"
                        : `No ${module.label.toLowerCase()} yet`
                    }
                  >
                    {search || statusFilter
                      ? "Try another search term or status."''')
open(p,'w').write(s)

# ---- MediaLibrary: edit alt, copy URL, search-free but sortable size shown
p='src/admin/screens/MediaLibrary.tsx'; s=open(p).read()
s=s.replace('''  const [notice, setNotice] = useState("")
  async function archive(id: number) {''','''  const [notice, setNotice] = useState("")
  const [editingAlt, setEditingAlt] = useState<{ id: number; alt: string } | null>(null)
  const [copied, setCopied] = useState<number | null>(null)
  function copyUrl(id: number, filename: string) {
    void navigator.clipboard?.writeText(`${window.location.origin}/api/v1/media/${filename}`).then(() => { setCopied(id); window.setTimeout(() => setCopied(null), 1600) })
  }
  async function saveAlt(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!editingAlt) return
    setBusy(true); setActionError('')
    try { await api('admin/media/'+editingAlt.id, {method:'PATCH', body: JSON.stringify({ alt: editingAlt.alt })}); setEditingAlt(null); reload(); setNotice('Image description updated.') }
    catch(e) {setActionError((e as Error).message)} finally {setBusy(false)}
  }
  async function archive(id: number) {''')
s=s.replace('''                      <div className="adm-media-card-head">
                        <h3>{item.alt}</h3>
                        {user.role === "owner" && <button className="adm-button secondary" disabled={busy} onClick={() => archive(item.id)}>Archive</button>}
                      </div>''','''                      <div className="adm-media-card-head">
                        {editingAlt?.id === item.id ? (
                          <form className="adm-alt-form" onSubmit={saveAlt}>
                            <input aria-label="Image description" value={editingAlt.alt} maxLength={300} required autoFocus onChange={(event) => setEditingAlt({ id: item.id, alt: event.target.value })} />
                            <button className="adm-button" disabled={busy}>Save</button>
                            <button type="button" className="adm-button secondary" onClick={() => setEditingAlt(null)}>Cancel</button>
                          </form>
                        ) : (
                          <>
                            <h3>{item.alt}</h3>
                            <div className="adm-media-actions">
                              <button className="adm-button secondary" disabled={busy} onClick={() => setEditingAlt({ id: item.id, alt: item.alt })}>Edit description</button>
                              {user.role === "owner" && <button className="adm-button secondary" disabled={busy} onClick={() => archive(item.id)}>Archive</button>}
                            </div>
                          </>
                        )}
                      </div>''')
s=s.replace('''                      <label>
                        Image URL
                        <input
                          readOnly
                          value={`/api/v1/media/${item.filename}`}
                          onFocus={(event) => event.target.select()}
                        />
                      </label>''','''                      <label>
                        Image URL
                        <span className="adm-copy-row">
                          <input
                            readOnly
                            value={`/api/v1/media/${item.filename}`}
                            onFocus={(event) => event.target.select()}
                          />
                          <button type="button" className="adm-button secondary" onClick={() => copyUrl(item.id, item.filename)}>{copied === item.id ? "Copied" : "Copy"}</button>
                        </span>
                      </label>''')
open(p,'w').write(s)
print('fe2 ok')
