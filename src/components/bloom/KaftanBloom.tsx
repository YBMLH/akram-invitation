import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { PointerEvent } from 'react'
import { siteContent } from '../../config/content'
import { PETALS } from './petals'
import { Particles } from './Particles'
import { InvitationCard } from './InvitationCard'
import { StarBurst } from './StarBurst'
import { useThemeCtx } from '../../context/theme'

type Phase = 'idle' | 'blooming' | 'revealed'

const ease = [0.22, 1, 0.36, 1] as const

/** 28px blurred stand-in shown instantly while the real ring downloads. */
const RING_PLACEHOLDER =
  'data:image/webp;base64,UklGRqYBAABXRUJQVlA4IJoBAABwCACdASocABwAPu1qrVCppaQiqAqpMB2JaACsM1j1R8gkQOwHPn3xZifOz9D+wH0gPQA/S8KI88HWGOT99KZrFl6Wjz1mJW4WQwgAAP70lin+2lLs1DGG81DwPyuGi3Q0Qkv+v7AN0/rTjlw/rkVE4VoFPfL0XRmQRCNrFJ28K3SQd0x7E9q31e2Z169iKGhWfh7iG7MuIhuyiJhbLhyDmDg5GsRRD8e1pMmQ/IJ22s+EfUQJaE8bhMC58Rs4/Oep0DylM5KSeRbB9srC9VqCHePiMy9SrB3xFFuDkT1pE5Mt+9lqAAsOsrddIAjDf0Y+XZg70sX1MPiPxWiR22IhY3//nXMH9tE3rcvmktv+nYMNeY7v6TUNCbhzluXhELFf1h5nXML99y0uRMf3uPyuUBg8aKVoWBcn0MrxtHU8dvEPZ3vKs83H3SDfymFyCnNe4x7rGsGPIbVkckuWj4ZFThF6A94nkRHMxPHxy7deTsqfVCV8oPBWWQ6traEVLdUDlpOccUWaLF6wdXTSsdLXMKQ9uBmKD/4mAA=='
/** Outward petal travel, as a % of the stage size. */
const OUT_PCT = 16
/** Uniform swirl applied to every petal — the iris-opening twist. */
const SWIRL_DEG = 12

