import { Link } from 'react-router-dom'
import type { PressContent } from '../content/en'
import { mediaKitIcons } from '../icons'
import { spotlight } from '@/lib/useSpotlight'

export default function MediaKit({ c }: { c: PressContent['mediaKit'] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 dcards">
      <div className="mb-12">
        <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">{c.title}</h2>
        <p className="text-slate-400 max-w-2xl">
          {c.lead}
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-6 dcards__grid dcards__grid--keep">
        {c.items.map((item, i) => (
          <div key={item.icon} className="bg-navy-light border border-white/8 rounded-xl p-6 hover:border-gold/20 transition-colors group dcard" onPointerMove={spotlight}>
            <span className="dcard__spot" aria-hidden="true" />
            <span className="dcard__numeral font-display" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:bg-gold/20 transition-colors">
              {mediaKitIcons[item.icon]}
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.desc}</p>
            <div className="flex items-center gap-3">
              <Link to={item.href} className="pol__cta">
                {c.viewLabel}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
