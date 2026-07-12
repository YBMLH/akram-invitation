import { siteContent } from '../../config/content'
import { Reveal } from '../ui/Reveal'

export function Welcome() {
  const { welcome, social, location } = siteContent

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
          <p className="font-arabic text-3xl leading-relaxed text-gold sm:text-4xl" dir="rtl" lang="ar">
            {welcome.arabic}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <span className="mt-6 block font-body text-[0.66rem] uppercase tracking-luxe text-taupe">
            {welcome.title}
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto my-8 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-beige-deep/60" />
            <span className="font-display text-[0.65rem] text-gold">✦</span>
            <span className="h-px w-12 bg-beige-deep/60" />
          </div>
        </Reveal>

        <div className="space-y-5">
          {welcome.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.12 + i * 0.06}>
              <p className="font-body text-lg font-light leading-relaxed text-ink/75 text-balance">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        {/* signature */}
        <Reveal delay={0.28}>
          <p className="mt-14 font-script text-5xl text-ink sm:text-6xl">Style by ib</p>
          <p className="mt-4 font-display text-lg italic text-taupe">{location.label}</p>
          <a
            href={social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block font-body text-[0.7rem] uppercase tracking-wide2 text-taupe transition-colors hover:text-ink"
          >
            {social.instagram.handle}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
