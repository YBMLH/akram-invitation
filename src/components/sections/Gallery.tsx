import { motion } from 'framer-motion'
import { siteContent } from '../../config/content'
import { SectionHeading } from '../ui/SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

export function Gallery() {
  const { gallery } = siteContent

  return (
    <section id="gallery" className="bg-ivory/60 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="The collection" title="Maison Kaftan" />

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
          {gallery.map((item, i) => (
            <motion.figure
              key={item.src}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease, delay: (i % 3) * 0.08 }}
            >
              <div className="overflow-hidden border border-beige-deep/25 shadow-[0_24px_60px_-42px_rgba(30,22,12,0.7)]">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
              </div>

              {/* editorial caption line */}
              <figcaption className="mt-3 flex items-baseline justify-between border-b border-beige-deep/30 pb-2">
                <span className="font-display text-sm italic text-taupe">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-body text-[0.62rem] uppercase tracking-wide2 text-ink/70">
                  {item.caption}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
