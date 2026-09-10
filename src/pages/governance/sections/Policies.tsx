import type { GovernanceContent } from '../content/en'
import { useCompanySettings } from '@/lib/companySettings'

export default function Policies({ c }: { c: GovernanceContent['policies'] }) {
  const { legalEmail } = useCompanySettings()
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">{c.title}</h2>
        <p className="text-slate-400 max-w-2xl">
          {c.lead}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {c.items.map((policy) => (
          <div key={policy.title} className="bg-navy-light border border-white/8 rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{policy.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{policy.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-white/8">
              <a href={`mailto:${legalEmail}?subject=${encodeURIComponent(`${c.requestSubject}: ${policy.title}`)}`} className="flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-300 hover:text-gold text-sm rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {c.requestLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
