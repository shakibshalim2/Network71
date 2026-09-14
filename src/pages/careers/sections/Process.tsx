import type { CareersContent } from '../content/en'

export default function Process({ c }: { c: CareersContent['process'] }) {
  return (
    <section className="bg-navy-dark py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium">
              {c.eyebrow}
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">
            {c.title}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.steps.map((s, i) => (
            <div
              key={s.step}
              className="relative bg-navy border border-white/8 rounded-2xl p-8 hover:border-gold/25 transition-colors duration-300"
            >
              {i < c.steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/20 z-10" />
              )}
              <div className="font-display text-5xl text-gold leading-none mb-4">
                {s.step}
              </div>
              <h3 className="font-display text-lg text-white mb-2">
                {s.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
