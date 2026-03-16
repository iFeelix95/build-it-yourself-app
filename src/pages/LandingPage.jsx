import logo from "../assets/logos/biy_logo_main.png"

const howItWorks = [
  {
    step: '01',
    title: 'Modul auswaehlen',
    text: 'Waehle das passende Bauteil und starte mit dem naechsten Bauabschnitt.',
  },
  {
    step: '02',
    title: 'Anleitung folgen',
    text: 'Arbeite mit klaren Schritten, Bildern, Videos und Hinweisen.',
  },
  {
    step: '03',
    title: 'Auf der Baustelle umsetzen',
    text: 'Uebertrage die Anleitung direkt in die Praxis.',
  },
]

const whyBiy = [
  {
    title: 'Modular aufgebaut',
    text: 'Bauteile folgen einer klaren Systemlogik.',
  },
  {
    title: 'Visuell gefuehrt',
    text: 'Bilder, Animationen und Schrittlogik machen Ablaeufe verstaendlich.',
  },
  {
    title: 'Aus echter Planung entstanden',
    text: 'Die Plattform basiert auf einem real entwickelten Holzbaukonzept.',
  },
]

export default function LandingPage({ onStart }) {
  return (
    <section className="landing-page page-shell">
      <div className="landing-stack">
        <section className="hero-card hero-card--sleek">
          <div className="hero-copy">
            <div className="hero-branding" aria-label="Build It Yourself Branding">
              <div className="hero-logo">
                <img src={logo} alt="Build It Yourself" />
              </div>
            </div>

            <p className="eyebrow">MODULARES BAUSYSTEM</p>
            <h1>Digitale Holzbau-Anleitung</h1>
            <p className="lead">
              Von der Modulauswahl bis zur Umsetzung auf der Baustelle.
            </p>

            <div className="hero-points">
              <span>Ingenieurbasiert</span>
              <span>Visuell gefuehrt</span>
              <span>Direkt auf der Baustelle nutzbar</span>
            </div>

            <div className="hero-actions">
              <button className="primary-btn" onClick={onStart}>
                Zur Moduluebersicht
              </button>
              <a className="secondary-link" href="#how-it-works">
                So funktioniert BIY
              </a>
            </div>
          </div>

          <div className="hero-visual hero-visual--product" aria-hidden="true">
            <div className="visual-shell visual-shell--product">
              <div className="hero-preview-copy">
                <span className="small-label">Produktvorschau</span>
                <strong>Anleitungen, Module und Bauablaeufe in einer Oberflaeche.</strong>
              </div>
              <div className="visual-stage visual-stage--product">
                <div className="visual-stage-grid" />
                <div className="visual-frame visual-frame--product">
                  <div className="product-preview-bar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="product-preview-content">
                    <div>
                      <span className="frame-label">Module</span>
                      <strong>Wand, Decke, Dach</strong>
                    </div>
                    <div>
                      <span className="frame-label">Ablauf</span>
                      <p>Schritte, Medien und Hinweise in klarer Reihenfolge.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="landing-section info-section">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">How it works</p>
            <h2>So funktioniert BIY</h2>
            <p className="section-copy">
              Vom Modul bis zur Umsetzung in drei klaren Schritten.
            </p>
          </div>

          <div className="info-grid info-grid--three">
            {howItWorks.map((item) => (
              <article key={item.step} className="info-card info-card--compact">
                <span className="info-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section why-section">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Why BIY</p>
            <h2>Warum BIY anders ist</h2>
            <p className="section-copy">
              Entwickelt aus echter Planung, visualisiert fuer die Praxis.
            </p>
          </div>

          <div className="info-grid info-grid--three">
            {whyBiy.map((item) => (
              <article key={item.title} className="info-card info-card--compact info-card--muted">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section final-cta">
          <div className="final-cta-card final-cta-card--compact">
            <div>
              <p className="eyebrow">Naechster Schritt</p>
              <h2>Starte mit dem ersten Modul</h2>
              <p className="section-copy">
                Sieh dir den Bauablauf im Detail an und springe direkt in die Anleitung.
              </p>
            </div>
            <button className="primary-btn" onClick={onStart}>
              Zur Moduluebersicht
            </button>
          </div>
        </section>
      </div>
    </section>
  )
}
