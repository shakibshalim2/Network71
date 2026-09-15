import type { GlobalPresenceContent } from '../content/en'
import CountUp from '@/components/motion/CountUp'

export default function Counts({ c }: { c: GlobalPresenceContent['counts'] }) {
  return (
    <section className="py-14 px-6 bg-navy-dark">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-6 text-center">
          {c.items.map((item) => (
            <div key={item.label} className="bg-navy rounded-xl py-8 px-4 border border-white/8">
              <div className="text-4xl sm:text-5xl font-display font-bold text-gold mb-2"><CountUp value={item.stat} /></div>
              <div className="text-slate-400 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-500 text-xs mt-6">
          {c.footnote}
        </p>
      </div>
    </section>
  )
}
