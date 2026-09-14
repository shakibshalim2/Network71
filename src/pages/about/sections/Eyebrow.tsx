/** Gold rule + mono label used by every About section header (visuals unchanged from the original page). */
export default function Eyebrow({ label, center = false, className = 'mb-4 sm:mb-5' }: { label: string; center?: boolean; className?: string }) {
  if (center) {
    return (
      <div className={`flex items-center justify-center gap-2.5 sm:gap-3 ${className}`}>
        <div className="h-px w-8 sm:w-12 bg-gold" />
        <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium">{label}</span>
        <div className="h-px w-8 sm:w-12 bg-gold" />
      </div>
    )
  }
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px w-8 sm:w-12 bg-gold shrink-0" />
      <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium">{label}</span>
    </div>
  )
}
