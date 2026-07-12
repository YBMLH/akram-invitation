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

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {gallery.map((item, i) => (
            <motion.figure
              key={item.src}
              className="group relative overflow-hidden rounded-[1.25rem] border border-beige-deep/25 bg-cream shadow-[0_20px_60px_-40px_rgba(60,45,25,0.6)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease, delay: (i % 3) * 0.08 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>

              {/* elegant hover overlay */}
              <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/55 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="w-full p-5 text-left font-display text-lg italic text-ivory">
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
