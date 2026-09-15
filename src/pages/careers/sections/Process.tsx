import ProcessFlow from '@/components/sector/ProcessFlow'
import type { CareersContent } from '../content/en'

/** Hiring steps share the division "journey line": one accent path draws with scroll. */
export default function Process({ c }: { c: CareersContent['process'] }) {
  return (
    <ProcessFlow
      steps={c.steps.map((s) => ({ title: s.title, desc: s.desc }))}
      accentHex="#C8962A"
      label={c.title}
      eyebrow={c.eyebrow}
    />
  )
}
