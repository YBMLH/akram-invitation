import { siteContent } from '../../config/content'
import { Reveal } from '../ui/Reveal'

export function Welcome() {
  const { welcome, social, location } = siteContent

  return (
    <section id="welcome" className="relative overflow-hidden px-6 py-28 sm:py-32">
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="font-ruqaa text-4xl leading-relaxed text-gold sm:text-5xl">
            {welcome.arabic}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <span className="mt-6 block font-body text-sm font-light text-taupe dark:text-champagne/50">
            {welcome.title}
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto my-8 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-beige-deep/60 dark:bg-gold/40" />
            <span className="font-display text-[0.65rem] text-gold">✦</span>
            <span className="h-px w-12 bg-beige-deep/60 dark:bg-gold/40" />
          </div>
        </Reveal>

        <div className="space-y-5">
          {welcome.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.12 + i * 0.06}>
              <p className="font-body text-lg font-light leading-relaxed text-ink/75 text-balance dark:text-champagne/80">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        {/* التوقيع */}
        <Reveal delay={0.28}>
          <p className="mt-14 font-script text-5xl text-ink transition-colors duration-500 dark:text-champagne sm:text-6xl" dir="ltr">
            Style by ib
          </p>
          <p className="mt-4 font-display text-xl text-taupe dark:text-champagne/60">{location.label}</p>
          <a
            href={social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block font-latin text-[0.7rem] uppercase tracking-wide2 text-taupe transition-colors hover:text-ink dark:text-champagne/50 dark:hover:text-champagne"
            dir="ltr"
          >
            {social.instagram.handle}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
