import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function Opportunities({ c }: { c: ITContent }) {
  return (
    <section className="py-24" style={{ background: BG_DEEP }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: ACCENT }} />
            <span
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
              style={{ color: ACCENT }}
            >
              {c.copy.Opportunities.eyebrow}
            </span>
            <div className="h-px w-8" style={{ background: ACCENT }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
            {c.copy.Opportunities.title}
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            {c.copy.Opportunities.lead}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Enterprise Software Clients",
              desc: "Organisations looking for a reliable, experienced software partner to build custom enterprise applications, digital platforms, or AI-powered products.",
              cta: "Start a Project",
              href: "#sector-contact",
              color: ACCENT,
              tag: "Custom Development",
            },
            {
              title: "Technology Partners",
              desc: "SaaS vendors, cloud providers, and system integrators seeking reseller arrangements, white-label development capacity, or deep integration partnerships.",
              cta: "Explore Partnership",
              href: "#sector-contact",
              color: PURPLE,
              tag: "Integration &amp; Reseller",
            },
            {
              title: "Ezyify Early Adopters",
              desc: "Sellers, creators, and investors who want early access to Ezyify — whether to list products, build a creator presence, or discuss strategic investment.",
              cta: "Join Ezyify",
              href: "/ezyify",
              color: "var(--accent-pink)",
              tag: "Sellers · Creators · Investors",
            },
          ].map((o) => (
            <div
              key={o.title}
              className="p-7 rounded-2xl flex flex-col"
              style={{
                background: "var(--fill-1)",
                border: `1px solid color-mix(in srgb, ${o.color} 15%, transparent)`,
              }}
            >
              <div
                className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold mb-5"
                style={{
                  background: `color-mix(in srgb, ${o.color} 8%, transparent)`,
                  color: o.color,
                }}
                dangerouslySetInnerHTML={{ __html: o.tag }}
              />
              <h3 className="font-display text-xl text-white mb-4">
                {o.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-7">
                {o.desc}
              </p>
              <Link
                to={o.href}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ color: o.color }}
              >
                {o.cta}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
