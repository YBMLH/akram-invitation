import { siteContent } from '../../config/content'
import { Reveal } from '../ui/Reveal'

export function Welcome() {
  const { welcome, brand, social, location } = siteContent

  return (
    <section id="welcome" className="relative overflow-hidden px-6 py-28 sm:py-32">
      {/* faint centerpiece echo */}
      <img
        src={siteContent.images.kaftanCircle}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="font-script text-3xl text-beige-deep sm:text-4xl">
            {welcome.title}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mx-auto my-8 h-px w-16 bg-beige-deep/70" />
        </Reveal>

        <div className="space-y-5">
          {welcome.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.08 + i * 0.06}>
              <p className="font-body text-lg font-light leading-relaxed text-ink/75 text-balance">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <p className="mt-12 font-display text-4xl font-light tracking-wide2 text-ink sm:text-5xl">
            {brand.replace(/_/g, ' ')}
          </p>
          <p className="mt-3 font-display text-xl italic text-taupe">
            {location.label}
          </p>
          <a
            href={social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-body text-[0.72rem] uppercase tracking-wide2 text-taupe transition-colors hover:text-ink"
          >
            {social.instagram.handle}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
