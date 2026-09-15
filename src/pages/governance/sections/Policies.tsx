import type { GovernanceContent } from '../content/en'
import { useCompanySettings } from '@/lib/companySettings'

/** Policy documents as numbered filing rows (same language as Investors → Documents). */
export default function Policies({ c }: { c: GovernanceContent['policies'] }) {
  const { legalEmail } = useCompanySettings()
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 pol">
      <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">{c.title}</h2>
          <p className="text-slate-400 max-w-2xl">{c.lead}</p>
        </div>
        <span className="pol__count font-display" aria-hidden="true">
          {String(c.items.length).padStart(2, '0')}<span>{c.title}</span>
        </span>
      </div>
      <ol className="pol__list">
        {c.items.map((policy, i) => (
          <li key={policy.title} className="pol__row" style={{ ['--i' as string]: i }}>
            <span className="pol__idx font-mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="pol__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </span>
            <div className="pol__body">
              <h3 className="pol__title">{policy.title}</h3>
              <p className="pol__desc">{policy.desc}</p>
            </div>
            <a
              href={`mailto:${legalEmail}?subject=${encodeURIComponent(`${c.requestSubject}: ${policy.title}`)}`}
              className="pol__cta"
            >
              {c.requestLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
