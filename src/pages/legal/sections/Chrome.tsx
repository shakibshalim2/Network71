import type { ReactNode } from 'react'
import PageHero from '@/components/PageHero'
import type { LegalContent } from '../content/en'
import { ARTICLE_ICONS, MailIcon } from '../icons'
import { useCompanySettings } from '@/lib/companySettings'

export function Hero({ c }: { c: LegalContent['hero'] }) {
  return (
    <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead}>
      <p className="text-[13px]" style={{ color: 'var(--fg-subtle)', marginTop: -8 }}>{c.updated}</p>
    </PageHero>
  )
}

export function Toc({ c, active, onSelect }: { c: LegalContent['toc']; active: string; onSelect: (id: string) => void }) {
  const { legalEmail } = useCompanySettings()
  return (
    <aside className="w-full lg:w-56 flex-shrink-0">
      <nav aria-label={c.ariaLabel} className="lg:sticky lg:top-24 space-y-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">{c.heading}</p>
        {c.items.map((s) => (
          <button
            key={s.id}
            aria-current={active === s.id ? "location" : undefined}
            onClick={() => onSelect(s.id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors font-medium ${active === s.id ? 'bg-gold/10 text-gold border-l-2 border-gold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            {s.label}
          </button>
        ))}
        <div className="pt-6 border-t border-white/8 mt-6">
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

/** Article heading with icon badge — shared by all four legal articles. */
export function ArticleHead({ id, title }: { id: string; title: string }) {
  const { tone, icon } = ARTICLE_ICONS[id]
  const badge = tone === 'gold' ? 'bg-gold/10' : 'bg-teal/20'
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-8 h-8 rounded-lg ${badge} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <h2 className="font-display text-3xl text-white">{title}</h2>
    </div>
  )
}

export function ClauseHeading({ children, tight = false }: { children: ReactNode; tight?: boolean }) {
  return <h3 className={`text-white font-semibold text-lg ${tight ? 'mt-6' : 'mt-8'} mb-3`}>{children}</h3>
}

export function Contact({ c }: { c: LegalContent['contact'] }) {
  const { legalEmail } = useCompanySettings()
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-7 bg-navy-light border border-white/8 rounded-2xl">
      <div>
        <h3 className="text-white font-semibold text-lg mb-1">{c.title}</h3>
        <p className="text-slate-400 text-sm">{c.text}</p>
      </div>
      <a
        href={`mailto:${legalEmail}`}
        className="flex-shrink-0 px-6 py-3 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
      >
        {legalEmail}
      </a>
    </div>
  )
}
