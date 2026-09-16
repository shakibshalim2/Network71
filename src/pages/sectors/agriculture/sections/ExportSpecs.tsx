import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"
import { EASE_OUT, springSoft } from "@/lib/motion"

/**
 * Export spec sheet: commodity tabs on the left, the selected commodity's
 * grade / moisture / purity / packing / shelf-life / origin card on the right.
 */
export default function ExportSpecs({ c }: { c: AgricultureContent["specs"] }) {
  const [idx, setIdx] = useState(0)
  const reduce = useReducedMotion()
  const item = c.items[idx]
  const rows: Array<[string, string]> = [
    [c.labels.grade, item.grade],
    [c.labels.moisture, item.moisture],
    [c.labels.purity, item.purity],
    [c.labels.packing, item.packing],
    [c.labels.shelf, item.shelf],
    [c.labels.origin, item.origin],
  ]

  return (
    <section id="export-specs" className="py-24 bg-navy-dark sspec" style={{ ["--pa" as string]: GREEN }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: GREEN }} />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: GREEN }}>
              {c.eyebrow}
            </span>
            <div className="h-px w-8" style={{ background: GREEN }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-4">{c.title}</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">{c.description}</p>
        </div>

        <div className="sspec__layout">
          <div className="sspec__tabs" role="tablist" aria-label={c.title}>
            {c.items.map((it, i) => {
              const on = i === idx
              return (
                <button
                  key={it.crop}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  className={`sspec__tab${on ? " is-on" : ""}`}
                  onClick={() => setIdx(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") setIdx((idx + 1) % c.items.length)
                    if (e.key === "ArrowUp" || e.key === "ArrowLeft") setIdx((idx - 1 + c.items.length) % c.items.length)
                  }}
                >
                  {on && <motion.span layoutId="sspec-tab" className="sspec__tab-bg" transition={springSoft} />}
                  <span className="sspec__tab-emoji" aria-hidden="true">{it.emoji}</span>
                  <span className="sspec__tab-label">{it.crop}</span>
                  <span className="sspec__tab-idx font-mono">{String(i + 1).padStart(2, "0")}</span>
                </button>
              )
            })}
          </div>

          <div className="sspec__sheet" role="tabpanel">
            <span className="sspec__scan" aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.crop}
                initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <div className="sspec__sheet-head">
                  <span className="sspec__sheet-emoji" aria-hidden="true">{item.emoji}</span>
                  <div>
                    <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase" style={{ color: GREEN }}>
                      SPEC · {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display text-2xl text-white leading-tight">{item.crop}</h3>
                  </div>
                </div>
                <dl className="sspec__rows">
                  {rows.map(([k, v], i) => (
                    <div key={k} className="sspec__row" style={{ ["--i" as string]: i }}>
                      <dt className="font-mono">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-slate-500 text-xs italic mt-6 text-center">{c.footnote}</p>
      </div>
    </section>
  )
}
