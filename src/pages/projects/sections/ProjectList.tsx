import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { WorkCard, WorkingTogether } from "@/components/WorkShowcase"
import { usePublicContent, type PublishedPage } from "@/lib/publicContent"
import type { ProjectsContent } from "../content/en"
import ContentState from "@/components/ContentState"
import KineticText from "@/components/motion/KineticText"

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
        <section className="work-page-hero work-page-hero--sig">
          <span className="work-page-hero__mark font-display" aria-hidden="true">N71</span>
          <div className="container-page">
            <nav className="public-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">{c.breadcrumbHome}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{c.breadcrumbCurrent}</span>
            </nav>
            <span className="public-eyebrow work-page-hero__eyebrow"><span className="eyebrow-rule" />{c.eyebrow}</span>
            <h1 className="hero-kinetic">
              <KineticText text={c.titleLine1} delay={0.15} />
              <KineticText text={c.titleLine2} delay={0.3} as="em" />
            </h1>
            <p>
              {c.lead}
            </p>
          </div>
        </section>
        <section className="section-y">
          <div className="container-page">
            <div className="work-list-toolbar">
              <h2>
                {c.heading}
                {!loading && !error && items.length > 0 && (
                  <span className="work-list-toolbar__count font-display" aria-hidden="true">{String(data?.total ?? items.length).padStart(2, "0")}</span>
                )}
              </h2>
              <form
                role="search"
                className="work-search"
                onSubmit={(event) => {
                  event.preventDefault()
                  setParams(input.trim() ? { q: input.trim() } : {})
                }}
              >
                <label className="sr-only" htmlFor="project-search">
                  {c.searchLabel}
                </label>
                <span className="work-search__field">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M20 20l-3.5-3.5" /></svg>
                  <input
                    id="project-search"
                    type="search"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={c.searchPlaceholder}
                    maxLength={150}
                  />
                  <span className="work-search__line" aria-hidden="true" />
                </span>
                <button className="btn btn-primary btn-sm">{c.searchButton}</button>
              </form>
            </div>
            {loading ? (
              <ContentState kind="loading" eyebrow={c.emptyEyebrow} title={c.loading} />
            ) : error ? (
              <ContentState kind="error" eyebrow={c.emptyEyebrow} title={c.errorTitle} text={error} actionLabel={c.retry} onAction={retry} />
            ) : items.length ? (
              <>
                <div className="work-grid">
                  {items.map((item, i) => (
                    <WorkCard key={item.id} item={item} index={i + 1 + (page - 1) * items.length} />
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
                    className="btn btn-secondary"
                    onClick={() => {
                      setInput("")
                      setParams({})
                    }}
                  >
                    {c.clearSearch}
                  </button>
                ) : (
                  <Link className="btn btn-primary" to="/contact">
                    {c.talkCta}
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
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
