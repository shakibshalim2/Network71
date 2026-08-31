import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const regions = [
  {
    name: "South Asia",
    tag: "HQ & Primary Operations",
    tagColor: "bg-gold/15 text-gold border-gold/25",
    desc: "Bangladesh serves as Network71 headquarters and the centre of garment manufacturing, agro-processing, and food production operations. The region anchors our supply chain and workforce.",
    countries: "Data to be published",
    icon: "🇧🇩",
    highlights: ["Headquarters: Dhaka, Bangladesh", "Largest workforce concentration", "Primary manufacturing base"],
  },
  {
    name: "Middle East",
    tag: "Trading Hub",
    tagColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    desc: "A critical hub for import/export activity, re-export trade, and B2B distribution of agricultural commodities, edible oils, and consumer goods.",
    countries: "Data to be published",
    icon: "🌙",
    highlights: ["Commodity re-export corridor", "B2B distribution networks", "Edible oil & food trade"],
  },
  {
    name: "Europe",
    tag: "Import/Export Markets",
    tagColor: "bg-purple-500/15 text-purple-300 border-purple-500/25",
    desc: "Export destination for Network71 garments, agricultural produce, and food products. Active compliance engagement with EU trade frameworks.",
    countries: "Data to be published",
    icon: "🏰",
    highlights: ["Garment export destination", "EU compliance frameworks", "Premium agro-product markets"],
  },
  {
    name: "Southeast Asia",
    tag: "Manufacturing & Sourcing",
    tagColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    desc: "Strategic sourcing region for raw materials, components, and manufacturing partnerships supporting Network71 production requirements.",
    countries: "Data to be published",
    icon: "🌴",
    highlights: ["Raw material sourcing", "Manufacturing partnerships", "Regional logistics corridors"],
  },
  {
    name: "Africa",
    tag: "Emerging Markets",
    tagColor: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    desc: "Emerging commercial footprint in agricultural commodity trade and consumer goods, with active market development underway.",
    countries: "Data to be published",
    icon: "🌍",
    highlights: ["Agricultural commodity trade", "Consumer goods distribution", "Market development phase"],
  },
];

const divisionGeography = [
  { name: "Garments & Apparel", focus: "Manufacturing: Bangladesh → Export: Europe, North America, Middle East", href: "/divisions/garments", icon: "🧵" },
  { name: "Agriculture & Agro", focus: "Farming: South Asia → Trade: Middle East, Southeast Asia, Africa", href: "/divisions/agriculture", icon: "🌾" },
  { name: "Food & Beverage", focus: "Production: Bangladesh → Distribution: South Asia, Middle East", href: "/divisions/food-beverage", icon: "🥤" },
  { name: "Oils & Energy", focus: "Import: Southeast Asia, Middle East → Distribution: Bangladesh, regional", href: "/divisions/oils-energy", icon: "⚡" },
  { name: "IT & Software", focus: "Development: Bangladesh → Clients: Global (via Ezyify platform)", href: "/divisions/it-software", icon: "💻" },
  { name: "Global Trading", focus: "Multi-corridor: 25+ countries across 8 primary trade routes", href: "/divisions/global-trading", icon: "🚢" },
  { name: "Media", focus: "Broadcast: South Asia, Middle East → Digital: Global streaming reach", href: "/divisions/media", icon: "📺" },
  { name: "eSHIPe Maritime", focus: "Marketplace: 50+ countries, maritime corridors worldwide", href: "/divisions/eshipe", icon: "⚓" },
];

