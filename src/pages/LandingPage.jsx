import logo from "../assets/logos/biy_logo_main.png"
import ModelViewer from '../components/ModelViewer'

// SVG-Checkmark (kein Emoji) — Skill Rule: no-emoji-icons
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">
      <circle cx="9" cy="9" r="9" fill="#C4832A" fillOpacity="0.15" />
      <path d="M5 9l2.8 2.8L13 6" stroke="#C4832A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// SVG-Stern für Trust-Rating
function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#C4832A" aria-hidden="true" focusable="false">
      <path d="M8 1l1.8 4h4.2l-3.4 2.5 1.3 4L8 9l-3.9 2.5 1.3-4L2 5h4.2z" />
    </svg>
  )
}

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

const trustStats = [
  { num: '127+', label: 'Wände gebaut' },
  { num: '6', label: 'Baumodule' },
  { num: '100%', label: 'Statik-geprüft' },
]

export default function LandingPage({ onStart }) {
  return (
    <section className="landing-page page-shell">
      <div className="landing-stack">

        {/* ── 1. Hero Section (Pattern 32: Hero-Centric, 70vh) ── */}
        <section className="lp-hero" aria-labelledby="lp-hero-heading">
          <div className="lp-hero-copy">

            {/* Logo */}
            <div className="lp-logo-wrap" aria-label="Build It Yourself">
              <img src={logo} alt="Build It Yourself Logo" className="lp-logo-img" />
            </div>

            {/* Eyebrow badge */}
            <span className="lp-context-badge" role="note">Modulares Holzbau-System</span>

            {/* H1 — heading-hierarchy: h1 als einzige Hauptüberschrift */}
            <h1 id="lp-hero-heading" className="lp-h1">
              Dein Haus.<br />
              Deine Hände.<br />
              Dein Projekt.
            </h1>

            <p className="lp-subtitle">
              Vom 3D-Modell zur fertigen Wand in 12 Schritten.
              Statisch geprüft, perfekt erklärt.
            </p>

            {/* Benefits als Liste — no-emoji-icons: SVG statt ✓-Emoji */}
            <ul className="lp-benefits" aria-label="Kernvorteile">
              <li className="lp-benefit-item">
                <CheckIcon />
                <span>Professor-validierte Statik</span>
              </li>
              <li className="lp-benefit-item">
                <CheckIcon />
                <span>3D-Schritt-für-Schritt Anleitungen</span>
              </li>
              <li className="lp-benefit-item">
                <CheckIcon />
                <span>Material-Konfigurator mit Preisen</span>
              </li>
            </ul>

            {/* primary-action: EIN primärer CTA — touch-target-size: min 44px */}
            <div className="lp-hero-actions">
              <button
                className="lp-cta-primary"
                onClick={onStart}
                aria-label="Erstes Modul starten und mit dem Bau beginnen"
              >
                Erstes Modul starten
              </button>
            </div>

            {/* Social Proof */}
            <div className="lp-social-proof" aria-label="Nutzerbewertung">
              <span className="lp-stars" aria-label="5 von 5 Sterne">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </span>
              <span className="lp-social-text">
                <strong>127+</strong> Wände bereits gebaut
              </span>
            </div>
          </div>

          {/* Hero Visual — rechte Seite mit 3D-Modell */}
          <div className="lp-hero-visual" aria-label="3D-Vorschau des W4 Holzständerwand-Moduls">
            <div className="lp-model-panel">
              <div className="lp-model-header">
                <span className="small-label">3D Modulvorschau</span>
                <strong className="lp-model-title">W4 — Holzständerwand EG</strong>
              </div>

              <div className="lp-model-stage">
                <ModelViewer modelPath="/models/wand_w4.glb" />
              </div>

              <div className="hero-metrics">
                <div>
                  <span className="frame-label">Module</span>
                  <strong>Wand, Decke, Dach</strong>
                </div>
                <div>
                  <span className="frame-label">Workflow</span>
                  <strong>Auswahl → 3D → Bau</strong>
                </div>
                <div>
                  <span className="frame-label">Niveau</span>
                  <strong>Einsteiger</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Trust & Authority Section (Pattern 33) ── */}
        <section className="lp-trust" aria-labelledby="lp-trust-heading">
          <div className="lp-trust-header">
            <p className="eyebrow">Wissenschaftlich fundiert</p>
            <h2 id="lp-trust-heading">Statik-geprüft von Experten</h2>
            <p className="section-copy lp-trust-desc">
              Entwickelt in Zusammenarbeit mit Bau-Ingenieuren und Statik-Experten.
              Jedes Modul ist für reale Bauprojekte validiert und getestet.
            </p>
          </div>

          <div className="lp-trust-stats" role="list" aria-label="Projektkennzahlen">
            {trustStats.map((stat) => (
              <div key={stat.label} className="lp-trust-stat" role="listitem">
                <span className="lp-stat-num" aria-label={`${stat.num} ${stat.label}`}>
                  {stat.num}
                </span>
                <span className="lp-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. How It Works ── */}
        <section id="how-it-works" className="landing-section info-section" aria-labelledby="lp-how-heading">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Wie es funktioniert</p>
            <h2 id="lp-how-heading">So funktioniert BIY</h2>
            <p className="section-copy">
              Vom Modul bis zur Umsetzung in drei klaren Schritten.
            </p>
          </div>

          <div className="how-steps">
            <div className="how-steps-line" aria-hidden="true" />
            {howItWorks.map((item) => (
              <article key={item.step} className="how-step-card">
                <span className="how-step-index" aria-label={`Schritt ${item.step}`}>
                  {item.step}
                </span>
                <div className="how-step-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── 4. Final CTA ── */}
        <section className="landing-section final-cta" aria-labelledby="lp-cta-heading">
          <div className="final-cta-card final-cta-card--hero">
            <div className="final-cta-copy">
              <p className="eyebrow">Jetzt starten</p>
              <h2 id="lp-cta-heading">Starte mit dem ersten Modul</h2>
              <p className="section-copy">
                Sieh dir den Bauablauf im Detail an und springe direkt in die Anleitung.
              </p>
            </div>
            <button
              className="primary-btn"
              onClick={onStart}
              aria-label="Zur Modulübersicht navigieren"
            >
              Zur Modulübersicht
            </button>
          </div>
        </section>

      </div>
    </section>
  )
}
