import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Publishes the current page's accent as `--page-accent` on <html> so chrome
 * outside the page (reading progress, footer poem, section rail) matches it.
 * Source: the PageHero's --hero-accent or a division ledger's --ledger-accent.
 */
export function usePageAccent() {
  const { pathname } = useLocation()
  useEffect(() => {
    const root = document.documentElement
    let raf = 0
    const read = () => {
      raf = 0
      const hero = document.querySelector<HTMLElement>(".page-hero")
      const ledger = document.querySelector<HTMLElement>(".ledger")
      const value = hero
        ? getComputedStyle(hero).getPropertyValue("--hero-accent").trim()
        : ledger
          ? getComputedStyle(ledger).getPropertyValue("--ledger-accent").trim()
          : ""
      if (value) root.style.setProperty("--page-accent", value)
      else root.style.removeProperty("--page-accent")
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    schedule()
    // Re-read on DOM changes and on theme flips (accent vars differ per theme).
    const mo = new MutationObserver(schedule)
    mo.observe(document.body, { childList: true, subtree: true })
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] })
    return () => {
      mo.disconnect()
      if (raf) cancelAnimationFrame(raf)
      root.style.removeProperty("--page-accent")
    }
  }, [pathname])
}
