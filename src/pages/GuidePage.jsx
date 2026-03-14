import { useMemo } from 'react'

function StepIcon({ no }) {
  return <div className="step-badge">{no}</div>
}

export default function GuidePage({ module, onBack }) {
  const totalCost = useMemo(() => {
    const sum = module.materials.reduce(
      (acc, item) => acc + Number(item.total.replace(' \u20ac', '').replace(',', '.')),
      0,
    )
    return sum.toFixed(2).replace('.', ',') + ' \u20ac'
  }, [module.materials])

  if (module.placeholder) {
    return (
      <section className="page-shell">
        <button className="back-btn" onClick={onBack}>{'\u2190'} Zur\u00fcck zur Modulauswahl</button>
        <div className="placeholder-page">
          <h2>{module.title}</h2>
          <p>{module.description}</p>
          <p>Dieses Modul ist im Frontend bereits eingeplant und kann als n\u00e4chstes mit echten Inhalten bef\u00fcllt werden.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="page-shell">
      <button className="back-btn" onClick={onBack}>{'\u2190'} Zur\u00fcck zur Modulauswahl</button>

      <header className="guide-hero">
        <div>
          <p className="eyebrow">Anleitung</p>
          <h2>{module.title}</h2>
          <p className="section-copy">{module.description}</p>
        </div>
        <div className="guide-summary">
          <div>
            <span>Gesamtdauer</span>
            <strong>{module.duration}</strong>
          </div>
          <div>
            <span>Materialkosten</span>
            <strong>{totalCost}</strong>
          </div>
        </div>
      </header>

      <div className="overview-grid">
        <article className="overview-card product-card">
          <h3>Werkzeuge</h3>
          <div className="tool-list">
            {module.tools.map((tool) => (
              <div key={tool.name} className="icon-card">
                {tool.name === 'Nagelpistole' && (
                  <a
                    href="https://www.boels.com/de-de/mieten/schnurloser-gastacker/p/11289"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cart-button"
                    aria-label="Nagelpistole kaufen"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {'\u{1F6D2}'}
                  </a>
                )}
                <img src={tool.icon} alt={tool.name} className="icon-image" />
                {tool.name === 'Nagelpistole' && (
                  <div className="tool-tooltip">
                    Nagelpistole {'\u2013'} wird verwendet, um OSB-Platten und Holzverbindungen
                    schnell und pr\u00e4zise zu befestigen.
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>

        <article className="overview-card product-card">
          <h3>Verwendete Materialien</h3>
          <div className="material-grid">
            {module.materials.map((item) => (
              <div
                key={item.key}
                className={`material-icon-card material-${item.key}`}
              >
                {item.shopUrl && (
                  <a
                    href={item.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cart-button"
                    aria-label={`${item.name} kaufen`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {'\u{1F6D2}'}
                  </a>
                )}

                <img
                  src={item.icon}
                  alt={item.name}
                  className="material-icon-image"
                />

                <div className="material-tooltip">
                  <strong>{item.name}</strong>
                  <span>Menge: {item.qty}</span>
                  <span>Preis/Stk: {item.price}</span>
                  <span>Gesamt: {item.total}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="step-stack">
        {module.steps.map((step) => (
          <article key={step.no} className="step-card">
            <div className="step-left">
              <StepIcon no={step.no} />
              <div className="step-visual-placeholder">
                <div className="play-button">{'\u25b6'}</div>
                <span>Visual / Video Platzhalter</span>
              </div>
            </div>
            <div className="step-content">
              <div className="step-head">
                <div>
                  <p className="step-focus">{step.focus}</p>
                  <h3>Step {step.no} {'\u2013'} {step.title}</h3>
                </div>
                <span className="time-pill">{step.time}</span>
              </div>
              <p>{step.text}</p>
              <div className="note-box">
                <strong>Hinweise zur Ausf\u00fchrung</strong>
                <ul>
                  {step.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
