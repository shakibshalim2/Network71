import { useT } from '@/i18n'

const PRODUCTS = [
  { name: 'ezyify.phone.p1', price: 'ezyify.phone.p1Price', g: 'linear-gradient(135deg,#7C3AED,#A855F7)' },
  { name: 'ezyify.phone.p2', price: 'ezyify.phone.p2Price', g: 'linear-gradient(135deg,#0ea5e9,#22D3EE)' },
  { name: 'ezyify.phone.p3', price: 'ezyify.phone.p3Price', g: 'linear-gradient(135deg,#EC4899,#f43f5e)' },
  { name: 'ezyify.phone.p4', price: 'ezyify.phone.p4Price', g: 'linear-gradient(135deg,#0D9488,#22c55e)' },
] as const

const CATEGORIES = ['ezyify.phone.cat.all', 'ezyify.phone.cat.fashion', 'ezyify.phone.cat.tech', 'ezyify.phone.cat.sports', 'ezyify.phone.cat.beauty'] as const

export default function DiscoveryScreen() {
  const { t } = useT()
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0F1117', display: 'flex', flexDirection: 'column', animation: 'screenIn 0.35s ease both' }}>
      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--line-strong)', flexShrink: 0 }}>
        <div style={{ background: 'var(--line-strong)', borderRadius: 22, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: 'none', stroke: 'var(--fg-muted)', strokeWidth: 2, flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          <span style={{ fontSize: 9.5, color: 'var(--fg-muted)' }}>{t('ezyify.phone.searchPh')}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '10px 14px', overflowX: 'hidden', flexShrink: 0 }}>
        {CATEGORIES.map((c, i) => (
          <div key={c} style={{ padding: '4px 10px', borderRadius: 20, fontSize: 9, fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap', background: i === 0 ? 'linear-gradient(135deg,#7C3AED,#EC4899)' : 'var(--line-strong)', color: i === 0 ? '#FFF' : 'var(--fg-muted)', border: i === 0 ? 'none' : '1px solid var(--line-strong)' }}>{t(c)}</div>
        ))}
      </div>
      <div style={{ padding: '2px 14px 8px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 8, fontWeight: 700, color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('ezyify.phone.trending')}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '0 14px', flex: 1, alignContent: 'start' }}>
        {PRODUCTS.map(p => (
          <div key={p.name} style={{ borderRadius: 10, overflow: 'hidden', background: 'var(--line)', border: '1px solid var(--line-strong)' }}>
            <div style={{ height: 62, background: p.g, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" style={{ width: 11, height: 11, fill: 'none', stroke: '#FFF', strokeWidth: 1.8 }}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div style={{ padding: '7px 9px' }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--fg)', marginBottom: 2 }}>{t(p.name)}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent-cyan)' }}>{t(p.price)}</span>
                <div style={{ display: 'flex', gap: 1 }}>
                  {[1,2,3,4].map(s => <span key={s} style={{ fontSize: 7, color: 'var(--accent-amber)' }}>★</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
