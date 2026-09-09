import { useState, useEffect } from 'react'
import type { HotspotData } from '@/components/Globe3D'
import GlobeStage, { GlobeOverlays } from './hero/GlobeStage'
import HotspotCard from './hero/HotspotCard'
import HeroContent from './hero/HeroContent'
import HeroStats from './hero/HeroStats'
import HeroTicker from './hero/HeroTicker'

export default function Hero() {
  const [hotspot, setHotspot]       = useState<HotspotData | null>(null)
  const [globeReady, setGlobeReady] = useState(false)

  // Close panel on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setHotspot(null) }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <section
      id="home"
      style={{
        /* dvh avoids the iOS/Android URL-bar height jump that 100vh causes */
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--s0)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GlobeStage
        globeReady={globeReady}
        onHotspot={setHotspot}
        onReady={() => setGlobeReady(true)}
      />

      {/* ── Location info panel — appears above clicked markers ── */}
      {hotspot && (
        <HotspotCard key={hotspot.id} hotspot={hotspot} onClose={() => setHotspot(null)} />
      )}

      <GlobeOverlays />

      {/* ── Main text content ── */}
      <HeroContent />

      {/* ── Stats strip ── */}
      <HeroStats />

      {/* ── Marquee ticker ── */}
      <HeroTicker />
    </section>
  )
}
