import type { TKey } from '@/i18n'

export const CAPABILITIES = [
  { sym: '◎', key: 'item1', color: 'var(--accent-teal)' },
  { sym: '⬡', key: 'item2', color: 'var(--accent-purple)' },
  { sym: '✦', key: 'item3', color: 'var(--brand-fg)' },
  { sym: '◈', key: 'item4', color: 'var(--accent-cyan)' },
] as const

// Node labels stay Latin (brand marks); `sub` resolves via `innovation.node.<id>`.
export const NODES = [
  { id: 'core',   cx: 260, cy: 190, r: 21, color: 'var(--brand-fg)', label: 'N71' },
  { id: 'ai',     cx: 260, cy: 48,  r: 13, color: 'var(--accent-teal)', label: 'AI/ML' },
  { id: 'ezyify', cx: 112, cy: 82,  r: 13, color: 'var(--accent-purple)', label: 'Ezyify' },
  { id: 'media',  cx: 408, cy: 82,  r: 13, color: 'var(--accent-cyan)', label: 'Media' },
  { id: 'trade',  cx: 58,  cy: 192, r: 12, color: 'var(--accent-amber)', label: 'Trade' },
  { id: 'energy', cx: 462, cy: 192, r: 12, color: 'var(--accent-orange)', label: 'Energy' },
  { id: 'ship',   cx: 112, cy: 298, r: 12, color: 'var(--accent-blue)', label: 'eSHIPe' },
  { id: 'data',   cx: 408, cy: 298, r: 12, color: 'var(--accent-pink)', label: 'Data' },
  { id: 'tech',   cx: 260, cy: 332, r: 12, color: 'var(--accent-indigo)', label: 'Tech' },
]

export const nodeSubKey = (id: string): TKey => `innovation.node.${id}` as TKey

export const EDGES = [
  ['core', 'ai'], ['core', 'ezyify'], ['core', 'media'],
  ['core', 'trade'], ['core', 'energy'], ['core', 'ship'],
  ['core', 'data'], ['core', 'tech'],
  ['ai', 'ezyify'], ['ai', 'media'],
  ['ezyify', 'trade'], ['ezyify', 'ship'],
  ['media', 'energy'], ['media', 'data'],
  ['ship', 'tech'], ['data', 'tech'],
  ['trade', 'ship'], ['energy', 'data'],
]

export const nodeById = (id: string) => NODES.find(n => n.id === id)!

// Animated data packets — color, path string, animation timing
export const PACKETS = [
  { color: 'var(--accent-purple)', path: 'M 260 190 L 112 82',  dur: '2.6s', begin: '0s' },
  { color: 'var(--accent-cyan)', path: 'M 260 190 L 408 82',  dur: '2.4s', begin: '0.9s' },
  { color: 'var(--accent-teal)', path: 'M 260 190 L 260 48',  dur: '2s',   begin: '1.7s' },
  { color: 'var(--accent-amber)', path: 'M 260 190 L 58 192',  dur: '2.2s', begin: '0.4s' },
  { color: 'var(--accent-pink)', path: 'M 260 190 L 408 298', dur: '2.8s', begin: '1.2s' },
]
