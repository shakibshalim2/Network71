import * as THREE from 'three'
import { LOCATIONS, type Location } from './data'
import { greatArc } from './geo'

// ─── Trade routes + particle travelers ────────────────────────────────────────

export type RouteState = {
  curve: THREE.CatmullRomCurve3
  dashMat: THREE.LineDashedMaterial
  particles: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }[]
  speed: number
  localT: number
}

export function createRoutes(arcGroup: THREE.Group, hqLoc: Location): RouteState[] {
  return [1, 2, 3, 4, 5, 6, 7].map((toIdx, i) => {
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
}
