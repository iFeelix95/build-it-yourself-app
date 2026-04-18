import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import GuidePage from './pages/GuidePage'
import ImportTestPage from './pages/ImportTestPage'
import LandingPage from './pages/LandingPage'
import MenuPage from './pages/MenuPage'

const COLLAPSE_AT = 120
const EXPAND_AFTER = 80

const SPRING = { type: 'tween', duration: 0.55, ease: [0.4, 0, 0.2, 1] }

const navVariants = {
  expanded: {
    width: '100%',
    paddingTop: '14px',
    paddingBottom: '14px',
    paddingLeft: '18px',
    paddingRight: '18px',
    borderRadius: '14px',
    marginLeft: 'auto',
    marginRight: 'auto',
    transition: SPRING,
  },
  collapsed: {
    width: '56px',
    paddingTop: '7px',
    paddingBottom: '7px',
    paddingLeft: '7px',
    paddingRight: '7px',
    borderRadius: '999px',
    marginLeft: '0px',
    marginRight: 'auto',
    transition: SPRING,
  },
}

const fadeOut = {
  expanded: { opacity: 1, maxWidth: 600, transition: { duration: 0.3, delay: 0.15 } },
  collapsed: { opacity: 0, maxWidth: 0, transition: { duration: 0.18 } },
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
  const collapsedRef = useRef(false)
  const lastY = useRef(0)
  const collapseY = useRef(0)

  useEffect(() => {
    const onScroll = () => handleScrollValue(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleScrollValue(latest) {
    const prev = lastY.current
    if (!collapsedRef.current && latest > prev && latest > COLLAPSE_AT) {
      collapsedRef.current = true
      setCollapsed(true)
      collapseY.current = latest
    } else if (collapsedRef.current && latest < prev && collapseY.current - latest > EXPAND_AFTER) {
      collapsedRef.current = false
      setCollapsed(false)
    }
    lastY.current = latest
  }

  function handleGuideScroll(scrollTop) {
    handleScrollValue(scrollTop)
  }

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
          className={`topbar${collapsed ? ' topbar--collapsed' : ''}`}
          initial="expanded"
          animate={collapsed ? 'collapsed' : 'expanded'}
          variants={navVariants}
          onClick={() => { if (collapsed) { collapsedRef.current = false; setCollapsed(false) } }}
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
            <motion.span variants={fadeOut} style={{ whiteSpace: 'nowrap', overflow: 'hidden', display: 'inline-block' }}>
              Build it yourself
            </motion.span>
          </button>

          <motion.div className="nav-actions" variants={fadeOut} style={{ overflow: 'hidden' }}>
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
      {screen === 'guide' && selectedModule && <GuidePage module={selectedModule} onBack={() => navigateTo('menu')} onScroll={handleGuideScroll} />}
      {screen === 'guide' && !selectedModule && <MenuPage onOpenModule={openModule} />}
      {screen === 'import-test' && <ImportTestPage />}
    </div>
  )
}
