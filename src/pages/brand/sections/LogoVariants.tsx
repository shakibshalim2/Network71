import Logo from '@/components/brand/Logo'
import type { BrandContent } from '../content/en'
import { SectionHead, Tile, LogoOnDark, VariantTile } from './primitives'

export function Primary({ c }: { c: BrandContent['primary'] }) {
  return (
    <section className="mb-20">
      <SectionHead n={c.n} title={c.title} sub={c.sub} />
      <div className="grid md:grid-cols-2 gap-4">
        <Tile bg="#FFFFFF" label={c.white.label} sub={c.white.sub} border="1px solid rgba(0,0,0,0.07)" padY={48}>
          <Logo variant="primary" height={56} />
        </Tile>
        <Tile bg="#F2F2F2" label={c.grey.label} sub={c.grey.sub} border="1px solid rgba(0,0,0,0.05)" padY={48}>
          <Logo variant="primary" height={56} />
        </Tile>
      </div>
    </section>
  )
}

export function Transparent({ c }: { c: BrandContent['transparent'] }) {
  return (
    <section className="mb-20">
      <SectionHead n={c.n} title={c.title} sub={c.sub} />
      <div className="grid md:grid-cols-2 gap-4">
        <Tile bg="rgb(224,224,224)" label={c.checker.label} sub={c.checker.sub} padY={40}
          border="1px solid rgba(0,0,0,0.06)"
        >
          {/* Checkerboard background to show transparency */}
          <div style={{
            background: 'linear-gradient(45deg,#bbb 25%,transparent 25%),linear-gradient(-45deg,#bbb 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#bbb 75%),linear-gradient(-45deg,transparent 75%,#bbb 75%)',
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0,0 8px,8px -8px,-8px 0',
            backgroundColor: '#e0e0e0',
            padding: '12px 16px',
            borderRadius: 4,
          }}>
            <Logo variant="primary" height={52} />
          </div>
        </Tile>
        <Tile bg="rgba(200,150,42,0.14)" label={c.field.label}
          sub={c.field.sub} padY={48}>
          <Logo variant="primary" height={52} />
        </Tile>
      </div>
    </section>
  )
}

export function DarkUsage({ c }: { c: BrandContent['dark'] }) {
  return (
    <section className="mb-20">
      <SectionHead n={c.n} title={c.title} sub={c.sub} />
      <div className="grid md:grid-cols-3 gap-4">
        {c.tiles.map(({ bg, label }) => (
          <Tile key={label} bg={bg} label={`${c.labelPrefix} · ${label}`}
            sub={c.tileSub} padY={36}>
            <LogoOnDark height={32} />
          </Tile>
        ))}
      </div>
      <p className="mt-5 text-slate-600 text-[12px] leading-relaxed font-mono">
        {c.note1}{' '}
        {c.note2}{' '}
        {c.note3}
      </p>
    </section>
  )
}

export function Monochrome({ c }: { c: BrandContent['mono'] }) {
  return (
    <section className="mb-20">
      <SectionHead n={c.n} title={c.title} sub={c.sub} />
      <div className="grid md:grid-cols-2 gap-4">
        <VariantTile variant="mono-black" bg="#FFFFFF" label={c.black.label}
          sub={c.black.sub} border="1px solid rgba(0,0,0,0.07)" h={52} />
        <VariantTile variant="mono-white" bg="#111111" label={c.white.label}
          sub={c.white.sub} h={52} />
      </div>
    </section>
  )
}
