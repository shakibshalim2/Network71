import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { WorkCard, WorkingTogether } from "@/components/WorkShowcase"
import { usePublicContent, textField, type PublishedPage } from "@/lib/publicContent"
import { DIVISION_IDS, DIVISION_COLOR, divKey, useT } from "@/i18n"
import CountUp from "@/components/motion/CountUp"
import Magnetic from "@/components/motion/Magnetic"
import Tilt from "@/components/motion/Tilt"
import { motion } from "motion/react"
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
  const division = params.get("division") || ""
  const [input, setInput] = useState(query)
  const { t } = useT()
  useEffect(() => setInput(query), [query])
  const { data, loading, error, retry } = usePublicContent<PublishedPage>(
    `projects?page=${page}&q=${encodeURIComponent(query)}`,
  )
  const allItems = (data?.items || []).filter(
    (item) => item.data.permission === true,
  )
  const items = division
    ? allItems.filter((item) => textField(item, "division").toLowerCase().includes(division.toLowerCase()))
    : allItems
  const setFilter = (id: string) => {
    const next: Record<string, string> = {}
    if (query) next.q = query
    if (id) next.division = id
    setParams(next)
  }
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
            <motion.dl
              className="work-hero-facts"
              initial="hidden" animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.7 } } }}
            >
              {c.facts.map((f, i) => (
                <motion.div key={f.l} className="work-hero-facts__item" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                  <span className="work-hero-facts__idx font-mono">0{i + 1}</span>
                  <dd className="font-display"><CountUp value={f.v} /></dd>
                  <dt>{f.l}</dt>
                </motion.div>
              ))}
            </motion.dl>
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
            <div className="work-filter" role="group" aria-label={c.filterLabel}>
              <span className="work-filter__label font-mono">{c.filterLabel}</span>
              <div className="work-filter__chips">
                <button type="button" className={`work-chip${division ? "" : " is-on"}`} onClick={() => setFilter("")} style={{ ["--pa" as string]: "var(--brand-fg)" }}>
                  {c.filterAll}
                </button>
                {DIVISION_IDS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={`work-chip${division === id ? " is-on" : ""}`}
                    style={{ ["--pa" as string]: DIVISION_COLOR[id] }}
                    onClick={() => setFilter(division === id ? "" : id)}
                    aria-pressed={division === id}
                  >
                    <i aria-hidden="true" />{t(divKey(id, "short"))}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <ContentState kind="loading" eyebrow={c.emptyEyebrow} title={c.loading} />
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
            ) : query || division ? (
              <div className="public-empty">
                <span className="public-eyebrow">{c.emptySearchEyebrow}</span>
                <h3>{c.emptySearchTitle}</h3>
                <p>{c.emptySearchText}</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setInput("")
                    setParams({})
                  }}
                >
                  {query ? c.clearSearch : c.filterClear}
                </button>
              </div>
            ) : (
              <Tilt className="work-intro work-intro--page" max={3} perspective={1600}>
                <span className="work-intro-mark" aria-hidden="true">N71</span>
                <span className="work-intro-glow" aria-hidden="true" />
                <ol className="work-intro-steps" aria-hidden="true">
                  {(["step1", "step2", "step3"] as const).map((k, i) => (
                    <li key={k} style={{ ["--i" as string]: i }}>
                      <span className="work-intro-steps__idx">0{i + 1}</span>
                      <span className="work-intro-steps__label">{t(`work.intro.${k}`)}</span>
                    </li>
                  ))}
                </ol>
                <div className="work-intro-copy">
                  <span className="public-eyebrow">{error ? c.emptyEyebrow : c.introEyebrow}</span>
                  <h3>{error ? c.emptyTitle : c.introTitle}</h3>
                  <p>{error ? c.emptyText : c.introBody}</p>
                </div>
                <div className="work-intro-cta flex flex-wrap gap-3">
                  <Magnetic strength={10}>
                    <Link className="btn btn-primary" to="/contact">
                      {t("work.intro.cta")}
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
                    </Link>
                  </Magnetic>
                  {error && <button type="button" className="btn btn-secondary" onClick={retry}>{c.retry}</button>}
                </div>
              </Tilt>
            )}
          </div>
        </section>
        <WorkingTogether />
      </main>
      <Footer />
    </div>
  )
}
