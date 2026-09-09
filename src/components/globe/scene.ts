import * as THREE from 'three'
import { LOCATIONS, type Location, type Quality } from './data'
import { EARTH_VERT, EARTH_FRAG, ATMO_VERT, ATMO_FRAG, OUTER_ATMO_FRAG } from './shaders'
import { latLon, buildLandMask } from './geo'

export const V_UP = new THREE.Vector3(0, 0, 1)

// ─── Renderer + canvas ────────────────────────────────────────────────────────

export function createRenderer(container: HTMLElement, q: Quality) {
  const rect0 = container.getBoundingClientRect()
  const W0 = Math.max(rect0.width, 320), H0 = Math.max(rect0.height, 200)
  const renderer = new THREE.WebGLRenderer({ antialias: !q.mobile, alpha: true })
  renderer.setPixelRatio(q.PR)
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
  return { renderer, canvas, W0, H0 }
}

// ─── Hover tooltip (imperative DOM — no React re-render lag) ──────────────────

export function createTooltip(container: HTMLElement) {
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
  return { ttEl, ttRole, ttName, ttCountry }
}

// ─── Star field (two layers for depth) ───────────────────────────────────────

export function createStars(STAR_COUNT: number) {
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
  return stars
}

// ─── Earth shader + atmospheres ───────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Uniforms = Record<string, THREE.IUniform<any>>

export function createEarth(q: Quality, sunDir: THREE.Vector3, lightMode: number) {
  // ── Land mask ─────────────────────────────────────────────────────────────
  const maskTex  = new THREE.CanvasTexture(buildLandMask(q.MASK_W, q.MASK_H))
  const blackPx  = new Uint8Array([0, 0, 0, 255])
  const blackTex = new THREE.DataTexture(blackPx, 1, 1, THREE.RGBAFormat)
  blackTex.needsUpdate = true

  // ── Earth group ───────────────────────────────────────────────────────────
  const earthGroup = new THREE.Group()
  earthGroup.rotation.y = Math.PI  // Dhaka faces camera initially

  // ── Earth shader ──────────────────────────────────────────────────────────
  const uniforms: Uniforms = {
    uMask:     { value: maskTex },
    uDay:      { value: blackTex as THREE.Texture },
    uNight:    { value: blackTex as THREE.Texture },
    uTexBlend: { value: 0.0 },
    uLightMode: { value: lightMode },
    uSunDir:   { value: sunDir.clone() },
  }
  const earthMat = new THREE.ShaderMaterial({ uniforms, vertexShader: EARTH_VERT, fragmentShader: EARTH_FRAG })
  earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1, q.SEGS, q.SEGS), earthMat))

  // ── Atmospheres ───────────────────────────────────────────────────────────
  const atmoMat = new THREE.ShaderMaterial({
    vertexShader: ATMO_VERT, fragmentShader: ATMO_FRAG,
    blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, side: THREE.FrontSide,
  })
  const atmosphere = new THREE.Group()
  atmosphere.add(new THREE.Mesh(new THREE.SphereGeometry(1.20, 48, 48), atmoMat))

  if (!q.mobile) {
    atmosphere.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.42, 48, 48),
      new THREE.ShaderMaterial({
        vertexShader: ATMO_VERT, fragmentShader: OUTER_ATMO_FRAG,
        blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, side: THREE.FrontSide,
      }),
    ))
  }

  return { earthGroup, atmosphere, uniforms, blackTex }
}

// ─── Markers ──────────────────────────────────────────────────────────────────

export type MarkerObj = {
  loc: Location
  dot: THREE.Mesh
  ring: THREE.Mesh
  outerRing: THREE.Mesh | null
  glowMesh: THREE.Mesh | null
  scaleTarget: number
}

export function createMarkers(markerGroup: THREE.Group): MarkerObj[] {
  return LOCATIONS.map((loc) => {
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
}

// ─── HQ radar pulse + click ripple ────────────────────────────────────────────

export function createRadarRing(earthGroup: THREE.Group, hqPos: THREE.Vector3, hqNormal: THREE.Vector3) {
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

export function createClickRipple(earthGroup: THREE.Group) {
  const clickRippleMat = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF, transparent: true, opacity: 0.0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
  })
  const clickRippleMesh = new THREE.Mesh(new THREE.RingGeometry(0.001, 0.003, 64), clickRippleMat)
  clickRippleMesh.visible = false
  earthGroup.add(clickRippleMesh)
  return { clickRippleMesh, clickRippleMat }
}
