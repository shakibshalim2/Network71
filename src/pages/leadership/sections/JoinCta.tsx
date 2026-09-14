import { Link } from "react-router-dom";
import type { LeadershipContent } from "../content/en";

export default function JoinCta({ c }: { c: LeadershipContent["cta"] }) {
  return (
    <section className="py-24 px-6 bg-navy">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-navy-dark rounded-2xl p-10 border border-white/8 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/25 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-5 tracking-[-0.02em]">
              {c.title}
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              {c.lead}
            </p>
            <Link
              to={c.href}
              className="btn btn-primary"
            >
              {c.button}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
