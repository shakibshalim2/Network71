import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
/** The theme actually painted on screen — 'system' always resolves to one of these. */
export type ResolvedTheme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'n71-theme'

interface ThemeContextType {
  /** What the user picked (may be 'system'). */
  mode: ThemeMode
  /** What is actually rendered right now. */
  theme: ResolvedTheme
  setMode: (mode: ThemeMode) => void
  /** Flip between light and dark, leaving 'system' behind. */
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  theme: 'dark',
  setMode: () => {},
  toggle: () => {},
})

const prefersLight = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches

function readStoredMode(): ThemeMode {
  if (typeof localStorage === 'undefined') return 'dark'
  let raw: string | null = null
  try { raw = localStorage.getItem(THEME_STORAGE_KEY) } catch { return 'dark' }
  return raw === 'light' || raw === 'dark' || raw === 'system' ? raw : 'dark'
}

const resolve = (mode: ThemeMode): ResolvedTheme =>
  mode === 'system' ? (prefersLight() ? 'light' : 'dark') : mode

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(readStoredMode)
  const [theme, setTheme] = useState<ResolvedTheme>(() => resolve(readStoredMode()))

  // Paint the resolved theme onto <html> and keep browser UI in sync.
  useEffect(() => {
    const next = theme

    const root = document.documentElement
    root.setAttribute('data-theme', next)

    // Animate colour changes only while switching, then release so the
    // blanket transition never interferes with normal interactions.
    root.classList.add('theme-switching')
    const release = window.setTimeout(() => root.classList.remove('theme-switching'), 320)

    // Match the browser chrome (address bar) to the surface colour.
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', next === 'light' ? '#FAFBFD' : '#04080E')

    return () => window.clearTimeout(release)
  }, [theme])

  // Follow the OS when the user is on 'system'.
  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => setTheme(mq.matches ? 'light' : 'dark')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mode])

  // Keep multiple open tabs consistent.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) {
        const next = readStoredMode()
        setModeState(next)
        setTheme(resolve(next))
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
    setTheme(resolve(next))
    try { localStorage.setItem(THEME_STORAGE_KEY, next) } catch { /* private mode */ }
  }, [])

  const toggle = useCallback(() => {
    setMode(resolve(mode) === 'dark' ? 'light' : 'dark')
  }, [mode, setMode])

  return (
    <ThemeContext.Provider value={{ mode, theme, setMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
