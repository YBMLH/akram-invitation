import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Preloader } from './components/ui/Preloader'
import { Marquee } from './components/ui/Marquee'
import { KaftanBloom } from './components/bloom/KaftanBloom'
import { Countdown } from './components/sections/Countdown'
import { Location } from './components/sections/Location'
import { Connect } from './components/sections/Connect'
import { Gallery } from './components/sections/Gallery'
import { Welcome } from './components/sections/Welcome'
import { siteContent } from './config/content'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 2100)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="bg-ambient min-h-screen font-body text-ink">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

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

      <footer className="border-t border-beige-deep/30 px-6 py-10 text-center">
        <p className="font-display text-[0.7rem] text-gold">✦</p>
        <p className="mt-3 font-latin text-[0.6rem] uppercase tracking-luxe text-taupe" dir="ltr">
          {siteContent.brand.replace(/_/g, ' ')}
        </p>
        <p className="mt-2 font-body text-xs font-light text-taupe/80">
          {siteContent.ui.footerNote}
        </p>
      </footer>
    </div>
  )
}
