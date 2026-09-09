import { useT } from '@/i18n'

const BARS = [65, 82, 48, 90, 75, 88, 70]
const DAYS = ['M','T','W','T','F','S','S']

const KPIS = [
  { val: 'ezyify.phone.followersVal', label: 'ezyify.phone.followers', color: 'var(--accent-purple)' },
  { val: 'ezyify.phone.salesVal', label: 'ezyify.phone.sales', color: 'var(--accent-pink)' },
  { val: 'ezyify.phone.revenueVal', label: 'ezyify.phone.revenue', color: 'var(--accent-amber)' },
] as const

const TOP_PRODUCTS = [
  { name: 'ezyify.phone.gown', sales: 142, g: 'linear-gradient(135deg,#EC4899,#A855F7)' },
  { name: 'ezyify.phone.sundress', sales: 89, g: 'linear-gradient(135deg,#F59E0B,#EC4899)' },
] as const

export default function CreatorScreen() {
  const { t } = useT()
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0F1117', display: 'flex', flexDirection: 'column', animation: 'screenIn 0.35s ease both' }}>
      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line-strong)' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#F59E0B,#EC4899)', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg)' }}>{t('ezyify.phone.creatorTitle')}</div>
          <div style={{ fontSize: 8, color: 'var(--fg-subtle)' }}>{t('ezyify.phone.creatorSub')}</div>
        </div>
        <div style={{ marginLeft: 'auto', padding: '3px 8px', borderRadius: 20, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.28)', fontSize: 8, color: 'var(--accent-amber)', fontWeight: 600 }}>PRO</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid var(--line-strong)', flexShrink: 0 }}>
        {KPIS.map((s, i) => (
          <div key={s.label} style={{ padding: '10px 0', textAlign: 'center', background: 'var(--fill-1)', borderRight: i < 2 ? '1px solid var(--line-strong)' : 'none' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 3 }}>{t(s.val)}</div>
            <div style={{ fontSize: 7.5, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t(s.label)}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-strong)', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--fg)' }}>{t('ezyify.phone.weeklySales')}</span>
          <span style={{ fontSize: 8, color: 'var(--accent-amber)' }}>{t('ezyify.phone.vsLastWeek')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 50 }}>
          {BARS.map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === 3 ? 'linear-gradient(180deg,#F59E0B,#EC4899)' : 'rgba(168,85,247,0.22)' }} />
          ))}
        </div>
        <div style={{ display: 'flex', marginTop: 4 }}>
          {DAYS.map((d, i) => (
            <span key={i} style={{ fontSize: 7.5, color: 'var(--fg-subtle)', flex: 1, textAlign: 'center' }}>{d}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 16px', flex: 1 }}>
        <div style={{ fontSize: 8.5, color: 'var(--fg-subtle)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('ezyify.phone.topProducts')}</div>
        {TOP_PRODUCTS.map(p => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, background: 'var(--line)', borderRadius: 8, padding: '7px 8px' }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: p.g, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t(p.name)}</div>
              <div style={{ fontSize: 8, color: 'var(--fg-subtle)' }}>{t('ezyify.phone.salesThisWeek', { n: p.sales })}</div>
            </div>
            <div style={{ fontSize: 8.5, color: 'var(--accent-teal)', fontWeight: 700, flexShrink: 0 }}>{t('ezyify.phone.growth')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
