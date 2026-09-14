import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Infrastructure({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{c.copy.infrastructureEyebrow}</span>
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.copy.infrastructureTitle}</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">{c.copy.infrastructureLead}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                ),
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                ),
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ),
              },
            ].map((icon, i) => ({ ...icon, ...c.freightModes[i] })).map((t) => (
              <div
                key={t.mode}
                className="bg-surface-2 rounded-2xl p-8 border-t-4 hover:shadow-xl transition-all"
                style={{ borderColor: BLUE }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in srgb, ${BLUE} 7%, transparent)`, color: BLUE }}
                >
                  {t.icon}
                </div>
                <div className="mb-1">
                  <span className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: BLUE }}>{t.tag}</span>
                </div>
                <h3 className="font-display text-2xl text-fg mb-4">{t.mode}</h3>
                <ul className="space-y-2.5 mb-5">
                  {t.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: BLUE, color: 'var(--s0)' }} />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-400 text-xs italic">{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
