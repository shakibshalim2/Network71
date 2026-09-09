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
          <div className="bg-navy border border-white/8 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group hover:border-gold/30 transition-colors duration-300">
            <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gold/5 blur-2xl pointer-events-none group-hover:bg-gold/8 transition-colors duration-300" />
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gold text-[10.5px] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-widest uppercase mb-3">{c.vision.label}</p>
            <h3 className="font-display text-xl sm:text-2xl text-white mb-3 sm:mb-4">{c.vision.title}</h3>
            <p className="text-slate-400 leading-relaxed text-[14px] sm:text-base">{c.vision.text}</p>
          </div>
          <div className="bg-navy border border-white/8 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group hover:border-gold/30 transition-colors duration-300">
            <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-teal/5 blur-2xl pointer-events-none group-hover:bg-teal/8 transition-colors duration-300" />
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <p className="text-gold text-[10.5px] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-widest uppercase mb-3">{c.mission.label}</p>
            <h3 className="font-display text-xl sm:text-2xl text-white mb-3 sm:mb-4">{c.mission.title}</h3>
            <p className="text-slate-400 leading-relaxed text-[14px] sm:text-base">{c.mission.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
