export interface Toast {
  id: number
  message: string
}

export function Toasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-2 z-30 flex flex-col items-center gap-2" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="animate-toast rounded-lg bg-ink px-4 py-2.5 text-[15px] font-semibold text-white shadow-lg">
          {t.message}
        </div>
      ))}
    </div>
  )
}
