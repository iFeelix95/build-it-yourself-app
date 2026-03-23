import logo from "../assets/logos/biy_logo_main.png"
import ModelViewer from '../components/ModelViewer'

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

export default function LandingPage({ onStart }) {
  return (
    <section className="landing-page page-shell">
      <div className="landing-stack">
        <section className="hero-card hero-card--redesign">
          <div className="hero-copy">
            <div className="hero-branding hero-branding--compact" aria-label="Build It Yourself Branding">
              <div className="hero-logo">
                <img src={logo} alt="Build It Yourself" />
              </div>
            </div>

            <p className="eyebrow">MODULARES BAUSYSTEM</p>
            <h1>Modular bauen. Schritt fuer Schritt.</h1>
            <p className="lead">
              Digitale Anleitung fuer den Holzbau - vom Bauteil bis zur Umsetzung.
            </p>

            <div className="hero-points">
              <span>Praezise Bauanleitung</span>
              <span>3D-Vorschau im Fokus</span>
              <span>Fuer die Baustelle gedacht</span>
            </div>

            <div className="hero-actions">
              <button className="primary-btn" onClick={onStart}>
                Projekt starten
              </button>
              <a className="secondary-link" href="#how-it-works">
                So funktioniert es
              </a>
            </div>
          </div>

          <div className="hero-visual hero-visual--redesign">
            <div className="visual-shell visual-shell--hero">
              <div className="hero-preview-copy hero-preview-copy--wide">
                <span className="small-label">3D Modulvorschau</span>
                <strong>Bauteile, Materiallogik und Anleitungen in einer klaren Arbeitsoberflaeche.</strong>
              </div>
              <div className="visual-stage visual-stage--hero">
                <div className="landing-model-shell">
                  <ModelViewer modelPath="/models/wand_w4.glb" />
                </div>
              </div>
              <div className="hero-metrics">
                <div>
                  <span className="frame-label">Module</span>
                  <strong>Wand, Decke, Dach</strong>
                </div>
                <div>
                  <span className="frame-label">Workflow</span>
                  <strong>Auswahl, 3D, Umsetzung</strong>
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

          <div className="how-steps">
            <div className="how-steps-line" aria-hidden="true" />
            {howItWorks.map((item) => (
              <article key={item.step} className="how-step-card">
                <span className="how-step-index">{item.step}</span>
                <div className="how-step-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section final-cta">
          <div className="final-cta-card final-cta-card--hero">
            <div className="final-cta-copy">
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
