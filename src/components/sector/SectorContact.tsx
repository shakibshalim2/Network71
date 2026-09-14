import { useSearchParams } from "react-router-dom"
import { useState } from 'react'
import { useInquiry } from '@/lib/inquiry'
import { useT } from '@/i18n'
import { useCompanySettings } from '@/lib/companySettings'

interface SectorContactProps {
  divisionName: string
  accentHex: string
  inquiryTypes?: string[]
}

export default function SectorContact({
  divisionName,
  accentHex,
  inquiryTypes = ['General Inquiry', 'Partnership', 'Buyer Inquiry', 'Investment', 'Supplier Inquiry'],
}: SectorContactProps) {
  const { t } = useT()
  const settings = useCompanySettings()
  const [params] = useSearchParams()
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', type: '', message: params.get('requirements')?.slice(0, 2000) || '' })
  const inquiry = useInquiry()
  const sent = Boolean(inquiry.reference)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    void inquiry.submit({ ...form, subject: `${divisionName}: ${form.type || 'General enquiry'}` })
  }

  const inputCls =
    'w-full px-4 py-3.5 rounded-[10px] text-[15px] bg-surface-2 border border-line-strong text-fg placeholder:text-fg-faint focus:outline-none focus:border-[var(--brand-edge)] focus:ring-2 focus:ring-[var(--brand-wash)] transition-colors'

  return (
    <section id="sector-contact" className="bg-navy-dark section-y">
      <div className="container-page">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:gap-16 items-start">
          {/* Left — contact info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: accentHex }} />
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: accentHex }}>
                {t('sector.contact.eyebrow')}
              </span>
            </div>
            <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.08] tracking-[-0.025em] text-white mb-5">
              {t('sector.contact.title', { division: divisionName })}
            </h2>
            <p className="text-slate-400 leading-[1.75] mb-10 text-[15px] sm:text-base max-w-md">
              {t('sector.contact.lead', { division: divisionName })}
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `color-mix(in srgb, ${accentHex} 9%, transparent)`, border: `1px solid color-mix(in srgb, ${accentHex} 19%, transparent)` }}>
                  <svg className="w-4 h-4" style={{ color: accentHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium text-[15px]">{t('sector.contact.email')}</div>
                  <a href={`mailto:${settings.generalEmail}`} className="text-slate-400 text-[14px] hover:text-white transition-colors">{settings.generalEmail}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `color-mix(in srgb, ${accentHex} 9%, transparent)`, border: `1px solid color-mix(in srgb, ${accentHex} 19%, transparent)` }}>
                  <svg className="w-4 h-4" style={{ color: accentHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium text-[15px]">{t('sector.contact.hq')}</div>
                  <div className="text-slate-400 text-[14px]">{settings.operatingAddress || t('sector.contact.hqValue')}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `color-mix(in srgb, ${accentHex} 9%, transparent)`, border: `1px solid color-mix(in srgb, ${accentHex} 19%, transparent)` }}>
                  <svg className="w-4 h-4" style={{ color: accentHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium text-[15px]">{t('sector.contact.web')}</div>
                  <a href={settings.website} className="text-slate-400 text-[14px] hover:text-white transition-colors">{settings.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: `color-mix(in srgb, ${accentHex} 13%, transparent)` }}>
                  <svg className="w-8 h-8" style={{ color: accentHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-display text-2xl mb-3">{t('sector.contact.received')}</h3>
                <p className="text-slate-400 text-sm max-w-xs">{t('sector.contact.thanks', { division: divisionName, ref: inquiry.reference })}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4 rounded-2xl p-5 sm:p-7 lg:p-8" style={{ background: 'var(--fill-1)', border: '1px solid var(--line)' }}>
                {inquiry.error && <p role="alert" className="text-sm" style={{ color: 'var(--accent-red)' }}>{inquiry.error}</p>}
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="text-[13.5px] text-slate-400"><span className="block mb-2 font-medium">{t('sector.form.name')}</span><input className={inputCls} aria-label={t('sector.form.namePh')} name="name" placeholder={t('sector.form.namePh')} value={form.name} onChange={handle} required /></label>
                  <label className="text-[13.5px] text-slate-400"><span className="block mb-2 font-medium">{t('sector.form.company')}</span><input className={inputCls} aria-label={t('sector.form.company')} name="company" placeholder={t('sector.form.companyPh')} value={form.company} onChange={handle} /></label>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="text-[13.5px] text-slate-400"><span className="block mb-2 font-medium">{t('sector.form.email')}</span><input className={inputCls} aria-label={t('sector.form.emailPh')} type="email" name="email" placeholder={t('sector.form.emailPh')} value={form.email} onChange={handle} required /></label>
                  <label className="text-[13.5px] text-slate-400"><span className="block mb-2 font-medium">{t('sector.form.phone')}</span><input className={inputCls} aria-label={t('sector.form.phone')} type="tel" name="phone" placeholder={t('sector.form.phonePh')} value={form.phone} onChange={handle} /></label>
                </div>
                <label className="text-[13.5px] text-slate-400"><span className="block mb-2 font-medium">{t('sector.form.type')}</span>
                <select className={inputCls} aria-label={t('sector.form.type')} name="type" value={form.type} onChange={handle}>
                  <option value="" disabled>{t('sector.form.type')}</option>
                  {inquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                </label>
                <label className="text-[13.5px] text-slate-400"><span className="block mb-2 font-medium">{t('sector.form.details')}</span>
                <textarea
                  className={`${inputCls} resize-none`}
                  aria-label={t('sector.form.details')}
                  name="message"
                  placeholder={t('sector.form.detailsPh')}
                  rows={5}
                  value={form.message}
                  onChange={handle}
                  required
                />
                </label>
                <button
                  type="submit"
                  disabled={inquiry.busy}
                  className="btn w-full text-navy hover:-translate-y-px hover:opacity-95"
                  style={{ background: accentHex, boxShadow: `0 10px 28px -12px ${accentHex}` }}
                >
                  {inquiry.busy ? t('sector.form.sending') : t('sector.form.send')}
                </button>
                <p className="text-slate-500 text-[13px] text-center leading-relaxed">
                  {t('sector.form.privacy')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
