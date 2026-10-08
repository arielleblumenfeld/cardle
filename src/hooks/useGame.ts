import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { dailyWord, todayKey } from '../lib/date'
import { isValidGuess } from '../lib/dictionary'
import { keyboardStates } from '../lib/evaluate'
import { answersFor, MAX_GUESSES, modeKey, wordLength, type Mode } from '../lib/modes'
import { emptyStats, recordGame, type Stats } from '../lib/stats'
import { load, save } from '../lib/storage'

export type Status = 'playing' | 'won' | 'lost'

export interface GameState {
  answer: string
  guesses: string[]
  status: Status
  hintsUsed: number
  /** Daily games: the date this puzzle belongs to. */
  dayKey?: string
}

/** Flip timing — keep in sync with .tile-reveal in index.css. */
export const FLIP_MS = 600
export const FLIP_STAGGER_MS = 300
export const revealDuration = (len: number) => (len - 1) * FLIP_STAGGER_MS + FLIP_MS

function randomAnswer(mode: Mode, avoid?: string): string {
  const words = answersFor(mode.variant).map((a) => a.word).filter((w) => w !== avoid)
  return words[Math.floor(Math.random() * words.length)]
}

function freshGame(mode: Mode, avoid?: string): GameState {
  if (mode.kind === 'daily') {
    const dayKey = todayKey()
    return { answer: dailyWord(mode.variant, dayKey), guesses: [], status: 'playing', hintsUsed: 0, dayKey }
  }
  return { answer: randomAnswer(mode, avoid), guesses: [], status: 'playing', hintsUsed: 0 }
}

function loadGame(mode: Mode): GameState {
  const saved = load<GameState | null>(`game:${modeKey(mode)}`, null)
  const valid =
    saved &&
    saved.answer?.length === wordLength(mode.variant) &&
    answersFor(mode.variant).some((a) => a.word === saved.answer)
  if (!valid) return freshGame(mode)
  // A daily from a previous date is replaced by today's puzzle.
  if (mode.kind === 'daily' && saved.dayKey !== todayKey()) return freshGame(mode)
  return saved
}

interface Callbacks {
  toast: (message: string, ms?: number) => void
  /** Fires once the final row has finished flipping. */
  onFinish: (won: boolean, guessCount: number, answer: string) => void
}

export function useGame(mode: Mode, { toast, onFinish }: Callbacks) {
  const key = modeKey(mode)
  const length = wordLength(mode.variant)
  const [game, setGame] = useState<GameState>(() => loadGame(mode))
  /** Whether the game loaded from storage was already over (e.g. revisiting today's daily). */
  const [restoredFinished] = useState(() => game.status !== 'playing')
  const [stats, setStats] = useState<Stats>(() => load(`stats:${key}`, emptyStats()))
  const [current, setCurrent] = useState('')
  /** Index of the row currently flipping; input is locked while set. */
  const [revealing, setRevealing] = useState<number | null>(null)
  /** Bumped to retrigger the shake animation on an invalid guess. */
  const [shake, setShake] = useState(0)

  const callbacks = useRef({ toast, onFinish })
  useEffect(() => {
    callbacks.current = { toast, onFinish }
  }, [toast, onFinish])

  useEffect(() => save(`game:${key}`, game), [key, game])
  useEffect(() => save(`stats:${key}`, stats), [key, stats])

  // Roll the daily puzzle over at local midnight if the tab stays open.
  useEffect(() => {
    if (mode.kind !== 'daily') return
    const check = () => {
      if (game.dayKey !== todayKey()) {
        setGame(freshGame(mode))
        setCurrent('')
      }
    }
    const id = window.setInterval(check, 30_000)
    document.addEventListener('visibilitychange', check)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', check)
    }
  }, [mode, game.dayKey])

  // Keyboard colors only reflect rows that have finished flipping.
  const keys = useMemo(
    () => keyboardStates(revealing === null ? game.guesses : game.guesses.slice(0, revealing), game.answer),
    [game.guesses, game.answer, revealing],
  )

  const locked = game.status !== 'playing' || revealing !== null

  const submit = useCallback(() => {
    if (current.length < length) {
      setShake((n) => n + 1)
      callbacks.current.toast('Not enough letters')
      return
    }
    if (!isValidGuess(current)) {
      setShake((n) => n + 1)
      callbacks.current.toast('Not in word list')
      return
    }
    const guesses = [...game.guesses, current]
    const won = current === game.answer
    const lost = !won && guesses.length >= MAX_GUESSES
    const status: Status = won ? 'won' : lost ? 'lost' : 'playing'

    setGame({ ...game, guesses, status })
    setCurrent('')
    setRevealing(game.guesses.length)
    // Record immediately so a refresh mid-animation can't lose the result.
    if (status !== 'playing') setStats((s) => recordGame(s, won, guesses.length, game.dayKey))

    window.setTimeout(() => {
      setRevealing(null)
      if (status !== 'playing') callbacks.current.onFinish(won, guesses.length, game.answer)
    }, revealDuration(length))
  }, [current, game, length])

  const onKey = useCallback(
    (k: string) => {
      if (locked) return
      if (k === 'ENTER') submit()
      else if (k === 'BACKSPACE') setCurrent((c) => c.slice(0, -1))
      else if (/^[A-Z]$/.test(k)) setCurrent((c) => (c.length < length ? c + k : c))
    },
    [locked, submit, length],
  )

  const revealHint = useCallback(() => {
    setGame((g) => (g.hintsUsed < 2 ? { ...g, hintsUsed: g.hintsUsed + 1 } : g))
  }, [])

  const newGame = useCallback(() => {
    setGame((g) => freshGame(mode, g.answer))
    setCurrent('')
  }, [mode])

  return { game, stats, current, revealing, shake, keys, length, restoredFinished, onKey, revealHint, newGame }
}
