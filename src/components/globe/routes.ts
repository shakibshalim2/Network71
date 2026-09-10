import { AdditiveBlending, BufferGeometry, CatmullRomCurve3, Group, Line, LineBasicMaterial, LineDashedMaterial, Mesh, MeshBasicMaterial, SphereGeometry } from 'three'
import { LOCATIONS, type Location } from './data'
import { greatArc } from './geo'

// ─── Trade routes + particle travelers ────────────────────────────────────────

export type RouteState = {
  curve: CatmullRomCurve3
  dashMat: LineDashedMaterial
  particles: { mesh: Mesh; mat: MeshBasicMaterial; phase: number }[]
  speed: number
  localT: number
}

export function createRoutes(arcGroup: Group, hqLoc: Location): RouteState[] {
  return [1, 2, 3, 4, 5, 6, 7].map((toIdx, i) => {
    const dest = LOCATIONS[toIdx]
    const pts  = greatArc(hqLoc.lat, hqLoc.lon, dest.lat, dest.lon)
    const geo  = new BufferGeometry().setFromPoints(pts)

    arcGroup.add(new Line(geo,
      new LineBasicMaterial({ color: 0x0C3A52, transparent: true, opacity: 0.38 }),
    ))

    const dashMat = new LineDashedMaterial({
      color: 0xD4A030, dashSize: 0.048, gapSize: 0.200, transparent: true, opacity: 0.80,
    })
    const dashLine = new Line(geo, dashMat)
    dashLine.computeLineDistances()
    arcGroup.add(dashLine)

    const curve = new CatmullRomCurve3(pts, false, 'chordal')

    const particles = [0, 0.333, 0.667].map((phase) => {
      const mat  = new MeshBasicMaterial({
        color: 0xFFCC44, transparent: true, opacity: 0.0,
        blending: AdditiveBlending, depthWrite: false,
      })
      const mesh = new Mesh(new SphereGeometry(0.006, 6, 6), mat)
      arcGroup.add(mesh)
      return { mesh, mat, phase }
    })

    return { curve, dashMat, particles, speed: 0.0022 + i * 0.00025, localT: i * 0.142 }
  })
}
