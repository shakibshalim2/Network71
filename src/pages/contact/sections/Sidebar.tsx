import type { ContactContent } from '../content/en'
import { useCompanySettings } from '@/lib/companySettings'
import { useDhakaTime } from '@/lib/useDhakaTime'

export default function Sidebar({ c }: { c: ContactContent['sidebar'] }) {
  const settings = useCompanySettings()
  const time = useDhakaTime()
  return (
    <div className="lg:col-span-2 space-y-10 csb">
      {/* Offices */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-gold" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium">{c.officesEyebrow}</span>
        </div>
        <div className="csb__office">
          <div className="csb__office-head">
            <span className="csb__dot" aria-hidden="true" />
            <span className="csb__office-label">{c.hqLabel}</span>
            <span className="csb__clock" aria-live="off">
              <span>DHAKA</span>
              <strong>{time || '--:--'}</strong>
            </span>
          </div>
          <p className="csb__office-city font-display">{settings.operatingAddress || c.hqCity}</p>
          <a href={`mailto:${settings.generalEmail}`} className="csb__office-mail">
            {settings.generalEmail}
            <span aria-hidden="true">↗</span>
          </a>
          <span className="csb__office-mark font-display" aria-hidden="true">N71</span>
        </div>
      </div>

      {/* Division contacts → ledger rows */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-gold" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium">{c.divisionsEyebrow}</span>
        </div>
        <ol className="csb__ledger">
          {c.divisions.map((division, i) => (
            <li key={division}>
              <a
                href={`mailto:${settings.generalEmail}?subject=${encodeURIComponent(`${division} enquiry`)}`}
                className="csb__row"
              >
                <span className="csb__idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="csb__name">{division}</span>
                <span className="csb__cta">
                  {c.enquire}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
