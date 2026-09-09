import type { PressContent } from '../content/en'

export default function ContactCta({ c }: { c: PressContent['contact'] }) {
  return (
    <section className="bg-navy-dark border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-navy border border-white/8 rounded-2xl">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">{c.eyebrow}</span>
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">{c.title}</h3>
            <p className="text-slate-400 text-sm max-w-lg">
              {c.lead}
            </p>
          </div>
          <a
            href={`mailto:${c.email}`}
            className="flex-shrink-0 px-8 py-3.5 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
          >
            {c.email}
          </a>
        </div>
      </div>
    </section>
  )
}
