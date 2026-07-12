import { useEffect, useState } from 'react'

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

function computeTimeLeft(target: number): TimeLeft {
  const diff = target - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
  }
  const seconds = Math.floor((diff / 1000) % 60)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24)
  const days = Math.floor(diff / 1000 / 60 / 60 / 24)
  return { days, hours, minutes, seconds, isComplete: false }
}

/** Ticks once per second toward the given ISO date. */
export function useCountdown(dateISO: string): TimeLeft {
  const target = new Date(dateISO).getTime()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(computeTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}
