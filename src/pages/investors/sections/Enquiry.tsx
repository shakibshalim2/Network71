import { useState } from 'react'
import { openEmailDraft } from '@/lib/mailto'
import type { InvestorsContent } from '../content/en'
import Eyebrow from './Eyebrow'

type FormState = {
  name: string
  company: string
  email: string
  range: string
  inquiry: string
  message: string
}

const inputCls = 'w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors'
const selectCls = 'w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors'
const labelCls = 'block text-xs text-slate-400 mb-2 font-medium'

export default function Enquiry({ c, email }: { c: InvestorsContent['enquiry']; email: string }) {
  // Option values stay language-neutral so the generated email draft is consistent.
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    range: 'Not specified',
    inquiry: 'General Inquiry',
    message: '',
  })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    openEmailDraft(email, `Investor enquiry from ${form.name}`, {
      Name: form.name,
      Company: form.company,
      Email: form.email,
      'Investment range': form.range,
      'Inquiry type': form.inquiry,
      Message: form.message,
    })
    setSent(true)
  }

  const f = c.form

  return (
    <section className="bg-navy-dark py-24">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <Eyebrow label={c.eyebrow} center />
          <h2 className="font-display text-4xl text-white mb-3 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 text-sm mb-2">{c.lead}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-400">
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              {email}
            </a>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {c.direct}
            </span>
          </div>
        </div>

        {sent ? (
          <div className="bg-navy border border-gold/20 rounded-2xl p-12 text-center">
            <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-white mb-3">{c.sentTitle}</h3>
            <p className="text-slate-400 text-sm">{c.sentText}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-navy border border-white/8 rounded-2xl p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="investor-name" className={labelCls}>{f.name}</label>
                <input
                  name="name" id="investor-name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder={f.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="investor-company" className={labelCls}>{f.company}</label>
                <input
                  name="company" id="investor-company"
                  required
                  value={form.company}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder={f.companyPlaceholder}
                />
              </div>
            </div>
            <div>
              <label htmlFor="investor-email" className={labelCls}>{f.email}</label>
              <input
                name="email" id="investor-email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className={inputCls}
                placeholder={f.emailPlaceholder}
              />
            </div>
            <div>
              <label htmlFor="investor-range" className={labelCls}>{f.range}</label>
              <select
                name="range" id="investor-range"
                value={form.range}
                onChange={handleChange}
                className={selectCls}
              >
                {f.rangeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="investor-inquiry" className={labelCls}>{f.inquiry}</label>
              <select
                name="inquiry" id="investor-inquiry"
                required
                value={form.inquiry}
                onChange={handleChange}
                className={selectCls}
              >
                {f.inquiryOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="investor-message" className={labelCls}>{f.message}</label>
              <textarea
                name="message" id="investor-message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className={`${inputCls} resize-none`}
                placeholder={f.messagePlaceholder}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
            >
              {f.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
