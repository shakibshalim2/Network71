import type { SustainabilityContent } from '../content/en'

export default function Report({ c }: { c: SustainabilityContent['report'] }) {
  return (
    <section className="py-20 px-6 bg-navy">
      <div className="max-w-3xl mx-auto">
        <div className="bg-navy-dark rounded-2xl p-8 border border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-amber-500/15 text-amber-400 border border-amber-500/25 mb-3 font-mono text-[9px] tracking-wide uppercase rounded-full">
              {c.badge}
            </div>
            <h3 className="text-white font-semibold text-lg mb-1">{c.title}</h3>
            <p className="text-slate-400 text-sm">{c.text}</p>
          </div>
          <a href={c.href} className="public-button flex-shrink-0">
            {c.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
