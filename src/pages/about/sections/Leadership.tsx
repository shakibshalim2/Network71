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
            className="inline-flex items-center justify-center text-[13px] sm:text-sm text-gold border border-gold/30 px-5 py-2.5 rounded-lg hover:bg-gold/10 transition-colors self-start sm:self-auto shrink-0"
          >
            {c.viewAll}
          </Link>
        </div>
        <div className="grid min-[420px]:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {c.people.map((person) => (
            <div key={person.title} className="bg-navy-light border border-white/8 rounded-2xl overflow-hidden group hover:border-gold/25 transition-colors duration-300">
              {/* Placeholder portrait — uses fill tokens so it reads in both themes */}
              <div
                className="w-full h-40 sm:h-48 lg:h-52 flex items-center justify-center"
                style={{ background: 'var(--fill-2)' }}
              >
                <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--fg-faint)' }}>
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="font-display text-base sm:text-lg text-white mb-1 group-hover:text-gold transition-colors">{person.name}</h3>
                <p className="text-gold text-[11px] sm:text-xs tracking-wide">{person.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
