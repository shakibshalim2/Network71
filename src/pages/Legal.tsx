import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sections = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms of Use' },
  { id: 'cookies', label: 'Cookie Policy' },
  { id: 'compliance', label: 'Compliance' },
]

export default function Legal() {
  const [active, setActive] = useState('privacy')

  const scrollTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-[68px] overflow-hidden bg-navy-dark">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">Network71</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl text-white mb-5">Legal & Compliance</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            Our legal frameworks, policies, and compliance commitments that govern how we operate globally.
          </p>
          <p className="text-slate-500 text-sm mt-4">Last updated: August 2025</p>
        </div>
      </section>

      {/* Body with sticky sidebar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex gap-12">

          {/* Sticky sidebar TOC */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <nav className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Contents</p>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors font-medium ${active === s.id ? 'bg-gold/10 text-gold border-l-2 border-gold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  {s.label}
                </button>
              ))}
              <div className="pt-6 border-t border-white/8 mt-6">
                <a
                  href="mailto:legal@network71.com"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-gold transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Legal Inquiries
                </a>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-16">

            {/* Privacy Policy */}
            <article id="privacy" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl text-white">Privacy Policy</h2>
              </div>
              <div className="prose prose-invert prose-sm max-w-none space-y-5 text-slate-300 leading-relaxed">
                <p>
                  Network71 Group and its affiliates ("Network71", "we", "us", or "our") are committed to protecting the personal data of all individuals who interact with our websites, services, and business operations. This Privacy Policy explains how we collect, use, retain, and protect your information.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">1. Information We Collect</h3>
                <p>
                  We may collect personal information including but not limited to: name, email address, phone number, company name, job title, and communications you send to us. We also collect technical data such as IP addresses, browser type, pages visited, and time spent on our website through standard analytics tools.
                </p>
                <p>
                  Information is collected when you: submit contact or inquiry forms, register for events or newsletters, correspond with us by email or telephone, or visit our website and consent to cookie usage.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">2. How We Use Your Information</h3>
                <p>We use your personal data to:</p>
                <ul className="list-disc list-inside space-y-1.5 text-slate-400 ml-2">
                  <li>Respond to inquiries and provide requested services</li>
                  <li>Send newsletters or updates where you have opted in</li>
                  <li>Improve our website and service offerings</li>
                  <li>Comply with applicable legal and regulatory obligations</li>
                  <li>Maintain records for accounting and audit purposes</li>
                  <li>Detect and prevent fraudulent activity</li>
                </ul>
                <p>
                  We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">3. Data Retention</h3>
                <p>
                  We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Business correspondence is retained for a minimum of seven (7) years in line with standard accounting and legal requirements. You may request deletion of your data by contacting us at <a href="mailto:privacy@network71.com" className="text-gold hover:underline">privacy@network71.com</a>.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">4. Your Rights</h3>
                <p>
                  Depending on your jurisdiction, you may have rights including: access to your personal data, correction of inaccurate data, deletion of data, restriction of processing, and data portability. To exercise any of these rights, contact our privacy team at <a href="mailto:privacy@network71.com" className="text-gold hover:underline">privacy@network71.com</a>.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">5. Data Security</h3>
                <p>
                  We implement appropriate technical and organisational measures to protect personal data against accidental or unlawful destruction, loss, alteration, or unauthorised disclosure. However, no internet transmission is completely secure; we cannot guarantee absolute security of data transmitted to our website.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">6. International Transfers</h3>
                <p>
                  As a global enterprise, your data may be processed in countries outside your jurisdiction. We ensure appropriate safeguards are in place in accordance with applicable data protection laws when transferring data internationally.
                </p>
              </div>
            </article>

            <div className="border-t border-white/8" />

            {/* Terms of Use */}
            <article id="terms" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-teal/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl text-white">Terms of Use</h2>
              </div>
              <div className="space-y-5 text-slate-300 leading-relaxed">
                <p>
                  By accessing and using this website (network71.com and its subdomains), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please discontinue use of this website.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">1. Use of the Site</h3>
                <p>
                  This website is intended for informational purposes regarding Network71 and its affiliated companies. You agree to use this site only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the site.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">2. Intellectual Property</h3>
                <p>
                  All content on this website — including text, graphics, logos, images, and software — is the exclusive property of Network71 or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent from Network71.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">3. Disclaimers</h3>
                <p>
                  This website is provided on an "as is" basis without warranties of any kind, either express or implied. Network71 makes no representations or warranties about the accuracy, completeness, or suitability of the content for any purpose. Content may be changed, updated, or removed without notice.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">4. Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by applicable law, Network71 shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on any information provided herein. Our aggregate liability for direct damages shall not exceed USD 100.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">5. Third-Party Links</h3>
                <p>
                  This website may contain links to third-party websites for convenience. Network71 does not endorse, control, or accept responsibility for the content of those sites and encourages you to review their privacy and legal policies.
                </p>

                <h3 className="text-white font-semibold text-lg mt-8 mb-3">6. Governing Law</h3>
                <p>
                  These Terms of Use shall be governed by and construed in accordance with the laws of Bangladesh, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.
                </p>
              </div>
            </article>

            <div className="border-t border-white/8" />

            {/* Cookie Policy */}
            <article id="cookies" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl text-white">Cookie Policy</h2>
              </div>
              <div className="space-y-5 text-slate-300 leading-relaxed">
                <p>
                  Our website uses cookies to enhance your browsing experience. This policy explains what cookies are, which ones we use, and how you can manage your preferences.
                </p>

                <h3 className="text-white font-semibold text-lg mt-6 mb-3">What Are Cookies?</h3>
                <p>
                  Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve functionality.
                </p>

                <h3 className="text-white font-semibold text-lg mt-6 mb-3">Cookies We Use</h3>
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  {[
                    { type: 'Essential', desc: 'Required for the website to function. Cannot be disabled.' },
                    { type: 'Analytics', desc: 'Help us understand how visitors interact with our site.' },
                    { type: 'Preferences', desc: 'Remember your settings and language preferences.' },
                  ].map((c) => (
                    <div key={c.type} className="bg-navy-light border border-white/8 rounded-lg p-4">
                      <h4 className="text-white font-semibold text-sm mb-1.5">{c.type}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-white font-semibold text-lg mt-6 mb-3">Managing Cookies</h3>
                <p>
                  You can control and/or delete cookies through your browser settings. Disabling cookies may affect certain functionality of this website. For more information, visit <span className="text-gold">aboutcookies.org</span>.
                </p>
              </div>
            </article>

            <div className="border-t border-white/8" />

            {/* Compliance Certifications */}
            <article id="compliance" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-teal/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl text-white">Compliance Certifications</h2>
              </div>
              <div className="flex flex-col items-center justify-center py-16 border border-dashed border-white/15 rounded-2xl bg-navy-light/30">
                <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-4">To be published</span>
                <p className="text-white font-display text-2xl mb-2">ISO & Trade Compliance Certifications</p>
                <p className="text-slate-400 text-sm max-w-sm text-center">
                  Our certifications — including ISO standards and international trade compliance credentials — will be published here upon verification.
                </p>
              </div>
            </article>

            {/* Legal Contact */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-7 bg-navy-light border border-white/8 rounded-2xl">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Legal Inquiries</h3>
                <p className="text-slate-400 text-sm">For questions concerning our legal policies or compliance matters, contact our legal team.</p>
              </div>
              <a
                href="mailto:legal@network71.com"
                className="flex-shrink-0 px-6 py-3 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                legal@network71.com
              </a>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
