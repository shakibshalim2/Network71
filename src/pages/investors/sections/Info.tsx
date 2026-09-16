import type { InvestorsContent } from '../content/en'
import Tilt from '@/components/motion/Tilt'
import Magnetic from '@/components/motion/Magnetic'

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
        <Tilt className="work-intro work-intro--page" max={3} perspective={1600}>
          <span className="work-intro-mark" aria-hidden="true">{c.mark}</span>
          <span className="work-intro-glow" aria-hidden="true" />
          <ol className="work-intro-steps" aria-hidden="true">
            {c.steps.map((label, i) => (
              <li key={label} style={{ ['--i' as string]: i }}>
                <span className="work-intro-steps__idx">0{i + 1}</span>
                <span className="work-intro-steps__label">{label}</span>
              </li>
            ))}
          </ol>
          <div className="work-intro-copy">
            <h3>{c.introTitle}</h3>
            <p>{c.introText}</p>
          </div>
          <Magnetic strength={10} className="work-intro-cta">
            <a className="btn btn-primary" href={`mailto:${email}`}>
              {c.cta.replace(' ↗', '')}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
            </a>
          </Magnetic>
        </Tilt>
      </div>
    </section>
  )
}
