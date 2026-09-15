import type { TimelineContent } from '../content/en'
import ScrollSpine from '@/components/motion/ScrollSpine'

type Entry = TimelineContent['timeline']['entries'][number]

function YearBadge({ year }: { year: string }) {
  return (
    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 pb-12">
      <div className="w-16 h-16 rounded-full bg-gold border-4 border-navy flex items-center justify-center shadow-lg shadow-gold/25">
        <span className="text-on-brand font-display font-bold text-xs leading-tight text-center">{year}</span>
      </div>
    </div>
  )
}

function DesktopCard({ entry, side }: { entry: Entry; side: 'left' | 'right' }) {
  const wrap = side === 'left' ? 'hidden md:flex flex-1 justify-end pr-10 pb-12' : 'hidden md:flex flex-1 justify-start pl-10 pb-12'
  return (
    <div className={wrap}>
      <div className="bg-navy-light border border-white/8 rounded-xl p-6 max-w-sm w-full hover:border-gold/20 transition-colors group">
        <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-gold transition-colors">{entry.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{entry.desc}</p>
        {entry.note && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-medium">{entry.note}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Milestones({ c }: { c: TimelineContent['timeline'] }) {
  const { entries } = c
  return (
    <section className="max-w-5xl mx-auto px-6 lg:px-8 py-24">
      <ScrollSpine left="var(--spine-md, 28px)" className="relative timeline-spine">
        <div className="space-y-0">
          {entries.map((entry, i) => (
            <div key={entry.year} className="relative flex md:items-center mb-12 md:mb-0">
              {/* Mobile layout: always left */}
              <div className="md:hidden flex gap-5 w-full">
                <div className="flex flex-col items-center gap-0">
                  <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold/20">
                    <span className="text-on-brand font-display font-bold text-xs leading-tight text-center">{entry.year}</span>
                  </div>
                </div>
                <div className="bg-navy-light border border-white/8 rounded-xl p-5 mb-6 flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">{entry.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{entry.desc}</p>
                  {entry.note && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      <span className="text-gold text-xs font-medium">{entry.note}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop layout: alternating */}
              {entry.isLeft ? (
                <>
                  <DesktopCard entry={entry} side="left" />
                  <YearBadge year={entry.year} />
                  <div className="hidden md:block flex-1 pl-10 pb-12" />
                </>
              ) : (
                <>
                  <div className="hidden md:block flex-1 pr-10 pb-12" />
                  <YearBadge year={entry.year} />
                  <DesktopCard entry={entry} side="right" />
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollSpine>
    </section>
  )
}
