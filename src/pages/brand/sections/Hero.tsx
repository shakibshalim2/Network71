import type { BrandContent } from '../content/en'

export default function Hero({ c }: { c: BrandContent['hero'] }) {
  return (
    <div className="mb-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-8" style={{ background: '#D42424', opacity: 0.5 }} />
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase"
          style={{ color: 'var(--accent-red)' }}>{c.eyebrow}</span>
      </div>
      <h1 className="font-display text-5xl lg:text-6xl text-white tracking-[-0.02em] mb-5 leading-[1.05]">
        {c.titleLine1}<br />
        <em className="italic text-slate-500">{c.titleLine2}</em>
      </h1>
      <p className="text-slate-400 text-[16px] leading-relaxed max-w-lg">
        {c.p1}{' '}
        {c.p2}{' '}
        {c.p3}
      </p>
    </div>
  )
}
