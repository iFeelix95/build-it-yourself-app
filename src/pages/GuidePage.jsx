import { useMemo, useState } from 'react'

const serviceProviders = {
  Elektro: {
    name: 'VoltWerk Elektroservice',
    region: 'Einsatzgebiet: Hamburg Mitte und Nord',
    description:
      'Unterstuetzt bei Elektroinstallationen, Leitungsfuehrung und dem fachgerechten Anschluss im Ausbau.',
    days: [
      {
        day: 'Di, 18.03.',
        slots: ['08:30 Uhr', '11:00 Uhr', '15:30 Uhr'],
      },
      {
        day: 'Do, 20.03.',
        slots: ['09:15 Uhr', '12:30 Uhr', '16:00 Uhr'],
      },
    ],
  },
  Heizung: {
    name: 'ThermoPlan Heiztechnik',
    region: 'Einsatzgebiet: Hamburg West und Pinneberg',
    description:
      'Begleitet bei Heizungsleitungen, Anschlusspunkten und technischen Abstimmungen im Ausbau.',
    days: [
      {
        day: 'Mi, 19.03.',
        slots: ['07:45 Uhr', '10:30 Uhr', '14:00 Uhr'],
      },
      {
        day: 'Fr, 21.03.',
        slots: ['08:15 Uhr', '11:45 Uhr', '15:15 Uhr'],
      },
    ],
  },
  Sanitair: {
    name: 'KlarRohr Sanitairpartner',
    region: 'Einsatzgebiet: Hamburg Sued und Harburg',
    description:
      'Unterstuetzt bei Sanitairleitungen, Wasseranschluessen und der Koordination im Innenausbau.',
    days: [
      {
        day: 'Mo, 17.03.',
        slots: ['09:00 Uhr', '12:00 Uhr', '16:15 Uhr'],
      },
      {
        day: 'Do, 20.03.',
        slots: ['08:45 Uhr', '13:15 Uhr', '17:00 Uhr'],
      },
    ],
  },
}

const productModals = {
  nagelpistole: {
    name: 'Schnurloser Gastacker / Nagelpistole',
    description:
      'Geeignet fuer die schnelle Befestigung von OSB-Platten und Holzverbindungen im Montageablauf.',
    price: 'Preis auf Anfrage / tagesweise Miete moeglich',
    vendor: 'Boels Mietservice',
    link: 'https://www.boels.com/de-de/mieten/schnurloser-gastacker/p/11289',
    rentalPrices: [
      { label: 'pro Tag', value: '46,41 EUR' },
      { label: 'Tagespreis ab 5 Miettagen', value: '37,13 EUR' },
    ],
  },
  materialC: {
    name: 'Konstruktionsvollholz fuer Raehm / Schwelle',
    description:
      'Passendes Konstruktionsholz fuer die tragenden Horizontalhoelzer im W4-Modul.',
    price: 'ca. 23,17 EUR pro Stueck',
    vendor: 'HolzLand',
    link:
      'https://www.holzland.de/p/konstruktionsvollholz-fichte-nsi-nicht-sichtbarer-einbau-c24/HL1634565/?itemId=7000537361&pmzr=10133',
  },
}

const materialTooltipMeta = {
  A: { dimension: '80 mm x 160 mm' },
  B: { dimension: 'KVH Staenderprofil' },
  C: { dimension: 'KVH Raehm / Schwelle' },
  D: { dimension: 'OSB Platte, Wandformat' },
  E: { dimension: '35 mm x 40 mm' },
  F: { dimension: 'Metallverbinder' },
  G: { dimension: 'Daemmplatte, Gefachformat' },
}

function StepIcon({ no }) {
  return <div className="step-badge">{no}</div>
}

function StepMedia({ step, onOpenVideo, onOpenImage }) {
  if (!step.image && !step.video) {
    return (
      <div className="step-visual-placeholder">
        <div className="play-button">{'\u25b6'}</div>
        <span>Visual / Video Platzhalter</span>
      </div>
    )
  }

  return (
    <div className="step-media-block">
      {step.image ? (
        <div className="step-media-image-wrap">
          <button
            type="button"
            className="step-media-zoom"
            onClick={() => onOpenImage(step)}
            aria-label={`Bild zu Schritt ${step.no} gross anzeigen`}
          >
            <img
              src={step.image}
              alt={`Schritt ${step.no} - ${step.title}`}
              className="step-media-image"
            />
            <span className="step-media-zoom-hint">Vergroessern</span>
          </button>
          {step.video ? (
            <button
              type="button"
              className="step-media-play"
              onClick={() => onOpenVideo(step)}
              aria-label={`Video zu Schritt ${step.no} oeffnen`}
            >
              {'\u25b6'}
            </button>
          ) : null}
        </div>
      ) : (
        <div className="step-visual-placeholder">
          <span>Bild folgt</span>
        </div>
      )}
    </div>
  )
}

