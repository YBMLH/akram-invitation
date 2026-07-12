import { motion } from 'framer-motion'
import { siteContent } from '../../config/content'

interface InvitationCardProps {
  show: boolean
}

const ease = [0.22, 1, 0.36, 1] as const

/** The couture invitation card that rises through the opened petals. */
export function InvitationCard({ show }: InvitationCardProps) {
  const { brand, invitation } = siteContent

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-[min(84vw,30rem)]"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <motion.article
        initial={false}
        animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.94 }}
        transition={{ duration: 1.1, ease, delay: show ? 0.15 : 0 }}
      >
        <div className="relative rounded-[1.75rem] border border-beige-deep/40 bg-ivory/95 px-8 py-11 text-center shadow-[0_30px_80px_-30px_rgba(60,45,25,0.45)] backdrop-blur-sm sm:px-12 sm:py-12">
        {/* inner hairline frame */}
        <div className="pointer-events-none absolute inset-3 rounded-[1.3rem] border border-beige-deep/25" />

        <div className="relative">
          <p className="font-body text-[0.62rem] uppercase tracking-luxe text-taupe">
            {invitation.eyebrow}
          </p>
          <h3 className="mt-3 font-display text-2xl font-medium tracking-wide2 text-ink sm:text-[1.7rem]">
            {brand}
          </h3>

          <div className="mx-auto my-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-beige-deep/60" />
            <span className="font-script text-2xl text-beige-deep">grand opening</span>
            <span className="h-px w-8 bg-beige-deep/60" />
          </div>

          <div className="space-y-4">
            {invitation.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-body text-[0.95rem] font-light leading-relaxed text-ink/75 text-balance"
              >
                {p}
              </p>
            ))}
          </div>

          <p className="mt-7 font-display text-lg italic text-ink/80">
            <span className="mr-1 not-italic">📍</span>
            {invitation.locationLabel}
          </p>

          <p className="mt-5 font-body text-[0.82rem] font-light leading-relaxed text-taupe text-balance">
            {invitation.closing}
          </p>
        </div>
        </div>
      </motion.article>
    </div>
  )
}
