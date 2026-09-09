// ─── GLSL ─────────────────────────────────────────────────────────────────────

export const EARTH_VERT = /* glsl */`
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vLocalPos;
void main() {
  vUv = uv;
  vLocalPos = position;
  vec4 wp = modelMatrix * vec4(position,1.0);
  vWorldPos = wp.xyz;
  vWorldNormal = normalize(mat3(modelMatrix)*normal);
  gl_Position = projectionMatrix*viewMatrix*wp;
}
`

export const EARTH_FRAG = /* glsl */`
uniform sampler2D uMask;
uniform sampler2D uDay;
uniform sampler2D uNight;
uniform float uTexBlend;
uniform float uLightMode;
uniform vec3  uSunDir;

varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vLocalPos;

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 L = normalize(uSunDir);
  vec3 V = normalize(cameraPosition - vWorldPos);

  float dayFac   = dot(N,L);
  float dayBlend = smoothstep(-0.28, 0.54, dayFac);

  vec2  mask = texture2D(uMask, vUv).rg;
  float land = mask.r;
  float n71  = mask.g;

  // ── Procedural day ─────────────────────────────────────────────────────────
  vec3 oceanDay   = vec3(0.016, 0.068, 0.200);
  vec3 deepOcean  = vec3(0.009, 0.038, 0.120);
  vec3 terrainDay = vec3(0.082, 0.132, 0.044);
  vec3 n71Day     = vec3(0.170, 0.112, 0.018);
  float latY      = normalize(vLocalPos).y;
  float eqFac     = 1.0 - abs(latY) * 0.45;
  vec3  oceanMix  = mix(oceanDay, deepOcean, eqFac * 0.65);
  vec3  procDay   = mix(oceanMix, mix(terrainDay, n71Day, n71), land);
  procDay *= 0.24 + 0.76 * max(0.0, dayFac);

  // Ocean specular highlight
  if (land < 0.3) {
    vec3  H    = normalize(L+V);
    float spec = pow(max(0.0, dot(N,H)), 60.0);
    procDay += vec3(0.14, 0.22, 0.48) * spec * dayBlend;
  }

  // ── Polar ice caps ─────────────────────────────────────────────────────────
  float polarFac = smoothstep(0.80, 0.97, abs(latY));
  procDay = mix(procDay, vec3(0.84, 0.90, 0.96), polarFac * 0.92);

  // ── Procedural night ───────────────────────────────────────────────────────
  vec3 oceanNight = vec3(0.004, 0.010, 0.030);
  vec3 landNight  = vec3(0.007, 0.012, 0.005);
  vec3 cityGlow   = vec3(0.60, 0.38, 0.06);
  vec3 procNight  = mix(oceanNight, landNight + cityGlow * n71 * 0.64, land);
  procNight = mix(procNight, vec3(0.04, 0.06, 0.10), polarFac * 0.80);

  // ── Real-texture overlay ───────────────────────────────────────────────────
  vec3 dayTex   = texture2D(uDay,   vUv).rgb;
  vec3 nightTex = clamp(texture2D(uNight, vUv).rgb * 3.2, 0.0, 1.0);
  vec3 dayColor   = mix(procDay,   dayTex,   uTexBlend);
  vec3 nightColor = mix(procNight, nightTex, uTexBlend);
  vec3 color = mix(nightColor, dayColor, dayBlend);

  // ── Limb glow ──────────────────────────────────────────────────────────────
  float rim = 1.0 - max(0.0, dot(N,V));
  color += vec3(0.020, 0.060, 0.190) * dayBlend * pow(rim, 3.8);

  // ── N71 warm aura ──────────────────────────────────────────────────────────
  color += vec3(0.046, 0.028, 0.002) * n71 * land * dayBlend * (1.0 - pow(rim, 2.0));

  // ── Lat/lon grid (local sphere space — stable through rotation) ─────────────
  const float PI6 = 0.52360;
  vec3 ln    = normalize(vLocalPos);
  float latA = asin(clamp(ln.y,-1.0,1.0));
  float lonA = atan(ln.z, ln.x);
  float latW = min(mod(abs(latA)+0.001,PI6), PI6-mod(abs(latA)+0.001,PI6));
  float lonW = min(mod(abs(lonA)+0.001,PI6), PI6-mod(abs(lonA)+0.001,PI6));
  float grid = max(1.0-smoothstep(0.0,0.012,latW), 1.0-smoothstep(0.0,0.012,lonW));
  color += vec3(0.028, 0.090, 0.220) * grid * (0.045 + 0.065 * dayBlend);

  // A daylight atlas palette keeps the globe readable on a light canvas.
  vec3 atlasOcean = vec3(0.58, 0.74, 0.85);
  vec3 atlasLand = vec3(0.81, 0.85, 0.76);
  vec3 atlas = mix(atlasOcean, atlasLand, land);
  atlas *= 0.72 + 0.28 * max(0.0, dot(N, normalize(vec3(-2.0, 3.0, 5.0))));
  atlas = mix(atlas, vec3(0.95, 0.97, 0.98), polarFac * 0.8);
  atlas -= vec3(0.08, 0.10, 0.11) * grid * 0.28;
  gl_FragColor = vec4(mix(color, atlas, uLightMode), 1.0);
}
`

export const ATMO_VERT = /* glsl */`
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  vNormal  = normalize(normalMatrix*normal);
  vec4 mv  = modelViewMatrix*vec4(position,1.0);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix*mv;
}
`

// Inner Fresnel: tight bright blue halo
export const ATMO_FRAG = /* glsl */`
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  float rim   = pow(1.0 - abs(dot(vNormal,vViewDir)), 2.45);
  vec3  color = vec3(0.18, 0.54, 1.0);
  gl_FragColor = vec4(color * rim * 2.2, rim * 0.70);
}
`

// Outer halo: wide deep-blue glow ("from space" look)
export const OUTER_ATMO_FRAG = /* glsl */`
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  float rim   = pow(1.0 - abs(dot(vNormal,vViewDir)), 1.60);
  vec3  color = vec3(0.09, 0.32, 0.88);
  gl_FragColor = vec4(color * rim * 1.4, rim * 0.25);
}
`
