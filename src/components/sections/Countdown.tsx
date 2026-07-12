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
            <div className="grid grid-cols-4 gap-3 sm:gap-6">
              {units.map((u) => (
                <div
                  key={u.label}
                  className="flex flex-col items-center rounded-2xl border border-beige-deep/30 bg-ivory/70 py-6 shadow-[0_18px_50px_-32px_rgba(60,45,25,0.5)] sm:py-8"
                >
                  <span className="font-display text-4xl font-light tabular-nums text-ink sm:text-6xl">
                    {u.value}
                  </span>
                  <span className="mt-2 font-body text-[0.58rem] uppercase tracking-wide2 text-taupe sm:text-[0.68rem]">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
