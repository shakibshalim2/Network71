import { motion } from "motion/react"
import { EASE_OUT } from "@/lib/motion"

interface Metric {
  value: string
  label: string
  desc?: string
}

interface MetricsBarProps {
  metrics: Metric[]
  accentHex: string
  dark?: boolean
}

const cell = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

/** Ledger strip: numbered facts with a drawn divider and staggered reveal. */
export default function MetricsBar({
  metrics,
  accentHex,
  dark = false,
}: MetricsBarProps) {
  return (
    <div
      className={`ledger ${dark ? "bg-navy-dark" : "bg-navy-light"}`}
      style={{ ["--ledger-accent" as string]: accentHex }}
    >
      <div className="container-page">
        <motion.dl
          className="ledger__grid"
          style={{ ["--cells" as string]: metrics.length }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {metrics.map((m, i) => (
            <motion.div key={i} className="ledger__cell" variants={cell}>
              <span className="ledger__idx">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dd className="ledger__value font-display">{m.value}</dd>
              <dt className="ledger__label">{m.label}</dt>
              {m.desc && <p className="ledger__desc">{m.desc}</p>}
              <motion.span
                className="ledger__rule"
                aria-hidden="true"
                variants={{
                  hidden: { scaleX: 0 },
                  show: {
                    scaleX: 1,
                    transition: { duration: 0.8, ease: EASE_OUT, delay: 0.2 },
                  },
                }}
              />
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </div>
  )
}
