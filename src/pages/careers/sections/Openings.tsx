import { useState } from "react"

import {
  usePublicContent,
  textField,
  type PublishedPage,
} from "@/lib/publicContent"

import type { CareersContent } from "../content/en"
import type { ApplicationTarget } from "./ApplicationForm"

export default function Openings({
  c,
  onApply,
}: {
  c: CareersContent["openings"]
  onApply: (target: ApplicationTarget) => void
}) {
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
      slug: job.slug,
      title: textField(job, "title"),

      division: textField(job, "employment"),

      location: textField(job, "location"),

      body: textField(job, "body"),

      deadline: textField(job, "deadline"),

    }))

  return (
    <section className="bg-navy py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium">
              {c.eyebrow}
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-[-0.02em]">
            {c.title}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {loading && <p role="status">{c.loading}</p>}
          {error && (
            <div role="alert">
              <p>{error}</p>
              <button className="public-button" onClick={retry}>
                {c.retry}
              </button>
            </div>
          )}
          {!loading && !error && !openings.length && (
            <div className="public-empty md:col-span-2">
              <h3>{c.emptyTitle}</h3>
              <p>{c.emptyText}</p>
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
                    {c.applyBy.replace("{date}", job.deadline)}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => onApply({ slug: job.slug, title: job.title })}
                className="flex-shrink-0 px-5 py-2.5 bg-gold text-on-brand text-xs font-semibold rounded hover:bg-gold-light transition-colors"
              >
                {c.apply}
              </button>
            </div>
          ))}
        </div>
        {!loading && (data?.pages || 1) > 1 && (
          <nav className="work-pagination" aria-label={c.paginationLabel}>
            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              {c.previous}
            </button>
            <span>
              {c.pageOf
                .replace("{page}", String(page))
                .replace("{total}", String(data?.pages))}
            </span>
            <button
              disabled={page >= (data?.pages || 1)}
              onClick={() => setPage(page + 1)}
            >
              {c.next}
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}
