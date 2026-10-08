import { RotateCw, Trophy } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useGame } from '../hooks/useGame'
import { puzzleNumber } from '../lib/date'
import { lossMessage, winMessage } from '../lib/messages'
import { findAnswer, type Mode } from '../lib/modes'
import { shareText } from '../lib/share'
import { Board } from './Board'
import { Confetti } from './Confetti'
import { Header } from './Header'
import { HintBar } from './HintBar'
import { Keyboard } from './Keyboard'
import { ModeBar } from './ModeBar'
import { StatsModal } from './StatsModal'
import { Toasts, type Toast } from './Toasts'

interface Props {
  mode: Mode
  onModeChange: (m: Mode) => void
  highContrast: boolean
  onOpenHelp: () => void
  onOpenSettings: () => void
  /** True while App-level modals (help/settings) are open, so typing doesn't leak into the board. */
  inputBlocked: boolean
}

export function Game({ mode, onModeChange, highContrast, onOpenHelp, onOpenSettings, inputBlocked }: Props) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [statsOpen, setStatsOpen] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [bounceRow, setBounceRow] = useState<number | null>(null)
  const [sinkRow, setSinkRow] = useState<number | null>(null)
  const [lossLine, setLossLine] = useState(lossMessage)
  const toastId = useRef(0)

  const toast = useCallback((message: string, ms = 1500) => {
    const id = ++toastId.current
    setToasts((t) => [...t, { id, message }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ms)
  }, [])

  const onFinish = useCallback(
    (won: boolean, guessCount: number, answer: string) => {
      if (won) {
        setBounceRow(guessCount - 1)
        setConfetti(true)
        toast(winMessage(guessCount), 2200)
      } else {
        setSinkRow(guessCount - 1)
        setLossLine(lossMessage())
        toast(answer, 3000)
      }
      window.setTimeout(() => setStatsOpen(true), 2400)
    },
    [toast],
  )

  const { game: state, stats, current, revealing, shake, keys, length, restoredFinished, onKey, revealHint, newGame } =
    useGame(mode, { toast, onFinish })
  const answer = findAnswer(mode.variant, state.answer)!
  const done = state.status !== 'playing'

  // Revisiting an already-finished game: show the results.
  useEffect(() => {
    if (!restoredFinished) return
    const id = window.setTimeout(() => setStatsOpen(true), 400)
    return () => window.clearTimeout(id)
  }, [restoredFinished])

  // Physical keyboard.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || inputBlocked || statsOpen) return
      if (e.key === 'Enter') onKey('ENTER')
      else if (e.key === 'Backspace') onKey('BACKSPACE')
      else if (/^[a-zA-Z]$/.test(e.key)) onKey(e.key.toUpperCase())
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onKey, inputBlocked, statsOpen])

  const share = async () => {
    const text = shareText({
      mode,
      puzzle: state.dayKey ? puzzleNumber(state.dayKey) : undefined,
      guesses: state.guesses,
      answer: state.answer,
      won: state.status === 'won',
      hintsUsed: state.hintsUsed,
      highContrast,
    })
    try {
      if (navigator.share && matchMedia('(pointer: coarse)').matches) {
        await navigator.share({ text })
        return
      }
      await navigator.clipboard.writeText(text)
      toast('Copied results to clipboard')
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') toast('Couldn’t share — try again')
    }
  }

  const startNext = () => {
    setStatsOpen(false)
    setBounceRow(null)
    setSinkRow(null)
    newGame()
  }

  return (
    <div className="flex h-dvh flex-col items-center">
      <Header onHelp={onOpenHelp} onStats={() => setStatsOpen(true)} onSettings={onOpenSettings} />

      <div className="mt-2 px-3">
        <ModeBar mode={mode} onChange={onModeChange} />
      </div>

      <main className="arcade-bg relative flex min-h-0 w-full flex-1 flex-col items-center gap-2 py-2">
        <Toasts toasts={toasts} />
        <div className="board-area flex min-h-0 w-full flex-1 items-center justify-center">
          <Board
            variant={mode.variant}
            length={length}
            answer={state.answer}
            guesses={state.guesses}
            current={current}
            revealing={revealing}
            shake={shake}
            bounceRow={bounceRow}
            sinkRow={sinkRow}
          />
        </div>
        <div className="flex min-h-10 items-center">
          {done && revealing === null ? (
            <div className="animate-hint flex gap-2">
              <button
                onClick={() => setStatsOpen(true)}
                className="flex items-center gap-1.5 rounded-full bg-cardinal px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-cardinal-dark"
              >
                <Trophy className="size-4" /> Results
              </button>
              {mode.kind === 'unlimited' && (
                <button
                  onClick={startNext}
                  className="flex items-center gap-1.5 rounded-full border-2 border-cardinal px-4 py-1.5 text-sm font-bold text-cardinal transition hover:bg-cardinal-soft"
                >
                  <RotateCw className="size-4" /> Next word
                </button>
              )}
            </div>
          ) : (
            <HintBar answer={answer} hintsUsed={state.hintsUsed} onReveal={revealHint} disabled={done} />
          )}
        </div>
      </main>

      <div className="w-full pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex justify-center">
          <Keyboard keys={keys} onKey={onKey} disabled={done || revealing !== null} />
        </div>
      </div>

      <StatsModal
        open={statsOpen}
        onClose={() => setStatsOpen(false)}
        mode={mode}
        stats={stats}
        game={state}
        answer={answer}
        lossLine={lossLine}
        onShare={share}
        onNewGame={startNext}
        onPlayUnlimited={() => {
          setStatsOpen(false)
          onModeChange({ ...mode, kind: 'unlimited' })
        }}
      />
      {confetti && <Confetti onDone={() => setConfetti(false)} />}
    </div>
  )
}
