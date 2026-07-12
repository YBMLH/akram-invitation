import { AnimatePresence, motion } from 'framer-motion'
import { Fragment } from 'react'
import { siteContent } from '../../config/content'
import { useCountdown } from '../../hooks/useCountdown'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

/** رقم يتدحرج بسلاسة عند تغيّر قيمته */
function RollingValue({ value }: { value: string }) {
  return (
    <span className="relative block h-[1.05em] overflow-hidden leading-none">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="block leading-none"
          initial={{ y: '0.7em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-0.7em', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Countdown() {
  const { ui } = siteContent
  const { days, hours, minutes, seconds, isComplete } = useCountdown(
    siteContent.event.dateISO,
  )

  const units = [
    { label: ui.countdown.days, value: pad(days) },
    { label: ui.countdown.hours, value: pad(hours) },
    { label: ui.countdown.minutes, value: pad(minutes) },
    { label: ui.countdown.seconds, value: pad(seconds) },
  ]

  return (
    <section id="countdown" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow={ui.countdown.eyebrow} title={ui.countdown.title} />

        {isComplete ? (
          <Reveal className="mt-12 text-center">
            <p className="font-display text-3xl text-ink dark:text-champagne">
              {ui.countdown.doorsOpen}
            </p>
          </Reveal>
        ) : (
          <Reveal className="mt-14">
            <div className="flex items-center justify-center gap-4 sm:gap-9">
              {units.map((u, i) => (
                <Fragment key={u.label}>
                  {i > 0 && (
                    <span
                      className="block h-12 w-px bg-beige-deep/40 transition-colors duration-500 dark:bg-gold/30 sm:h-16"
                      aria-hidden
                    />
                  )}
                  <div className="flex min-w-[3.2rem] flex-col items-center sm:min-w-[5rem]">
                    <span className="font-latin text-5xl font-light tabular-nums text-ink transition-colors duration-500 dark:text-champagne sm:text-7xl">
                      <RollingValue value={u.value} />
                    </span>
                    <span className="mt-3 font-body text-xs font-light text-taupe transition-colors duration-500 dark:text-champagne/50 sm:text-sm">
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
