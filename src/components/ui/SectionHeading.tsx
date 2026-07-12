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
          <span className="mb-4 block font-body text-[0.68rem] uppercase tracking-luxe text-taupe">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl font-light text-ink sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <span className="mt-6 block h-px w-16 bg-beige-deep/70" />
      </Reveal>
    </div>
  )
}
