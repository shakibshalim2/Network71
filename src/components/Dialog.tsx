import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { useT } from '@/i18n'
import { modalPanel } from '@/lib/motion'

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
  return (
    <dialog ref={ref} aria-label={title} onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => { if (event.target === event.currentTarget) onClose() }} className="n71-dialog">
      <motion.div className="n71-dialog-panel" variants={modalPanel} initial="hidden" animate="show">
        <header className="flex justify-between items-start gap-4 mb-6">
          <h2 className="font-display text-2xl sm:text-[28px] leading-tight tracking-[-0.02em]">{title}</h2>
          <motion.button
            type="button"
            className="n71-dialog-close"
            onClick={onClose}
            whileTap={{ scale: 0.92 }}
            aria-label={language === 'bn' ? 'বন্ধ করুন' : 'Close'}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
              <path strokeLinecap="round" d="M3 3l10 10M13 3L3 13" />
            </svg>
          </motion.button>
        </header>
        {children}
      </motion.div>
    </dialog>
  )
}
