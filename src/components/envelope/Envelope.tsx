import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useState } from 'react'
import type { PointerEvent } from 'react'
import { siteContent } from '../../config/content'
import { Particles } from '../bloom/Particles'
import { InvitationCard } from '../bloom/InvitationCard'
import { StarBurst } from '../bloom/StarBurst'
import { useThemeCtx } from '../../context/theme'

type Phase = 'idle' | 'opening' | 'revealed'

const ease = [0.22, 1, 0.36, 1] as const

/** نقطة التقاء اللسان مع جسم الظرف (نسبة من ارتفاع الظرف) */
const FLAP_TIP = 58

export function Envelope() {
  const [phase, setPhase] = useState<Phase>('idle')
  const { brand, subtitle, images, ui } = siteContent
  const { setTheme } = useThemeCtx()

  const opened = phase !== 'idle'
  const revealed = phase === 'revealed'

  // إمالة ثلاثية الأبعاد لطيفة نحو المؤشر
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 60, damping: 14 })
  const rotateY = useSpring(tiltY, { stiffness: 60, damping: 14 })

  function handleTilt(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 8)
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
  }

  function resetTilt() {
    tiltX.set(0)
    tiltY.set(0)
  }

  function open() {
    if (phase !== 'idle') return
    // فتح الدعوة يقود دائماً إلى ضوء النهار
    setTheme('light')
    setPhase('opening')
    // اللسان يُفتح ثم ترتفع البطاقة
    window.setTimeout(() => setPhase('revealed'), 1500)
  }

  return (
    <section
      id="invitation"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16"
    >
      {/* ── مشهد الأتيلييه الليلي — يذوب في ضوء النهار عند الفتح ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 50% 42%, #2A2118 0%, #1D1712 46%, #171310 100%)',
        }}
        initial={false}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: 2, ease, delay: opened ? 0.55 : 0 }}
        aria-hidden
      />

      {/* الأشرطة الجانبية اللاتينية (سطح المكتب فقط) */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="rails"
            className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease }}
            aria-hidden
          >
            <span className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-latin text-[0.6rem] uppercase tracking-luxe text-champagne/40">
              Guelma · Algeria
            </span>
            <span className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-latin text-[0.6rem] uppercase tracking-luxe text-champagne/40">
              Caftan Couture
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* السطر التمهيدي فوق الظرف */}
      <AnimatePresence>
        {!opened && (
          <motion.p
            key="eyebrow"
            className="relative mb-9 text-center font-body text-base font-light text-champagne/80 sm:mb-11"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.9, ease }}
          >
            {ui.invitedEyebrow}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── المسرح: الظرف + الختم + البطاقة ── */}
      <motion.div
        className="relative"
        style={{
          width: 'min(88vw, 540px)',
          aspectRatio: '4 / 3',
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        onPointerMove={handleTilt}
        onPointerLeave={resetTilt}
      >
        {/* هالة ضوء خلف الظرف */}
        <motion.div
          className="pointer-events-none absolute inset-[-18%] rounded-full blur-3xl"
          initial={false}
          animate={{ opacity: opened ? 0.9 : 0.5 }}
          transition={{ duration: 1.6, ease }}
          style={{
            background:
              'radial-gradient(circle, rgba(233,218,187,0.5) 0%, rgba(194,168,126,0.16) 50%, rgba(194,168,126,0) 74%)',
          }}
          aria-hidden
        />

        {/* ── الظرف نفسه ── */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={
            revealed
              ? { y: '9%', scale: 0.94, opacity: 0.55 }
              : { y: '0%', scale: 1, opacity: 1 }
          }
          transition={{ duration: 1.1, ease }}
        >
          {/* ظل أرضي */}
          <div
            className="pointer-events-none absolute -bottom-7 left-1/2 h-7 w-[86%] -translate-x-1/2 rounded-[50%] bg-black/40 blur-lg"
            aria-hidden
          />

          {/* جيب الظرف الخلفي */}
          <div
            className="absolute inset-0 rounded-lg shadow-[0_45px_90px_-30px_rgba(20,14,8,0.65)]"
            style={{
              background: 'linear-gradient(180deg, #F6F0E4 0%, #EFE7D7 100%)',
            }}
          />

          {/* البطانة الداخلية الظاهرة عند الفتح */}
          <div
            className="absolute inset-x-0 top-0 rounded-t-lg"
            style={{
              height: `${FLAP_TIP}%`,
              background: 'linear-gradient(180deg, #DECFB4 0%, #EBDFC8 100%)',
            }}
          />

          {/* الطيّتان الجانبيتان */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              clipPath: 'polygon(0 0, 0 100%, 54% 52%)',
              background: 'linear-gradient(105deg, #FBF6EB 0%, #EFE6D3 85%)',
              filter: 'drop-shadow(1px 0 1px rgba(120,100,70,0.18))',
            }}
          />
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              clipPath: 'polygon(100% 0, 100% 100%, 46% 52%)',
              background: 'linear-gradient(255deg, #FBF6EB 0%, #EFE6D3 85%)',
              filter: 'drop-shadow(-1px 0 1px rgba(120,100,70,0.18))',
            }}
          />

          {/* الطية السفلية */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 50% 44%)',
              background: 'linear-gradient(0deg, #FFFDF8 0%, #F3EBDB 90%)',
              filter: 'drop-shadow(0 -1px 1px rgba(120,100,70,0.22))',
            }}
          />

          {/* سطر الإهداء على جسم الظرف */}
          <motion.p
            className="absolute inset-x-0 text-center font-ruqaa text-xl text-ink/70 sm:text-2xl"
            style={{ top: `${FLAP_TIP + 25}%` }}
            initial={false}
            animate={{ opacity: opened ? 0 : 1 }}
            transition={{ duration: 0.5, ease }}
          >
            {ui.sealNote}
          </motion.p>

          {/* ── اللسان العلوي (يدور حول حافته العليا) ── */}
          <motion.div
            className="absolute inset-x-0 top-0 z-20"
            style={{
              height: `${FLAP_TIP + 2}%`,
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              transformPerspective: 900,
            }}
            initial={false}
            animate={{ rotateX: opened ? -178 : 0 }}
            transition={{ duration: 1.0, ease, delay: opened ? 0.35 : 0 }}
          >
            {/* الوجه الخارجي */}
            <div
              className="absolute inset-0 rounded-t-lg [backface-visibility:hidden]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(180deg, #FFFDF8 0%, #F1E8D6 78%, #E7DCC5 100%)',
                filter: 'drop-shadow(0 3px 4px rgba(90,70,45,0.28))',
              }}
            />
            {/* الوجه الداخلي (يظهر بعد الدوران) */}
            <div
              className="absolute inset-0 rounded-t-lg [backface-visibility:hidden]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(0deg, #E4D6BB 0%, #D9C8A8 100%)',
                transform: 'rotateX(180deg)',
              }}
            />
          </motion.div>

          {/* ── الختم الشمعي — هو الزر ── */}
          <div
            className="absolute left-1/2 z-30"
            style={{
              top: `${FLAP_TIP}%`,
              width: 'min(28%, 140px)',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.button
              type="button"
              onClick={open}
              disabled={opened}
              aria-label={ui.openInvitation}
              className={`relative block w-full rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-transparent ${
                opened ? 'pointer-events-none' : ''
              }`}
              initial={false}
              animate={
                opened
                  ? { opacity: 0, scale: 1.25, rotate: [0, -7, 6, 0] }
                  : { opacity: 1, scale: 1, rotate: 0 }
              }
              whileHover={opened ? undefined : { scale: 1.07 }}
              whileTap={opened ? undefined : { scale: 0.92 }}
              transition={{ duration: 0.55, ease }}
            >
              {/* حلقة نبض تدعو للضغط */}
              {!opened && (
                <motion.span
                  className="absolute -inset-2.5 rounded-full border border-gold/50"
                  animate={{ scale: [1, 1.2], opacity: [0.7, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                  aria-hidden
                />
              )}
              {/* ظل تحت الزر */}
              <span
                className="absolute -bottom-3 left-1/2 h-3.5 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/45 blur-md"
                aria-hidden
              />
              <img
                src={images.seal}
                alt=""
                className="relative block w-full select-none rounded-full drop-shadow-[0_16px_28px_rgba(0,0,0,0.5)]"
                draggable={false}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* ذرات ضوء */}
        <Particles active={opened} />

        {/* البطاقة ترتفع من الظرف */}
        <InvitationCard show={revealed} />

        {/* نجوم تتطاير لحظة ظهور البطاقة */}
        <StarBurst fire={revealed} />
      </motion.div>

      {/* ── العنوان والتلميح (قبل الفتح) ── */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="controls"
            className="relative mt-10 flex flex-col items-center sm:mt-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            <h1 className="font-ruqaa text-5xl font-normal leading-snug text-ivory sm:text-6xl">
              {subtitle}
            </h1>
            <p className="mt-4 font-latin text-[0.7rem] uppercase tracking-luxe text-champagne/60">
              {brand.replace(/_/g, ' ')}
            </p>
            <motion.p
              className="mt-7 font-body text-sm font-light text-champagne/70"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✦ {ui.openInvitation} ✦
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── سهم التمرير بعد الفتح ── */}
      <AnimatePresence>
        {revealed && (
          <motion.a
            key="scrollcue"
            href="#countdown"
            className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-taupe dark:text-champagne/60"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.6 }}
          >
            <span className="font-body text-xs font-light">{ui.scroll}</span>
            <motion.span
              className="block h-9 w-px bg-gradient-to-b from-beige-deep to-transparent"
              animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  )
}
