import { useState } from 'react'

interface SectorContactProps {
  divisionName: string
  accentHex: string
  inquiryTypes?: string[]
}

export default function SectorContact({
  divisionName,
  accentHex,
  inquiryTypes = ['General Inquiry', 'Partnership', 'Buyer Inquiry', 'Investment', 'Supplier Inquiry'],
}: SectorContactProps) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', type: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputCls =
    'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-white/30 transition-colors'

  return (
    <section id="sector-contact" className="bg-navy-dark py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left — contact info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: accentHex }} />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: accentHex }}>
                Get In Touch
              </span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-5">
              Connect With the {divisionName} Division
            </h2>
            <p className="text-slate-400 leading-relaxed mb-10 text-sm">
              Whether you are a buyer, investor, distributor, or potential partner — our {divisionName} team is ready to explore opportunities with you.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accentHex}18`, border: `1px solid ${accentHex}30` }}>
                  <svg className="w-4 h-4" style={{ color: accentHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Email</div>
                  <a href="mailto:info@network71.com" className="text-slate-400 text-sm hover:text-white transition-colors">info@network71.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accentHex}18`, border: `1px solid ${accentHex}30` }}>
                  <svg className="w-4 h-4" style={{ color: accentHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Headquarters</div>
                  <div className="text-slate-400 text-sm">Dhaka, Bangladesh</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accentHex}18`, border: `1px solid ${accentHex}30` }}>
                  <svg className="w-4 h-4" style={{ color: accentHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Web</div>
                  <a href="https://network71.com" className="text-slate-400 text-sm hover:text-white transition-colors">network71.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: `${accentHex}20` }}>
                  <svg className="w-8 h-8" style={{ color: accentHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-display text-2xl mb-3">Inquiry Received</h3>
                <p className="text-slate-400 text-sm max-w-xs">Thank you. Our {divisionName} team will respond to your inquiry within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input className={inputCls} name="name" placeholder="Full Name" value={form.name} onChange={handle} required />
                  <input className={inputCls} name="company" placeholder="Company / Organisation" value={form.company} onChange={handle} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input className={inputCls} type="email" name="email" placeholder="Email Address" value={form.email} onChange={handle} required />
                  <input className={inputCls} name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handle} />
                </div>
                <select className={inputCls} name="type" value={form.type} onChange={handle}>
                  <option value="" disabled>Type of Inquiry</option>
                  {inquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <textarea
                  className={`${inputCls} resize-none`}
                  name="message"
                  placeholder="Tell us about your requirements..."
                  rows={5}
                  value={form.message}
                  onChange={handle}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3.5 font-semibold text-sm text-navy rounded-lg transition-all duration-200 hover:opacity-90"
                  style={{ background: accentHex }}
                >
                  Send Inquiry
                </button>
                <p className="text-slate-600 text-xs text-center">
                  We respect your privacy. Information shared is used solely for business correspondence.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
