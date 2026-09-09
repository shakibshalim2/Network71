import * as THREE from 'three'
import landRings from '@/lib/world-land.json'
import { N71 } from './data'

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function latLon(lat: number, lon: number, r = 1.0): THREE.Vector3 {
  const phi   = (lon + 180) * (Math.PI / 180)
  const theta = (90 - lat) * (Math.PI / 180)
  return new THREE.Vector3(
    -Math.cos(phi) * Math.sin(theta) * r,
     Math.cos(theta) * r,
     Math.sin(phi) * Math.sin(theta) * r,
  )
}

export function greatArc(
  lat1: number, lon1: number, lat2: number, lon2: number,
  steps = 80, lift = 0.30,
): THREE.Vector3[] {
  const a     = latLon(lat1, lon1)
  const b     = latLon(lat2, lon2)
  const omega = Math.acos(Math.max(-1, Math.min(1, a.dot(b))))
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps
    const v = omega < 0.0001
      ? a.clone().lerp(b, t).normalize()
      : a.clone().multiplyScalar(Math.sin((1 - t) * omega) / Math.sin(omega))
           .add(b.clone().multiplyScalar(Math.sin(t * omega) / Math.sin(omega)))
    return v.multiplyScalar(1 + lift * Math.sin(t * Math.PI))
  })
}

export function buildLandMask(W: number, H: number): HTMLCanvasElement {
  const cv  = document.createElement('canvas')
  cv.width  = W; cv.height = H
  const ctx = cv.getContext('2d')!
  const px  = (a: number, b: number, c: number, d: number) => ({
    x: Math.round((c + 180) / 360 * W), y: Math.round((90 - b) / 180 * H),
    w: Math.max(1, Math.round((d - c) / 360 * W)), h: Math.max(1, Math.round((b - a) / 180 * H)),
  })
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H)
  const coastline = new Path2D()
  for (const ring of landRings) {
    ring.forEach(([lon, lat], i) => {
      const x = (lon + 180) / 360 * W, y = (90 - lat) / 180 * H
      if (i === 0) coastline.moveTo(x, y)
      else coastline.lineTo(x, y)
    })
    coastline.closePath()
  }
  ctx.fillStyle = 'rgb(255,0,0)'
  ctx.fill(coastline, 'evenodd')
  ctx.save()
  ctx.clip(coastline, 'evenodd')
  ctx.fillStyle = 'rgb(255,200,0)'
  for (const [a,b,c,d] of N71)   { const r=px(a,b,c,d); ctx.fillRect(r.x,r.y,r.w,r.h) }
  ctx.restore()
  return cv
}

export function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch { return false }
}

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
