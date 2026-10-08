import { Lightbulb, Tag } from 'lucide-react'
import type { Answer } from '../data/answers'

interface Props {
  answer: Answer
  hintsUsed: number
  onReveal: () => void
  disabled: boolean
}

export function HintBar({ answer, hintsUsed, onReveal, disabled }: Props) {
  return (
    <div className="flex w-full max-w-[500px] flex-col items-center gap-2 px-3">
      {hintsUsed >= 1 && (
        <div className="animate-hint flex items-center gap-2 rounded-full border border-cardinal/20 bg-cardinal-soft px-3 py-1 text-sm font-semibold text-cardinal-dark">
          <Tag className="size-3.5" /> {answer.category}
        </div>
      )}
      {hintsUsed >= 2 && (
        <p className="animate-hint max-w-sm text-center text-[15px] leading-snug text-ink-2 italic">“{answer.hint}”</p>
      )}
      {hintsUsed < 2 && (
        <button
          onClick={onReveal}
          disabled={disabled}
          className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold text-ink-2 transition hover:bg-cream-2 hover:text-cardinal disabled:opacity-40"
        >
          <Lightbulb className="size-4" />
          {hintsUsed === 0 ? 'Need a hint?' : 'One more hint'}
          <span className="text-ink-3 tabular">({hintsUsed}/2)</span>
        </button>
      )}
    </div>
  )
}
