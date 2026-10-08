import { CLASSIC_ANSWERS, MINI_ANSWERS } from '../data/answers'
import { FIVE_LETTER_WORDS, THREE_LETTER_WORDS } from '../data/dictionary'

const cache = new Map<number, Set<string>>()

function wordsFor(length: number): Set<string> {
  let set = cache.get(length)
  if (!set) {
    const [dict, answers] = length === 3 ? [THREE_LETTER_WORDS, MINI_ANSWERS] : [FIVE_LETTER_WORDS, CLASSIC_ANSWERS]
    set = new Set(dict.split(' '))
    // Stanford answers (HUANG, FLOMO, GSB…) are always valid guesses.
    for (const a of answers) set.add(a.word)
    cache.set(length, set)
  }
  return set
}

export function isValidGuess(word: string): boolean {
  return wordsFor(word.length).has(word)
}
