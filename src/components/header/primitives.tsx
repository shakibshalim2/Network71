import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { IconChevron } from './icons'
import { springSnappy, EASE_OUT } from '@/lib/motion'

// ─── Nav link (desktop) ───────────────────────────────────────────────────────

export function NavLink({ href, children, active }: { href: string; children: ReactNode; active: boolean }) {
  const content = (
    <>
      <span className="nav-link__label">{children}</span>
      {active && (
        <motion.span
          layoutId="nav-active-indicator"
          className="nav-link__indicator"
          transition={springSnappy}
        />
      )}
    </>
  )
  const cls = `nav-link${active ? ' is-active' : ''}`
  if (/^https?:\/\//.test(href)) return <a href={href} className={cls}>{content}</a>
  return (
    <Link to={href} aria-current={active ? 'page' : undefined} className={cls}>
      {content}
    </Link>
  )
}

// ─── Icon button (shared for Search, etc.) ────────────────────────────────────

export function IconBtn({
  label, onClick, children,
}: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="icon-btn"
      whileTap={{ scale: 0.92 }}
      transition={springSnappy}>
      {children}
    </motion.button>
  )
}

// ─── Mobile helper components ─────────────────────────────────────────────────

export function MobileLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  const cls = `mobile-link${active ? ' is-active' : ''}`
  const content = <>{children}{active && <span className="mobile-link__dot" />}</>
  if (/^https?:\/\//.test(href)) return <a href={href} className={cls}>{content}</a>
  return <Link to={href} className={cls}>{content}</Link>
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
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={`mobile-accordion__trigger${expanded ? ' is-open' : ''}`}>
        {label}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={springSnappy}
          style={{ display: 'inline-flex' }}>
          <IconChevron down size={11} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.3, ease: EASE_OUT }, opacity: { duration: 0.2 } }}
            style={{ overflow: 'hidden' }}>
            <div style={{ paddingLeft: 6, paddingBottom: 6 }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
