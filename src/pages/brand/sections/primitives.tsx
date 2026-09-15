import { useState, type ReactNode } from 'react'
import Logo from '@/components/brand/Logo'
import type { LogoVariant } from '@/components/brand/Logo'

export function SectionHead({ n, title, sub }: { n: string; title: string; sub?: string }) {
  return (
    <div className="mb-10 bsec">
      <div className="bsec__rule" aria-hidden="true" />
      <div className="bsec__row">
        <span className="bsec__num font-display" aria-hidden="true">{n}</span>
        <div>
          <span className="bsec__idx font-mono">{n}</span>
          <h2 className="text-white font-semibold text-xl tracking-[-0.01em] bsec__title">{title}</h2>
          {sub && <p className="text-slate-500 text-sm mt-1 max-w-xl">{sub}</p>}
        </div>
      </div>
    </div>
  )
}

/** Display the logo centred on a coloured tile */
export function Tile({
  children,
  bg,
  label,
  sub,
  border,
  padY = 44,
}: {
  children: ReactNode
  bg: string
  label: string
  sub?: string
  border?: string
  padY?: number
}) {
  return (
    <div className="rounded-xl overflow-hidden flex flex-col btile" style={{ border: border || '1px solid rgba(255,255,255,0.06)' }}>
      <div className="brand-preview flex items-center justify-center px-8 flex-1"
        style={{ background: bg, paddingTop: padY, paddingBottom: padY, minHeight: 120 }}>
        {children}
      </div>
      <div className="px-5 py-3" style={{ background: 'var(--s2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-white text-[13px] font-medium">{label}</p>
        {sub && <p className="font-mono text-[11px] tracking-[0.16em] text-slate-500 uppercase mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

/** Primary/on-dark wrapper: original logo on white backing */
export function LogoOnDark({ height = 36 }: { height?: number }) {
  return (
    <span style={{
      background: '#FFFFFF',
      borderRadius: 5,
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 12px',
      lineHeight: 0,
    }}>
      <Logo variant="primary" height={height} />
    </span>
  )
}

/** Logo variant tile shorthand */
export function VariantTile({
  variant,
  bg,
  label,
  sub,
  h = 44,
  border,
}: {
  variant: LogoVariant
  bg: string
  label: string
  sub?: string
  h?: number
  border?: string
}) {
  return (
    <Tile bg={bg} label={label} sub={sub} border={border}>
      <Logo variant={variant} height={h} />
    </Tile>
  )
}

export function Swatch({ name, hex, note, light }: { name: string; hex: string; note: string; light?: boolean }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(hex) } catch { return }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }
  return (
    <div className="rounded-xl overflow-hidden btile bswatch" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      <button type="button" onClick={copy} className="h-24 w-full flex items-end justify-between p-3 text-left bswatch__chip" aria-label={`Copy ${hex}`}
        style={{ background: hex, border: light ? '1px solid rgba(0,0,0,0.08)' : undefined, color: light ? '#334155' : '#FFFFFF' }}>
        <span className="font-mono text-[11px] tracking-[0.16em]">{hex}</span>
        <span className={`bswatch__copy font-mono${copied ? ' is-on' : ''}`} aria-live="polite">
          {copied ? (
            <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>COPIED</>
          ) : (
            <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a1 1 0 011-1h10" /></svg>COPY</>
          )}
        </span>
      </button>
      <div className="px-4 py-3" style={{ background: 'var(--s2)' }}>
        <p className="text-white text-sm font-medium mb-0.5">{name}</p>
        <p className="text-slate-500 text-[11px] leading-relaxed">{note}</p>
      </div>
    </div>
  )
}
