import PageEditor from "./PageEditor"
import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"
import { Link, NavLink, useBlocker, useParams } from "react-router-dom"
import { api, setCsrf, type Modules, type User } from "./api"
import {
  Applications,
  ContentEditor,
  Dashboard,
  Inbox,
  MediaLibrary,
  Users,
} from "./screens"
import "./admin.css"

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const shapes: Record<string, ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v10H3Z" />
        <path d="M9 20v-7h6v7" />
      </>
    ),
    content: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    projects: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V3h8v4M3 12h18M10 12v3h4v-3" />
      </>
    ),
    inbox: (
      <>
        <path d="M4 4h16l2 12v4H2v-4Z" />
        <path d="M2 15h6l2 3h4l2-3h6" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
    media: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8" cy="8" r="1" />
        <path d="m3 17 5-5 4 4 4-6 5 7" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    logout: (
      <>
        <path d="M10 4H4v16h6M10 12h11m-4-4 4 4-4 4" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes[name] || shapes.content}
    </svg>
  )
}

export function ErrorNotice({ message }: { message: string }) {
  return message ? (
    <div className="adm-error" role="alert">
      {message}
    </div>
  ) : null
}
export function Empty({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="adm-empty">
      <Icon name="content" size={30} />
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}
export function Loading() {
  return (
    <div className="adm-loading" role="status">
      <span className="adm-spinner" /> Loading workspace…
    </div>
  )
}

function Login({
  onLogin,
  error: initialError,
  retry,
}: {
  onLogin: (user: User) => void
  error: string
  retry: () => void
}) {
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError("")
    const values = new FormData(event.currentTarget)
    try {
      const session = await api<{ csrf: string }>("auth/session")
      setCsrf(session.csrf)
      const result = await api<{ user: User; csrf: string }>("auth/login", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(values)),
      })
      setCsrf(result.csrf)
      onLogin(result.user)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <div className="adm-login">
      <div className="adm-login-story">
        <Link to="/" className="adm-wordmark">
          NETWORK<span>71</span>
          <small>WORKSPACE</small>
        </Link>
        <div>
          <span className="adm-eyebrow">ONE PLACE TO MANAGE YOUR WEBSITE</span>
          <h1>
            Your work.
            <br />
            Your story.
            <br />
            <em>All together.</em>
          </h1>
          <p>
            Publish meaningful updates, showcase the work you deliver, and stay
            close to every new enquiry.
          </p>
        </div>
        <span className="adm-login-note">
          Network71 · Website administration
        </span>
      </div>
      <div className="adm-login-form">
        <div className="adm-login-box">
          <span className="adm-eyebrow">WELCOME BACK</span>
          <h2>Sign in to your workspace</h2>
          <p>Use the account provided by your website owner.</p>
          <ErrorNotice message={error || initialError} />
          {initialError && (
            <button className="adm-button secondary" onClick={retry}>
              Retry connection
            </button>
          )}
          <form onSubmit={submit}>
            <label>
              Email address
              <input
                type="email"
                name="email"
                autoComplete="username"
                required
                placeholder="you@company.com"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
              />
            </label>
            <button className="adm-button" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
              <Icon name="arrow" />
            </button>
          </form>
          <p className="adm-help">
            Need access or a password reset? Contact your website owner.
          </p>
          <Link to="/" className="adm-text-link">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}

const primary = [
  { key: "", label: "Overview", icon: "home" },
  { key: "content", label: "Content", icon: "content" },
  { key: "projects", label: "Projects", icon: "projects" },
  { key: "inquiries", label: "Inbox", icon: "inbox" },
  { key: "applications", label: "Applications", icon: "inbox" },
]

