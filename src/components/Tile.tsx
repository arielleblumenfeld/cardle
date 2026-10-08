import type { CSSProperties } from 'react'
import type { LetterState } from '../lib/evaluate'
import { FLIP_STAGGER_MS } from '../hooks/useGame'

const STATE_CLASS: Record<LetterState, string> = {
  correct: 'bg-correct border-correct text-white',
  present: 'bg-present border-present text-white',
  absent: 'bg-absent border-absent text-white',
}

const STATE_VAR: Record<LetterState, string> = {
  correct: 'var(--tile-correct)',
  present: 'var(--tile-present)',
  absent: 'var(--tile-absent)',
}

interface Props {
  letter?: string
  state?: LetterState
  /** Position in the row; drives flip/bounce stagger. */
  index: number
  reveal?: boolean
  bounce?: boolean
  size: 'classic' | 'mini' | 'small'
}

export function Tile({ letter, state, index, reveal, bounce, size }: Props) {
  const style = {} as CSSProperties & Record<string, string>
  let cls = 'border-[var(--tile-empty-border)] bg-transparent'

  if (state && reveal) {
    cls = 'tile-reveal border-[var(--tile-filled-border)]'
    style['--tile-final'] = STATE_VAR[state]
    style.animationDelay = `${index * FLIP_STAGGER_MS}ms`
  } else if (state) {
    cls = STATE_CLASS[state]
    if (bounce) {
      cls += ' tile-bounce'
      style.animationDelay = `${index * 100}ms`
    }
  } else if (letter) {
    cls = 'tile-pop border-[var(--tile-filled-border)] bg-white/60'
  }

  return (
    <div
      className={`tile flex select-none items-center justify-center rounded-md border-2 font-serif font-bold uppercase leading-none tile-${size} ${cls}`}
      style={style}
      aria-label={letter ? `${letter}${state ? `, ${state}` : ''}` : 'empty'}
    >
      {letter}
    </div>
  )
}
