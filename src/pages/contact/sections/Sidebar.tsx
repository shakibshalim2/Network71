import type { ContactContent } from '../content/en'
import { useCompanySettings } from '@/lib/companySettings'

export default function Sidebar({ c }: { c: ContactContent['sidebar'] }) {
  const settings = useCompanySettings()
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Offices */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-gold" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium">{c.officesEyebrow}</span>
        </div>
        <div className="space-y-4">
          <div className="bg-navy-dark border border-white/8 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-gold" />
              <span className="text-white text-sm font-semibold">{c.hqLabel}</span>
            </div>
            <p className="text-slate-400 text-sm">{settings.operatingAddress || c.hqCity}</p>
            <a href={`mailto:${settings.generalEmail}`} className="text-gold text-xs hover:underline mt-2 inline-block">
              {settings.generalEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Division contacts */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-gold" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium">{c.divisionsEyebrow}</span>
        </div>
        <div className="space-y-3">
          {c.divisions.map((division) => (
            <div key={division} className="flex items-center justify-between py-3 border-b border-white/6 last:border-0">
              <span className="text-slate-400 text-sm">{division}</span>
              <a
                href={`mailto:${settings.generalEmail}?subject=${encodeURIComponent(`${division} enquiry`)}`}
                className="text-gold text-xs hover:underline flex-shrink-0 ml-3"
              >
                {c.enquire}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
