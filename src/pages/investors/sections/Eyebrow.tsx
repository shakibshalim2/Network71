/** Gold rule + mono label used by Investors section headers (visuals unchanged from the original page). */
export default function Eyebrow({ label, center = false, className }: { label: string; center?: boolean; className?: string }) {
  const cls = className ?? (center ? 'mb-4' : 'mb-5')
  return (
    <div className={`flex items-center ${center ? 'justify-center ' : ''}gap-3 ${cls}`}>
      <div className="h-px w-12 bg-gold" />
      <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium">{label}</span>
      {center && <div className="h-px w-12 bg-gold" />}
    </div>
  )
}
