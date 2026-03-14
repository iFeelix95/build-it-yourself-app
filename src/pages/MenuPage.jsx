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
        const wallPreviewModule = items.find((module) => module.id === 'w4')
        const isWallSection = Boolean(wallPreviewModule)

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
                  const CardTag = isWallModule ? 'article' : 'button'

                  return (
                    <CardTag
                      key={module.id}
                      className={`module-card ${isWallModule ? 'module-card--static' : ''} ${module.placeholder ? 'module-card--muted' : ''}`}
                      {...(!isWallModule ? { type: 'button', onClick: () => onOpenModule(module) } : {})}
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
                              cursor: 'default',
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
                    </CardTag>
                  )
                })}
              </div>
              {isWallSection && wallPreviewModule && (
                <button
                  className="overview-card preview-card"
                  type="button"
                  onClick={() => onOpenModule(wallPreviewModule)}
                  style={{
                    minHeight: '360px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left',
                    cursor: 'pointer',
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
                      className="module-preview-image"
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
                </button>
              )}
            </div>
          </div>
        )
      })}
    </section>
  )
}
