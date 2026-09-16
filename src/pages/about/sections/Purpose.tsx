import type { AboutContent } from '../content/en'
import Eyebrow from './Eyebrow'

export default function Purpose({ c }: { c: AboutContent['purpose'] }) {
  return (
    <section className="bg-navy-dark section-y">
      <div className="container-page">
        <div className="text-center mb-9 sm:mb-14">
          <Eyebrow label={c.eyebrow} center className="mb-4" />
          <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
            {c.title}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
          {[
            { k: c.vision, pa: 'var(--brand-fg)', word: 'Vision', paths: ['M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z', 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'] },
            { k: c.mission, pa: 'var(--accent-teal)', word: 'Mission', paths: ['M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'] },
          ].map((item, i) => (
            <div key={item.word} className="bg-navy border border-white/8 rounded-2xl p-6 sm:p-8 lg:p-10 about-pur" style={{ ['--pa' as string]: item.pa, ['--i' as string]: i }}>
              <span className="about-pur__glow" aria-hidden="true" />
              <span className="about-pur__ghost font-display" aria-hidden="true">{item.word}</span>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-5 sm:mb-6 about-pur__icon">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  {item.paths.map((d) => <path key={d} pathLength="1" strokeLinecap="round" strokeLinejoin="round" d={d} />)}
                </svg>
              </div>
              <p className="text-[10.5px] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-widest uppercase mb-3" style={{ color: item.pa }}>{item.k.label}</p>
              <h3 className="font-display text-xl sm:text-2xl text-white mb-3 sm:mb-4">{item.k.title}</h3>
              <p className="text-slate-400 leading-relaxed text-[14px] sm:text-base">{item.k.text}</p>
              <span className="about-pur__rule" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
