import type { InvestorsContent } from '../content/en'
import ScrollWords from '@/components/motion/ScrollWords'
import Eyebrow from './Eyebrow'

export default function Governance({ c }: { c: InvestorsContent['governance'] }) {
  return (
    <section className="bg-navy py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow label={c.eyebrow} />
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-6 tracking-[-0.02em]">{c.title}</h2>
            <ScrollWords className="text-slate-400 leading-relaxed mb-6" text={c.p1} />
            <p className="text-slate-500 text-sm italic">{c.note}</p>
          </div>
          <ol className="svals" style={{ ['--pa' as string]: 'var(--brand-fg)' }}>
            {c.bodies.map((body, i) => (
              <li key={body} className="svals__row svals__row--badge inv-body" style={{ ['--i' as string]: i }}>
                <span className="sseal__mark" aria-hidden="true">
                  <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" pathLength="1" /></svg>
                  <span className="inv-body__idx font-mono">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <div className="svals__body">
                  <div className="text-white font-semibold text-sm mb-1">{body}</div>
                  <p className="text-slate-500 text-xs inv-body__pending"><i aria-hidden="true" />{c.pending}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
