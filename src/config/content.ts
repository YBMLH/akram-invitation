/**
 * ─────────────────────────────────────────────────────────────
 *  STYLE_BY_IB — محتوى الدعوة
 * ─────────────────────────────────────────────────────────────
 *  كل النصوص والروابط القابلة للتعديل موجودة في هذا الملف فقط.
 *
 *  • تاريخ العد التنازلي ...... siteContent.event.dateISO
 *  • روابط التواصل ............ siteContent.social
 *  • الخريطة / الموقع ......... siteContent.location
 *  • صور المعرض ............... siteContent.gallery
 *  • صور الواجهة .............. siteContent.images
 * ─────────────────────────────────────────────────────────────
 */

/**
 * Base URL for image assets.
 *  • ''                         → served from this site (public/assets/…)
 *  • 'https://cdn.example/pub'  → host assets on an external CDN / origin
 */
const ASSET_BASE = import.meta.env.VITE_ASSET_BASE ?? ''
const asset = (path: string) => `${ASSET_BASE}${path}`

export interface SiteContent {
  brand: string
  /** العنوان الرئيسي بالخط الرقعي */
  subtitle: string
  event: {
    /** تاريخ ووقت الافتتاح — يشغّل العد التنازلي */
    dateISO: string
  }
  invitation: {
    eyebrow: string
    script: string
    paragraphs: string[]
    locationLabel: string
    closing: string
  }
  location: {
    label: string
    mapEmbedSrc: string
    mapsLink: string
  }
  social: {
    instagram: { handle: string; url: string }
    whatsapp: { label: string; url: string }
  }
  welcome: {
    title: string
    arabic: string
    paragraphs: string[]
  }
  images: {
    /** جسم الظرف (صورة حقيقية مع الداخل المعتم) */
    envelopeBody: string
    /** لسان الظرف المقصوص (يُفتح) */
    envelopeFlap: string
    /** الختم الشمعي — زر فتح الظرف */
    seal: string
    logo: string
  }
  /** نصوص الواجهة (أزرار، عناوين، شريط متحرك…) */
  ui: {
    invitedEyebrow: string
    openInvitation: string
    scroll: string
    marquee: string[]
    countdown: {
      eyebrow: string
      title: string
      doorsOpen: string
      days: string
      hours: string
      minutes: string
      seconds: string
    }
    location: { eyebrow: string; title: string; kicker: string; openMaps: string }
    sealNote: string
    connect: {
      eyebrow: string
      title: string
      instagram: string
      whatsapp: string
      follow: string
      message: string
    }
    footerNote: string
  }
}

export const siteContent: SiteContent = {
  brand: 'STYLE_BY_IB',
  subtitle: 'الافتتاح الكبير',

  event: {
    // ── السبت ١٨ جويلية ٢٠٢٦ — التاسعة صباحاً ──
    dateISO: '2026-07-18T09:00:00',
  },

  invitation: {
    eyebrow: 'من دار',
    script: 'الافتتاح الكبير',
    paragraphs: [
      'يشرّفنا دعوتكم لحضور حفل الافتتاح الكبير لدار Style By IB.',
      'اكتشفوا مجموعتنا الحصرية من القفاطين الأنيقة وشاركونا هذه المناسبة المميزة.',
    ],
    locationLabel: 'قالمة، الجزائر',
    closing: 'نتطلع لاستقبالكم ومشاركتكم هذه اللحظة التي لا تُنسى.',
  },

  location: {
    label: 'قالمة، الجزائر',
    mapEmbedSrc: 'https://www.google.com/maps?q=Guelma,Algeria&z=13&output=embed',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Guelma%2C+Algeria',
  },

  social: {
    instagram: {
      handle: '@style_by_ib',
      url: 'https://instagram.com/style_by_ib',
    },
    whatsapp: {
      // ── ضعوا رقم واتساب البوتيك بالصيغة الدولية بدون + ──
      label: 'تحدثوا معنا',
      url: 'https://wa.me/213676779040',
    },
  },

  welcome: {
    title: 'بكل امتنان',
    arabic: 'أهلاً وسهلاً بكم',
    paragraphs: [
      'شكراً لكونكم جزءاً من قصة Style By IB.',
      'سيكون شرفاً لنا أن نرحّب بكم في الافتتاح وأن نشارككم أناقة صنعتنا.',
    ],
  },

  images: {
    envelopeBody: asset('/assets/envelope-body.webp'),
    envelopeFlap: asset('/assets/envelope-flap.webp'),
    seal: asset('/assets/seal.webp'),
    logo: asset('/assets/logo.webp'),
  },

  ui: {
    invitedEyebrow: 'أنتم مدعوون بكل حب',
    openInvitation: 'اضغطوا على الختم لفتح الدعوة',
    scroll: 'مرّروا للأسفل',
    marquee: ['الافتتاح الكبير', 'Style by IB', 'قالمة · الجزائر', 'قفطان وأناقة'],
    countdown: {
      eyebrow: 'نعدّ اللحظات',
      title: 'موعد الافتتاح',
      doorsOpen: 'الأبواب مفتوحة — أهلاً بكم',
      days: 'أيام',
      hours: 'ساعات',
      minutes: 'دقائق',
      seconds: 'ثوانٍ',
    },
    location: {
      eyebrow: 'أين تجدوننا',
      title: 'الموقع',
      kicker: 'البوتيك',
      openMaps: 'افتحوا في خرائط جوجل',
    },
    connect: {
      eyebrow: 'ابقوا قريبين',
      title: 'تواصلوا معنا',
      instagram: 'إنستغرام',
      whatsapp: 'واتساب',
      follow: 'تابعونا',
      message: 'راسلونا',
    },
    sealNote: 'هذه الدعوة خاصة بكم',
    footerNote: 'الافتتاح الكبير — بكل حب وأناقة',
  },
}
