import { useT } from '@/i18n'
import ScaledPhone from './PhoneMockup'
import type { TabId } from './data'

export default function PhoneStage({ tabId, color }: { tabId: TabId, color: string }) {
  const { t } = useT()
  return (
    <div className="force-dark phone-ui flex justify-center items-center relative py-6 sm:py-12">
      {/* Ambient glow tied to active tab */}
      <div className="w-[240px] h-[240px] sm:w-[340px] sm:h-[340px]" style={{ position: 'absolute', borderRadius: '50%', background: `color-mix(in srgb, ${color} 7%, transparent)`, filter: 'blur(72px)', transition: 'background 0.5s', pointerEvents: 'none' }} />

      {/* Floating notification badge — kept inside bounds on small screens */}
      <div
        className="left-0 sm:-left-[4%] px-2.5 py-1.5 sm:px-3 sm:py-2"
        style={{ position: 'absolute', top: '6%', borderRadius: 13, background: 'rgba(9,9,18,0.92)', border: '1px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(14px)', boxShadow: 'var(--shadow-device)', animation: 'floatY 4s ease-in-out infinite', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="w-6 h-6 sm:w-7 sm:h-7 text-[11px] sm:text-[13px]" style={{ borderRadius: 8, background: 'linear-gradient(135deg,#A855F7,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🛍️</div>
          <div>
            <div className="text-[8.5px] sm:text-[9.5px]" style={{ fontWeight: 700, color: 'var(--fg)' }}>{t('ezyify.float.newOrder')}</div>
            <div className="text-[7px] sm:text-[8px]" style={{ color: 'var(--fg-subtle)' }}>{t('ezyify.float.orderItem')}</div>
          </div>
        </div>
      </div>

      {/* Floating AI badge */}
      <div
        className="right-0 sm:-right-[4%] px-2.5 py-1.5 sm:px-3 sm:py-2"
        style={{ position: 'absolute', bottom: '8%', borderRadius: 13, background: 'rgba(9,9,18,0.92)', border: '1px solid rgba(236,72,153,0.25)', backdropFilter: 'blur(14px)', boxShadow: 'var(--shadow-device)', animation: 'floatY 4s ease-in-out infinite', animationDelay: '2s', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="w-6 h-6 sm:w-7 sm:h-7 text-[11px] sm:text-[13px]" style={{ borderRadius: 8, background: 'linear-gradient(135deg,#EC4899,#f43f5e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✦</div>
          <div>
            <div className="text-[8.5px] sm:text-[9.5px]" style={{ fontWeight: 700, color: 'var(--fg)' }}>{t('ezyify.float.aiSuggestion')}</div>
            <div className="text-[7px] sm:text-[8px]" style={{ color: 'var(--accent-pink)' }}>{t('ezyify.float.match')}</div>
          </div>
        </div>
      </div>

      <ScaledPhone tabId={tabId} color={color} />
    </div>
  )
}
