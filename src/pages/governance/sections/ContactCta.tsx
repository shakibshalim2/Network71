import type { GovernanceContent } from '../content/en'

export default function ContactCta({ c }: { c: GovernanceContent['contact'] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-navy-light border border-white/8 rounded-2xl">
        <div>
          <h3 className="text-white font-semibold text-lg mb-1">{c.title}</h3>
          <p className="text-slate-400 text-sm">{c.lead}</p>
        </div>
        <a
          href={`mailto:${c.email}`}
          className="flex-shrink-0 px-6 py-3 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
        >
          {c.email}
        </a>
      </div>
    </section>
  )
}
