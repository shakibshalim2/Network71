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
import ContentState from "@/components/ContentState"

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
  const lines = (key: string) =>
    item
      ? textField(item, key)
          .split(/\r?\n/)
          .map((value) => value.trim())
          .filter(Boolean)
      : []
  const gallery = lines("gallery_images")
    .map((src, index) => ({
      src: safeContentUrl(src),
      caption: lines("gallery_captions")[index] || "",
    }))
    .filter((entry) => Boolean(entry.src))
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
            <div className="container-page">
              <ContentState kind="loading" eyebrow={c.unavailableEyebrow} title={c.loading} />
            </div>
          </section>
        ) : error ? (
          <section className="work-page-hero">
            <div className="container-page">
              <ContentState kind="error" eyebrow={c.unavailableEyebrow} title={c.errorTitle} text={error} actionLabel={c.retry} onAction={retry} />
            </div>
          </section>
        ) : notFound || !item || !permitted ? (
          <section className="work-page-hero">
            <div className="container-page">
              <div className="public-empty">
                <span className="public-eyebrow">{c.unavailableEyebrow}</span>
                <h3>{c.unavailableTitle}</h3>
                <p>{c.unavailableText}</p>
                <Link className="btn btn-primary" to="/projects">
                  {c.browse}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
                </Link>
              </div>
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
                {lines("deliverables").length > 0 && (
                  <section className="work-supporting-section">
                    <h2>{c.deliverablesTitle}</h2>
                    <ul>
                      {lines("deliverables").map((value) => (
                        <li key={value}>{value}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {["result_baseline", "result_source", "result_date"].some(
                  (key) => textField(item, key),
                ) && (
                  <section className="work-supporting-section">
                    <h2>{c.resultEvidenceTitle}</h2>
                    <dl className="work-facts">
                      {[
                        ["result_baseline", c.resultBaselineLabel],
                        ["result_source", c.resultSourceLabel],
                        ["result_date", c.resultDateLabel],
                      ].map(([key, label]) =>
                        textField(item, key) ? (
                          <div key={key}>
                            <dt>{label}</dt>
                            <dd>{textField(item, key)}</dd>
                          </div>
                        ) : null,
                      )}
                    </dl>
                  </section>
                )}
                {gallery.length > 0 && (
                  <section className="work-supporting-section">
                    <h2>{c.galleryTitle}</h2>
                    <div className="work-gallery">
                      {gallery.map(({ src, caption }, index) => (
                        <figure key={`${src}-${index}`}>
                          <img
                            src={src}
                            alt={
                              caption ||
                              `${textField(item, "title")} ${index + 1}`
                            }
                            loading="lazy"
                          />
                          {caption && <figcaption>{caption}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  </section>
                )}
                {textField(item, "testimonial_quote") && (
                  <section className="work-supporting-section">
                    <h2>{c.testimonialTitle}</h2>
                    <blockquote className="work-testimonial">
                      <p>“{textField(item, "testimonial_quote")}”</p>
                      {textField(item, "testimonial_attribution") && (
                        <cite>
                          {textField(item, "testimonial_attribution")}
                        </cite>
                      )}
                    </blockquote>
                  </section>
                )}
                {safeContentUrl(textField(item, "evidence_url")) && (
                  <a
                    className="public-button"
                    href={safeContentUrl(textField(item, "evidence_url"))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {textField(item, "evidence_label") || c.publicEvidence}
                  </a>
                )}
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
                <p>{c.enquiryText}</p>
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
