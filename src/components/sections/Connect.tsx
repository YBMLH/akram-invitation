import { siteContent } from '../../config/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.06 8.06 0 0 1 2.37 5.73c0 4.47-3.63 8.1-8.1 8.1a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.06.8.82-2.99-.2-.31a8.06 8.06 0 0 1-1.24-4.29c0-4.47 3.63-8.1 8.11-8.1Zm-2.9 4.34c-.15 0-.4.06-.61.29-.21.23-.8.79-.8 1.92s.82 2.22.94 2.38c.11.15 1.6 2.55 3.98 3.48 1.98.78 2.38.62 2.81.58.43-.04 1.39-.57 1.58-1.12.2-.55.2-1.02.14-1.12-.06-.1-.21-.15-.44-.27-.23-.11-1.39-.68-1.6-.76-.21-.08-.37-.11-.53.12-.15.23-.6.76-.74.92-.14.15-.27.17-.5.06-.23-.12-.98-.36-1.86-1.15-.69-.61-1.15-1.37-1.29-1.6-.14-.23-.01-.35.1-.47.1-.1.23-.27.34-.4.11-.14.15-.23.23-.39.08-.15.04-.29-.02-.4-.06-.12-.53-1.28-.73-1.75-.19-.46-.39-.4-.53-.4h-.45Z" />
    </svg>
  )
}

export function Connect() {
  const { social } = siteContent

  return (
    <section id="connect" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Stay close" title="Connect With Us" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {/* Instagram */}
          <Reveal>
            <a
              href={social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col items-center rounded-[1.5rem] border border-beige-deep/30 bg-ivory/70 px-8 py-11 text-center transition-all duration-500 hover:-translate-y-1 hover:border-beige-deep/60 hover:shadow-[0_28px_70px_-40px_rgba(60,45,25,0.6)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-beige-deep/40 text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-ivory">
                <InstagramIcon className="h-6 w-6" />
              </span>
              <p className="mt-6 font-body text-[0.62rem] uppercase tracking-luxe text-taupe">
                Instagram
              </p>
              <p className="mt-2 font-display text-2xl text-ink">{social.instagram.handle}</p>
              <span className="mt-6 inline-block rounded-full border border-ink/70 px-6 py-2.5 font-body text-[0.66rem] uppercase tracking-wide2 text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-ivory">
                Follow
              </span>
            </a>
          </Reveal>

          {/* WhatsApp */}
          <Reveal delay={0.08}>
            <a
              href={social.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col items-center rounded-[1.5rem] border border-beige-deep/30 bg-ivory/70 px-8 py-11 text-center transition-all duration-500 hover:-translate-y-1 hover:border-beige-deep/60 hover:shadow-[0_28px_70px_-40px_rgba(60,45,25,0.6)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-beige-deep/40 text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-ivory">
                <WhatsappIcon className="h-6 w-6" />
              </span>
              <p className="mt-6 font-body text-[0.62rem] uppercase tracking-luxe text-taupe">
                WhatsApp
              </p>
              <p className="mt-2 font-display text-2xl text-ink">{social.whatsapp.label}</p>
              <span className="mt-6 inline-block rounded-full border border-ink/70 px-6 py-2.5 font-body text-[0.66rem] uppercase tracking-wide2 text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-ivory">
                Message
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
