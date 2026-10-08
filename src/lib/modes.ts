import { CLASSIC_ANSWERS, MINI_ANSWERS, type Answer } from '../data/answers'

export type Variant = 'classic' | 'mini'
export type Kind = 'daily' | 'unlimited'

export interface Mode {
  variant: Variant
  kind: Kind
}

export const MAX_GUESSES = 6

export const modeKey = (m: Mode) => `${m.variant}-${m.kind}`
export const answersFor = (v: Variant): Answer[] => (v === 'mini' ? MINI_ANSWERS : CLASSIC_ANSWERS)
export const wordLength = (v: Variant) => (v === 'mini' ? 3 : 5)
export const findAnswer = (v: Variant, word: string) => answersFor(v).find((a) => a.word === word)
