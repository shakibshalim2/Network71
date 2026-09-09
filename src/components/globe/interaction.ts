import * as THREE from 'three'
import type { HotspotData } from './data'
import { V_UP, type MarkerObj } from './scene'

// ─── Physics state ────────────────────────────────────────────────────────────

export function createPhysics() {
  return {
    ry: Math.PI, rx: 0.18,
    vry: 0.0, vrx: 0.0,
    dragging: false, lastX: 0, lastY: 0,
    zoom: 2.70, zoomTarget: 2.70,
  }
}
export type Physics = ReturnType<typeof createPhysics>

export type ClickRipple = { clickRippleMesh: THREE.Mesh; clickRippleMat: THREE.MeshBasicMaterial; phase: number }

export interface InteractionCtx {
  container: HTMLElement
  canvas: HTMLCanvasElement
  camera: THREE.PerspectiveCamera
  earthGroup: THREE.Group
  markerObjs: MarkerObj[]
  ttEl: HTMLDivElement
  S: Physics
  ripple: ClickRipple
  onHotspot?: (data: HotspotData | null) => void
}

// ─── Input ────────────────────────────────────────────────────────────────────

export function attachInteraction(ctx: InteractionCtx) {
  const { container, canvas, camera, earthGroup, markerObjs, ttEl, S, ripple, onHotspot } = ctx
  const raycaster = new THREE.Raycaster()
  const mouse2    = new THREE.Vector2()
  // Mutable so the draw loop can read hover state each frame
  const input = { hoveredId: null as string | null, kbMarkerIdx: -1 }

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
    container.style.cursor = input.hoveredId ? 'pointer' : 'grab'
  }

  const doHoverCast = (clientX: number, clientY: number) => {
    if (S.dragging) return
    const r = canvas.getBoundingClientRect()
    mouse2.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1)
    raycaster.setFromCamera(mouse2, camera)
    const hits = raycaster.intersectObjects(markerObjs.map(m => m.dot))
    const hit  = hits.length > 0 ? markerObjs.find(m => m.dot === hits[0].object) ?? null : null
    input.hoveredId = hit?.loc.id ?? null
    container.style.cursor = hit ? 'pointer' : 'grab'
  }

  const triggerClickRipple = (m: MarkerObj) => {
    const normal = m.dot.position.clone().normalize()
    ripple.clickRippleMesh.position.copy(m.dot.position.clone().multiplyScalar(1.016))
    ripple.clickRippleMesh.quaternion.setFromUnitVectors(V_UP, normal)
    ripple.clickRippleMesh.visible = true
    ripple.phase = 0.0
  }

  const emitHotspot = (m: MarkerObj) => {
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

  const handleClick = (e: MouseEvent) => {
    const r = canvas.getBoundingClientRect()
    mouse2.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    raycaster.setFromCamera(mouse2, camera)
    const hits = raycaster.intersectObjects(markerObjs.map(m => m.dot))
    if (hits.length > 0) {
      const m = markerObjs.find(m => m.dot === hits[0].object)
      if (m) {
        triggerClickRipple(m)
        emitHotspot(m)
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
        input.kbMarkerIdx = (input.kbMarkerIdx + (e.key === '[' ? -1 : 1) + markerObjs.length) % markerObjs.length
        input.hoveredId = markerObjs[input.kbMarkerIdx].loc.id
        break
      }
      case 'Enter': case ' ': {
        if (input.kbMarkerIdx >= 0) {
          const m = markerObjs[input.kbMarkerIdx]
          triggerClickRipple(m)
          emitHotspot(m)
          e.preventDefault()
        }
        break
      }
      case 'Escape':
        onHotspot?.(null)
        input.kbMarkerIdx = -1
        input.hoveredId   = null
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

  const detach = () => {
    canvas.removeEventListener('mousedown',  hDown)
    window.removeEventListener('mousemove',  hMove)
    window.removeEventListener('mouseup',    endDrag)
    canvas.removeEventListener('click',      handleClick)
    canvas.removeEventListener('keydown',    handleKeyDown)
    canvas.removeEventListener('touchstart', onTouchStart)
    canvas.removeEventListener('touchmove',  onTouchMove)
    canvas.removeEventListener('touchend',   onTouchEnd)
    canvas.removeEventListener('wheel',      onWheel)
  }

  return { input, detach }
}
