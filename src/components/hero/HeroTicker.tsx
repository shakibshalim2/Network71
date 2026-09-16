import { Link } from 'react-router-dom'
import { motion, useScroll, useVelocity, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { useT, DIVISION_IDS, DIVISION_HREF, DIVISION_COLOR, divKey } from '@/i18n'

/**
 * Division ticker under the hero. Scroll velocity speeds the marquee up;
 * each name is a link that lights with its division accent on hover.
 */
export default function HeroTicker() {
  const { t } = useT()
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { stiffness: 200, damping: 40, mass: 0.8 })
  const rate = useTransform(smooth, (v) => `${Math.max(0.3, 1 - Math.min(Math.abs(v), 2400) / 3000)}`)

  const items = [...DIVISION_IDS, ...DIVISION_IDS, ...DIVISION_IDS]

  return (
    <motion.div
      className="hticker"
      style={reduce ? undefined : { ['--mq-rate' as string]: rate }}
    >
      <div className="hticker__track">
        {items.map((id, i) => (
          <Link
            key={`${id}-${i}`}
            to={DIVISION_HREF[id]}
            className="hticker__item text-[11px]"
            style={{ ['--tk-accent' as string]: DIVISION_COLOR[id] }}
            tabIndex={i < DIVISION_IDS.length ? 0 : -1}
            aria-hidden={i >= DIVISION_IDS.length || undefined}
          >
            {t(divKey(id, 'name'))}
            <span className="hticker__dot" />
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
