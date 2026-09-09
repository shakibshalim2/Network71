import type { InvestorsContent } from '../content/en'
import Eyebrow from './Eyebrow'

export default function Documents({ c, email }: { c: InvestorsContent['documents']; email: string }) {
  return (
    <section className="bg-navy-dark py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <Eyebrow label={c.eyebrow} center />
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">{c.title}</h2>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {c.items.map((doc) => (
            <div key={doc.subject} className="document-request-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-navy border border-white/8 rounded-xl px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{doc.name}</p>
                  <p className="text-slate-500 text-xs">{c.availability}</p>
                </div>
              </div>
              <a className="public-text-link" href={`mailto:${email}?subject=${encodeURIComponent(doc.subject)}`}>{c.request}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
