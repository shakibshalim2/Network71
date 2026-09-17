import { motion } from "motion/react"
import type { ProjectsContent } from "../content/en"
import { EASE_OUT } from "@/lib/motion"

const stepV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
}

/**
 * Case-study standard: the five steps every published story passes through,
 * beside a sample result block rendered exactly as the detail page does it.
 */
export default function Standard({ c }: { c: ProjectsContent["standard"] }) {
  return (
    <section id="standard" className="section-y wstd">
      <div className="container-page">
        <div className="wstd__grid">
          <div className="wstd__copy">
            <span className="public-eyebrow"><span className="eyebrow-rule" />{c.eyebrow}</span>
            <h2 className="font-display wstd__title">{c.title1}<br /><em>{c.title2}</em></h2>
            <p className="wstd__lead">{c.lead}</p>

            <motion.ol
              className="wstd__steps"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              <i className="wstd__spine" aria-hidden="true" />
              {c.steps.map((s) => (
                <motion.li key={s.k} variants={stepV}>
                  <span className="wstd__k font-mono">{s.k}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          <motion.figure
            className="wstd__sample"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <figcaption className="font-mono">{c.exampleLabel}</figcaption>
            <div className="wstd__result">
              <span className="wstd__metric font-display">{c.example.metric}</span>
              <dl>
                <div><dt className="font-mono">▸</dt><dd>{c.example.baseline}</dd></div>
                <div><dt className="font-mono">▸</dt><dd>{c.example.source}</dd></div>
                <div><dt className="font-mono">▸</dt><dd>{c.example.date}</dd></div>
              </dl>
              <i className="wstd__scan" aria-hidden="true" />
            </div>
            <p className="wstd__foot font-mono">{c.footnote}</p>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}
