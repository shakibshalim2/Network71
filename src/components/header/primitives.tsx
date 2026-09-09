import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { IconChevron } from './icons'

// ─── Nav link (desktop) ───────────────────────────────────────────────────────

export function NavLink({ href, children, active }: { href: string; children: ReactNode; active: boolean }) {
  return (
    <Link to={href} aria-current={active ? 'page' : undefined} style={{
      fontSize: 13, fontWeight: 500, letterSpacing: '0.01em', minHeight: 44, display: 'inline-flex', alignItems: 'center',
      color: active ? 'var(--brand)' : 'var(--fg-muted)',
      textDecoration: 'none', position: 'relative', paddingBottom: 2,
      transition: 'color 0.15s', whiteSpace: 'nowrap',
    }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--fg-strong)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--fg-muted)' }}>
      {children}
      {active && (
        <span style={{
          position: 'absolute', bottom: -2, left: 0, right: 0, height: 1.5,
          background: 'linear-gradient(90deg,var(--brand),var(--brand-bright) 60%,transparent)',
          borderRadius: 1,
        }} />
      )}
    </Link>
  )
}

// ─── Icon button (shared for Search, etc.) ────────────────────────────────────

export function IconBtn({
  label, onClick, children,
}: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        width: 40, height: 40, borderRadius: 10, border: 'none',
        background: 'transparent', color: 'var(--fg-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'color 0.15s, background 0.15s', flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg-strong)'; e.currentTarget.style.background = 'var(--line-strong)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.background = 'transparent' }}>
      {children}
    </button>
  )
}

// ─── Mobile helper components ─────────────────────────────────────────────────

export function MobileLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      to={href}
      style={{
        display: 'flex', alignItems: 'center',
        padding: '12px 12px', borderRadius: 9,
        fontSize: 14.5, fontWeight: 500, textDecoration: 'none',
        color: active ? 'var(--brand)' : 'var(--fg-muted)',
        background: active ? 'var(--brand-wash)' : 'transparent',
        transition: 'all 0.14s',
      }}>
      {children}
      {active && (
        <span style={{
          marginLeft: 'auto', width: 5, height: 5,
          borderRadius: '50%', background: 'var(--brand)', flexShrink: 0,
        }} />
      )}
    </Link>
  )
}

export function MobileAccordion({ label, expanded, onToggle, children }: {
  label: string
  expanded: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 12px', borderRadius: 9, border: 'none',
          fontSize: 14.5, fontWeight: 500, color: 'var(--fg-muted)',
          background: expanded ? 'var(--fill-1)' : 'transparent',
          cursor: 'pointer', transition: 'all 0.14s',
        }}>
        {label}
        <IconChevron down={!expanded} size={11} />
      </button>

      {/* Animated accordion body */}
      <div inert={!expanded} style={{
        overflow: 'hidden',
        maxHeight: expanded ? 600 : 0,
        opacity: expanded ? 1 : 0,
        transition: 'max-height 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.22s',
      }}>
        <div style={{ paddingLeft: 6, paddingBottom: 6 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
