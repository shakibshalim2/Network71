import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import Typewriter from "@/components/motion/Typewriter"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function AILab({ c }: { c: ITContent }) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: BG_ALT }}
    >
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: PURPLE }} />
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
            style={{ color: PURPLE }}
          >
            AI Research &amp; Development
          </span>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* left */}
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {c.copy.AILab.eyebrow}
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8 text-sm">
              {c.copy.AILab.title}
            </p>
            <ol className="svals" style={{ ["--pa" as string]: PURPLE }}>
              {c.copy.AILab.areas.map((a, i) => (
                <li key={a.title} className="svals__row" style={{ ["--i" as string]: i }}>
                  <span className="svals__idx font-mono">0{i + 1}</span>
                  <div className="svals__body">
                    <span className="text-white font-semibold text-sm" dangerouslySetInnerHTML={{ __html: a.title }} />
                    <span className="text-slate-400 text-sm"> — {a.desc}</span>
                  </div>
                  <span className="svals__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {/* right: model grid */}
          <div>
            <div
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: PURPLE }}
            >
              {c.copy.AILab.lead}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {c.aiModels.map((m) => (
                <div
                  key={m.name}
                  className="p-3.5 rounded-xl text-center it-model"
                  style={{
                    background: "rgba(168,85,247,0.05)",
                    border: `1px solid color-mix(in srgb, ${m.color} 15%, transparent)`,
                  }}
                >
                  <div
                    className="text-[11px] font-bold tracking-[0.14em] mb-1.5 uppercase"
                    style={{ color: m.color }}
                  >
                    {m.type}
                  </div>
                  <div className="text-slate-300 text-[10px] leading-tight">
                    {m.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 it-term it-term--inline" aria-hidden="true">
              <div className="it-term__bar"><span /><span /><span /></div>
              <Typewriter
                className="it-term__body"
                startDelay={400}
                lines={[
                  { text: "> model.train(dataset=commerce_signals)", color: "var(--accent-cyan)" },
                  { text: "epoch 1/50 — loss: 0.3412 — acc: 0.8870", color: "var(--accent-emerald)" },
                  { text: "epoch 50/50 — loss: 0.0182 — acc: 0.9940", color: "var(--accent-emerald)" },
                  { text: c.copy.AILab.detailSecondary, color: PURPLE },
                  { text: "✓ deployed — latency 18ms p99", color: "var(--accent-emerald)" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
