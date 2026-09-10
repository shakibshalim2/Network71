import { Link } from "react-router-dom"

import type { CareersContent } from "../content/en"

export default function Hero({
  c,
  onApply,
}: {
  c: CareersContent["hero"]
  onApply: () => void
}) {
  return (
    <section className="relative bg-navy pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link to="/" className="hover:text-gold transition-colors">
            {c.breadcrumbHome}
          </Link>
          <span>/</span>
          <span className="text-slate-400">{c.breadcrumbCurrent}</span>
        </div>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-12 bg-gold" />
          <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">
            {c.eyebrow}
          </span>
        </div>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-3xl">
          {c.title}
        </h1>
        <p className="text-slate-300 text-xl max-w-xl leading-relaxed">
          {c.lead}
        </p>
        <div className="mt-10">
          <button
            type="button"
            onClick={onApply}
            className="inline-flex items-center px-8 py-3.5 bg-gold text-on-brand text-sm font-semibold rounded hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
          >
            {c.cta}
          </button>
        </div>
      </div>
    </section>
  )
}
