import type { GlobalPresenceContent } from '../content/en'
import CountUp from '@/components/motion/CountUp'

export default function Counts({ c }: { c: GlobalPresenceContent['counts'] }) {
  return (
    <section className="py-14 px-6 bg-navy-dark">
      <div className="max-w-4xl mx-auto">
        <dl className="gcount">
          {c.items.map((item, i) => (
            <div key={item.label} className="gcount__cell" style={{ ['--i' as string]: i }}>
              <span className="gcount__tick" aria-hidden="true" />
              <dd className="font-display"><CountUp value={item.stat} /></dd>
              <dt>{item.label}</dt>
            </div>
          ))}
        </dl>
        <p className="gcount__note">{c.footnote}</p>
      </div>
    </section>
  )
}
