import { evaluateGuess } from './evaluate'
import type { Mode } from './modes'
import { MAX_GUESSES } from './modes'

const EMOJI = {
  correct: { normal: '🟩', contrast: '🟧' },
  present: { normal: '🟨', contrast: '🟦' },
  absent: { normal: '⬜', contrast: '⬜' },
}

export function shareText(opts: {
  mode: Mode
  puzzle?: number
  guesses: string[]
  answer: string
  won: boolean
  hintsUsed: number
  highContrast: boolean
}): string {
  const { mode, puzzle, guesses, answer, won, hintsUsed, highContrast } = opts
  const name = mode.variant === 'mini' ? 'Cardle Mini' : 'Cardle'
  const title = mode.kind === 'daily' ? `${name} #${puzzle}` : `${name} (Unlimited)`
  const score = `${won ? guesses.length : 'X'}/${MAX_GUESSES}`
  const hints = hintsUsed ? ` 💡${hintsUsed}` : ''
  const grid = guesses
    .map((g) =>
      evaluateGuess(g, answer)
        .map((s) => EMOJI[s][highContrast ? 'contrast' : 'normal'])
        .join(''),
    )
    .join('\n')
  return `🌲 ${title} ${score}${hints}\n\n${grid}\n\nFear the Tree!`
}
