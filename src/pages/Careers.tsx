import { useState } from "react"
import {
  usePublicContent,
  textField,
  type PublishedPage,
} from "@/lib/publicContent"
import { Link } from "react-router-dom"

import Header from "@/components/Header"

import Footer from "@/components/Footer"

const benefits = [
  {
    title: "Competitive Compensation",

    desc: "Market-leading packages with performance bonuses and equity opportunities.",

    icon: (
      <svg
        className="w-6 h-6 text-gold"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33"
        />
      </svg>
    ),
  },

  {
    title: "Global Exposure",

    desc: "Collaborate across business divisions and contribute to practical projects.",

    icon: (
      <svg
        className="w-6 h-6 text-gold"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582"
        />
      </svg>
    ),
  },

  {
    title: "Learning & Development",

    desc: "Structured training programmes, mentorship, and sponsored professional certifications.",

    icon: (
      <svg
        className="w-6 h-6 text-gold"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
  },

  {
    title: "Innovation Culture",

    desc: "A flat hierarchy that encourages bold ideas, rapid experimentation, and entrepreneurial thinking.",

    icon: (
      <svg
        className="w-6 h-6 text-gold"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
  },

  {
    title: "Collaborative Environment",

    desc: "Diverse, respectful teams where every voice counts and cross-functional work is the norm.",

    icon: (
      <svg
        className="w-6 h-6 text-gold"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
  },

  {
    title: "Meaningful Impact",

    desc: "Your work contributes to economic growth across emerging markets, creating tangible change at scale.",

    icon: (
      <svg
        className="w-6 h-6 text-gold"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
        />
      </svg>
    ),
  },
]

const hiringSteps = [
  {
    step: "01",
    title: "Apply",
    desc: "Send your CV to careers@network71.com or hit Apply on any listing.",
  },

  {
    step: "02",
    title: "Review",
    desc: "Our team reviews applications against the requirements of each role.",
  },

  {
    step: "03",
    title: "Interview",
    desc: "Up to two interview rounds — one with HR, one with the hiring manager.",
  },

  {
    step: "04",
    title: "Offer",
    desc: "Successful candidates receive a formal offer and onboarding plan.",
  },
]

export default function Careers() {
  const [page, setPage] = useState(1)
  const { data, loading, error, retry } = usePublicContent<PublishedPage>(
    "jobs?page=" + page,
  )
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())
  const openings = (data?.items || [])
    .filter(
      (job) =>
        !textField(job, "deadline") || textField(job, "deadline") >= today,
    )
    .map((job) => ({
      id: job.id,
      title: textField(job, "title"),
      division: textField(job, "employment"),
      location: textField(job, "location"),
      body: textField(job, "body"),
      deadline: textField(job, "deadline"),
      email: textField(job, "email"),
    }))

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
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-400">Careers</span>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-gold" />
              <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">
                Careers
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-3xl">
              Build Your Career at Network71
            </h1>
            <p className="text-slate-300 text-xl max-w-xl leading-relaxed">
              Join a team of driven professionals working across our business
              divisions. Shape the future of emerging markets from day one.
            </p>
            <div className="mt-10">
              <a
                href="mailto:careers@network71.com"
                className="inline-flex items-center px-8 py-3.5 bg-gold text-on-brand text-sm font-semibold rounded hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
              >
                Send Your CV
              </a>
            </div>
          </div>
        </section>

        {/* ── Culture / Benefits ────────────────────────────────────────────────── */}
        <section className="bg-navy-dark py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-gold" />
                <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">
                  Culture
                </span>
                <div className="h-px w-12 bg-gold" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">
                Why Network71?
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-navy border border-white/8 rounded-2xl p-8 hover:border-gold/25 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
                    {b.icon}
                  </div>
                  <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Roles ────────────────────────────────────────────────────────── */}
        <section className="bg-navy py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-gold" />
                <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">
                  Open Positions
                </span>
                <div className="h-px w-12 bg-gold" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">
                Current Openings
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {loading && <p role="status">Loading vacancies…</p>}
              {error && (
                <div role="alert">
                  <p>{error}</p>
                  <button className="public-button" onClick={retry}>
                    Try again
                  </button>
                </div>
              )}
              {!loading && !error && !openings.length && (
                <div className="public-empty md:col-span-2">
                  <h3>No open vacancies are listed here.</h3>
                  <p>
                    Send your CV to careers@network71.com to introduce yourself
                    for future opportunities.
                  </p>
                </div>
              )}
              {openings.map((job) => (
                <div
                  key={job.id}
                  className="bg-navy-dark border border-white/8 rounded-2xl p-8 flex flex-col sm:flex-row items-start justify-between gap-6 hover:border-gold/25 transition-colors duration-300 group"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl text-white mb-2 group-hover:text-gold transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gold bg-gold/10 px-3 py-1 rounded-full">
                        {job.division}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {job.location}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 whitespace-pre-line">
                      {job.body}
                    </p>
                    {job.deadline && (
                      <p className="text-sm text-slate-500 mt-3">
                        Apply by {job.deadline}
                      </p>
                    )}
                  </div>
                  <a
                    href={`mailto:${encodeURIComponent(job.email)}?subject=Application: ${encodeURIComponent(job.title)}`}
                    className="flex-shrink-0 px-5 py-2.5 bg-gold text-on-brand text-xs font-semibold rounded hover:bg-gold-light transition-colors"
                  >
                    Apply
                  </a>
                </div>
              ))}
            </div>
            {!loading && (data?.pages || 1) > 1 && (
              <nav className="work-pagination" aria-label="Vacancy pages">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                  Previous
                </button>
                <span>
                  Page {page} of {data?.pages}
                </span>
                <button
                  disabled={page >= (data?.pages || 1)}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        </section>

        {/* ── Hiring Process ────────────────────────────────────────────────────── */}
        <section className="bg-navy-dark py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-gold" />
                <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">
                  Process
                </span>
                <div className="h-px w-12 bg-gold" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">
                How We Hire
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hiringSteps.map((s, i) => (
                <div
                  key={s.step}
                  className="relative bg-navy border border-white/8 rounded-2xl p-8 hover:border-gold/25 transition-colors duration-300"
                >
                  {i < hiringSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/20 z-10" />
                  )}
                  <div className="font-display text-5xl text-gold leading-none mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-display text-lg text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────────────────── */}

        {/* ── CTA ───────────────────────────────────────────────────────────────── */}
        <section className="bg-navy-dark py-20 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-4 tracking-[-0.02em]">
              {"Don't see a fit?"}
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              {
                "Send us your CV anyway. We're always looking for exceptional talent."
              }
            </p>
            <a
              href="mailto:careers@network71.com?subject=Speculative CV Submission"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-on-brand text-sm font-semibold rounded hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
            >
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              careers@network71.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
