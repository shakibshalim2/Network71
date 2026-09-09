import type { GalleryContent } from "../content/en"

export function Hero({ c }: { c: GalleryContent["hero"] }) {
  return (
    <section className="relative pt-[68px] overflow-hidden bg-navy-dark">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-gold" />
          <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">
            {c.eyebrow}
          </span>
        </div>
        <h1 className="font-display text-5xl lg:text-6xl text-white mb-5">
          {c.title}
        </h1>
        <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
          {c.lead}
        </p>
      </div>
    </section>
  )
}

export function ContributeCta({ c }: { c: GalleryContent["cta"] }) {
  return (
    <section className="bg-navy-dark border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-white font-semibold text-xl mb-2">
            {c.title}
          </h3>
          <p className="text-slate-400 text-sm max-w-md">
            {c.text}
          </p>
        </div>
        <a
          href="mailto:press@network71.com"
          className="flex-shrink-0 px-7 py-3 border border-gold/40 text-gold text-sm font-semibold rounded-lg hover:bg-gold/10 transition-colors"
        >
          {c.button}
        </a>
      </div>
    </section>
  )
}
