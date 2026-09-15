import Logo from '@/components/brand/Logo'
import type { BrandContent } from '../content/en'
import { SectionHead, Swatch } from './primitives'

export function Palette({ c }: { c: BrandContent['palette'] }) {
  return (
    <section className="mb-20">
      <SectionHead n={c.n} title={c.title} sub={c.sub} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {c.swatches.map(s => (
          <Swatch key={s.hex} name={s.name} hex={s.hex} note={s.note} light={s.light} />
        ))}
      </div>
    </section>
  )
}

export function Usage({ c }: { c: BrandContent['usage'] }) {
  return (
    <section className="mb-20">
      <SectionHead n={c.n} title={c.title} />
      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-xl p-6" style={{ background: 'var(--s2)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium text-slate-500 mb-5">{c.clearSpaceLabel}</p>
          <div className="flex items-center justify-center py-6">
            <div className="relative p-8 bclear" style={{ border: '1px dashed rgba(212,36,36,0.35)', borderRadius: 2 }}>
              <Logo variant="primary" height={44} />
            </div>
          </div>
          <p className="text-slate-500 text-[13px] leading-relaxed mt-2">
            {c.clearSpace1}{' '}
            {c.clearSpace2}
          </p>
        </div>
        <div className="rounded-xl p-6" style={{ background: 'var(--s2)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium text-slate-500 mb-5">{c.neverLabel}</p>
          <ul className="space-y-2.5">
            {c.never.map((r, i) => (
              <li key={r} className="flex items-start gap-3 bnever" style={{ ['--i' as string]: i }}>
                <span className="bnever__idx font-mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-red-500/70 leading-none flex-shrink-0 mt-px text-base">×</span>
                <span className="text-slate-400 text-[13px]">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function FooterMark({ c }: { c: BrandContent['footer'] }) {
  return (
    <div className="pt-10 flex flex-col sm:flex-row sm:items-center gap-5 justify-between"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <span style={{
        background: '#FFFFFF', borderRadius: 4,
        display: 'inline-flex', alignItems: 'center',
        padding: '5px 10px', lineHeight: 0,
      }}>
        <Logo variant="primary" height={24} />
      </span>
      <p className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">
        {c.text}
      </p>
    </div>
  )
}
