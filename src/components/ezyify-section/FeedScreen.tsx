import { useT } from '@/i18n'

const STORIES = [
  { key: 'ezyify.phone.story1', g: 'linear-gradient(135deg,#f43f5e,#ec4899)', border: 'var(--accent-pink)' },
  { key: 'ezyify.phone.story2', g: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', border: '#8b5cf6' },
  { key: 'ezyify.phone.story3', g: 'linear-gradient(135deg,#f97316,#f59e0b)', border: 'var(--accent-orange)' },
  { key: 'ezyify.phone.story4', g: 'linear-gradient(135deg,#22c55e,#0d9488)', border: 'var(--accent-green)' },
] as const

const FEED_TABS = ['ezyify.phone.forYou', 'ezyify.phone.following', 'ezyify.phone.live'] as const

export default function FeedScreen() {
  const { t } = useT()
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0F1117', animation: 'screenIn 0.35s ease both' }}>
      {/* App header */}
      <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line-strong)' }}>
        <span style={{ fontWeight: 900, fontSize: 15, background: 'linear-gradient(135deg, #A855F7, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>
          Ezyify
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'none', stroke: 'var(--fg-muted)', strokeWidth: 1.8, strokeLinecap: 'round' }}>
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <div style={{ position: 'relative' }}>
            <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'none', stroke: 'var(--fg-muted)', strokeWidth: 1.8, strokeLinecap: 'round' }}>
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <div style={{ position: 'absolute', top: -2, right: -2, width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-red)' }} />
          </div>
        </div>
      </div>
      {/* Feed tabs */}
      <div style={{ display: 'flex', padding: '0 16px', borderBottom: '1px solid var(--line-strong)' }}>
        {FEED_TABS.map((k, i) => (
          <div key={k} style={{ padding: '7px 0', marginRight: 14, fontSize: 10, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? 'var(--fg-strong)' : 'var(--fg-muted)', borderBottom: i === 0 ? '2px solid #A855F7' : '2px solid transparent', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
            {t(k)}
            {i === 2 && <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-red)' }} />}
          </div>
        ))}
      </div>
      {/* Stories */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 16px', overflowX: 'hidden' }}>
        {STORIES.map(s => (
          <div key={s.key} style={{ flexShrink: 0, textAlign: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: s.g, border: `2px solid ${s.border}`, marginBottom: 4, boxSizing: 'border-box' }} />
            <div style={{ fontSize: 7.5, color: 'var(--fg-subtle)', width: 38, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t(s.key)}</div>
          </div>
        ))}
      </div>
      {/* Product post */}
      <div style={{ padding: '0 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#A855F7,#EC4899)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--fg)', display: 'flex', alignItems: 'center', gap: 3 }}>
              fashionbylayla
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 10 10" style={{ width: 6, height: 6, fill: 'none', stroke: '#FFF', strokeWidth: 1.8 }}><path d="M2 5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div style={{ fontSize: 8, color: 'var(--fg-subtle)' }}>{t('ezyify.phone.postMeta')}</div>
          </div>
          <div style={{ padding: '3px 8px', borderRadius: 20, background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.28)', fontSize: 8.5, color: 'var(--accent-purple)', fontWeight: 600 }}>{t('ezyify.phone.follow')}</div>
        </div>
        {/* Product image block */}
        <div style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 10, position: 'relative', height: 120 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#1a0533 0%,#2d1b69 35%,#1e0a40 65%,#090818 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '55%', height: '78%', background: 'linear-gradient(180deg,rgba(236,72,153,0.28) 0%,rgba(168,85,247,0.52) 100%)', borderRadius: '50% 50% 0 0' }} />
          <div style={{ position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)', width: 48, height: 48, borderRadius: '50%', background: 'rgba(168,85,247,0.14)', filter: 'blur(10px)' }} />
          <div style={{ position: 'absolute', top: 8, right: 8, padding: '3px 7px', borderRadius: 6, background: 'rgba(0,0,0,0.78)', border: '1px solid var(--line-strong)', fontSize: 10.5, fontWeight: 700, color: '#FFF' }}>$49.99</div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.9) 0%,transparent 100%)', padding: '16px 10px 8px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#FFF' }}>{t('ezyify.phone.gown')}</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>{t('ezyify.phone.soldToday')}</div>
            </div>
            <div style={{ padding: '5px 10px', borderRadius: 16, background: 'linear-gradient(135deg,#7C3AED,#EC4899)', fontSize: 8.5, fontWeight: 600, color: '#FFF' }}>{t('ezyify.phone.shop')}</div>
          </div>
        </div>
        {/* Interactions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'var(--accent-red)' }}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
            <span style={{ fontSize: 9, color: 'var(--fg-muted)' }}>{t('ezyify.phone.likes')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'none', stroke: 'var(--fg-muted)', strokeWidth: 1.6 }}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 9, color: 'var(--fg-muted)' }}>{t('ezyify.phone.comments')}</span>
          </div>
          <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'none', stroke: 'var(--fg-muted)', strokeWidth: 1.6, strokeLinecap: 'round' }}>
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
          </svg>
          <div style={{ marginLeft: 'auto' }}>
            <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'none', stroke: 'var(--fg-muted)', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
          </div>
        </div>
      </div>
    </div>
  )
}
