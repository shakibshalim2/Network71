import { lazy, Suspense, useEffect, useState } from 'react'
import type { HotspotData } from '@/components/Globe3D'

const Globe3D = lazy(() => import('@/components/Globe3D'))

interface Props {
  globeReady: boolean
  onHotspot: (data: HotspotData | null) => void
  onReady: () => void
}

export default function GlobeStage({ globeReady, onHotspot, onReady }: Props) {
  const [mountGlobe,setMountGlobe]=useState(false)
  useEffect(()=>{const timer=window.setTimeout(()=>setMountGlobe(true),250);return()=>window.clearTimeout(timer)},[])
  return (
    <>
      {/* ── Interactive 3D Globe — single instance, positioned right on desktop ── */}
      {/* On lg+: right 65% of viewport (sphere center ≈ 68% from left).
          On mobile: full viewport with heavy gradient overlay for readability. */}
      {mountGlobe && <Suspense fallback={null}>
        <Globe3D
          className="hero-globe absolute top-0 bottom-0 right-0 left-0 lg:left-[35%]"
          style={{ zIndex: 1 }}
          onHotspot={onHotspot}
          onReady={onReady}
        />
      </Suspense>}

      {/* ── Globe loading shimmer — fades out once canvas is ready ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          left: 0,
          zIndex: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: globeReady ? 0 : 1,
          transition: 'opacity 1.2s ease',
          pointerEvents: 'none',
        }}
        className="lg:left-[35%]"
      >
        <div style={{ position: 'relative', width: 80, height: 80 }}>
          {/* Orbit rings */}
          {[1.0, 0.68, 0.40].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              border: `1px solid rgba(200,150,42,${0.06 + i*0.06})`,
              transform: `scale(${s})`,
              animation: `spin ${14 + i*7}s linear infinite`,
              animationDirection: i%2===0 ? 'normal' : 'reverse',
            }} />
          ))}
          {/* Core dot */}
          <div style={{
            position: 'absolute', inset: '40%',
            borderRadius: '50%',
            background: 'var(--brand)',
            opacity: 0.5,
            animation: 'pulse-slow 1.8s ease-in-out infinite',
            boxShadow: '0 0 12px var(--brand)',
          }} />
        </div>
      </div>
    </>
  )
}

/** Gradient fades, vignette and dot grid layered over the globe. */
export function GlobeOverlays() {
  return (
    <>
      {/* ── Gradient overlays ── */}

      {/* Desktop: left-to-right dark fade — deep on left for text, fades on right */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'var(--hero-fade-x)',
        }}
      />
      {/* Desktop: subtle top/bottom vignette */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'var(--hero-vignette)',
        }}
      />

      {/* Mobile: heavy overlay for text readability over globe */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'var(--hero-fade-y)',
        }}
      />

      {/* ── Subtle dot grid — left portion only on desktop ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 2,
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--brand-wash) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'linear-gradient(90deg, black 0%, black 30%, transparent 55%)',
          WebkitMaskImage: 'linear-gradient(90deg, black 0%, black 30%, transparent 55%)',
        }}
      />
    </>
  )
}
