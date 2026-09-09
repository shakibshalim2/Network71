import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useInquiry } from "@/lib/inquiry"

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  department: string
  message: string
}

const divisionEmails = [
  "Garments & Apparel",
  "Agriculture & Agro",
  "Food & Beverage",
  "Oils & Energy",
  "IT & Software",
  "Global Trading",
  "Media",
  "eSHIPe Maritime",
]

export default function Contact() {
  const [params] = useSearchParams()
  const project = params.get('project')?.slice(0, 200)
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    department: "General",
    message: project ? `I would like to discuss a project similar to “${project}”.\n\nMy requirements:\n` : "",
  })
  const inquiry = useInquiry()
  const sent = Boolean(inquiry.reference)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void inquiry.submit({ ...form, subject: `${form.department} enquiry` })
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
            <span className="text-slate-400">Contact</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-12 bg-gold" />
            <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">Contact Us</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-6">
            Get in Touch
          </h1>
          <p className="text-slate-300 text-xl max-w-xl leading-relaxed">
            Whether you are a partner, investor, or job seeker — we would love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Contact Method Cards ──────────────────────────────────────────────── */}
      <section className="bg-navy-dark py-16 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-7">
            {/* Email */}
            <div className="bg-navy border border-white/8 rounded-2xl p-8 text-center hover:border-gold/25 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/15 transition-colors">
                <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-white mb-2">Email</h3>
              <a href="mailto:info@network71.com" className="text-gold text-sm hover:underline">
                info@network71.com
              </a>
              <p className="text-slate-500 text-xs mt-2">General enquiries</p>
            </div>

            {/* Location */}
            <div className="bg-navy border border-white/8 rounded-2xl p-8 text-center hover:border-gold/25 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/15 transition-colors">
                <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-white mb-2">Location</h3>
              <p className="text-slate-300 text-sm">Dhaka, Bangladesh</p>
              <p className="text-slate-500 text-xs mt-2">Global headquarters</p>
            </div>

            {/* Social */}
            <div className="bg-navy border border-white/8 rounded-2xl p-8 text-center hover:border-gold/25 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/15 transition-colors">
                <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-white mb-2">Social</h3>
              <p className="text-slate-400 text-sm">Official channels will be published here.</p>
              <p className="text-slate-500 text-xs mt-2">For updates, contact our media team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Form ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-gold" />
                  <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">Send a Message</span>
                </div>
                <h2 className="font-display text-4xl text-white tracking-[-0.02em]">Contact Form</h2>
              </div>

              {sent ? (
                <div role="status" className="bg-navy-dark border border-gold/20 rounded-2xl p-12 text-center">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-white mb-3">Enquiry Received</h3>
                  <p className="text-slate-400 text-sm">
                    Thank you for contacting us. Your reference is {inquiry.reference}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {inquiry.error && <p role="alert" className="text-sm" style={{ color: 'var(--accent-red)' }}>{inquiry.error}</p>}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs text-slate-400 mb-2 font-medium">Full Name *</label>
                      <input
                        name="name" id="contact-name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="Ahmed Hassan"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-company" className="block text-xs text-slate-400 mb-2 font-medium">Company (optional)</label>
                      <input
                        name="company" id="contact-company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs text-slate-400 mb-2 font-medium">Email *</label>
                      <input
                        name="email" id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs text-slate-400 mb-2 font-medium">Phone (optional)</label>
                      <input
                        name="phone" id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="+880 1XXXXXXXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-department" className="block text-xs text-slate-400 mb-2 font-medium">Department *</label>
                    <select
                      name="department" id="contact-department"
                      required
                      value={form.department}
                      onChange={handleChange}
                      className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                    >
                      <option>General</option>
                      <option>Investors</option>
                      <option>Careers</option>
                      <option>Partnerships</option>
                      <option>Media</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-xs text-slate-400 mb-2 font-medium">Message *</label>
                    <textarea
                      name="message" id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={inquiry.busy}
                    className="w-full py-3.5 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
                  >
                    {inquiry.busy ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Offices */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-gold" />
                  <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">Offices</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-navy-dark border border-white/8 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      <span className="text-white text-sm font-semibold">Headquarters</span>
                    </div>
                    <p className="text-slate-400 text-sm">Dhaka, Bangladesh</p>
                    <a href="mailto:info@network71.com" className="text-gold text-xs hover:underline mt-2 inline-block">
                      info@network71.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Division contacts */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-gold" />
                  <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">By Division</span>
                </div>
                <div className="space-y-3">
                  {divisionEmails.map((division) => (
                    <div key={division} className="flex items-center justify-between py-3 border-b border-white/6 last:border-0">
                      <span className="text-slate-400 text-sm">{division}</span>
                      <a
                        href={`mailto:info@network71.com?subject=${encodeURIComponent(`${division} enquiry`)}`}
                        className="text-gold text-xs hover:underline flex-shrink-0 ml-3"
                      >
                        Enquire
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
