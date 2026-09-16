import CollectionForm from "./CollectionForm"
import ProjectDocuments from "./ProjectDocuments"
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { api, type ContentRecord, type Module, type Page, type User } from '../api'
import { Empty, ErrorNotice, Icon, Loading } from '../Admin'
import { useResource, ResourceError, Pager, time, type DashboardData, type MediaItem, type Inquiry } from './shared'
export function ContentEditor({
  moduleKey,
  module,
  user,
  onDirty,
}: {
  moduleKey: string
  module: Module
  user: User
  onDirty: (dirty: boolean) => void
}) {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [search, setSearch] = useState("")
  const [locale, setLocale] = useState("en")
  const [statusFilter, setStatusFilter] = useState("")
  const { data, loading, error, reload } = useResource<Page<ContentRecord>>(
    `admin/content/${moduleKey}?locale=${locale}&page=${page}&q=${encodeURIComponent(search)}${statusFilter ? `&status=${statusFilter}` : ""}`,
  )
  const [editing, setEditing] = useState<Partial<ContentRecord> | null>(null)
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState("")
  const [notice, setNotice] = useState("")
  const editRevision = useRef(0)
  const blockedAutosave = useRef(-1)
  type Revision = { id: number; version: number; event: string; created_at: string; author_name: string }
  const [history, setHistory] = useState<{ recordId: number; items: Revision[] } | null>(null)
  const [revisionPreview, setRevisionPreview] = useState<(Revision & { recordId: number; snapshot: Record<string, string | boolean>; sort_order: number }) | null>(null)
  const writable =
    user.role === "owner" || !["settings", "navigation"].includes(moduleKey)
  const markDirty = (value: boolean) => {
    if (value) editRevision.current += 1
    setDirty(value)
    onDirty(value)
  }
  const [twins, setTwins] = useState<Record<number, { locale: string; record: { id: number; status: string; review_state: string } | null }>>({})
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
  function duplicate(record: ContentRecord) {
    // New unsaved draft carrying the source data; slug is cleared because slugs are unique per module.
    setEditing({ slug: "", sort_order: record.sort_order, data: { ...record.data, title: `${String(record.data.title ?? "")} (copy)` } })
    setActionError("")
    setNotice("Duplicated as a new draft. Give it a slug and save.")
    markDirty(true)
  }
  function open(record?: ContentRecord) {
    setEditing(
      record
        ? { ...record, data: { ...record.data } }
        : {
            slug: "",
            sort_order: 0,
            data: Object.fromEntries(
              module.fields.map((field) => [
                field.key,
                field.type === "checkbox"
                  ? false
                  : field.type === "select"
                    ? field.options[0]
                    : "",
              ]),
            ),
          },
    )
    setActionError("")
    setNotice("")
    markDirty(false)
  }
  function close() {
    if (!dirty || window.confirm("Discard unsaved changes?")) {
      setEditing(null)
      markDirty(false)
      setActionError("")
    }
  }
  async function persist(closeAfter: boolean, automatic = false) {
    if (!editing) return
    const capturedRevision = editRevision.current
    setBusy(true)
    setActionError("")
    setNotice("")
    try {
      const result = await api<{ id: number; version: number }>(
        `admin/content/${moduleKey}${editing.id ? "/" + editing.id : ""}`,
        { method: editing.id ? "PUT" : "POST", body: JSON.stringify({ ...editing, locale }) },
      )
      setEditing((current) => current ? { ...current, id: result.id, version: result.version, locale: locale as "en" | "bn" } : current)
      if (capturedRevision === editRevision.current) {
        if (closeAfter) setEditing(null)
        markDirty(false)
      }
      blockedAutosave.current = -1
      setNotice(automatic ? "Draft autosaved." : "Draft saved. Request review when it is ready.")
      reload()
    } catch (error) {
      if (automatic) blockedAutosave.current = capturedRevision
      setActionError((error as Error).message)
    } finally {
      setBusy(false)
    }
  }
  async function save(event: FormEvent) { event.preventDefault(); await persist(true) }
  useEffect(() => {
    const title=editing?.data?.title
    if(!dirty||busy||!editing?.slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(editing.slug)||typeof title!=="string"||!title.trim()||blockedAutosave.current===editRevision.current)return
    const timer=window.setTimeout(()=>{void persist(false,true)},1500)
    return()=>window.clearTimeout(timer)
  },[dirty,busy,editing,locale])
  async function transition(record: ContentRecord, action: string) {
    if (
      !window.confirm(
        `${
          action === "publish"
            ? "Publish the saved draft of"
            : action === "approve"
              ? "Approve the reviewed draft of"
            : action === "request_review"
              ? "Request owner review for"
            : action === "archive"
              ? "Archive"
              : "Unpublish"
        } “${record.data.title}”?`,
      )
    )
      return
    setBusy(true)
    setActionError("")
    setNotice("")
    try {
      await api(`admin/content/${moduleKey}/${record.id}/state`, {
        method: "POST",
        body: JSON.stringify({ action, version: record.version }),
      })
      setNotice(
        `Content ${
          action === "publish"
            ? "published"
            : action === "approve"
              ? "approved"
            : action === "request_review"
              ? "submitted for review"
            : action === "archive"
              ? "archived"
              : "unpublished"
        }.`,
      )
      reload()
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusy(false)
    }
  }
  async function loadHistory(record: ContentRecord) {
    setActionError("")
    try {
      const result = await api<{ items: { id: number; version: number; event: string; created_at: string; author_name: string }[] }>(`admin/content/${moduleKey}/${record.id}/history`)
      setHistory({ recordId: record.id, items: result.items })
    } catch (error) { setActionError((error as Error).message) }
  }
  async function previewRevision(record: ContentRecord, revision: Revision) {
    setActionError("")
    try {
      const result = await api<Revision & { snapshot: Record<string, string | boolean>; sort_order: number }>(`admin/content/${moduleKey}/${record.id}/history/${revision.id}`)
      setRevisionPreview({ ...result, recordId: record.id })
    } catch (error) { setActionError((error as Error).message) }
  }
  async function restoreRevision(record: ContentRecord, revision: Revision) {
    if (!window.confirm(`Restore revision v${revision.version} as the current draft?`)) return
    setBusy(true);setActionError("")
    try {
      await api(`admin/content/${moduleKey}/${record.id}/restore`,{method:"POST",body:JSON.stringify({revision_id:revision.id,version:record.version})})
      setNotice("Revision restored as a new draft. Review is required before publishing.");setHistory(null);setRevisionPreview(null);reload()
    } catch(error){setActionError((error as Error).message)} finally {setBusy(false)}
  }
  return (
    <>
      <p className="adm-intro">{module.description}</p>
      <ErrorNotice message={actionError} />
      {notice && (
        <div className="adm-success" role="status">
          <Icon name="check" size={18} />
          {notice}
        </div>
      )}
      {editing ? (
        <><CollectionForm editing={editing} module={module} busy={busy} dirty={dirty} save={save} close={close} setEditing={setEditing} markDirty={markDirty} />{moduleKey === "projects" && editing.id && <ProjectDocuments projectId={editing.id} user={user} />}</>
      ) : (
        <>
          <div className="adm-toolbar"><label>Language<select aria-label="Collection language" value={locale} onChange={e => { setLocale(e.target.value); setPage(1) }}><option value="en">English</option><option value="bn">বাংলা</option></select></label>
            <label>Status<select aria-label="Filter by status" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}><option value="">All</option><option value="draft">Draft</option><option value="in_review">In review</option><option value="approved">Approved</option><option value="published">Published</option><option value="changes">Published · unpublished changes</option><option value="archived">Archived</option></select></label>
            <form
              className="adm-search"
              onSubmit={(event) => {
                event.preventDefault()
                setSearch(query)
                setPage(1)
              }}
            >
              <input
                aria-label={`Search ${module.label}`}
                placeholder={`Search ${module.label.toLowerCase()}…`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button className="adm-button secondary">Search</button>
            </form>
            {writable && (
              <button className="adm-button" onClick={() => open()}>
                <Icon name="plus" size={18} />
                Add new
              </button>
            )}
          </div>
          <ResourceError error={error} retry={reload} />
          {loading ? (
            <Loading />
          ) : (
            !error &&
            data && (
              <>
                {data.items.length ? (
                  <div className="adm-records">
                    {data.items.map((record) => (
                      <article key={record.id} className="adm-record">
                        <div className="adm-record-symbol">
                          <Icon
                            name={
                              moduleKey === "projects" ? "projects" : "content"
                            }
                          />
                        </div>
                        <div className="adm-record-info">
                          <h3>{String(record.data.title)}</h3>
                          <p>
                            /{record.slug} · Updated {time(record.updated_at)}
                          </p>
                        </div>
                        <span className={`adm-tag ${record.status} ${record.review_state}`}>
                          {record.review_state === "in_review" ? "in review" : record.review_state === "approved" ? "approved" : record.status}
                        </span>
                        <div className="adm-record-actions">
                          {writable && (
                            <>
                              <button
                                disabled={busy}
                                onClick={() => open(record)}
                              >
                                Edit
                              </button>
                              <button disabled={busy} onClick={() => duplicate(record)}>Duplicate</button>
                              {twins[record.id] === undefined ? (
                                <button disabled={busy} onClick={() => checkTranslation(record)}>{locale === "en" ? "বাংলা" : "English"} version</button>
                              ) : twins[record.id].record ? (
                                <button disabled={busy} onClick={() => { setLocale(twins[record.id].locale); setPage(1) }}>Open {twins[record.id].locale === "bn" ? "বাংলা" : "English"} ({twins[record.id].record!.status})</button>
                              ) : (
                                <button disabled={busy} onClick={() => translate(record)}>Create {twins[record.id].locale === "bn" ? "বাংলা" : "English"} version</button>
                              )}
                            </>
                          )}
                          <button disabled={busy || ["in_review", "approved"].includes(record.review_state)} onClick={() => transition(record, "request_review")}>Request review</button>
                          <button disabled={busy} onClick={() => loadHistory(record)}>History</button>
                          {user.role === "owner" && (
                            <>
                              <button disabled={busy || record.review_state !== "in_review"} onClick={() => transition(record, "approve")}>Approve</button>
                              <button
                                disabled={busy || record.review_state !== "approved"}
                                onClick={() => transition(record, "publish")}
                              >
                                {record.status === "published"
                                  ? "Publish changes"
                                  : "Publish"}
                              </button>
                              {record.status === "published" && (
                                <button
                                  disabled={busy}
                                  onClick={() =>
                                    transition(record, "unpublish")
                                  }
                                >
                                  Unpublish
                                </button>
                              )}
                              {record.status !== "archived" && (
                                <button
                                  disabled={busy}
                                  onClick={() => transition(record, "archive")}
                                >
                                  Archive
                                </button>
                              )}
                            </>
                          )}
                        </div>
                        {history?.recordId === record.id && (
                          <div className="adm-revision-list">
                            <strong>Revision history</strong>
                            {history.items.length ? history.items.map((revision) => (
                              <span key={revision.id}>v{revision.version} · {revision.event.replace(/_/g, " ")} · {revision.author_name} · {time(revision.created_at)} <button type="button" disabled={busy} onClick={() => previewRevision(record,revision)}>Preview</button>{writable && <button type="button" disabled={busy} onClick={() => restoreRevision(record,revision)}>Restore</button>}</span>
                            )) : <span>No recorded revisions yet.</span>}
                          </div>
                        )}
                        {revisionPreview?.recordId === record.id && <div className="adm-revision-preview"><strong>Revision v{revisionPreview.version}</strong><pre>{JSON.stringify(revisionPreview.snapshot,null,2)}</pre></div>}
                      </article>
                    ))}
                  </div>
                ) : (
                  <Empty
                    title={
                      search || statusFilter
                        ? "No matching content"
                        : `No ${module.label.toLowerCase()} yet`
                    }
                  >
                    {search || statusFilter
                      ? "Try another search term or status."
                      : "Add your first item as a draft. Only approved, published content is available publicly."}
                  </Empty>
                )}
                <Pager
                  page={data.page}
                  pages={data.pages}
                  total={data.total}
                  change={setPage}
                />
              </>
            )
          )}
        </>
      )}
    </>
  )
}
