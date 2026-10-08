import type { Variant } from './modes'
import { answersFor } from './modes'

/** Local calendar date as YYYY-MM-DD (never UTC, so the puzzle flips at the player's midnight). */
export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const LAUNCH = Date.UTC(2026, 9, 1) // Cardle #1 = Oct 1, 2026

/** Days since launch for a YYYY-MM-DD key. Computed in UTC so DST shifts can't skew it. */
export function dayNumber(key: string): number {
  const [y, m, d] = key.split('-').map(Number)
  return Math.round((Date.UTC(y, m - 1, d) - LAUNCH) / 86_400_000)
}

export function previousDayKey(key: string): string {
  const [y, m, d] = key.split('-').map(Number)
  return todayKey(new Date(y, m - 1, d - 1))
}

/** Deterministic Fisher-Yates with a small seeded PRNG (mulberry32). */
function seededShuffle<T>(items: T[], seed: number): T[] {
  const out = [...items]
  let s = seed >>> 0
  const rand = () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const schedules = new Map<Variant, string[]>()

/** Same word for everyone on a given date: walk a fixed shuffled order, one word per day. */
export function dailyWord(variant: Variant, key: string): string {
  let order = schedules.get(variant)
  if (!order) {
    order = seededShuffle(answersFor(variant).map((a) => a.word), variant === 'mini' ? 1891 : 1885)
    schedules.set(variant, order)
  }
  const n = order.length
  return order[((dayNumber(key) % n) + n) % n]
}

export function puzzleNumber(key: string): number {
  return dayNumber(key) + 1
}

export function msUntilMidnight(now = new Date()): number {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  return next.getTime() - now.getTime()
}
