import { useState } from "react"
import { Link } from "react-router-dom"
import { BG, SURFACE } from "../theme"
import type { EzyifyContent } from "../content/en"
import { useInquiry } from "@/lib/inquiry"

export default function Waitlist({ c }: { c: EzyifyContent["waitlist"] }) {
  const [email, setEmail] = useState("")
  const inquiry = useInquiry()
  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[700px] h-[400px] rounded-full blur-[160px] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse, #7C3AED 0%, #EC4899 50%, #0891B2 100%)",
          }}
        />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-semibold tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
          {c.eyebrow}
        </div>
        <h2 className="font-display text-4xl sm:text-5xl text-white mb-5">
          {c.title}
        </h2>
        <p className="text-slate-400 text-base leading-relaxed mb-10">
          {c.lead}
        </p>

        {inquiry.reference ? (
          <div role="status" className="ezw__ok inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-purple-500/40 bg-purple-500/10 text-purple-200">
            <span className="ezw__ok-mark" aria-hidden="true">
              <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" pathLength="1" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" pathLength="1" /></svg>
            </span>
            <span className="text-sm">{c.success.replace('{ref}', '').replace(/[:：]\s*$/, '')}</span>
            <strong className="font-mono text-[12px] tracking-[0.1em] px-2.5 py-1 rounded-md border border-purple-400/40">{inquiry.reference}</strong>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              void inquiry.submit({ name: email, email, subject: c.subject, message: c.lead })
            }}
            className="ezw__form max-w-md mx-auto"
          >
            <div className={`ezw__field${email ? ' has-value' : ''}`}>
              <input
                id="ezw-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                autoComplete="email"
                inputMode="email"
                className="ezw__input"
              />
              <label htmlFor="ezw-email" className="ezw__label">{c.placeholder}</label>
              <span className="ezw__line" aria-hidden="true" />
            </div>
            <button
              type="submit"
              disabled={inquiry.busy}
              className={`ezw__btn${inquiry.busy ? ' is-busy' : ''}`}
            >
              <span>{inquiry.busy ? `${c.join}…` : c.join}</span>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              <span className="ezw__progress" aria-hidden="true" />
            </button>
          </form>
        )}
        {inquiry.error && <p role="alert" className="text-sm mt-4" style={{ color: '#F87171' }}>{inquiry.error}</p>}

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-3 justify-center">
          <a
            href={c.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2"
          >
            {c.visit}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <span className="text-slate-600 hidden sm:block">·</span>
          <Link
            to="/investors"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            {c.investorInfo}
          </Link>
          <span className="text-slate-600 hidden sm:block">·</span>
          <Link
            to="/contact"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            {c.partner}
          </Link>
          <span className="text-slate-600 hidden sm:block">·</span>
          <Link
            to="/investors"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            {c.deck}
          </Link>
          <span className="text-slate-600 hidden sm:block">·</span>
          <Link
            to="/contact"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            {c.programs}
          </Link>
        </div>
      </div>
    </section>
  )
}
