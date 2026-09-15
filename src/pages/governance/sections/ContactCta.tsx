import type { GovernanceContent } from '../content/en'
import { useCompanySettings } from '@/lib/companySettings'

export default function ContactCta({ c }: { c: GovernanceContent['contact'] }) {
  const { legalEmail } = useCompanySettings()
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="cta-band cta-band--flush">
        <span className="cta-band__rule" aria-hidden="true" />
        <div>
          <h2 className="font-display text-white mb-3 tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 5vw, 44px)' }}>{c.title}</h2>
          <p className="text-slate-400" style={{ fontSize: 'clamp(14.5px, 3.6vw, 17px)', maxWidth: '44ch' }}>{c.lead}</p>
        </div>
        <a
          href={`mailto:${legalEmail}`}
          className="btn btn-primary flex-shrink-0"
        >
          {legalEmail}
        </a>
      </div>
    </section>
  )
}
