// ─── Icon helpers ─────────────────────────────────────────────────────────────

export function IconSearch({ size = 17 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      style={{ width: size, height: size, flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

export function IconClose({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
      style={{ width: size, height: size, flexShrink: 0 }}>
      <path strokeLinecap="round" d="M3 3l10 10M13 3L3 13" />
    </svg>
  )
}

export function IconChevron({ down, size = 10 }: { down?: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      style={{ width: size, height: size, opacity: 0.5, flexShrink: 0 }}>
      <path d={down ? 'M2 4l4 4 4-4' : 'M4 2l4 4-4 4'} />
    </svg>
  )
}

export function DivisionIcon({ path, color }: { path: string; color: string }) {
  return (
    <span className="div-icon" style={{
      width: 34, height: 34, borderRadius: 8, flexShrink: 0,
      background: `color-mix(in srgb, ${color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 16%, transparent)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ width: 14, height: 14, opacity: 0.85 }}>
        <path d={path} />
      </svg>
    </span>
  )
}