export function KaftanBloom() {
  const [phase, setPhase] = useState<Phase>('idle')
  const { brand, subtitle, images, ui } = siteContent
  const { setTheme } = useThemeCtx()
  const [ringReady, setRingReady] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setRingReady(true)
    img.src = images.kaftanCircle
    if (img.complete) setRingReady(true)
  }, [images.kaftanCircle])

  const bloomed = phase !== 'idle'
  const revealed = phase === 'revealed'

  // Interactive 3D tilt: the ring leans gently toward the pointer.
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 60, damping: 14 })
  const rotateY = useSpring(tiltY, { stiffness: 60, damping: 14 })

  function handleTilt(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
  }

  function resetTilt() {
    tiltX.set(0)
    tiltY.set(0)
  }

  function open() {
    if (phase !== 'idle') return
    // The unveiling always blooms into daylight.
    setTheme('light')
    setPhase('blooming')
    // Let the petals finish opening, then float the card in.
    window.setTimeout(() => setPhase('revealed'), 1500)
  }

  return (
    <section
      id="invitation"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16"
    >
      {/* ── Night atelier: warm darkness that dissolves into daylight on bloom ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 50% 42%, #2A2118 0%, #1D1712 46%, #171310 100%)',
        }}
        initial={false}
        animate={{ opacity: bloomed ? 0 : 1 }}
        transition={{ duration: 2, ease, delay: bloomed ? 0.55 : 0 }}
        aria-hidden
      />

      {/* Vertical editorial rails (desktop only, Latin brand marks) */}
      <AnimatePresence>
        {!bloomed && (
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

      {/* Brand eyebrow above the ring */}
      <AnimatePresence>
        {!bloomed && (
          <motion.p
            key="eyebrow"
            className="relative mb-8 text-center font-body text-base font-light text-champagne/80 sm:mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.9, ease }}
          >
            {ui.invitedEyebrow}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── The stage: kaftan ring + logo + card ── */}
      <motion.div
        className="relative aspect-square"
        style={{
          width: 'min(88vw, 60vh, 600px)',
          rotateX,
          rotateY,
          transformPerspective: 1100,
        }}
        onPointerMove={handleTilt}
        onPointerLeave={resetTilt}
        animate={{ scale: bloomed ? 1.08 : 1 }}
        transition={{ duration: 1.6, ease }}
      >
        {/* spotlight halo behind the ring */}
        <motion.div
          className="pointer-events-none absolute inset-[-16%] rounded-full blur-3xl"
          initial={false}
          animate={{ opacity: bloomed ? 0.9 : 0.55 }}
          transition={{ duration: 1.6, ease }}
          style={{
            background:
              'radial-gradient(circle, rgba(233,218,187,0.5) 0%, rgba(194,168,126,0.18) 48%, rgba(194,168,126,0) 72%)',
          }}
          aria-hidden
        />

        {/* golden shockwave ring released at the moment of bloom */}
        <AnimatePresence>
          {bloomed && (
            <motion.div
              key="halo"
              className="pointer-events-none absolute inset-0 rounded-full border border-gold/70"
              initial={{ scale: 0.55, opacity: 0 }}
              animate={{ scale: 1.45, opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.4, ease }}
              aria-hidden
            />
          )}
        </AnimatePresence>

        {/* Instant blurred stand-in while the ring image downloads */}
        <div
          className="pointer-events-none absolute inset-[4%] rounded-full transition-opacity duration-700"
          style={{
            backgroundImage: `url(${RING_PLACEHOLDER})`,
            backgroundSize: '100% 100%',
            filter: 'blur(14px)',
            opacity: ringReady ? 0 : 0.85,
          }}
          aria-hidden
        />

        {/* Rotating group of petals (reconstructs the ring) */}
        <div
          className="animate-spinSlow absolute inset-0 transition-opacity duration-700"
          style={{
            animationPlayState: phase === 'idle' ? 'running' : 'paused',
            opacity: ringReady ? 1 : 0,
          }}
        >
          {PETALS.map((p) => (
            <motion.div
              key={p.index}
              className="absolute inset-0 will-change-transform"
              style={{
                clipPath: p.clipPath,
                backgroundImage: `url(${images.kaftanCircle})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                filter: 'drop-shadow(0 12px 26px rgba(15,10,5,0.35))',
              }}
              initial={false}
              animate={
                bloomed
                  ? {
                      x: `${p.dx * OUT_PCT}%`,
                      y: `${p.dy * OUT_PCT}%`,
                      rotate: SWIRL_DEG,
                      scale: 1.03,
                    }
                  : { x: '0%', y: '0%', rotate: 0, scale: 1 }
              }
              transition={{
                duration: 1.35,
                ease,
                delay: bloomed ? 0.2 + p.index * 0.05 : 0,
              }}
            />
          ))}
        </div>

        {/* Slow golden sheen sweeping around the ring while it waits */}
        {phase === 'idle' && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(233,218,187,0.28) 18deg, transparent 42deg)',
              WebkitMaskImage:
                'radial-gradient(circle, transparent 38%, black 43%, black 84%, transparent 88%)',
              maskImage:
                'radial-gradient(circle, transparent 38%, black 43%, black 84%, transparent 88%)',
              mixBlendMode: 'soft-light',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          />
        )}

        {/* The logo medallion IS the button — tap it to open the invitation */}
        <div
          className={`absolute left-1/2 top-1/2 z-20 ${bloomed ? 'pointer-events-none' : ''}`}
          style={{ width: '35%', transform: 'translate(-50%, -50%)' }}
        >
          <motion.button
            type="button"
            onClick={open}
            disabled={bloomed}
            aria-label={ui.openInvitation}
            className="relative block w-full rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
            initial={false}
            animate={{ opacity: bloomed ? 0 : 1, scale: bloomed ? 0.55 : 1 }}
            whileHover={bloomed ? undefined : { scale: 1.06 }}
            whileTap={bloomed ? undefined : { scale: 0.93 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* inviting pulse ring */}
            {!bloomed && (
              <motion.span
                className="absolute -inset-3 rounded-full border border-champagne/50"
                animate={{ scale: [1, 1.18], opacity: [0.7, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                aria-hidden
              />
            )}
            {/* grounding shadow underneath the button */}
            <span
              className="absolute -bottom-5 left-1/2 h-5 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/45 blur-md"
              aria-hidden
            />
            <img
              src={images.logo}
              alt={`${brand} logo`}
              className="relative block w-full select-none rounded-full shadow-[0_28px_55px_-18px_rgba(0,0,0,0.7)] drop-shadow-[0_0_30px_rgba(233,218,187,0.35)]"
              draggable={false}
            />
          </motion.button>
        </div>

        {/* Ambient light motes */}
        <Particles active={bloomed} />

        {/* The invitation card rises through the opened petals */}
        <InvitationCard show={revealed} />

        {/* Stars erupt from the logo as the card appears */}
        <StarBurst fire={revealed} />
      </motion.div>

      {/* ── Idle controls: subtitle + open button ── */}
      <AnimatePresence>
        {!bloomed && (
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
              className="mt-8 font-body text-sm font-light text-champagne/70"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✦ {ui.openInvitation} ✦
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll cue after reveal ── */}
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
