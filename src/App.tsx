import { useEffect, useState } from 'react'
import { Game } from './components/Game'
import { HelpModal } from './components/HelpModal'
import { SettingsModal } from './components/SettingsModal'
import { modeKey, type Mode } from './lib/modes'
import { load, save } from './lib/storage'

export default function App() {
  const [mode, setMode] = useState<Mode>(() => load('mode', { variant: 'classic', kind: 'daily' }))
  const [highContrast, setHighContrast] = useState(() => load('highContrast', false))
  const [helpOpen, setHelpOpen] = useState(() => !load('seenHelp', false))
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => save('mode', mode), [mode])
  useEffect(() => {
    save('highContrast', highContrast)
    document.documentElement.classList.toggle('high-contrast', highContrast)
  }, [highContrast])

  const closeHelp = () => {
    setHelpOpen(false)
    save('seenHelp', true)
  }

  return (
    <>
      {/* Keyed by mode so each mode gets its own fresh game state. */}
      <Game
        key={modeKey(mode)}
        mode={mode}
        onModeChange={setMode}
        highContrast={highContrast}
        onOpenHelp={() => setHelpOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        inputBlocked={helpOpen || settingsOpen}
      />
      <HelpModal open={helpOpen} onClose={closeHelp} />
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        highContrast={highContrast}
        onHighContrast={setHighContrast}
      />
    </>
  )
}
