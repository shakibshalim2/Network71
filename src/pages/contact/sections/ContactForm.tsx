import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useInquiry } from '@/lib/inquiry'
import type { ContactContent } from '../content/en'

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  department: string
  message: string
}

const INPUT = 'w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors'
const LABEL = 'block text-xs text-slate-400 mb-2 font-medium'

export default function ContactForm({ c }: { c: ContactContent['form'] }) {
  const [params] = useSearchParams()
  const project = params.get('project')?.slice(0, 200)
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    department: 'General',
    message: project ? c.projectPrefill.replace('{project}', project) : '',
  })
  const inquiry = useInquiry()
  const sent = Boolean(inquiry.reference)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void inquiry.submit({ ...form, subject: `${form.department} ${c.subjectSuffix}` })
  }

  return (
    <div className="lg:col-span-3">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-gold" />
          <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">{c.eyebrow}</span>
        </div>
        <h2 className="font-display text-4xl text-white tracking-[-0.02em]">{c.title}</h2>
      </div>

      {sent ? (
        <div role="status" className="bg-navy-dark border border-gold/20 rounded-2xl p-12 text-center">
          <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="font-display text-2xl text-white mb-3">{c.successTitle}</h3>
          <p className="text-slate-400 text-sm">
            {c.successText.replace('{ref}', String(inquiry.reference))}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {inquiry.error && <p role="alert" className="text-sm" style={{ color: 'var(--accent-red)' }}>{inquiry.error}</p>}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-name" className={LABEL}>{c.name}</label>
              <input
                name="name" id="contact-name"
                required
                value={form.name}
                onChange={handleChange}
                className={INPUT}
                placeholder={c.namePh}
              />
            </div>
            <div>
              <label htmlFor="contact-company" className={LABEL}>{c.company}</label>
              <input
                name="company" id="contact-company"
                value={form.company}
                onChange={handleChange}
                className={INPUT}
                placeholder={c.companyPh}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-email" className={LABEL}>{c.email}</label>
              <input
                name="email" id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className={INPUT}
                placeholder={c.emailPh}
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className={LABEL}>{c.phone}</label>
              <input
                name="phone" id="contact-phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className={INPUT}
                placeholder={c.phonePh}
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-department" className={LABEL}>{c.department}</label>
            <select
              name="department" id="contact-department"
              required
              value={form.department}
              onChange={handleChange}
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
            >
              {c.departments.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="contact-message" className={LABEL}>{c.message}</label>
            <textarea
              name="message" id="contact-message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className={`${INPUT} resize-none`}
              placeholder={c.messagePh}
            />
          </div>
          <button
            type="submit"
            disabled={inquiry.busy}
            className="w-full py-3.5 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
          >
            {inquiry.busy ? c.sending : c.send}
          </button>
        </form>
      )}
    </div>
  )
}
