import { useEffect, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import {
  api,
  type ContentRecord,
  type Module,
  type Page,
  type User,
} from "./api"
import { Empty, ErrorNotice, Icon, Loading } from "./Admin"

function useResource<T>(path: string) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [revision, setRevision] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError("")
    api<T>(path, { signal: controller.signal })
      .then(setData)
      .catch((error) => {
        if (!controller.signal.aborted) setError(error.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [path, revision])
  return {
    data,
    error,
    loading,
    reload: () => setRevision((value) => value + 1),
  }
}

function ResourceError({ error, retry }: { error: string; retry: () => void }) {
  return error ? (
    <>
      <ErrorNotice message={error} />
      <button className="adm-button secondary" onClick={retry}>
        Try again
      </button>
    </>
  ) : null
}
function Pager({
  page,
  pages,
  total,
  change,
}: {
  page: number
  pages: number
  total: number
  change: (page: number) => void
}) {
  return (
    <div className="adm-pagination">
      <span>
        {total} items · Page {page} of {pages}
      </span>
      <div>
        <button disabled={page <= 1} onClick={() => change(page - 1)}>
          Previous
        </button>
        <button disabled={page >= pages} onClick={() => change(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}
function time(value: string) {
  return new Date(value.replace(" ", "T") + "Z").toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

type DashboardData = {
  total: number
  published: number
  drafts: number
  inquiries: number
  activity: {
    id: number
    action: string
    entity: string
    name: string
    created_at: string
  }[]
}
export function Dashboard() {
  const { data, error, loading, reload } =
    useResource<DashboardData>("admin/dashboard")
  if (loading) return <Loading />
  if (!data || error) return <ResourceError error={error} retry={reload} />
  return (
    <>
      <section className="adm-welcome">
        <div>
          <span className="adm-eyebrow">YOUR WEBSITE, IN ONE PLACE</span>
          <h2>
            Good work deserves
            <br />a clear story.
          </h2>
          <p>
            Keep your content current and turn completed work into your next
            conversation.
          </p>
          <Link className="adm-button" to="/admin/projects">
            <Icon name="plus" size={17} /> Manage projects
          </Link>
        </div>
        <div className="adm-welcome-art" aria-hidden="true">
          <div className="adm-art-orbit" />
          <div className="adm-art-card">
            <span>NETWORK71</span>
            <Icon name="check" size={38} />
            <strong>Ready for your next update.</strong>
          </div>
        </div>
      </section>
      <div className="adm-stat-grid">
        {[
          {
            label: "Content items",
            value: data.total,
            icon: "content",
            to: "content",
          },
          {
            label: "Published",
            value: data.published,
            icon: "check",
            to: "content",
          },
          {
            label: "Drafts & changes",
            value: data.drafts,
            icon: "projects",
            to: "content",
          },
          {
            label: "New enquiries",
            value: data.inquiries,
            icon: "inbox",
            to: "inquiries",
          },
        ].map((item) => (
          <Link className="adm-stat" key={item.label} to={`/admin/${item.to}`}>
            <span>
              {item.label}
              <Icon name={item.icon} />
            </span>
            <strong>{item.value}</strong>
            <small>
              Open workspace <Icon name="arrow" size={14} />
            </small>
          </Link>
        ))}
      </div>
      <div className="adm-dashboard-grid">
        <section className="adm-panel">
          <div className="adm-panel-heading">
            <h2>Recent activity</h2>
            <span className="adm-tag">Live workspace</span>
          </div>
          {data.activity.length ? (
            <ul className="adm-activity">
              {data.activity.map((item) => (
                <li key={item.id}>
                  <span className="adm-activity-dot" />
                  <div>
                    <strong>
                      {item.action.replace(/_/g, " ")} · {item.entity}
                    </strong>
                    <small>
                      {item.name || "System"} · {time(item.created_at)}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty title="A fresh start">
              Saved changes and publishing activity will appear here.
            </Empty>
          )}
        </section>
        <section className="adm-panel adm-next">
          <span className="adm-eyebrow">BUILD YOUR WEBSITE</span>
          <h2>Start with what matters.</h2>
          <Link to="/admin/pages">
            <span>01</span>
            <div>
              <strong>Website pages</strong>
              <small>Organise your story and page copy.</small>
            </div>
            <Icon name="arrow" />
          </Link>
          <Link to="/admin/media">
            <span>02</span>
            <div>
              <strong>Real images</strong>
              <small>Add photos approved for public use.</small>
            </div>
            <Icon name="arrow" />
          </Link>
          <Link to="/admin/inquiries">
            <span>03</span>
            <div>
              <strong>New conversations</strong>
              <small>Review messages from your website.</small>
            </div>
            <Icon name="arrow" />
          </Link>
        </section>
      </div>
      <div className="adm-notice">
        <strong>Content migration is in progress.</strong> Saved content is
        available through the CMS API. Existing public pages will use it as each
        page is connected; publishing here does not yet replace their current
        copy.
      </div>
    </>
  )
}

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
  const { data, loading, error, reload } = useResource<Page<ContentRecord>>(
    `admin/content/${moduleKey}?page=${page}&q=${encodeURIComponent(search)}`,
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
        { method: editing.id ? "PUT" : "POST", body: JSON.stringify(editing) },
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
          <div className="adm-toolbar">
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

type MediaItem = {
  id: number
  filename: string
  alt: string
  width: number
  height: number
  bytes: number
}
export function MediaLibrary() {
  const [page, setPage] = useState(1)
  const { data, error, loading, reload } = useResource<Page<MediaItem>>(
    `admin/media?page=${page}`,
  )
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState("")
  const [notice, setNotice] = useState("")
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
        Approved public images, ready to use across your website.
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
                      <h3>{item.alt}</h3>
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

type Inquiry = {
  id: number
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  reference: string
  status: string
  created_at: string
  source: string
}
export function Inbox() {
  const [page, setPage] = useState(1)
  const { data, error, loading, reload } = useResource<Page<Inquiry>>(
    `admin/inquiries?page=${page}`,
  )
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState("")
  async function update(id: number, status: string) {
    setBusy(true)
    setActionError("")
    try {
      await api(`admin/inquiries/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      })
      reload()
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <p className="adm-intro">
        Keep track of incoming conversations and their follow-up status.
      </p>
      <ErrorNotice message={actionError} />
      <ResourceError error={error} retry={reload} />
      {loading ? (
        <Loading />
      ) : (
        !error &&
        data && (
          <>
            {data.items.length ? (
              <div className="adm-inquiries">
                {data.items.map((item) => (
                  <article className="adm-panel adm-inquiry" key={item.id}>
                    <div className="adm-panel-heading">
                      <div>
                        <span className="adm-eyebrow">
                          {item.reference} · {time(item.created_at)}
                        </span>
                        <h2>{item.subject}</h2>
                      </div>
                      <span className="adm-tag">
                        {item.status.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="adm-message">{item.message}</p>
                    <dl>
                      <div>
                        <dt>From</dt>
                        <dd>
                          {item.name}
                          {item.company ? ` · ${item.company}` : ""}
                        </dd>
                      </div>
                      <div>
                        <dt>Email</dt>
                        <dd>
                          <a href={`mailto:${item.email}`}>{item.email}</a>
                        </dd>
                      </div>
                      {item.phone && (
                        <div>
                          <dt>Phone</dt>
                          <dd>{item.phone}</dd>
                        </div>
                      )}
                      {item.source && (
                        <div>
                          <dt>Source page</dt>
                          <dd>{item.source}</dd>
                        </div>
                      )}
                    </dl>
                    <label>
                      Status
                      <select
                        disabled={busy}
                        value={item.status}
                        onChange={(event) =>
                          update(item.id, event.target.value)
                        }
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In progress</option>
                        <option value="closed">Closed</option>
                      </select>
                    </label>
                  </article>
                ))}
              </div>
            ) : (
              <Empty title="No enquiries yet">
                Messages submitted to the website enquiry API will appear here.
              </Empty>
            )}
            <Pager {...data} change={setPage} />
          </>
        )
      )}
    </>
  )
}

export function Users({ user }: { user: User }) {
  const { data, error, loading, reload } = useResource<{ items: User[] }>(
    user.role === "owner" ? "admin/users" : "auth/session",
  )
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState("")
  const [notice, setNotice] = useState("")
  if (user.role !== "owner")
    return (
      <Empty title="Owner access required">
        Only website owners can manage accounts.
      </Empty>
    )
  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setBusy(true)
    setActionError("")
    setNotice("")
    try {
      await api("admin/users", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      form.reset()
      reload()
      setNotice(
        "Account created. Share its credentials privately with the team member.",
      )
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusy(false)
    }
  }
  async function toggle(account: User) {
    if (
      !window.confirm(
        `${
          Number(account.active) ? "Deactivate" : "Activate"
        } access for ${account.name}?`,
      )
    )
      return
    setBusy(true)
    setActionError("")
    try {
      await api(`admin/users/${account.id}`, {
        method: "PATCH",
        body: JSON.stringify({ active: !Number(account.active) }),
      })
      reload()
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <p className="adm-intro">
        Owners publish content and manage access. Editors prepare content
        drafts.
      </p>
      <ErrorNotice message={actionError} />
      {notice && (
        <div className="adm-success" role="status">
          {notice}
        </div>
      )}
      <form className="adm-panel adm-editor" onSubmit={create}>
        <h2>Create an account</h2>
        <div className="adm-form-grid">
          <label>
            Full name
            <input name="name" maxLength={120} required autoComplete="off" />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              maxLength={190}
              required
              autoComplete="off"
            />
          </label>
          <label>
            Initial password
            <input
              name="password"
              type="password"
              minLength={12}
              maxLength={72}
              required
              autoComplete="new-password"
            />
            <small>At least 12 characters. Share privately.</small>
          </label>
          <label>
            Access role
            <select name="role">
              <option value="editor">Editor</option>
              <option value="owner">Owner</option>
            </select>
          </label>
        </div>
        <button className="adm-button" disabled={busy}>
          {busy ? "Saving…" : "Create account"}
        </button>
      </form>
      <ResourceError error={error} retry={reload} />
      {loading ? (
        <Loading />
      ) : (
        !error &&
        data && (
          <div className="adm-records">
            {data.items.map((account) => (
              <article className="adm-record" key={account.id}>
                <span className="adm-avatar">{account.name.slice(0, 1)}</span>
                <div className="adm-record-info">
                  <h3>
                    {account.name}
                    {Number(account.id) === Number(user.id) ? " (you)" : ""}
                  </h3>
                  <p>{account.email}</p>
                </div>
                <span className="adm-tag">
                  {account.role} ·{" "}
                  {Number(account.active) ? "active" : "inactive"}
                </span>
                {Number(account.id) !== Number(user.id) && (
                  <div className="adm-record-actions">
                    <button disabled={busy} onClick={() => toggle(account)}>
                      {Number(account.active) ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )
      )}
    </>
  )
}
