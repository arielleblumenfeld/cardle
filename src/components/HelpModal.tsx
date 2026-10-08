import { Lightbulb } from 'lucide-react'
import type { LetterState } from '../lib/evaluate'
import { Modal } from './Modal'
import { Tile } from './Tile'

function Example({ word, mark, state }: { word: string; mark: number; state: LetterState }) {
  return (
    <div className="flex gap-1">
      {[...word].map((ch, i) => (
        <Tile key={i} index={i} size="small" letter={ch} state={i === mark ? state : undefined} />
      ))}
    </div>
  )
}

export function HelpModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="How to play">
      <div className="space-y-4 text-[15px] leading-relaxed text-ink-2">
        <p>
          Guess the <strong className="text-ink">Stanford word</strong> in 6 tries. Every answer comes from campus life,
          traditions, landmarks, or academics. Your guesses can be any real English word.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Type a word and press Enter.</li>
          <li>After each guess, the tiles change color to show how close you were.</li>
        </ul>

        <div className="space-y-3 rounded-xl bg-white/70 p-4">
          <div>
            <Example word="TREES" mark={0} state="correct" />
            <p className="mt-1.5 text-sm"><strong className="text-ink">T</strong> is in the word and in the right spot.</p>
          </div>
          <div>
            <Example word="QUADS" mark={2} state="present" />
            <p className="mt-1.5 text-sm"><strong className="text-ink">A</strong> is in the word but in the wrong spot.</p>
          </div>
          <div>
            <Example word="FROSH" mark={4} state="absent" />
            <p className="mt-1.5 text-sm"><strong className="text-ink">H</strong> is not in the word.</p>
          </div>
        </div>

        <p className="flex gap-2">
          <Lightbulb className="mt-1 size-4 flex-none text-cardinal" />
          <span>Stuck? Reveal up to two Stanford hints, a category and then a clue. Your shared results will show how many you used.</span>
        </p>
        <p>
          <strong className="text-ink">Daily</strong> gives everyone the same word, with a new one at midnight.{' '}
          <strong className="text-ink">Unlimited</strong> lets you keep playing. <strong className="text-ink">Mini</strong>{' '}
          uses 3-letter words like the Big Game’s famous trophy.
        </p>
        <p className="border-t border-line pt-3 text-center font-serif text-cardinal">Fear the Tree. 🌲</p>
      </div>
    </Modal>
  )
}
