import type { CSSProperties } from 'react'

// ─── CSS fallback ─────────────────────────────────────────────────────────────

export default function GlobeFallback({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={{ overflow: 'hidden', ...style }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at 62% 50%, var(--s3) 0%, var(--s0) 100%)',
      }}>
        {[1.0, 0.78, 0.58, 0.40].map((s, i) => (
          <div key={i} style={{
            position: 'absolute', width: `${s * 65}%`, aspectRatio: '1',
            borderRadius: '50%', border: `1px solid rgba(34,211,238,${0.06 + i * 0.04})`,
            animation: `spin ${16 + i * 6}s linear infinite`,
            animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
          }} />
        ))}
        <div style={{
          width: '42%', aspectRatio: '1', borderRadius: '50%', position: 'relative',
          background: 'radial-gradient(ellipse at 35% 38%, var(--s3) 0%, var(--s2) 55%, var(--s-inset) 100%)',
          border: '1px solid rgba(34,211,238,0.16)', boxShadow: '0 0 80px rgba(13,148,136,0.16)',
        }}>
          {[{ top:'22%',left:'28%',w:'22%',h:'28%' },{ top:'38%',left:'55%',w:'18%',h:'20%' },{ top:'58%',left:'18%',w:'15%',h:'18%' }].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', top: s.top, left: s.left, width: s.w, height: s.h,
              background: 'rgba(13,148,136,0.20)', borderRadius: '40%', filter: 'blur(2px)',
            }} />
          ))}
        </div>
        <div style={{
          position: 'absolute', width: 8, height: 8, borderRadius: '50%',
          background: 'var(--brand)', boxShadow: '0 0 16px var(--brand)',
          top: '42%', left: '61%', animation: 'pulse-slow 2.8s ease-in-out infinite',
        }} />
      </div>
    </div>
  )
}
