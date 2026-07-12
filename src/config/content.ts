/**
 * ─────────────────────────────────────────────────────────────
 *  STYLE_BY_IB — Invitation content
 * ─────────────────────────────────────────────────────────────
 *  Everything the client may want to change lives in this file.
 *  Edit the values below — no other file needs to be touched.
 *
 *  • Countdown date .......... siteContent.event.dateISO
 *  • Social links ............ siteContent.social
 *  • Map / location .......... siteContent.location
 *  • Gallery photos .......... siteContent.gallery  (drop files in
 *                              /public/assets/gallery and list them)
 *  • Hero images ............. siteContent.images
 * ─────────────────────────────────────────────────────────────
 */

/**
 * Base URL for image assets.
 *  • ''                         → served from this site (public/assets/…)
 *  • 'https://cdn.example/pub'  → host assets on an external CDN / origin
 * The build injects VITE_ASSET_BASE if provided, otherwise same-origin.
 */
const ASSET_BASE = import.meta.env.VITE_ASSET_BASE ?? ''
const asset = (path: string) => `${ASSET_BASE}${path}`

export interface SiteContent {
  brand: string
  subtitle: string
  event: {
    /** ISO date/time of the grand opening — powers the countdown. */
    dateISO: string
  }
  invitation: {
    eyebrow: string
    title: string
    paragraphs: string[]
    locationLabel: string
    closing: string
  }
  location: {
    label: string
    /** Google Maps embed URL (no API key required). */
    mapEmbedSrc: string
    /** "Open in Google Maps" destination. */
    mapsLink: string
  }
  social: {
    instagram: { handle: string; url: string }
    whatsapp: { label: string; url: string }
  }
  welcome: {
    title: string
    /** Short Arabic greeting shown above the thank-you message. */
    arabic: string
    paragraphs: string[]
  }
  gallery: { src: string; caption: string }[]
  images: {
    /** Transparent kaftan ring — the hero centerpiece. */
    kaftanCircle: string
    /** Boutique logo shown in the centre of the ring. */
    logo: string
  }
}

export const siteContent: SiteContent = {
  brand: 'STYLE_BY_IB',
  subtitle: 'Grand Opening',

  event: {
    // ── Change this to your opening date & time ──
    dateISO: '2026-09-05T18:00:00',
  },

  invitation: {
    eyebrow: 'The house of',
    title: 'Grand Opening',
    paragraphs: [
      'You are cordially invited to celebrate the grand opening of Style_By_IB.',
      'Discover our exclusive collection of elegant kaftans and celebrate this special occasion with us.',
    ],
    locationLabel: 'Guelma, Algeria',
    closing:
      'We look forward to welcoming you and sharing this memorable moment together.',
  },

  location: {
    label: 'Guelma, Algeria',
    mapEmbedSrc: 'https://www.google.com/maps?q=Guelma,Algeria&z=13&output=embed',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Guelma%2C+Algeria',
  },

  social: {
    instagram: {
      handle: '@style_by_ib',
      url: 'https://instagram.com/style_by_ib',
    },
    whatsapp: {
      // ── Replace with the boutique's WhatsApp number (intl. format, no +) ──
      label: 'Chat with us',
      url: 'https://wa.me/213000000000',
    },
  },

  welcome: {
    title: 'With gratitude',
    arabic: 'أهلاً وسهلاً بكم',
    paragraphs: [
      'Thank you for being part of the Style_By_IB story.',
      'It would be our honour to welcome you to the opening and to share the elegance of our craft with you.',
    ],
  },

  gallery: [
    { src: asset('/assets/gallery/kaftan-1.webp'), caption: 'The Ivory Edit' },
    { src: asset('/assets/gallery/kaftan-2.webp'), caption: 'Golden Thread' },
    { src: asset('/assets/gallery/kaftan-3.webp'), caption: 'Azure Couture' },
    { src: asset('/assets/gallery/kaftan-4.webp'), caption: 'Maison Noir' },
    { src: asset('/assets/gallery/kaftan-5.webp'), caption: 'Rose Atelier' },
    { src: asset('/assets/gallery/kaftan-6.webp'), caption: 'Emerald Reverie' },
  ],

  images: {
    kaftanCircle: asset('/assets/kaftan-circle.webp'),
    logo: asset('/assets/logo.webp'),
  },
}
