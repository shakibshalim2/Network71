import { useT } from '@/i18n'

const AVATAR = { width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#EC4899,#7C3AED)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 } as const

export default function AIScreen() {
  const { t } = useT()
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0F1117', display: 'flex', flexDirection: 'column', animation: 'screenIn 0.35s ease both' }}>
      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line-strong)' }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#EC4899,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13 }}>✦</div>
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--fg)' }}>{t('ezyify.phone.aiName')}</div>
          <div style={{ fontSize: 8.5, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--accent-teal)' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-teal)' }} />
            {t('ezyify.phone.aiStatus')}
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: 'none', stroke: 'var(--fg-muted)', strokeWidth: 1.6, strokeLinecap: 'round' }}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
        </div>
      </div>
      <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'hidden' }}>
        {/* AI welcome */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
          <div style={AVATAR}>✦</div>
          <div style={{ background: 'var(--line)', borderRadius: '0 10px 10px 10px', padding: '8px 10px', maxWidth: '82%' }}>
            <div style={{ fontSize: 9.5, color: 'var(--fg)', lineHeight: 1.5 }}>{t('ezyify.phone.aiHello')}</div>
          </div>
        </div>
        {/* User message */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)', borderRadius: '10px 10px 0 10px', padding: '8px 10px', maxWidth: '78%' }}>
            <div style={{ fontSize: 9.5, color: '#FFF', lineHeight: 1.5 }}>{t('ezyify.phone.userQuery')}</div>
          </div>
        </div>
        {/* AI product result */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
          <div style={AVATAR}>✦</div>
          <div style={{ flex: 1 }}>
            <div style={{ background: 'var(--line)', borderRadius: '0 10px 10px 10px', padding: '8px 10px', marginBottom: 8 }}>
              <div style={{ fontSize: 9.5, color: 'var(--fg)', lineHeight: 1.5 }}>{t('ezyify.phone.aiFound')}</div>
            </div>
            <div style={{ background: 'var(--line)', border: '1px solid var(--line-strong)', borderRadius: 10, padding: '9px 10px', display: 'flex', gap: 9, alignItems: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: 'linear-gradient(135deg,#0ea5e9,#22D3EE)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--fg)', marginBottom: 2 }}>{t('ezyify.phone.shoe')}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: 3 }}>{t('ezyify.phone.shoePrice')}</div>
                <div style={{ display: 'flex', gap: 1 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 8, color: 'var(--accent-amber)' }}>★</span>)}
                  <span style={{ fontSize: 7.5, color: 'var(--fg-subtle)', marginLeft: 3 }}>{t('ezyify.phone.shoeReviews')}</span>
                </div>
              </div>
              <div style={{ padding: '5px 9px', borderRadius: 14, background: 'linear-gradient(135deg,#7C3AED,#EC4899)', fontSize: 8.5, color: '#FFF', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>{t('ezyify.phone.add')}</div>
            </div>
          </div>
        </div>
        {/* Typing indicator */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
          <div style={AVATAR}>✦</div>
          <div style={{ background: 'var(--line)', borderRadius: '0 10px 10px 10px', padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
            {[0, 0.18, 0.36].map((d, i) => (
              <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(168,85,247,0.7)', animation: `pulse-slow 1s ${d}s ease-in-out infinite` }} />
            ))}
          </div>
        </div>
      </div>
      {/* Input bar */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid var(--line-strong)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1, background: 'var(--line)', borderRadius: 20, padding: '7px 12px', fontSize: 9, color: 'var(--fg-muted)' }}>{t('ezyify.phone.askAnything')}</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: '#FFF' }}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
        </div>
      </div>
    </div>
  )
}
