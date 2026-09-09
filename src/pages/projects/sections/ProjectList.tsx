import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { WorkCard, WorkingTogether } from "@/components/WorkShowcase"
import { usePublicContent, type PublishedPage } from "@/lib/publicContent"
import type { ProjectsContent } from "../content/en"

export default function ProjectList({ c }: { c: ProjectsContent["list"] }) {
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
              <Link to="/">{c.breadcrumbHome}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{c.breadcrumbCurrent}</span>
            </nav>
            <span className="public-eyebrow">{c.eyebrow}</span>
            <h1>
              {c.titleLine1}
              <br />
              <em>{c.titleLine2}</em>
            </h1>
            <p>
              {c.lead}
            </p>
          </div>
        </section>
        <section className="section-y">
          <div className="container-page">
            <div className="work-list-toolbar">
              <h2>{c.heading}</h2>
              <form
                role="search"
                onSubmit={(event) => {
                  event.preventDefault()
                  setParams(input.trim() ? { q: input.trim() } : {})
                }}
              >
                <label className="sr-only" htmlFor="project-search">
                  {c.searchLabel}
                </label>
                <input
                  id="project-search"
                  type="search"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={c.searchPlaceholder}
                  maxLength={150}
                />
                <button className="public-button">{c.searchButton}</button>
              </form>
            </div>
            {loading ? (
              <div className="public-empty" role="status">
                {c.loading}
              </div>
            ) : error ? (
              <div className="public-empty" role="alert">
                <h3>{c.errorTitle}</h3>
                <p>{error}</p>
                <button className="public-button" onClick={retry}>
                  {c.retry}
                </button>
              </div>
            ) : items.length ? (
              <>
                <div className="work-grid">
                  {items.map((item) => (
                    <WorkCard key={item.id} item={item} />
                  ))}
                </div>
                <nav className="work-pagination" aria-label={c.paginationAria}>
                  <button
                    disabled={page <= 1}
                    onClick={() =>
                      setParams({ q: query, page: String(page - 1) })
                    }
                  >
                    {c.previous}
                  </button>
                  <span>
                    {c.pageOf
                      .replace("{page}", String(data?.page))
                      .replace("{total}", String(data?.pages))}
                  </span>
                  <button
                    disabled={page >= (data?.pages || 1)}
                    onClick={() =>
                      setParams({ q: query, page: String(page + 1) })
                    }
                  >
                    {c.next}
                  </button>
                </nav>
              </>
            ) : (
              <div className="public-empty">
                <span className="public-eyebrow">
                  {query ? c.emptySearchEyebrow : c.emptyEyebrow}
                </span>
                <h3>
                  {query ? c.emptySearchTitle : c.emptyTitle}
                </h3>
                <p>
                  {query ? c.emptySearchText : c.emptyText}
                </p>
                {query ? (
                  <button
                    className="public-button"
                    onClick={() => {
                      setInput("")
                      setParams({})
                    }}
                  >
                    {c.clearSearch}
                  </button>
                ) : (
                  <Link className="public-button" to="/contact">
                    {c.talkCta}
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
