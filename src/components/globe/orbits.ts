import * as THREE from 'three'

// ─── Orbital paths + satellite dots ──────────────────────────────────────────

export type SatDot = { mesh: THREE.Mesh; a: number; b: number; euler: THREE.Euler; speed: number; t: number }

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

export function createOrbits(scene: THREE.Scene): SatDot[] {
  scene.add(makeOrbit(1.58, 0.36, -0.42, 0x0D9488, 0.22))
  scene.add(makeOrbit(1.76, 0.29,  0.64, 0xC8962A, 0.18))

  const eulerO1 = new THREE.Euler(-0.42, 0, 0)
  const eulerO2 = new THREE.Euler( 0.64, 0, 0)

  const satDots: SatDot[] = [
    { mesh: new THREE.Mesh(new THREE.SphereGeometry(0.010, 8, 8), new THREE.MeshBasicMaterial({ color: 0x0D9488 })), a: 1.58, b: 0.36, euler: eulerO1, speed:  0.0095, t: 0 },
    { mesh: new THREE.Mesh(new THREE.SphereGeometry(0.009, 8, 8), new THREE.MeshBasicMaterial({ color: 0xC8962A })), a: 1.76, b: 0.29, euler: eulerO2, speed: -0.0072, t: Math.PI },
  ]
  satDots.forEach(d => scene.add(d.mesh))
  return satDots
}
