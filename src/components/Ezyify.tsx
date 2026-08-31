import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ─── Tab data ─────────────────────────────────────────────────────────────────

const TABS = [
  {
    id: 'feed' as const,
    label: 'Social Feed',
    color: '#A855F7',
    desc: 'Personalized shoppable posts powered by real-time behavioral machine learning',
    features: ['AI-curated For You feed', 'Shoppable video posts', 'Creator storefronts', 'Live social proof'],
  },
  {
    id: 'ai' as const,
    label: 'AI Shopping',
    color: '#EC4899',
    desc: 'Conversational AI guiding customers from discovery to checkout in natural dialogue',
    features: ['Natural language search', 'Smart recommendations', 'Cart & checkout via chat', 'Style profiling'],
  },
  {
    id: 'discovery' as const,
    label: 'Discovery',
    color: '#22D3EE',
    desc: 'Smart product discovery powered by computer vision and behavioral signals',
    features: ['Visual similarity search', 'Trending & curated picks', 'Category exploration', 'Price comparison'],
  },
  {
    id: 'creator' as const,
    label: 'Creator Hub',
    color: '#F59E0B',
    desc: 'End-to-end monetization tools for creators to build audiences and sell at scale',
    features: ['Sales analytics dashboard', 'Performance metrics', 'Audience demographics', 'Commission tracking'],
  },
]

type TabId = typeof TABS[number]['id']

// ─── Phone screen content ─────────────────────────────────────────────────────

