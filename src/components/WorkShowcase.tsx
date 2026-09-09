import { useState } from "react"
import { Link } from "react-router-dom"
import {
  safeContentUrl,
  textField,
  usePublicContent,
  type PublishedItem,
  type PublishedPage,
} from "@/lib/publicContent"

export function WorkImage({ src, alt }: { src: string; alt: string }) {
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
      aria-label={`Image unavailable: ${alt}`}
    >
      <span>N71</span>
      <small>IMAGE UNAVAILABLE</small>
    </div>
  )
}

export function WorkCard({ item }: { item: PublishedItem }) {
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
          Read the project story <span aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  )
}

export default function WorkShowcase() {
  const { data } = usePublicContent<PublishedPage>("projects")
  const items = (data?.items || [])
    .filter((item) => item.data.permission === true)
    .slice(0, 3)
  return (
    <section className="work-showcase section-y" id="our-work">
      <div className="container-page">
        <div className="public-section-heading">
          <div>
            <span className="public-eyebrow">OUR WORK</span>
            <h2>
              Look closer at
              <br />
              <em>what we do.</em>
            </h2>
          </div>
          <div>
            <p>
              Explore the scope, our role and the outcomes behind our projects.
              Find the right experience for your next brief.
            </p>
            <Link className="public-text-link" to="/projects">
              Explore projects <span aria-hidden="true">↗</span>
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
              <h3>Start with a relevant conversation.</h3>
              <p>
                Tell us what you need to build, source or deliver. Ask our team
                about relevant experience, the proposed scope and the people
                involved.
              </p>
            </div>
            <Link className="public-button" to="/contact">
              Discuss your project <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export function WorkingTogether() {
  const steps = [
    ["Your brief", "Tell us your goals, requirements, location and timeline."],
    [
      "A clear scope",
      "Discuss deliverables, responsibilities and a written proposal.",
    ],
    [
      "Agreed milestones",
      "Agree how progress, reviews and changes will be handled.",
    ],
    [
      "Delivery & next steps",
      "Define acceptance, handover and any ongoing support in the scope.",
    ],
  ]
  return (
    <section className="working-together section-y">
      <div className="container-page">
        <div className="public-section-heading">
          <div>
            <span className="public-eyebrow">WORKING WITH NETWORK71</span>
            <h2>
              Clarity from the
              <br />
              <em>first conversation.</em>
            </h2>
          </div>
          <p>
            A useful partnership starts with clear expectations. Here is what to
            discuss with our team before a project begins.
          </p>
        </div>
        <ol className="working-steps">
          {steps.map(([title, body], index) => (
            <li key={title}>
              <span className="working-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className="working-contact">
          <p>Have a brief ready? Let us know what you have in mind.</p>
          <a href="mailto:info@network71.com">
            info@network71.com <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
