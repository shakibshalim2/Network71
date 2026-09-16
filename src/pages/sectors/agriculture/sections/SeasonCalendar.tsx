import { motion } from "motion/react"
import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"
import { EASE_OUT } from "@/lib/motion"

const row = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE_OUT } },
}

/**
 * Harvest / availability Gantt: one row per commodity, twelve month cells.
 * Harvest months fill solid, storage-availability months hatch, and a
 * "now" marker runs down the current month so buyers see what is in season.
 */
export default function SeasonCalendar({ c }: { c: AgricultureContent["calendar"] }) {
  const now = new Date().getMonth() + 1
  return (
    <section id="season-calendar" className="py-24 bg-surface-1 scal" style={{ ["--pa" as string]: GREEN }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: GREEN }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: GREEN }}>
                {c.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight">{c.title}</h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md lg:text-right">{c.description}</p>
        </div>

        <div className="scal__legend" aria-hidden="true">
          <span><i className="scal__swatch scal__swatch--harvest" />{c.legend.harvest}</span>
          <span><i className="scal__swatch scal__swatch--avail" />{c.legend.available}</span>
        </div>

        <div className="scal__scroll">
          <motion.div
            className="scal__grid"
            role="table"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          >
            <div className="scal__head" role="row">
              <span className="scal__crop scal__crop--head" role="columnheader" />
              {c.months.map((m, i) => (
                <span key={m} className={`scal__month font-mono${i + 1 === now ? " is-now" : ""}`} role="columnheader">
                  {m}
                </span>
              ))}
            </div>
            {c.rows.map((r) => (
              <motion.div key={r.crop} className="scal__row" role="row" variants={row}>
                <span className="scal__crop" role="rowheader">
                  <span className="scal__emoji" aria-hidden="true">{r.emoji}</span>
                  <span>
                    <span className="scal__crop-name">{r.crop}</span>
                    <span className="scal__crop-note">{r.note}</span>
                  </span>
                </span>
                {c.months.map((_, i) => {
                  const m = i + 1
                  const h = r.harvest.includes(m)
                  const a = r.available.includes(m)
                  return (
                    <span
                      key={m}
                      role="cell"
                      className={`scal__cell${h ? " is-harvest" : a ? " is-avail" : ""}${m === now ? " is-now" : ""}`}
                      style={{ ["--d" as string]: i }}
                      aria-label={h ? c.legend.harvest : a ? c.legend.available : undefined}
                    />
                  )
                })}
              </motion.div>
            ))}
            <span className="scal__now" style={{ ["--m" as string]: now - 1 }} aria-hidden="true" />
          </motion.div>
        </div>

        <p className="text-slate-500 text-xs italic mt-6">{c.footnote}</p>
      </div>
    </section>
  )
}
