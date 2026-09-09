import type { ContactContent } from '../content/en'

const CARD = 'bg-navy border border-white/8 rounded-2xl p-8 text-center hover:border-gold/25 transition-colors duration-300 group'
const ICON_WRAP = 'w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/15 transition-colors'

export default function Methods({ c }: { c: ContactContent['methods'] }) {
  return (
    <section className="bg-navy-dark py-16 border-b border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-7">
          {/* Email */}
          <div className={CARD}>
            <div className={ICON_WRAP}>
              <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h3 className="font-display text-xl text-white mb-2">{c.email.title}</h3>
            <a href={`mailto:${c.email.value}`} className="text-gold text-sm hover:underline">
              {c.email.value}
            </a>
            <p className="text-slate-500 text-xs mt-2">{c.email.note}</p>
          </div>

          {/* Location */}
          <div className={CARD}>
            <div className={ICON_WRAP}>
              <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3 className="font-display text-xl text-white mb-2">{c.location.title}</h3>
            <p className="text-slate-300 text-sm">{c.location.value}</p>
            <p className="text-slate-500 text-xs mt-2">{c.location.note}</p>
          </div>

          {/* Social */}
          <div className={CARD}>
            <div className={ICON_WRAP}>
              <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </div>
            <h3 className="font-display text-xl text-white mb-2">{c.social.title}</h3>
            <p className="text-slate-400 text-sm">{c.social.value}</p>
            <p className="text-slate-500 text-xs mt-2">{c.social.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
