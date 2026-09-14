import type { Transition, Variants } from "motion/react"

/** Shared easing/duration vocabulary so every animation on the public site feels related. */
export const EASE_OUT = [0.2, 0.7, 0.2, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

export const springSoft: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 34,
  mass: 0.9,
}
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 520,
  damping: 38,
  mass: 0.7,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

export const staggerChildren = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

/** Dropdown / popover panels anchored to a trigger. */
export const popover: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.16, ease: EASE_IN_OUT },
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: EASE_OUT },
  },
}

export const backdrop: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  show: { opacity: 1, transition: { duration: 0.25 } },
}

export const sheetDown: Variants = {
  hidden: { y: "-100%", transition: { duration: 0.24, ease: EASE_IN_OUT } },
  show: { y: 0, transition: springSoft },
}

export const drawerRight: Variants = {
  hidden: { x: "100%", transition: { duration: 0.26, ease: EASE_IN_OUT } },
  show: { x: 0, transition: springSoft },
}

export const modalPanel: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    transition: { duration: 0.18, ease: EASE_IN_OUT },
  },
  show: { opacity: 1, y: 0, scale: 1, transition: springSoft },
}
