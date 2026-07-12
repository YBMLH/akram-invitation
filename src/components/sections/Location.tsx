import { siteContent } from '../../config/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Location() {
  const { location } = siteContent

  return (
    <section id="location" className="bg-ivory/60 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Where to find us" title="The Location" />

        <Reveal className="mt-14">
          {/* gallery-matted frame around the map */}
          <div className="border border-beige-deep/45 bg-ivory p-2 shadow-[0_35px_80px_-45px_rgba(30,22,12,0.7)] sm:p-3">
            <div className="border border-beige-deep/30">
              <div className="relative aspect-[16/10] w-full sm:aspect-[16/7]">
                <iframe
                  title="Style_By_IB location map"
                  src={location.mapEmbedSrc}
                  className="absolute inset-0 h-full w-full grayscale-[0.3]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col items-center gap-5 px-6 py-7 text-center sm:flex-row sm:justify-between sm:text-left">
                <div>
                  <p className="font-body text-[0.6rem] uppercase tracking-luxe text-taupe">
                    The boutique
                  </p>
                  <p className="mt-1 font-display text-2xl italic text-ink">{location.label}</p>
                </div>
                <a
                  href={location.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-ink bg-ink px-8 py-3.5 font-body text-[0.66rem] uppercase tracking-wide2 text-ivory transition-colors duration-500 hover:bg-transparent hover:text-ink"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
