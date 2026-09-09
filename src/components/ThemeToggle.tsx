import { useTheme, type ThemeMode } from '@/context/ThemeContext'

// ─── Icons ────────────────────────────────────────────────────────────────────

function SunIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
      strokeLinecap="round" style={{ width: size, height: size, flexShrink: 0 }}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
    </svg>
  )
}

function MoonIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a6.9 6.9 0 0 0 11.1 11.1Z" />
    </svg>
  )
}

function SystemIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, flexShrink: 0 }}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </svg>
  )
}

// ─── Compact icon toggle (header bar) ─────────────────────────────────────────

/**
 * Single-tap light/dark switch with a sliding sun→moon crossfade.
 * Used in both the desktop control cluster and the mobile header row.
 */
export function ThemeToggleButton({ size = 40 }: { size?: number }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="theme-toggle-btn"
      style={{ width: size, height: size }}
    >
      {/* Both icons are stacked and cross-faded so the swap reads as one motion */}
      <span className="theme-toggle-icon" data-active={isDark}>
        <MoonIcon size={16} />
      </span>
      <span className="theme-toggle-icon" data-active={!isDark}>
        <SunIcon size={16} />
      </span>
    </button>
  )
}

// ─── Segmented control (mobile drawer / settings) ─────────────────────────────

const OPTIONS: { value: ThemeMode; label: string; Icon: typeof SunIcon }[] = [
  { value: 'light',  label: 'Light',  Icon: SunIcon },
  { value: 'dark',   label: 'Dark',   Icon: MoonIcon },
  { value: 'system', label: 'Auto',   Icon: SystemIcon },
]

/**
 * Three-way Light / Dark / Auto selector. Exposes 'system' explicitly, which
 * the compact button intentionally hides.
 */
export function ThemeSegmented() {
  const { mode, setMode } = useTheme()

  return (
    <div role="radiogroup" aria-label="Colour theme" className="theme-seg">
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = mode === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setMode(value)}
            className="theme-seg__opt"
            data-active={active}
          >
            <Icon size={13} />
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default ThemeToggleButton
