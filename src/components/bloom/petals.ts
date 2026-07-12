/**
 * Geometry for splitting the circular kaftan image into radial "petal"
 * wedges. Each wedge is a full-size layer of the same image, revealed
 * through a pie-slice clip-path, so together they reconstruct the ring.
 */

export const SEGMENT_COUNT = 12

export interface Petal {
  index: number
  clipPath: string
  /** Outward unit direction (screen coords, y down) at the wedge mid-angle. */
  dx: number
  dy: number
}

/** Build a pie-slice clip-path polygon (percentages of the element box). */
function wedgeClipPath(i: number, n: number): string {
  // Start at the top of the circle and sweep clockwise.
  const start = (i / n) * Math.PI * 2 - Math.PI / 2
  const end = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2
  const R = 135 // extend beyond the box so corners stay covered
  const steps = 6
  const pts: string[] = ['50% 50%']
  for (let s = 0; s <= steps; s++) {
    const a = start + (end - start) * (s / steps)
    const x = 50 + R * Math.cos(a)
    const y = 50 + R * Math.sin(a)
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`)
  }
  return `polygon(${pts.join(', ')})`
}

export const PETALS: Petal[] = Array.from({ length: SEGMENT_COUNT }, (_, i) => {
  const mid = ((i + 0.5) / SEGMENT_COUNT) * Math.PI * 2 - Math.PI / 2
  return {
    index: i,
    clipPath: wedgeClipPath(i, SEGMENT_COUNT),
    dx: Math.cos(mid),
    dy: Math.sin(mid),
  }
})
