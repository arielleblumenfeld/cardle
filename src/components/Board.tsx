import { evaluateGuess } from '../lib/evaluate'
import { MAX_GUESSES, type Variant } from '../lib/modes'
import { Tile } from './Tile'

interface Props {
  variant: Variant
  length: number
  answer: string
  guesses: string[]
  current: string
  revealing: number | null
  shake: number
  bounceRow: number | null
  sinkRow: number | null
}

export function Board({ variant, length, answer, guesses, current, revealing, shake, bounceRow, sinkRow }: Props) {
  return (
    <div className="flex flex-col gap-1.5" role="grid" aria-label="Guesses">
      {Array.from({ length: MAX_GUESSES }, (_, r) => {
        const submitted = r < guesses.length
        const letters = submitted ? guesses[r] : r === guesses.length ? current : ''
        const states = submitted ? evaluateGuess(guesses[r], answer) : []
        const isCurrent = r === guesses.length
        const rowAnim = isCurrent && shake ? 'row-shake' : r === sinkRow ? 'row-sink' : ''
        return (
          <div
            // Changing the key on each shake restarts the CSS animation.
            key={isCurrent ? `row-${r}-${shake}` : `row-${r}`}
            className={`flex justify-center gap-1.5 ${rowAnim}`}
            role="row"
          >
            {Array.from({ length }, (_, i) => (
              <Tile
                key={i}
                index={i}
                size={variant}
                letter={letters[i]}
                state={states[i]}
                reveal={r === revealing}
                bounce={r === bounceRow}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}
