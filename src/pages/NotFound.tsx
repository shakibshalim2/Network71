import { Link } from 'react-router-dom'
import Logo from '@/components/brand/Logo'

export default function NotFound() {
  return (
    <main className="public-content min-h-screen py-12 bg-navy flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-48 w-[600px] h-[600px] rounded-full bg-teal/8 blur-3xl pointer-events-none" />

      {/* Globe wireframe — decorative right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[480px] h-[480px] opacity-[0.12] hidden xl:block pointer-events-none translate-x-[35%]">
        <svg viewBox="0 0 560 560" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="280" cy="280" r="270" stroke="#E6B800" strokeWidth="0.6" />
          <ellipse cx="280" cy="280" rx="168" ry="270" stroke="#E6B800" strokeWidth="0.6" />
          <ellipse cx="280" cy="280" rx="84" ry="270" stroke="#E6B800" strokeWidth="0.5" />
          <line x1="10" y1="280" x2="550" y2="280" stroke="#E6B800" strokeWidth="0.5" />
          <ellipse cx="280" cy="186" rx="252" ry="52" stroke="#E6B800" strokeWidth="0.3" />
          <ellipse cx="280" cy="374" rx="252" ry="52" stroke="#E6B800" strokeWidth="0.3" />
          <ellipse cx="280" cy="120" rx="196" ry="34" stroke="#E6B800" strokeWidth="0.2" />
          <ellipse cx="280" cy="440" rx="196" ry="34" stroke="#E6B800" strokeWidth="0.2" />
          <ellipse cx="280" cy="280" rx="270" ry="74" stroke="#E6B800" strokeWidth="0.4" />
          <circle cx="280" cy="186" r="3.5" fill="#E6B800" opacity="0.8" />
          <circle cx="354" cy="260" r="3.5" fill="#E6B800" opacity="0.8" />
          <circle cx="224" cy="330" r="3" fill="#E6B800" opacity="0.6" />
          <circle cx="390" cy="300" r="3" fill="#E6B800" opacity="0.6" />
          <circle cx="196" cy="240" r="2.5" fill="#E6B800" opacity="0.5" />
          <circle cx="326" cy="140" r="2.5" fill="#E6B800" opacity="0.5" />
          <circle cx="420" cy="350" r="2" fill="#E6B800" opacity="0.4" />
          <line x1="280" y1="186" x2="354" y2="260" stroke="#E6B800" strokeWidth="0.4" opacity="0.4" />
          <line x1="354" y1="260" x2="390" y2="300" stroke="#E6B800" strokeWidth="0.4" opacity="0.4" />
          <line x1="280" y1="186" x2="196" y2="240" stroke="#E6B800" strokeWidth="0.4" opacity="0.4" />
          <line x1="196" y1="240" x2="224" y2="330" stroke="#E6B800" strokeWidth="0.4" opacity="0.3" />
        </svg>
      </div>

      {/* Globe wireframe — decorative left (mirrored) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[360px] h-[360px] opacity-[0.07] hidden lg:block pointer-events-none -translate-x-[40%]">
        <svg viewBox="0 0 560 560" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="280" cy="280" r="270" stroke="#E6B800" strokeWidth="0.8" />
          <ellipse cx="280" cy="280" rx="168" ry="270" stroke="#E6B800" strokeWidth="0.8" />
          <ellipse cx="280" cy="280" rx="270" ry="74" stroke="#E6B800" strokeWidth="0.5" />
          <line x1="10" y1="280" x2="550" y2="280" stroke="#E6B800" strokeWidth="0.5" />
          <ellipse cx="280" cy="186" rx="252" ry="52" stroke="#E6B800" strokeWidth="0.4" />
          <ellipse cx="280" cy="374" rx="252" ry="52" stroke="#E6B800" strokeWidth="0.4" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center mb-12 group" aria-label="Network71 — Home">
          <Logo variant="auto" height={30} />
        </Link>

        {/* 404 */}
        <div className="font-display text-[130px] sm:text-[160px] leading-none text-gold mb-0 select-none" style={{ textShadow: '0 0 80px rgba(230,184,0,0.25)' }}>
          404
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 justify-center mb-7 -mt-2">
          <div className="h-px w-12 bg-white/15" />
          <div className="h-1 w-1 rounded-full bg-gold/50" />
          <div className="h-px w-12 bg-white/15" />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl text-white mb-4">Page Not Found</h1>
        <p className="text-slate-400 text-base leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3.5 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/20"
          >
            Go Home
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3.5 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-14 pt-8 border-t border-white/8">
          <p className="text-slate-500 text-xs mb-5 uppercase tracking-widest font-semibold">You might be looking for</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: 'About', href: '/about' },
              { label: 'Divisions', href: '/divisions/garments' },
              { label: 'Ezyify', href: '/ezyify' },
              { label: 'Investors', href: '/investors' },
              { label: 'Careers', href: '/careers' },
            ].map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="px-4 py-1.5 rounded-full bg-white/5 text-slate-400 hover:text-gold hover:bg-white/10 text-sm transition-colors border border-white/8 hover:border-gold/20"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
