import { useEffect } from "react"
import Lenis from "lenis"
// Sets html/body height:auto so the content ResizeObserver sees route changes.
import "lenis/dist/lenis.css"

let instance: Lenis | null = null

/** Current Lenis instance (null on admin, reduced motion, or before mount). */
export function getLenis() {
  return instance
}

const PREVENT_SELECTOR =
  "[data-lenis-prevent], dialog, .mob-drawer, .search-sheet, .mega-panel, .n71-dialog"

/**
 * Inertial wheel scrolling for the public site. Touch keeps native scrolling
 * (syncTouch off) so phones never fight the browser. Pauses while a drawer or
 * dialog locks the body, and steps aside for nested scroll containers.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
      anchors: false,
      prevent: (node) => node.matches(PREVENT_SELECTOR),
    })
    instance = lenis
    if (import.meta.env.DEV) (window as unknown as { __lenis?: Lenis }).__lenis = lenis

    // Header/drawer/dialog lock the body with inline overflow:hidden.
    const syncLock = () => {
      if (document.body.style.overflow === "hidden") lenis.stop()
      else lenis.start()
    }
    const mo = new MutationObserver(syncLock)
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] })
    syncLock()

    return () => {
      mo.disconnect()
      lenis.destroy()
      instance = null
    }
  }, [enabled])
}
