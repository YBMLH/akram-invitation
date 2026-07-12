import { AnimatePresence, motion } from 'framer-motion'
import { useThemeCtx } from '../../context/theme'

const ease = [0.22, 1, 0.36, 1] as const

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
      <circle cx="12" cy="12" r="4.2" />
      <path strokeLinecap="round" d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
      <path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z" strokeLinejoin="round" />
    </svg>
  )
}

/** Floating light/dark switch — the maison by day or by night. */
export function ThemeToggle() {
  const { theme, toggle } = useThemeCtx()

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
      title={theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
      className="fixed end-4 top-4 z-[56] flex h-11 w-11 items-center justify-center rounded-full border border-beige-deep/50 bg-ivory/80 text-ink shadow-[0_10px_30px_-15px_rgba(30,22,12,0.6)] backdrop-blur transition-colors duration-500 dark:border-gold/40 dark:bg-noir/70 dark:text-champagne sm:end-6 sm:top-6"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 2.3 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -70, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 70, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease }}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
