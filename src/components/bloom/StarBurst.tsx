import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface StarBurstProps {
  /** When true, stars erupt once from the centre. */
  fire: boolean
}

/** Golden stars bursting out of the logo as the invitation card appears. */
export function StarBurst({ fire }: StarBurstProps) {
  const stars = useMemo(() => {
    if (!fire) return []
    return Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
      const dist = 110 + Math.random() * 200
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: 0.7 + Math.random() * 1.1,
        delay: 0.05 + Math.random() * 0.35,
        rot: (Math.random() - 0.5) * 200,
        glyph: i % 3 === 0 ? '✧' : '✦',
      }
    })
  }, [fire])

  if (!fire) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-40" aria-hidden>
      {stars.map((st) => (
        <motion.span
          key={st.id}
          className="absolute left-1/2 top-1/2 text-gold"
          style={{ fontSize: `${st.size}rem`, textShadow: '0 0 14px rgba(233,218,187,0.85)' }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{
            x: st.x,
            y: st.y,
            scale: [0, 1.2, 0.6],
            opacity: [0, 1, 0],
            rotate: st.rot,
          }}
          transition={{ duration: 1.8, delay: st.delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {st.glyph}
        </motion.span>
      ))}
    </div>
  )
}
