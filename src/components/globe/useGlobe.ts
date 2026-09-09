import { useEffect, useRef, useState, type RefObject } from 'react'
import * as THREE from 'three'
import { useTheme } from '@/context/ThemeContext'
import { LOCATIONS, detectQuality, type GlobeProps } from './data'
import { latLon, isWebGLAvailable } from './geo'
import {
  createRenderer, createTooltip, createStars, createEarth, createMarkers,
  createRadarRing, createClickRipple,
} from './scene'
import { createRoutes } from './routes'
import { createOrbits } from './orbits'
import { createPhysics, attachInteraction } from './interaction'
import { createFrameLoop } from './animate'

const CDN = 'https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/'

export function useGlobe(
  containerRef: RefObject<HTMLDivElement | null>,
  { onHotspot, onReady }: Pick<GlobeProps, 'onHotspot' | 'onReady'>,
) {
  const { theme } = useTheme()
  const themeRef = useRef(theme)
  useEffect(() => { themeRef.current = theme }, [theme])
  const [webGLOk]    = useState(isWebGLAvailable)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!webGLOk) return
    const container = containerRef.current
    if (!container) return
    let disposed = false

    try {
      const q = detectQuality()
      const { mobile, tablet, SEGS, STAR_COUNT } = q

      // ── Renderer + hover tooltip ──────────────────────────────────────────────
      const { renderer, canvas, W0, H0 } = createRenderer(container, q)
      const tooltip = createTooltip(container)

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

      const stars = createStars(STAR_COUNT)
      scene.add(stars)

      const { earthGroup, atmosphere, uniforms, blackTex } =
        createEarth(q, sunDir, themeRef.current === 'light' ? 1 : 0)
      scene.add(earthGroup)
      scene.add(atmosphere)

      // ── CDN textures ──────────────────────────────────────────────────────────
      // Only blend in when BOTH succeed — error leaves procedural shader intact.
      let dayOK = false, nightOK = false
      const tryBlend = () => { if (dayOK && nightOK) uniforms.uTexBlend.value = 0.001 }
      const loader   = new THREE.TextureLoader()
      loader.setCrossOrigin('anonymous')
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
      const markerObjs = createMarkers(markerGroup)

      // ── HQ radar pulse ─────────────────────────────────────────────────────────
      const hqLoc    = LOCATIONS[0]
      const hqPos    = latLon(hqLoc.lat, hqLoc.lon)
      const hqNormal = hqPos.clone().normalize()
      const radar1 = createRadarRing(earthGroup, hqPos, hqNormal)
      const radar2 = createRadarRing(earthGroup, hqPos, hqNormal)

      // Click-ripple: brief flash on any clicked marker
      const ripple = { ...createClickRipple(earthGroup), phase: 1.0 }   // 1 = finished

      // ── Trade routes + particle travelers ──────────────────────────────────────
      const arcGroup = new THREE.Group()
      earthGroup.add(arcGroup)
      const routeStates = createRoutes(arcGroup, hqLoc)

      // ── Orbital paths ──────────────────────────────────────────────────────────
      const satDots = createOrbits(scene)

      // ── Physics state ──────────────────────────────────────────────────────────
      const S = createPhysics()
      earthGroup.rotation.y = S.ry
      earthGroup.rotation.x = S.rx

      // ── Input ─────────────────────────────────────────────────────────────────
      const { input, detach } = attachInteraction({
        container, canvas, camera, earthGroup, markerObjs, ttEl: tooltip.ttEl, S, ripple, onHotspot,
      })

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
      const loop = createFrameLoop({
        q, renderer, scene, camera, canvas, container, themeRef, sunDir, uniforms, stars, atmosphere,
        earthGroup, cloudsMesh, markerObjs, S, input, tooltip, radar1, radar2, ripple, routeStates, satDots, onReady,
      })
      loop.start()

      // ── Cleanup ───────────────────────────────────────────────────────────────
      return () => {
        disposed = true
        loop.stop()
        ro.disconnect()
        detach()
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
        if (container.contains(tooltip.ttEl)) container.removeChild(tooltip.ttEl)
      }
    } catch (err) {
      console.error('[Globe3D]', err)
      setError(true)
    }
  }, [webGLOk])

  return { webGLOk, error }
}
