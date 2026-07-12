import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  className?: string
}

export function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className ?? ''}`}>
      {eyebrow && (
        <Reveal>
          <span className="mb-4 block font-body text-sm font-light text-taupe transition-colors duration-500 dark:text-champagne/50">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl font-normal text-ink transition-colors duration-500 dark:text-champagne sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <span className="mt-6 flex items-center gap-4">
          <span className="block h-px w-12 bg-beige-deep/60 dark:bg-gold/40" />
          <span className="font-display text-[0.65rem] text-gold">✦</span>
          <span className="block h-px w-12 bg-beige-deep/60 dark:bg-gold/40" />
        </span>
      </Reveal>
    </div>
  )
}
