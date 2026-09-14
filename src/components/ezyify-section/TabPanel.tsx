import { Link } from 'react-router-dom'
import { useT } from '@/i18n'
import { TAB_IDS, TAB_COLOR, FEATURE_KEYS, tabKey, type TabId } from './data'

type Props = { tabIdx: number, onSelect: (i: number) => void }

export default function TabPanel({ tabIdx, onSelect }: Props) {
  const { t } = useT()
  const currentId: TabId = TAB_IDS[tabIdx]
  const currentColor = TAB_COLOR[currentId]

  return (
    <div>
      <h2
        className="font-display leading-none mb-3 sm:mb-4"
        style={{ fontSize: 'clamp(52px, 13vw, 100px)', background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 55%, #22D3EE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
      >
        Ezyify
      </h2>
      <p className="text-[16px] sm:text-[18px] font-light tracking-wide mb-7 sm:mb-10 leading-relaxed" style={{ maxWidth: 420, color: 'var(--fg-muted)' }}>
        {t('ezyify.tagline')}
      </p>

      {/* Tab switcher */}
      <div className="flex flex-col gap-2 mb-7 sm:mb-8">
        {TAB_IDS.map((id, i) => {
          const color = TAB_COLOR[id]
          return (
            <button
              key={id}
              onClick={() => onSelect(i)}
              className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl text-left w-full transition-all duration-300"
              style={{ background: i === tabIdx ? `color-mix(in srgb, ${color} 6%, transparent)` : 'transparent', border: `1px solid ${i === tabIdx ? `color-mix(in srgb, ${color} 21%, transparent)` : 'var(--line)'}` }}
            >
              <div className="h-8 sm:h-[34px]" style={{ width: 3, borderRadius: 2, background: i === tabIdx ? color : 'var(--line-strong)', flexShrink: 0, transition: 'background 0.3s' }} />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[15px] font-semibold mb-1 transition-colors duration-300" style={{ color: i === tabIdx ? 'var(--fg-strong)' : 'var(--fg-muted)' }}>
                  {t(tabKey(id, 'label'))}
                </div>
                <div className="text-[13px] leading-snug transition-colors duration-300" style={{ color: i === tabIdx ? 'var(--fg-muted)' : 'var(--fg-subtle)' }}>
                  {t(tabKey(id, 'desc'))}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Feature bullets */}
      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-y-2 gap-x-4 mb-8 sm:mb-10">
        {FEATURE_KEYS.map(f => (
          <div key={f} className="flex items-center gap-2.5">
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: currentColor, flexShrink: 0 }} />
            <span style={{ fontSize: 13.5, color: 'var(--fg-muted)' }}>{t(tabKey(currentId, f))}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/ezyify"
          className="group btn w-full min-[400px]:w-auto text-white hover:-translate-y-px hover:brightness-110"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', boxShadow: '0 0 32px rgba(124,58,237,0.28)' }}
        >
          {t('ezyify.cta')}
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
      <p className="font-mono text-[11px] tracking-wide mt-5" style={{ color: 'var(--fg-subtle)' }}>{t('ezyify.partOf')}</p>
    </div>
  )
}
