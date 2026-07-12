import { Fragment } from 'react'
import { siteContent } from '../../config/content'
import { useCountdown } from '../../hooks/useCountdown'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export function Countdown() {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(
    siteContent.event.dateISO,
  )

  const units = [
    { label: 'Days', value: pad(days) },
    { label: 'Hours', value: pad(hours) },
    { label: 'Minutes', value: pad(minutes) },
    { label: 'Seconds', value: pad(seconds) },
  ]

  return (
    <section id="countdown" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Counting the moments" title="The Unveiling" />

        {isComplete ? (
          <Reveal className="mt-12 text-center">
            <p className="font-display text-3xl italic text-ink">
              The doors are open — welcome.
            </p>
          </Reveal>
        ) : (
          <Reveal className="mt-14">
            <div className="flex items-center justify-center gap-4 sm:gap-9">
              {units.map((u, i) => (
                <Fragment key={u.label}>
                  {i > 0 && (
                    <span className="block h-12 w-px bg-beige-deep/40 sm:h-16" aria-hidden />
                  )}
                  <div className="flex min-w-[3.2rem] flex-col items-center sm:min-w-[5rem]">
                    <span className="font-display text-5xl font-light tabular-nums text-ink sm:text-7xl">
                      {u.value}
                    </span>
                    <span className="mt-3 font-body text-[0.56rem] uppercase tracking-wide2 text-taupe sm:text-[0.66rem]">
                      {u.label}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
