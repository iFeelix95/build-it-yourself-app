import { useMemo, useState } from 'react'

const modules = [
  {
    id: 'w4',
    title: 'Bauteil W4 – Holzständerwand EG',
    shortTitle: 'W4 – Holzständerwand EG',
    category: 'Wände',
    duration: 'ca. 120 min',
    description:
      'Eine geführte Schritt-für-Schritt-Anleitung für den Aufbau einer Holzständerwand inklusive Vormontage, Beplankung, Befestigung, Dämmung und Sicherung.',
    tools: [
  { name: 'Wasserwaage', icon: '/icons/wasserwaage.jpg' },
  { name: 'Leiter', icon: '/icons/leiter.jpg' },
  { name: 'Nagelpistole', icon: '/icons/nagelpistole.jpg' },
],
    materials: [
      { key: 'A', name: 'Schraube', spec: '80 mm × 160 mm', qty: 15, price: '0,70 €', total: '10,50 €' },
      { key: 'B', name: 'Ständer', spec: '160 mm × 80 mm', qty: 5, price: '23,17 €', total: '115,85 €' },
      { key: 'C', name: 'Rähm/Schwelle', spec: '160 mm × 80 mm', qty: 2, price: '23,17 €', total: '46,34 €' },
      { key: 'D', name: 'OSB-Platte', spec: '1,5 cm', qty: 4, price: '26,97 €', total: '107,88 €' },
      { key: 'E', name: 'Schraube', spec: '35 mm × 40 mm', qty: 68, price: '0,04 €', total: '2,72 €' },
      { key: 'F', name: 'Zugverankerung', spec: 'Metallwinkel', qty: 1, price: '7,42 €', total: '7,42 €' },
      { key: 'G', name: 'Dämmplatte', spec: 'Mineralwolle', qty: 4, price: '35,39 €', total: '141,56 €' },
    ],
    steps: [
      {
        no: '01',
        title: 'Ständerwand vormontieren',
        time: '20 min bei 2 Personen',
        focus: 'Montage',
        text:
          'Die fünf Ständer werden zwischen Schwelle und Rähm liegend ausgerichtet. Halte das Achsmaß von 62,5 cm ein, richte alle Ständer rechtwinklig aus und setze pro Verbindungspunkt eine Schraube mittig in den Ständer.',
        notes: [
          'Abstände vor dem Verschrauben mit Zollstock oder Richtschnur prüfen.',
          'Schrauben leicht vorbohren oder sauber anreißen.',
          'Arbeitsfläche bei Bedarf mit Zwingen fixieren.',
        ],
      },
      {
        no: '02',
        title: 'OSB-Beplankung montieren',
        time: '20 min bei 2 Personen',
        focus: 'Beplankung',
        text:
          'Die vorbereitete Wand wird mit zwei OSB-Platten beplankt. Beide Platten liegen stoßfrei nebeneinander, der Stoß liegt mittig auf einem Ständer. Die Verschraubung erfolgt im gleichmäßigen Raster.',
        notes: [
          'Mindestens 13 mm Randabstand zur Plattenkante einhalten.',
          'Platten bündig zur Unterkante der Schwelle ausrichten.',
          'Ständerlage vorzeichnen, damit jede Schraube sauber sitzt.',
        ],
      },
      {
        no: '03',
        title: 'Wand aufrichten',
        time: '10 min bei 2 Personen',
        focus: 'Positionierung',
        text:
          'Die vormontierte Wand wird aufgerichtet und lotrecht an der Außenkante des Bodens aufgestellt. Vor dem endgültigen Verschrauben sollte die Wand provisorisch gesichert werden.',
        notes: [
          'Mit Wasserwaage oder Laser lotrecht ausrichten.',
          'Mit Helfer oder Zwinge fixieren, damit nichts verrutscht.',
        ],
      },
      {
        no: '04',
        title: 'Befestigen und Zugverankerung setzen',
        time: '10 min bei 2 Personen',
        focus: 'Sicherung',
        text:
          'Pro Wandfeld wird eine Schraube mittig durch die Schwelle in den Boden gesetzt. Anschließend wird die Zugverankerung am rechten Endständer verschraubt und zusätzlich schräg im Boden befestigt.',
        notes: [
          'Zugverankerung möglichst nah an der Ecke montieren.',
          'Sitz und Lot nach dem Verschrauben erneut prüfen.',
        ],
      },
      {
        no: '05',
        title: 'Dämmung einlegen',
        time: '20 min bei 2 Personen',
        focus: 'Ausbau',
        text:
          'Die Hohlräume zwischen den Ständern werden mit Dämmplatten spannungsfrei, aber formschlüssig ausgefüllt. Gleichzeitig bleibt Raum für Elektro, Wasser oder Heizungsinstallationen.',
        notes: [
          'Ohne Hohlräume oder Fugen arbeiten.',
          'Installationen frühzeitig mitdenken.',
        ],
      },
      {
        no: '06',
        title: 'Wandrückseite beplanken und sichern',
        time: '20 min bei 2 Personen',
        focus: 'Abschluss',
        text:
          'Zum Abschluss wird die Rückseite analog zur Vorderseite mit zwei OSB-Platten beplankt. Wenn die Wand noch freisteht, muss sie temporär abgestützt werden.',
        notes: [
          'Schrägstützen oder eine temporäre Aussteifung vorsehen.',
          'Bis zur vollständigen Verbindung mit angrenzenden Bauteilen sichern.',
        ],
      },
    ],
  },
  {
    id: 'd1',
    title: 'Bauteil D1 – Deckenmodul',
    shortTitle: 'D1 – Deckenmodul',
    category: 'Decken',
    duration: 'folgt',
    placeholder: true,
    description: 'Platzhalter für weitere Module. Hier kann später das nächste Bauteil ergänzt werden.',
    steps: [],
    materials: [],
    tools: [],
  },
  {
    id: 'r1',
    title: 'Bauteil R1 – Dachelement',
    shortTitle: 'R1 – Dachelement',
    category: 'Dach',
    duration: 'folgt',
    placeholder: true,
    description: 'Platzhalter für weitere Module. Die Struktur ist bereits vorbereitet.',
    steps: [],
    materials: [],
    tools: [],
  },
]

