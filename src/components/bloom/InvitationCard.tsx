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
      className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-[min(84vw,29rem)]"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <motion.article
        initial={false}
        animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.94 }}
        transition={{ duration: 1.1, ease, delay: show ? 0.15 : 0 }}
      >
        <div className="relative border border-ink/15 bg-ivory/95 px-7 py-10 text-center shadow-[0_40px_90px_-35px_rgba(30,22,12,0.55)] backdrop-blur-sm sm:px-12 sm:py-12">
          {/* inner hairline frame — the double mat of a couture invitation */}
          <div className="pointer-events-none absolute inset-2 border border-beige-deep/45" />

          <div className="relative">
            <p className="font-body text-[0.6rem] uppercase tracking-luxe text-taupe">
              {invitation.eyebrow}
            </p>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-wide2 text-ink sm:text-[1.7rem]">
              {brand.replace(/_/g, ' ')}
            </h3>

            <div className="mx-auto my-5 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-beige-deep/60" />
              <span className="font-display text-xs text-gold">✦</span>
              <span className="h-px w-10 bg-beige-deep/60" />
            </div>

            <p className="font-script text-4xl text-gold sm:text-[2.6rem]">Grand Opening</p>

            <div className="mt-6 space-y-4">
              {invitation.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-body text-[0.92rem] font-light leading-relaxed text-ink/75 text-balance"
                >
                  {p}
                </p>
              ))}
            </div>

            <p className="mt-7 font-display text-lg italic text-ink/80">
              {invitation.locationLabel}
            </p>

            <p className="mt-4 font-body text-[0.8rem] font-light leading-relaxed text-taupe text-balance">
              {invitation.closing}
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  )
}
