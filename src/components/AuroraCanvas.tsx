import { useEffect, useRef } from "react"

const VERT = `
attribute vec2 a;
void main(){ gl_Position = vec4(a, 0.0, 1.0); }
`

/* Two drifting colour fields blended with soft noise; reads as slow-moving light behind the hero. */
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_t;
uniform vec3 u_a;
uniform vec3 u_b;
uniform float u_alpha;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, amp = 0.5;
  for (int i = 0; i < 4; i++) { v += amp * noise(p); p *= 2.05; amp *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv * vec2(u_res.x / u_res.y, 1.0);
  float t = u_t * 0.045;
  float n1 = fbm(p * 1.6 + vec2(t, -t * 0.6));
  float n2 = fbm(p * 2.2 - vec2(t * 0.8, t * 0.4) + 3.1);
  float band = smoothstep(0.25, 0.85, n1) * (0.55 + 0.45 * sin(uv.x * 3.0 + t * 2.0));
  vec3 col = u_a * band + u_b * smoothstep(0.35, 0.9, n2) * 0.7;
  float vignette = smoothstep(1.15, 0.25, distance(uv, vec2(0.62, 0.3)));
  gl_FragColor = vec4(col * vignette, u_alpha * vignette * (band + n2) * 0.5);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim())
  if (!m) return [0.78, 0.59, 0.16]
  return [
    parseInt(m[1], 16) / 255,
    parseInt(m[2], 16) / 255,
    parseInt(m[3], 16) / 255,
  ]
}

interface Props {
  /** Primary colour (hex). Defaults to brand gold. */
  color?: string
  /** Secondary colour (hex). */
  secondary?: string
  className?: string
  /** 0–1 overall strength. */
  intensity?: number
}

/**
 * GPU-cheap aurora backdrop. Renders at half resolution, pauses when hidden or
 * when the user prefers reduced motion, and falls back to nothing without WebGL.
 */
export default function AuroraCanvas({
  color = "#C8962A",
  secondary = "#0D9488",
  className = "",
  intensity = 0.55,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const loc = gl.getAttribLocation(prog, "a")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, "u_res")
    const uT = gl.getUniformLocation(prog, "u_t")
    gl.uniform3fv(gl.getUniformLocation(prog, "u_a"), hexToRgb(color))
    gl.uniform3fv(gl.getUniformLocation(prog, "u_b"), hexToRgb(secondary))
    gl.uniform1f(gl.getUniformLocation(prog, "u_alpha"), intensity)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    let frame = 0
    let visible = true
    const start = performance.now()

    const resize = () => {
      const scale = 0.5
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale))
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    const draw = () => {
      frame = 0
      if (!visible) return
      resize()
      gl.uniform1f(uT, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frame = requestAnimationFrame(draw)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && document.visibilityState === "visible"
      if (visible && !frame) frame = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    const onVis = () => {
      visible = document.visibilityState === "visible"
      if (visible && !frame) frame = requestAnimationFrame(draw)
    }
    document.addEventListener("visibilitychange", onVis)
    frame = requestAnimationFrame(draw)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [color, secondary, intensity])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`aurora-canvas ${className}`}
    />
  )
}
