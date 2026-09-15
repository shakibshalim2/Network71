import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import { springSoft, EASE_OUT } from '@/lib/motion'

/**
 * Product portfolio as a segmented control: a pill slides between tabs
 * (layoutId), the detail panel transitions in the direction of travel, and
 * the category grid carries a matching sliding ring. Arrow keys move tabs.
 */
export default function ProductPortfolio({ c }: { c: FoodBeverageContent }) {
  const [activeCategory, setActiveCategory] = useState('processed')
  const [dir, setDir] = useState(1)
  const idx = c.productCategories.findIndex((item) => item.id === activeCategory)
  const activeProduct = c.productCategories[idx]!

  const select = (id: string) => {
    const next = c.productCategories.findIndex((i) => i.id === id)
    setDir(next >= idx ? 1 : -1)
    setActiveCategory(id)
  }
  const step = (d: number) => {
    const n = (idx + d + c.productCategories.length) % c.productCategories.length
    select(c.productCategories[n].id)
  }

  const panel = {
    enter: (d: number) => ({ opacity: 0, x: 28 * d, filter: 'blur(4px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.42, ease: EASE_OUT } },
    exit: (d: number) => ({ opacity: 0, x: -22 * d, filter: 'blur(4px)', transition: { duration: 0.24, ease: 'easeIn' as const } }),
  }

  return (
    <section id="product-portfolio" className="py-24 bg-surface-1" style={{ ['--pa' as string]: ORANGE }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: ORANGE }} />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.products.eyebrow}</span>
            <div className="h-px w-8" style={{ background: ORANGE }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.products.title}</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">{c.products.lead}</p>
        </div>

        {/* Segmented control */}
        <div className="sseg" role="tablist" aria-label={c.products.title}
          onKeyDown={(e) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }}>
          {c.productCategories.map((cat) => {
            const on = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => select(cat.id)}
                className={`sseg__tab${on ? ' is-on' : ''}`}
              >
                {on && <motion.span layoutId="fb-seg-pill" className="sseg__pill" transition={springSoft} aria-hidden="true" />}
                <span className="sseg__icon">{cat.icon}</span>
                <span className="sseg__label">{cat.label}</span>
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Detail panel — directional crossfade */}
          <div className="sprod">
            <span className="sprod__ghost font-display" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={activeProduct.id}
                custom={dir}
                variants={panel}
                initial="enter"
                animate="center"
                exit="exit"
                className="sprod__body"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="sprod__icon">{activeProduct.icon}</span>
                  <h3 className="font-display text-2xl text-fg">{activeProduct.label}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{activeProduct.desc}</p>
                <motion.ul
                  className="sprod__items"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}
                >
                  {activeProduct.items.map((item) => (
                    <motion.li
                      key={item}
                      variants={{ hidden: { opacity: 0, x: 10 }, show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE_OUT } } }}
                    >
                      <span className="sprod__check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path pathLength="1" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Category grid — sliding ring follows the active tile */}
          <div className="sprod__grid">
            {c.productCategories.map((cat, i) => {
              const on = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => select(cat.id)}
                  className={`sprod__tile${on ? ' is-on' : ''}`}
                  aria-pressed={on}
                >
                  {on && <motion.span layoutId="fb-tile-ring" className="sprod__ring" transition={springSoft} aria-hidden="true" />}
                  <span className="sprod__tile-idx font-mono">0{i + 1}</span>
                  <span className="sprod__tile-icon">{cat.icon}</span>
                  <span className="sprod__tile-label">{cat.label}</span>
                  <span className="sprod__tile-meta font-mono">{cat.items.length} {c.products.linesLabel}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
