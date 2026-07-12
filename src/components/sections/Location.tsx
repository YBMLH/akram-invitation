import { siteContent } from '../../config/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Location() {
  const { location, ui } = siteContent

  return (
    <section id="location" className="bg-ivory/60 px-6 py-24 transition-colors duration-500 dark:bg-[#1B1510]/60 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow={ui.location.eyebrow} title={ui.location.title} />

        <Reveal className="mt-14">
          {/* إطار بأسلوب لوحات المعارض حول الخريطة */}
          <div className="border border-beige-deep/45 bg-ivory p-2 shadow-[0_35px_80px_-45px_rgba(30,22,12,0.7)] transition-colors duration-500 dark:border-gold/35 dark:bg-[#211A13] sm:p-3">
            <div className="border border-beige-deep/30 transition-colors duration-500 dark:border-gold/25">
              <div className="relative aspect-[16/10] w-full sm:aspect-[16/7]">
                <iframe
                  title="موقع Style By IB على الخريطة"
                  src={location.mapEmbedSrc}
                  className="absolute inset-0 h-full w-full grayscale-[0.3]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col items-center gap-5 px-6 py-7 text-center sm:flex-row sm:justify-between sm:text-start">
                <div>
                  <p className="font-body text-sm font-light text-taupe dark:text-champagne/50">
                    {ui.location.kicker}
                  </p>
                  <p className="mt-1 font-display text-2xl text-ink dark:text-champagne">{location.label}</p>
                </div>
                <a
                  href={location.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-ink bg-ink px-8 py-3.5 font-body text-sm font-light text-ivory transition-colors duration-500 hover:bg-transparent hover:text-ink dark:border-champagne dark:bg-champagne dark:text-noir dark:hover:bg-transparent dark:hover:text-champagne"
                >
                  {ui.location.openMaps}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
