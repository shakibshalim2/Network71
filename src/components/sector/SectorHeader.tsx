import { Link } from 'react-router-dom'
import Logo from '@/components/brand/Logo'
import { ThemeToggleButton } from '@/components/ThemeToggle'

interface SectorHeaderProps {
  divisionName: string
  accentClass?: string
}

export default function SectorHeader({ divisionName, accentClass = 'text-gold' }: SectorHeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: 'var(--header-bg)', borderBottom: '1px solid var(--line)' }}>
      <div className="container-page h-[var(--header-h)] flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center" aria-label="Network71 — Home">
          <Logo variant="auto" height={22} />
        </Link>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="hidden lg:flex min-w-0 items-center gap-2 font-mono text-xs text-fg-muted">
          <Link to="/" className="hover:text-slate-400 transition-colors">Network71</Link>
          <span>/</span>
          <span className="text-slate-500">Business</span>
          <span>/</span>
          <span aria-current="page" className={`${accentClass} truncate`}>{divisionName}</span>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
          <ThemeToggleButton size={40} />
          <Link to="/" className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-slate-500 hover:text-white transition-colors">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Network71
          </Link>
          <a href="#sector-contact"
            className="inline-flex items-center justify-center min-h-11 px-3 sm:px-4 text-xs font-semibold rounded-lg transition-all duration-150"
            style={{ background: 'var(--brand-bright)', color: 'var(--fg-onbrand)' }}>
            <span className="sm:hidden">Enquire</span><span className="hidden sm:inline">Contact Division</span>
          </a>
        </div>
      </div>
    </header>
  )
}
