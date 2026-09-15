import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useInquiry } from '@/lib/inquiry'
import { EASE_OUT, springSoft } from '@/lib/motion'
import type { ContactContent } from '../content/en'

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  department: string
  message: string
}

const MESSAGE_MAX = 1200

/** Floating-label field: label sits inside, lifts on focus/value; accent underline draws on focus. */
function Field({ value, children, className = '' }: { value: string; children: ReactNode; className?: string }) {
  return (
    <div className={`cf__field${value ? ' has-value' : ''} ${className}`}>
      {children}
      <span className="cf__line" aria-hidden="true" />
    </div>
  )
}

export default function ContactForm({ c }: { c: ContactContent['form'] }) {
  const [params] = useSearchParams()
  const project = params.get('project')?.slice(0, 200)
  const reduce = useReducedMotion()
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'message' ? value.slice(0, MESSAGE_MAX) : value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    void inquiry.submit({ ...form, subject: `${form.department} ${c.subjectSuffix}` })
  }

  const strip = (s: string) => s.replace(/\s*\*\s*$/, '')
  const required = (s: string) => /\*\s*$/.test(s)
  const fieldLabel = (s: string) => (required(s) ? <>{strip(s)}<span className="cf__req" aria-hidden="true"> *</span></> : strip(s))

  return (
    <div className="lg:col-span-3 cf">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-gold" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium">{c.eyebrow}</span>
        </div>
        <h2 className="font-display text-4xl text-white tracking-[-0.02em]">{c.title}</h2>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            role="status"
            className="cf__success"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <span className="cf__success-mark" aria-hidden="true">
              <svg viewBox="0 0 100 100" className="cf__success-ring"><circle cx="50" cy="50" r="48" pathLength="1" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="cf__success-tick">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" pathLength="1" />
              </svg>
            </span>
            <div>
              <p className="public-eyebrow" style={{ marginBottom: 10 }}>{c.eyebrow}</p>
              <h3 className="font-display">{c.successTitle}</h3>
              <p>{c.successText.replace('{ref}', String(inquiry.reference))}</p>
              <span className="cf__ref">
                <span>REF</span>
                <strong>{String(inquiry.reference)}</strong>
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="cf__form"
            initial={false}
            exit={reduce ? undefined : { opacity: 0, y: -12, transition: { duration: 0.3 } }}
          >
            {inquiry.error && <p role="alert" className="cf__error">{inquiry.error}</p>}

            <div className="cf__grid">
              <Field value={form.name}>
                <input name="name" id="contact-name" required value={form.name} onChange={handleChange} className="cf__input" placeholder=" " autoComplete="name" />
                <label htmlFor="contact-name" className="cf__label">{fieldLabel(c.name)}</label>
              </Field>
              <Field value={form.company}>
                <input name="company" id="contact-company" value={form.company} onChange={handleChange} className="cf__input" placeholder=" " autoComplete="organization" />
                <label htmlFor="contact-company" className="cf__label">{fieldLabel(c.company)}</label>
              </Field>
              <Field value={form.email}>
                <input name="email" id="contact-email" type="email" required value={form.email} onChange={handleChange} className="cf__input" placeholder=" " autoComplete="email" inputMode="email" />
                <label htmlFor="contact-email" className="cf__label">{fieldLabel(c.email)}</label>
              </Field>
              <Field value={form.phone}>
                <input name="phone" id="contact-phone" type="tel" value={form.phone} onChange={handleChange} className="cf__input" placeholder=" " autoComplete="tel" inputMode="tel" />
                <label htmlFor="contact-phone" className="cf__label">{fieldLabel(c.phone)}</label>
              </Field>
            </div>

            {/* Department: segmented chips; the select remains for keyboard/AT and as the real form control */}
            <fieldset className="cf__dept">
              <legend className="cf__legend">{fieldLabel(c.department)}</legend>
              <div className="cf__chips" role="radiogroup" aria-label={strip(c.department)}>
                {c.departments.map((d) => {
                  const on = form.department === d.value
                  return (
                    <button
                      key={d.value}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      className={`cf__chip${on ? ' is-on' : ''}`}
                      onClick={() => setForm({ ...form, department: d.value })}
                    >
                      {on && <motion.span layoutId="cf-chip" className="cf__chip-bg" transition={reduce ? { duration: 0 } : springSoft} />}
                      <span>{d.label}</span>
                    </button>
                  )
                })}
              </div>
              <select name="department" id="contact-department" required value={form.department} onChange={handleChange} className="cf__select-sr" tabIndex={-1} aria-hidden="true">
                {c.departments.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </fieldset>

            <Field value={form.message} className="cf__field--area">
              <textarea name="message" id="contact-message" required rows={5} value={form.message} onChange={handleChange} className="cf__input cf__area" placeholder=" " maxLength={MESSAGE_MAX} />
              <label htmlFor="contact-message" className="cf__label">{fieldLabel(c.message)}</label>
              <span className="cf__count" aria-live="polite">
                <span style={{ color: form.message.length > MESSAGE_MAX * 0.9 ? 'var(--accent-amber)' : undefined }}>{form.message.length}</span> / {MESSAGE_MAX}
              </span>
            </Field>

            <div className="cf__actions">
              <button type="submit" disabled={inquiry.busy} className={`btn btn-primary cf__submit${inquiry.busy ? ' is-busy' : ''}`}>
                <span className="cf__submit-label">{inquiry.busy ? c.sending : c.send}</span>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="cf__submit-progress" aria-hidden="true" />
              </button>
              <span className="cf__hint">{strip(c.department)}: <strong>{c.departments.find((d) => d.value === form.department)?.label}</strong></span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