function StepServiceCard({ onOpen }) {
  return (
    <div className="service-card">
      <div className="service-card-copy">
        <span className="service-card-kicker">Service-Option</span>
        <h4>Unterstuetzung bei Elektro, Heizung oder Sanitair</h4>
        <p>
          Wenn du dir Installationen im Ausbau nicht selbst zutraust, kannst du fuer
          diese Gewerke bei Bedarf Fachfirmen einbinden.
        </p>
      </div>
      <button type="button" className="text-btn service-card-btn" onClick={onOpen}>
        Handwerker gefaellig?
      </button>
    </div>
  )
}

function ServiceModal({ activeTrade, selectedSlots, onSelectTrade, onSelectSlot, onClose }) {
  const provider = serviceProviders[activeTrade]

  return (
    <div className="video-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="video-modal-card service-modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Handwerker-Service"
      >
        <button
          type="button"
          className="video-modal-close"
          onClick={onClose}
          aria-label="Servicefenster schliessen"
        >
          {'\u00d7'}
        </button>

        <div className="service-modal-head">
          <div>
            <span className="service-card-kicker">Fiktive Partnerbetriebe</span>
            <h3>Passende Unterstuetzung fuer den Ausbau</h3>
            <p className="section-copy">
              Waehle das Gewerk, fuer das du Unterstuetzung brauchst. Der Betrieb und die
              verfuegbaren Demo-Termine wechseln passend mit.
            </p>
          </div>
          <div className="service-chip-row">
            {Object.keys(serviceProviders).map((trade) => (
              <button
                key={trade}
                type="button"
                className={`service-chip${trade === activeTrade ? ' service-chip--active' : ''}`}
                onClick={() => onSelectTrade(trade)}
              >
                {trade}
              </button>
            ))}
          </div>
        </div>

        <div className="service-provider-card">
          <h4>{provider.name}</h4>
          <p className="service-provider-region">{provider.region}</p>
          <p className="section-copy">{provider.description}</p>
        </div>

        <div className="service-booking">
          {provider.days.map((entry) => (
            <div key={entry.day} className="service-day-card">
              <strong>{entry.day}</strong>
              <div className="service-slot-row">
                {entry.slots.map((slot) => {
                  const slotId = `${entry.day} ${slot}`
                  const isActive = selectedSlots[activeTrade] === slotId

                  return (
                    <button
                      key={slotId}
                      type="button"
                      className={`service-slot${isActive ? ' service-slot--active' : ''}`}
                      onClick={() => onSelectSlot(activeTrade, slotId)}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="service-modal-actions">
          <button type="button" className="primary-btn">
            Termin anfragen
          </button>
          <p className="service-demo-note">
            Dies ist ein Prototyp der spaeteren Servicevermittlung.
          </p>
        </div>
      </div>
    </div>
  )
}

function ProductModal({ product, onClose }) {
  return (
    <div className="video-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="video-modal-card product-modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        <button
          type="button"
          className="video-modal-close"
          onClick={onClose}
          aria-label="Produktfenster schliessen"
        >
          {'\u00d7'}
        </button>

        <div className="product-modal-copy">
          <span className="service-card-kicker">Produktinfo</span>
          <h3>{product.name}</h3>
          <p className="section-copy">{product.description}</p>
        </div>

        {product.rentalPrices ? (
          <div className="product-price-box">
            <span className="product-price-title">Ab (inkl. MwSt.)</span>
            <div className="product-price-grid">
              {product.rentalPrices.map((entry) => (
                <div key={entry.label} className="product-price-item">
                  <span>{entry.label}</span>
                  <strong>{entry.value}</strong>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="product-detail-grid">
          <div className="product-detail-card">
            <span>Preis</span>
            <strong>{product.price}</strong>
          </div>
          <div className="product-detail-card">
            <span>Bezugsquelle</span>
            <strong>{product.vendor}</strong>
          </div>
        </div>

        <div className="product-modal-actions">
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-btn product-modal-link"
          >
            Zum Shop
          </a>
          <p className="service-demo-note">Externer Partnerlink</p>
        </div>
      </div>
    </div>
  )
}

export default function GuidePage({ module, onBack }) {
  const [activeVideoStep, setActiveVideoStep] = useState(null)
  const [activeImageStep, setActiveImageStep] = useState(null)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [activeTrade, setActiveTrade] = useState('Elektro')
  const [selectedServiceSlots, setSelectedServiceSlots] = useState({
    Elektro: '',
    Heizung: '',
    Sanitair: '',
  })
  const [activeProduct, setActiveProduct] = useState(null)

  const totalCost = useMemo(() => {
    const sum = module.materials.reduce(
      (acc, item) =>
        acc +
        Number(
          item.total
            .replace(/[^0-9,.-]/g, '')
            .replace(/\./g, '')
            .replace(',', '.'),
        ),
      0,
    )
    return sum.toFixed(2).replace('.', ',') + ' EUR'
  }, [module.materials])

  if (module.placeholder) {
    return (
      <section className="page-shell">
        <button className="back-btn" onClick={onBack}>{'<-'} Zurueck zur Modulauswahl</button>
        <div className="placeholder-page">
          <h2>{module.title}</h2>
          <p>{module.description}</p>
          <p>Dieses Modul ist im Frontend bereits eingeplant und kann als naechstes mit echten Inhalten befuellt werden.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="page-shell">
      <button className="back-btn" onClick={onBack}>{'<-'} Zurueck zur Modulauswahl</button>

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
                  <button
                    type="button"
                    className="cart-button"
                    aria-label="Nagelpistole ansehen"
                    onClick={(event) => {
                      event.stopPropagation()
                      setActiveProduct(productModals.nagelpistole)
                    }}
                  >
                    {'\u{1F6D2}'}
                  </button>
                )}
                <img src={tool.icon} alt={tool.name} className="icon-image" />
                {tool.name === 'Nagelpistole' && (
                  <div className="tool-tooltip">
                    Nagelpistole - wird verwendet, um OSB-Platten und Holzverbindungen
                    schnell und praezise zu befestigen.
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
              <div key={item.key} className={`material-icon-card material-${item.key}`}>
                {item.key === 'C' && (
                  <button
                    type="button"
                    className="cart-button"
                    aria-label={`${item.name} ansehen`}
                    onClick={(event) => {
                      event.stopPropagation()
                      setActiveProduct(productModals.materialC)
                    }}
                  >
                    {'\u{1F6D2}'}
                  </button>
                )}

                <img src={item.icon} alt={item.name} className="material-icon-image" />

                <div className="material-tooltip">
                  <div className="material-tooltip-head">
                    <strong>{item.name}</strong>
                    <span>{materialTooltipMeta[item.key]?.dimension ?? 'Bauteilinformation'}</span>
                  </div>
                  <div className="material-tooltip-divider" aria-hidden="true" />
                  <div className="material-tooltip-stats">
                    <div className="material-tooltip-row">
                      <span className="material-tooltip-label">Menge</span>
                      <span className="material-tooltip-value">{item.qty}</span>
                    </div>
                    <div className="material-tooltip-row">
                      <span className="material-tooltip-label">Preis / Stk</span>
                      <span className="material-tooltip-value">{item.price}</span>
                    </div>
                    <div className="material-tooltip-row material-tooltip-row--total">
                      <span className="material-tooltip-label">Gesamt</span>
                      <span className="material-tooltip-value">{item.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="step-stack">
        {module.steps.map((step) => {
          const showServiceCard =
            module.id === 'w4' && String(step.no).replace(/^0+/, '') === '5'

          return (
            <article key={step.no} className="step-card">
              <div className="step-left">
                <StepIcon no={step.no} />
                <StepMedia
                  step={step}
                  onOpenVideo={setActiveVideoStep}
                  onOpenImage={setActiveImageStep}
                />
              </div>
              <div className="step-content">
                <div className="step-head">
                  <div>
                    <p className="step-focus">{step.focus}</p>
                    <h3>Step {step.no} - {step.title}</h3>
                  </div>
                  <span className="time-pill">{step.time}</span>
                </div>
                <p>{step.text}</p>
                <div className="note-box">
                  <strong>Hinweise zur Ausfuehrung</strong>
                  <ul>
                    {step.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
                {showServiceCard ? (
                  <StepServiceCard onOpen={() => setIsServiceModalOpen(true)} />
                ) : null}
              </div>
            </article>
          )
        })}
      </div>

      {activeVideoStep ? (
        <div
          className="video-modal-overlay"
          onClick={() => setActiveVideoStep(null)}
          role="presentation"
        >
          <div
            className="video-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Video zu Schritt ${activeVideoStep.no}`}
          >
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setActiveVideoStep(null)}
              aria-label="Video schliessen"
            >
              {'\u00d7'}
            </button>
            <video className="video-modal-player" controls autoPlay preload="metadata">
              <source src={activeVideoStep.video} type="video/mp4" />
              Dein Browser unterstuetzt das Video-Element nicht.
            </video>
          </div>
        </div>
      ) : null}

      {activeImageStep ? (
        <div
          className="video-modal-overlay"
          onClick={() => setActiveImageStep(null)}
          role="presentation"
        >
          <div
            className="video-modal-card image-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Bild zu Schritt ${activeImageStep.no}`}
          >
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setActiveImageStep(null)}
              aria-label="Bild schliessen"
            >
              {'\u00d7'}
            </button>
            <img
              src={activeImageStep.image}
              alt={`Schritt ${activeImageStep.no} - ${activeImageStep.title}`}
              className="image-modal-image"
            />
          </div>
        </div>
      ) : null}

      {isServiceModalOpen ? (
        <ServiceModal
          activeTrade={activeTrade}
          selectedSlots={selectedServiceSlots}
          onSelectTrade={setActiveTrade}
          onSelectSlot={(trade, slot) =>
            setSelectedServiceSlots((current) => ({
              ...current,
              [trade]: slot,
            }))
          }
          onClose={() => setIsServiceModalOpen(false)}
        />
      ) : null}

      {activeProduct ? (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      ) : null}
    </section>
  )
}
