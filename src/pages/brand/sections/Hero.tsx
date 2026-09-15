import type { BrandContent } from '../content/en'
import KineticText from '@/components/motion/KineticText'

export default function Hero({ c }: { c: BrandContent['hero'] }) {
  return (
    <div className="mb-24 bhero">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-8 bhero__rule" style={{ background: '#D42424' }} />
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--accent-red)' }}>{c.eyebrow}</span>
        <span className="bhero__count font-mono">08 sections</span>
      </div>
      <h1 className="font-display text-5xl lg:text-6xl text-white tracking-[-0.02em] mb-5 leading-[1.05] hero-kinetic">
        <KineticText text={c.titleLine1} delay={0.15} />
        <KineticText text={c.titleLine2} delay={0.3} as="em" className="italic text-slate-500" />
      </h1>
      <p className="text-slate-400 text-[16px] leading-relaxed max-w-lg">
        {c.p1}{' '}
        {c.p2}{' '}
        {c.p3}
      </p>
    </div>
  )
}
