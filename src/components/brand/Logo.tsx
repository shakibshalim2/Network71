/**
 * Network71 Logo — pixel-accurate rendering of the original uploaded artwork.
 *
 * Source files:
 *   network7_logo_highres_transparent.png  4542×4542 RGBA  — content at x=324–4332, y=1705–2638
 *   image.jpg                              1024×1024 RGB   — badge content at x=81–942,  y=86–937
 *   IMG_20260828_050407.png                2172×724  RGB   — white+red logo on black (dark-bg variant)
 *
 * CSS viewport cropping scales each source image so the live content area renders
 * at exactly the requested `height`, with an invisible overflow:hidden clip.
 */

import logoTransparent from '@/imports/network7_logo_highres_transparent.png'
import badgeImg        from '@/imports/image.jpg'
import logoDarkBg      from '@/imports/IMG_20260828_050407.png'

// ── Content bounds (fractions of the source canvas) ─────────────────────────

/** Full logo within 4542×4542 transparent PNG (square source → sourceAR = 1) */
const LOGO = {
  L: 0.069, T: 0.373, W: 0.887, H: 0.210,
  sourceAR: 1,
}

/** 71 badge within 1024×1024 JPEG (square source → sourceAR = 1) */
const BADGE = {
  L: 0.074, T: 0.079, W: 0.851, H: 0.841,
  sourceAR: 1,
}

/** White+red logo on black within 2172×724 PNG (wide source → sourceAR = 3.0) */
const LOGO_DARK = {
  L: 0.010, T: 0.050, W: 0.970, H: 0.900,
  sourceAR: 2172 / 724,   // ≈ 3.0
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type LogoVariant =
  | 'primary'       // Black+red — for light backgrounds (use on white backing)
  | 'primary-dark'  // White+red — for dark backgrounds (use directly on dark bg)
  | 'mono-black'    // Full-black silhouette
  | 'mono-white'    // Full-white silhouette
  | 'icon'          // 71 badge — original colours
  | 'icon-black'    // 71 badge — black silhouette
  | 'icon-white'    // 71 badge — white silhouette

export interface LogoProps {
  variant?: LogoVariant
  height?: number
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
}

// ── CSS filter per variant ────────────────────────────────────────────────────

const FILTER: Record<LogoVariant, string> = {
  'primary':      'none',
  'primary-dark': 'none',
  'mono-black':   'grayscale(1) brightness(0)',
  'mono-white':   'grayscale(1) brightness(0) invert(1)',
  'icon':         'none',
  'icon-black':   'grayscale(1) brightness(0)',
  'icon-white':   'grayscale(1) brightness(0) invert(1)',
}

// ── Internal cropper ──────────────────────────────────────────────────────────

interface Bounds {
  L: number; T: number; W: number; H: number
  sourceAR: number   // sourceWidth / sourceHeight (1 for square sources)
}

interface CropProps {
  src: string
  alt: string
  bounds: Bounds
  height: number
  filter: string
}

function Cropped({ src, alt, bounds, height, filter }: CropProps) {
  const { L, T, W, H, sourceAR } = bounds

  // Scale canvas so the content area renders at exactly `height` px tall
  const canvasH = height / H
  const canvasW = canvasH * sourceAR   // handles both square and wide sources
  const containerW = W * canvasW
  const offsetX = L * canvasW
  const offsetY = T * canvasH

  return (
    <div style={{
      width: Math.round(containerW),
      height: Math.round(height),
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
      display: 'inline-block',
      lineHeight: 0,
    }}>
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          position: 'absolute',
          width:  Math.round(canvasW),
          height: Math.round(canvasH),
          top:  -Math.round(offsetY),
          left: -Math.round(offsetX),
          filter,
          display: 'block',
          maxWidth: 'none',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  )
}

// ── Public component ──────────────────────────────────────────────────────────

export default function Logo({
  variant = 'primary',
  height = 40,
  className,
  style,
  'aria-label': ariaLabel = 'Network71',
}: LogoProps) {
  const filter = FILTER[variant]
  const isIcon = variant.startsWith('icon')
  const isDark = variant === 'primary-dark'

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0, ...style }}
      role="img"
      aria-label={ariaLabel}
    >
      {isIcon
        ? <Cropped src={badgeImg}        alt={ariaLabel} bounds={BADGE}     height={height} filter={filter} />
        : isDark
          ? <Cropped src={logoDarkBg}    alt={ariaLabel} bounds={LOGO_DARK} height={height} filter={filter} />
          : <Cropped src={logoTransparent} alt={ariaLabel} bounds={LOGO}    height={height} filter={filter} />
      }
    </span>
  )
}
