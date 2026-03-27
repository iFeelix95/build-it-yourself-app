import { modules } from '../data/modules'

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', top: 14, right: 14, color: '#888780' }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function getModuleStatus(module) {
  if (module.completed) return 'completed'
  if (module.locked) return 'locked'
  return 'active'
}

function getStatusText(module) {
  if (module.completed) return 'Abgeschlossen'
  if (module.locked) return 'Gesperrt'
  return 'Verfügbar'
}

const phases = [
  { key: 'tragwerk', label: 'Phase 1: Tragwerk' },
  { key: 'decken-dach', label: 'Phase 2: Decken & Dach' },
]

export default function MenuPage({ onOpenModule }) {
  return (
    <section className="page-shell">
      <div className="timeline-header">
        <p className="eyebrow">Bauablauf</p>
        <h2>Schritt für Schritt zum Rohbau</h2>
        <p className="timeline-description">Arbeite dich durch die Module in der richtigen Reihenfolge. Jeder Schritt baut auf dem vorherigen auf.</p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line" />

        {phases.map((phase) => {
          const phaseModules = modules.filter((m) => m.phase === phase.key)
          if (phaseModules.length === 0) return null
          return (
            <div key={phase.key} className="phase-section">
              <span className="phase-label">{phase.label}</span>
              {phaseModules.map((module) => (
                <div key={module.id} className="timeline-item">
                  <div className={`timeline-dot ${getModuleStatus(module)}`}>
                    {module.completed ? '✓' : module.step}
                  </div>
                  <div className={`timeline-card ${module.locked ? 'locked' : ''}`}>
                    {module.locked && <LockIcon />}
                    <div className="card-content">
                      <span className="module-tag">{module.id.toUpperCase()}</span>
                      <h4 className="module-title">{module.shortTitle}</h4>
                      <p className="module-desc">{module.description}</p>
                      <div className="module-meta">
                        <span className="meta-duration">{module.duration}</span>
                        <span className={`meta-status ${getModuleStatus(module)}`}>
                          {getStatusText(module)}
                        </span>
                      </div>
                    </div>
                    <div className="card-actions">
                      <div className="module-price">€ {module.price || '89'}</div>
                      <button
                        className={`timeline-btn ${module.locked ? 'locked' : ''}`}
                        onClick={() => !module.locked && onOpenModule(module)}
                      >
                        {module.locked ? 'Freischalten' : module.completed ? 'Anzeigen' : 'Starten'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}
