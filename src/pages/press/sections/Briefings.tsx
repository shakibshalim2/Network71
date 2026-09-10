import type { PressContent } from '../content/en'
import { useCompanySettings } from '@/lib/companySettings'

export default function Briefings({ c }: { c: PressContent['briefings'] }) {
  const { pressEmail } = useCompanySettings()
  return (
    <section className="bg-navy-dark border-y border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-2">{c.title}</h2>
            <p className="text-slate-400 text-sm">{c.lead}</p>
          </div>
          <a
            href={`mailto:${pressEmail}`}
            className="flex-shrink-0 px-5 py-2.5 border border-gold/25 text-gold text-sm font-medium rounded-lg hover:bg-gold/8 transition-colors"
          >
            {c.enquiriesLabel}
          </a>
        </div>

        <div className="space-y-8">
          {c.releases.map((pr) => (
            <div key={pr.img} className="group bg-navy rounded-2xl border border-white/8 hover:border-gold/20 transition-colors overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-64 flex-shrink-0 overflow-hidden bg-navy-dark">
                <img decoding="async" loading="lazy"
                  src={pr.img}
                  alt={pr.title}
                  className="w-full h-48 md:h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity"
                />
              </div>
              <div className="flex-1 p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${pr.tagColor}`}>{pr.tag}</span>
                    <span className="text-slate-500 text-xs">{pr.date}</span>
                  </div>
                  <h3 className="font-display text-xl text-white mb-3 leading-snug group-hover:text-gold transition-colors">{pr.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{pr.excerpt}</p>
                </div>
                <div className="mt-5 flex items-center gap-2 text-gold text-sm font-medium">
                  <a href={`mailto:${pressEmail}?subject=${encodeURIComponent(`${c.requestSubject}: ${pr.title}`)}`}>{c.requestLabel}</a>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
