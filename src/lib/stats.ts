import { previousDayKey, todayKey } from './date'
import { MAX_GUESSES } from './modes'

export interface Stats {
  played: number
  wins: number
  currentStreak: number
  maxStreak: number
  /** distribution[i] = wins in i+1 guesses */
  distribution: number[]
  /** Daily modes only: date of the last finished daily, so a skipped day breaks the streak. */
  lastDailyKey?: string
}

export const emptyStats = (): Stats => ({
  played: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  distribution: Array(MAX_GUESSES).fill(0),
})

export function recordGame(stats: Stats, won: boolean, guessCount: number, dailyKey?: string): Stats {
  const next: Stats = { ...stats, distribution: [...stats.distribution], played: stats.played + 1 }
  // For dailies, a streak only continues if yesterday's puzzle was also won.
  const continues = dailyKey ? stats.lastDailyKey === previousDayKey(dailyKey) : true
  if (won) {
    next.wins++
    next.distribution[guessCount - 1]++
    next.currentStreak = continues ? stats.currentStreak + 1 : 1
    next.maxStreak = Math.max(next.maxStreak, next.currentStreak)
  } else {
    next.currentStreak = 0
  }
  if (dailyKey) next.lastDailyKey = dailyKey
  return next
}

/** A daily streak shown today is stale if the player skipped yesterday. */
export function displayedStreak(stats: Stats, isDaily: boolean): number {
  if (!isDaily || !stats.lastDailyKey) return stats.currentStreak
  const today = todayKey()
  return stats.lastDailyKey === today || stats.lastDailyKey === previousDayKey(today) ? stats.currentStreak : 0
}
