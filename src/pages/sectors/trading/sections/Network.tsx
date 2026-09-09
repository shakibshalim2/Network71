import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Network({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-navy relative overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(${BLUE} 1px, transparent 1px), linear-gradient(90deg, ${BLUE} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: BLUE }}>{c.copy.networkReach}</span>
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.copy.networkEyebrow}</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">{c.copy.networkLead}</p>
          </div>

          {/* SVG World Map */}
          <div
            className="relative rounded-3xl overflow-hidden border"
            style={{ borderColor: `color-mix(in srgb, ${BLUE} 15%, transparent)`, background: 'var(--fill-1)' }}
          >
            <svg
              viewBox="0 0 900 480"
              className="w-full"
              style={{ minHeight: '340px' }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ocean background */}
              <rect width="900" height="480" fill="rgba(10,20,45,0.6)" />

              {/* Simplified continent shapes */}
              {/* Europe */}
              <path d="M380 60 L430 55 L460 70 L470 90 L450 110 L420 115 L395 100 L375 80 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Africa */}
              <path d="M390 140 L440 130 L470 150 L480 200 L470 260 L440 300 L410 295 L385 260 L375 210 L380 160 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Asia (simplified) */}
              <path d="M480 50 L600 40 L680 55 L720 80 L730 130 L700 160 L650 155 L600 170 L550 160 L510 140 L480 110 L470 80 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* South Asia extension */}
              <path d="M580 160 L620 165 L635 200 L615 220 L590 210 L570 185 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Southeast Asia */}
              <path d="M670 170 L720 165 L750 185 L740 215 L710 220 L680 205 L665 190 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Middle East */}
              <path d="M490 130 L540 120 L560 140 L555 170 L530 180 L500 165 L485 150 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Americas (simplified) */}
              <path d="M80 60 L160 50 L200 80 L210 140 L195 200 L170 260 L140 270 L115 240 L90 180 L70 120 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              {/* Australia */}
              <path d="M730 270 L790 260 L820 290 L815 330 L775 345 L735 330 L720 300 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

              {/* ── Trade route lines (dashed blue) ── */}
              {/* South Asia → Middle East */}
              <line x1="600" y1="192" x2="522" y2="155" stroke={BLUE} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.7" />
              {/* South Asia → Europe */}
              <line x1="600" y1="192" x2="430" y2="88" stroke={BLUE} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.6" />
              {/* South Asia → Southeast Asia */}
              <line x1="600" y1="192" x2="710" y2="193" stroke={BLUE} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.7" />
              {/* South Asia → Africa */}
              <line x1="600" y1="192" x2="425" y2="215" stroke={BLUE} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.5" />
              {/* Middle East → Europe */}
              <line x1="522" y1="155" x2="430" y2="88" stroke={BLUE} strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
              {/* Middle East → Africa */}
              <line x1="522" y1="155" x2="425" y2="215" stroke={BLUE} strokeWidth="1" strokeDasharray="4 6" opacity="0.35" />

              {/* Animated pulse dots along routes (decorative) */}
              <circle cx="560" cy="175" r="2" fill={BLUE} opacity="0.6" />
              <circle cx="515" cy="120" r="2" fill={BLUE} opacity="0.5" />
              <circle cx="655" cy="192" r="2" fill={BLUE} opacity="0.6" />

              {/* ── Hub markers ── */}

              {/* 1. South Asia Hub (HQ) — cx=600 cy=192 */}
              <circle cx="600" cy="192" r="12" fill={BLUE} opacity="0.2" />
              <circle cx="600" cy="192" r="7" fill={BLUE} opacity="0.5" />
              <circle cx="600" cy="192" r="4" fill={BLUE} />
              {/* HQ label */}
              <rect x="610" y="178" width="82" height="28" rx="5" fill="rgba(10,20,45,0.92)" stroke={BLUE} strokeWidth="0.8" />
              <text x="651" y="196" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">{c.copy.networkSouthAsia}</text>
              <text x="651" y="205" textAnchor="middle" fill={BLUE} fontSize="7.5" fontFamily="system-ui">{c.copy.networkHeadquarters}</text>

              {/* 2. Middle East Hub — cx=522 cy=155 */}
              <circle cx="522" cy="155" r="10" fill={BLUE} opacity="0.18" />
              <circle cx="522" cy="155" r="6" fill={BLUE} opacity="0.4" />
              <circle cx="522" cy="155" r="3.5" fill={BLUE} />
              <rect x="530" y="143" width="80" height="26" rx="5" fill="rgba(10,20,45,0.92)" stroke={BLUE} strokeWidth="0.7" />
              <text x="570" y="159" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">{c.copy.networkMiddleEast}</text>
              <text x="570" y="167" textAnchor="middle" fill={BLUE} fontSize="7.5" fontFamily="system-ui">{c.copy.networkGccHub}</text>

              {/* 3. Europe Hub — cx=430 cy=88 */}
              <circle cx="430" cy="88" r="10" fill={BLUE} opacity="0.18" />
              <circle cx="430" cy="88" r="6" fill={BLUE} opacity="0.4" />
              <circle cx="430" cy="88" r="3.5" fill={BLUE} />
              <rect x="438" y="77" width="78" height="26" rx="5" fill="rgba(10,20,45,0.92)" stroke={BLUE} strokeWidth="0.7" />
              <text x="477" y="92" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">{c.copy.networkEurope}</text>
              <text x="477" y="100" textAnchor="middle" fill={BLUE} fontSize="7.5" fontFamily="system-ui">{c.copy.networkPremium}</text>

              {/* 4. Southeast Asia Hub — cx=710 cy=193 */}
              <circle cx="710" cy="193" r="10" fill={BLUE} opacity="0.18" />
              <circle cx="710" cy="193" r="6" fill={BLUE} opacity="0.4" />
              <circle cx="710" cy="193" r="3.5" fill={BLUE} />
              <rect x="718" y="181" width="82" height="26" rx="5" fill="rgba(10,20,45,0.92)" stroke={BLUE} strokeWidth="0.7" />
              <text x="759" y="197" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">{c.copy.networkSoutheastAsia}</text>
              <text x="759" y="205" textAnchor="middle" fill={BLUE} fontSize="7.5" fontFamily="system-ui">{c.copy.networkDistribution}</text>

              {/* 5. Africa Hub — cx=425 cy=215 */}
              <circle cx="425" cy="215" r="10" fill={BLUE} opacity="0.18" />
              <circle cx="425" cy="215" r="6" fill={BLUE} opacity="0.4" />
              <circle cx="425" cy="215" r="3.5" fill={BLUE} />
              <rect x="433" y="204" width="76" height="26" rx="5" fill="rgba(10,20,45,0.92)" stroke={BLUE} strokeWidth="0.7" />
              <text x="471" y="219" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">{c.copy.networkAfrica}</text>
              <text x="471" y="227" textAnchor="middle" fill={BLUE} fontSize="7.5" fontFamily="system-ui">{c.copy.networkEmerging}</text>

              {/* 25+ countries callout badge */}
              <rect x="30" y="360" width="115" height="50" rx="10" fill={BLUE} />
              <text x="87" y="382" textAnchor="middle" fill="white" fontSize="18" fontFamily="system-ui" fontWeight="700">25+</text>
              <text x="87" y="398" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="system-ui">{c.copy.networkCountries}</text>

              {/* Legend */}
              <line x1="30" y1="430" x2="60" y2="430" stroke={BLUE} strokeWidth="1.5" strokeDasharray="6 4" />
              <text x="66" y="434" fill="rgba(255,255,255,0.5)" fontSize="8.5" fontFamily="system-ui">{c.copy.networkRoute}</text>
              <circle cx="44" cy="450" r="4" fill={BLUE} />
              <text x="55" y="454" fill="rgba(255,255,255,0.5)" fontSize="8.5" fontFamily="system-ui">{c.copy.networkHub}</text>
            </svg>
          </div>
        </div>
      </section>

  )
}
