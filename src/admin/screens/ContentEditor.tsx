import CollectionForm from "./CollectionForm"
import { useEffect, useState, type FormEvent } from 'react'
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
  const { data, loading, error, reload } = useResource<Page<ContentRecord>>(
    `admin/content/${moduleKey}?locale=${locale}&page=${page}&q=${encodeURIComponent(search)}`,
  )
  const [editing, setEditing] = useState<Partial<ContentRecord> | null>(null)
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState("")
  const [notice, setNotice] = useState("")
  const [history, setHistory] = useState<{ recordId: number; items: { id: number; version: number; event: string; created_at: string; author_name: string }[] } | null>(null)
  const writable =
    user.role === "owner" || !["settings", "navigation"].includes(moduleKey)
  const markDirty = (value: boolean) => {
    setDirty(value)
    onDirty(value)
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
  async function save(event: FormEvent) {
    event.preventDefault()
    if (!editing) return
    setBusy(true)
    setActionError("")
    setNotice("")
    try {
      await api(
        `admin/content/${moduleKey}${editing.id ? "/" + editing.id : ""}`,
        { method: editing.id ? "PUT" : "POST", body: JSON.stringify({ ...editing, locale }) },
      )
      setEditing(null)
      markDirty(false)
      setNotice("Draft saved. Publish it when you are ready.")
      reload()
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusy(false)
    }
  }
  async function transition(record: ContentRecord, action: string) {
    if (
      !window.confirm(
        `${
          action === "publish"
            ? "Publish the saved draft of"
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
        <CollectionForm editing={editing} module={module} busy={busy} dirty={dirty} save={save} close={close} setEditing={setEditing} markDirty={markDirty} />
      ) : (
        <>
          <div className="adm-toolbar"><label>Language<select aria-label="Collection language" value={locale} onChange={e => { setLocale(e.target.value); setPage(1) }}><option value="en">English</option><option value="bn">বাংলা</option></select></label>
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
                        <span className={`adm-tag ${record.status}`}>
                          {record.review_requested_at ? "review requested" : record.status}
                        </span>
                        <div className="adm-record-actions">
                          {writable && (
                            <button
                              disabled={busy}
                              onClick={() => open(record)}
                            >
                              Edit
                            </button>
                          )}
                          <button disabled={busy} onClick={() => transition(record, "request_review")}>Request review</button>
                          <button disabled={busy} onClick={() => loadHistory(record)}>History</button>
                          {user.role === "owner" && (
                            <>
                              <button
                                disabled={busy}
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
                              <span key={revision.id}>v{revision.version} · {revision.event.replace(/_/g, " ")} · {revision.author_name} · {time(revision.created_at)}</span>
                            )) : <span>No recorded revisions yet.</span>}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <Empty
                    title={
                      search
                        ? "No matching content"
                        : `No ${module.label.toLowerCase()} yet`
                    }
                  >
                    {search
                      ? "Try another search term."
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
