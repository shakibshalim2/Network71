import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { springSoft } from "@/lib/motion"

interface Entry {
  id: string
  label: string
}

const LABEL_SELECTOR =
  ".font-mono.uppercase, .journey__eyebrow, .ledger__idx ~ dt, h2"

/**
 * Sticky index for long division pages: one dot per section, the active dot
 * stretches into a bar and reveals the section's eyebrow label. Clicking
 * jumps to the section. Desktop only; phones keep the top progress hairline.
 */
export default function SectionRail() {
  const { pathname } = useLocation()
  const [entries, setEntries] = useState<Entry[]>([])
  const [active, setActive] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [accent, setAccent] = useState<string | undefined>()

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1280px)").matches) return
    let io: IntersectionObserver | undefined
    let raf = 0
    const collect = () => {
      raf = 0
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".sector-page main.public-content > section, .sector-page main.public-content > div > section",
        ),
      ).filter((s) => !s.classList.contains("sector-hero"))
      if (sections.length < 4) return
      const list: Entry[] = []
      sections.forEach((s, i) => {
        const labelEl = s.querySelector<HTMLElement>(LABEL_SELECTOR)
        const label = (labelEl?.textContent ?? "").replace(/\s+/g, " ").trim()
        if (!label) return
        if (!s.id) s.id = `section-${i + 1}`
        list.push({ id: s.id, label: label.length > 28 ? `${label.slice(0, 26)}…` : label })
      })
      setEntries(list)
      // Borrow the division accent from the ledger strip so the rail matches the page.
      const ledger = document.querySelector<HTMLElement>(".ledger")
      const hex = ledger ? getComputedStyle(ledger).getPropertyValue("--ledger-accent").trim() : ""
      setAccent(hex || undefined)
      io?.disconnect()
      io = new IntersectionObserver(
        (obs) => {
          const hit = obs
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
          if (hit) setActive((hit.target as HTMLElement).id)
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.2, 0.5] },
      )
      sections.forEach((s) => io!.observe(s))
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(collect)
    }
    schedule()
    const mo = new MutationObserver(schedule)
    mo.observe(document.body, { childList: true, subtree: true })
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      mo.disconnect()
      io?.disconnect()
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      setEntries([])
      setActive(null)
    }
  }, [pathname])

  if (!entries.length) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="srail"
          aria-label="Page sections"
          style={accent ? { ["--srail-accent" as string]: accent } : undefined}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.35 }}
        >
          {entries.map((e, i) => {
            const isActive = e.id === active
            return (
              <a
                key={e.id}
                href={`#${e.id}`}
                className={`srail__item${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(ev) => {
                  ev.preventDefault()
                  document.getElementById(e.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                <span className="srail__label">
                  <span className="srail__idx">{String(i + 1).padStart(2, "0")}</span>
                  {e.label}
                </span>
                <span className="srail__dot">
                  {isActive && <motion.span layoutId="srail-bar" className="srail__bar" transition={springSoft} />}
                </span>
              </a>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
