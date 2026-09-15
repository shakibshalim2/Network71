import type { PointerEvent } from "react"

/** Writes --mx/--my (percent) on the hovered element so a CSS radial can follow the pointer. */
export function spotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`)
  el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`)
}
