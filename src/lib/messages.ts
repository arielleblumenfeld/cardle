const WIN_BY_GUESSES = [
  'Genius! Fear the Tree! 🌲',
  'Magnificent! Go Card!',
  'Impressive! Fear the Tree!',
  'Splendid! Beat Cal!',
  'Great work, Cardinal!',
  'Phew! The Axe stays home!',
]

export const winMessage = (guesses: number) => WIN_BY_GUESSES[Math.min(guesses, 6) - 1]

const LOSSES = [
  'Tough break. Even the Tree has off days.',
  'So close! Go grab a Coupa and try again.',
  'Not this time. Back to the psets!',
]

export const lossMessage = () => LOSSES[Math.floor(Math.random() * LOSSES.length)]
