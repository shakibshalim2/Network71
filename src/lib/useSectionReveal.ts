import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const SECTION_SELECTOR =
  "main.public-content > section, main.public-content > div > section"

/**
 * Reveals public page sections as they scroll into view.
 * Sections already on screen when a route mounts are left untouched so the
 * first paint (and LCP) is never delayed; only below-the-fold sections animate.
 */
export function useSectionReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const root = document.documentElement
    root.classList.add("js-reveal")

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Sections already scrolled past (restored scroll position) must not stay hidden.
          if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0)
            continue
          entry.target.classList.add("is-revealed")
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    )

    const seen = new WeakSet<Element>()
    let frame = 0
    const scan = () => {
      frame = 0
      const fold = window.innerHeight * 0.92
      document
        .querySelectorAll<HTMLElement>(SECTION_SELECTOR)
        .forEach((section) => {
          if (seen.has(section)) return
          seen.add(section)
          if (section.getBoundingClientRect().top < fold) return
          section.classList.add("reveal-target")
          io.observe(section)
        })
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(scan)
    }

    schedule()
    // #main-content is swapped out by Suspense while a lazy route loads, so
    // watch the body: a lightweight, childList-only observer is cheap enough.
    const mo = new MutationObserver(schedule)
    mo.observe(document.body, { childList: true, subtree: true })

    // Pointer spotlight for cards: one delegated listener writes --mx/--my on the hovered card.
    const onPointer = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>('.public-content section .grid > [class*="rounded-"], .stmt__value, .esg__card, .splan, .stwin, .madv, .about-pur')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    document.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      mo.disconnect()
      io.disconnect()
      document.removeEventListener('pointermove', onPointer)
    }
  }, [pathname])
}
