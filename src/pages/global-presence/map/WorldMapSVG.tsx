import type { GlobalPresenceContent } from '../content/en'
import Continents from './Continents'

type MapData = Pick<GlobalPresenceContent['map'], 'cities' | 'arcs'>

// equirectangular projection: x=(lon+180)/360*900, y=(90-lat)/180*400
export default function WorldMapSVG({ cities, arcs }: MapData) {
  return (
    <div className="w-full relative">
      <svg viewBox="0 0 900 400" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E6B800" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E6B800" stopOpacity="0" />
          </radialGradient>
          <filter id="cityGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="arrowTip" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <circle cx="3" cy="3" r="1.5" fill="rgba(230,184,0,0.7)" />
          </marker>
        </defs>

        {/* Subtle lat/lon grid */}
        {[30, 60, 90, 120, 150].map(lon => (
          <line key={`lon${lon}`} x1={lon / 360 * 900} y1="0" x2={lon / 360 * 900} y2="400"
            stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
        ))}
        {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(lon => (
          <line key={`lon${lon}b`} x1={(lon / 360) * 900} y1="0" x2={(lon / 360) * 900} y2="400"
            stroke="rgba(255,255,255,0.025)" strokeWidth="0.6" />
        ))}
        {[0.25, 0.5, 0.75].map((frac, i) => (
          <line key={`lat${i}`} x1="0" y1={frac * 400} x2="900" y2={frac * 400}
            stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
        ))}

        {/* ── Continent fills ── */}
        <Continents />

        {/* ── Trade route arcs (quadratic bezier) ── */}
        {arcs.map((a, i) => (
          <path
            key={i}
            d={`M${a.x1},${a.y1} Q${a.cx},${a.cy} ${a.x2},${a.y2}`}
            fill="none"
            stroke="rgba(230,184,0,0.22)"
            strokeWidth="1.2"
            strokeDasharray="5 5"
            markerEnd="url(#arrowTip)"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-40" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          </path>
        ))}
        {/* Route glow layer */}
        {arcs.map((a, i) => (
          <path
            key={`glow${i}`}
            d={`M${a.x1},${a.y1} Q${a.cx},${a.cy} ${a.x2},${a.y2}`}
            fill="none"
            stroke="rgba(230,184,0,0.06)"
            strokeWidth="4"
          />
        ))}

        {/* ── City markers ── */}
        {cities.map((c) => (
          <g key={c.label} filter="url(#cityGlow)">
            {c.pulse && (
              <>
                <circle cx={c.cx} cy={c.cy} r="20" fill="url(#hqGlow)">
                  <animate attributeName="r" values="12;28;12" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx={c.cx} cy={c.cy} r="12" fill="rgba(230,184,0,0.15)">
                  <animate attributeName="r" values="7;16;7" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
              </>
            )}
            <circle cx={c.cx} cy={c.cy} r={c.primary ? 6 : 4}
              fill={c.primary ? "#E6B800" : "rgba(230,184,0,0.75)"}
              stroke={c.primary ? "rgba(230,184,0,0.3)" : "none"}
              strokeWidth="4"
            />
            {c.sublabel && (
              <text x={c.cx + 8} y={c.cy - 6} fill="#E6B800" fontSize="7" fontWeight="800" fontFamily="monospace" letterSpacing="0.08em">
                {c.sublabel}
              </text>
            )}
            <text x={c.cx + 8} y={c.cy + 5} fill="rgba(255,255,255,0.75)" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
