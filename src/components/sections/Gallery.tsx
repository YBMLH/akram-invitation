import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { siteContent } from '../../config/content'
import { SectionHeading } from '../ui/SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

export function Gallery() {
  const { gallery, ui } = siteContent
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((a) => (a === null ? a : (a + dir + gallery.length) % gallery.length)),
    [gallery.length],
  )

  // لوحة المفاتيح: Esc للإغلاق، الأسهم للتصفح
  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(1)
      if (e.key === 'ArrowRight') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close, step])

  return (
    <section
      id="gallery"
      className="bg-ivory/60 px-6 py-24 transition-colors duration-500 dark:bg-[#1B1510]/60 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={ui.gallery.eyebrow || undefined} title={ui.gallery.title} />

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
          {gallery.map((item, i) => (
            <motion.figure
              key={item.src}
              className="group cursor-zoom-in"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="overflow-hidden border border-beige-deep/25 shadow-[0_24px_60px_-42px_rgba(30,22,12,0.7)] transition-colors duration-500 dark:border-gold/25">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
              </div>

            </motion.figure>
          ))}
        </div>
      </div>

      {/* ── عارض الصور (Lightbox) ── */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-noir/90 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={gallery[active].caption}
          >
            <motion.button
              type="button"
              onClick={close}
              aria-label="إغلاق"
              className="absolute end-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-champagne/40 text-champagne"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>

            {([['‹', 1], ['›', -1]] as const).map(([glyph, dir]) => (
              <motion.button
                key={glyph}
                type="button"
                aria-label={dir === 1 ? 'التالي' : 'السابق'}
                onClick={(e) => {
                  e.stopPropagation()
                  step(dir)
                }}
                className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-champagne/40 font-latin text-2xl text-champagne ${
                  glyph === '‹' ? 'left-3 sm:left-8' : 'right-3 sm:right-8'
                }`}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
              >
                {glyph}
              </motion.button>
            ))}

            <motion.figure
              className="flex max-h-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="border-2 border-champagne/25 bg-ivory p-1.5 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)] sm:p-2">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={active}
                    src={gallery[active].src}
                    alt={gallery[active].caption}
                    className="max-h-[72vh] w-auto max-w-full select-none object-contain"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease }}
                    draggable={false}
                  />
                </AnimatePresence>
              </div>
              <figcaption className="mt-5 text-center">
                <span className="font-latin text-base italic text-champagne/60">
                  {String(active + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
