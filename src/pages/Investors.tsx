import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { openEmailDraft } from "@/lib/mailto"

const thesis = [
  {
    title: "Diversified Portfolio",
    desc: "Eight distinct industry verticals — from garments and maritime to IT and media — reduce concentration risk and create multiple vectors for growth and resilience.",
    icon: (
      <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
  {
    title: "Emerging Market Access",
    desc: "Deep roots in South Asia with growing reach across the Middle East, Africa, and Southeast Asia — regions forecast for sustained economic expansion.",
    icon: (
      <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
      </svg>
    ),
  },
  {
    title: "Technology-Led Growth",
    desc: "Our Ezyify platform and IT division embed technology across all operations, enabling scalable, data-driven management and new digital revenue streams.",
    icon: (
      <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
]

const documents = [
  { name: "Company overview", subject: "Company overview request" },
  { name: "Financial reporting", subject: "Financial reporting request" },
  { name: "Investment information", subject: "Investment information request" },
]

type FormState = {
  name: string
  company: string
  email: string
  range: string
  inquiry: string
  message: string
}

export default function Investors() {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    range: "Not specified",
    inquiry: "General Inquiry",
    message: "",
  })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    openEmailDraft("investors@network71.com", `Investor enquiry from ${form.name}`, {
      Name: form.name,
      Company: form.company,
      Email: form.email,
      "Investment range": form.range,
      "Inquiry type": form.inquiry,
      Message: form.message,
    })
    setSent(true)
  }

  return (
    <div className="min-h-full">
      <Header />
      <main className="public-content">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-400">Investor Relations</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-12 bg-gold" />
            <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">Investor Relations</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-3xl">
            Transparent Corporate Governance
          </h1>
          <p className="text-slate-300 text-xl max-w-xl leading-relaxed">
            Committed to transparency, accountability, and sustainable long-term value creation for all stakeholders.
          </p>
        </div>
      </section>

      {/* ── Key Financials ────────────────────────────────────────────────────── */}


      <section className="bg-navy section-y"><div className="container-page"><div className="public-section-heading"><div><span className="public-eyebrow">INVESTOR INFORMATION</span><h2>Start with the<br/><em>right information.</em></h2></div><p>Request current company information, financial reporting and the supporting documents relevant to your discussion.</p></div><div className="work-intro"><div className="work-intro-mark" aria-hidden="true">N71</div><div><h3>Discuss your due diligence requirements.</h3><p>Our team can clarify which documents are available and the appropriate process for sharing them.</p></div><a className="public-button" href="mailto:investors@network71.com">Request information ↗</a></div></div></section>

      {/* ── Investment Thesis ─────────────────────────────────────────────────── */}
      <section className="bg-navy py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">Why Invest</span>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">Investment Thesis</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {thesis.map((t) => (
              <div key={t.title} className="bg-navy-light border border-white/8 rounded-2xl p-8 hover:border-gold/25 transition-colors duration-300 group">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/15 transition-colors">
                  {t.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors">{t.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Documents ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy-dark py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">Resources</span>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">Documents & Filings</h2>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {documents.map((doc) => (
              <div key={doc.name} className="document-request-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-navy border border-white/8 rounded-xl px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{doc.name}</p>
                    <p className="text-slate-500 text-xs">Ask about current availability</p>
                  </div>
                </div>
                <a className="public-text-link" href={`mailto:investors@network71.com?subject=${encodeURIComponent(doc.subject)}`}>Request details ↗</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Governance Snapshot ───────────────────────────────────────────────── */}
      <section className="bg-navy py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-12 bg-gold" />
                <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">Governance</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-white mb-6 tracking-[-0.02em]">Board Structure</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Network71 maintains a formal governance structure dedicated to accountability, transparency, and sound corporate stewardship across all divisions and geographies.
              </p>
              <p className="text-slate-500 text-sm italic">
                Board composition and governance details to be published.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {["Board of Directors", "Audit Committee", "Risk Committee", "ESG Committee"].map((body) => (
                <div key={body} className="bg-navy-light border border-white/8 rounded-xl p-6 hover:border-gold/20 transition-colors">
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                  </div>
                  <h3 className="text-white text-sm font-semibold mb-1">{body}</h3>
                  <p className="text-slate-500 text-xs">To be published</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ──────────────────────────────────────────────────────── */}
      <section className="bg-navy-dark py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">Contact</span>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h2 className="font-display text-4xl text-white mb-3 tracking-[-0.02em]">Investor Enquiry</h2>
            <p className="text-slate-400 text-sm mb-2">
              Send your questions and the documents you would like to review.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-400">
              <a href="mailto:investors@network71.com" className="flex items-center gap-1.5 hover:text-gold transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                investors@network71.com
              </a>
              <span className="hidden sm:inline text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Direct investor enquiries
              </span>
            </div>
          </div>

          {sent ? (
            <div className="bg-navy border border-gold/20 rounded-2xl p-12 text-center">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-white mb-3">Email Draft Ready</h3>
              <p className="text-slate-400 text-sm">
                Send the prepared draft in your email app to complete your investor enquiry.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-navy border border-white/8 rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="investor-name" className="block text-xs text-slate-400 mb-2 font-medium">Full Name *</label>
                  <input
                    name="name" id="investor-name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="investor-company" className="block text-xs text-slate-400 mb-2 font-medium">Company *</label>
                  <input
                    name="company" id="investor-company"
                    required
                    value={form.company}
                    onChange={handleChange}
                    className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Acme Capital"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="investor-email" className="block text-xs text-slate-400 mb-2 font-medium">Email *</label>
                <input
                  name="email" id="investor-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label htmlFor="investor-range" className="block text-xs text-slate-400 mb-2 font-medium">Investment Range</label>
                <select
                  name="range" id="investor-range"
                  value={form.range}
                  onChange={handleChange}
                  className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                >
                  <option>Not specified</option>
                  <option>Under $100K</option>
                  <option>$100K – $500K</option>
                  <option>$500K – $1M</option>
                  <option>$1M+</option>
                </select>
              </div>
              <div>
                <label htmlFor="investor-inquiry" className="block text-xs text-slate-400 mb-2 font-medium">Type of Enquiry *</label>
                <select
                  name="inquiry" id="investor-inquiry"
                  required
                  value={form.inquiry}
                  onChange={handleChange}
                  className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                >
                  <option>General Inquiry</option>
                  <option>Investment Discussion</option>
                  <option>Partnership</option>
                  <option>Media</option>
                </select>
              </div>
              <div>
                <label htmlFor="investor-message" className="block text-xs text-slate-400 mb-2 font-medium">Message *</label>
                <textarea
                  name="message" id="investor-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  placeholder="Tell us about your enquiry…"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
