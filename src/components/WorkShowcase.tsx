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
import { useCompanySettings } from "@/lib/companySettings"
import ProcessLine from "@/components/motion/ProcessLine"
import Tilt from "@/components/motion/Tilt"
import Magnetic from "@/components/motion/Magnetic"

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

export function WorkCard({ item, index }: { item: PublishedItem; index?: number }) {
  const { t } = useT()
  return (
    <Link className="work-card" to={`/projects/${item.slug}`}>
      <div className="work-card-image">
        {index !== undefined && <span className="work-card-idx font-mono" aria-hidden="true">{String(index).padStart(2, "0")}</span>}
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
          <Tilt className="work-intro" max={3} perspective={1600}>
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
              <h3>{t("work.intro.title")}</h3>
              <p>{t("work.intro.body")}</p>
            </div>
            <Magnetic strength={10} className="work-intro-cta">
              <Link className="btn btn-primary" to="/contact">
                {t("work.intro.cta")}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
                </svg>
              </Link>
            </Magnetic>
          </Tilt>
        )}
      </div>
    </section>
  )
}

const STEPS = ["s1", "s2", "s3", "s4"] as const

export function WorkingTogether() {
  const { t } = useT()
  const { generalEmail } = useCompanySettings()
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
        <ProcessLine steps={STEPS.length}>
          <ol className="working-steps">
            {STEPS.map((step, index) => (
              <li key={step} style={{ ["--i" as string]: index }}>
                <span className="working-number">0{index + 1}</span>
                <h3>{t(`work.together.${step}.title`)}</h3>
                <p>{t(`work.together.${step}.body`)}</p>
                <span className="working-ghost font-display" aria-hidden="true">0{index + 1}</span>
              </li>
            ))}
          </ol>
        </ProcessLine>
        <div className="working-contact">
          <p>{t("work.together.brief")}</p>
          <Magnetic strength={6}>
            <a href={`mailto:${generalEmail}`}>
              {generalEmail} <span aria-hidden="true">↗</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
