import { Link } from 'react-router-dom'

// ─── Data ─────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  { sym: '◎', title: 'AI-Powered Intelligence', color: 'var(--accent-teal)', desc: 'ML models drive personalization, demand forecasting, and automation across every platform.' },
  { sym: '⬡', title: 'Global API Ecosystem', color: 'var(--accent-purple)', desc: 'Real-time integration connecting all Network71 divisions through unified infrastructure.' },
  { sym: '✦', title: 'Real-Time Data Intelligence', color: 'var(--brand-fg)', desc: 'Live market signals and behavioral data powering decisions at enterprise scale globally.' },
  { sym: '◈', title: 'Cloud-Native Scale', color: 'var(--accent-cyan)', desc: 'Built for resilience — processing transactions across 25+ markets without interruption.' },
]

// ─── SVG Network Visualization ─────────────────────────────────────────────────

const NODES = [
  { id: 'core',   cx: 260, cy: 190, r: 21, color: 'var(--brand-fg)', label: 'N71',    sub: 'Core' },
  { id: 'ai',     cx: 260, cy: 48,  r: 13, color: 'var(--accent-teal)', label: 'AI/ML',  sub: 'Intelligence' },
  { id: 'ezyify', cx: 112, cy: 82,  r: 13, color: 'var(--accent-purple)', label: 'Ezyify', sub: 'Commerce' },
  { id: 'media',  cx: 408, cy: 82,  r: 13, color: 'var(--accent-cyan)', label: 'Media',  sub: 'Broadcast' },
  { id: 'trade',  cx: 58,  cy: 192, r: 12, color: 'var(--accent-amber)', label: 'Trade',  sub: 'Global' },
  { id: 'energy', cx: 462, cy: 192, r: 12, color: 'var(--accent-orange)', label: 'Energy', sub: 'Resources' },
  { id: 'ship',   cx: 112, cy: 298, r: 12, color: 'var(--accent-blue)', label: 'eSHIPe', sub: 'Maritime' },
  { id: 'data',   cx: 408, cy: 298, r: 12, color: 'var(--accent-pink)', label: 'Data',   sub: 'Analytics' },
  { id: 'tech',   cx: 260, cy: 332, r: 12, color: 'var(--accent-indigo)', label: 'Tech',   sub: 'IT Services' },
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
  { color: 'var(--accent-purple)', path: 'M 260 190 L 112 82',  dur: '2.6s', begin: '0s' },
  { color: 'var(--accent-cyan)', path: 'M 260 190 L 408 82',  dur: '2.4s', begin: '0.9s' },
  { color: 'var(--accent-teal)', path: 'M 260 190 L 260 48',  dur: '2s',   begin: '1.7s' },
  { color: 'var(--accent-amber)', path: 'M 260 190 L 58 192',  dur: '2.2s', begin: '0.4s' },
  { color: 'var(--accent-pink)', path: 'M 260 190 L 408 298', dur: '2.8s', begin: '1.2s' },
]

