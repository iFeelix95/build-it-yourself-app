import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import GuidePage from './pages/GuidePage'
import ImportTestPage from './pages/ImportTestPage'
import LandingPage from './pages/LandingPage'
import MenuPage from './pages/MenuPage'

const COLLAPSE_AT = 120
const EXPAND_AFTER = 80

const navVariants = {
  expanded: {
    width: '100%',
    paddingLeft: '18px',
    paddingRight: '18px',
    borderRadius: '14px',
    transition: { type: 'spring', damping: 24, stiffness: 300 },
  },
  collapsed: {
    width: '56px',
    paddingLeft: '7px',
    paddingRight: '7px',
    borderRadius: '999px',
    transition: { type: 'spring', damping: 24, stiffness: 300 },
  },
}

const fadeOut = {
  expanded: { opacity: 1, transition: { delay: 0.1, duration: 0.2 } },
  collapsed: { opacity: 0, transition: { duration: 0.12 } },
}

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
  const [collapsed, setCollapsed] = useState(false)

  const { scrollY } = useScroll()
  const lastY = useRef(0)
  const collapseY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = lastY.current
    if (!collapsed && latest > prev && latest > COLLAPSE_AT) {
      setCollapsed(true)
      collapseY.current = latest
    } else if (collapsed && latest < prev && collapseY.current - latest > EXPAND_AFTER) {
      setCollapsed(false)
    }
    lastY.current = latest
  })

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

      {/* ── Sticky nav positioner ── */}
      <div className="topbar-positioner">
        <motion.nav
          className="topbar"
          animate={collapsed ? 'collapsed' : 'expanded'}
          variants={navVariants}
          onClick={() => collapsed && setCollapsed(false)}
          whileHover={collapsed ? { scale: 1.07 } : {}}
          whileTap={collapsed ? { scale: 0.93 } : {}}
          style={{ cursor: collapsed ? 'pointer' : 'default' }}
          aria-label="Hauptnavigation"
        >
          <button
            className="brand-button"
            onClick={(e) => { if (!collapsed) { e.stopPropagation(); navigateTo('landing') } }}
            aria-label="Zur Startseite"
            tabIndex={collapsed ? -1 : 0}
          >
            <HouseLogo />
            <motion.span variants={fadeOut} style={{ whiteSpace: 'nowrap' }}>
              Build it yourself
            </motion.span>
          </button>

          <motion.div className="nav-actions" variants={fadeOut}>
            <button
              className="text-btn"
              onClick={(e) => { e.stopPropagation(); navigateTo('menu') }}
              tabIndex={collapsed ? -1 : 0}
            >
              Module
            </button>
            <button
              className="text-btn"
              onClick={(e) => { e.stopPropagation(); navigateTo('guide') }}
              disabled={!selectedModule}
              tabIndex={collapsed ? -1 : 0}
            >
              Anleitung
            </button>
            <button
              className="text-btn"
              onClick={(e) => { e.stopPropagation(); navigateTo('import-test') }}
              tabIndex={collapsed ? -1 : 0}
            >
              Import Test
            </button>
          </motion.div>
        </motion.nav>
      </div>

      {screen === 'landing' && <LandingPage onStart={() => navigateTo('menu')} />}
      {screen === 'menu' && <MenuPage onOpenModule={openModule} />}
      {screen === 'guide' && selectedModule && <GuidePage module={selectedModule} onBack={() => navigateTo('menu')} />}
      {screen === 'guide' && !selectedModule && <MenuPage onOpenModule={openModule} />}
      {screen === 'import-test' && <ImportTestPage />}
    </div>
  )
}
