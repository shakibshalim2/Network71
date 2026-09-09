import type { AboutContent } from '../content/en'

export default function Quote({ c }: { c: AboutContent['quote'] }) {
  return (
    <section className="bg-navy section-y relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/4 blur-3xl pointer-events-none"
        style={{ width: 'min(600px, 110vw)', aspectRatio: '1' }}
      />
      <div className="relative container-page max-w-4xl text-center">
        <div
          className="font-display leading-none text-gold select-none"
          style={{ fontSize: 'clamp(72px, 16vw, 120px)', marginBottom: 'clamp(-2rem, -3vw, -1rem)' }}
          aria-hidden="true"
        >
          &ldquo;
        </div>
        <blockquote
          className="font-display text-white leading-snug mb-7 sm:mb-10 text-balance"
          style={{ fontSize: 'clamp(19px, 5vw, 36px)' }}
        >
          {c.text}
        </blockquote>
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
            <span className="text-gold font-display text-base sm:text-lg">{c.initial}</span>
          </div>
          <div className="text-left">
            <p className="text-white font-semibold text-[13px] sm:text-sm">{c.name}</p>
            <p className="text-gold text-[11px] sm:text-xs tracking-wide">{c.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
