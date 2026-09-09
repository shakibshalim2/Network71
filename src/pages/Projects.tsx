import { useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { WorkCard, WorkImage, WorkingTogether } from "@/components/WorkShowcase"
import {
  safeContentUrl,
  textField,
  usePublicContent,
  type PublishedItem,
  type PublishedPage,
} from "@/lib/publicContent"

export default function Projects() {
  const { slug } = useParams()
  return slug ? <ProjectDetail key={slug} slug={slug} /> : <ProjectList />
}

function ProjectList() {
  const [params, setParams] = useSearchParams()
  const page = Math.min(
    10000,
    Math.max(1, Math.floor(Number(params.get("page")) || 1)),
  )
  const query = params.get("q") || ""
  const [input, setInput] = useState(query)
  useEffect(() => setInput(query), [query])
  const { data, loading, error, retry } = usePublicContent<PublishedPage>(
    `projects?page=${page}&q=${encodeURIComponent(query)}`,
  )
  const items = (data?.items || []).filter(
    (item) => item.data.permission === true,
  )
  return (
    <div className="public-work-page">
      <Header />
      <main className="public-content">
        <section className="work-page-hero">
          <div className="container-page">
            <nav className="public-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Our work</span>
            </nav>
            <span className="public-eyebrow">PROJECTS & CASE STUDIES</span>
            <h1>
              Our work,
              <br />
              <em>in detail.</em>
            </h1>
            <p>
              Understand the brief, the role we played and what was delivered.
              Each project has its own story.
            </p>
          </div>
        </section>
        <section className="section-y">
          <div className="container-page">
            <div className="work-list-toolbar">
              <h2>Explore our projects</h2>
              <form
                role="search"
                onSubmit={(event) => {
                  event.preventDefault()
                  setParams(input.trim() ? { q: input.trim() } : {})
                }}
              >
                <label className="sr-only" htmlFor="project-search">
                  Search projects
                </label>
                <input
                  id="project-search"
                  type="search"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Search by project or service"
                  maxLength={150}
                />
                <button className="public-button">Search</button>
              </form>
            </div>
            {loading ? (
              <div className="public-empty" role="status">
                Loading projects…
              </div>
            ) : error ? (
              <div className="public-empty" role="alert">
                <h3>Projects could not be loaded</h3>
                <p>{error}</p>
                <button className="public-button" onClick={retry}>
                  Try again
                </button>
              </div>
            ) : items.length ? (
              <>
                <div className="work-grid">
                  {items.map((item) => (
                    <WorkCard key={item.id} item={item} />
                  ))}
                </div>
                <nav className="work-pagination" aria-label="Project pages">
                  <button
                    disabled={page <= 1}
                    onClick={() =>
                      setParams({ q: query, page: String(page - 1) })
                    }
                  >
                    Previous
                  </button>
                  <span>
                    Page {data?.page} of {data?.pages}
                  </span>
                  <button
                    disabled={page >= (data?.pages || 1)}
                    onClick={() =>
                      setParams({ q: query, page: String(page + 1) })
                    }
                  >
                    Next
                  </button>
                </nav>
              </>
            ) : (
              <div className="public-empty">
                <span className="public-eyebrow">
                  {query ? "SEARCH RESULTS" : "PROJECT STORIES"}
                </span>
                <h3>
                  {query
                    ? "No matching projects"
                    : "Project stories are being prepared."}
                </h3>
                <p>
                  {query
                    ? "Try another keyword or clear your search."
                    : "Public case studies will appear here as they are approved for sharing. For now, speak with our team about experience relevant to your requirements."}
                </p>
                {query ? (
                  <button
                    className="public-button"
                    onClick={() => {
                      setInput("")
                      setParams({})
                    }}
                  >
                    Clear search
                  </button>
                ) : (
                  <Link className="public-button" to="/contact">
                    Talk about your requirements ↗
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
        <WorkingTogether />
      </main>
      <Footer />
    </div>
  )
}

function ProjectDetail({ slug }: { slug: string }) {
  const {
    data: item,
    loading,
    error,
    notFound,
    retry,
  } = usePublicContent<PublishedItem>(`projects/${encodeURIComponent(slug)}`)
  const permitted = item?.data.permission === true
  useEffect(() => {
    if (!item || !permitted) return
    document.title =
      textField(item, "seo_title") || `${textField(item, "title")} | Network71`
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    if (description)
      description.content =
        textField(item, "seo_description") ||
        textField(item, "summary") ||
        textField(item, "role")
    document
      .querySelector<HTMLMetaElement>('meta[name="robots"]')
      ?.setAttribute("content", "index, follow")
  }, [item, permitted])
  return (
    <div className="public-work-page">
      <Header />
      <main className="public-content">
        {loading ? (
          <section className="work-page-hero">
            <div className="container-page" role="status">
              <h1>Loading project…</h1>
            </div>
          </section>
        ) : error ? (
          <section className="work-page-hero">
            <div className="container-page">
              <h1>Unable to load this project</h1>
              <p role="alert">{error}</p>
              <button className="public-button" onClick={retry}>
                Try again
              </button>
            </div>
          </section>
        ) : notFound || !item || !permitted ? (
          <section className="work-page-hero">
            <div className="container-page">
              <span className="public-eyebrow">PROJECT UNAVAILABLE</span>
              <h1>This project is not available.</h1>
              <p>It may not be published or its link may have changed.</p>
              <Link className="public-button" to="/projects">
                Browse projects
              </Link>
            </div>
          </section>
        ) : (
          <>
            <section className="work-page-hero">
              <div className="container-page">
                <nav className="public-breadcrumb" aria-label="Breadcrumb">
                  <Link to="/">Home</Link>
                  <span aria-hidden="true">/</span>
                  <Link to="/projects">Our work</Link>
                </nav>
                <span className="public-eyebrow">
                  {textField(item, "type")} / {textField(item, "work_status")}
                </span>
                <h1>{textField(item, "title")}</h1>
                {textField(item, "summary") && (
                  <p>{textField(item, "summary")}</p>
                )}
                <dl className="work-facts">
                  {[
                    ["Client", "client"],
                    ["Division", "division"],
                    ["Year", "year"],
                  ].map(([label, key]) =>
                    textField(item, key) ? (
                      <div key={key}>
                        <dt>{label}</dt>
                        <dd>{textField(item, key)}</dd>
                      </div>
                    ) : null,
                  )}
                </dl>
              </div>
            </section>
            <section className="section-y">
              <div className="container-page">
                <div className="work-detail-image">
                  <WorkImage
                    src={textField(item, "image")}
                    alt={textField(item, "title")}
                  />
                </div>
                <div className="work-story">
                  {[
                    ["The challenge", "challenge"],
                    ["Our role & deliverables", "role"],
                    ["The outcome", "results"],
                  ].map(([title, key], index) =>
                    textField(item, key) ? (
                      <section key={key}>
                        <div>
                          <span className="public-eyebrow">0{index + 1}</span>
                          <h2>{title}</h2>
                        </div>
                        <p>{textField(item, key)}</p>
                      </section>
                    ) : null,
                  )}
                </div>
                {safeContentUrl(textField(item, "url")) && (
                  <a
                    className="public-button"
                    href={safeContentUrl(textField(item, "url"))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit project website ↗
                  </a>
                )}
              </div>
            </section>
            <section className="section-y work-enquiry">
              <div className="container-page">
                <span className="public-eyebrow">YOUR NEXT PROJECT</span>
                <h2>
                  Have something
                  <br />
                  <em>similar in mind?</em>
                </h2>
                <p>
                  Tell us about your requirements and reference this project in
                  your brief.
                </p>
                <Link
                  className="public-button"
                  to={`/contact?project=${encodeURIComponent(textField(item, "title"))}`}
                >
                  Discuss a similar project ↗
                </Link>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
