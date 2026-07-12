import { KaftanBloom } from './components/bloom/KaftanBloom'
import { Countdown } from './components/sections/Countdown'
import { Location } from './components/sections/Location'
import { Connect } from './components/sections/Connect'
import { Gallery } from './components/sections/Gallery'
import { Welcome } from './components/sections/Welcome'
import { siteContent } from './config/content'

export default function App() {
  return (
    <div className="bg-ambient min-h-screen font-body text-ink">
      <main>
        {/* Signature hero: the kaftan ring blooms open */}
        <KaftanBloom />

        {/* Revealed sections */}
        <Countdown />
        <Location />
        <Connect />
        <Gallery />
        <Welcome />
      </main>

      <footer className="border-t border-beige-deep/25 px-6 py-10 text-center">
        <p className="font-body text-[0.62rem] uppercase tracking-luxe text-taupe">
          {siteContent.brand.replace(/_/g, ' ')} · {siteContent.location.label}
        </p>
        <p className="mt-2 font-body text-[0.6rem] text-taupe/70">
          Grand Opening — with love and elegance
        </p>
      </footer>
    </div>
  )
}
