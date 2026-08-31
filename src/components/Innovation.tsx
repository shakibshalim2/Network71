import { Link } from 'react-router-dom'

// ─── Data ─────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  { sym: '◎', title: 'AI-Powered Intelligence', color: '#0D9488', desc: 'ML models drive personalization, demand forecasting, and automation across every platform.' },
  { sym: '⬡', title: 'Global API Ecosystem', color: '#A855F7', desc: 'Real-time integration connecting all Network71 divisions through unified infrastructure.' },
  { sym: '✦', title: 'Real-Time Data Intelligence', color: '#C8962A', desc: 'Live market signals and behavioral data powering decisions at enterprise scale globally.' },
  { sym: '◈', title: 'Cloud-Native Scale', color: '#22D3EE', desc: 'Built for resilience — processing transactions across 25+ markets without interruption.' },
]

// ─── SVG Network Visualization ─────────────────────────────────────────────────

const NODES = [
  { id: 'core',   cx: 260, cy: 190, r: 21, color: '#C8962A', label: 'N71',    sub: 'Core' },
  { id: 'ai',     cx: 260, cy: 48,  r: 13, color: '#0D9488', label: 'AI/ML',  sub: 'Intelligence' },
  { id: 'ezyify', cx: 112, cy: 82,  r: 13, color: '#A855F7', label: 'Ezyify', sub: 'Commerce' },
  { id: 'media',  cx: 408, cy: 82,  r: 13, color: '#22D3EE', label: 'Media',  sub: 'Broadcast' },
  { id: 'trade',  cx: 58,  cy: 192, r: 12, color: '#F59E0B', label: 'Trade',  sub: 'Global' },
  { id: 'energy', cx: 462, cy: 192, r: 12, color: '#F97316', label: 'Energy', sub: 'Resources' },
  { id: 'ship',   cx: 112, cy: 298, r: 12, color: '#3B82F6', label: 'eSHIPe', sub: 'Maritime' },
  { id: 'data',   cx: 408, cy: 298, r: 12, color: '#EC4899', label: 'Data',   sub: 'Analytics' },
  { id: 'tech',   cx: 260, cy: 332, r: 12, color: '#6366F1', label: 'Tech',   sub: 'IT Services' },
]

const EDGES = [
  ['core', 'ai'], ['core', 'ezyify'], ['core', 'media'],
  ['core', 'trade'], ['core', 'energy'], ['core', 'ship'],
  ['core', 'data'], ['core', 'tech'],
  ['ai', 'ezyify'], ['ai', 'media'],
  ['ezyify', 'trade'], ['ezyify', 'ship'],
  ['media', 'energy'], ['media', 'data'],
  ['ship', 'tech'], ['data', 'tech'],
  ['trade', 'ship'], ['energy', 'data'],
]

const nodeById = (id: string) => NODES.find(n => n.id === id)!

// Animated data packets — color, path string, animation timing
const PACKETS = [
  { color: '#A855F7', path: 'M 260 190 L 112 82',  dur: '2.6s', begin: '0s' },
  { color: '#22D3EE', path: 'M 260 190 L 408 82',  dur: '2.4s', begin: '0.9s' },
  { color: '#0D9488', path: 'M 260 190 L 260 48',  dur: '2s',   begin: '1.7s' },
  { color: '#F59E0B', path: 'M 260 190 L 58 192',  dur: '2.2s', begin: '0.4s' },
  { color: '#EC4899', path: 'M 260 190 L 408 298', dur: '2.8s', begin: '1.2s' },
]

