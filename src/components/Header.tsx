import { ChartColumn, CircleQuestionMark, Settings } from 'lucide-react'
import type { ReactNode } from 'react'
import { Skyline } from './Skyline'

interface Props {
  onHelp: () => void
  onStats: () => void
  onSettings: () => void
}

export function Header({ onHelp, onStats, onSettings }: Props) {
  return (
    <header className="w-full">
      <div className="bg-cardinal py-1 text-center font-serif text-[13px] font-semibold tracking-[0.2em] text-white/95 uppercase">
        Made on The Farm
      </div>
      <div className="relative mx-auto flex max-w-[500px] items-center justify-between px-3 pt-3">
        <IconButton label="How to play" onClick={onHelp}>
          <CircleQuestionMark />
        </IconButton>
        <div className="text-center">
          <h1 className="font-serif text-[2.6rem] leading-none font-bold tracking-[0.12em] text-cardinal sm:text-5xl">CARDLE</h1>
          <p className="mt-1 text-[13px] font-semibold tracking-[0.18em] text-ink-2 uppercase">The Stanford Word Game</p>
        </div>
        <div className="flex">
          <IconButton label="Statistics" onClick={onStats}>
            <ChartColumn />
          </IconButton>
          <IconButton label="Settings" onClick={onSettings}>
            <Settings />
          </IconButton>
        </div>
      </div>
      <Skyline className="mx-auto mt-1 h-7 w-full max-w-[500px] px-3 text-[#b9aa7f]" />
    </header>
  )
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="rounded-full p-2 text-ink-2 transition hover:bg-cream-2 hover:text-cardinal [&_svg]:size-6"
    >
      {children}
    </button>
  )
}
