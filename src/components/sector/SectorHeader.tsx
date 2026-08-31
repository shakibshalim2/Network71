import { Link } from 'react-router-dom'
import Logo from '@/components/brand/Logo'

interface SectorHeaderProps {
  divisionName: string
  accentClass?: string
}

export default function SectorHeader({ divisionName, accentClass = 'text-gold' }: SectorHeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: 'rgba(4,8,14,0.95)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[60px] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center" aria-label="Network71 — Home">
          <Logo variant="primary-dark" height={22} />
        </Link>

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-slate-600">
          <Link to="/" className="hover:text-slate-400 transition-colors">Network71</Link>
          <span>/</span>
          <span className="text-slate-500">Business</span>
          <span>/</span>
          <span className={accentClass}>{divisionName}</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link to="/" className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-slate-500 hover:text-white transition-colors">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Network71
          </Link>
          <a href="#sector-contact"
            className="px-4 py-1.5 text-xs font-semibold rounded transition-all duration-150"
            style={{ background: '#C8962A', color: '#04080E' }}>
            Contact Division
          </a>
        </div>
      </div>
    </header>
  )
}
