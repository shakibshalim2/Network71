import type { ReactNode } from 'react'
import Logo from '@/components/brand/Logo'
import type { LogoVariant } from '@/components/brand/Logo'

export function SectionHead({ n, title, sub }: { n: string; title: string; sub?: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-[9px] tracking-[0.35em] text-slate-700 uppercase">{n}</span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </div>
      <h2 className="text-white font-semibold text-xl tracking-[-0.01em]">{title}</h2>
      {sub && <p className="text-slate-500 text-sm mt-1 max-w-xl">{sub}</p>}
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
    <div className="rounded-xl overflow-hidden flex flex-col" style={{ border: border || '1px solid rgba(255,255,255,0.06)' }}>
      <div className="brand-preview flex items-center justify-center px-8 flex-1"
        style={{ background: bg, paddingTop: padY, paddingBottom: padY, minHeight: 120 }}>
        {children}
      </div>
      <div className="px-5 py-3" style={{ background: 'var(--s2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-white text-[13px] font-medium">{label}</p>
        {sub && <p className="font-mono text-[9px] tracking-[0.18em] text-slate-600 uppercase mt-0.5">{sub}</p>}
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
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="h-24 flex items-end p-3"
        style={{ background: hex, border: light ? '1px solid rgba(0,0,0,0.08)' : undefined }}>
        <span className="font-mono text-[9px] tracking-[0.18em]"
          style={{ color: light ? '#334155' : '#FFFFFF' }}>
          {hex}
        </span>
      </div>
      <div className="px-4 py-3" style={{ background: 'var(--s2)' }}>
        <p className="text-white text-sm font-medium mb-0.5">{name}</p>
        <p className="text-slate-500 text-[11px] leading-relaxed">{note}</p>
      </div>
    </div>
  )
}
