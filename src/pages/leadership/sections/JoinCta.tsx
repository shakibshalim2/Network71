import { Link } from "react-router-dom";
import type { LeadershipContent } from "../content/en";

export default function JoinCta({ c }: { c: LeadershipContent["cta"] }) {
  return (
    <section className="py-24 px-6 bg-navy">
      <div className="max-w-7xl mx-auto cta-band cta-band--flush">
        <span className="cta-band__rule" aria-hidden="true" />
        <div>
          <h2 className="font-display font-bold text-white mb-3 tracking-[-0.02em]" style={{ fontSize: "clamp(26px, 5vw, 44px)" }}>
            {c.title}
          </h2>
          <p className="text-slate-400 leading-relaxed" style={{ fontSize: "clamp(14.5px, 3.6vw, 17px)", maxWidth: "44ch" }}>
            {c.lead}
          </p>
        </div>
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
    </section>
  );
}
