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

/** موضع طرف اللسان في الصورة (نسبة) — حيث يوضع الختم */
const TIP_X = 50
const TIP_Y = 55.4
/** أبعاد صور الظرف الأصلية */
const IMG_RATIO = 768 / 1388

export function Envelope() {
  const [phase, setPhase] = useState<Phase>('idle')
  const { images, ui } = siteContent
  const { setTheme } = useThemeCtx()

  const opened = phase !== 'idle'
  const revealed = phase === 'revealed'

  // إمالة ثلاثية الأبعاد لطيفة نحو المؤشر
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 60, damping: 16 })
  const rotateY = useSpring(tiltY, { stiffness: 60, damping: 16 })

  function handleTilt(e: PointerEvent<HTMLDivElement>) {
    if (opened) return
    const r = e.currentTarget.getBoundingClientRect()
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 4)
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 4)
  }

  function resetTilt() {
    tiltX.set(0)
    tiltY.set(0)
  }

  function open() {
    if (phase !== 'idle') return
    setTheme('light')
    setPhase('opening')
    window.setTimeout(() => setPhase('revealed'), 1250)
  }

  // صندوق يغطّي الشاشة مع الحفاظ على نسبة صورة الظرف
  const coverStyle = {
    width: `max(100vw, calc(100svh * ${IMG_RATIO}))`,
    aspectRatio: '768 / 1388',
  } as const

  return (
    <section
      id="invitation"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* هالة ضوء دافئة */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={false}
        animate={{ opacity: opened ? 1 : 0.85 }}
        transition={{ duration: 1.4, ease }}
        style={{
          background:
            'radial-gradient(70% 55% at 50% 46%, rgba(233,218,187,0.4) 0%, rgba(160,130,90,0) 72%)',
        }}
        aria-hidden
      />

      {/* ── مسرح الظرف (صورتان نظيفتان: جسم + لسان) ── */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10"
        style={{
          ...coverStyle,
          x: '-50%',
          y: '-50%',
          rotateX,
          rotateY,
          transformPerspective: 1600,
        }}
        onPointerMove={handleTilt}
        onPointerLeave={resetTilt}
      >
        {/* جسم الظرف — النصف السفلي ينزلق للأسفل */}
        <motion.img
          src={images.envelopeBody}
          alt=""
          className="absolute inset-0 h-full w-full select-none object-fill"
          draggable={false}
          initial={false}
          animate={{ y: opened ? '116%' : '0%' }}
          transition={{ duration: 1.25, ease: [0.5, 0, 0.5, 1], delay: opened ? 0.15 : 0 }}
        />

        {/* ── مجموعة اللسان + الختم — تنزلق للأعلى ── */}
        <motion.div
          className="absolute inset-0 z-20"
          initial={false}
          animate={{ y: opened ? '-116%' : '0%' }}
          transition={{ duration: 1.4, ease: [0.5, 0, 0.5, 1], delay: opened ? 0.1 : 0 }}
        >
          {/* اللسان */}
          <img
            src={images.envelopeFlap}
            alt=""
            className="absolute inset-0 h-full w-full select-none object-fill"
            draggable={false}
          />

          {/* السطر التمهيدي على اللسان */}
          <p className="absolute inset-x-0 top-[11%] text-center font-body text-sm font-light tracking-wide text-[#4a3a28]/70 sm:text-base">
            {ui.invitedEyebrow}
          </p>

          {/* الختم — الزر */}
          <div
            className="absolute z-30"
            style={{
              left: `${TIP_X}%`,
              top: `${TIP_Y}%`,
              width: 'min(26vw, 150px)',
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
              whileHover={opened ? undefined : { scale: 1.07 }}
              whileTap={opened ? undefined : { scale: 0.92 }}
              transition={{ duration: 0.3, ease }}
            >
              {!opened && (
                <motion.span
                  className="absolute -inset-3 rounded-full border border-[#5a4632]/40"
                  animate={{ scale: [1, 1.22], opacity: [0.6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                  aria-hidden
                />
              )}
              <span
                className="absolute -bottom-3 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/40 blur-md"
                aria-hidden
              />
              <img
                src={images.seal}
                alt=""
                className="relative block w-full select-none rounded-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)]"
                draggable={false}
              />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* التلميح النابض أسفل الشاشة */}
      <AnimatePresence>
        {!opened && (
          <motion.p
            key="hint"
            className="absolute bottom-[12%] left-1/2 z-30 -translate-x-1/2 text-center font-body text-sm font-light text-[#4a3a28]/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.45, 0.9, 0.45] }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease } }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✦ {ui.openInvitation} ✦
          </motion.p>
        )}
      </AnimatePresence>

      {/* ذرات ضوء */}
      <Particles active={opened} />

      {/* ── البطاقة تظهر بعد اختفاء الظرف ── */}
      <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
        <div className="relative">
          <InvitationCard show={revealed} />
          <StarBurst fire={revealed} />
        </div>
      </div>

      {/* ── سهم التمرير بعد الفتح ── */}
      <AnimatePresence>
        {revealed && (
          <motion.a
            key="scrollcue"
            href="#countdown"
            className="absolute bottom-7 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 text-taupe dark:text-champagne/60"
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