function FeedContent() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0F1117', animation: 'screenIn 0.35s ease both' }}>
      {/* App header */}
      <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ fontWeight: 900, fontSize: 15, background: 'linear-gradient(135deg, #A855F7, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>
          Ezyify
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'none', stroke: 'rgba(148,163,184,0.5)', strokeWidth: 1.8, strokeLinecap: 'round' }}>
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <div style={{ position: 'relative' }}>
            <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'none', stroke: 'rgba(148,163,184,0.5)', strokeWidth: 1.8, strokeLinecap: 'round' }}>
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <div style={{ position: 'absolute', top: -2, right: -2, width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />
          </div>
        </div>
      </div>
      {/* Feed tabs */}
      <div style={{ display: 'flex', padding: '0 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {['For You', 'Following', 'Live'].map((t, i) => (
          <div key={t} style={{ padding: '7px 0', marginRight: 14, fontSize: 10, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#FFFFFF' : 'rgba(148,163,184,0.38)', borderBottom: i === 0 ? '2px solid #A855F7' : '2px solid transparent', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
            {t}
            {i === 2 && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#EF4444' }} />}
          </div>
        ))}
      </div>
      {/* Stories */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 16px', overflowX: 'hidden' }}>
        {[
          { name: 'Aisha', g: 'linear-gradient(135deg,#f43f5e,#ec4899)', border: '#ec4899' },
          { name: 'Kai', g: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', border: '#8b5cf6' },
          { name: 'Zara', g: 'linear-gradient(135deg,#f97316,#f59e0b)', border: '#f97316' },
          { name: 'Neo', g: 'linear-gradient(135deg,#22c55e,#0d9488)', border: '#22c55e' },
        ].map(s => (
          <div key={s.name} style={{ flexShrink: 0, textAlign: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: s.g, border: `2px solid ${s.border}`, marginBottom: 4, boxSizing: 'border-box' }} />
            <div style={{ fontSize: 7.5, color: 'rgba(100,116,139,0.6)', width: 38, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
          </div>
        ))}
      </div>
      {/* Product post */}
      <div style={{ padding: '0 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#A855F7,#EC4899)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: 3 }}>
              fashionbylayla
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 10 10" style={{ width: 6, height: 6, fill: 'none', stroke: '#FFF', strokeWidth: 1.8 }}><path d="M2 5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div style={{ fontSize: 8, color: 'rgba(100,116,139,0.6)' }}>Dubai, UAE · 2h</div>
          </div>
          <div style={{ padding: '3px 8px', borderRadius: 20, background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.28)', fontSize: 8.5, color: '#A855F7', fontWeight: 600 }}>Follow</div>
        </div>
        {/* Product image block */}
        <div style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 10, position: 'relative', height: 120 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#1a0533 0%,#2d1b69 35%,#1e0a40 65%,#090818 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '55%', height: '78%', background: 'linear-gradient(180deg,rgba(236,72,153,0.28) 0%,rgba(168,85,247,0.52) 100%)', borderRadius: '50% 50% 0 0' }} />
          <div style={{ position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)', width: 48, height: 48, borderRadius: '50%', background: 'rgba(168,85,247,0.14)', filter: 'blur(10px)' }} />
          <div style={{ position: 'absolute', top: 8, right: 8, padding: '3px 7px', borderRadius: 6, background: 'rgba(0,0,0,0.78)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 10.5, fontWeight: 700, color: '#FFF' }}>$49.99</div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.9) 0%,transparent 100%)', padding: '16px 10px 8px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#FFF' }}>Velvet Evening Gown</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>142 sold today</div>
            </div>
            <div style={{ padding: '5px 10px', borderRadius: 16, background: 'linear-gradient(135deg,#7C3AED,#EC4899)', fontSize: 8.5, fontWeight: 600, color: '#FFF' }}>Shop</div>
          </div>
        </div>
        {/* Interactions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: '#EF4444' }}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
            <span style={{ fontSize: 9, color: 'rgba(148,163,184,0.5)' }}>2.4k</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'none', stroke: 'rgba(148,163,184,0.4)', strokeWidth: 1.6 }}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 9, color: 'rgba(148,163,184,0.5)' }}>89</span>
          </div>
          <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'none', stroke: 'rgba(148,163,184,0.4)', strokeWidth: 1.6, strokeLinecap: 'round' }}>
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
          </svg>
          <div style={{ marginLeft: 'auto' }}>
            <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'none', stroke: 'rgba(148,163,184,0.4)', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

function AIContent() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0F1117', display: 'flex', flexDirection: 'column', animation: 'screenIn 0.35s ease both' }}>
      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#EC4899,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13 }}>✦</div>
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: '#E2E8F0' }}>Ezyify AI</div>
          <div style={{ fontSize: 8.5, display: 'flex', alignItems: 'center', gap: 4, color: '#0D9488' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#0D9488' }} />
            Shopping Assistant · Online
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: 'none', stroke: 'rgba(148,163,184,0.4)', strokeWidth: 1.6, strokeLinecap: 'round' }}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
        </div>
      </div>
      <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'hidden' }}>
        {/* AI welcome */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#EC4899,#7C3AED)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>✦</div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '0 10px 10px 10px', padding: '8px 10px', maxWidth: '82%' }}>
            <div style={{ fontSize: 9.5, color: '#CBD5E1', lineHeight: 1.5 }}>Hello! I'm your AI Shopping Assistant. What are you looking for today? 🛍️</div>
          </div>
        </div>
        {/* User message */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)', borderRadius: '10px 10px 0 10px', padding: '8px 10px', maxWidth: '78%' }}>
            <div style={{ fontSize: 9.5, color: '#FFF', lineHeight: 1.5 }}>Find lightweight running shoes under $80</div>
          </div>
        </div>
        {/* AI product result */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#EC4899,#7C3AED)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>✦</div>
          <div style={{ flex: 1 }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '0 10px 10px 10px', padding: '8px 10px', marginBottom: 8 }}>
              <div style={{ fontSize: 9.5, color: '#CBD5E1', lineHeight: 1.5 }}>Found 3 great matches! Top pick 👟</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '9px 10px', display: 'flex', gap: 9, alignItems: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: 'linear-gradient(135deg,#0ea5e9,#22D3EE)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#E2E8F0', marginBottom: 2 }}>FlexRun Pro X3</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#22D3EE', marginBottom: 3 }}>$74.99</div>
                <div style={{ display: 'flex', gap: 1 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 8, color: '#F59E0B' }}>★</span>)}
                  <span style={{ fontSize: 7.5, color: 'rgba(100,116,139,0.5)', marginLeft: 3 }}>(2.1k)</span>
                </div>
              </div>
              <div style={{ padding: '5px 9px', borderRadius: 14, background: 'linear-gradient(135deg,#7C3AED,#EC4899)', fontSize: 8.5, color: '#FFF', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>Add +</div>
            </div>
          </div>
        </div>
        {/* Typing indicator */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#EC4899,#7C3AED)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>✦</div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '0 10px 10px 10px', padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
            {[0, 0.18, 0.36].map((d, i) => (
              <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(168,85,247,0.7)', animation: `pulse-slow 1s ${d}s ease-in-out infinite` }} />
            ))}
          </div>
        </div>
      </div>
      {/* Input bar */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: '7px 12px', fontSize: 9, color: 'rgba(148,163,184,0.38)' }}>Ask anything...</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: '#FFF' }}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
        </div>
      </div>
    </div>
  )
}

function DiscoveryContent() {
  const products = [
    { name: 'Velvet Bag', price: '$89', g: 'linear-gradient(135deg,#7C3AED,#A855F7)' },
    { name: 'Smart Watch', price: '$156', g: 'linear-gradient(135deg,#0ea5e9,#22D3EE)' },
    { name: 'Silk Scarf', price: '$45', g: 'linear-gradient(135deg,#EC4899,#f43f5e)' },
    { name: 'Trail Kit', price: '$78', g: 'linear-gradient(135deg,#0D9488,#22c55e)' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0F1117', display: 'flex', flexDirection: 'column', animation: 'screenIn 0.35s ease both' }}>
      <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 22, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: 'none', stroke: 'rgba(148,163,184,0.35)', strokeWidth: 2, flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          <span style={{ fontSize: 9.5, color: 'rgba(148,163,184,0.35)' }}>Search products, brands...</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '10px 14px', overflowX: 'hidden', flexShrink: 0 }}>
        {['All', 'Fashion', 'Tech', 'Sports', 'Beauty'].map((c, i) => (
          <div key={c} style={{ padding: '4px 10px', borderRadius: 20, fontSize: 9, fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap', background: i === 0 ? 'linear-gradient(135deg,#7C3AED,#EC4899)' : 'rgba(255,255,255,0.07)', color: i === 0 ? '#FFF' : 'rgba(148,163,184,0.5)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>{c}</div>
        ))}
      </div>
      <div style={{ padding: '2px 14px 8px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 8, fontWeight: 700, color: '#EC4899', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🔥 Trending Now</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '0 14px', flex: 1, alignContent: 'start' }}>
        {products.map(p => (
          <div key={p.name} style={{ borderRadius: 10, overflow: 'hidden', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ height: 62, background: p.g, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" style={{ width: 11, height: 11, fill: 'none', stroke: '#FFF', strokeWidth: 1.8 }}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div style={{ padding: '7px 9px' }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: '#E2E8F0', marginBottom: 2 }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#22D3EE' }}>{p.price}</span>
                <div style={{ display: 'flex', gap: 1 }}>
                  {[1,2,3,4].map(s => <span key={s} style={{ fontSize: 7, color: '#F59E0B' }}>★</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CreatorContent() {
  const bars = [65, 82, 48, 90, 75, 88, 70]
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0F1117', display: 'flex', flexDirection: 'column', animation: 'screenIn 0.35s ease both' }}>
      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#F59E0B,#EC4899)', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#E2E8F0' }}>Creator Dashboard</div>
          <div style={{ fontSize: 8, color: 'rgba(100,116,139,0.6)' }}>fashionbylayla · Premium Creator</div>
        </div>
        <div style={{ marginLeft: 'auto', padding: '3px 8px', borderRadius: 20, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.28)', fontSize: 8, color: '#F59E0B', fontWeight: 600 }}>PRO</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
        {[
          { val: '24.3K', label: 'Followers', color: '#A855F7' },
          { val: '892', label: 'Sales', color: '#EC4899' },
          { val: '$12.4K', label: 'Revenue', color: '#F59E0B' },
        ].map((s, i) => (
          <div key={s.label} style={{ padding: '10px 0', textAlign: 'center', background: 'rgba(255,255,255,0.015)', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 3 }}>{s.val}</div>
            <div style={{ fontSize: 7.5, color: 'rgba(100,116,139,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#E2E8F0' }}>Weekly Sales</span>
          <span style={{ fontSize: 8, color: '#F59E0B' }}>↑ 18% vs last week</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 50 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === 3 ? 'linear-gradient(180deg,#F59E0B,#EC4899)' : 'rgba(168,85,247,0.22)' }} />
          ))}
        </div>
        <div style={{ display: 'flex', marginTop: 4 }}>
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <span key={i} style={{ fontSize: 7.5, color: 'rgba(100,116,139,0.38)', flex: 1, textAlign: 'center' }}>{d}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 16px', flex: 1 }}>
        <div style={{ fontSize: 8.5, color: 'rgba(100,116,139,0.5)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Top Products</div>
        {[
          { name: 'Velvet Evening Gown', sales: 142, g: 'linear-gradient(135deg,#EC4899,#A855F7)' },
          { name: 'Silk Sundress Set', sales: 89, g: 'linear-gradient(135deg,#F59E0B,#EC4899)' },
        ].map(p => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '7px 8px' }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: p.g, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: '#E2E8F0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
              <div style={{ fontSize: 8, color: 'rgba(100,116,139,0.55)' }}>{p.sales} sales this week</div>
            </div>
            <div style={{ fontSize: 8.5, color: '#0D9488', fontWeight: 700, flexShrink: 0 }}>+24%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Phone chassis ────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 50, zIndex: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px 9px', background: '#090912' }}>
      <span style={{ fontSize: 11.5, fontWeight: 700, color: '#FFFFFF' }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {/* Signal bars */}
        <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', height: 11 }}>
          {[4, 6, 8, 11].map((h, i) => (
            <div key={i} style={{ width: 2.5, height: h, background: i < 3 ? '#FFFFFF' : 'rgba(255,255,255,0.3)', borderRadius: 0.5 }} />
          ))}
        </div>
        {/* WiFi */}
        <svg viewBox="0 0 24 18" style={{ width: 15, height: 12 }}>
          <path d="M12 14l0 0" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M7 10a7 7 0 0110 0" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M2 5a15 15 0 0120 0" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
        {/* Battery */}
        <div style={{ position: 'relative', width: 22, height: 11 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 2.8, border: '1.3px solid rgba(255,255,255,0.55)' }} />
          <div style={{ position: 'absolute', right: -3.5, top: '50%', transform: 'translateY(-50%)', width: 2.5, height: 5, background: 'rgba(255,255,255,0.5)', borderRadius: '0 1px 1px 0' }} />
          <div style={{ position: 'absolute', left: 1.5, top: 1.8, bottom: 1.8, width: '68%', background: '#4ade80', borderRadius: 1 }} />
        </div>
      </div>
    </div>
  )
}

function BottomNav({ tabId, color }: { tabId: TabId, color: string }) {
  const items: Array<{ id: string, path?: string, plus?: boolean }> = [
    { id: 'feed',     path: 'M3 12l9-8 9 8v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7zM9 21V12h6v9' },
    { id: 'discovery', path: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35' },
    { id: 'create',   plus: true },
    { id: 'cart',     path: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0' },
    { id: 'creator',  path: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 12a4 4 0 100-8 4 4 0 000 8z' },
  ]
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 54, zIndex: 20, background: '#090912', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 10px 5px' }}>
      {items.map(ic =>
        ic.plus ? (
          <div key="create" style={{ width: 34, height: 34, borderRadius: 11, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s' }}>
            <svg viewBox="0 0 20 20" style={{ width: 15, height: 15, fill: 'none', stroke: '#FFF', strokeWidth: 2.5, strokeLinecap: 'round' }}><path d="M10 4v12M4 10h12" /></svg>
          </div>
        ) : (
          <svg key={ic.id} viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: 'none', stroke: ic.id === tabId ? color : 'rgba(100,116,139,0.45)', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', transition: 'stroke 0.3s', flexShrink: 0 }}>
            <path d={ic.path} />
          </svg>
        )
      )}
    </div>
  )
}

function PhoneMockup({ tabId, color }: { tabId: TabId, color: string }) {
  return (
    <div style={{ position: 'relative', width: 280, height: 572, flexShrink: 0 }}>
      {/* Chassis */}
      <div style={{ position: 'absolute', inset: 0, background: '#090912', borderRadius: 46, border: '1.5px solid rgba(255,255,255,0.13)', boxShadow: '0 60px 120px rgba(0,0,0,0.85), 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 110, height: 28, background: '#090912', borderRadius: 20, zIndex: 30, boxShadow: '0 0 0 1.5px rgba(255,255,255,0.07)' }}>
          <div style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: '#1a1a2e', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.08)' }} />
        </div>
        {/* Status bar */}
        <StatusBar />
        {/* Screen content */}
        <div style={{ position: 'absolute', top: 50, bottom: 54, left: 0, right: 0, overflow: 'hidden' }}>
          {tabId === 'feed'      && <FeedContent />}
          {tabId === 'ai'        && <AIContent />}
          {tabId === 'discovery' && <DiscoveryContent />}
          {tabId === 'creator'   && <CreatorContent />}
        </div>
        {/* Bottom nav */}
        <BottomNav tabId={tabId} color={color} />
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Ezyify() {
  const [tabIdx, setTabIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTabIdx(i => (i + 1) % TABS.length), 4500)
    return () => clearInterval(id)
  }, [])

  const current = TABS[tabIdx]

  return (
    <section id="ezyify" className="relative overflow-hidden" style={{ background: '#05081A' }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '12%', width: 700, height: 700, borderRadius: '50%', background: 'rgba(124,58,237,0.065)', filter: 'blur(140px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-5%', right: '12%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(236,72,153,0.045)', filter: 'blur(120px)', pointerEvents: 'none' }} />
      {/* Subtle grid */}
      <div className="absolute inset-0 ezy-grid pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28">

        {/* Badge */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full" style={{ border: '1px solid rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.07)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C8962A', boxShadow: '0 0 6px #C8962A' }} />
            <span className="font-mono text-[9px] text-slate-400 tracking-[0.3em] uppercase">A Network71 Flagship Innovation Brand</span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left: text content ── */}
          <div>
            <h2
              className="font-display leading-none mb-4"
              style={{ fontSize: 'clamp(60px, 9vw, 100px)', background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 55%, #22D3EE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              Ezyify
            </h2>
            <p className="text-slate-300/70 text-[17px] font-light tracking-wide mb-10" style={{ maxWidth: 400 }}>
              AI-Powered Global E-commerce &amp; Social Commerce Ecosystem
            </p>

            {/* Tab switcher */}
            <div className="flex flex-col gap-2 mb-8">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setTabIdx(i)}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-left w-full transition-all duration-300"
                  style={{ background: i === tabIdx ? `${t.color}10` : 'transparent', border: `1px solid ${i === tabIdx ? t.color + '35' : 'rgba(255,255,255,0.06)'}` }}
                >
                  <div style={{ width: 3, height: 34, borderRadius: 2, background: i === tabIdx ? t.color : 'rgba(255,255,255,0.08)', flexShrink: 0, transition: 'background 0.3s' }} />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-sm font-semibold mb-0.5 transition-colors duration-300" style={{ color: i === tabIdx ? '#FFFFFF' : 'rgba(148,163,184,0.45)' }}>
                      {t.label}
                    </div>
                    <div className="text-xs leading-snug transition-colors duration-300" style={{ color: i === tabIdx ? 'rgba(148,163,184,0.65)' : 'rgba(100,116,139,0.35)' }}>
                      {t.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Feature bullets */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-10">
              {current.features.map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: current.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.62)' }}>{f}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/ezyify"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', boxShadow: '0 0 32px rgba(124,58,237,0.28)' }}
              >
                Explore Ezyify Platform
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <p className="font-mono text-[10px] text-slate-600 tracking-wide mt-4">Part of the Network71 technology ecosystem</p>
          </div>

          {/* ── Right: phone mockup ── */}
          <div className="flex justify-center items-center relative py-12">
            {/* Ambient glow tied to active tab */}
            <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', background: `${current.color}12`, filter: 'blur(72px)', transition: 'background 0.5s', pointerEvents: 'none' }} />

            {/* Floating notification badge — top left */}
            <div style={{ position: 'absolute', top: '8%', left: '-4%', padding: '8px 12px', borderRadius: 13, background: 'rgba(9,9,18,0.92)', border: '1px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(14px)', boxShadow: '0 8px 28px rgba(0,0,0,0.55)', animation: 'floatY 4s ease-in-out infinite', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#A855F7,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>🛍️</div>
                <div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: '#E2E8F0' }}>New Order</div>
                  <div style={{ fontSize: 8, color: 'rgba(100,116,139,0.65)' }}>Velvet Gown · $49.99</div>
                </div>
              </div>
            </div>

            {/* Floating AI badge — bottom right */}
            <div style={{ position: 'absolute', bottom: '10%', right: '-4%', padding: '8px 12px', borderRadius: 13, background: 'rgba(9,9,18,0.92)', border: '1px solid rgba(236,72,153,0.25)', backdropFilter: 'blur(14px)', boxShadow: '0 8px 28px rgba(0,0,0,0.55)', animation: 'floatY 4s ease-in-out infinite', animationDelay: '2s', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#EC4899,#f43f5e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>✦</div>
                <div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: '#E2E8F0' }}>AI Suggestion</div>
                  <div style={{ fontSize: 8, color: '#EC4899' }}>97% match found</div>
                </div>
              </div>
            </div>

            <PhoneMockup tabId={current.id} color={current.color} />
          </div>

        </div>
      </div>
    </section>
  )
}
