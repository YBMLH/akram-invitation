import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin golden thread showing reading progress along the top edge. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-right bg-gradient-to-l from-gold via-beige-deep to-gold"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
