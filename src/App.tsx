import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Preloader } from './components/ui/Preloader'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { Marquee } from './components/ui/Marquee'
import { KaftanBloom } from './components/bloom/KaftanBloom'
import { Countdown } from './components/sections/Countdown'
import { Location } from './components/sections/Location'
import { Connect } from './components/sections/Connect'
import { Gallery } from './components/sections/Gallery'
import { Welcome } from './components/sections/Welcome'
import { siteContent } from './config/content'

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

export default function App() {
  const [loading, setLoading] = useState(true)

  // Hold the curtain until the hero imagery is actually ready:
  // at least 1.6s for the monogram moment, at most 6s on a slow network.
  useEffect(() => {
    let alive = true
    const minimum = new Promise((r) => setTimeout(r, 1600))
    const images = Promise.all(
      [siteContent.images.kaftanCircle, siteContent.images.logo].map(preloadImage),
    )
    const cap = new Promise((r) => setTimeout(r, 6000))
    Promise.all([minimum, Promise.race([images, cap])]).then(() => {
      if (alive) setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="bg-ambient min-h-screen font-body text-ink transition-colors duration-500 dark:text-[#EDE3CF]">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

      <ScrollProgress />
      <ThemeToggle />

      <main>
        {/* Signature hero: night atelier — the kaftan ring blooms into daylight */}
        <KaftanBloom />

        <Marquee />

        {/* Revealed sections */}
        <Countdown />
        <Location />
        <Connect />
        <Gallery />
        <Welcome />
      </main>

      <footer className="border-t border-beige-deep/30 px-6 py-10 text-center transition-colors duration-500 dark:border-gold/25">
        <p className="font-display text-[0.7rem] text-gold">✦</p>
        <p className="mt-3 font-latin text-[0.6rem] uppercase tracking-luxe text-taupe dark:text-champagne/50" dir="ltr">
          {siteContent.brand.replace(/_/g, ' ')}
        </p>
        <p className="mt-2 font-body text-xs font-light text-taupe/80 dark:text-champagne/40">
          {siteContent.ui.footerNote}
        </p>
      </footer>
    </div>
  )
}
