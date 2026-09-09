import { useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { WorkImage } from "@/components/WorkShowcase"
import {
  safeContentUrl,
  textField,
  usePublicContent,
  type PublishedItem,
} from "@/lib/publicContent"
import type { ProjectsContent } from "../content/en"

export default function ProjectDetail({
  slug,
  c,
}: {
  slug: string
  c: ProjectsContent["detail"]
}) {
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
              <h1>{c.loading}</h1>
            </div>
          </section>
        ) : error ? (
          <section className="work-page-hero">
            <div className="container-page">
              <h1>{c.errorTitle}</h1>
              <p role="alert">{error}</p>
              <button className="public-button" onClick={retry}>
                {c.retry}
              </button>
            </div>
          </section>
        ) : notFound || !item || !permitted ? (
          <section className="work-page-hero">
            <div className="container-page">
              <span className="public-eyebrow">{c.unavailableEyebrow}</span>
              <h1>{c.unavailableTitle}</h1>
              <p>{c.unavailableText}</p>
              <Link className="public-button" to="/projects">
                {c.browse}
              </Link>
            </div>
          </section>
        ) : (
          <>
            <section className="work-page-hero">
              <div className="container-page">
                <nav className="public-breadcrumb" aria-label="Breadcrumb">
                  <Link to="/">{c.breadcrumbHome}</Link>
                  <span aria-hidden="true">/</span>
                  <Link to="/projects">{c.breadcrumbList}</Link>
                </nav>
                <span className="public-eyebrow">
                  {textField(item, "type")} / {textField(item, "work_status")}
                </span>
                <h1>{textField(item, "title")}</h1>
                {textField(item, "summary") && (
                  <p>{textField(item, "summary")}</p>
                )}
                <dl className="work-facts">
                  {c.facts.map(({ label, key }) =>
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
                  {c.story.map(({ title, key }, index) =>
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
                    {c.visitSite}
                  </a>
                )}
              </div>
            </section>
            <section className="section-y work-enquiry">
              <div className="container-page">
                <span className="public-eyebrow">{c.enquiryEyebrow}</span>
                <h2>
                  {c.enquiryTitleLine1}
                  <br />
                  <em>{c.enquiryTitleLine2}</em>
                </h2>
                <p>
                  {c.enquiryText}
                </p>
                <Link
                  className="public-button"
                  to={`/contact?project=${encodeURIComponent(textField(item, "title"))}`}
                >
                  {c.enquiryCta}
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
