import { useState } from 'react'
import { openEmailDraft } from '@/lib/mailto'
import type { BlogContent } from '../content/en'
import { useCompanySettings } from '@/lib/companySettings'

export default function Subscribe({ c }: { c: BlogContent['subscribe'] }) {
  const [email, setEmail] = useState('')
  const { generalEmail } = useCompanySettings()
  return (
    <section className="bg-navy-dark border-t border-white/8">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">{c.title}</h2>
        <p className="text-slate-400 text-base mb-8 max-w-md mx-auto">
          {c.text}
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(event) => {
            event.preventDefault()
            openEmailDraft(generalEmail, c.mailSubject, { [c.mailFieldLabel]: email })
            setEmail('')
          }}
        >
          <input
            type="email"
            aria-label={c.inputAria}
            required
            placeholder={c.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-navy border border-white/15 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold/50 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors flex-shrink-0"
          >
            {c.button}
          </button>
        </form>
        <p className="text-slate-500 text-xs mt-3">{c.note}</p>
      </div>
    </section>
  )
}
