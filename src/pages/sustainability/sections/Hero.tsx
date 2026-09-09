import type { SustainabilityContent } from '../content/en'

export default function Hero({ c }: { c: SustainabilityContent['hero'] }) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-[68px] bg-navy-dark">
      <div className="dot-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-dark/50 to-navy-dark" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          {c.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-[-0.02em]">
          {c.title}
        </h1>
        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">{c.lead}</p>
      </div>
    </section>
  )
}
