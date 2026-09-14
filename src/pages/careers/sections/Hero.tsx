import PageHero from '@/components/PageHero'
import type { CareersContent } from '../content/en'

export default function Hero({ c, onApply }: { c: CareersContent['hero']; onApply: () => void }) {
  return (
    <PageHero
      breadcrumb={{ home: c.breadcrumbHome, current: c.breadcrumbCurrent }}
      eyebrow={c.eyebrow}
      title={c.title}
      lead={c.lead}
    >
      <button type="button" onClick={onApply} className="btn btn-primary">
        {c.cta}
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </PageHero>
  )
}
