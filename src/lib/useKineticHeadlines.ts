import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const HERO_SELECTOR = ".sector-page .sector-hero h1"
const SECTION_SELECTOR = "main.public-content section h2.font-display"
// Headlines that already choreograph their own words or children.
const SKIP = ".hero-kinetic, .foot-sig__poem, .portal__title"

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

interface Wrapped {
  original: Text
  inserted: Node[]
}

/**
 * Word-reveal for hand-built headlines without per-file edits: wraps each
 * text node's words in clipped spans, stages them in with the Web Animations
 * API, then restores the original text nodes so React updates (language
 * switch, CMS overrides) keep landing in the live DOM. Sector hero H1s run on
 * mount; section H2s run the moment they scroll into view.
 */
export function useKineticHeadlines() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (typeof IntersectionObserver === "undefined") return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          // Already scrolled past (restored scroll, late-mounted content): show at once.
          if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) continue
          io.unobserve(el)
          if (entry.isIntersecting) reveal(el, { delay: 40, stagger: 45, duration: 800 })
          else el.dataset.kinetic = "static"
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    )

    let frame = 0
    const scan = () => {
      frame = 0
      document.querySelectorAll<HTMLElement>(HERO_SELECTOR).forEach((h1) => {
        if (h1.dataset.kinetic) return
        reveal(h1, { delay: 180, stagger: 70, duration: 900, rotate: true })
      })
      const fold = window.innerHeight
      document.querySelectorAll<HTMLElement>(SECTION_SELECTOR).forEach((h2) => {
        if (h2.dataset.kinetic || h2.matches(SKIP) || h2.closest(SKIP)) return
        // Headings already on screen (or scrolled past) must never flash hidden.
        const top = h2.getBoundingClientRect().top
        if (top < fold * 0.9) {
          h2.dataset.kinetic = "static"
          return
        }
        h2.dataset.kinetic = "pending"
        io.observe(h2)
      })
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(scan)
    }
    schedule()
    const mo = new MutationObserver(schedule)
    mo.observe(document.body, { childList: true, subtree: true })

    // Fast scrolls can jump a heading from below to above the viewport between
    // observer ticks; sweep anything left hidden above the fold.
    let sweep = 0
    const onScroll = () => {
      if (sweep) return
      sweep = requestAnimationFrame(() => {
        sweep = 0
        document
          .querySelectorAll<HTMLElement>('[data-kinetic="pending"]')
          .forEach((el) => {
            if (el.getBoundingClientRect().bottom < 0) {
              io.unobserve(el)
              el.dataset.kinetic = "static"
            }
          })
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      if (sweep) cancelAnimationFrame(sweep)
      window.removeEventListener("scroll", onScroll)
      mo.disconnect()
      io.disconnect()
      // Anything still parked hidden must become visible on route change.
      document
        .querySelectorAll<HTMLElement>('[data-kinetic="pending"]')
        .forEach((el) => (el.dataset.kinetic = "static"))
    }
  }, [pathname])
}

interface RevealOptions {
  delay: number
  stagger: number
  duration: number
  rotate?: boolean
}

/** Wraps words in clip/word spans, remembering how to undo it. */
function wrap(el: HTMLElement): { words: HTMLElement[]; record: Wrapped[] } {
  const words: HTMLElement[] = []
  const record: Wrapped[] = []
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text)
  for (const node of textNodes) {
    const parts = node.textContent?.split(/(\s+)/) ?? []
    if (!parts.some((p) => p.trim())) continue
    const inserted: Node[] = []
    const frag = document.createDocumentFragment()
    for (const part of parts) {
      if (!part) continue
      if (!part.trim()) {
        const ws = document.createTextNode(part)
        frag.appendChild(ws)
        inserted.push(ws)
        continue
      }
      const clip = document.createElement("span")
      clip.className = "kin__clip"
      const word = document.createElement("span")
      word.className = "kin__word"
      word.textContent = part
      clip.appendChild(word)
      frag.appendChild(clip)
      inserted.push(clip)
      words.push(word)
    }
    node.replaceWith(frag)
    record.push({ original: node, inserted })
  }
  return { words, record }
}

/** Puts the original text nodes back so framework-driven text updates stay live. */
function unwrap(el: HTMLElement, record: Wrapped[]) {
  for (const { original, inserted } of record) {
    const first = inserted.find((n) => n.parentNode)
    if (!first?.parentNode) continue
    first.parentNode.insertBefore(original, first)
    inserted.forEach((n) => n.parentNode?.removeChild(n))
  }
  el.dataset.kinetic = "done"
}

function reveal(el: HTMLElement, o: RevealOptions) {
  const { words, record } = wrap(el)
  el.dataset.kinetic = "1"
  const anims = words.map((w, i) =>
    w.animate(
      [
        {
          transform: `translateY(110%)${o.rotate ? " rotate(3deg)" : ""}`,
          opacity: 0,
        },
        { transform: "translateY(0) rotate(0)", opacity: 1 },
      ],
      {
        duration: o.duration,
        delay: o.delay + Math.min(i, 14) * o.stagger,
        easing: EASE,
        fill: "both",
      },
    ),
  )
  const done = () => unwrap(el, record)
  Promise.all(anims.map((a) => a.finished)).then(done, done)
}