function NetworkVisualization() {
  return (
    <div
      className="rounded-2xl sm:rounded-[20px] p-2.5 sm:p-3 pb-3 sm:pb-3"
      style={{
        background: 'var(--fill-1)',
        border: '1px solid var(--line-strong)',
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(240px, 70%)', aspectRatio: '1', borderRadius: '50%', background: 'var(--brand-wash)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/*
        The diagram's labels are tuned for ~440px+ of width. Below that we let it
        scroll horizontally instead of shrinking text into illegibility.
      */}
      <div className="overflow-x-auto no-scrollbar -mx-1 px-1">
      <svg
        viewBox="0 0 520 380"
        className="min-w-[420px]"
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
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="var(--s1)" stopOpacity="0" />
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
              stroke={isCoreEdge ? 'rgba(200,150,42,0.14)' : 'var(--line)'}
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
            <circle cx={n.cx} cy={n.cy} r={n.r} fill={`color-mix(in srgb, ${n.color} 9%, transparent)`} stroke={n.color} strokeWidth="1.2" />
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
              fill="var(--fg-muted)" fontSize="6.5"
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
              <circle cx={c.cx} cy={c.cy} r={c.r + 8} fill="none" stroke="var(--brand)" strokeWidth="0.8" opacity="0">
                <animate attributeName="r" from={c.r + 6} to={c.r + 28} dur="3s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.35;0;0.35" dur="3s" begin="0s" repeatCount="indefinite" />
              </circle>
              {/* Pulsing ring 2 (offset) */}
              <circle cx={c.cx} cy={c.cy} r={c.r + 6} fill="none" stroke="var(--brand)" strokeWidth="0.6" opacity="0">
                <animate attributeName="r" from={c.r + 4} to={c.r + 20} dur="3s" begin="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.22;0;0.22" dur="3s" begin="1.5s" repeatCount="indefinite" />
              </circle>
              {/* Core body */}
              <circle cx={c.cx} cy={c.cy} r={c.r} fill="#C8962A14" stroke="var(--brand)" strokeWidth="1.8" filter="url(#inno-glow-core)" />
              {/* Core label */}
              <text x={c.cx} y={c.cy - 4} textAnchor="middle" dominantBaseline="central" fill="var(--brand)" fontSize="11" fontWeight="800" fontFamily="JetBrains Mono, monospace">N71</text>
              <text x={c.cx} y={c.cy + 8} textAnchor="middle" dominantBaseline="central" fill="var(--brand)" fontSize="6" fontFamily="JetBrains Mono, monospace" opacity="0.65" letterSpacing="0.2em">CORE</text>
            </g>
          )
        })()}
      </svg>
      </div>

      {/* Corner labels */}
      <div className="mt-1 px-3 sm:absolute sm:bottom-[18px] sm:left-5 sm:right-5 sm:mt-0 sm:px-0">
        <div
          className="text-[7.5px] tracking-[0.12em] sm:text-[8.5px] sm:tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)', textTransform: 'uppercase', textAlign: 'center' }}>
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
      style={{ background: 'var(--s1)', borderTop: '1px solid var(--line)' }}
      className="section-y"
    >
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-9 lg:gap-12 xl:gap-16 items-center">

          {/* ── Left: text content ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(14px, 3vw, 22px)' }}>
              <div style={{ height: 1, width: 32, background: 'rgba(22,163,74,0.5)', flexShrink: 0 }} />
              <span
                className="text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em]"
                style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--accent-cyan)' }}>
                Technology &amp; Innovation
              </span>
            </div>

            <h2
              className="font-display"
              style={{ fontSize: 'clamp(25px, 5.6vw, 44px)', color: 'var(--fg-strong)', lineHeight: 1.14, letterSpacing: '-0.025em', marginBottom: 16 }}
            >
              The Infrastructure
              <br />
              <em style={{ color: 'var(--accent-cyan)' }}>Behind Our Growth.</em>
            </h2>

            <p className="text-[14px] sm:text-[15px]" style={{ color: 'var(--fg-muted)', lineHeight: 1.78, maxWidth: 420, marginBottom: 'clamp(22px, 5vw, 32px)' }}>
              Network71 is not only a diversified enterprise — it is a technology-driven ecosystem.
              Every division is connected through shared digital infrastructure, real-time data
              intelligence, and a unified platform philosophy.
            </p>

            {/* Capability tiles */}
            <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
              {CAPABILITIES.map(c => (
                <div
                  key={c.title}
                  className="p-3.5 sm:p-[14px_16px]"
                  style={{
                    background: 'var(--fill-1)', border: '1px solid var(--line-strong)',
                    borderRadius: 12, transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `color-mix(in srgb, ${c.color} 19%, transparent)`; e.currentTarget.style.background = 'rgba(255,255,255,0.036)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.background = 'var(--fill-1)' }}
                >
                  <div style={{ fontSize: 16, color: c.color, marginBottom: 8, lineHeight: 1 }}>{c.sym}</div>
                  <div className="text-[12.5px] sm:text-[12px]" style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: 5, lineHeight: 1.3 }}>{c.title}</div>
                  <div className="text-[11px]" style={{ color: 'var(--fg-subtle)', lineHeight: 1.55 }}>{c.desc}</div>
                </div>
              ))}
            </div>

            <Link
              to="/ezyify"
              className="w-full min-[400px]:w-auto justify-center min-[400px]:justify-start"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                border: '1px solid rgba(34,211,238,0.35)', color: 'var(--accent-cyan)',
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
