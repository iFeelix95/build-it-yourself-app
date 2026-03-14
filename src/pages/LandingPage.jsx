import ModelViewer from '../components/ModelViewer'

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

export default function LandingPage({ onStart }) {
  return (
    <section className="landing-page page-shell">
      <div className="hero-card">
        <div className="hero-copy">
          <div className="brand-row">
            <HouseLogo />
            <div>
              <p className="eyebrow">Modulares Bausystem</p>
              <h1>Build it yourself</h1>
            </div>
          </div>
          <p className="lead">
            Eine digitale Anleitung f\u00fcr dein Selbstbaukonzept im Holzrahmenbau. Die App f\u00fchrt Nutzer
            verst\u00e4ndlich durch Bauteile, Arbeitsschritte, Materialien und Hinweise zur Ausf\u00fchrung {'\u2013'} klar,
            visuell und direkt auf der Baustelle nutzbar.
          </p>
          <div className="hero-points">
            <span>Module ausw\u00e4hlen</span>
            <span>Schritte nachvollziehen</span>
            <span>Selbstbau strukturieren</span>
          </div>
          <button className="primary-btn" onClick={onStart}>
            Lass uns loslegen
          </button>
          <ModelViewer />
        </div>
        <div className="hero-visual">
          <div className="mock-card floating-card main-panel">
            <h3>Projektlogik</h3>
            <p>Bauteile nach Bauablauf ausw\u00e4hlen und direkt in die Anleitung springen.</p>
            <div className="mini-timeline">
              <span>Wand</span>
              <span>Decke</span>
              <span>Dach</span>
            </div>
          </div>
          <div className="mock-card floating-card side-panel">
            <p className="small-label">Erster Prototyp</p>
            <strong>Frontend only</strong>
            <p>Ideal zum direkten Visualisieren und iterativen Weiterbauen.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