function WorldMapSVG() {
  // equirectangular projection: x=(lon+180)/360*900, y=(90-lat)/180*400
  const cities = [
    { cx: 676, cy: 147, label: "Dhaka", sublabel: "HQ", pulse: true, primary: true },
    { cx: 588, cy: 144, label: "Dubai", sublabel: "", pulse: false, primary: false },
    { cx: 450, cy: 86, label: "London", sublabel: "", pulse: false, primary: false },
    { cx: 521, cy: 109, label: "Istanbul", sublabel: "", pulse: false, primary: false },
    { cx: 709, cy: 197, label: "Singapore", sublabel: "", pulse: false, primary: false },
    { cx: 265, cy: 110, label: "New York", sublabel: "", pulse: false, primary: false },
    { cx: 542, cy: 202, label: "Nairobi", sublabel: "", pulse: false, primary: false },
    { cx: 632, cy: 157, label: "Mumbai", sublabel: "", pulse: false, primary: false },
  ]

  // Trade route arcs from Dhaka (676,147) as quadratic bezier curves
  const arcs = [
    { x1: 676, y1: 147, x2: 450, y2: 86, cx: 562, cy: 60, label: "Europe Corridor" },
    { x1: 676, y1: 147, x2: 588, y2: 144, cx: 632, cy: 115, label: "Gulf Route" },
    { x1: 676, y1: 147, x2: 709, y2: 197, cx: 720, cy: 155, label: "SE Asia Corridor" },
    { x1: 588, y1: 144, x2: 542, y2: 202, cx: 555, cy: 155, label: "Africa Route" },
    { x1: 676, y1: 147, x2: 265, y2: 110, cx: 470, cy: 40, label: "Atlantic Route" },
  ]

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
        {/* North America */}
        <path
          d="M80,66 L98,55 L118,48 L148,44 L190,42 L235,46 L278,52 L305,65 L312,80 L308,95 L296,108 L286,122 L280,140 L268,158 L252,168 L235,174 L215,172 L200,165 L185,155 L172,143 L158,132 L142,120 L128,108 L112,96 L96,82 Z"
          fill="rgba(13,148,136,0.08)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8"
        />
        {/* Central America */}
        <path d="M252,168 L265,162 L272,170 L268,180 L258,184 L248,178 Z"
          fill="rgba(13,148,136,0.08)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
        {/* Greenland */}
        <path d="M362,14 L395,12 L408,22 L404,36 L388,44 L368,44 L354,32 Z"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
        {/* South America */}
        <path
          d="M248,178 L268,172 L292,172 L315,182 L328,198 L335,218 L336,242 L330,268 L320,290 L306,310 L292,324 L275,326 L260,314 L250,295 L244,272 L242,248 L242,220 Z"
          fill="rgba(13,148,136,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"
        />
        {/* Europe */}
        <path
          d="M428,80 L458,74 L488,72 L515,78 L535,88 L540,100 L536,114 L524,120 L508,124 L488,128 L468,128 L448,120 L436,108 L428,94 Z"
          fill="rgba(13,148,136,0.1)" stroke="rgba(255,255,255,0.16)" strokeWidth="0.9"
        />
        {/* Iberian peninsula */}
        <path d="M428,94 L445,90 L450,102 L443,114 L430,114 Z"
          fill="rgba(13,148,136,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
        {/* Scandinavia */}
        <path d="M468,58 L480,54 L490,60 L488,72 L475,70 L462,66 Z"
          fill="rgba(13,148,136,0.07)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
        {/* Africa */}
        <path
          d="M442,118 L508,112 L545,118 L562,132 L568,156 L565,185 L558,215 L546,248 L530,275 L512,294 L492,298 L472,290 L456,268 L446,242 L440,215 L438,186 L440,155 Z"
          fill="rgba(13,148,136,0.08)" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8"
        />
        {/* Madagascar */}
        <path d="M575,238 L580,228 L585,235 L582,252 L575,255 Z"
          fill="rgba(13,148,136,0.06)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.6" />
        {/* Asia mainland */}
        <path
          d="M536,88 L578,68 L635,62 L698,64 L754,70 L800,80 L830,94 L844,110 L840,128 L820,140 L798,144 L770,150 L742,156 L718,160 L694,164 L670,170 L650,180 L636,195 L622,202 L606,192 L590,180 L570,168 L552,155 L540,142 L535,124 Z"
          fill="rgba(13,148,136,0.09)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.9"
        />
        {/* Indian subcontinent */}
        <path
          d="M618,168 L638,162 L658,166 L668,182 L670,202 L665,222 L655,238 L644,246 L632,238 L622,222 L614,204 L612,185 Z"
          fill="rgba(13,148,136,0.11)" stroke="rgba(255,255,255,0.16)" strokeWidth="0.8"
        />
        {/* SE Asia peninsula */}
        <path d="M679,162 L700,158 L714,164 L717,183 L710,202 L699,215 L688,212 L680,198 L677,180 Z"
          fill="rgba(13,148,136,0.09)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
        {/* Borneo/Indonesia islands */}
        <path d="M700,216 L720,210 L742,212 L748,220 L740,228 L718,228 L700,222 Z"
          fill="rgba(13,148,136,0.08)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
        <path d="M718,228 L748,222 L764,228 L768,238 L756,244 L734,242 Z"
          fill="rgba(13,148,136,0.07)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.6" />
        {/* Japan */}
        <path d="M745,110 L756,106 L762,114 L758,126 L748,128 L742,118 Z"
          fill="rgba(13,148,136,0.07)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
        {/* Australia */}
        <path
          d="M720,266 L762,260 L800,264 L824,278 L828,298 L822,322 L800,336 L770,340 L740,336 L718,320 L708,300 L710,280 Z"
          fill="rgba(13,148,136,0.07)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7"
        />
        {/* New Zealand */}
        <path d="M812,318 L818,310 L824,316 L820,326 Z"
          fill="rgba(13,148,136,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* UK island */}
        <path d="M436,76 L442,72 L448,76 L446,86 L438,88 Z"
          fill="rgba(13,148,136,0.07)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
        {/* Sri Lanka */}
        <path d="M655,238 L660,234 L664,240 L660,246 L654,244 Z"
          fill="rgba(13,148,136,0.07)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />

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

// Simple trade route illustration
function TradeRouteFlow() {
  const routes = [
    { from: "Bangladesh", via: "Indian Ocean", to: "Middle East & Europe", color: "from-gold to-amber-400" },
    { from: "South Asia", via: "South China Sea", to: "Southeast Asia", color: "from-blue-400 to-cyan-400" },
    { from: "Middle East", via: "Gulf of Aden", to: "Africa", color: "from-emerald-400 to-green-400" },
  ];

  return (
    <div className="space-y-4">
      {routes.map((r) => (
        <div key={r.from + r.to} className="flex items-center gap-3 bg-navy-light rounded-xl px-5 py-4 border border-white/8">
          <div className="text-white font-medium text-sm min-w-[110px]">{r.from}</div>
          <div className="flex-1 flex items-center gap-2">
            <div className={`h-0.5 flex-1 bg-gradient-to-r ${r.color} rounded-full`} />
            <div className="text-slate-500 text-xs whitespace-nowrap px-2">{r.via}</div>
            <div className={`h-0.5 flex-1 bg-gradient-to-r ${r.color} rounded-full`} />
            <svg className={`w-4 h-4 bg-gradient-to-r ${r.color} rounded-full text-navy flex-shrink-0`} style={{ padding: "2px" }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div className="text-slate-300 font-medium text-sm min-w-[140px] text-right">{r.to}</div>
        </div>
      ))}
    </div>
  );
}

export default function GlobalPresence() {
  return (
    <div className="min-h-screen bg-navy text-slate-100">
      <Header />

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-[68px] bg-navy-dark">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-dark/50 to-navy-dark" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            International Operations
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-[-0.02em]">
            Our Global Reach
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            25+ Countries &nbsp;&bull;&nbsp; 8 Business Divisions &nbsp;&bull;&nbsp; One Vision
          </p>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            From our headquarters in Dhaka, Network71 operates across South Asia, the Middle East, Europe, Southeast Asia, and Africa — connected by trade, technology, and shared purpose.
          </p>
        </div>
      </section>

      {/* ── World Map ── */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">Where We Operate</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3 tracking-[-0.02em]">Global Footprint</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Gold markers indicate regional operational clusters. Trade route lines show principal import/export corridors.
            </p>
          </div>
          <div className="bg-navy-dark rounded-2xl p-6 sm:p-10 border border-white/8 overflow-hidden">
            <WorldMapSVG />
          </div>
          <p className="text-slate-500 text-xs text-center mt-4">
            Map is illustrative. Exact country list to be published in our Global Operations Report.
          </p>
        </div>
      </section>

      {/* ── Country Count Banner ── */}
      <section className="py-14 px-6 bg-navy-dark">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { stat: "25+", label: "Countries of Operation" },
              { stat: "8", label: "Business Divisions" },
              { stat: "6", label: "Global Regions" },
            ].map((item) => (
              <div key={item.label} className="bg-navy rounded-xl py-8 px-4 border border-white/8">
                <div className="text-4xl sm:text-5xl font-display font-bold text-gold mb-2">{item.stat}</div>
                <div className="text-slate-400 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs mt-6">
            Full country list to be published. Operational in 25+ countries as of 2025.
          </p>
        </div>
      </section>

      {/* ── Regional Breakdown ── */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">Regions</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">Regional Breakdown</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Each region plays a distinct role in Network71&apos;s global value chain.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {regions.map((r) => (
              <div key={r.name} className="bg-navy-dark rounded-xl p-6 border border-white/8 hover:border-gold/20 transition-colors">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{r.name}</h3>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${r.tagColor}`}>
                      {r.tag}
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{r.desc}</p>
                <ul className="space-y-1.5">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-slate-300 text-xs">
                      <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-white/8">
                  <span className="text-slate-500 text-xs">Specific countries: Data to be published</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trade Routes ── */}
      <section className="py-24 px-6 bg-navy-dark">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">Trade Corridors</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">Principal Trade Routes</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Network71&apos;s trade flows connect production origins to end markets across three primary corridors.
            </p>
          </div>
          <TradeRouteFlow />
        </div>
      </section>

      {/* ── Key Markets by Division ── */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">By Division</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">Key Markets by Division</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {divisionGeography.map((d) => (
              <Link
                key={d.name}
                to={d.href}
                className="bg-navy-dark rounded-xl p-5 border border-white/8 hover:border-gold/25 transition-colors group block"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl flex-shrink-0">
                    {d.icon}
                  </div>
                  <h3 className="text-white font-medium group-hover:text-gold transition-colors">{d.name}</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{d.focus}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Office Locations ── */}
      <section className="py-20 px-6 bg-navy-dark">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium mb-3">Offices</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">Our Locations</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-navy rounded-xl p-6 border border-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gold/15 border border-gold/25 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gold font-semibold uppercase tracking-wider">Global Headquarters</div>
                  <div className="text-white font-semibold">Dhaka, Bangladesh</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                All corporate functions, executive leadership, primary technology operations, and strategic coordination are headquartered in Dhaka.
              </p>
            </div>
            <div className="bg-navy rounded-xl p-6 border border-white/8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Regional Offices</div>
                  <div className="text-white font-semibold">To Be Published</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Regional office and representative locations across our operational geographies will be published in the upcoming Global Operations Report.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
