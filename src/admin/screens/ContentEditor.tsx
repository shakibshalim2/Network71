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
        <form className="adm-panel adm-editor" onSubmit={save}>
          <div className="adm-panel-heading">
            <div>
              <span className="adm-eyebrow">
                {editing.id ? "EDIT DRAFT" : "CREATE CONTENT"}
              </span>
              <h2>
                {editing.id
                  ? String(editing.data?.title)
                  : `New ${module.label.toLowerCase()} item`}
              </h2>
            </div>
            <button
              className="adm-button secondary"
              type="button"
              disabled={busy}
              onClick={close}
            >
              Cancel
            </button>
          </div>
          <div className="adm-form-grid">
            <label>
              URL slug
              <input
                autoFocus
                required
                maxLength={160}
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                value={editing.slug || ""}
                onChange={(event) => {
                  setEditing({ ...editing, slug: event.target.value })
                  markDirty(true)
                }}
              />
              <small>Lowercase words separated by hyphens.</small>
            </label>
            <label>
              Display order
              <input
                type="number"
                min={-100000}
                max={100000}
                value={editing.sort_order ?? 0}
                onChange={(event) => {
                  setEditing({
                    ...editing,
                    sort_order: Number(event.target.value),
                  })
                  markDirty(true)
                }}
              />
              <small>Lower numbers appear first.</small>
            </label>
            {module.fields.map((field) => {
              const value = editing.data?.[field.key] ?? ""
              const update = (value: string | boolean) => {
                setEditing({
                  ...editing,
                  data: { ...editing.data, [field.key]: value },
                })
                markDirty(true)
              }
              return (
                <label
                  key={field.key}
                  className={
                    field.type === "textarea" || field.type === "checkbox"
                      ? "adm-full"
                      : ""
                  }
                >
                  {field.type !== "checkbox" && (
                    <span>
                      {field.label}
                      {field.required ? " *" : ""}
                    </span>
                  )}
                  {field.type === "textarea" ? (
                    <textarea
                      rows={field.key === "body" ? 9 : 4}
                      maxLength={20000}
                      value={String(value)}
                      onChange={(event) => update(event.target.value)}
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={String(value)}
                      onChange={(event) => update(event.target.value)}
                    >
                      {field.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <span className="adm-check">
                      <input
                        type="checkbox"
                        checked={value === true}
                        onChange={(event) => update(event.target.checked)}
                      />
                      {field.label}
                    </span>
                  ) : (
                    <input
                      required={field.key === "title"}
                      type={
                        ["email", "url", "date"].includes(field.type)
                          ? field.type
                          : "text"
                      }
                      maxLength={1000}
                      value={String(value)}
                      onChange={(event) => update(event.target.value)}
                    />
                  )}
                  {field.type === "image" && (
                    <small>
                      Upload an image in Media library, then paste its image URL
                      here.
                    </small>
                  )}
                </label>
              )
            })}
          </div>
          <div className="adm-editor-actions">
            <span>
              {dirty
                ? "You have unsaved changes."
                : "Fields marked * are required to publish."}
            </span>
            <button className="adm-button" disabled={busy}>
              {busy ? "Saving…" : "Save draft"}
              <Icon name="check" size={18} />
            </button>
          </div>
        </form>
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
                          {record.status}
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
