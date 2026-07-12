import { motion } from 'framer-motion'
import { siteContent } from '../../config/content'

const ease = [0.22, 1, 0.36, 1] as const

/** Monogram curtain shown while the experience prepares itself. */
export function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-noir"
      exit={{ opacity: 0, transition: { duration: 0.9, ease } }}
      aria-hidden
    >
      <motion.span
        className="font-script text-4xl text-champagne sm:text-5xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.15 }}
      >
        Style by ib
      </motion.span>
      <motion.span
        className="mt-6 block h-px bg-gold/60"
        initial={{ width: 0 }}
        animate={{ width: '7rem' }}
        transition={{ duration: 1.2, ease, delay: 0.4 }}
      />
      <motion.span
        className="mt-6 font-body text-[0.6rem] uppercase tracking-luxe text-champagne/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        {siteContent.invitation.locationLabel}
      </motion.span>
    </motion.div>
  )
}
