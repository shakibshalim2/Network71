import Dialog from '@/components/Dialog'
import type { EShipeContent } from '../content/en'
type Listings = EShipeContent['listings']

export default function VesselDetail({ vessel, c, onClose }: {
  vessel: Listings['vessels'][number]; c: Listings; onClose: () => void
}) {
  const specs = [vessel.flag, vessel.dwt, vessel.year]
  const requirements = `${c.enquiryIntro}\n${vessel.type}\n${c.specs.map((s, i) => `${s.label}: ${specs[i]}`).join('\n')}`
  return <Dialog title={c.detailTitle} onClose={onClose}>
    <p className="text-lg mb-5">{c.example.replace('{type}', vessel.type)}</p>
    <dl className="grid grid-cols-2 gap-5 mb-6">{c.specs.map((spec, i) => <div key={spec.label}>
      <dt className="text-slate-400">{spec.label}</dt><dd>{specs[i]}</dd>
    </div>)}</dl>
    <p className="mb-6 text-slate-400">{c.specNote}</p>
    <aside className="rounded-xl border border-white/10 p-5 mb-6"><h3 className="text-xl mb-3">{c.sellerTitle}</h3><p>{c.sellerNote}</p></aside>
    <a className="public-button" href={`/divisions/ship-marketplace?requirements=${encodeURIComponent(requirements)}#sector-contact`}>{c.discuss}</a>
  </Dialog>
}
