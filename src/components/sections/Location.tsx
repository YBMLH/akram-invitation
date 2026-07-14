import { siteContent } from '../../config/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function PinGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function Location() {
  const { location, ui } = siteContent

  return (
    <section
      id="location"
      className="bg-ivory/60 px-6 py-24 transition-colors duration-500 dark:bg-[#3a0d18]/45 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow={ui.location.eyebrow} title={ui.location.title} />

        <Reveal className="mt-14">
          {/* بطاقة بأسلوب أبل: حواف ناعمة وظل خفيف */}
          <div className="overflow-hidden rounded-[28px] border border-black/5 bg-white/80 shadow-[0_30px_80px_-40px_rgba(30,22,12,0.55)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/7]">
              <iframe
                title="موقع Style By IB على الخريطة"
                src={location.mapEmbedSrc}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col items-center gap-5 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-start">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.04] text-ink dark:bg-white/10 dark:text-champagne">
                  <PinGlyph className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-body text-sm font-light text-taupe dark:text-champagne/50">
                    {ui.location.kicker}
                  </p>
                  <p className="mt-0.5 font-display text-2xl text-ink dark:text-champagne">
                    {location.label}
                  </p>
                </div>
              </div>
              <a
                href={location.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-body text-sm font-light text-ivory shadow-[0_12px_28px_-12px_rgba(30,22,12,0.8)] transition-transform duration-300 hover:scale-[1.03] dark:bg-champagne dark:text-noir"
              >
                <PinGlyph className="h-4 w-4" />
                {ui.location.openMaps}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