export default function Admin() {
  const { section = "" } = useParams()
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="manifest"]')
    const previous = link?.getAttribute("href")
    link?.setAttribute("href", "/admin.webmanifest")
    return () => {
      if (previous) link?.setAttribute("href", previous)
    }
  }, [])
  const [user, setUser] = useState<User | null>(null)
  const [modules, setModules] = useState<Modules>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [dirty, setDirty] = useState(false)
  const blocker = useBlocker(dirty)
  useEffect(() => {
    if (blocker.state === "blocked") {
      if (window.confirm("Leave without saving your changes?"))
        blocker.proceed()
      else blocker.reset()
    }
  }, [blocker])
  const [authBusy, setAuthBusy] = useState(false)
  const connect = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const session = await api<{ user: User | null; csrf: string }>(
        "auth/session",
      )
      setUser(session.user)
      setCsrf(session.csrf)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    void connect()
  }, [connect])
  useEffect(() => {
    if (!user) return
    const controller = new AbortController()
    api<Modules>("admin/modules", { signal: controller.signal })
      .then(setModules)
      .catch((error) => {
        if (!controller.signal.aborted) setError(error.message)
      })
    return () => controller.abort()
  }, [user])
  useEffect(() => {
    function expire() {
      setUser(null)
      setError("Your session has ended. Please sign in again.")
      setDirty(false)
    }
    window.addEventListener("n71-session-expired", expire)
    return () => window.removeEventListener("n71-session-expired", expire)
  }, [])
  useEffect(() => {
    setDirty(false)
  }, [section])
  useEffect(() => {
    if (!dirty) return
    const beforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ""
    }
    window.addEventListener("beforeunload", beforeUnload)
    return () => window.removeEventListener("beforeunload", beforeUnload)
  }, [dirty])
  useEffect(() => {
    document.title = `${modules[section]?.label || "Workspace"} | Network71 Admin`
    const robots = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    )
    if (robots) robots.content = "noindex, nofollow"
  }, [section, modules])
  async function logout() {
    if (dirty && !window.confirm("Leave without saving your changes?")) return
    setAuthBusy(true)
    setError("")
    try {
      await api("auth/logout", { method: "POST" })
      setDirty(false)
      setUser(null)
      setModules({})
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setAuthBusy(false)
    }
  }
  const title =
    modules[section]?.label ||
    ({
      "": "Overview",
      content: "Website content",
      inquiries: "Inbox",
      applications: "Job applications",
      media: "Media library",
      users: "Team access",
      more: "Workspace tools",
    } as Record<string, string>)[section] ||
    "Page not found"
  const nav = (
    key: string,
    label: string,
    icon = "content",
    mobile = false,
  ) => {
    const moreSections = [
      "settings",
      "navigation",
      "credentials",
      "metrics",
      "media",
      "users",
    ]
    const parentActive =
      mobile &&
      ((key === "inquiries" && section === "applications") ||
        (key === "more" && moreSections.includes(section)) ||
        (key === "content" &&
          Boolean(modules[section]) &&
          section !== "projects" &&
          !moreSections.includes(section)))
    return (
      <NavLink
        key={key}
        end
        className={({ isActive }) => (isActive || parentActive ? "active" : "")}
        to={`/admin${key ? "/" + key : ""}`}
      >
        <Icon name={icon} />
        <span>{label}</span>
      </NavLink>
    )
  }
  return (
    <div className="admin-app">
      {loading ? (
        <Loading />
      ) : !user ? (
        <Login
          onLogin={(user) => {
            setUser(user)
            setError("")
          }}
          error={error}
          retry={connect}
        />
      ) : (
        <div className="adm-shell">
          <aside className="adm-sidebar">
            <Link className="adm-wordmark" to="/admin">
              NETWORK<span>71</span>
              <small>WORKSPACE</small>
            </Link>
            <div className="adm-workspace-label">
              <span className="adm-status-dot" /> Website workspace
            </div>
            <nav aria-label="Admin navigation">
              <span className="adm-nav-label">WORKSPACE</span>
              {primary.map((item) => nav(item.key, item.label, item.icon))}
              <span className="adm-nav-label">MANAGE WEBSITE</span>
              {Object.entries(modules)
                .filter(([key]) => key !== "projects")
                .map(([key, mod]) => nav(key, mod.label))}
              {nav("media", "Media library", "media")}
              {user.role === "owner" && nav("users", "Team access")}
            </nav>
            <div className="adm-sidebar-foot">
              <div className="adm-avatar">{user.name.slice(0, 1)}</div>
              <div>
                <strong>{user.name}</strong>
                <small>{user.role}</small>
              </div>
              <button
                aria-label="Sign out"
                onClick={logout}
                disabled={authBusy}
              >
                <Icon name="logout" />
              </button>
            </div>
          </aside>
          <div className="adm-main">
            <header className="adm-topbar">
              <div>
                <span className="adm-breadcrumb">
                  WORKSPACE / {title.toUpperCase()}
                </span>
                <span className="adm-mobile-brand">
                  NETWORK<b>71</b>
                </span>
              </div>
              <div className="adm-top-actions">
                <Link to="/" className="adm-website-link">
                  View website <Icon name="arrow" size={16} />
                </Link>
                <span className="adm-avatar" title={user.name}>
                  {user.name.slice(0, 1)}
                </span>
              </div>
            </header>
            <main className="adm-page">
              <div className="adm-page-heading">
                <div>
                  <span className="adm-eyebrow">NETWORK71 ADMINISTRATION</span>
                  <h1>{title}</h1>
                </div>
                <span className="adm-role">
                  {user.role === "owner" ? "Owner access" : "Editor access"}
                </span>
              </div>
              <ErrorNotice message={error} />
              {section === "pages" ? (
                <PageEditor user={user} onDirty={setDirty} />
              ) : section === "" ? (
                <Dashboard />
              ) : section === "content" || section === "more" ? (
                <>
                  <p className="adm-intro">
                    {section === "content"
                      ? "Choose a part of your website to manage."
                      : "Manage media, company information and workspace access."}
                  </p>
                  <div className="adm-module-grid">
                    {Object.entries(modules)
                      .filter(
                        ([key]) =>
                          section === "content" ||
                          [
                            "settings",
                            "navigation",
                            "credentials",
                            "metrics",
                          ].includes(key),
                      )
                      .map(([key, mod]) => (
                        <Link
                          key={key}
                          to={`/admin/${key}`}
                          className="adm-module-card"
                        >
                          <span className="adm-module-icon">
                            <Icon
                              name={key === "projects" ? "projects" : "content"}
                            />
                          </span>
                          <h3>{mod.label}</h3>
                          <p>{mod.description}</p>
                          <span className="adm-card-arrow">
                            <Icon name="arrow" />
                          </span>
                        </Link>
                      ))}
                    {section === "more" && (
                      <>
                        <Link className="adm-module-card" to="/admin/media">
                          <Icon name="media" />
                          <h3>Media library</h3>
                          <p>Upload and reuse approved public images.</p>
                        </Link>
                        {user.role === "owner" && (
                          <Link className="adm-module-card" to="/admin/users">
                            <Icon name="content" />
                            <h3>Team access</h3>
                            <p>Invite owners and editors, and manage access.</p>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                  {section === "more" && (
                    <button
                      className="adm-button secondary adm-signout"
                      onClick={logout}
                      disabled={authBusy}
                    >
                      <Icon name="logout" />
                      Sign out
                    </button>
                  )}
                </>
              ) : section === "media" ? (
                <MediaLibrary user={user} />
              ) : section === "inquiries" ? (
                <Inbox />
              ) : section === "applications" ? (
                <Applications />
              ) : section === "users" ? (
                <Users user={user} />
              ) : modules[section] ? (
                <ContentEditor
                  key={section}
                  moduleKey={section}
                  module={modules[section]}
                  user={user}
                  onDirty={setDirty}
                />
              ) : Object.keys(modules).length === 0 ? (
                <>
                  <Loading />
                  <button className="adm-button secondary" onClick={connect}>
                    Reconnect
                  </button>
                </>
              ) : (
                <Empty title="Page not found">
                  Choose a section from the workspace navigation.
                </Empty>
              )}
            </main>
            <footer className="adm-footer">
              Network71 Workspace <span>Make every update count.</span>
            </footer>
          </div>
          <nav className="adm-bottom-nav" aria-label="Mobile admin navigation">
            {nav("", "Home", "home", true)}
            {nav("content", "Content", "content", true)}
            {nav("projects", "Projects", "projects", true)}
            {nav("inquiries", "Inbox", "inbox", true)}
            {nav("more", "More", "more", true)}
          </nav>
        </div>
      )}
    </div>
  )
}
