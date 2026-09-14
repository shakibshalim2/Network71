import type { CareersContent } from "../content/en"

export default function Cta({
  c,
  onApply,
}: {
  c: CareersContent["cta"]
  onApply: () => void
}) {
  return (
    <section className="bg-navy-dark py-20 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl sm:text-5xl text-white mb-4 tracking-[-0.02em]">
          {c.title}
        </h2>
        <p className="text-slate-400 text-lg mb-8">{c.text}</p>
        <button
          type="button"
          onClick={onApply}
          className="btn btn-primary"
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
          {c.apply}
        </button>
      </div>
    </section>
  )
}
