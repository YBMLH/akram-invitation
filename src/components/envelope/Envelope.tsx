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

/** ارتفاع اللسان / نقطة الختم كنسبة من ارتفاع الشاشة */
const FLAP_TIP = 50

/** نسيج ورقي خفيف */
const PAPER_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)' opacity='0.5'/%3E%3C/svg%3E\")"

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
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 5)
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 5)
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
    // اللسان يُفتح ويتلاشى الظرف ثم تظهر البطاقة
    window.setTimeout(() => setPhase('revealed'), 1400)
  }

  return (
    <section
      id="invitation"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* هالة ضوء دافئة خلف الظرف */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={{ opacity: opened ? 1 : 0.9 }}
        transition={{ duration: 1.4, ease }}
        style={{
          background:
            'radial-gradient(70% 55% at 50% 46%, rgba(233,218,187,0.35) 0%, rgba(194,168,126,0) 70%)',
        }}
        aria-hidden
      />

      {/* ── الظرف بملء الشاشة ── */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ rotateX, rotateY, transformPerspective: 1400, transformStyle: 'preserve-3d' }}
        onPointerMove={handleTilt}
        onPointerLeave={resetTilt}
        initial={false}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.7, ease, delay: revealed ? 0 : 0 }}
      >
        {/* جسم الظرف */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #F7F1E5 0%, #EFE7D6 100%)' }}
        />

        {/* البطانة الداخلية (تظهر عند فتح اللسان) */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: `${FLAP_TIP}%`,
            background: 'linear-gradient(180deg, #DED0B6 0%, #EADEC7 100%)',
          }}
        />

        {/* الطيّتان الجانبيتان */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 0, 0 100%, 52% 50%)',
            background: 'linear-gradient(105deg, #FCF7EC 0%, #EFE6D2 88%)',
            filter: 'drop-shadow(1px 0 1px rgba(120,100,70,0.16))',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 48% 50%)',
            background: 'linear-gradient(255deg, #FCF7EC 0%, #EFE6D2 88%)',
            filter: 'drop-shadow(-1px 0 1px rgba(120,100,70,0.16))',
          }}
        />

        {/* الطية السفلية */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 100%, 100% 100%, 50% 42%)',
            background: 'linear-gradient(0deg, #FFFDF8 0%, #F3EBDB 92%)',
            filter: 'drop-shadow(0 -1px 1px rgba(120,100,70,0.2))',
          }}
        />

        {/* نسيج ورقي خفيف */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
          style={{ backgroundImage: PAPER_TEXTURE, backgroundSize: '180px 180px' }}
          aria-hidden
        />

        {/* السطر التمهيدي على اللسان (فوق الختم) */}
        <motion.p
          className="absolute inset-x-0 top-[13%] z-[25] text-center font-body text-sm font-light tracking-wide text-ink/50 sm:text-base"
          initial={false}
          animate={{ opacity: opened ? 0 : 1 }}
          transition={{ duration: 0.5, ease }}
        >
          {ui.invitedEyebrow}
        </motion.p>

        {/* سطر الإهداء أسفل الختم */}
        <motion.p
          className="absolute inset-x-0 text-center font-ruqaa text-2xl text-ink/70 sm:text-3xl"
          style={{ top: `${FLAP_TIP + 12}%` }}
          initial={false}
          animate={{ opacity: opened ? 0 : 1 }}
          transition={{ duration: 0.5, ease }}
        >
          {ui.sealNote}
        </motion.p>

        {/* التلميح النابض */}
        <motion.p
          className="absolute inset-x-0 text-center font-body text-sm font-light text-ink/50"
          style={{ top: `${FLAP_TIP + 24}%` }}
          initial={false}
          animate={opened ? { opacity: 0 } : { opacity: [0.45, 0.9, 0.45] }}
          transition={
            opened
              ? { duration: 0.4, ease }
              : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          ✦ {ui.openInvitation} ✦
        </motion.p>

        {/* ── اللسان العلوي (يدور حول حافته العليا) ── */}
        <motion.div
          className="absolute inset-x-0 top-0 z-20"
          style={{
            height: `${FLAP_TIP}%`,
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            transformPerspective: 1200,
          }}
          initial={false}
          animate={{ rotateX: opened ? -179 : 0 }}
          transition={{ duration: 0.9, ease, delay: opened ? 0.25 : 0 }}
        >
          {/* الوجه الخارجي */}
          <div
            className="absolute inset-0 [backface-visibility:hidden]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(180deg, #FFFDF8 0%, #F1E8D6 80%, #E6DAC2 100%)',
              filter: 'drop-shadow(0 4px 6px rgba(90,70,45,0.24))',
            }}
          />
          {/* الوجه الداخلي */}
          <div
            className="absolute inset-0 [backface-visibility:hidden]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(0deg, #E2D3B7 0%, #D7C6A4 100%)',
              transform: 'rotateX(180deg)',
            }}
          />
        </motion.div>

        {/* ── الختم الشمعي على طرف اللسان — هو الزر ── */}
        <div
          className="absolute left-1/2 z-30"
          style={{
            top: `${FLAP_TIP}%`,
            width: 'min(34vw, 188px)',
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
                ? { opacity: 0, scale: 1.3, rotate: [0, -8, 7, 0] }
                : { opacity: 1, scale: 1, rotate: 0 }
            }
            whileHover={opened ? undefined : { scale: 1.07 }}
            whileTap={opened ? undefined : { scale: 0.92 }}
            transition={{ duration: 0.5, ease }}
          >
            {/* حلقة نبض تدعو للضغط */}
            {!opened && (
              <motion.span
                className="absolute -inset-3 rounded-full border border-gold/50"
                animate={{ scale: [1, 1.22], opacity: [0.7, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                aria-hidden
              />
            )}
            {/* ظل تحت الختم */}
            <span
              className="absolute -bottom-3 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/45 blur-md"
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

      {/* تظليل خفيف للأطراف يرتفع عند الفتح (عمق ودفء) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        initial={false}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: 1.2, ease }}
        style={{
          background:
            'radial-gradient(75% 60% at 50% 48%, rgba(20,14,8,0) 45%, rgba(20,14,8,0.28) 100%)',
        }}
        aria-hidden
      />

      {/* ذرات ضوء */}
      <Particles active={opened} />

      {/* ── البطاقة تظهر بعد تلاشي الظرف ── */}
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
