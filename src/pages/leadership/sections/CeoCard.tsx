import type { LeadershipContent } from "../content/en";
import { spotlight } from "@/lib/useSpotlight";

export default function CeoCard({ c }: { c: LeadershipContent["ceo"] }) {
  return (
    <section className="py-24 px-6 bg-navy">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
        </div>

        {/* CEO Card — prominent, gold accent border */}
        <div className="ceo relative rounded-2xl p-8 sm:p-10 bg-navy-dark overflow-hidden" onPointerMove={spotlight}>
          <span className="ceo__spot" aria-hidden="true" />
          <span className="ceo__grid" aria-hidden="true" />
          <span className="about-plate__corner about-plate__corner--tl" aria-hidden="true" />
          <span className="about-plate__corner about-plate__corner--br" aria-hidden="true" />
          <span className="ceo__mark font-display" aria-hidden="true">N71</span>

          <div className="relative z-10 flex flex-col sm:flex-row gap-8">
            {/* Monogram: drawn ring instead of a gradient tile */}
            <div className="flex flex-col items-center sm:items-start gap-4">
              <span className="ceo__mono" aria-hidden="true">
                <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" pathLength="1" /></svg>
                <span className="font-display">{c.initials}</span>
              </span>
              <div className="text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/15 border border-gold/30 rounded-full text-gold text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  {c.badge}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
                {c.name}
              </h3>
              <p className="text-slate-400 text-sm mb-6">{c.role} &nbsp;&bull;&nbsp; {c.location}</p>

              <div className="border-l-2 border-gold pl-5 mb-6">
                <p className="text-slate-300 leading-relaxed text-lg">
                  {c.quote}
                </p>
              </div>

              <div className="bg-white/4 rounded-xl p-5 border border-white/8">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span className="text-white text-sm font-semibold">{c.profileLabel}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {c.profile}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((tag, i) => (
                  <span key={tag} className="ceo__tag"><span>{String(i + 1).padStart(2, "0")}</span>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
