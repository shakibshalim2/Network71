import type { PressContent } from '../content/en'

export default function Hero({ c }: { c: PressContent['hero'] }) {
  return (
    <section className="relative pt-[68px] overflow-hidden bg-navy-dark">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-teal/8 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-gold" />
          <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">{c.eyebrow}</span>
        </div>
        <h1 className="font-display text-5xl lg:text-6xl text-white mb-5">{c.title}</h1>
        <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
          {c.lead}
        </p>
      </div>
    </section>
  )
}
