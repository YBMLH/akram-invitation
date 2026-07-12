import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useState } from 'react'
import type { PointerEvent } from 'react'
import { siteContent } from '../../config/content'
import { PETALS } from './petals'
import { Particles } from './Particles'
import { InvitationCard } from './InvitationCard'

type Phase = 'idle' | 'blooming' | 'revealed'

const ease = [0.22, 1, 0.36, 1] as const
/** Outward petal travel, as a % of the stage size. */
const OUT_PCT = 16
/** Uniform swirl applied to every petal — the iris-opening twist. */
const SWIRL_DEG = 12

export function KaftanBloom() {
  const [phase, setPhase] = useState<Phase>('idle')
  const { brand, subtitle, images, ui } = siteContent

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

        {/* Rotating group of petals (reconstructs the ring) */}
        <div
          className="animate-spinSlow absolute inset-0"
          style={{ animationPlayState: phase === 'idle' ? 'running' : 'paused' }}
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

        {/* Logo medallion in the empty centre (wrapper centers; motion animates inside) */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-20"
          style={{ width: '35%', transform: 'translate(-50%, -50%)' }}
        >
          <motion.img
            src={images.logo}
            alt={`${brand} logo`}
            className="block w-full select-none drop-shadow-[0_0_30px_rgba(233,218,187,0.35)]"
            draggable={false}
            initial={false}
            animate={{ opacity: bloomed ? 0 : 1, scale: bloomed ? 0.55 : 1 }}
            transition={{ duration: 0.6, ease }}
          />
        </div>

        {/* Ambient light motes */}
        <Particles active={bloomed} />

        {/* The invitation card rises through the opened petals */}
        <InvitationCard show={revealed} />
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

            <motion.button
              type="button"
              onClick={open}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 border border-champagne/50 bg-transparent px-12 py-4 font-body text-base font-light text-champagne transition-colors duration-500 hover:border-champagne hover:bg-champagne hover:text-noir focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-noir"
            >
              {ui.openInvitation}
            </motion.button>
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
