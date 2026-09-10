import { Children, isValidElement, type ReactNode } from 'react'
import { contentMeta } from '@/lib/pageContent'

/** Reorder/filter direct page sections without adding layout wrappers. */
export default function ManagedContent({ content, children, className }: {
  content: object; children: ReactNode; className?: string
}) {
  const meta = contentMeta.get(content) || {}
  const keys = Object.entries(content)
  const sections = Children.toArray(children).map((child, index) => {
    const props = isValidElement(child) ? child.props as Record<string, unknown> : {}
    const value = props.c ?? props.metrics ?? props.steps
    const key = keys.find(([, candidate]) => candidate === value)?.[0]
    return { child, index, meta: key ? meta[key] : undefined }
  }).filter(item => item.meta?.visible !== false)
  sections.sort((a,b) => (a.meta?.order ?? a.index * 10) - (b.meta?.order ?? b.index * 10) || a.index-b.index)
  return <main className={className}>{sections.map(item => item.child)}</main>
}
