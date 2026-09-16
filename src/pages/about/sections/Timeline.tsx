import type { AboutContent } from '../content/en'
import Eyebrow from './Eyebrow'
import ScrollSpine from '@/components/motion/ScrollSpine'

export default function Timeline({ c }: { c: AboutContent['timeline'] }) {
  return (
    <section className="bg-navy-dark section-y">
      <div className="container-page max-w-5xl">
        <div className="text-center mb-9 sm:mb-16">
          <Eyebrow label={c.eyebrow} center className="mb-4" />
          <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
            {c.title}
          </h2>
        </div>

        {/*
          Two timeline treatments:
            < md  → single left-hand spine with inline markers, so entries
                    stay visually connected.
            ≥ md  → original alternating left/right layout.
        */}
        <ScrollSpine left="var(--spine-md, 16px)" className="relative timeline-spine">
          <ol className="space-y-7 sm:space-y-10 md:space-y-12 list-none m-0 p-0">
            {c.entries.map((entry, i) => (
              <li
                key={entry.year}
                className={`relative flex items-start gap-4 md:items-center md:gap-6 about-tl ${
                  entry.side === 'right' ? 'md:flex-row-reverse about-tl--r' : 'md:flex-row about-tl--l'
                }`}
                style={{ ['--i' as string]: i }}
              >
                <div
                  className="md:hidden relative z-10 flex w-8 h-8 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-navy-dark"
                  aria-hidden="true"
                >
                  <span className="font-display text-gold text-[10px]">{i + 1}</span>
                </div>

                <div className="min-w-0 flex-1 md:flex-none md:w-[45%]">
                  <div className={`bg-navy border border-white/8 rounded-xl p-4 sm:p-5 md:p-6 about-tl__card ${entry.side === 'right' ? 'md:text-right' : ''}`}>
                    <span className="about-tl__ghost font-display" aria-hidden="true">{entry.year}</span>
                    <p className="text-gold text-[10.5px] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-widest uppercase mb-2 about-tl__year">{entry.year}</p>
                    <h3 className="font-display text-lg sm:text-xl text-white mb-2">{entry.title}</h3>
                    <p className="text-slate-500 text-[13px] sm:text-sm leading-relaxed">{entry.detail}</p>
                  </div>
                </div>

                <div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-navy-dark border-2 border-gold items-center justify-center z-10 about-tl__node"
                  aria-hidden="true"
                >
                  <span className="font-display text-gold text-xs">{i + 1}</span>
                </div>

                <div className="hidden md:block md:w-[45%]" />
              </li>
            ))}
          </ol>
        </ScrollSpine>
      </div>
    </section>
  )
}
