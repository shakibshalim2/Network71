interface SectionEyebrowProps {
  label: string
  color: string
  /** Centered variant renders a rule on both sides. */
  center?: boolean
  className?: string
}

export default function SectionEyebrow({ label, color, center = false, className = '' }: SectionEyebrowProps) {
  return (
    <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''} ${className}`}>
      <div className={`h-px ${center ? 'w-8' : 'w-10'}`} style={{ background: color }} />
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color }}>{label}</span>
      {center && <div className="h-px w-8" style={{ background: color }} />}
    </div>
  )
}
