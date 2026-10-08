import { ArrowRight, Infinity as InfinityIcon, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Answer } from '../data/answers'
import type { GameState } from '../hooks/useGame'
import { msUntilMidnight } from '../lib/date'
import { winMessage } from '../lib/messages'
import { MAX_GUESSES, type Mode } from '../lib/modes'
import { displayedStreak, type Stats } from '../lib/stats'
import { Modal } from './Modal'

interface Props {
  open: boolean
  onClose: () => void
  mode: Mode
  stats: Stats
  game: GameState
  answer: Answer
  lossLine: string
  onShare: () => void
  onNewGame: () => void
  onPlayUnlimited: () => void
}

export function StatsModal({ open, onClose, mode, stats, game, answer, lossLine, onShare, onNewGame, onPlayUnlimited }: Props) {
  const done = game.status !== 'playing'
  const won = game.status === 'won'
  const winPct = stats.played ? Math.round((stats.wins / stats.played) * 100) : 0
  const maxBar = Math.max(1, ...stats.distribution)
  const modeName = `${mode.kind === 'daily' ? 'Daily' : 'Unlimited'}${mode.variant === 'mini' ? ' Mini' : ''}`

  return (
    <Modal open={open} onClose={onClose} title={done ? (won ? winMessage(game.guesses.length) : 'Better luck next time') : 'Statistics'}>
      {done && (
        <section className="mb-5 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
          <div className="flex items-center justify-between bg-cardinal px-4 py-3 text-white">
            <span className="font-serif text-2xl font-bold tracking-[0.2em]">{answer.word}</span>
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase">{answer.category}</span>
          </div>
          <div className="px-4 py-3">
            {!won && <p className="mb-2 text-sm font-semibold text-cardinal">{lossLine}</p>}
            <p className="text-[15px] leading-relaxed text-ink-2">{answer.fact}</p>
          </div>
        </section>
      )}

      <p className="mb-2 text-xs font-bold tracking-[0.15em] text-ink-3 uppercase">{modeName} statistics</p>
      <div className="mb-5 grid grid-cols-4 gap-2 text-center">
        <Stat value={stats.played} label="Played" />
        <Stat value={winPct} label="Win %" />
        <Stat value={displayedStreak(stats, mode.kind === 'daily')} label="Current streak" />
        <Stat value={stats.maxStreak} label="Max streak" />
      </div>

      <p className="mb-2 text-xs font-bold tracking-[0.15em] text-ink-3 uppercase">Guess distribution</p>
      {stats.wins === 0 ? (
        <p className="mb-2 text-sm text-ink-3">Win a game to see your distribution.</p>
      ) : (
        <div className="mb-2 space-y-1" role="table" aria-label="Guess distribution">
          {stats.distribution.slice(0, MAX_GUESSES).map((count, i) => {
            const highlight = won && game.guesses.length === i + 1
            return (
              <div key={i} className="flex items-center gap-2" role="row">
                <span className="w-3 text-sm font-semibold text-ink-2 tabular" role="rowheader">{i + 1}</span>
                <div className="flex-1" role="cell">
                  <div
                    className={`flex h-6 min-w-7 items-center justify-end rounded-r-[4px] px-2 text-sm font-bold text-white transition-[width] duration-700 ${
                      highlight ? 'bg-cardinal' : 'bg-ink-3/70'
                    }`}
                    style={{ width: `${Math.max(7, (count / maxBar) * 100)}%` }}
                  >
                    <span className="tabular">{count}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {done && (
        <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
          {mode.kind === 'daily' ? (
            <div className="flex flex-1 items-center justify-between gap-3 sm:block">
              <div>
                <p className="text-xs font-bold tracking-[0.15em] text-ink-3 uppercase">Next Cardle</p>
                <Countdown />
              </div>
              <button onClick={onPlayUnlimited} className="flex items-center gap-1 text-sm font-semibold text-cardinal hover:underline sm:mt-1">
                <InfinityIcon className="size-4" /> Play Unlimited
              </button>
            </div>
          ) : (
            <button
              onClick={onNewGame}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-cardinal px-5 py-3 font-bold text-cardinal transition hover:bg-cardinal-soft"
            >
              Next word <ArrowRight className="size-4" />
            </button>
          )}
          <button
            onClick={onShare}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-cardinal px-5 py-3 font-bold text-white shadow-md transition hover:bg-cardinal-dark active:scale-[.98]"
          >
            Share <Share2 className="size-4" />
          </button>
        </div>
      )}
    </Modal>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl font-bold text-ink tabular">{value}</div>
      <div className="text-[11px] leading-tight text-ink-3">{label}</div>
    </div>
  )
}

function Countdown() {
  const [ms, setMs] = useState(msUntilMidnight)
  useEffect(() => {
    const id = window.setInterval(() => setMs(msUntilMidnight()), 1000)
    return () => window.clearInterval(id)
  }, [])
  const s = Math.floor(ms / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <p className="font-serif text-2xl font-bold text-ink tabular">
      {pad(Math.floor(s / 3600))}:{pad(Math.floor((s % 3600) / 60))}:{pad(s % 60)}
    </p>
  )
}
