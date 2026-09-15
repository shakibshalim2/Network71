import type { ReactNode } from 'react'

interface Props {
  kind: 'loading' | 'error' | 'empty'
  eyebrow?: string
  title: ReactNode
  text?: ReactNode
  actionLabel?: string
  onAction?: () => void
  className?: string
}

/** Editorial plate for CMS-driven sections: loading pulse, error with retry, or empty notice. */
export default function ContentState({ kind, eyebrow, title, text, actionLabel, onAction, className = '' }: Props) {
  return (
    <div className={`public-empty ${kind === 'loading' ? 'is-loading' : ''} ${className}`} role={kind === 'error' ? 'alert' : 'status'}>
      {eyebrow && <span className="public-eyebrow">{eyebrow}</span>}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {kind === 'loading' && <span className="jobs-pulse" aria-hidden="true"><span /><span /><span /></span>}
      {kind === 'error' && actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
      )}
    </div>
  )
}
