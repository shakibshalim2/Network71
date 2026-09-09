import type { LeadershipContent } from "../content/en";
import Avatar from "./Avatar";

export default function SeniorLeaders({ c }: { c: LeadershipContent["senior"] }) {
  return (
    <section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {c.lead}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {c.leaders.map((leader) => (
            <div key={leader.initials} className="bg-navy rounded-xl p-6 border border-white/8 hover:border-white/15 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Avatar initials={leader.initials} gradient={leader.gradient} size="md" />
                <div className="mt-5 mb-2">
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-2">
                    {leader.abbr}
                  </div>
                  <h3 className="text-white font-semibold">{leader.title}</h3>
                  <p className="text-gold text-xs mt-1 font-medium">{c.functionLabel}</p>
                </div>
                <div className="w-full h-px bg-white/8 my-4" />
                <p className="text-slate-400 text-xs leading-relaxed">{leader.responsibilities}</p>
                <div className="mt-4 w-full py-2.5 rounded-lg bg-white/4 border border-white/8 text-slate-500 font-mono text-[9px] tracking-wide uppercase">
                  {c.mandateLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
