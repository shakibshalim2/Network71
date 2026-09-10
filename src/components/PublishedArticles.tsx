import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/context/LanguageContext"
import {
  usePublicContent,
  textField,
  type PublishedPage,
} from "@/lib/publicContent"
import { WorkImage } from "./WorkShowcase"

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
  return (
    <section className="section-y">
      <div className="container-page">
        <h2 className="font-display text-3xl mb-8">
          {module === "posts"
            ? bn
              ? "সাম্প্রতিক লেখা"
              : "Latest insights"
            : bn
              ? "সংবাদ ও ঘোষণা"
              : "News & announcements"}
        </h2>
        {loading ? (
          <p role="status">{bn ? "লোড হচ্ছে…" : "Loading…"}</p>
        ) : error ? (
          <div role="alert">
            <p>{error}</p>
            <button className="public-button" onClick={retry}>
              {bn ? "আবার চেষ্টা করুন" : "Try again"}
            </button>
          </div>
        ) : data?.items.length ? (
          <div className="work-grid">
            {data.items.map((item) => (
              <article className="work-card" key={item.id}>
                <Link to={`${path}/${item.slug}`}>
                  <WorkImage
                    src={textField(item, "image")}
                    alt={textField(item, "title")}
                  />
                </Link>
                <div className="p-6">
                  <p className="text-sm text-slate-400 mb-3">
                    {textField(item, "date")} {textField(item, "author")}
                  </p>
                  <h3>
                    <Link to={`${path}/${item.slug}`}>
                      {textField(item, "title")}
                    </Link>
                  </h3>
                  <p>{textField(item, "summary")}</p>
                  <Link
                    className="public-text-link"
                    to={`${path}/${item.slug}`}
                  >
                    {bn ? "বিস্তারিত পড়ুন" : "Read more"} ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="public-empty">
            {bn
              ? "প্রকাশের জন্য অনুমোদিত লেখা এখানে দেখা যাবে।"
              : "Approved updates will appear here when published."}
          </p>
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
