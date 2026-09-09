import type { AboutContent } from '../content/en'
import { VALUE_ICONS } from '../icons'
import Eyebrow from './Eyebrow'

export default function Values({ c }: { c: AboutContent['values'] }) {
  const values = c.items
  return (
    <section className="bg-navy-dark section-y">
      <div className="container-page">
        <div className="text-center mb-9 sm:mb-14">
          <Eyebrow label={c.eyebrow} center className="mb-4" />
          <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
            {c.title}
          </h2>
        </div>
        {/* 5 cards: at sm/md the last one is centred across both columns; lg shows all 5 in a row */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {values.map((v, i) => (
            <div
              key={v.id}
              className={`rounded-xl p-5 sm:p-6 text-center group transition-all duration-300 ${
                i === values.length - 1
                  ? 'min-[420px]:col-span-2 min-[420px]:max-w-sm min-[420px]:mx-auto min-[420px]:w-full md:col-span-1 md:max-w-none'
                  : ''
              }`}
              style={{
                background: 'var(--fill-1)',
                border: '1px solid var(--line-strong)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `color-mix(in srgb, ${v.color} 19%, transparent)`; e.currentTarget.style.background = 'var(--fill-2)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.background = 'var(--fill-1)' }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 11,
                background: `color-mix(in srgb, ${v.color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${v.color} 16%, transparent)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px', color: v.color,
              }}>
                {VALUE_ICONS[v.id]}
              </div>
              <h3 className="font-display text-[15px] sm:text-base text-white mb-2" style={{ letterSpacing: '-0.01em' }}>{v.title}</h3>
              <p className="text-slate-500 text-[11.5px] sm:text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
