import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import type { BlogContent } from '../content/en'
import { useInquiry } from '@/lib/inquiry'
import { EASE_OUT } from '@/lib/motion'

/** Subscribe band: floating-label email, busy progress, inline REF pill on success. */
export default function Subscribe({ c }: { c: BlogContent['subscribe'] }) {
  const [email, setEmail] = useState('')
  const inquiry = useInquiry()
  const reduce = useReducedMotion()
  return (
    <section className="bg-navy-dark py-20 cf sub">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 cta-band sub__band">
        <span className="cta-band__rule" aria-hidden="true" />
        <div>
          <p className="public-eyebrow" style={{ marginBottom: 12 }}><span className="eyebrow-rule" />{c.mailFieldLabel}</p>
          <h2 className="font-display text-white mb-3 tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 5vw, 44px)' }}>{c.title}</h2>
          <p className="text-slate-400" style={{ fontSize: 'clamp(14.5px, 3.6vw, 17px)', maxWidth: '44ch' }}>{c.text}</p>
        </div>
        <div className="sub__side">
          <AnimatePresence mode="wait" initial={false}>
            {inquiry.reference ? (
              <motion.p key="ok" role="status" className="cf__ref sub__ok" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_OUT }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                <span>{c.success.replace('{ref}', '').replace(/[:：]\s*$/, '')}</span>
                <strong>{inquiry.reference}</strong>
              </motion.p>
            ) : (
              <motion.form
                key="form"
                className="sub__form"
                initial={false}
                exit={reduce ? undefined : { opacity: 0, y: -8, transition: { duration: 0.25 } }}
                onSubmit={(event) => {
                  event.preventDefault()
                  void inquiry.submit({ name: email, email, subject: c.mailSubject, message: `${c.mailFieldLabel}: ${email}` })
                }}
              >
                <div className={`cf__field sub__field${email ? ' has-value' : ''}`}>
                  <input id="sub-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="cf__input" placeholder=" " autoComplete="email" inputMode="email" />
                  <label htmlFor="sub-email" className="cf__label">{c.placeholder}</label>
                  <span className="cf__line" aria-hidden="true" />
                </div>
                <button type="submit" disabled={inquiry.busy} className={`btn btn-primary cf__submit sub__btn${inquiry.busy ? ' is-busy' : ''}`}>
                  <span>{inquiry.busy ? c.sending : c.button}</span>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  <span className="cf__submit-progress" aria-hidden="true" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          {inquiry.error && <p role="alert" className="cf__error" style={{ marginTop: 10 }}>{inquiry.error}</p>}
          <p className="sub__note">{c.note}</p>
        </div>
      </div>
    </section>
  )
}
