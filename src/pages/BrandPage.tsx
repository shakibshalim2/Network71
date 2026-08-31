import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Logo from '@/components/brand/Logo'
import type { LogoVariant } from '@/components/brand/Logo'

// ── Shared primitives ─────────────────────────────────────────────────────────

function SectionHead({ n, title, sub }: { n: string; title: string; sub?: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-[9px] tracking-[0.35em] text-slate-700 uppercase">{n}</span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </div>
      <h2 className="text-white font-semibold text-xl tracking-[-0.01em]">{title}</h2>
      {sub && <p className="text-slate-500 text-sm mt-1 max-w-xl">{sub}</p>}
    </div>
  )
}

/** Display the logo centred on a coloured tile */
function Tile({
  children,
  bg,
  label,
  sub,
  border,
  padY = 44,
}: {
  children: React.ReactNode
  bg: string
  label: string
  sub?: string
  border?: string
  padY?: number
}) {
  return (
    <div className="rounded-xl overflow-hidden flex flex-col" style={{ border: border || '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-center px-8 flex-1"
        style={{ background: bg, paddingTop: padY, paddingBottom: padY, minHeight: 120 }}>
        {children}
      </div>
      <div className="px-5 py-3" style={{ background: '#0C1422', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-white text-[13px] font-medium">{label}</p>
        {sub && <p className="font-mono text-[9px] tracking-[0.18em] text-slate-600 uppercase mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

/** Primary/on-dark wrapper: original logo on white backing */
function LogoOnDark({ height = 36 }: { height?: number }) {
  return (
    <span style={{
      background: '#FFFFFF',
      borderRadius: 5,
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 12px',
      lineHeight: 0,
    }}>
      <Logo variant="primary" height={height} />
    </span>
  )
}

/** Logo variant tile shorthand */
function VariantTile({
  variant,
  bg,
  label,
  sub,
  h = 44,
  border,
}: {
  variant: LogoVariant
  bg: string
  label: string
  sub?: string
  h?: number
  border?: string
}) {
  return (
    <Tile bg={bg} label={label} sub={sub} border={border}>
      <Logo variant={variant} height={h} />
    </Tile>
  )
}

function Swatch({ name, hex, note, light }: { name: string; hex: string; note: string; light?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="h-24 flex items-end p-3"
        style={{ background: hex, border: light ? '1px solid rgba(0,0,0,0.08)' : undefined }}>
        <span className="font-mono text-[9px] tracking-[0.18em]"
          style={{ color: light ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.55)' }}>
          {hex}
        </span>
      </div>
      <div className="px-4 py-3" style={{ background: '#0C1422' }}>
        <p className="text-white text-sm font-medium mb-0.5">{name}</p>
        <p className="text-slate-500 text-[11px] leading-relaxed">{note}</p>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BrandPage() {
  return (
    <div style={{ background: '#040810', minHeight: '100vh' }}>
      <Header />

      <main className="pt-28 pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <div className="mb-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#D42424', opacity: 0.5 }} />
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase"
                style={{ color: '#D42424', opacity: 0.8 }}>Brand Identity</span>
            </div>
            <h1 className="font-display text-5xl lg:text-6xl text-white tracking-[-0.02em] mb-5 leading-[1.05]">
              Network71<br />
              <em className="italic text-slate-500">Logo System</em>
            </h1>
            <p className="text-slate-400 text-[16px] leading-relaxed max-w-lg">
              All variants are rendered directly from the original uploaded source files.
              No typography substitution, no symbol redraws, no colour modification.
              Exact pixel-accurate crop of the master artwork.
            </p>
          </div>

          {/* ── 01 Primary (original artwork, light bg) ───────────────────── */}
          <section className="mb-20">
            <SectionHead n="01" title="Primary Logo"
              sub="The exact uploaded logo — black wordmark, red badge. Use on white or very light backgrounds." />
            <div className="grid md:grid-cols-2 gap-4">
              <Tile bg="#FFFFFF" label="Primary · White" sub="Standard digital / print" border="1px solid rgba(0,0,0,0.07)" padY={48}>
                <Logo variant="primary" height={56} />
              </Tile>
              <Tile bg="#F2F2F2" label="Primary · Light Grey" sub="Acceptable on surfaces ≤ 15% grey" border="1px solid rgba(0,0,0,0.05)" padY={48}>
                <Logo variant="primary" height={56} />
              </Tile>
            </div>
          </section>

          {/* ── 02 Transparent ────────────────────────────────────────────── */}
          <section className="mb-20">
            <SectionHead n="02" title="Transparent Version"
              sub="Original artwork on the genuine RGBA transparent background. No background padding — floats cleanly on any surface." />
            <div className="grid md:grid-cols-2 gap-4">
              <Tile bg="rgb(224,224,224)" label="Transparent · Checker" sub="Alpha channel confirmed — no white fill" padY={40}
                border="1px solid rgba(0,0,0,0.06)"
              >
                {/* Checkerboard background to show transparency */}
                <div style={{
                  background: 'linear-gradient(45deg,#bbb 25%,transparent 25%),linear-gradient(-45deg,#bbb 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#bbb 75%),linear-gradient(-45deg,transparent 75%,#bbb 75%)',
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0,0 8px,8px -8px,-8px 0',
                  backgroundColor: '#e0e0e0',
                  padding: '12px 16px',
                  borderRadius: 4,
                }}>
                  <Logo variant="primary" height={52} />
                </div>
              </Tile>
              <Tile bg="rgba(200,150,42,0.14)" label="Transparent · Coloured field"
                sub="Transparent PNG floats naturally over brand gold tint" padY={48}>
                <Logo variant="primary" height={52} />
              </Tile>
            </div>
          </section>

          {/* ── 03 On dark backgrounds — original logo in white backing ────── */}
          <section className="mb-20">
            <SectionHead n="03" title="Dark Background Usage"
              sub="The original black+red logo placed on a white backing so its exact colours are preserved unchanged on dark surfaces. No colour alteration." />
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { bg: '#000000', label: 'Black background' },
                { bg: '#040810', label: 'Brand navy' },
                { bg: '#1A1A2E', label: 'Deep surface' },
              ].map(({ bg, label }) => (
                <Tile key={label} bg={bg} label={`Original logo · ${label}`}
                  sub="White backing — unaltered logo colours" padY={36}>
                  <LogoOnDark height={32} />
                </Tile>
              ))}
            </div>
            <p className="mt-5 text-slate-600 text-[12px] leading-relaxed font-mono">
              NOTE — The uploaded master is a black-wordmark logo. For permanent reproduction on dark surfaces,
              request a white-wordmark variant from the brand team. The white-backing treatment above is the
              approved interim standard.
            </p>
          </section>

          {/* ── 04 Monochrome ─────────────────────────────────────────────── */}
          <section className="mb-20">
            <SectionHead n="04" title="Monochrome"
              sub="Silhouette versions for letterpress, engraving, foil stamp, and single-colour reproduction. The only approved colour modification." />
            <div className="grid md:grid-cols-2 gap-4">
              <VariantTile variant="mono-black" bg="#FFFFFF" label="Mono Black"
                sub="Single-colour dark printing" border="1px solid rgba(0,0,0,0.07)" h={52} />
              <VariantTile variant="mono-white" bg="#111111" label="Mono White"
                sub="Single-colour reversed / foil stamp" h={52} />
            </div>
          </section>

          {/* ── 05 Icon mark ──────────────────────────────────────────────── */}
          <section className="mb-20">
            <SectionHead n="05" title="Icon Mark — The 71 Badge"
              sub="Standalone badge mark from the original uploaded image. Pixel-accurate crop of the source artwork." />

            <div className="flex flex-wrap gap-10 items-end mb-10">
              {/* Hero size */}
              <div className="flex items-center justify-center rounded-2xl"
                style={{ background: '#FFFFFF', width: 180, height: 180, border: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
                <Logo variant="icon" height={124} />
              </div>

              {/* Scale ladder */}
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] text-slate-700 uppercase mb-5">Scale</p>
                <div className="flex items-end gap-4 flex-wrap">
                  {[96, 72, 48, 32, 24, 16].map(s => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center rounded-xl"
                        style={{ background: '#FFFFFF', width: s + 20, height: s + 20, border: '1px solid rgba(0,0,0,0.06)' }}>
                        <Logo variant="icon" height={s} />
                      </div>
                      <span className="font-mono text-[9px] text-slate-700">{s}px</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Icon variant tiles */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <VariantTile variant="icon" bg="#FFFFFF" label="Full colour · Light" sub="Primary icon usage" h={64} border="1px solid rgba(0,0,0,0.07)" />
              <VariantTile variant="icon" bg="#F5F5F5" label="Full colour · Grey" sub="Light tinted surface" h={64} border="1px solid rgba(0,0,0,0.05)" />
              <VariantTile variant="icon" bg="#040810" label="Full colour · Dark" sub="Red survives on dark bg" h={64} />
              <VariantTile variant="icon-black" bg="#FFFFFF" label="Mono Black icon" sub="Single-colour dark" h={64} border="1px solid rgba(0,0,0,0.07)" />
              <VariantTile variant="icon-white" bg="#111111" label="Mono White icon" sub="Single-colour light" h={64} />
              <VariantTile variant="icon-white" bg="#D42424" label="White icon · Red field" sub="On brand primary colour" h={64} />
            </div>
          </section>

          {/* ── 06 Favicon ────────────────────────────────────────────────── */}
          <section className="mb-20">
            <SectionHead n="06" title="Favicon & App Icon"
              sub="71 badge at standard digital icon sizes. Minimum legible size: 16×16." />
            <div className="flex flex-wrap gap-8 items-end">
              {[
                { s: 128, label: '128 × 128', note: 'App store / Play store' },
                { s: 64,  label: '64 × 64',   note: 'Hi-DPI browser favicon' },
                { s: 32,  label: '32 × 32',   note: 'Standard favicon' },
                { s: 16,  label: '16 × 16',   note: 'Browser tab' },
              ].map(({ s, label, note }) => (
                <div key={s} className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center rounded-2xl"
                    style={{ background: '#FFFFFF', width: s + 28, height: s + 28, border: '1px solid rgba(0,0,0,0.06)' }}>
                    <Logo variant="icon" height={s} />
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-[10px] text-white font-medium">{label}</p>
                    <p className="font-mono text-[9px] text-slate-600">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 07 Brand colours ──────────────────────────────────────────── */}
          <section className="mb-20">
            <SectionHead n="07" title="Brand Colour Palette"
              sub="Colours observed directly from the uploaded master artwork. Only these values are authorised." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Swatch name="Brand Red" hex="#D42424" note="71 badge — the logo's primary identity colour. Never approximate." />
              <Swatch name="Wordmark Black" hex="#0A0A0A" note="'Network' wordmark on light backgrounds." />
              <Swatch name="Numeral Dark" hex="#0D1117" note="71 numerals inside the red badge only." />
              <Swatch name="White" hex="#FFFFFF" light note="Used for reversed/foil applications and the dark-bg white backing." />
            </div>
          </section>

          {/* ── 08 Usage ──────────────────────────────────────────────────── */}
          <section className="mb-20">
            <SectionHead n="08" title="Usage Rules" />
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-xl p-6" style={{ background: '#070F1C', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-slate-600 mb-5">Clear Space</p>
                <div className="flex items-center justify-center py-6">
                  <div className="relative p-8" style={{ border: '1px dashed rgba(212,36,36,0.35)', borderRadius: 2 }}>
                    <Logo variant="primary" height={44} />
                  </div>
                </div>
                <p className="text-slate-500 text-[13px] leading-relaxed mt-2">
                  Minimum clear space: equal to the cap-height of the "N" glyph on all four sides.
                  No other elements enter this exclusion zone.
                </p>
              </div>
              <div className="rounded-xl p-6" style={{ background: '#070F1C', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-slate-600 mb-5">Never Do</p>
                <ul className="space-y-2.5">
                  {[
                    'Recolour the badge to any colour other than the original red',
                    'Stretch, skew, rotate or distort any element',
                    'Apply gradients, outlines, glows or drop-shadows to the logo',
                    'Replace the wordmark typeface',
                    'Use the icon mark below 16px rendered height',
                    'Reproduce the red badge from memory — use source files only',
                    'Place the primary logo directly on photography without a clear field or white backing',
                  ].map(r => (
                    <li key={r} className="flex items-start gap-3">
                      <span className="text-red-500/60 leading-none flex-shrink-0 mt-px text-base">×</span>
                      <span className="text-slate-400 text-[13px]">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Footer mark ────────────────────────────────────────────────── */}
          <div className="pt-10 flex flex-col sm:flex-row sm:items-center gap-5 justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{
              background: '#FFFFFF', borderRadius: 4,
              display: 'inline-flex', alignItems: 'center',
              padding: '5px 10px', lineHeight: 0,
            }}>
              <Logo variant="primary" height={24} />
            </span>
            <p className="font-mono text-[9px] tracking-[0.25em] text-slate-700 uppercase">
              Brand Identity System · Network71 Ltd · 2026
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
