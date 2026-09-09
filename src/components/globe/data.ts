import type { CSSProperties } from 'react'

// ─── Public types ─────────────────────────────────────────────────────────────

export interface HotspotData {
  id: string
  name: string
  country: string
  role: string
  division: string   // N71 business division
  sectionLink: string  // section id to scroll to
  screenX: number    // viewport-space for position:fixed
  screenY: number
}

export interface GlobeProps {
  className?: string
  style?: CSSProperties
  onHotspot?: (data: HotspotData | null) => void
  onReady?: () => void
}

// ─── Geographic data ──────────────────────────────────────────────────────────

export type BB = [number, number, number, number]  // [minLat, maxLat, minLon, maxLon]

export const N71: BB[] = [
  [20,27,88,93],[8,36,68,97],[22,27,52,57],[16,32,37,56],
  [24,26.5,50,52],[28,30,46,49],[49,59,-8,2],[47,55,5,15],
  [41,51,-5,8],[51,53,3,8],[1,7,99,119],[1.18,1.5,103.5,104],
  [5,22,97,106],[3,14,2,15],[-5,5,33,42],[3,15,33,48],
  [4,11,-4,2],[24,50,-125,-66],[41,70,-141,-52],[-34,5,-74,-35],
  [5.8,9.9,79.6,82],
]

export const LOCATIONS = [
  { id:'dhaka',     name:'Dhaka',        country:'Bangladesh',     lat:23.81, lon:90.41,  isHQ:true,  role:'Global Headquarters', division:'All Ten Divisions',        sectionLink:'divisions' },
  { id:'dubai',     name:'Dubai',        country:'UAE',            lat:25.20, lon:55.27,  isHQ:false, role:'Middle East Hub',     division:'Oils & Energy',              sectionLink:'divisions' },
  { id:'singapore', name:'Singapore',    country:'Singapore',      lat: 1.35, lon:103.82, isHQ:false, role:'Asia Pacific Hub',    division:'eSHIPe Maritime',            sectionLink:'divisions' },
  { id:'london',    name:'London',       country:'United Kingdom', lat:51.51, lon:-0.13,  isHQ:false, role:'Europe Office',       division:'Network71 Media',            sectionLink:'divisions' },
  { id:'istanbul',  name:'Istanbul',     country:'Turkey',         lat:41.01, lon:28.98,  isHQ:false, role:'Regional Office',     division:'Garments & Apparel',         sectionLink:'divisions' },
  { id:'mumbai',    name:'Mumbai',       country:'India',          lat:19.08, lon:72.88,  isHQ:false, role:'South Asia Office',   division:'Agriculture & Agro Products', sectionLink:'divisions' },
  { id:'kl',        name:'Kuala Lumpur', country:'Malaysia',       lat: 3.14, lon:101.69, isHQ:false, role:'SEA Office',          division:'eSHIPe Maritime',            sectionLink:'divisions' },
  { id:'newyork',   name:'New York',     country:'USA',            lat:40.71, lon:-74.01, isHQ:false, role:'Americas Office',     division:'Global Trading & Logistics',   sectionLink:'divisions' },
] as const

export type Location = typeof LOCATIONS[number]

// ─── Quality tiers ────────────────────────────────────────────────────────────

export interface Quality {
  mobile: boolean
  tablet: boolean
  reducedMotion: boolean
  SEGS: number
  MASK_W: number
  MASK_H: number
  STAR_COUNT: number
  PR: number
}

export function detectQuality(): Quality {
  // ── Device tier detection ─────────────────────────────────────────────────
  const vw      = window.innerWidth
  const mobile  = vw < 768
  const tablet  = vw >= 768 && vw < 1200
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Quality settings per tier
  const SEGS       = mobile ? 40  : tablet ? 56  : 72
  const MASK_W     = mobile ? 256 : tablet ? 384 : 512
  const MASK_H     = mobile ? 128 : tablet ? 192 : 256
  const STAR_COUNT = mobile ? 600 : tablet ? 1200 : 1800
  const PR         = Math.min(window.devicePixelRatio, mobile ? 1.0 : tablet ? 1.5 : 2.0)

  return { mobile, tablet, reducedMotion, SEGS, MASK_W, MASK_H, STAR_COUNT, PR }
}
