# Style_By_IB — Grand Opening Invitation

A premium, cinematic digital invitation for **Style_By_IB**, a luxury kaftan
boutique in Guelma, Algeria. The experience opens on a slowly rotating ring of
folded kaftans; tapping **Open Invitation** blooms the ring apart like a flower
and reveals a couture invitation card framed by the opened petals.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**.
Mobile-first, fully responsive, and tuned for smooth 60fps motion.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## The signature animation

The hero (`src/components/bloom/`) is the heart of the site:

- `petals.ts` — splits the circular kaftan image into radial pie-slice "petals"
  using `clip-path`. All slices overlap to reconstruct the full ring.
- `KaftanBloom.tsx` — rotates the ring, then on click blooms each petal outward
  in sequence, zooms in, and floats the invitation card up through the centre.
- `Particles.tsx` — soft ambient light motes.
- `InvitationCard.tsx` — the couture card that rises during the reveal.

## Editing content — everything lives in one file

Open **`src/config/content.ts`**. No other file needs to change.

| What to change            | Where                                       |
| ------------------------- | ------------------------------------------- |
| Countdown date & time     | `event.dateISO`                             |
| Instagram handle / link   | `social.instagram`                          |
| WhatsApp number / link    | `social.whatsapp.url` (format: `wa.me/…`)   |
| Google Map + Maps button  | `location.mapEmbedSrc`, `location.mapsLink` |
| Invitation wording        | `invitation`                                |
| Thank-you message         | `welcome`                                   |
| Gallery photos & captions | `gallery`                                   |

### Updating the countdown

```ts
event: { dateISO: '2026-09-05T18:00:00' }, // local time, 24h clock
```

### Updating the WhatsApp button

Use international format with no `+` or spaces:

```ts
whatsapp: { label: 'Chat with us', url: 'https://wa.me/213555123456' },
```

## Replacing images

All imagery lives in **`public/assets/`** and is referenced from
`src/config/content.ts`. Drop in a new file with the same name, or point the
config at your new filename.

| Asset               | File                                 |
| ------------------- | ------------------------------------ |
| Kaftan ring (hero)  | `public/assets/kaftan-circle.png`    |
| Boutique logo       | `public/assets/logo.png`             |
| Gallery photographs | `public/assets/gallery/kaftan-*.jpg` |

**Tips for the hero ring:** use a square PNG with a **transparent background**
and a transparent hole in the centre (the logo sits in that hole). The current
asset was prepared by removing the original photo's background.

## Colour palette

| Token | Hex       |
| ----- | --------- |
| Cream | `#F8F4EC` |
| Beige | `#D8C3A5` |
| Ivory | `#FFFDF8` |
| Ink   | `#111111` |

Defined in `tailwind.config.js` — adjust there to re-theme the whole site.
