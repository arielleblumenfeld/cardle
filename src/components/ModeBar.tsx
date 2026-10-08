import { CalendarDays, Infinity as InfinityIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Kind, Mode, Variant } from '../lib/modes'

interface Props {
  mode: Mode
  onChange: (mode: Mode) => void
}

export function ModeBar({ mode, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Segmented<Kind>
        value={mode.kind}
        onChange={(kind) => onChange({ ...mode, kind })}
        options={[
          { value: 'daily', label: 'Daily', icon: <CalendarDays className="size-4" /> },
          { value: 'unlimited', label: 'Unlimited', icon: <InfinityIcon className="size-4" /> },
        ]}
      />
      <Segmented<Variant>
        value={mode.variant}
        onChange={(variant) => onChange({ ...mode, variant })}
        options={[
          { value: 'classic', label: '5 letters' },
          { value: 'mini', label: 'Mini · 3' },
        ]}
      />
    </div>
  )
}

function Segmented<T extends string>(props: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string; icon?: ReactNode }[]
}) {
  return (
    <div className="flex rounded-full border border-line bg-white/70 p-0.5 shadow-sm" role="radiogroup">
      {props.options.map((o) => {
        const active = o.value === props.value
        return (
          <button
            key={o.value}
            role="radio"
            aria-checked={active}
            onClick={() => props.onChange(o.value)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
              active ? 'bg-cardinal text-white shadow' : 'text-ink-2 hover:text-cardinal'
            }`}
          >
            {o.icon}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
