import { AnimatePresence, motion } from 'framer-motion'
import { Fragment } from 'react'
import { siteContent } from '../../config/content'
import { useCountdown } from '../../hooks/useCountdown'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

/**
 * ساعة رملية متحركة: الرمل ينساب من الأعلى إلى الأسفل ثم تنقلب —
 * حالتا البداية والنهاية متطابقتان بصرياً فيبدو التكرار سلساً.
 */
function Hourglass() {
  const CYCLE = 6
  const times = [0, 0.72, 0.88, 1]

  return (
    <motion.svg
      viewBox="0 0 100 140"
      className="mx-auto h-28 w-auto text-ink transition-colors duration-500 dark:text-champagne sm:h-32"
      animate={{ rotate: [0, 0, 180, 180] }}
      transition={{ duration: CYCLE, times, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      {/* الإطار الخشبي */}
      <rect x="14" y="4" width="72" height="7" rx="3.5" fill="currentColor" />
      <rect x="14" y="129" width="72" height="7" rx="3.5" fill="currentColor" />
      <line x1="20" y1="11" x2="20" y2="129" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="11" x2="80" y2="129" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* الزجاج */}
      <path
        d="M27 14 H73 V30 C73 44 56 54 52 63 V70 H48 V63 C44 54 27 44 27 30 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <path
        d="M27 126 H73 V110 C73 96 56 86 52 77 V70 H48 V77 C44 86 27 96 27 110 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.55"
      />

      {/* الرمل العلوي — يتقلّص نحو العنق */}
      <motion.path
        d="M31 22 H69 V30 C69 42 54 52 50 62 C46 52 31 42 31 30 Z"
        fill="#C2A87E"
        style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
        animate={{ scaleY: [1, 0.02, 0.02, 0.02] }}
        transition={{ duration: CYCLE, times, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* خيط الرمل المنساب */}
      <motion.rect
        x="48.8"
        y="70"
        width="2.4"
        height="52"
        fill="#C2A87E"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: CYCLE, times: [0, 0.68, 0.74, 1], repeat: Infinity }}
      />

      {/* الرمل السفلي — يتراكم من القاعدة */}
      <motion.path
        d="M31 122 H69 V116 C69 106 56 98 50 92 C44 98 31 106 31 116 Z"
        fill="#C2A87E"
        style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
        animate={{ scaleY: [0.04, 1, 1, 1] }}
        transition={{ duration: CYCLE, times, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
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
    // شريط سينمائي داكن دائماً (نسق داكن مفروض) ليبرز نصّ شامبانياً أنيقاً فوق الصورة
    <section
      id="countdown"
      className="dark relative overflow-hidden px-6 py-24 sm:py-28"
    >
      {/* صورة عارضات الأزياء — خلفية القسم */}
      <img
        src={siteContent.images.countdownBg}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center"
      />

      {/* حجاب عنّابي يعتّم الحواف ويترك الصورة تظهر في الوسط مع بقاء الأرقام واضحة */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#2a0912_0%,rgba(42,9,18,0.76)_20%,rgba(42,9,18,0.5)_50%,rgba(42,9,18,0.76)_80%,#2a0912_100%)]"
        aria-hidden
      />
      {/* تظليل جانبي خفيف لعمق سينمائي */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_38%,rgba(20,6,12,0.55)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading eyebrow={ui.countdown.eyebrow} title={ui.countdown.title} />

        {isComplete ? (
          <Reveal className="mt-12 text-center">
            <p className="font-display text-3xl text-ink dark:text-champagne">
              {ui.countdown.doorsOpen}
            </p>
          </Reveal>
        ) : (
          <Reveal className="mt-12">
            <Hourglass />
            <div className="mt-10 flex items-center justify-center gap-4 sm:gap-9">
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
