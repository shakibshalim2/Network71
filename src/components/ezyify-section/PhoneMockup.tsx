import { useState, useEffect, useRef } from 'react'
import { PHONE_W, PHONE_H, type TabId } from './data'
import FeedScreen from './FeedScreen'
import AIScreen from './AIScreen'
import DiscoveryScreen from './DiscoveryScreen'
import CreatorScreen from './CreatorScreen'

function StatusBar() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 50, zIndex: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px 9px', background: '#090912' }}>
      <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--fg-strong)' }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {/* Signal bars */}
        <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', height: 11 }}>
          {[4, 6, 8, 11].map((h, i) => (
            <div key={i} style={{ width: 2.5, height: h, background: i < 3 ? 'var(--fg-strong)' : 'rgba(255,255,255,0.3)', borderRadius: 0.5 }} />
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

const NAV_ITEMS: Array<{ id: string, path?: string, plus?: boolean }> = [
  { id: 'feed',     path: 'M3 12l9-8 9 8v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7zM9 21V12h6v9' },
  { id: 'discovery', path: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35' },
  { id: 'create',   plus: true },
  { id: 'cart',     path: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0' },
  { id: 'creator',  path: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 12a4 4 0 100-8 4 4 0 000 8z' },
]

function BottomNav({ tabId, color }: { tabId: TabId, color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 54, zIndex: 20, background: '#090912', borderTop: '1px solid var(--line-strong)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 10px 5px' }}>
      {NAV_ITEMS.map(ic =>
        ic.plus ? (
          <div key="create" style={{ width: 34, height: 34, borderRadius: 11, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s' }}>
            <svg viewBox="0 0 20 20" style={{ width: 15, height: 15, fill: 'none', stroke: '#FFF', strokeWidth: 2.5, strokeLinecap: 'round' }}><path d="M10 4v12M4 10h12" /></svg>
          </div>
        ) : (
          <svg key={ic.id} viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: 'none', stroke: ic.id === tabId ? color : 'var(--fg-subtle)', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', transition: 'stroke 0.3s', flexShrink: 0 }}>
            <path d={ic.path} />
          </svg>
        )
      )}
    </div>
  )
}

function PhoneMockup({ tabId, color }: { tabId: TabId, color: string }) {
  return (
    <div style={{ position: 'relative', width: PHONE_W, height: PHONE_H, flexShrink: 0 }}>
      {/* Chassis */}
      <div style={{ position: 'absolute', inset: 0, background: '#090912', borderRadius: 46, border: '1.5px solid rgba(255,255,255,0.13)', boxShadow: 'var(--shadow-device), inset 0 1px 0 var(--line-strong)', overflow: 'hidden' }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 110, height: 28, background: '#090912', borderRadius: 20, zIndex: 30, boxShadow: '0 0 0 1.5px var(--line-strong)' }}>
          <div style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: '#1a1a2e', boxShadow: 'inset 0 0 0 1.5px var(--line-strong)' }} />
        </div>
        {/* Status bar */}
        <StatusBar />
        {/* Screen content */}
        <div style={{ position: 'absolute', top: 50, bottom: 54, left: 0, right: 0, overflow: 'hidden' }}>
          {tabId === 'feed'      && <FeedScreen />}
          {tabId === 'ai'        && <AIScreen />}
          {tabId === 'discovery' && <DiscoveryScreen />}
          {tabId === 'creator'   && <CreatorScreen />}
        </div>
        {/* Bottom nav */}
        <BottomNav tabId={tabId} color={color} />
      </div>
    </div>
  )
}

/**
 * Scales the fixed-size phone mockup to fit the available width without
 * distorting any of its internal pixel-tuned UI.
 */
export default function ScaledPhone({ tabId, color }: { tabId: TabId, color: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const measure = () => {
      const avail = el.clientWidth
      if (!avail) return
      // Leave room for the floating badges that sit outside the phone bounds
      setScale(Math.min(1, (avail - 40) / PHONE_W))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {/* Outer box reserves the *scaled* footprint so surrounding flow stays correct */}
      <div style={{ width: PHONE_W * scale, height: PHONE_H * scale, position: 'relative' }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
          <PhoneMockup tabId={tabId} color={color} />
        </div>
      </div>
    </div>
  )
}
