import type { LeadershipContent } from "../content/en";
import Avatar from "./Avatar";

export default function Advisors({ c }: { c: LeadershipContent["advisors"] }) {
  return (
    <section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {c.lead}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {c.items.map((a, i) => (
            <div key={i} className="bg-navy rounded-xl p-6 border border-white/8 hover:border-white/15 transition-colors">
              <div className="flex items-start gap-5">
                <Avatar initials={a.initials} gradient={a.gradient} size="sm" />
                <div className="flex-1">
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-2">{a.area}</div>
                  <h3 className="text-white font-semibold mb-1">{c.capabilityLabel}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{a.desc}</p>
                  <div className="mt-4 inline-block px-3 py-1 bg-white/4 border border-white/10 rounded-full text-slate-500 font-mono text-[9px] tracking-wide uppercase">
                    {c.mandateLabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
