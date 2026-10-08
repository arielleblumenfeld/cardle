import { CornerDownLeft, Delete } from 'lucide-react'
import type { ReactNode } from 'react'
import type { LetterState } from '../lib/evaluate'

const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', '+ZXCVBNM-']

const KEY_CLASS: Record<LetterState | 'none', string> = {
  none: 'bg-[#e8e1d1] text-ink hover:bg-[#ded6c3] active:bg-[#d3cab5]',
  correct: 'bg-correct text-white',
  present: 'bg-present text-white',
  absent: 'bg-absent/90 text-white',
}

interface Props {
  keys: Record<string, LetterState>
  onKey: (key: string) => void
  disabled: boolean
}

export function Keyboard({ keys, onKey, disabled }: Props) {
  return (
    <div className="flex w-full max-w-[500px] flex-col gap-1.5 px-1.5 select-none" aria-label="Keyboard">
      {ROWS.map((row, r) => (
        <div key={r} className="flex justify-center gap-1.5">
          {r === 1 && <div className="flex-[0.5]" />}
          {[...row].map((ch) => {
            if (ch === '+')
              return (
                <Key key="enter" wide onClick={() => onKey('ENTER')} disabled={disabled} label="Enter" cls={KEY_CLASS.none}>
                  <span className="hidden text-xs font-bold tracking-wide sm:inline">ENTER</span>
                  <CornerDownLeft className="size-5 sm:hidden" />
                </Key>
              )
            if (ch === '-')
              return (
                <Key key="back" wide onClick={() => onKey('BACKSPACE')} disabled={disabled} label="Backspace" cls={KEY_CLASS.none}>
                  <Delete className="size-5" />
                </Key>
              )
            const state = keys[ch]
            return (
              <Key key={ch} onClick={() => onKey(ch)} disabled={disabled} label={`${ch}${state ? `, ${state}` : ''}`} cls={KEY_CLASS[state ?? 'none']}>
                {ch}
              </Key>
            )
          })}
          {r === 1 && <div className="flex-[0.5]" />}
        </div>
      ))}
    </div>
  )
}

function Key(props: { children: ReactNode; onClick: () => void; disabled: boolean; label: string; cls: string; wide?: boolean }) {
  return (
    <button
      type="button"
      aria-label={props.label}
      onClick={props.onClick}
      // Keep focus off the key so a physical Enter press doesn't re-click it.
      onMouseDown={(e) => e.preventDefault()}
      tabIndex={-1}
      className={`flex h-[min(3.5rem,7dvh)] items-center justify-center rounded-md font-sans text-[1.05rem] font-bold uppercase transition-colors duration-300 ${
        props.wide ? 'flex-[1.5]' : 'flex-1'
      } ${props.cls} ${props.disabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {props.children}
    </button>
  )
}
