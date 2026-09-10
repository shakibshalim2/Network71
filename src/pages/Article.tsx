import { useEffect } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { WorkImage } from "@/components/WorkShowcase"
import { useLanguage } from "@/context/LanguageContext"
import {
  usePublicContent,
  textField,
  safeContentUrl,
  type PublishedItem,
} from "@/lib/publicContent"

export default function Article() {
  const { slug = "" } = useParams(),
    { pathname } = useLocation(),
    { language } = useLanguage()
  const press = pathname.startsWith("/press/"),
    bn = language === "bn"
  const path = press ? "/press" : "/blog"
  const { data, loading, error, notFound, retry } =
    usePublicContent<PublishedItem>(
      `${press ? "press" : "posts"}/${encodeURIComponent(slug)}`,
    )
  useEffect(() => {
    if (!data) return
    document.title =
      textField(data, "seo_title") || `${textField(data, "title")} | Network71`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        textField(data, "seo_description") || textField(data, "summary"),
      )
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute("content", "index, follow")
  }, [data])
  const source = data ? safeContentUrl(textField(data, "url")) : undefined
  return (
    <>
      <Header />
      <main className="public-content">
        <section className="work-page-hero">
          <div className="container-page">
            <Link className="public-text-link" to={path}>
              ← {bn ? "সব লেখা" : "All updates"}
            </Link>
            {loading ? (
              <h1 role="status">{bn ? "লোড হচ্ছে…" : "Loading…"}</h1>
            ) : error ? (
              <div role="alert">
                <h1>{bn ? "লেখা লোড হয়নি" : "Unable to load this update"}</h1>
                <p>{error}</p>
                <button className="public-button" onClick={retry}>
                  {bn ? "আবার চেষ্টা করুন" : "Try again"}
                </button>
              </div>
            ) : notFound || !data ? (
              <h1>{bn ? "লেখাটি পাওয়া যায়নি" : "Update not found"}</h1>
            ) : (
              <article>
                <h1>{textField(data, "title")}</h1>
                <p className="text-slate-400">
                  {textField(data, "date")} {textField(data, "author")}
                </p>
                <p>{textField(data, "summary")}</p>
                {textField(data, "image") && (
                  <div className="my-8 max-w-4xl">
                    <WorkImage
                      src={textField(data, "image")}
                      alt={textField(data, "title")}
                    />
                  </div>
                )}
                <div className="whitespace-pre-wrap text-lg leading-relaxed max-w-3xl my-10">
                  {textField(data, "body")}
                </div>
                {source && (
                  <a className="public-text-link" href={source}>
                    {bn ? "মূল সূত্র" : "Original source"} ↗
                  </a>
                )}
              </article>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
