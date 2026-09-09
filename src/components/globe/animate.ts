import * as THREE from 'three'
import type { ResolvedTheme } from '@/context/ThemeContext'
import type { Quality } from './data'
import { easeOutCubic } from './geo'
import type { MarkerObj, Uniforms } from './scene'
import type { RouteState } from './routes'
import type { SatDot } from './orbits'
import type { Physics, ClickRipple } from './interaction'

export interface FrameCtx {
  q: Quality
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  canvas: HTMLCanvasElement
  container: HTMLElement
  themeRef: { current: ResolvedTheme }
  sunDir: THREE.Vector3
  uniforms: Uniforms
  stars: THREE.Group
  atmosphere: THREE.Group
  earthGroup: THREE.Group
  cloudsMesh: THREE.Mesh | null
  markerObjs: MarkerObj[]
  S: Physics
  input: { hoveredId: string | null }
  tooltip: { ttEl: HTMLDivElement; ttRole: HTMLDivElement; ttName: HTMLDivElement; ttCountry: HTMLDivElement }
  radar1: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial }
  radar2: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial }
  ripple: ClickRipple
  routeStates: RouteState[]
  satDots: SatDot[]
  onReady?: () => void
}

export function createFrameLoop(ctx: FrameCtx) {
  const {
    q, renderer, scene, camera, canvas, container, themeRef, sunDir, uniforms, stars, atmosphere,
    earthGroup, cloudsMesh, markerObjs, S, input, tooltip, radar1, radar2, ripple, routeStates, satDots, onReady,
  } = ctx
  const { reducedMotion } = q
  const { ttEl, ttRole, ttName, ttCountry } = tooltip

  // Intro animation
  const INTRO_FRAMES = reducedMotion ? 1 : 180
  let introFrame = 0, firstRender = true

  // FPS monitoring
  let fpsLast = performance.now(), fpsCount = 0
  let lowFPS  = false  // quality reduction flag when sustained < 35fps

  // Sun orbit (cached axis to avoid new Euler each frame)
  const SUN_ORBIT_AXIS = new THREE.Vector3(0, 1, 0.18).normalize()
  const sunOrbitQ = new THREE.Quaternion().setFromAxisAngle(SUN_ORBIT_AXIS, 0.000028)

  const tempPt = new THREE.Vector3()  // reused each frame — no allocation in loop
  let texBlend = 0.0

  let disposed = false
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
    const hoveredId = input.hoveredId
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
    if (ripple.phase < 1.0) {
      ripple.phase += 0.025
      ripple.clickRippleMesh.scale.setScalar(1 + ripple.phase * 12)
      ripple.clickRippleMat.opacity = Math.max(0, (1 - ripple.phase) * 0.6)
      if (ripple.phase >= 1.0) ripple.clickRippleMesh.visible = false
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

  const stop = () => {
    disposed = true
    cancelAnimationFrame(rafId)
    visibilityObserver.disconnect()
  }

  return { start: draw, stop }
}
