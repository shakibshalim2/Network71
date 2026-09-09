import Logo from '@/components/brand/Logo'
import type { LogoVariant } from '@/components/brand/Logo'
import type { BrandContent } from '../content/en'
import { SectionHead, VariantTile } from './primitives'

const SCALE_STEPS = [96, 72, 48, 32, 24, 16]

// Visual props per icon tile id; text lives in content
const ICON_TILES: Record<string, { variant: LogoVariant; bg: string; border?: string }> = {
  light: { variant: 'icon', bg: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)' },
  grey: { variant: 'icon', bg: '#F5F5F5', border: '1px solid rgba(0,0,0,0.05)' },
  dark: { variant: 'icon', bg: 'var(--s0)' },
  monoBlack: { variant: 'icon-black', bg: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)' },
  monoWhite: { variant: 'icon-white', bg: '#111111' },
  redField: { variant: 'icon-white', bg: '#D42424' },
}

export function IconMark({ c }: { c: BrandContent['icon'] }) {
  return (
    <section className="mb-20">
      <SectionHead n={c.n} title={c.title} sub={c.sub} />

      <div className="flex flex-wrap gap-10 items-end mb-10">
        {/* Hero size */}
        <div className="flex items-center justify-center rounded-2xl"
          style={{ background: '#FFFFFF', width: 180, height: 180, border: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
          <Logo variant="icon" height={124} />
        </div>

        {/* Scale ladder */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.3em] text-slate-700 uppercase mb-5">{c.scaleLabel}</p>
          <div className="flex items-end gap-4 flex-wrap">
            {SCALE_STEPS.map(s => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center rounded-xl"
                  style={{ background: '#FFFFFF', width: s + 20, height: s + 20, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <Logo variant="icon" height={s} />
                </div>
                <span className="font-mono text-[9px] text-slate-700">{s}{c.pxSuffix}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Icon variant tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {c.tiles.map(t => {
          const v = ICON_TILES[t.id]
          return <VariantTile key={t.id} variant={v.variant} bg={v.bg} label={t.label} sub={t.sub} h={64} border={v.border} />
        })}
      </div>
    </section>
  )
}

export function Favicon({ c }: { c: BrandContent['favicon'] }) {
  return (
    <section className="mb-20">
      <SectionHead n={c.n} title={c.title} sub={c.sub} />
      <div className="flex flex-wrap gap-8 items-end">
        {c.sizes.map(({ s, label, note }) => (
          <div key={s} className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center rounded-2xl"
              style={{ background: '#FFFFFF', width: s + 28, height: s + 28, border: '1px solid rgba(0,0,0,0.06)' }}>
              <Logo variant="icon" height={s} />
            </div>
            <div className="text-center">
              <p className="font-mono text-[10px] text-white font-medium">{label}</p>
              <p className="font-mono text-[9px] text-slate-600">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
