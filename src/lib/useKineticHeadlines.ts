import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const SELECTOR = ".sector-page .sector-hero h1"

/**
 * Applies the word-reveal used by the home hero to hand-built sector heroes
 * without rewriting nine files: wraps each text node's words in clipped spans
 * and staggers them in with the Web Animations API.
 */
export function useKineticHeadlines() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(apply)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])
}

function apply() {
  document.querySelectorAll<HTMLElement>(SELECTOR).forEach((h1) => {
    if (h1.dataset.kinetic) return
    h1.dataset.kinetic = "1"
    const words: HTMLElement[] = []
    const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT)
    const textNodes: Text[] = []
    while (walker.nextNode()) textNodes.push(walker.currentNode as Text)
    for (const node of textNodes) {
      const parts = node.textContent?.split(/(\s+)/) ?? []
      if (!parts.some((p) => p.trim())) continue
      const frag = document.createDocumentFragment()
      for (const part of parts) {
        if (!part) continue
        if (!part.trim()) {
          frag.appendChild(document.createTextNode(part))
          continue
        }
        const clip = document.createElement("span")
        clip.style.cssText =
          "display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.1em;margin-bottom:-.1em"
        const word = document.createElement("span")
        word.style.cssText = "display:inline-block;will-change:transform"
        word.textContent = part
        clip.appendChild(word)
        frag.appendChild(clip)
        words.push(word)
      }
      node.replaceWith(frag)
    }
    words.forEach((w, i) => {
      w.animate(
        [
          { transform: "translateY(110%) rotate(3deg)", opacity: 0 },
          { transform: "translateY(0) rotate(0)", opacity: 1 },
        ],
        {
          duration: 900,
          delay: 180 + i * 70,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "both",
        },
      )
    })
  })
}
