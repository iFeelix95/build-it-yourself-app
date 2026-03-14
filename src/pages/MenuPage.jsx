import { modules } from '../data/modules'

const groupedModules = modules.reduce((acc, module) => {
  if (!acc[module.category]) acc[module.category] = []
  acc[module.category].push(module)
  return acc
}, {})

export default function MenuPage({ onOpenModule }) {
  return (
    <section className="page-shell">
      <div className="section-header">
        <div>
          <p className="eyebrow">Bauteilauswahl</p>
          <h2>W\u00e4hle dein Modul nach Arbeitsschritten</h2>
        </div>
        <p className="section-copy">
          Der erste Prototyp startet mit einer vollst\u00e4ndigen Anleitung f\u00fcr die Holzst\u00e4nderwand. Weitere
          Module sind bereits als Struktur vorbereitet.
        </p>
      </div>

      {Object.entries(groupedModules).map(([category, items]) => (
        <div key={category} className="category-block">
          <div className="category-head">
            <h3>{category}</h3>
            <span>{items.length} Modul{items.length > 1 ? 'e' : ''}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            <div className="module-grid">
              {items.map((module) => (
                <button
                  key={module.id}
                  className={`module-card ${module.placeholder ? 'module-card--muted' : ''}`}
                  onClick={() => onOpenModule(module)}
                >
                  <div className="module-card-top">
                    <span className="module-tag">{module.id.toUpperCase()}</span>
                    <span className="module-duration">{module.duration}</span>
                  </div>
                  <h4>{module.shortTitle}</h4>
                  <p>{module.description}</p>
                  {module.placeholder ? (
                    <span className="ghost-chip">In Vorbereitung</span>
                  ) : (
                    <div className="step-preview">
                      {module.steps.slice(0, 4).map((step) => (
                        <span key={step.no}>{step.no}</span>
                      ))}
                      <span>{'\u2026'}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
