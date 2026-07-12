const ITEMS = ['Grand Opening', 'Style by IB', 'Guelma · Algeria', 'Caftan Couture']

/** Fashion-week ticker between the hero and the story sections. */
export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ivory/70 py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center" aria-hidden={half === 1}>
            {Array.from({ length: 3 }).flatMap((_, rep) =>
              ITEMS.map((item, i) => (
                <span
                  key={`${rep}-${i}`}
                  className="flex items-center whitespace-nowrap font-body text-[0.62rem] uppercase tracking-wide2 text-taupe"
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
