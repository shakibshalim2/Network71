/**
 * Globe3D — Network71 Command-Center Earth
 *
 * All 27 checklist features implemented:
 *   Realistic Earth, day/night, atmosphere (inner+outer), city lights, polar ice,
 *   interactive markers (hover tooltip + click panel), connection arcs, dash animation,
 *   CatmullRom particle travelers, HQ radar pulse, orbital paths + satellite dots,
 *   cinematic intro fly-in, slow sun orbit, camera micro-drift, star field,
 *   keyboard navigation, ARIA accessibility, FPS-adaptive quality,
 *   desktop/tablet/mobile optimization, loading fade-in, WebGL fallback.
 *
 * Implementation lives in ./globe/** — this file is the component shell.
 */

import { useRef } from 'react'
import type { GlobeProps } from './globe/data'
import { useGlobe } from './globe/useGlobe'
import GlobeFallback from './globe/GlobeFallback'

export type { HotspotData } from './globe/data'

// ─── Main component ───────────────────────────────────────────────────────────

export default function Globe3D({ className, style, onHotspot, onReady }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { webGLOk, error } = useGlobe(containerRef, { onHotspot, onReady })

  if (!webGLOk || error) {
    return <GlobeFallback className={className} style={style} />
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ cursor: 'grab', overflow: 'hidden', ...style }}
    />
  )
}
