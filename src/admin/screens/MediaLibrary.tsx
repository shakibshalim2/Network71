import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { api, type ContentRecord, type Module, type Page, type User } from '../api'
import { Empty, ErrorNotice, Icon, Loading } from '../Admin'
import { useResource, ResourceError, Pager, time, type DashboardData, type MediaItem, type Inquiry } from './shared'
export function MediaLibrary({ user }: { user: User }) {
  const [page, setPage] = useState(1)
  const { data, error, loading, reload } = useResource<Page<MediaItem>>(
    `admin/media?page=${page}`,
  )
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState("")
  const [notice, setNotice] = useState("")
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
                      <h3>{item.alt}</h3>{user.role === "owner" && <button className="adm-button secondary" disabled={busy} onClick={() => archive(item.id)}>Archive image</button>}
                      <p>
                        {item.width} × {item.height} ·{" "}
                        {Math.round(item.bytes / 1024)} KB
                      </p>
                      <label>
                        Image URL
                        <input
                          readOnly
                          value={`/api/v1/media/${item.filename}`}
                          onFocus={(event) => event.target.select()}
                        />
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <Empty title="Your image library starts here">
                Upload real company, team and project photos approved for public
                use.
              </Empty>
            )}
            <Pager {...data} change={setPage} />
          </>
        )
      )}
    </>
  )
}
