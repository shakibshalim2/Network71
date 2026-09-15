import { useState } from "react"
import Dialog from "@/components/Dialog"
import SectionEyebrow from '@/components/sector/SectionEyebrow'
import ArrowLink from '@/components/sector/ArrowLink'
import type { MediaContent } from '../content/en'
import { RED, BG_ALT } from '../theme'

export default function Gallery({ c }: { c: MediaContent['gallery'] }) {
  const [selected, setSelected] = useState<MediaContent["gallery"]["items"][number] | null>(null)
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <SectionEyebrow label={c.eyebrow} color={RED} className="mb-3" />
            <h2 className="font-display text-4xl text-white">{c.title}</h2>
          </div>
          <ArrowLink to="/gallery" color={RED} className="font-medium">{c.cta}</ArrowLink>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {c.items.map((item, i) => (
            <button type="button" onClick={() => setSelected(item)} key={item.img} className="group relative text-left rounded-xl overflow-hidden aspect-[3/2] mgal" style={{ ['--i' as string]: i }} aria-label={item.label}>
              <img src={item.img} alt={item.label} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover mgal__img" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(175deg, transparent 40%, rgba(3,6,8,0.88) 100%)' }} />
              <span className="mgal__frame" aria-hidden="true"><i /><i /><i /><i /></span>
              <span className="mgal__rec font-mono" aria-hidden="true"><i />REC</span>
              <span className="mgal__idx font-mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'rgba(239,68,68,0.75)' }}>{c.brand}</div>
                <div className="text-white text-sm font-semibold">{item.label}</div>
              </div>
            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-slate-600 text-xs font-mono">{c.note}</p>
      </div>
      {selected && <Dialog title={selected.label} onClose={() => setSelected(null)}><img decoding="async" src={selected.img} alt={selected.label} width="1200" height="800" className="w-full h-auto rounded-xl" /><p className="mt-4">{c.note}</p></Dialog>}
    </section>
  )
}
