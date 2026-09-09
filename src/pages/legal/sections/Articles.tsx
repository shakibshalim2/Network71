import { Fragment } from 'react'
import type { LegalContent } from '../content/en'
import { ArticleHead, ClauseHeading } from './Chrome'

function MailLink({ email }: { email: string }) {
  return <a href={`mailto:${email}`} className="text-gold hover:underline">{email}</a>
}

export function Privacy({ c }: { c: LegalContent['privacy'] }) {
  return (
    <article id="privacy" className="scroll-mt-24">
      <ArticleHead id="privacy" title={c.title} />
      <div className="prose prose-invert prose-sm max-w-none space-y-5 text-slate-300 leading-relaxed">
        <p>
          {c.intro}
        </p>

        <ClauseHeading>{c.collect.heading}</ClauseHeading>
        <p>
          {c.collect.p1}
        </p>
        <p>
          {c.collect.p2}
        </p>

        <ClauseHeading>{c.use.heading}</ClauseHeading>
        <p>{c.use.lead}</p>
        <ul className="list-disc list-inside space-y-1.5 text-slate-400 ml-2">
          {c.use.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          {c.use.after}
        </p>

        <ClauseHeading>{c.retention.heading}</ClauseHeading>
        <p>
          {c.retention.before}<MailLink email={c.retention.email} />{c.retention.after}
        </p>

        <ClauseHeading>{c.rights.heading}</ClauseHeading>
        <p>
          {c.rights.before}<MailLink email={c.rights.email} />{c.rights.after}
        </p>

        <ClauseHeading>{c.security.heading}</ClauseHeading>
        <p>
          {c.security.text}
        </p>

        <ClauseHeading>{c.transfers.heading}</ClauseHeading>
        <p>
          {c.transfers.text}
        </p>
      </div>
    </article>
  )
}

export function Terms({ c }: { c: LegalContent['terms'] }) {
  return (
    <article id="terms" className="scroll-mt-24">
      <ArticleHead id="terms" title={c.title} />
      <div className="space-y-5 text-slate-300 leading-relaxed">
        <p>
          {c.intro}
        </p>
        {c.clauses.map((clause) => (
          <Fragment key={clause.heading}>
            <ClauseHeading>{clause.heading}</ClauseHeading>
            <p>
              {clause.text}
            </p>
          </Fragment>
        ))}
      </div>
    </article>
  )
}

export function Cookies({ c }: { c: LegalContent['cookies'] }) {
  return (
    <article id="cookies" className="scroll-mt-24">
      <ArticleHead id="cookies" title={c.title} />
      <div className="space-y-5 text-slate-300 leading-relaxed">
        <p>
          {c.intro}
        </p>

        <ClauseHeading tight>{c.what.heading}</ClauseHeading>
        <p>
          {c.what.text}
        </p>

        <ClauseHeading tight>{c.types.heading}</ClauseHeading>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          {c.types.items.map((t) => (
            <div key={t.type} className="bg-navy-light border border-white/8 rounded-lg p-4">
              <h4 className="text-white font-semibold text-sm mb-1.5">{t.type}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <ClauseHeading tight>{c.managing.heading}</ClauseHeading>
        <p>
          {c.managing.before}<span className="text-gold">{c.managing.link}</span>{c.managing.after}
        </p>
      </div>
    </article>
  )
}

export function Compliance({ c }: { c: LegalContent['compliance'] }) {
  return (
    <article id="compliance" className="scroll-mt-24">
      <ArticleHead id="compliance" title={c.title} />
      <div className="flex flex-col items-center justify-center py-16 border border-dashed border-white/15 rounded-2xl bg-navy-light/30">
        <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-4">{c.badge}</span>
        <p className="text-white font-display text-2xl mb-2">{c.heading}</p>
        <p className="text-slate-400 text-sm max-w-sm text-center">
          {c.text}
        </p>
      </div>
    </article>
  )
}
