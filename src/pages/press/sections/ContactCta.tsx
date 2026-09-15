import type { PressContent } from '../content/en'
import { useCompanySettings } from '@/lib/companySettings'

export default function ContactCta({ c }: { c: PressContent['contact'] }) {
  const { pressEmail } = useCompanySettings()
  return (
    <section className="bg-navy-dark py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 cta-band">
        <span className="cta-band__rule" aria-hidden="true" />
        <div>
          <p className="public-eyebrow" style={{ marginBottom: 12 }}><span className="eyebrow-rule" />{c.eyebrow}</p>
          <h2 className="font-display text-white mb-3 tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 5vw, 44px)' }}>{c.title}</h2>
          <p className="text-slate-400" style={{ fontSize: 'clamp(14.5px, 3.6vw, 17px)', maxWidth: '44ch' }}>{c.lead}</p>
        </div>
        <a href={`mailto:${pressEmail}`} className="btn btn-primary">
          {pressEmail}
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
        </a>
      </div>
    </section>
  )
}
