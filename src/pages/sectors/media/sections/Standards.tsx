import SectionEyebrow from '@/components/sector/SectionEyebrow'
import type { MediaContent } from '../content/en'
import { BG_ALT } from '../theme'

const GREEN = 'var(--accent-green)'

export default function Standards({ c }: { c: MediaContent['standards'] }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionEyebrow label={c.eyebrow} color={GREEN} className="mb-6" />
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">{c.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{c.lead}</p>
          </div>
          <ol className="svals" style={{ ['--pa' as string]: GREEN }}>
            {c.items.map((item, i) => (
              <li key={item.title} className="svals__row svals__row--badge" style={{ ['--i' as string]: i }}>
                <span className="sseal__mark" aria-hidden="true" style={{ ['--pa' as string]: GREEN }}>
                  <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" pathLength="1" /></svg>
                  <svg className="sseal__tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path pathLength="1" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                <div className="svals__body">
                  <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
                <span className="svals__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
