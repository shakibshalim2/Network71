import { useEffect, useRef, type ReactNode } from 'react'
import { useT } from '@/i18n'

export default function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const { language } = useT()
  useEffect(() => {
    const dialog = ref.current!
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }) }
  }, [])
  return <dialog ref={ref} aria-label={title} onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === event.currentTarget) onClose() }} className="n71-dialog">
    <div className="n71-dialog-panel"><header className="flex justify-between items-start gap-4 mb-6">
      <h2 className="font-display text-2xl">{title}</h2>
      <button type="button" className="n71-dialog-close" onClick={onClose} aria-label={language === 'bn' ? 'বন্ধ করুন' : 'Close'}>×</button>
    </header>{children}</div>
  </dialog>
}
