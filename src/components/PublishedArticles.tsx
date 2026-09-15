import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/context/LanguageContext"
import {
  usePublicContent,
  textField,
  type PublishedPage,
} from "@/lib/publicContent"
import { WorkImage } from "./WorkShowcase"
import ContentState from "./ContentState"

/** Editorial article grid shared by Blog (posts) and Press (news). */
export default function PublishedArticles({
  module,
}: {
  module: "posts" | "press"
}) {
  const { language } = useLanguage()
  const bn = language === "bn"
  const [page, setPage] = useState(1)
  const { data, loading, error, retry } = usePublicContent<PublishedPage>(
    `${module}?page=${page}`,
  )
  useEffect(() => setPage(1), [language])
  const path = module === "posts" ? "/blog" : "/press"
  const title =
    module === "posts"
      ? bn ? "সাম্প্রতিক লেখা" : "Latest insights"
      : bn ? "সংবাদ ও ঘোষণা" : "News & announcements"
  const eyebrow = module === "posts" ? (bn ? "ব্লগ" : "Journal") : (bn ? "প্রেস" : "Newsroom")
  const count = data?.total ?? data?.items.length ?? 0
  return (
    <section className="section-y art">
      <div className="container-page">
        <div className="art__head">
          <div>
            <p className="public-eyebrow" style={{ marginBottom: 12 }}><span className="eyebrow-rule" />{eyebrow}</p>
            <h2 className="font-display art__title">{title}</h2>
          </div>
          {!loading && !error && count > 0 && (
            <span className="art__count font-display" aria-hidden="true">
              {String(count).padStart(2, "0")}<span>{bn ? "প্রকাশনা" : "published"}</span>
            </span>
          )}
        </div>
        {loading ? (
          <ContentState kind="loading" eyebrow={eyebrow} title={bn ? "লোড হচ্ছে…" : "Loading articles…"} />
        ) : error ? (
          <ContentState kind="error" eyebrow={eyebrow} title={bn ? "এই মুহূর্তে লোড করা যাচ্ছে না" : "We couldn't load this right now"} text={error} actionLabel={bn ? "আবার চেষ্টা করুন" : "Try again"} onAction={retry} />
        ) : data?.items.length ? (
          <div className="art__grid">
            {data.items.map((item, i) => {
              const href = `${path}/${item.slug}`
              return (
                <article className="art__card" key={item.id}>
                  <Link to={href} className="art__media" aria-hidden="true" tabIndex={-1}>
                    <WorkImage src={textField(item, "image")} alt="" />
                    <span className="art__idx font-mono">{String(i + 1 + (page - 1) * 20).padStart(2, "0")}</span>
                  </Link>
                  <div className="art__body">
                    <p className="art__meta">
                      <span className="art__dot" aria-hidden="true" />
                      <time>{textField(item, "date")}</time>
                      {textField(item, "author") && <span className="art__author">{textField(item, "author")}</span>}
                    </p>
                    <h3 className="art__h font-display">
                      <Link to={href}>{textField(item, "title")}</Link>
                    </h3>
                    <p className="art__summary">{textField(item, "summary")}</p>
                    <Link className="art__more" to={href}>
                      {bn ? "বিস্তারিত পড়ুন" : "Read more"}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <ContentState kind="empty" eyebrow={eyebrow} title={bn ? "এখনও কিছু প্রকাশিত হয়নি" : "Nothing published yet"} text={bn ? "প্রকাশের জন্য অনুমোদিত লেখা এখানে দেখা যাবে।" : "Approved updates will appear here when published."} />
        )}
        {(data?.pages || 1) > 1 && (
          <nav
            className="work-pagination"
            aria-label={bn ? "লেখার পৃষ্ঠা" : "Article pages"}
          >
            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              {bn ? "আগের" : "Previous"}
            </button>
            <span>
              {page} / {data?.pages}
            </span>
            <button
              disabled={page >= (data?.pages || 1)}
              onClick={() => setPage(page + 1)}
            >
              {bn ? "পরের" : "Next"}
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}
