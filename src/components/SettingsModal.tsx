import { Modal } from './Modal'

interface Props {
  open: boolean
  onClose: () => void
  highContrast: boolean
  onHighContrast: (v: boolean) => void
}

export function SettingsModal({ open, onClose, highContrast, onHighContrast }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Settings">
      <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-line py-3">
        <span>
          <span className="block font-semibold text-ink">High contrast colors</span>
          <span className="block text-sm text-ink-3">Orange and blue tiles, easier to tell apart with color blindness</span>
        </span>
        <input
          type="checkbox"
          checked={highContrast}
          onChange={(e) => onHighContrast(e.target.checked)}
          className="peer sr-only"
        />
        <span className="relative h-7 w-12 flex-none rounded-full bg-ink-3/40 transition peer-checked:bg-cardinal peer-focus-visible:ring-2 peer-focus-visible:ring-cardinal/40 after:absolute after:top-1 after:left-1 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" />
      </label>
      <p className="pt-4 text-sm text-ink-3">
        Cardle is a fan-made game and isn’t affiliated with Stanford University. Your progress is saved in this
        browser.
      </p>
    </Modal>
  )
}
