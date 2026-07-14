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
    /** العنوان الكبير — «دعوة» */
    headline: string
    /** سطر ترحيب قصير */
    welcome: string
    /** نص بديل لشعار الخط العربي */
    brandArabic: string
    /** سطر الدعوة الرسمي */
    intro: string
    /** وصف قصير — للقفاطين والأزياء الراقية */
    subtitle: string
    /** التاريخ — ١٨ جويلية */
    dateLabel: string
    /** اليوم — السبت */
    dayLabel: string
    /** الوقت */
    timeLabel: string
    locationLabel: string
    /** سطر الختام */
    closing: string
  }
  location: {
    label: string
    mapEmbedSrc: string
    mapsLink: string
  }
  social: {
    instagram: {
      handle: string
      url: string
      name: string
      posts: string
      followers: string
      following: string
      bio: string
    }
    whatsapp: { label: string; url: string; number: string }
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
    /** شعار الدار بالخط العربي الذهبي (شفاف) */
    brandLogo: string
    /** بطاقة الدعوة الكاملة على خلفية المخمل — تظهر عند فتح الظرف */
    invitationCard: string
    /** خلفية قسم العدّ التنازلي */
    countdownBg: string
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
      posts: string
      followers: string
      following: string
    }
    footerNote: string
  }
}

export const siteContent: SiteContent = {
  brand: 'STYLE_BY_IB',
  subtitle: 'الافتتاح الكبير',

  event: {
    // ── السبت ١٨ جويلية ٢٠٢٦ — الخامسة مساءً ──
    dateISO: '2026-07-18T17:00:00',
  },

  invitation: {
    headline: 'دعوة',
    welcome: 'حضوركم يُضفي على افتتاحنا رونقاً خاصاً',
    brandArabic: 'ستايل باي إيب',
    intro: 'نتشرّف بدعوتكم لحضور الافتتاح الرسمي',
    subtitle: 'للقفاطين والأزياء الراقية',
    dateLabel: '18 جويلية 2026',
    dayLabel: 'السبت',
    timeLabel: 'الخامسة مساءً',
    locationLabel: 'قالمة، الجزائر',
    closing: 'حضوركم يسعدنا ويشرّفنا',
  },

  location: {
    label: 'قالمة، الجزائر',
    mapEmbedSrc: 'https://www.google.com/maps?q=Guelma,Algeria&z=14&output=embed',
    mapsLink: 'https://maps.app.goo.gl/jio47oKPd3gaJcCe8',
  },

  social: {
    instagram: {
      handle: '@style_by_ib',
      url: 'https://instagram.com/style_by_ib',
      name: 'Style_by_ib',
      posts: '411',
      followers: '98.7K',
      following: '10',
      bio: 'قالمة · بلخير — بوتيك القفاطين والأناقة',
    },
    whatsapp: {
      // ── ضعوا رقم واتساب البوتيك بالصيغة الدولية بدون + ──
      label: 'تحدثوا معنا',
      url: 'https://wa.me/213676779040',
      number: '0676 77 90 40',
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
    brandLogo: asset('/assets/brand-ar.webp'),
    invitationCard: asset('/assets/invitation-card.webp'),
    countdownBg: asset('/assets/countdown-bg.webp'),
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
      follow: 'زيارة الصفحة',
      message: 'راسلونا على واتساب',
      posts: 'منشور',
      followers: 'متابع',
      following: 'يتابع',
    },
    sealNote: 'هذه الدعوة خاصة بكم',
    footerNote: 'الافتتاح الكبير — بكل حب وأناقة',
  },
}
