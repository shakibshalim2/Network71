import { useEffect, useRef, type CSSProperties } from 'react'
import { LOCATIONS } from './data'
import { buildLandMask } from './geo'

interface Props {
  className?: string
  style?: CSSProperties
  onReady?: () => void
}

type Dot = { lat: number; lon: number; n71: boolean }

const D2R = Math.PI / 180

/** Sample the land mask into an evenly spaced lat/lon dot field. */
function buildDots(): Dot[] {
  const W = 360, H = 180
  const px = buildLandMask(W, H).getContext('2d')!.getImageData(0, 0, W, H).data
  const dots: Dot[] = []
  const step = 1.55
  for (let lat = -84; lat <= 84; lat += step) {
    // widen the longitude step toward the poles so density stays uniform
    const lonStep = step / Math.max(0.25, Math.cos(lat * D2R))
    for (let lon = -180; lon < 180; lon += lonStep) {
      const x = Math.min(W - 1, Math.floor((lon + 180) / 360 * W))
      const y = Math.min(H - 1, Math.floor((90 - lat) / 180 * H))
      const i = (y * W + x) * 4
      if (px[i] > 128) dots.push({ lat, lon, n71: px[i + 1] > 128 })
    }
  }
  return dots
}

/**
 * Canvas-2D globe used when WebGL is unavailable: a slowly rotating dotted
 * Earth with the N71 footprint lit, office markers and arcs from Dhaka.
 */
export default function GlobeFallback({ className, style, onReady }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dots = buildDots()
    const hq = LOCATIONS[0]

    let w = 0, h = 0, dpr = 1
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const brand = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#C8962A'
    const tilt = -14 * D2R
    const cT = Math.cos(tilt), sT = Math.sin(tilt)
    // Dhaka faces the viewer at t=0
    let rot = -hq.lon * D2R
    let raf = 0
    let last = performance.now()
    let visible = true
    let readyFired = false

    const project = (lat: number, lon: number, R: number, cx: number, cy: number) => {
      const la = lat * D2R, lo = lon * D2R + rot
      const cl = Math.cos(la)
      const x = cl * Math.sin(lo)
      const y0 = Math.sin(la)
      const z0 = cl * Math.cos(lo)
      const y = y0 * cT - z0 * sT
      const z = y0 * sT + z0 * cT
      return { x: cx + x * R, y: cy - y * R, z }
    }

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      const dt = Math.min(48, now - last); last = now
      if (!reduce) rot += dt * 0.00009

      // Match the WebGL stage: centred on desktop (container is the right 65%),
      // a lit crescent low-right on phones.
      const mobile = window.innerWidth < 1024
      const R = mobile ? w * 0.62 : Math.min(w, h) * 0.42
      const cx = mobile ? w * 0.78 : w * 0.5
      const cy = mobile ? h * 0.86 : h * 0.5
      ctx.clearRect(0, 0, w, h)

      // atmosphere
      const halo = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.28)
      halo.addColorStop(0, 'rgba(34,211,238,0.22)')
      halo.addColorStop(0.5, 'rgba(13,148,136,0.08)')
      halo.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = halo
      ctx.fillRect(cx - R * 1.4, cy - R * 1.4, R * 2.8, R * 2.8)

      // ocean disc
      const sea = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R)
      sea.addColorStop(0, '#0B1E3F')
      sea.addColorStop(1, '#040A18')
      ctx.fillStyle = sea
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = 'rgba(34,211,238,0.28)'; ctx.lineWidth = 1; ctx.stroke()

      // land dots
      const size = Math.max(1.1, R / 210)
      for (const d of dots) {
        const p = project(d.lat, d.lon, R, cx, cy)
        if (p.z <= 0.04) continue
        const a = 0.25 + p.z * 0.75
        ctx.fillStyle = d.n71 ? `rgba(230,184,64,${a})` : `rgba(150,190,235,${a * 0.7})`
        ctx.beginPath(); ctx.arc(p.x, p.y, size * (d.n71 ? 1.25 : 1), 0, Math.PI * 2); ctx.fill()
      }

      // arcs from HQ
      const h0 = project(hq.lat, hq.lon, R, cx, cy)
      for (const loc of LOCATIONS) {
        if (loc.isHQ) continue
        const p = project(loc.lat, loc.lon, R, cx, cy)
        if (h0.z <= 0 && p.z <= 0) continue
        const mid = project((hq.lat + loc.lat) / 2, (hq.lon + loc.lon) / 2, R * 1.32, cx, cy)
        const a = Math.max(0, Math.min(h0.z, p.z)) * 0.55 + 0.05
        ctx.strokeStyle = `rgba(200,150,42,${a})`
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(h0.x, h0.y); ctx.quadraticCurveTo(mid.x, mid.y, p.x, p.y); ctx.stroke()
        // traveller
        const t = ((now * 0.00025 + loc.lat) % 1 + 1) % 1
        const tx = (1 - t) * (1 - t) * h0.x + 2 * (1 - t) * t * mid.x + t * t * p.x
        const ty = (1 - t) * (1 - t) * h0.y + 2 * (1 - t) * t * mid.y + t * t * p.y
        ctx.fillStyle = `rgba(230,184,64,${a + 0.3})`
        ctx.beginPath(); ctx.arc(tx, ty, 1.6, 0, Math.PI * 2); ctx.fill()
      }

      // markers
      for (const loc of LOCATIONS) {
        const p = project(loc.lat, loc.lon, R, cx, cy)
        if (p.z <= 0) continue
        ctx.fillStyle = loc.isHQ ? brand : 'rgba(34,211,238,0.9)'
        ctx.beginPath(); ctx.arc(p.x, p.y, loc.isHQ ? 3.2 : 2, 0, Math.PI * 2); ctx.fill()
        if (loc.isHQ) {
          const ph = (now % 2400) / 2400
          ctx.strokeStyle = `rgba(200,150,42,${(1 - ph) * 0.8})`
          ctx.lineWidth = 1.2
          ctx.beginPath(); ctx.arc(p.x, p.y, 4 + ph * 18, 0, Math.PI * 2); ctx.stroke()
        }
      }

      // limb shading toward the terminator
      const shade = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.5, cx, cy, R)
      shade.addColorStop(0, 'rgba(4,8,14,0)')
      shade.addColorStop(1, 'rgba(4,8,14,0.55)')
      ctx.fillStyle = shade
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill()

      if (!readyFired) { readyFired = true; canvas.style.opacity = '1'; onReady?.() }
    }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [onReady])

  return (
    <div className={className} style={{ overflow: 'hidden', pointerEvents: 'none', ...style }} aria-hidden="true">
      <canvas
        ref={ref}
        style={{ display: 'block', width: '100%', height: '100%', opacity: 0, transition: 'opacity 1.1s ease' }}
      />
    </div>
  )
}
