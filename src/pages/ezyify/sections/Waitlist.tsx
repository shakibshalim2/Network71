import { useState } from "react"
import { openEmailDraft } from "@/lib/mailto"
import { Link } from "react-router-dom"
import { BG, SURFACE } from "../theme"
import type { EzyifyContent } from "../content/en"
import { useCompanySettings } from "@/lib/companySettings"

export default function Waitlist({ c }: { c: EzyifyContent["waitlist"] }) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const { generalEmail } = useCompanySettings()
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

        {submitted ? (
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-purple-500/40 bg-purple-500/10 text-purple-300">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {c.success}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              openEmailDraft(generalEmail, c.subject, { Email: email })
              setSubmitted(true)
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              aria-label={c.emailLabel}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={c.placeholder}
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-purple-500/50"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-xl font-semibold text-white text-sm whitespace-nowrap hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
              }}
            >
              {c.join}
            </button>
          </form>
        )}

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-3 justify-center">
          <a
            href="https://ezyify.com"
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
