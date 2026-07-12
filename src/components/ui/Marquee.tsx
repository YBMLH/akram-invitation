import { siteContent } from '../../config/content'

/** شريط متحرك بأسلوب عروض الأزياء بين الواجهة وبقية الأقسام */
export function Marquee() {
  const items = siteContent.ui.marquee

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ivory/70 py-4 transition-colors duration-500 dark:border-champagne/10 dark:bg-noir/50">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center" aria-hidden={half === 1}>
            {Array.from({ length: 3 }).flatMap((_, rep) =>
              items.map((item, i) => (
                <span
                  key={`${rep}-${i}`}
                  className="flex items-center whitespace-nowrap font-body text-xs font-light text-taupe dark:text-champagne/50"
                >
                  <span className="px-6">{item}</span>
                  <span className="text-[0.55rem] text-beige-deep">✦</span>
                </span>
              )),
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
