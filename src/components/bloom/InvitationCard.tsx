import { motion } from 'framer-motion'
import { siteContent } from '../../config/content'

interface InvitationCardProps {
  show: boolean
}

const ease = [0.22, 1, 0.36, 1] as const

/** تدرّج ذهبي للنصوص الفاخرة */
const goldText = {
  backgroundImage: 'linear-gradient(180deg,#f6e2b0 0%,#e4c377 45%,#c9a24e 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const

function CalendarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/** بطاقة الدعوة — خلفية عنّابية وذهب، بأقل قدر من النص */
export function InvitationCard({ show }: InvitationCardProps) {
  const { brand, invitation, images } = siteContent

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-[min(86vw,25rem)]"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <motion.article
        initial={false}
        animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.94 }}
        transition={{ duration: 1.1, ease, delay: show ? 0.15 : 0 }}
        className="relative overflow-hidden rounded-[18px] px-8 py-11 text-center shadow-[0_50px_110px_-40px_rgba(40,6,18,0.85)] sm:px-10 sm:py-12"
        style={{ background: '#551327' }}
      >
        {/* الإطار الذهبي المزدوج */}
        <div
          className="pointer-events-none absolute inset-[10px] rounded-[12px] border"
          style={{ borderColor: 'rgba(201,162,78,0.75)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-[15px] rounded-[9px] border"
          style={{ borderColor: 'rgba(201,162,78,0.35)' }}
          aria-hidden
        />

        <div className="relative">
          {/* دعوة */}
          <h3 className="font-ruqaa text-5xl font-bold leading-none sm:text-6xl" style={goldText}>
            {invitation.headline}
          </h3>

          {/* سطر ترحيب قصير */}
          <p className="mx-auto mt-5 max-w-[17rem] font-body text-[0.9rem] font-light leading-relaxed text-[#f2ddc2]/85 text-balance">
            {invitation.welcome}
          </p>

          {/* فاصل ذهبي */}
          <div className="mx-auto my-7 flex items-center justify-center gap-3">
            <span className="h-px w-12" style={{ background: 'linear-gradient(90deg,transparent,#c9a24e)' }} />
            <span className="text-[0.7rem]" style={{ color: '#e4c377' }}>✦</span>
            <span className="h-px w-12" style={{ background: 'linear-gradient(90deg,#c9a24e,transparent)' }} />
          </div>

          {/* شعار الدار — الخط العربي الذهبي */}
          <img
            src={images.brandLogo}
            alt={invitation.brandArabic}
            className="mx-auto w-[72%] max-w-[15rem] select-none"
            draggable={false}
          />
          <p
            className="mt-3 flex items-center justify-center gap-3 font-latin text-sm font-medium tracking-[0.35em]"
            dir="ltr"
            style={{ color: '#dcb968' }}
          >
            <span className="h-px w-6" style={{ background: '#c9a24e80' }} />
            {brand}
            <span className="h-px w-6" style={{ background: '#c9a24e80' }} />
          </p>

          {/* سطر الدعوة الرسمي */}
          <p className="mx-auto mt-7 max-w-[18rem] font-body text-[0.95rem] font-light leading-relaxed text-[#f2ddc2]/90 text-balance">
            {invitation.intro}
          </p>
          <p className="mt-1 font-body text-[0.95rem] font-light text-[#f2ddc2]/90">
            {invitation.subtitle}
          </p>

          {/* التاريخ */}
          <div className="mt-7 flex items-center justify-center gap-3" style={{ color: '#e4c377' }}>
            <CalendarGlyph className="h-5 w-5" />
            <span className="font-display text-xl text-[#f2ddc2]">
              {invitation.dayLabel} · {invitation.dateLabel}
            </span>
          </div>
          <p className="mt-1.5 font-body text-sm font-light text-[#f2ddc2]/70">
            {invitation.timeLabel} — {invitation.locationLabel}
          </p>

          {/* سطر الختام */}
          <div className="mx-auto mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-10" style={{ background: 'linear-gradient(90deg,transparent,#c9a24e)' }} />
            <span className="text-[0.65rem]" style={{ color: '#e4c377' }}>✦</span>
            <span className="h-px w-10" style={{ background: 'linear-gradient(90deg,#c9a24e,transparent)' }} />
          </div>
          <p className="mt-4 font-ruqaa text-2xl leading-snug" style={goldText}>
            {invitation.closing}
          </p>
        </div>
      </motion.article>
    </div>
  )
}
