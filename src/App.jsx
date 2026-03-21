import { useState } from 'react'
import GuidePage from './pages/GuidePage'
import ImportTestPage from './pages/ImportTestPage'
import LandingPage from './pages/LandingPage'
import MenuPage from './pages/MenuPage'

function HouseLogo() {
  return (
    <div className="logo-wrap" aria-hidden="true">
      <svg viewBox="0 0 64 64" className="house-logo">
        <path d="M10 30 32 12l22 18v22a2 2 0 0 1-2 2H38V40H26v14H12a2 2 0 0 1-2-2Z" />
        <path d="M24 54V38h16v16" className="house-detail" />
      </svg>
    </div>
  )
}

export default function App() {
  const getInitialScreen = () =>
    window.location.hash === '#import-test' ? 'import-test' : 'landing'

  const [screen, setScreen] = useState(getInitialScreen)
  const [selectedModule, setSelectedModule] = useState(null)

  const navigateTo = (nextScreen) => {
    setScreen(nextScreen)
    window.location.hash = nextScreen === 'import-test' ? 'import-test' : ''
  }

  const openModule = (module) => {
    setSelectedModule(module)
    navigateTo('guide')
  }

  return (
    <div className="app-shell">
      <div className="top-accent" />
      <nav className="topbar">
        <button className="brand-button" onClick={() => navigateTo('landing')}>
          <HouseLogo />
          <span>Build it yourself</span>
        </button>
        <div className="nav-actions">
          <button className="text-btn" onClick={() => navigateTo('menu')}>Module</button>
          <button className="text-btn" onClick={() => navigateTo('guide')} disabled={!selectedModule}>Anleitung</button>
          <button className="text-btn" onClick={() => navigateTo('import-test')}>Import Test</button>
        </div>
      </nav>

      {screen === 'landing' && <LandingPage onStart={() => navigateTo('menu')} />}
      {screen === 'menu' && <MenuPage onOpenModule={openModule} />}
      {screen === 'guide' && selectedModule && <GuidePage module={selectedModule} onBack={() => navigateTo('menu')} />}
      {screen === 'guide' && !selectedModule && <MenuPage onOpenModule={openModule} />}
      {screen === 'import-test' && <ImportTestPage />}
    </div>
  )
}
