import { motion } from 'framer-motion'
import { siteContent } from '../../config/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  )
}

function WhatsappGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.66 14.05c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.45-.72-2.9-1.14-4.75-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.97s.74-2.11 1-2.4c.26-.29.57-.36.76-.36l.54.01c.18.01.42-.07.66.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.29.74 1.22 1.59 1.98 1.1.98 2.02 1.28 2.31 1.42.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.66-.14.27.1 1.7.8 1.99.95.29.14.48.21.55.33.07.12.07.69-.17 1.36Z" />
    </svg>
  )
}

/** بطاقة إنستغرام — معاينة الصفحة بأسلوب أبل الأنيق */
function InstagramCard() {
  const { social, images, ui } = siteContent
  const ig = social.instagram
  const stats = [
    { n: ig.posts, l: ui.connect.posts },
    { n: ig.followers, l: ui.connect.followers },
    { n: ig.following, l: ui.connect.following },
  ]
  return (
    <motion.a
      href={ig.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease }}
      className="group flex h-full flex-col rounded-[28px] border border-black/5 bg-white/80 p-6 shadow-[0_20px_60px_-30px_rgba(30,22,12,0.45)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(30,22,12,0.6)] dark:border-white/10 dark:bg-white/[0.06] sm:p-7"
    >
      {/* رأس الملف الشخصي */}
      <div className="flex items-center gap-4">
        <span className="rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] p-[2.5px]">
          <span className="block rounded-full bg-white p-[2px] dark:bg-[#3a0d18]">
            <img
              src={images.logo}
              alt=""
              className="h-14 w-14 rounded-full object-cover"
              loading="lazy"
            />
          </span>
        </span>
        <div className="min-w-0 flex-1" dir="ltr">
          <p className="truncate font-latin text-lg font-medium text-ink dark:text-champagne">
            {ig.name}
          </p>
          <p className="truncate font-body text-sm text-taupe dark:text-champagne/50">
            {ig.handle}
          </p>
        </div>
        <InstagramGlyph className="h-6 w-6 shrink-0 text-[#d62976]" />
      </div>

      {/* الإحصائيات */}
      <div className="mt-6 grid grid-cols-3 rounded-2xl bg-black/[0.03] py-3 dark:bg-white/[0.04]" dir="ltr">
        {stats.map((s, i) => (
          <div
            key={s.l}
            className={`flex flex-col items-center ${i < 2 ? 'border-e border-black/5 dark:border-white/10' : ''}`}
          >
            <span className="font-latin text-lg font-semibold tabular-nums text-ink dark:text-champagne">
              {s.n}
            </span>
            <span className="mt-0.5 font-body text-[0.7rem] text-taupe dark:text-champagne/50">
              {s.l}
            </span>
          </div>
        ))}
      </div>

      {/* النبذة */}
      <p className="mt-4 flex-1 text-center font-body text-sm font-light leading-relaxed text-ink/70 text-balance dark:text-champagne/70">
        {ig.bio}
      </p>

      {/* زر المتابعة */}
      <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] px-6 py-3 font-body text-sm font-medium text-white shadow-[0_10px_25px_-8px_rgba(214,41,118,0.7)] transition-transform duration-300 group-hover:scale-[1.03]">
        <InstagramGlyph className="h-4 w-4" />
        {ui.connect.follow}
      </span>
    </motion.a>
  )
}

/** بطاقة واتساب — بأسلوب أبل مع لون الشعار الأخضر */
function WhatsappCard() {
  const { social, ui } = siteContent
  const wa = social.whatsapp
  return (
    <motion.a
      href={wa.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease }}
      className="group flex h-full flex-col items-center rounded-[28px] border border-black/5 bg-white/80 p-6 text-center shadow-[0_20px_60px_-30px_rgba(30,22,12,0.45)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(37,211,102,0.35)] dark:border-white/10 dark:bg-white/[0.06] sm:p-7"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#25D366] text-white shadow-[0_12px_28px_-8px_rgba(37,211,102,0.8)]">
        <WhatsappGlyph className="h-9 w-9" />
      </span>

      <p className="mt-5 font-body text-sm font-light text-taupe dark:text-champagne/50">
        {ui.connect.whatsapp}
      </p>
      <p className="mt-1 font-latin text-2xl font-medium tabular-nums text-ink dark:text-champagne" dir="ltr">
        {wa.number}
      </p>
      <p className="mt-1 font-body text-sm font-light text-ink/60 dark:text-champagne/60">
        {wa.label}
      </p>

      <span className="mt-auto pt-6">
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-body text-sm font-medium text-white shadow-[0_10px_25px_-8px_rgba(37,211,102,0.8)] transition-transform duration-300 group-hover:scale-[1.03]">
          <WhatsappGlyph className="h-4 w-4" />
          {ui.connect.message}
        </span>
      </span>
    </motion.a>
  )
}

export function Connect() {
  const { ui } = siteContent

  return (
    <section id="connect" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow={ui.connect.eyebrow} title={ui.connect.title} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <InstagramCard />
          </Reveal>
          <Reveal delay={0.08}>
            <WhatsappCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
