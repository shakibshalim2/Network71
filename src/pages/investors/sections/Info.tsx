import type { InvestorsContent } from '../content/en'

export default function Info({ c, email }: { c: InvestorsContent['info']; email: string }) {
  return (
    <section className="bg-navy section-y">
      <div className="container-page">
        <div className="public-section-heading">
          <div>
            <span className="public-eyebrow">{c.eyebrow}</span>
            <h2>{c.title1}<br /><em>{c.title2}</em></h2>
          </div>
          <p>{c.lead}</p>
        </div>
        <div className="work-intro">
          <div className="work-intro-mark" aria-hidden="true">{c.mark}</div>
          <div>
            <h3>{c.introTitle}</h3>
            <p>{c.introText}</p>
          </div>
          <a className="public-button" href={`mailto:${email}`}>{c.cta}</a>
        </div>
      </div>
    </section>
  )
}
