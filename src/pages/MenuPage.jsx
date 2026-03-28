import { modules } from '../data/modules'

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="10" fill="#639922" fillOpacity="0.15" />
      <path d="M5.5 10l3.2 3.2 5.8-6" stroke="#639922" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
  { key: 'tragwerk', label: 'Phase 1 — Tragwerk', desc: 'Fundament & tragende Wände' },
  { key: 'decken-dach', label: 'Phase 2 — Decken & Dach', desc: 'Rohbau abschließen' },
]

export default function MenuPage({ onOpenModule }) {
  const completedCount = modules.filter(m => m.completed).length
  const totalCount = modules.length

  return (
    <section className="page-shell mn-page">

      {/* ── Header ── */}
      <header className="mn-header" aria-labelledby="mn-heading">
        <span className="lp-context-badge" role="note">Bauablauf</span>
        <h1 id="mn-heading" className="mn-h1">Schritt für Schritt<br />zum Rohbau</h1>
        <p className="mn-subtitle">
          Arbeite dich durch die Module in der richtigen Reihenfolge.
          Jeder Schritt baut auf dem vorherigen auf.
        </p>
        <div className="mn-progress-row" aria-label={`${completedCount} von ${totalCount} Modulen abgeschlossen`}>
          <div className="mn-progress-bar" role="progressbar" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={totalCount}>
            <div className="mn-progress-fill" style={{ width: `${(completedCount / totalCount) * 100}%` }} />
          </div>
          <span className="mn-progress-label">{completedCount}/{totalCount} Module</span>
        </div>
      </header>

      {/* ── Timeline ── */}
      <div className="mn-timeline" role="list" aria-label="Baumodule Timeline">
        <div className="mn-timeline-line" aria-hidden="true" />

        {phases.map((phase) => {
          const phaseModules = modules.filter((m) => m.phase === phase.key)
          if (phaseModules.length === 0) return null
          return (
            <div key={phase.key} className="mn-phase" role="group" aria-label={phase.label}>
              <div className="mn-phase-header">
                <span className="mn-phase-label">{phase.label}</span>
                <span className="mn-phase-desc">{phase.desc}</span>
              </div>

              {phaseModules.map((module) => {
                const status = getModuleStatus(module)
                return (
                  <div key={module.id} className="mn-item" role="listitem">
                    {/* Timeline Dot */}
                    <div className={`mn-dot mn-dot--${status}`} aria-hidden="true">
                      {module.completed
                        ? <CheckIcon />
                        : module.locked
                          ? <LockIcon />
                          : <span className="mn-dot-step">{module.step}</span>
                      }
                    </div>

                    {/* Card */}
                    <article
                      className={`mn-card mn-card--${status}`}
                      onClick={() => !module.locked && onOpenModule(module)}
                      aria-label={`${module.shortTitle} — ${getStatusText(module)}`}
                      tabIndex={module.locked ? -1 : 0}
                      onKeyDown={(e) => e.key === 'Enter' && !module.locked && onOpenModule(module)}
                      role="button"
                    >
                      <div className="mn-card-body">
                        <div className="mn-card-top">
                          <span className="mn-module-tag">{module.id.toUpperCase()}</span>
                          <span className={`mn-status-badge mn-status-badge--${status}`}>
                            {getStatusText(module)}
                          </span>
                        </div>
                        <h3 className="mn-card-title">{module.shortTitle}</h3>
                        <p className="mn-card-desc">{module.description}</p>
                        <span className="mn-card-duration">{module.duration}</span>
                      </div>

                      <div className="mn-card-aside">
                        <span className="mn-card-price">€ {module.price || '89'}</span>
                        <button
                          className={`mn-btn mn-btn--${status}`}
                          onClick={(e) => { e.stopPropagation(); !module.locked && onOpenModule(module) }}
                          aria-label={`${module.shortTitle} ${module.locked ? 'freischalten' : module.completed ? 'anzeigen' : 'starten'}`}
                          disabled={module.locked}
                        >
                          {module.locked
                            ? <><LockIcon /> Freischalten</>
                            : module.completed
                              ? <><CheckIcon /> Anzeigen</>
                              : <><ArrowIcon /> Starten</>
                          }
                        </button>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

    </section>
  )
}
