import type { SustainabilityContent } from '../content/en'
import CountUp from '@/components/motion/CountUp'

// Numeric stats read well huge; word/phrase stats need a smaller size.
const isPhrase = (s: string) => s.length > 6

/**
 * Community programs: the headline figure sits on a ledger band with a drawn
 * accent tick; program cards use an outlined index numeral instead of an emoji
 * on a gradient tile, and the focus area is a mono label. Phones: 2-col grid.
 */
export default function Programs({ c }: { c: SustainabilityContent['programs'] }) {
  const phrase = isPhrase(c.headlineStat)
  return (
    <section className="py-24 px-6 bg-navy-dark prog">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
        </div>

        <div className="prog__band">
          <span className="prog__tick" aria-hidden="true" />
          <div className="prog__figure">
            <span className={`font-display ${phrase ? 'prog__stat--phrase' : 'prog__stat--num'}`}>
              {phrase ? c.headlineStat : <CountUp value={c.headlineStat} />}
            </span>
            <span className="prog__label">{c.headlineLabel}</span>
          </div>
          <p className="prog__sub">{c.headlineSub}</p>
        </div>

        <ol className="prog__grid">
          {c.items.map((p, i) => (
            <li key={p.title} className="prog__card" style={{ ['--i' as string]: i }}>
              <span className="prog__idx font-display">{String(i + 1).padStart(2, '0')}</span>
              <span className="prog__icon" aria-hidden="true">{p.icon}</span>
              <h3 className="prog__title">{p.title}</h3>
              <p className="prog__desc">{p.desc}</p>
              <div className="prog__foot">
                <span className="prog__focus">{p.statLabel}</span>
                <span className="prog__area">{p.stat}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
