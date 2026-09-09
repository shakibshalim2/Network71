import type { AboutContent } from '../content/en'
import Eyebrow from './Eyebrow'

export default function Story({ c }: { c: AboutContent['story'] }) {
  return (
    <section className="bg-navy section-y">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Eyebrow label={c.eyebrow} />
            <h2
              className="font-display text-white mb-5 sm:mb-6 leading-tight tracking-[-0.02em]"
              style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}
            >
              {c.title}
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4 sm:mb-5 text-[14px] sm:text-base">{c.p1}</p>
            <p className="text-slate-400 leading-relaxed mb-4 sm:mb-5 text-[14px] sm:text-base">{c.p2}</p>
            <p className="text-slate-400 leading-relaxed text-[14px] sm:text-base">{c.p3}</p>
          </div>
          {/* `force-dark`: card stays dark in both themes so overlay text + photo remain legible */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl force-dark min-h-[340px] sm:min-h-[400px] lg:min-h-[420px]">
              <img
                src={c.imageSrc}
                alt={c.imageAlt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgb(4 8 14 / 0.90) 0%, rgb(4 8 14 / 0.78) 60%, rgb(4 8 14 / 0.58) 100%)' }}
              />
              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-4 gap-y-3 sm:gap-4">
                  {c.divisions.map((div) => (
                    <div key={div} className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                      <span className="text-slate-200 text-[13px] sm:text-sm">{div}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-white/12">
                  <p className="text-[10.5px] sm:text-xs text-slate-400 uppercase tracking-widest">{c.activeLabel}</p>
                  <p className="font-display text-3xl sm:text-4xl text-gold mt-1">{c.activeValue}</p>
                  <p className="text-slate-400 text-[10.5px] sm:text-xs mt-1">{c.activeSub}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
