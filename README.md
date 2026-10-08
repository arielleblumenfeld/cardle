# Cardle 🌲

**The Stanford Word Game.** Wordle, but every answer comes from Stanford: campus life, traditions, landmarks, and academics.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Everything runs in the browser. There's no backend or API, and progress is saved in `localStorage`.

## Modes

- **Daily**: everyone gets the same word, based on the player's local date. A new word arrives at midnight.
- **Unlimited**: random Stanford words, as many as you like.
- **Mini · 3**: 3-letter answers (AXE, CAL, GSB…), in both Daily and Unlimited.

Each mode keeps its own game and statistics.

## Adding words

Edit **`src/data/answers.ts`**. Each entry has a `word`, a `category` (hint 1), a `hint` (hint 2), and a `fact` (shown after the game). In dev mode, the console warns about entries with the wrong length or duplicates. Answers are always accepted as guesses, even proper nouns like HUANG.

Adding words reshuffles the daily schedule for future dates.

## Guess dictionary

Valid guesses come from the MIT-licensed [`word-list`](https://github.com/sindresorhus/word-list) package (~12.5k five-letter words). The list is pre-generated into `src/data/dictionary.ts`, so it ships with the app. To regenerate it, run `npm run dictionary`.

## Code map

| Path | What |
|---|---|
| `src/lib/evaluate.ts` | Wordle scoring (handles repeated letters) + keyboard colors |
| `src/lib/date.ts` | Local-date keys and the deterministic daily schedule |
| `src/lib/stats.ts` | Stats and streak rules (a skipped day breaks a daily streak) |
| `src/lib/share.ts` | Emoji share grid |
| `src/hooks/useGame.ts` | Game state, input, persistence, reveal timing |
| `src/components/` | Board, keyboard, modals, header, confetti |

Cardle is a fan project and is not affiliated with Stanford University.
