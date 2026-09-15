import { Link } from 'react-router-dom'
import type { AboutContent } from '../content/en'
import Eyebrow from './Eyebrow'

export default function Leadership({ c }: { c: AboutContent['leadership'] }) {
  return (
    <section className="bg-navy section-y">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-5 sm:gap-4">
          <div>
            <Eyebrow label={c.eyebrow} className="mb-4" />
            <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
              {c.title}
            </h2>
          </div>
          <Link
            to="/leadership"
            className="btn btn-ghost btn-sm self-start sm:self-auto shrink-0"
          >
            {c.viewAll}
          </Link>
        </div>
        <div className="grid min-[420px]:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
          {c.people.map((person) => (
            <Link to="/leadership" key={person.title} className="about-person group">
              {/* Portrait placeholder → drawn monogram ring on an accent-washed plate (no stock silhouette) */}
              <div className="about-person__plate">
                <span className="about-person__grid" aria-hidden="true" />
                <span className="about-person__mono" aria-hidden="true">
                  <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" pathLength="1" /></svg>
                  <span className="font-display">{person.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('')}</span>
                </span>
                <span className="about-person__mark font-display" aria-hidden="true">N71</span>
              </div>
              <div className="p-4 sm:p-5 lg:p-6 about-person__body">
                <h3 className="font-display text-base sm:text-lg text-white mb-1">{person.name}</h3>
                <p className="text-gold text-[11px] sm:text-xs tracking-wide">{person.title}</p>
                <span className="about-person__arrow" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
          <p className="min-[420px]:col-span-1 sm:col-span-2 self-center text-[13px] sm:text-sm leading-relaxed" style={{ color: 'var(--fg-subtle)' }}>
            {c.note}
          </p>
        </div>
      </div>
    </section>
  )
}
