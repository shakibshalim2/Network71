import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { api, type ContentRecord, type Module, type Page, type User } from '../api'
import { Empty, ErrorNotice, Icon, Loading } from '../Admin'
import { useResource, ResourceError, Pager, time, type DashboardData, type MediaItem, type Inquiry } from './shared'
export function MediaLibrary({ user }: { user: User }) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [draft, setDraft] = useState("")
  const { data, error, loading, reload } = useResource<Page<MediaItem>>(
    `admin/media?page=${page}${search ? `&q=${encodeURIComponent(search)}` : ""}`,
  )
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState("")
  const [notice, setNotice] = useState("")
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
  async function archive(id: number) {
    if (!window.confirm('Archive this unused image? Referenced images cannot be archived.')) return
    setBusy(true); setActionError('')
    try { await api('admin/media/'+id, {method:'DELETE'}); reload(); setNotice('Image archived.'); }
    catch(e) {setActionError((e as Error).message)} finally {setBusy(false)}
  }
  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setBusy(true)
    setActionError("")
    setNotice("")
    try {
      await api("admin/media", { method: "POST", body: new FormData(form) })
      form.reset()
      setPage(1)
      reload()
      setNotice("Image uploaded and optimised.")
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <p className="adm-intro">
        Approved public images, ready to use across your website. To replace an image, upload its replacement, copy the new URL into the relevant page or collection, then publish. Archive the old image after removing its draft and published references.
      </p>
      <ErrorNotice message={actionError} />
      {notice && (
        <div className="adm-success" role="status">
          {notice}
        </div>
      )}
      <form onSubmit={upload} className="adm-panel adm-upload">
        <div>
          <h2>Upload an image</h2>
          <p>JPEG, PNG or WebP · Up to 5 MB · No confidential documents</p>
        </div>
        <label>
          Image file
          <input
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
          />
        </label>
        <label>
          Describe this image
          <input
            name="alt"
            required
            maxLength={300}
            placeholder="A short, accurate image description"
          />
        </label>
        <label className="adm-check">
          <input type="checkbox" name="permission" value="yes" required />I have
          permission to use this image publicly.
        </label>
        <button className="adm-button" disabled={busy}>
          {busy ? "Uploading…" : "Upload image"}
          <Icon name="plus" size={18} />
        </button>
      </form>
      <form className="adm-search adm-media-search" role="search" onSubmit={(event) => { event.preventDefault(); setSearch(draft.trim()); setPage(1) }}>
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
              <div className="adm-media-grid">
                {data.items.map((item) => (
                  <article className="adm-media-card" key={item.id}>
                    <img
                      src={`/api/v1/media/${item.filename}`}
                      alt={item.alt}
                      loading="lazy"
                    />
                    <div>
                      <div className="adm-media-card-head">
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
                      </div>
                      <p>
                        {item.width} × {item.height} ·{" "}
                        {Math.round(item.bytes / 1024)} KB
                      </p>
                      <label>
                        Image URL
                        <span className="adm-copy-row">
                          <input
                            readOnly
                            value={`/api/v1/media/${item.filename}`}
                            onFocus={(event) => event.target.select()}
                          />
                          <button type="button" className="adm-button secondary" onClick={() => copyUrl(item.id, item.filename)}>{copied === item.id ? "Copied" : "Copy"}</button>
                        </span>
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              search ? (
                <Empty title="No matching images">Try another description or file name.</Empty>
              ) : (
              <Empty title="Your image library starts here">
                Upload real company, team and project photos approved for public
                use.
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
