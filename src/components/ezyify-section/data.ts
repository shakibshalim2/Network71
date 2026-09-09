import type { TKey } from '@/i18n'

export const TAB_IDS = ['feed', 'ai', 'discovery', 'creator'] as const
export type TabId = typeof TAB_IDS[number]

export const TAB_COLOR: Record<TabId, string> = {
  feed: 'var(--accent-purple)',
  ai: 'var(--accent-pink)',
  discovery: 'var(--accent-cyan)',
  creator: 'var(--accent-amber)',
}

export const FEATURE_KEYS = ['f1', 'f2', 'f3', 'f4'] as const

export const tabKey = (id: TabId, field: 'label' | 'desc' | typeof FEATURE_KEYS[number]): TKey =>
  `ezyify.tab.${id}.${field}` as TKey

/** Intrinsic design size of the mockup — scaled via transform to stay proportional. */
export const PHONE_W = 280
export const PHONE_H = 572
