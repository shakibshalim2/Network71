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
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import * as THREE from 'three'
import { useTheme } from '@/context/ThemeContext'
import landRings from '@/lib/world-land.json'

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

interface Props {
  className?: string
  style?: CSSProperties
  onHotspot?: (data: HotspotData | null) => void
  onReady?: () => void
}

// ─── Geographic data ──────────────────────────────────────────────────────────

type BB = [number, number, number, number]  // [minLat, maxLat, minLon, maxLon]

const N71: BB[] = [
  [20,27,88,93],[8,36,68,97],[22,27,52,57],[16,32,37,56],
  [24,26.5,50,52],[28,30,46,49],[49,59,-8,2],[47,55,5,15],
  [41,51,-5,8],[51,53,3,8],[1,7,99,119],[1.18,1.5,103.5,104],
  [5,22,97,106],[3,14,2,15],[-5,5,33,42],[3,15,33,48],
  [4,11,-4,2],[24,50,-125,-66],[41,70,-141,-52],[-34,5,-74,-35],
  [5.8,9.9,79.6,82],
]

const LOCATIONS = [
  { id:'dhaka',     name:'Dhaka',        country:'Bangladesh',     lat:23.81, lon:90.41,  isHQ:true,  role:'Global Headquarters', division:'All Ten Divisions',        sectionLink:'divisions' },
  { id:'dubai',     name:'Dubai',        country:'UAE',            lat:25.20, lon:55.27,  isHQ:false, role:'Middle East Hub',     division:'Oils & Energy',              sectionLink:'divisions' },
  { id:'singapore', name:'Singapore',    country:'Singapore',      lat: 1.35, lon:103.82, isHQ:false, role:'Asia Pacific Hub',    division:'eSHIPe Maritime',            sectionLink:'divisions' },
  { id:'london',    name:'London',       country:'United Kingdom', lat:51.51, lon:-0.13,  isHQ:false, role:'Europe Office',       division:'Network71 Media',            sectionLink:'divisions' },
  { id:'istanbul',  name:'Istanbul',     country:'Turkey',         lat:41.01, lon:28.98,  isHQ:false, role:'Regional Office',     division:'Garments & Apparel',         sectionLink:'divisions' },
  { id:'mumbai',    name:'Mumbai',       country:'India',          lat:19.08, lon:72.88,  isHQ:false, role:'South Asia Office',   division:'Agriculture & Agro Products', sectionLink:'divisions' },
  { id:'kl',        name:'Kuala Lumpur', country:'Malaysia',       lat: 3.14, lon:101.69, isHQ:false, role:'SEA Office',          division:'eSHIPe Maritime',            sectionLink:'divisions' },
  { id:'newyork',   name:'New York',     country:'USA',            lat:40.71, lon:-74.01, isHQ:false, role:'Americas Office',     division:'Global Trading & Logistics',   sectionLink:'divisions' },
] as const

// ─── GLSL ─────────────────────────────────────────────────────────────────────

const EARTH_VERT = /* glsl */`
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vLocalPos;
void main() {
  vUv = uv;
  vLocalPos = position;
  vec4 wp = modelMatrix * vec4(position,1.0);
  vWorldPos = wp.xyz;
  vWorldNormal = normalize(mat3(modelMatrix)*normal);
  gl_Position = projectionMatrix*viewMatrix*wp;
}
`

