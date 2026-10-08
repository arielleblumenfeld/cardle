export type LetterState = 'correct' | 'present' | 'absent'

/**
 * Wordle scoring with correct repeated-letter handling:
 * exact matches claim their letters first, then remaining letters are
 * matched left-to-right against whatever is left unclaimed in the answer.
 * e.g. answer TREES, guess EERIE -> present, present, present, absent, absent
 * (TREES has only two Es, so the third E in the guess is absent).
 */
export function evaluateGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = Array(answer.length).fill('absent')
  const remaining = new Map<string, number>()

  for (let i = 0; i < answer.length; i++) {
    if (guess[i] === answer[i]) result[i] = 'correct'
    else remaining.set(answer[i], (remaining.get(answer[i]) ?? 0) + 1)
  }
  for (let i = 0; i < answer.length; i++) {
    if (result[i] === 'correct') continue
    const left = remaining.get(guess[i]) ?? 0
    if (left > 0) {
      result[i] = 'present'
      remaining.set(guess[i], left - 1)
    }
  }
  return result
}

const RANK: Record<LetterState, number> = { absent: 0, present: 1, correct: 2 }

/** Best-known state for each letter across all scored guesses (drives keyboard colors). */
export function keyboardStates(guesses: string[], answer: string): Record<string, LetterState> {
  const keys: Record<string, LetterState> = {}
  for (const guess of guesses) {
    evaluateGuess(guess, answer).forEach((state, i) => {
      const prev = keys[guess[i]]
      if (!prev || RANK[state] > RANK[prev]) keys[guess[i]] = state
    })
  }
  return keys
}
