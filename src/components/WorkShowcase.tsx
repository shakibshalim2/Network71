import { useState } from "react"
import { Link } from "react-router-dom"
import { useT } from "@/i18n"
import {
  safeContentUrl,
  textField,
  usePublicContent,
  type PublishedItem,
  type PublishedPage,
} from "@/lib/publicContent"

export function WorkImage({ src, alt }: { src: string; alt: string }) {
  const { t } = useT()
  const [failed, setFailed] = useState("")
  const url = safeContentUrl(src)
  return url && failed !== url ? (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(url)}
    />
  ) : (
    <div
      className="work-image-placeholder"
      role="img"
      aria-label={t("work.imageUnavailable", { alt })}
    >
      <span>N71</span>
      <small>{t("work.imageUnavailableShort")}</small>
    </div>
  )
}

export function WorkCard({ item }: { item: PublishedItem }) {
  const { t } = useT()
  return (
    <Link className="work-card" to={`/projects/${item.slug}`}>
      <div className="work-card-image">
        <WorkImage
          src={textField(item, "image")}
          alt={textField(item, "title")}
        />
        <span className="work-status">{textField(item, "work_status")}</span>
      </div>
      <div className="work-card-body">
        <div className="work-meta">
          {textField(item, "type")}{" "}
          {textField(item, "year") && ` / ${textField(item, "year")}`}
        </div>
        <h3>{textField(item, "title")}</h3>
        <p>{textField(item, "summary") || textField(item, "role")}</p>
        <span className="work-card-link">
          {t("work.readStory")} <span aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  )
}

export default function WorkShowcase() {
  const { t } = useT()
  const { data } = usePublicContent<PublishedPage>("projects")
  const items = (data?.items || [])
    .filter((item) => item.data.permission === true)
    .slice(0, 3)
  return (
    <section className="work-showcase section-y" id="our-work">
      <div className="container-page">
        <div className="public-section-heading">
          <div>
            <span className="public-eyebrow">{t("work.eyebrow")}</span>
            <h2>
              {t("work.title1")}
              <br />
              <em>{t("work.title2")}</em>
            </h2>
          </div>
          <div>
            <p>{t("work.lead")}</p>
            <Link className="public-text-link" to="/projects">
              {t("work.exploreProjects")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        {items.length ? (
          <div className="work-grid">
            {items.map((item) => (
              <WorkCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="work-intro">
            <div className="work-intro-mark" aria-hidden="true">
              <span>01</span>
              <div />
              <span>02</span>
              <div />
              <span>03</span>
            </div>
            <div>
              <h3>{t("work.intro.title")}</h3>
              <p>{t("work.intro.body")}</p>
            </div>
            <Link className="public-button" to="/contact">
              {t("work.intro.cta")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

const STEPS = ["s1", "s2", "s3", "s4"] as const

export function WorkingTogether() {
  const { t } = useT()
  return (
    <section className="working-together section-y">
      <div className="container-page">
        <div className="public-section-heading">
          <div>
            <span className="public-eyebrow">{t("work.together.eyebrow")}</span>
            <h2>
              {t("work.together.title1")}
              <br />
              <em>{t("work.together.title2")}</em>
            </h2>
          </div>
          <p>{t("work.together.lead")}</p>
        </div>
        <ol className="working-steps">
          {STEPS.map((step, index) => (
            <li key={step}>
              <span className="working-number">0{index + 1}</span>
              <h3>{t(`work.together.${step}.title`)}</h3>
              <p>{t(`work.together.${step}.body`)}</p>
            </li>
          ))}
        </ol>
        <div className="working-contact">
          <p>{t("work.together.brief")}</p>
          <a href="mailto:info@network71.com">
            info@network71.com <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