const groupedModules = modules.reduce((acc, module) => {
  if (!acc[module.category]) acc[module.category] = []
  acc[module.category].push(module)
  return acc
}, {})

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

function StepIcon({ no }) {
  return <div className="step-badge">{no}</div>
}

function LandingPage({ onStart }) {
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
            Eine digitale Anleitung für dein Selbstbaukonzept im Holzrahmenbau. Die App führt Nutzer
            verständlich durch Bauteile, Arbeitsschritte, Materialien und Hinweise zur Ausführung – klar,
            visuell und direkt auf der Baustelle nutzbar.
          </p>
          <div className="hero-points">
            <span>Module auswählen</span>
            <span>Schritte nachvollziehen</span>
            <span>Selbstbau strukturieren</span>
          </div>
          <button className="primary-btn" onClick={onStart}>
            Lass uns loslegen
          </button>
        </div>
        <div className="hero-visual">
          <div className="mock-card floating-card main-panel">
            <h3>Projektlogik</h3>
            <p>Bauteile nach Bauablauf auswählen und direkt in die Anleitung springen.</p>
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

function MenuPage({ onOpenModule }) {
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

      {Object.entries(groupedModules).map(([category, items]) => (
        <div key={category} className="category-block">
          <div className="category-head">
            <h3>{category}</h3>
            <span>{items.length} Modul{items.length > 1 ? 'e' : ''}</span>
          </div>
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
                    <span>…</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

function GuidePage({ module, onBack }) {
  const totalCost = useMemo(() => {
    const sum = module.materials.reduce((acc, item) => acc + Number(item.total.replace(' €', '').replace(',', '.')), 0)
    return sum.toFixed(2).replace('.', ',') + ' €'
  }, [module.materials])

  if (module.placeholder) {
    return (
      <section className="page-shell">
        <button className="back-btn" onClick={onBack}>← Zurück zur Modulauswahl</button>
        <div className="placeholder-page">
          <h2>{module.title}</h2>
          <p>{module.description}</p>
          <p>Dieses Modul ist im Frontend bereits eingeplant und kann als nächstes mit echten Inhalten befüllt werden.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="page-shell">
      <button className="back-btn" onClick={onBack}>← Zurück zur Modulauswahl</button>

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
  <img src={tool.icon} alt={tool.name} className="icon-image" />
</div>
            ))}
          </div>
        </article>

        <article className="overview-card product-card">
          <h3>Verwendete Materialien</h3>
          <div className="material-grid">
            {module.materials.map((item) => (
              <div key={item.key} className="material-tile">
                <span className="material-key">{item.key}</span>
                <strong>{item.name}</strong>
                <small>{item.spec}</small>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="cost-card">
        <div className="cost-card-head">
          <h3>Kurzüberblick Materialliste</h3>
          <span>Gesamt {totalCost}</span>
        </div>
        <div className="cost-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Bauteil</th>
                <th>Menge</th>
                <th>€/Stk</th>
                <th>Gesamt</th>
              </tr>
            </thead>
            <tbody>
              {module.materials.map((item) => (
                <tr key={item.key}>
                  <td>{item.key} – {item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.price}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <div className="step-stack">
        {module.steps.map((step) => (
          <article key={step.no} className="step-card">
            <div className="step-left">
              <StepIcon no={step.no} />
              <div className="step-visual-placeholder">
                <div className="play-button">▶</div>
                <span>Visual / Video Platzhalter</span>
              </div>
            </div>
            <div className="step-content">
              <div className="step-head">
                <div>
                  <p className="step-focus">{step.focus}</p>
                  <h3>Step {step.no} – {step.title}</h3>
                </div>
                <span className="time-pill">{step.time}</span>
              </div>
              <p>{step.text}</p>
              <div className="note-box">
                <strong>Hinweise zur Ausführung</strong>
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

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [selectedModule, setSelectedModule] = useState(null)

  const openModule = (module) => {
    setSelectedModule(module)
    setScreen('guide')
  }

  return (
    <div className="app-shell">
      <div className="top-accent" />
      <nav className="topbar">
        <button className="brand-button" onClick={() => setScreen('landing')}>
          <HouseLogo />
          <span>Build it yourself</span>
        </button>
        <div className="nav-actions">
          <button className="text-btn" onClick={() => setScreen('menu')}>Module</button>
          <button className="text-btn" onClick={() => setScreen('guide')} disabled={!selectedModule}>Anleitung</button>
        </div>
      </nav>

      {screen === 'landing' && <LandingPage onStart={() => setScreen('menu')} />}
      {screen === 'menu' && <MenuPage onOpenModule={openModule} />}
      {screen === 'guide' && selectedModule && <GuidePage module={selectedModule} onBack={() => setScreen('menu')} />}
      {screen === 'guide' && !selectedModule && <MenuPage onOpenModule={openModule} />}
    </div>
  )
}