const EARTH_FRAG = /* glsl */`
uniform sampler2D uMask;
uniform sampler2D uDay;
uniform sampler2D uNight;
uniform float uTexBlend;
uniform float uLightMode;
uniform vec3  uSunDir;

varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vLocalPos;

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 L = normalize(uSunDir);
  vec3 V = normalize(cameraPosition - vWorldPos);

  float dayFac   = dot(N,L);
  float dayBlend = smoothstep(-0.28, 0.54, dayFac);

  vec2  mask = texture2D(uMask, vUv).rg;
  float land = mask.r;
  float n71  = mask.g;

  // ── Procedural day ─────────────────────────────────────────────────────────
  vec3 oceanDay   = vec3(0.016, 0.068, 0.200);
  vec3 deepOcean  = vec3(0.009, 0.038, 0.120);
  vec3 terrainDay = vec3(0.082, 0.132, 0.044);
  vec3 n71Day     = vec3(0.170, 0.112, 0.018);
  float latY      = normalize(vLocalPos).y;
  float eqFac     = 1.0 - abs(latY) * 0.45;
  vec3  oceanMix  = mix(oceanDay, deepOcean, eqFac * 0.65);
  vec3  procDay   = mix(oceanMix, mix(terrainDay, n71Day, n71), land);
  procDay *= 0.24 + 0.76 * max(0.0, dayFac);

  // Ocean specular highlight
  if (land < 0.3) {
    vec3  H    = normalize(L+V);
    float spec = pow(max(0.0, dot(N,H)), 60.0);
    procDay += vec3(0.14, 0.22, 0.48) * spec * dayBlend;
  }

  // ── Polar ice caps ─────────────────────────────────────────────────────────
  float polarFac = smoothstep(0.80, 0.97, abs(latY));
  procDay = mix(procDay, vec3(0.84, 0.90, 0.96), polarFac * 0.92);

  // ── Procedural night ───────────────────────────────────────────────────────
  vec3 oceanNight = vec3(0.004, 0.010, 0.030);
  vec3 landNight  = vec3(0.007, 0.012, 0.005);
  vec3 cityGlow   = vec3(0.60, 0.38, 0.06);
  vec3 procNight  = mix(oceanNight, landNight + cityGlow * n71 * 0.64, land);
  procNight = mix(procNight, vec3(0.04, 0.06, 0.10), polarFac * 0.80);

  // ── Real-texture overlay ───────────────────────────────────────────────────
  vec3 dayTex   = texture2D(uDay,   vUv).rgb;
  vec3 nightTex = clamp(texture2D(uNight, vUv).rgb * 3.2, 0.0, 1.0);
  vec3 dayColor   = mix(procDay,   dayTex,   uTexBlend);
  vec3 nightColor = mix(procNight, nightTex, uTexBlend);
  vec3 color = mix(nightColor, dayColor, dayBlend);

  // ── Limb glow ──────────────────────────────────────────────────────────────
  float rim = 1.0 - max(0.0, dot(N,V));
  color += vec3(0.020, 0.060, 0.190) * dayBlend * pow(rim, 3.8);

  // ── N71 warm aura ──────────────────────────────────────────────────────────
  color += vec3(0.046, 0.028, 0.002) * n71 * land * dayBlend * (1.0 - pow(rim, 2.0));

  // ── Lat/lon grid (local sphere space — stable through rotation) ─────────────
  const float PI6 = 0.52360;
  vec3 ln    = normalize(vLocalPos);
  float latA = asin(clamp(ln.y,-1.0,1.0));
  float lonA = atan(ln.z, ln.x);
  float latW = min(mod(abs(latA)+0.001,PI6), PI6-mod(abs(latA)+0.001,PI6));
  float lonW = min(mod(abs(lonA)+0.001,PI6), PI6-mod(abs(lonA)+0.001,PI6));
  float grid = max(1.0-smoothstep(0.0,0.012,latW), 1.0-smoothstep(0.0,0.012,lonW));
  color += vec3(0.028, 0.090, 0.220) * grid * (0.045 + 0.065 * dayBlend);

  // A daylight atlas palette keeps the globe readable on a light canvas.
  vec3 atlasOcean = vec3(0.58, 0.74, 0.85);
  vec3 atlasLand = vec3(0.81, 0.85, 0.76);
  vec3 atlas = mix(atlasOcean, atlasLand, land);
  atlas *= 0.72 + 0.28 * max(0.0, dot(N, normalize(vec3(-2.0, 3.0, 5.0))));
  atlas = mix(atlas, vec3(0.95, 0.97, 0.98), polarFac * 0.8);
  atlas -= vec3(0.08, 0.10, 0.11) * grid * 0.28;
  gl_FragColor = vec4(mix(color, atlas, uLightMode), 1.0);
}
`

const ATMO_VERT = /* glsl */`
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  vNormal  = normalize(normalMatrix*normal);
  vec4 mv  = modelViewMatrix*vec4(position,1.0);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix*mv;
}
`

// Inner Fresnel: tight bright blue halo
const ATMO_FRAG = /* glsl */`
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  float rim   = pow(1.0 - abs(dot(vNormal,vViewDir)), 2.45);
  vec3  color = vec3(0.18, 0.54, 1.0);
  gl_FragColor = vec4(color * rim * 2.2, rim * 0.70);
}
`

// Outer halo: wide deep-blue glow ("from space" look)
const OUTER_ATMO_FRAG = /* glsl */`
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  float rim   = pow(1.0 - abs(dot(vNormal,vViewDir)), 1.60);
  vec3  color = vec3(0.09, 0.32, 0.88);
  gl_FragColor = vec4(color * rim * 1.4, rim * 0.25);
}
`

// ─── Helpers ─────────────────────────────────────────────────────────────────

function latLon(lat: number, lon: number, r = 1.0): THREE.Vector3 {
  const phi   = (lon + 180) * (Math.PI / 180)
  const theta = (90 - lat) * (Math.PI / 180)
  return new THREE.Vector3(
    -Math.cos(phi) * Math.sin(theta) * r,
     Math.cos(theta) * r,
     Math.sin(phi) * Math.sin(theta) * r,
  )
}

