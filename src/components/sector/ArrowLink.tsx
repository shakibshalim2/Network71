import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface ArrowLinkProps {
  to: string
  color: string
  children: ReactNode
  className?: string
}

/** Text link with trailing arrow; uses <a> for hash anchors and <Link> for routes. */
export default function ArrowLink({ to, color, children, className = '' }: ArrowLinkProps) {
  const cls = `inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80 ${className}`
  const arrow = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
  if (to.startsWith('#')) {
    return <a href={to} className={cls} style={{ color }}>{children}{arrow}</a>
  }
  return <Link to={to} className={cls} style={{ color }}>{children}{arrow}</Link>
}