function NetworkVisualization() {
  return (
    <div style={{
      borderRadius: 20,
      background: 'rgba(255,255,255,0.018)',
      border: '1px solid rgba(255,255,255,0.07)',
      padding: '12px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 240, height: 240, borderRadius: '50%', background: 'rgba(200,150,42,0.06)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <svg
        viewBox="0 0 520 380"
        style={{ width: '100%', display: 'block', position: 'relative' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold glow filter for core */}
          <filter id="inno-glow-core" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Small glow for packets */}
          <filter id="inno-glow-pkt" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Radial background */}
          <radialGradient id="inno-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C8962A" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#040B18" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background radial glow */}
        <ellipse cx="260" cy="190" rx="200" ry="155" fill="url(#inno-bg)" />

        {/* Connection edges */}
        {EDGES.map(([from, to]) => {
          const f = nodeById(from)
          const t = nodeById(to)
          const isCoreEdge = from === 'core' || to === 'core'
          return (
            <line
              key={`${from}-${to}`}
              x1={f.cx} y1={f.cy} x2={t.cx} y2={t.cy}
              stroke={isCoreEdge ? 'rgba(200,150,42,0.14)' : 'rgba(255,255,255,0.06)'}
              strokeWidth={isCoreEdge ? '1.2' : '0.8'}
            />
          )
        })}

        {/* Animated data packets */}
        {PACKETS.map((pkt, i) => (
          <circle key={i} r="2.8" fill={pkt.color} filter="url(#inno-glow-pkt)">
            <animateMotion dur={pkt.dur} repeatCount="indefinite" begin={pkt.begin} path={pkt.path} />
            <animate attributeName="opacity" values="0;1;1;0" dur={pkt.dur} begin={pkt.begin} repeatCount="indefinite" keyTimes="0;0.15;0.85;1" calcMode="spline" keySplines="0.4 0 0.6 1;0 0 1 1;0.4 0 0.6 1" />
          </circle>
        ))}

        {/* Outer nodes */}
        {NODES.filter(n => n.id !== 'core').map(n => (
          <g key={n.id}>
            {/* Subtle halo */}
            <circle cx={n.cx} cy={n.cy} r={n.r + 7} fill="none" stroke={n.color} strokeWidth="0.5" opacity="0.15" />
            {/* Node body */}
            <circle cx={n.cx} cy={n.cy} r={n.r} fill={`${n.color}16`} stroke={n.color} strokeWidth="1.2" />
            {/* Label inside node */}
            <text
              x={n.cx} y={n.cy}
              textAnchor="middle" dominantBaseline="central"
              fill={n.color} fontSize="7.5" fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="0"
            >
              {n.label.length > 6 ? n.label.slice(0, 6) : n.label}
            </text>
            {/* Sub label below */}
            <text
              x={n.cx} y={n.cy + n.r + 11}
              textAnchor="middle" dominantBaseline="central"
              fill="rgba(148,163,184,0.38)" fontSize="6.5"
              fontFamily="system-ui, sans-serif"
            >
              {n.sub}
            </text>
          </g>
        ))}

        {/* Core node (gold, pulsing) */}
        {(() => {
          const c = nodeById('core')
          return (
            <g>
              {/* Pulsing ring 1 */}
              <circle cx={c.cx} cy={c.cy} r={c.r + 8} fill="none" stroke="#C8962A" strokeWidth="0.8" opacity="0">
                <animate attributeName="r" from={c.r + 6} to={c.r + 28} dur="3s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.35;0;0.35" dur="3s" begin="0s" repeatCount="indefinite" />
              </circle>
              {/* Pulsing ring 2 (offset) */}
              <circle cx={c.cx} cy={c.cy} r={c.r + 6} fill="none" stroke="#C8962A" strokeWidth="0.6" opacity="0">
                <animate attributeName="r" from={c.r + 4} to={c.r + 20} dur="3s" begin="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.22;0;0.22" dur="3s" begin="1.5s" repeatCount="indefinite" />
              </circle>
              {/* Core body */}
              <circle cx={c.cx} cy={c.cy} r={c.r} fill="#C8962A14" stroke="#C8962A" strokeWidth="1.8" filter="url(#inno-glow-core)" />
              {/* Core label */}
              <text x={c.cx} y={c.cy - 4} textAnchor="middle" dominantBaseline="central" fill="#C8962A" fontSize="11" fontWeight="800" fontFamily="JetBrains Mono, monospace">N71</text>
              <text x={c.cx} y={c.cy + 8} textAnchor="middle" dominantBaseline="central" fill="#C8962A" fontSize="6" fontFamily="JetBrains Mono, monospace" opacity="0.65" letterSpacing="0.2em">CORE</text>
            </g>
          )
        })()}
      </svg>

      {/* Corner labels */}
      <div style={{ position: 'absolute', bottom: 18, left: 20, right: 20 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'rgba(100,116,139,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'center' }}>
          Network71 Connected Ecosystem
        </div>
      </div>
    </div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────

export default function Innovation() {
  return (
    <section
      id="innovation"
      style={{ background: '#040B18', borderTop: '1px solid rgba(255,255,255,0.04)' }}
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ── Left: text content ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ height: 1, width: 32, background: 'rgba(22,163,74,0.5)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(34,211,238,0.7)' }}>
                Technology & Innovation
              </span>
            </div>

            <h2
              className="font-display"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 18 }}
            >
              The Infrastructure
              <br />
              <em style={{ color: '#22D3EE' }}>Behind Our Growth.</em>
            </h2>

            <p style={{ color: 'rgba(148,163,184,0.72)', fontSize: 15, lineHeight: 1.78, maxWidth: 420, marginBottom: 32 }}>
              Network71 is not only a diversified enterprise — it is a technology-driven ecosystem.
              Every division is connected through shared digital infrastructure, real-time data
              intelligence, and a unified platform philosophy.
            </p>

            {/* Capability tiles */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {CAPABILITIES.map(c => (
                <div
                  key={c.title}
                  style={{
                    background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12, padding: '14px 16px', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.color}30`; e.currentTarget.style.background = 'rgba(255,255,255,0.036)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.022)' }}
                >
                  <div style={{ fontSize: 16, color: c.color, marginBottom: 8, lineHeight: 1 }}>{c.sym}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0', marginBottom: 5, lineHeight: 1.3 }}>{c.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(100,116,139,0.75)', lineHeight: 1.55 }}>{c.desc}</div>
                </div>
              ))}
            </div>

            <Link
              to="/ezyify"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                border: '1px solid rgba(34,211,238,0.35)', color: '#22D3EE',
                textDecoration: 'none', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.07)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.35)' }}
            >
              Explore Ezyify Platform
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* ── Right: network visualization ── */}
          <div>
            <NetworkVisualization />
          </div>

        </div>
      </div>
    </section>
  )
}
