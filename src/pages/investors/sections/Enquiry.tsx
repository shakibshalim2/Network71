import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useInquiry } from '@/lib/inquiry'
import { EASE_OUT, springSoft } from '@/lib/motion'
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

const MESSAGE_MAX = 1200

function Field({ value, children, className = '' }: { value: string; children: ReactNode; className?: string }) {
  return (
    <div className={`cf__field${value ? ' has-value' : ''} ${className}`}>
      {children}
      <span className="cf__line" aria-hidden="true" />
    </div>
  )
}

function Chips({
  name, legend, options, value, onChange, layoutId, reduce,
}: {
  name: string; legend: ReactNode; options: readonly { value: string; label: string }[]
  value: string; onChange: (v: string) => void; layoutId: string; reduce: boolean | null
}) {
  return (
    <fieldset className="cf__dept">
      <legend className="cf__legend">{legend}</legend>
      <div className="cf__chips" role="radiogroup">
        {options.map((o) => {
          const on = value === o.value
          return (
            <button key={o.value} type="button" role="radio" aria-checked={on} className={`cf__chip${on ? ' is-on' : ''}`} onClick={() => onChange(o.value)}>
              {on && <motion.span layoutId={layoutId} className="cf__chip-bg" transition={reduce ? { duration: 0 } : springSoft} />}
              <span>{o.label}</span>
            </button>
          )
        })}
      </div>
      <select name={name} value={value} onChange={(e) => onChange(e.target.value)} className="cf__select-sr" tabIndex={-1} aria-hidden="true">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </fieldset>
  )
}

export default function Enquiry({ c, email }: { c: InvestorsContent['enquiry']; email: string }) {
  const reduce = useReducedMotion()
  // Option values stay language-neutral so inbox records remain consistent across locales.
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    range: 'Not specified',
    inquiry: 'General Inquiry',
    message: '',
  })
  const inquiry = useInquiry()
  const f = c.form

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'message' ? value.slice(0, MESSAGE_MAX) : value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    void inquiry.submit({
      name: form.name,
      company: form.company,
      email: form.email,
      subject: `Investor enquiry: ${form.inquiry}`,
      message: `Investment range: ${form.range}\nInquiry type: ${form.inquiry}\n\n${form.message}`,
    })
  }

  const strip = (s: string) => s.replace(/\s*\*\s*$/, '')
  const label = (s: string) => (/\*\s*$/.test(s) ? <>{strip(s)}<span className="cf__req" aria-hidden="true"> *</span></> : strip(s))

  return (
    <section className="bg-navy-dark py-24 cf inv-enquiry">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="inv-enquiry__grid">
          <div className="inv-enquiry__intro">
            <Eyebrow label={c.eyebrow} />
            <h2 className="font-display text-4xl text-white mb-3 tracking-[-0.02em]">{c.title}</h2>
            <p className="text-slate-400 text-[15px] leading-relaxed mb-6" style={{ maxWidth: '38ch' }}>{c.lead}</p>
            <dl className="inv-enquiry__meta">
              <div>
                <dt>{c.direct}</dt>
                <dd><a href={`mailto:${email}`}>{email}<span aria-hidden="true">↗</span></a></dd>
              </div>
            </dl>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {inquiry.reference ? (
              <motion.div key="sent" role="status" className="cf__success" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT }}>
                <span className="cf__success-mark" aria-hidden="true">
                  <svg viewBox="0 0 100 100" className="cf__success-ring"><circle cx="50" cy="50" r="48" pathLength="1" /></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="cf__success-tick"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" pathLength="1" /></svg>
                </span>
                <div>
                  <p className="public-eyebrow" style={{ marginBottom: 10 }}>{c.eyebrow}</p>
                  <h3 className="font-display">{c.sentTitle}</h3>
                  <p>{c.sentText.replace('{ref}', String(inquiry.reference))}</p>
                  <span className="cf__ref"><span>REF</span><strong>{String(inquiry.reference)}</strong></span>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="cf__form inv-enquiry__form" initial={false} exit={reduce ? undefined : { opacity: 0, y: -12, transition: { duration: 0.3 } }}>
                {inquiry.error && <p role="alert" className="cf__error">{inquiry.error}</p>}
                <div className="cf__grid">
                  <Field value={form.name}>
                    <input name="name" id="investor-name" required value={form.name} onChange={handleChange} className="cf__input" placeholder=" " autoComplete="name" />
                    <label htmlFor="investor-name" className="cf__label">{label(f.name)}</label>
                  </Field>
                  <Field value={form.company}>
                    <input name="company" id="investor-company" required value={form.company} onChange={handleChange} className="cf__input" placeholder=" " autoComplete="organization" />
                    <label htmlFor="investor-company" className="cf__label">{label(f.company)}</label>
                  </Field>
                </div>
                <Field value={form.email}>
                  <input name="email" id="investor-email" type="email" required value={form.email} onChange={handleChange} className="cf__input" placeholder=" " autoComplete="email" inputMode="email" />
                  <label htmlFor="investor-email" className="cf__label">{label(f.email)}</label>
                </Field>
                <Chips name="inquiry" legend={label(f.inquiry)} options={f.inquiryOptions} value={form.inquiry} onChange={(v) => setForm({ ...form, inquiry: v })} layoutId="inv-inquiry" reduce={reduce} />
                <Chips name="range" legend={label(f.range)} options={f.rangeOptions} value={form.range} onChange={(v) => setForm({ ...form, range: v })} layoutId="inv-range" reduce={reduce} />
                <Field value={form.message} className="cf__field--area">
                  <textarea name="message" id="investor-message" required rows={5} value={form.message} onChange={handleChange} className="cf__input cf__area" placeholder=" " maxLength={MESSAGE_MAX} />
                  <label htmlFor="investor-message" className="cf__label">{label(f.message)}</label>
                  <span className="cf__count" aria-live="polite"><span>{form.message.length}</span> / {MESSAGE_MAX}</span>
                </Field>
                <div className="cf__actions">
                  <button type="submit" disabled={inquiry.busy} className={`btn btn-primary cf__submit${inquiry.busy ? ' is-busy' : ''}`}>
                    <span className="cf__submit-label">{inquiry.busy ? `${f.submit}…` : f.submit}</span>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    <span className="cf__submit-progress" aria-hidden="true" />
                  </button>
                  <span className="cf__hint">{strip(f.inquiry)}: <strong>{f.inquiryOptions.find((o) => o.value === form.inquiry)?.label}</strong></span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
