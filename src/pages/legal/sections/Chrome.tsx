import type { ReactNode } from 'react'
import PageHero from '@/components/PageHero'
import type { LegalContent } from '../content/en'
import { ARTICLE_ICONS, MailIcon } from '../icons'
import { useCompanySettings } from '@/lib/companySettings'
import { motion, useReducedMotion } from 'motion/react'
import { springSoft } from '@/lib/motion'

export function Hero({ c }: { c: LegalContent['hero'] }) {
  return (
    <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead}>
      <p className="text-[13px]" style={{ color: 'var(--fg-subtle)', marginTop: -8 }}>{c.updated}</p>
    </PageHero>
  )
}

export function Toc({ c, active, onSelect }: { c: LegalContent['toc']; active: string; onSelect: (id: string) => void }) {
  const { legalEmail } = useCompanySettings()
  const reduce = useReducedMotion()
  return (
    <aside className="w-full lg:w-60 flex-shrink-0">
      <nav aria-label={c.ariaLabel} className="lg:sticky lg:top-24 ltoc">
        <p className="ltoc__head">{c.heading}</p>
        <ol className="ltoc__list">
          {c.items.map((s, i) => {
            const on = active === s.id
            return (
              <li key={s.id}>
                <button
                  aria-current={on ? "location" : undefined}
                  onClick={() => onSelect(s.id)}
                  className={`ltoc__row${on ? ' is-active' : ''}`}
                >
                  {on && <motion.span layoutId="ltoc-bar" className="ltoc__bar" transition={reduce ? { duration: 0 } : springSoft} />}
                  <span className="ltoc__idx font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ltoc__label">{s.label}</span>
                </button>
              </li>
            )
          })}
        </ol>
        <div className="pt-5 border-t border-white/8 mt-5">
          <a
            href={`mailto:${legalEmail}`}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-gold transition-colors"
          >
            {MailIcon}
            {c.inquiries}
          </a>
        </div>
      </nav>
    </aside>
  )
}

const ORDER = ['privacy', 'terms', 'cookies', 'compliance']

/** Ledger article header: numeral, drawn accent rule, mono section counter — shared by all four legal articles. */
export function ArticleHead({ id, title }: { id: string; title: string }) {
  const { icon } = ARTICLE_ICONS[id]
  const n = ORDER.indexOf(id) + 1
  return (
    <div className="lart__head">
      <span className="lart__rule" aria-hidden="true" />
      <div className="lart__meta">
        <span className="lart__icon" aria-hidden="true">{icon}</span>
        <span className="font-mono">Section {String(n).padStart(2, '0')} / {String(ORDER.length).padStart(2, '0')}</span>
      </div>
      <h2 className="font-display lart__title">
        <span className="lart__num font-display" aria-hidden="true">{String(n).padStart(2, '0')}</span>
        {title}
      </h2>
    </div>
  )
}

export function ClauseHeading({ children, tight = false }: { children: ReactNode; tight?: boolean }) {
  return <h3 className={`lart__clause ${tight ? 'mt-6' : 'mt-8'} mb-3`}>{children}</h3>
}

export function Contact({ c }: { c: LegalContent['contact'] }) {
  const { legalEmail } = useCompanySettings()
  return (
    <div className="cta-band cta-band--flush">
      <span className="cta-band__rule" aria-hidden="true" />
      <div>
        <h2 className="font-display text-white mb-3 tracking-[-0.02em]" style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>{c.title}</h2>
        <p className="text-slate-400" style={{ fontSize: 'clamp(14.5px, 3.6vw, 16px)', maxWidth: '44ch' }}>{c.text}</p>
      </div>
      <a href={`mailto:${legalEmail}`} className="btn btn-primary">
        {legalEmail}
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
      </a>
    </div>
  )
}
