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
    paragraphs: [
      'Thank you for being part of the Style_By_IB story.',
      'It would be our honour to welcome you to the opening and to share the elegance of our craft with you.',
    ],
  },

  gallery: [
    { src: '/assets/gallery/kaftan-1.jpg', caption: 'The Ivory Edit' },
    { src: '/assets/gallery/kaftan-2.jpg', caption: 'Golden Thread' },
    { src: '/assets/gallery/kaftan-3.jpg', caption: 'Azure Couture' },
    { src: '/assets/gallery/kaftan-4.jpg', caption: 'Maison Noir' },
    { src: '/assets/gallery/kaftan-5.jpg', caption: 'Rose Atelier' },
    { src: '/assets/gallery/kaftan-6.jpg', caption: 'Emerald Reverie' },
  ],

  images: {
    kaftanCircle: '/assets/kaftan-circle.png',
    logo: '/assets/logo.png',
  },
}