function greatArc(
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

function buildLandMask(W: number, H: number): HTMLCanvasElement {
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

function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch { return false }
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

// ─── CSS fallback ─────────────────────────────────────────────────────────────

function GlobeFallback({ className, style }: { className?: string; style?: CSSProperties }) {
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function Globe3D({ className, style, onHotspot, onReady }: Props) {
  const { theme } = useTheme()
  const themeRef = useRef(theme)
  useEffect(() => { themeRef.current = theme }, [theme])
  const containerRef = useRef<HTMLDivElement>(null)
  const [webGLOk]    = useState(isWebGLAvailable)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!webGLOk) return
    const container = containerRef.current
    if (!container) return
    let disposed = false

    try {
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

      // ── Renderer ──────────────────────────────────────────────────────────────
      const rect0 = container.getBoundingClientRect()
      const W0 = Math.max(rect0.width, 320), H0 = Math.max(rect0.height, 200)
      const renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true })
      renderer.setPixelRatio(PR)
      renderer.setSize(W0, H0)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15

      const canvas = renderer.domElement
      canvas.style.cssText = 'position:absolute;top:0;left:0;display:block;opacity:0;transition:opacity 1.1s ease;outline:none;'

      // Accessibility attributes
      canvas.setAttribute('tabindex', '0')
      canvas.setAttribute('role', 'application')
      canvas.setAttribute('aria-label',
        "Interactive 3D globe showing Network71's international market connections. " +
        "Use arrow keys to rotate, + and - to zoom, or drag with mouse/touch. " +
        "Use the bracket keys to cycle through location markers and Enter to select."
      )
      container.appendChild(canvas)

      // ── Hover tooltip (imperative DOM — no React re-render lag) ───────────────
      const ttEl = document.createElement('div')
      ttEl.style.cssText = 'position:absolute;pointer-events:none;z-index:50;opacity:0;transition:opacity 0.14s ease;transform:translate(-50%,-100%);'

      const ttCard = document.createElement('div')
      ttCard.style.cssText = [
        'background:var(--panel-bg)',
        'border:1px solid rgba(200,150,42,0.28)',
        'border-radius:8px',
        'padding:7px 14px',
        'backdrop-filter:blur(18px)',
        '-webkit-backdrop-filter:blur(18px)',
        'white-space:nowrap',
        'box-shadow:var(--shadow-card)',
      ].join(';')

      const ttRole = document.createElement('div')
      ttRole.style.cssText = 'font-size:9px;color:var(--brand-fg);font-family:"JetBrains Mono",monospace;letter-spacing:0.24em;text-transform:uppercase;margin-bottom:3px;'

      const ttName = document.createElement('div')
      ttName.style.cssText = 'font-size:14px;color:var(--fg-strong);font-weight:500;letter-spacing:-0.01em;line-height:1.1;'

      const ttCountry = document.createElement('div')
      ttCountry.style.cssText = 'font-size:10px;color:var(--fg-muted);margin-top:2px;'

      // Connector stem
      const ttStem = document.createElement('div')
      ttStem.style.cssText = 'position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);width:1px;height:10px;background:linear-gradient(to bottom,rgba(200,150,42,0.5),transparent);'

      ttCard.appendChild(ttRole)
      ttCard.appendChild(ttName)
      ttCard.appendChild(ttCountry)
      ttEl.appendChild(ttCard)
      ttEl.appendChild(ttStem)
      container.appendChild(ttEl)

      // ── Scene / camera ────────────────────────────────────────────────────────
      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(40, W0 / H0, 0.1, 100)
      camera.position.set(0, 0, 7.5)  // cinematic intro start

      // ── Lighting ──────────────────────────────────────────────────────────────
      const sun = new THREE.DirectionalLight(0xFFF4E0, 2.9)
      sun.position.set(-4, 2.5, 5)
      scene.add(sun)
      scene.add(new THREE.AmbientLight(0x18284A, 0.46))
      // sunDir is a mutable Vector3 that slowly orbits over time
      const sunDir = sun.position.clone().normalize()

      // ── Star field (two layers for depth) ────────────────────────────────────
      const mkStars = (count: number, rMin: number, rMax: number, size: number, color: number, opacity: number) => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
          const theta = Math.random() * Math.PI * 2
          const phi   = Math.acos(2 * Math.random() - 1)
          const r     = rMin + Math.random() * (rMax - rMin)
          pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
          pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
          pos[i*3+2] = r * Math.cos(phi)
        }
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        return new THREE.Points(geo, new THREE.PointsMaterial({ color, size, sizeAttenuation: true, transparent: true, opacity }))
      }
      const stars = new THREE.Group()
      stars.add(mkStars(STAR_COUNT, 11, 14, 0.013, 0xFFFFFF, 0.78))
      stars.add(mkStars(Math.round(STAR_COUNT * 0.11), 12, 15, 0.028, 0xAABBFF, 0.32))
      scene.add(stars)

      // ── Land mask ─────────────────────────────────────────────────────────────
      const maskTex  = new THREE.CanvasTexture(buildLandMask(MASK_W, MASK_H))
      const blackPx  = new Uint8Array([0, 0, 0, 255])
      const blackTex = new THREE.DataTexture(blackPx, 1, 1, THREE.RGBAFormat)
      blackTex.needsUpdate = true

      // ── Earth group ───────────────────────────────────────────────────────────
      const earthGroup = new THREE.Group()
      scene.add(earthGroup)
      earthGroup.rotation.y = Math.PI  // Dhaka faces camera initially

      // ── Earth shader ──────────────────────────────────────────────────────────
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uniforms: Record<string, THREE.IUniform<any>> = {
        uMask:     { value: maskTex },
        uDay:      { value: blackTex as THREE.Texture },
        uNight:    { value: blackTex as THREE.Texture },
        uTexBlend: { value: 0.0 },
        uLightMode: { value: themeRef.current === 'light' ? 1 : 0 },
        uSunDir:   { value: sunDir.clone() },
      }
      const earthMat = new THREE.ShaderMaterial({ uniforms, vertexShader: EARTH_VERT, fragmentShader: EARTH_FRAG })
      earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1, SEGS, SEGS), earthMat))

      // ── Atmospheres ───────────────────────────────────────────────────────────
      const atmoMat = new THREE.ShaderMaterial({
        vertexShader: ATMO_VERT, fragmentShader: ATMO_FRAG,
        blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, side: THREE.FrontSide,
      })
      const atmosphere = new THREE.Group()
      atmosphere.add(new THREE.Mesh(new THREE.SphereGeometry(1.20, 48, 48), atmoMat))
      scene.add(atmosphere)

      if (!mobile) {
        atmosphere.add(new THREE.Mesh(
          new THREE.SphereGeometry(1.42, 48, 48),
          new THREE.ShaderMaterial({
            vertexShader: ATMO_VERT, fragmentShader: OUTER_ATMO_FRAG,
            blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, side: THREE.FrontSide,
          }),
        ))
      }

      // ── CDN textures ──────────────────────────────────────────────────────────
      // Only blend in when BOTH succeed — error leaves procedural shader intact.
      let texBlend = 0.0, dayOK = false, nightOK = false
      const tryBlend = () => { if (dayOK && nightOK) uniforms.uTexBlend.value = 0.001 }
      const loader   = new THREE.TextureLoader()
      loader.setCrossOrigin('anonymous')
      const CDN = 'https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/'
      loader.load(CDN + 'earth-blue-marble.jpg',
        (t) => { if (!disposed) { t.colorSpace = THREE.SRGBColorSpace; uniforms.uDay.value = t; dayOK = true; tryBlend() } })
      loader.load(CDN + 'earth-night.jpg',
        (t) => { if (!disposed) { t.colorSpace = THREE.SRGBColorSpace; uniforms.uNight.value = t; nightOK = true; tryBlend() } })

      // ── Cloud layer (desktop + tablet only) ────────────────────────────────────
      let cloudsMesh: THREE.Mesh | null = null
      if (!mobile) {
        const cMat = new THREE.MeshPhongMaterial({
          map: blackTex, alphaMap: blackTex, transparent: true, opacity: 0.0, depthWrite: false,
        })
        cloudsMesh = new THREE.Mesh(new THREE.SphereGeometry(1.007, SEGS, SEGS), cMat)
        earthGroup.add(cloudsMesh)
        loader.load(CDN + 'earth-clouds.png',
          (t) => { if (!disposed) { cMat.map = t; cMat.alphaMap = t; cMat.opacity = tablet ? 0.28 : 0.34; cMat.needsUpdate = true } })
      }

      // ── Markers ───────────────────────────────────────────────────────────────
      const markerGroup = new THREE.Group()
      earthGroup.add(markerGroup)
      const V_UP = new THREE.Vector3(0, 0, 1)

      type MarkerObj = {
        loc: typeof LOCATIONS[number]
        dot: THREE.Mesh
        ring: THREE.Mesh
        outerRing: THREE.Mesh | null
        glowMesh: THREE.Mesh | null
        scaleTarget: number
      }

      const markerObjs: MarkerObj[] = LOCATIONS.map((loc) => {
        const pos    = latLon(loc.lat, loc.lon, 1.013)
        const normal = pos.clone().normalize()
        const color  = loc.isHQ ? 0xC8962A : 0x22D3EE

        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(loc.isHQ ? 0.014 : 0.009, 12, 12),
          new THREE.MeshBasicMaterial({ color }),
        )
        dot.position.copy(pos)
        markerGroup.add(dot)

        const ring = new THREE.Mesh(
          new THREE.RingGeometry(loc.isHQ ? 0.022 : 0.013, loc.isHQ ? 0.032 : 0.022, 32),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: loc.isHQ ? 0.70 : 0.55, side: THREE.DoubleSide }),
        )
        ring.position.copy(latLon(loc.lat, loc.lon, 1.016))
        ring.quaternion.setFromUnitVectors(V_UP, normal)
        markerGroup.add(ring)

        let outerRing: THREE.Mesh | null = null
        if (loc.isHQ) {
          outerRing = new THREE.Mesh(
            new THREE.RingGeometry(0.038, 0.046, 32),
            new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.28, side: THREE.DoubleSide }),
          )
          outerRing.position.copy(latLon(loc.lat, loc.lon, 1.017))
          outerRing.quaternion.setFromUnitVectors(V_UP, normal)
          markerGroup.add(outerRing)
        }

        let glowMesh: THREE.Mesh | null = null
        if (loc.isHQ) {
          glowMesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.036, 12, 12),
            new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.09, blending: THREE.AdditiveBlending, depthWrite: false }),
          )
          glowMesh.position.copy(pos)
          markerGroup.add(glowMesh)
        }

        return { loc, dot, ring, outerRing, glowMesh, scaleTarget: 1.0 }
      })

      // Keyboard marker navigation state
      let kbMarkerIdx = -1

      // ── HQ radar pulse ─────────────────────────────────────────────────────────
      const hqLoc    = LOCATIONS[0]
      const hqPos    = latLon(hqLoc.lat, hqLoc.lon)
      const hqNormal = hqPos.clone().normalize()

      const makeRadarRing = () => {
        const mat  = new THREE.MeshBasicMaterial({
          color: 0xC8962A, transparent: true, opacity: 0.0,
          side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
        })
        const mesh = new THREE.Mesh(new THREE.RingGeometry(0.001, 0.003, 64), mat)
        mesh.position.copy(hqPos.clone().multiplyScalar(1.016))
        mesh.quaternion.setFromUnitVectors(V_UP, hqNormal)
        earthGroup.add(mesh)
        return { mesh, mat }
      }
      const radar1 = makeRadarRing()
      const radar2 = makeRadarRing()

      // Click-ripple: brief flash on any clicked marker
      const clickRippleMat = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF, transparent: true, opacity: 0.0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
      })
      const clickRippleMesh = new THREE.Mesh(new THREE.RingGeometry(0.001, 0.003, 64), clickRippleMat)
      clickRippleMesh.visible = false
      earthGroup.add(clickRippleMesh)
      let clickRipplePhase = 1.0   // 1 = finished

      // ── Trade routes + particle travelers ──────────────────────────────────────
      const arcGroup = new THREE.Group()
      earthGroup.add(arcGroup)

      const tempPt = new THREE.Vector3()  // reused each frame — no allocation in loop

      type RouteState = {
        curve: THREE.CatmullRomCurve3
        dashMat: THREE.LineDashedMaterial
        particles: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }[]
        speed: number
        localT: number
      }

      const routeStates: RouteState[] = [1, 2, 3, 4, 5, 6, 7].map((toIdx, i) => {
        const dest = LOCATIONS[toIdx]
        const pts  = greatArc(hqLoc.lat, hqLoc.lon, dest.lat, dest.lon)
        const geo  = new THREE.BufferGeometry().setFromPoints(pts)

        arcGroup.add(new THREE.Line(geo,
          new THREE.LineBasicMaterial({ color: 0x0C3A52, transparent: true, opacity: 0.38 }),
        ))

        const dashMat = new THREE.LineDashedMaterial({
          color: 0xD4A030, dashSize: 0.048, gapSize: 0.200, transparent: true, opacity: 0.80,
        })
        const dashLine = new THREE.Line(geo, dashMat)
        dashLine.computeLineDistances()
        arcGroup.add(dashLine)

        const curve = new THREE.CatmullRomCurve3(pts, false, 'chordal')

        const particles = [0, 0.333, 0.667].map((phase) => {
          const mat  = new THREE.MeshBasicMaterial({
            color: 0xFFCC44, transparent: true, opacity: 0.0,
            blending: THREE.AdditiveBlending, depthWrite: false,
          })
          const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.006, 6, 6), mat)
          arcGroup.add(mesh)
          return { mesh, mat, phase }
        })

        return { curve, dashMat, particles, speed: 0.0022 + i * 0.00025, localT: i * 0.142 }
      })

      // ── Orbital paths ──────────────────────────────────────────────────────────
      const makeOrbit = (a: number, b: number, tiltX: number, color: number, opacity: number) => {
        const pts = Array.from({ length: 129 }, (_, i) => {
          const θ = (i / 128) * Math.PI * 2
          return new THREE.Vector3(a * Math.cos(θ), 0, b * Math.sin(θ))
            .applyEuler(new THREE.Euler(tiltX, 0, 0))
        })
        return new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
        )
      }
      scene.add(makeOrbit(1.58, 0.36, -0.42, 0x0D9488, 0.22))
      scene.add(makeOrbit(1.76, 0.29,  0.64, 0xC8962A, 0.18))

      const eulerO1 = new THREE.Euler(-0.42, 0, 0)
      const eulerO2 = new THREE.Euler( 0.64, 0, 0)

      type SatDot = { mesh: THREE.Mesh; a: number; b: number; euler: THREE.Euler; speed: number; t: number }
      const satDots: SatDot[] = [
        { mesh: new THREE.Mesh(new THREE.SphereGeometry(0.010, 8, 8), new THREE.MeshBasicMaterial({ color: 0x0D9488 })), a: 1.58, b: 0.36, euler: eulerO1, speed:  0.0095, t: 0 },
        { mesh: new THREE.Mesh(new THREE.SphereGeometry(0.009, 8, 8), new THREE.MeshBasicMaterial({ color: 0xC8962A })), a: 1.76, b: 0.29, euler: eulerO2, speed: -0.0072, t: Math.PI },
      ]
      satDots.forEach(d => scene.add(d.mesh))

      // ── Physics state ──────────────────────────────────────────────────────────
      const S = {
        ry: Math.PI, rx: 0.18,
        vry: 0.0, vrx: 0.0,
        dragging: false, lastX: 0, lastY: 0,
        zoom: 2.70, zoomTarget: 2.70,
      }
      earthGroup.rotation.y = S.ry
      earthGroup.rotation.x = S.rx

      // Intro animation
      const INTRO_FRAMES = reducedMotion ? 1 : 180
      let introFrame = 0, firstRender = true

      // FPS monitoring
      let fpsLast = performance.now(), fpsCount = 0
      let lowFPS  = false  // quality reduction flag when sustained < 35fps

      // Sun orbit (cached axis to avoid new Euler each frame)
      const SUN_ORBIT_AXIS = new THREE.Vector3(0, 1, 0.18).normalize()
      const sunOrbitQ = new THREE.Quaternion().setFromAxisAngle(SUN_ORBIT_AXIS, 0.000028)

      // ── Input ─────────────────────────────────────────────────────────────────
      const raycaster = new THREE.Raycaster()
      const mouse2    = new THREE.Vector2()
      let hoveredId: string | null = null

      const startDrag = (x: number, y: number) => {
        S.dragging = true; S.lastX = x; S.lastY = y
        container.style.cursor = 'grabbing'
        ttEl.style.opacity = '0'  // hide tooltip while dragging
      }
      const moveDrag = (x: number, y: number) => {
        if (!S.dragging) return
        S.vry = (x - S.lastX) * 0.007
        S.vrx = (y - S.lastY) * 0.004
        S.ry += S.vry
        S.rx  = Math.max(-0.62, Math.min(0.62, S.rx + S.vrx))
        S.lastX = x; S.lastY = y
      }
      const endDrag = () => {
        S.dragging = false
        container.style.cursor = hoveredId ? 'pointer' : 'grab'
      }

      const doHoverCast = (clientX: number, clientY: number) => {
        if (S.dragging) return
        const r = canvas.getBoundingClientRect()
        mouse2.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1)
        raycaster.setFromCamera(mouse2, camera)
        const hits = raycaster.intersectObjects(markerObjs.map(m => m.dot))
        const hit  = hits.length > 0 ? markerObjs.find(m => m.dot === hits[0].object) ?? null : null
        hoveredId  = hit?.loc.id ?? null
        container.style.cursor = hit ? 'pointer' : 'grab'
      }

      const triggerClickRipple = (m: MarkerObj) => {
        const normal = m.dot.position.clone().normalize()
        clickRippleMesh.position.copy(m.dot.position.clone().multiplyScalar(1.016))
        clickRippleMesh.quaternion.setFromUnitVectors(V_UP, normal)
        clickRippleMesh.visible = true
        clickRipplePhase = 0.0
      }

      const handleClick = (e: MouseEvent) => {
        const r = canvas.getBoundingClientRect()
        mouse2.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
        raycaster.setFromCamera(mouse2, camera)
        const hits = raycaster.intersectObjects(markerObjs.map(m => m.dot))
        if (hits.length > 0) {
          const m = markerObjs.find(m => m.dot === hits[0].object)
          if (m) {
            triggerClickRipple(m)
            const wp  = m.dot.position.clone()
            earthGroup.localToWorld(wp)
            const ndc = wp.project(camera)
            const r2  = canvas.getBoundingClientRect()
            onHotspot?.({
              id: m.loc.id, name: m.loc.name, country: m.loc.country, role: m.loc.role,
              division: m.loc.division, sectionLink: m.loc.sectionLink,
              screenX: r2.left + ((ndc.x + 1) / 2) * r2.width,
              screenY: r2.top  + ((-ndc.y + 1) / 2) * r2.height,
            })
          }
        } else {
          onHotspot?.(null)
        }
      }

      // Keyboard navigation: arrows rotate, +/- zoom, brackets cycle markers, Enter selects
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowLeft':  S.vry -= 0.030; e.preventDefault(); break
          case 'ArrowRight': S.vry += 0.030; e.preventDefault(); break
          case 'ArrowUp':    S.vrx -= 0.020; e.preventDefault(); break
          case 'ArrowDown':  S.vrx += 0.020; e.preventDefault(); break
          case '+': case '=': S.zoomTarget = Math.max(1.8, S.zoomTarget - 0.15); break
          case '-': case '_': S.zoomTarget = Math.min(4.2, S.zoomTarget + 0.15); break
          case '[': case ']': {
            e.preventDefault()
            kbMarkerIdx = (kbMarkerIdx + (e.key === '[' ? -1 : 1) + markerObjs.length) % markerObjs.length
            hoveredId = markerObjs[kbMarkerIdx].loc.id
            break
          }
          case 'Enter': case ' ': {
            if (kbMarkerIdx >= 0) {
              const m = markerObjs[kbMarkerIdx]
              triggerClickRipple(m)
              const wp  = m.dot.position.clone()
              earthGroup.localToWorld(wp)
              const ndc = wp.project(camera)
              const r2  = canvas.getBoundingClientRect()
              onHotspot?.({
                id: m.loc.id, name: m.loc.name, country: m.loc.country, role: m.loc.role,
                division: m.loc.division, sectionLink: m.loc.sectionLink,
                screenX: r2.left + ((ndc.x + 1) / 2) * r2.width,
                screenY: r2.top  + ((-ndc.y + 1) / 2) * r2.height,
              })
              e.preventDefault()
            }
            break
          }
          case 'Escape':
            onHotspot?.(null)
            kbMarkerIdx = -1
            hoveredId   = null
            break
        }
      }

      // Touch
      let intent: 'h' | 'v' | null = null, tx0 = 0, ty0 = 0, pinchD0 = 0
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) { tx0 = e.touches[0].clientX; ty0 = e.touches[0].clientY; startDrag(tx0, ty0); intent = null }
        else if (e.touches.length === 2) { pinchD0 = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY) }
      }
      const onTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          const cx = e.touches[0].clientX, cy = e.touches[0].clientY
          if (!intent) { const ax = Math.abs(cx - tx0), ay = Math.abs(cy - ty0); if (ax > 8 || ay > 8) intent = ax >= ay ? 'h' : 'v' }
          if (intent === 'h') { e.preventDefault(); moveDrag(cx, cy) }
          else if (S.dragging) S.dragging = false
        } else if (e.touches.length === 2) {
          const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
          S.zoomTarget = Math.max(1.8, Math.min(4.2, S.zoomTarget + (pinchD0 - d) * 0.008))
          pinchD0 = d
        }
      }
      const onTouchEnd  = () => { endDrag(); intent = null }
      const onWheel     = (e: WheelEvent) => { e.preventDefault(); S.zoomTarget = Math.max(1.8, Math.min(4.2, S.zoomTarget + e.deltaY * 0.0008)) }

      const hDown = (e: MouseEvent) => startDrag(e.clientX, e.clientY)
      const hMove = (e: MouseEvent) => { moveDrag(e.clientX, e.clientY); doHoverCast(e.clientX, e.clientY) }

      canvas.addEventListener('mousedown',  hDown)
      window.addEventListener('mousemove',  hMove)
      window.addEventListener('mouseup',    endDrag)
      canvas.addEventListener('click',      handleClick)
      canvas.addEventListener('keydown',    handleKeyDown)
      canvas.addEventListener('touchstart', onTouchStart, { passive: true })
      canvas.addEventListener('touchmove',  onTouchMove,  { passive: false })
      canvas.addEventListener('touchend',   onTouchEnd)
      canvas.addEventListener('wheel',      onWheel,      { passive: false })

      // Focus ring for keyboard users
      canvas.addEventListener('focus', () => { canvas.style.outline = '2px solid rgba(200,150,42,0.5)' })
      canvas.addEventListener('blur',  () => { canvas.style.outline = 'none' })

      // ── ResizeObserver ────────────────────────────────────────────────────────
      const ro = new ResizeObserver(() => {
        if (disposed) return
        const r = container.getBoundingClientRect()
        if (!r.width || !r.height) return
        renderer.setSize(r.width, r.height)
        camera.aspect = r.width / r.height
        camera.updateProjectionMatrix()
      })
      ro.observe(container)

      // ── Animation loop ────────────────────────────────────────────────────────
      let rafId = 0, frame = 0, previousDaylight = -1
      let inView = true
      const visibilityObserver = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting })
      visibilityObserver.observe(container)

      const draw = () => {
        if (disposed) return
        rafId = requestAnimationFrame(draw)
        if (!inView || document.hidden) return
        frame++
        const t = reducedMotion ? 0 : frame * 0.016

        // ── FPS monitoring (every 60 frames) ───────────────────────────────
        fpsCount++
        if (fpsCount >= 60) {
          const now = performance.now()
          const fps = fpsCount * 1000 / (now - fpsLast)
          lowFPS    = fps < 35
          fpsCount  = 0
          fpsLast   = now
        }

        // ── Sun orbit (slow time-of-day simulation) ─────────────────────────
        // Very subtle: completes one full orbit roughly every ~6 hours of viewing
        if (!reducedMotion) sunDir.applyQuaternion(sunOrbitQ)
        uniforms.uSunDir.value.copy(sunDir)
        const daylight = themeRef.current === 'light' ? 1 : 0
        uniforms.uLightMode.value = reducedMotion ? daylight : THREE.MathUtils.lerp(uniforms.uLightMode.value, daylight, 0.12)
        stars.visible = !daylight
        atmosphere.visible = !daylight
        if (daylight !== previousDaylight) {
          markerObjs.forEach(marker => {
            const color = daylight
              ? (marker.loc.isHQ ? 0x855C16 : 0x086580)
              : (marker.loc.isHQ ? 0xC8962A : 0x22D3EE)
            for (const mesh of [marker.dot, marker.ring, marker.outerRing]) {
              if (mesh) (mesh.material as THREE.MeshBasicMaterial).color.setHex(color)
            }
          })
          previousDaylight = daylight
        }

        // Interactive lighting response: drag speed slightly brightens the scene
        const dragIntensity = Math.min(1, Math.abs(S.vry) * 18)
        renderer.toneMappingExposure = 1.15 + dragIntensity * 0.22

        // ── Texture blend-in ────────────────────────────────────────────────
        if (uniforms.uTexBlend.value > 0 && texBlend < 1.0) {
          texBlend = Math.min(1.0, texBlend + 0.006)
          uniforms.uTexBlend.value = texBlend
        }

        // ── Cinematic intro: camera flies in from deep space ────────────────
        if (introFrame < INTRO_FRAMES) {
          introFrame++
          const ease = easeOutCubic(introFrame / INTRO_FRAMES)
          camera.position.z = 7.5 - (7.5 - S.zoom) * ease
        } else {
          S.zoom += (S.zoomTarget - S.zoom) * 0.08
          camera.position.z = S.zoom
        }

        camera.position.z += uniforms.uLightMode.value * 0.8

        // ── Rotation physics ────────────────────────────────────────────────
        if (!S.dragging) {
          S.vry *= 0.93; S.vrx *= 0.90
          S.vry += ((reducedMotion ? 0 : 0.0011) - S.vry) * 0.018
        }
        S.ry += S.vry
        S.rx  = Math.max(-0.62, Math.min(0.62, S.rx + S.vrx))
        earthGroup.rotation.y = S.ry
        earthGroup.rotation.x = S.rx

        // ── Camera micro-drift ──────────────────────────────────────────────
        camera.position.x = reducedMotion ? 0 : Math.sin(t * 0.052) * 0.022
        camera.position.y = reducedMotion ? 0 : Math.cos(t * 0.038) * 0.016
        camera.lookAt(0, 0, 0)

        // ── Clouds ──────────────────────────────────────────────────────────
        if (cloudsMesh && !reducedMotion) cloudsMesh.rotation.y += 0.00019

        // ── Marker animation ────────────────────────────────────────────────
        markerObjs.forEach((m) => {
          const isHovered = m.loc.id === hoveredId
          m.scaleTarget   = isHovered ? 1.65 : 1.0
          const cs        = m.dot.scale.x
          m.dot.scale.setScalar(cs + (m.scaleTarget - cs) * 0.14)
          ;(m.dot.material as THREE.MeshBasicMaterial).color.setHex(
            isHovered ? (m.loc.isHQ ? 0xFFD966 : 0x44EEFF) : (m.loc.isHQ ? 0xC8962A : 0x22D3EE)
          )

          if (m.loc.isHQ) {
            const pulse = Math.sin(t * 2.5)
            ;(m.ring.material as THREE.MeshBasicMaterial).opacity = 0.28 + 0.28 * pulse
            m.ring.scale.setScalar(1 + 0.30 * pulse)
            if (m.outerRing) {
              ;(m.outerRing.material as THREE.MeshBasicMaterial).opacity = 0.11 + 0.13 * Math.sin(t * 2.5 + 0.5)
              m.outerRing.scale.setScalar(1 + 0.18 * Math.sin(t * 2.5 + 0.5))
            }
            if (m.glowMesh) {
              ;(m.glowMesh.material as THREE.MeshBasicMaterial).opacity = 0.05 + 0.04 * pulse
            }
          }
        })

        // ── Hover tooltip — projected to 2D, updated imperatively ───────────
        const tooltipMarker = hoveredId ? markerObjs.find(m => m.loc.id === hoveredId) : null
        if (tooltipMarker && !S.dragging) {
          const wp = tooltipMarker.dot.position.clone()
          earthGroup.localToWorld(wp)
          const ndc = wp.project(camera)
          if (ndc.z < 1.0) {  // only show if on visible hemisphere
            const r2 = canvas.getBoundingClientRect()
            const sx = ((ndc.x + 1) / 2) * r2.width
            const sy = ((-ndc.y + 1) / 2) * r2.height - 32
            ttEl.style.left      = `${sx}px`
            ttEl.style.top       = `${sy}px`
            ttEl.style.opacity   = '1'
            ttRole.textContent   = tooltipMarker.loc.role
            ttName.textContent   = tooltipMarker.loc.name
            ttCountry.textContent = tooltipMarker.loc.country
          } else {
            ttEl.style.opacity = '0'
          }
        } else {
          ttEl.style.opacity = '0'
        }

        // ── HQ radar ripple ─────────────────────────────────────────────────
        const RADAR_P = 280
        const animRadar = (r: typeof radar1, phase: number) => {
          r.mesh.scale.setScalar(1 + phase * 9)
          r.mat.opacity = (1 - phase) * 0.55
        }
        if (!reducedMotion) {
          animRadar(radar1, (frame % RADAR_P) / RADAR_P)
          animRadar(radar2, ((frame + RADAR_P / 2) % RADAR_P) / RADAR_P)
        }

        // ── Click ripple ────────────────────────────────────────────────────
        if (clickRipplePhase < 1.0) {
          clickRipplePhase += 0.025
          clickRippleMesh.scale.setScalar(1 + clickRipplePhase * 12)
          clickRippleMat.opacity = Math.max(0, (1 - clickRipplePhase) * 0.6)
          if (clickRipplePhase >= 1.0) clickRippleMesh.visible = false
        }

        // ── Route dashes + particle travelers ───────────────────────────────
        // Skip particle updates in low-FPS mode to recover performance
        const skipParticles = lowFPS && frame % 2 !== 0
        routeStates.forEach((route) => {
          route.localT = (route.localT + (reducedMotion ? 0 : route.speed)) % 1
          ;(route.dashMat as unknown as { dashOffset: number }).dashOffset -= route.speed * 0.6

          if (!skipParticles) {
            route.particles.forEach(({ mesh, mat, phase }) => {
              const tp = (route.localT + phase) % 1
              route.curve.getPoint(tp, tempPt)
              mesh.position.copy(tempPt)
              mat.opacity = Math.sin(tp * Math.PI) * 0.85
            })
          }
        })

        // ── Orbital satellite dots ──────────────────────────────────────────
        satDots.forEach((sd) => {
          if (!reducedMotion) sd.t += sd.speed
          sd.mesh.position.set(sd.a * Math.cos(sd.t), 0, sd.b * Math.sin(sd.t)).applyEuler(sd.euler)
        })

        renderer.render(scene, camera)

        // ── First frame: fade canvas in, notify parent ──────────────────────
        if (firstRender) {
          firstRender = false
          requestAnimationFrame(() => requestAnimationFrame(() => {
            if (!disposed) { canvas.style.opacity = '1'; onReady?.() }
          }))
        }
      }

      draw()

      // ── Cleanup ───────────────────────────────────────────────────────────────
      return () => {
        disposed = true
        cancelAnimationFrame(rafId)
        ro.disconnect()
        visibilityObserver.disconnect()
        canvas.removeEventListener('mousedown',  hDown)
        window.removeEventListener('mousemove',  hMove)
        window.removeEventListener('mouseup',    endDrag)
        canvas.removeEventListener('click',      handleClick)
        canvas.removeEventListener('keydown',    handleKeyDown)
        canvas.removeEventListener('touchstart', onTouchStart)
        canvas.removeEventListener('touchmove',  onTouchMove)
        canvas.removeEventListener('touchend',   onTouchEnd)
        canvas.removeEventListener('wheel',      onWheel)
        const resources = new Set<{ dispose: () => void }>()
        scene.traverse(obj => {
          const mesh = obj as THREE.Mesh
          if (mesh.geometry) resources.add(mesh.geometry)
          const materials = mesh.material ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : []
          materials.forEach(material => {
            resources.add(material)
            Object.values(material).forEach(value => { if (value instanceof THREE.Texture) resources.add(value) })
          })
        })
        Object.values(uniforms).forEach(uniform => { if (uniform.value instanceof THREE.Texture) resources.add(uniform.value) })
        resources.forEach(resource => resource.dispose())
        renderer.dispose()
        if (container.contains(canvas)) container.removeChild(canvas)
        if (container.contains(ttEl)) container.removeChild(ttEl)
      }
    } catch (err) {
      console.error('[Globe3D]', err)
      setError(true)
    }
  }, [webGLOk])

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
