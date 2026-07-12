import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { siteContent } from '../../config/content'
import { PETALS } from './petals'
import { Particles } from './Particles'
import { InvitationCard } from './InvitationCard'

type Phase = 'idle' | 'blooming' | 'revealed'

const ease = [0.22, 1, 0.36, 1] as const
/** Outward petal travel, as a % of the stage size. */
const OUT_PCT = 15

export function KaftanBloom() {
  const [phase, setPhase] = useState<Phase>('idle')
  const { brand, subtitle, images } = siteContent

  const bloomed = phase !== 'idle'
  const revealed = phase === 'revealed'

  function open() {
    if (phase !== 'idle') return
    setPhase('blooming')
    // Let the petals finish opening, then float the card in.
    window.setTimeout(() => setPhase('revealed'), 1350)
  }

  return (
    <section
      id="invitation"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-16"
    >
      {/* Brand eyebrow above the ring */}
      <AnimatePresence>
        {!bloomed && (
          <motion.p
            key="eyebrow"
            className="mb-8 text-center font-body text-[0.7rem] uppercase tracking-luxe text-taupe sm:mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.9, ease }}
          >
            You are cordially invited
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── The stage: kaftan ring + logo + card ── */}
      <motion.div
        className="relative aspect-square"
        style={{ width: 'min(90vw, 62vh, 620px)' }}
        animate={{ scale: bloomed ? 1.08 : 1 }}
        transition={{ duration: 1.5, ease }}
      >
        {/* soft ambient halo */}
        <div
          className="pointer-events-none absolute inset-[-14%] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,253,248,0.9) 0%, rgba(216,195,165,0.35) 45%, rgba(216,195,165,0) 72%)',
          }}
          aria-hidden
        />

        {/* grounding shadow */}
        <div
          className="pointer-events-none absolute bottom-[6%] left-1/2 h-8 w-[62%] -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{ background: 'rgba(60,45,25,0.20)' }}
          aria-hidden
        />

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
                filter: 'drop-shadow(0 10px 22px rgba(60,45,25,0.16))',
              }}
              initial={false}
              animate={
                bloomed
                  ? {
                      x: `${p.dx * OUT_PCT}%`,
                      y: `${p.dy * OUT_PCT}%`,
                      scale: 1.03,
                    }
                  : { x: '0%', y: '0%', scale: 1 }
              }
              transition={{
                duration: 1.2,
                ease,
                delay: bloomed ? 0.25 + p.index * 0.055 : 0,
              }}
            />
          ))}
        </div>

        {/* Logo in the empty centre (wrapper centers; motion animates inside) */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-20"
          style={{ width: '35%', transform: 'translate(-50%, -50%)' }}
        >
          <motion.img
            src={images.logo}
            alt={`${brand} logo`}
            className="block w-full select-none"
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
            className="mt-10 flex flex-col items-center sm:mt-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            <h1 className="font-display text-5xl font-light tracking-wide text-ink sm:text-6xl">
              {subtitle}
            </h1>
            <p className="mt-3 font-body text-[0.72rem] uppercase tracking-luxe text-taupe">
              {brand.replace(/_/g, ' ')}
            </p>

            <button
              type="button"
              onClick={open}
              className="group relative mt-9 overflow-hidden rounded-full border border-ink/80 bg-ink px-10 py-4 font-body text-[0.72rem] uppercase tracking-wide2 text-ivory transition-colors duration-500 hover:bg-transparent hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-beige-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <span className="relative z-10">Open Invitation</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll cue after reveal ── */}
      <AnimatePresence>
        {revealed && (
          <motion.a
            key="scrollcue"
            href="#countdown"
            className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-taupe"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.6 }}
          >
            <span className="font-body text-[0.6rem] uppercase tracking-luxe">Scroll</span>
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
