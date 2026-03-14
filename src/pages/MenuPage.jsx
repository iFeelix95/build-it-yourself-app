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
          <h2>Wähle dein Modul nach Arbeitsschritten</h2>
        </div>
        <p className="section-copy">
          Der erste Prototyp startet mit einer vollständigen Anleitung für die Holzständerwand. Weitere
          Module sind bereits als Struktur vorbereitet.
        </p>
      </div>

      {Object.entries(groupedModules).map(([category, items]) => {
        const isWallSection = category === 'Wände'

        return (
          <div key={category} className="category-block">
            <div className="category-head">
              <h3>{category}</h3>
              <span>{items.length} Modul{items.length > 1 ? 'e' : ''}</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isWallSection ? 'minmax(0, 1fr) minmax(0, 1fr)' : '1fr',
                gap: isWallSection ? '28px' : '32px',
                alignItems: 'stretch',
              }}
            >
              <div
                className="module-grid"
                style={isWallSection ? { gridTemplateColumns: '1fr' } : undefined}
              >
                {items.map((module) => {
                  const isWallModule = isWallSection && module.id === 'w4'

                  return (
                    <button
                      key={module.id}
                      className={`module-card ${module.placeholder ? 'module-card--muted' : ''}`}
                      onClick={() => onOpenModule(module)}
                      style={
                        isWallModule
                          ? {
                              minHeight: '360px',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'stretch',
                              justifyContent: 'flex-start',
                              gap: '14px',
                            }
                          : undefined
                      }
                    >
                      <div className="module-card-top">
                        <span className="module-tag">{module.id.toUpperCase()}</span>
                        <span className="module-duration">{module.duration}</span>
                      </div>
                      <h4>{module.shortTitle}</h4>
                      <p style={isWallModule ? { marginBottom: 0, flex: 1 } : undefined}>
                        {module.description}
                      </p>
                      {module.placeholder ? (
                        <span className="ghost-chip">In Vorbereitung</span>
                      ) : module.id !== 'w4' ? (
                        <div className="step-preview">
                          {module.steps.slice(0, 4).map((step) => (
                            <span key={step.no}>{step.no}</span>
                          ))}
                          <span>…</span>
                        </div>
                      ) : null}
                    </button>
                  )
                })}
              </div>
              {isWallSection && (
                <article
                  className="overview-card"
                  style={{
                    minHeight: '360px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h3>Bauteilvorschau</h3>
                  <div
                    style={{
                      flex: 1,
                      display: 'grid',
                      placeItems: 'center',
                      padding: '8px 0 0',
                    }}
                  >
                    <img
                      src="/images/w4_holzstaenderwand_eg.png"
                      alt="Vorschau des Moduls W4"
                      style={{
                        width: '100%',
                        maxWidth: '280px',
                        maxHeight: '250px',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />
                  </div>
                </article>
              )}
            </div>
          </div>
        )
      })}
    </section>
  )
}
