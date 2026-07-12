import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface ParticlesProps {
  /** When true, particles drift more actively (during & after the bloom). */
  active: boolean
  count?: number
}

/** Soft, slow-floating light motes for ambient luxury sparkle. */
export function Particles({ active, count = 16 }: ParticlesProps) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 6,
        drift: 14 + Math.random() * 26,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {motes.map((m) => (
        <motion.span
          key={m.id}
          className="absolute rounded-full"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            background:
              'radial-gradient(circle, rgba(255,253,248,0.95) 0%, rgba(216,195,165,0.5) 55%, rgba(216,195,165,0) 100%)',
            boxShadow: '0 0 8px rgba(216,195,165,0.55)',
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: active ? [0, 0.9, 0] : [0, 0.35, 0],
            y: [0, -m.drift, 0],
            x: [0, m.drift * 0.4, 0],
          }}
          transition={{
            duration: active ? m.duration * 0.7 : m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
