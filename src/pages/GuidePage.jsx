import { useEffect, useMemo, useState } from 'react'

// ── Data ─────────────────────────────────────────────────────────────────────

const serviceProviders = {
  Elektro: {
    name: 'VoltWerk Elektroservice',
    region: 'Einsatzgebiet: Hamburg Mitte und Nord',
    description:
      'Unterstuetzt bei Elektroinstallationen, Leitungsfuehrung und dem fachgerechten Anschluss im Ausbau.',
    days: [
      { day: 'Di, 18.03.', slots: ['08:30 Uhr', '11:00 Uhr', '15:30 Uhr'] },
      { day: 'Do, 20.03.', slots: ['09:15 Uhr', '12:30 Uhr', '16:00 Uhr'] },
    ],
  },
  Heizung: {
    name: 'ThermoPlan Heiztechnik',
    region: 'Einsatzgebiet: Hamburg West und Pinneberg',
    description:
      'Begleitet bei Heizungsleitungen, Anschlusspunkten und technischen Abstimmungen im Ausbau.',
    days: [
      { day: 'Mi, 19.03.', slots: ['07:45 Uhr', '10:30 Uhr', '14:00 Uhr'] },
      { day: 'Fr, 21.03.', slots: ['08:15 Uhr', '11:45 Uhr', '15:15 Uhr'] },
    ],
  },
  Sanitair: {
    name: 'KlarRohr Sanitairpartner',
    region: 'Einsatzgebiet: Hamburg Sued und Harburg',
    description:
      'Unterstuetzt bei Sanitairleitungen, Wasseranschluessen und der Koordination im Innenausbau.',
    days: [
      { day: 'Mo, 17.03.', slots: ['09:00 Uhr', '12:00 Uhr', '16:15 Uhr'] },
      { day: 'Do, 20.03.', slots: ['08:45 Uhr', '13:15 Uhr', '17:00 Uhr'] },
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
    link: 'https://www.holzland.de/p/konstruktionsvollholz-fichte-nsi-nicht-sichtbarer-einbau-c24/HL1634565/?itemId=7000537361&pmzr=10133',
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

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function BackArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckCircleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2.2 2.2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 4.5V8l2.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function TipIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="7" stroke="#C4832A" strokeWidth="1.5" />
      <path d="M8 5v4M8 11v.5" stroke="#C4832A" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M8 1.5L2.5 4v4c0 3 2.5 5.5 5.5 6 3-0.5 5.5-3 5.5-6V4L8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M5.5 8l1.8 1.8 3.2-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MaterialIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M1 1h2l1.5 7h7l1.5-5H4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="13" r="1" fill="currentColor" />
      <circle cx="11.5" cy="13" r="1" fill="currentColor" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

// ── Service Calendar ──────────────────────────────────────────────────────────

const DAY_LETTERS = ['S', 'M', 'D', 'M', 'D', 'F', 'S']

function parseServiceDay(str) {
  const match = str.match(/(\d+)\.(\d+)\./)
  return match ? parseInt(match[1]) : null
}

function ServiceCalendar({ provider, activeTrade, selectedSlots, onSelectSlot }) {
  const [selectedDayNum, setSelectedDayNum] = useState(null)

  const YEAR = 2025, MONTH = 2 // März 2025
  const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate()

  const availableMap = {}
  provider.days.forEach((entry) => {
    const d = parseServiceDay(entry.day)
    if (d) availableMap[d] = entry
  })

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1
    const date = new Date(YEAR, MONTH, dayNum)
    return { dayNum, letter: DAY_LETTERS[date.getDay()], available: !!availableMap[dayNum], entry: availableMap[dayNum] || null }
  })

  const selectedEntry = selectedDayNum ? availableMap[selectedDayNum] : null

  return (
    <div className="sc-root">
      <div className="sc-month-row">
        <span className="sc-month-name">März 2025</span>
        <span className="sc-available-hint">{Object.keys(availableMap).length} Termine verfügbar</span>
      </div>

      <div className="sc-days-track">
        {days.map((day) => (
          <div key={day.dayNum} className="sc-day-col">
            <span className="sc-day-letter">{day.letter}</span>
            <button
              type="button"
              className={`sc-day-btn${day.available ? ' sc-day-btn--available' : ''}${selectedDayNum === day.dayNum ? ' sc-day-btn--selected' : ''}`}
              onClick={() => day.available && setSelectedDayNum(day.dayNum === selectedDayNum ? null : day.dayNum)}
              disabled={!day.available}
              aria-label={`${day.dayNum}. März${day.available ? ', verfügbar' : ''}`}
              aria-pressed={selectedDayNum === day.dayNum}
            >
              {day.dayNum}
            </button>
          </div>
        ))}
      </div>

      {selectedEntry ? (
        <div className="sc-slots">
          <span className="sc-slots-label">{selectedEntry.day}</span>
          <div className="sc-slot-row">
            {selectedEntry.slots.map((slot) => {
              const slotId = `${selectedEntry.day} ${slot}`
              const isActive = selectedSlots[activeTrade] === slotId
              return (
                <button
                  key={slot}
                  type="button"
                  className={`sc-slot-btn${isActive ? ' sc-slot-btn--active' : ''}`}
                  onClick={() => onSelectSlot(activeTrade, slotId)}
                  aria-pressed={isActive}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        <p className="sc-hint">Wähle einen markierten Tag aus</p>
      )}
    </div>
  )
}

// ── Service Card ──────────────────────────────────────────────────────────────

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

// ── Service Modal ─────────────────────────────────────────────────────────────

function ServiceModal({ activeTrade, selectedSlots, onSelectTrade, onSelectSlot, onClose }) {
  const provider = serviceProviders[activeTrade]

  return (
    <div className="video-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="video-modal-card service-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Handwerker-Service"
      >
        <button type="button" className="video-modal-close" onClick={onClose} aria-label="Servicefenster schliessen">
          {'\u00d7'}
        </button>

        <div className="service-modal-head">
          <div>
            <span className="service-card-kicker">Fiktive Partnerbetriebe</span>
            <h3>Passende Unterstuetzung fuer den Ausbau</h3>
            <p className="section-copy">
              Waehle das Gewerk, fuer das du Unterstuetzung brauchst.
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

        <ServiceCalendar
          provider={provider}
          activeTrade={activeTrade}
          selectedSlots={selectedSlots}
          onSelectSlot={onSelectSlot}
        />

        <div className="service-modal-actions">
          <button type="button" className="primary-btn">Termin anfragen</button>
          <p className="service-demo-note">Dies ist ein Prototyp der spaeteren Servicevermittlung.</p>
        </div>
      </div>
    </div>
  )
}

// ── Product Modal ─────────────────────────────────────────────────────────────

function ProductModal({ product, onClose }) {
  const bulkSavings = product.rentalPrices
    ? Math.round(
        ((parseFloat(product.rentalPrices[0].value) - parseFloat(product.rentalPrices[1].value)) /
          parseFloat(product.rentalPrices[0].value)) * 100,
      )
    : 0

  return (
    <div className="video-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="product-modal-new"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        <div className="product-hero-section">
          <button type="button" className="product-modal-close-new" onClick={onClose} aria-label="Produktfenster schließen">
            ×
          </button>
          <span className="product-context-badge">Für W4 Modul benötigt</span>
          <h3 className="product-title-new">{product.name}</h3>
          <p className="product-benefit-subtitle">
            {product.name.includes('Nagelpistole')
              ? 'Befestigt OSB-Platten schnell und präzise — spart 60% Zeit gegenüber Handschrauben'
              : product.description}
          </p>
          {product.rentalPrices && (
            <div className="price-highlight-box">
              <div className="price-highlight-row">
                <span className="price-label-new">Tagesmiete</span>
                <span className="price-value-new">{product.rentalPrices[0].value}</span>
              </div>
              <div className="price-highlight-row">
                <span className="price-label-new">Ab 5 Miettagen</span>
                <span className="price-value-new">
                  {product.rentalPrices[1].value}
                  <span className="savings-badge">-{bulkSavings}%</span>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="product-body-section">
          <div className="bundle-hint-box">
            <MaterialIcon />
            <span className="bundle-link"> Werkzeug-Bundle W4</span> — alle Werkzeuge für 89€/Woche
          </div>

          <div className="benefit-list-new">
            {[
              'Spart 60% Zeit bei der OSB-Montage',
              'Gleichmäßige Befestigung, weniger Nacharbeit',
              'Weniger Kraftaufwand, rückenschonend',
            ].map((benefit) => (
              <div key={benefit} className="benefit-item-new">
                <div className="benefit-check"><CheckCircleIcon /></div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="vendor-info-box">
            {[
              { label: 'Anbieter', value: product.vendor },
              { label: 'Verfügbarkeit', value: 'Sofort lieferbar' },
              { label: 'Abholung', value: 'Wiesbaden, 2,4 km' },
            ].map(({ label, value }) => (
              <div key={label} className="vendor-detail-row">
                <span className="vendor-label-new">{label}</span>
                <span className="vendor-value-new">{value}</span>
              </div>
            ))}
          </div>

          <div className="product-actions-new">
            <a href={product.link} target="_blank" rel="noopener noreferrer" className="btn-rent-now">
              Jetzt mieten <ArrowRightIcon />
            </a>
            <button className="btn-add-cart" aria-label="Zum Warenkorb hinzufügen">
              <CartIcon />
            </button>
          </div>

          <p className="affiliate-note">Affiliate-Link • BIY erhält Provision ohne Mehrkosten für dich</p>
        </div>
      </div>
    </div>
  )
}

// ── Photo Lightbox ────────────────────────────────────────────────────────────

function ZoomIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
    </svg>
  )
}

function PhotoLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="lb-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Foto vergrößert"
    >
      <button type="button" className="lb-close" onClick={onClose} aria-label="Schließen">×</button>
      <div className="lb-img-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="lb-img" />
      </div>
      <span className="lb-hint">Pinch zum Zoomen · Tippe außerhalb zum Schließen</span>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function GuidePage({ module, onBack, onScroll }) {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [activeTrade, setActiveTrade] = useState('Elektro')
  const [selectedServiceSlots, setSelectedServiceSlots] = useState({
    Elektro: '', Heizung: '', Sanitair: '',
  })
  const [activeProduct, setActiveProduct] = useState(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const [activeVisualTab, setActiveVisualTab] = useState('photo')
  const [lightboxSrc, setLightboxSrc] = useState(null)

  const actualSteps = module.steps
  const currentStep = currentStepIndex >= 0 ? actualSteps[currentStepIndex] : null
  const totalSteps = actualSteps.length
  const isLastStep = currentStepIndex === totalSteps - 1

  const totalCost = useMemo(() => {
    const sum = module.materials.reduce(
      (acc, item) =>
        acc + Number(item.total.replace(/[^0-9,.-]/g, '').replace(/\./g, '').replace(',', '.')),
      0,
    )
    return sum.toFixed(2).replace('.', ',') + ' EUR'
  }, [module.materials])

  const progressWidth = currentStepIndex === -1
    ? 0
    : ((currentStepIndex + 1) / totalSteps) * 100

  function handleMarkComplete() {
    setCompletedSteps((prev) => new Set([...prev, currentStepIndex]))
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      onBack()
    }
  }

  // ── Placeholder ──
  if (module.placeholder) {
    return (
      <section className="page-shell">
        <button className="back-btn" onClick={onBack}>
          <BackArrowIcon /> Zurueck zur Modulauswahl
        </button>
        <div className="placeholder-page">
          <h2>{module.title}</h2>
          <p>{module.description}</p>
          <p>Dieses Modul ist im Frontend bereits eingeplant und kann als naechstes mit echten Inhalten befuellt werden.</p>
        </div>
      </section>
    )
  }

  const showServiceCard =
    currentStep && module.id === 'w4' &&
    String(currentStep.no).replace(/^0+/, '') === '5'

  return (
    <div className="gd-container">

      {/* ── Sticky Progress Header ─────────────────────── */}
      <header className="gd-header" aria-label={`Anleitung: ${module.title}`}>
        <div className="gd-header-row">
          <button className="gd-back-btn" onClick={onBack} aria-label="Zurück zur Modulübersicht">
            <BackArrowIcon /> Übersicht
          </button>

          <div className="gd-header-center">
            <span className="gd-module-badge">{module.id.toUpperCase()}</span>
            <h1 className="gd-module-title">{module.title}</h1>
          </div>

          <span className="gd-prof-badge" aria-label="Statik geprüft von Experten">
            <ShieldCheckIcon /> Statik-geprüft
          </span>
        </div>

        <div className="gd-header-progress">
          <div
            className="gd-prog-track"
            role="progressbar"
            aria-valuenow={Math.round(progressWidth)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={
              currentStepIndex === -1
                ? 'Material-Übersicht'
                : `Schritt ${currentStepIndex + 1} von ${totalSteps}`
            }
          >
            <div className="gd-prog-fill" style={{ width: `${progressWidth}%` }} />
          </div>
          <span className="gd-prog-label">
            {currentStepIndex === -1
              ? 'Material-Übersicht'
              : `Schritt ${currentStepIndex + 1} / ${totalSteps}`}
          </span>
        </div>
      </header>

      {/* ── Material Overview (Schritt -1) ─────────────── */}
      {currentStepIndex === -1 && (
        <div className="material-overview-page">
          <div className="material-overview-header">
            <div className="gd-overview-meta">
              <span className="lp-context-badge">Vor dem Start</span>
              <h2>Materialien &amp; Werkzeuge</h2>
              <p>Prüfe deine Einkaufsliste, bevor du mit dem Bau beginnst.</p>
              <div className="overview-summary">
                <span>Gesamtkosten: <strong>{totalCost}</strong></span>
                <span>Gesamtdauer: <strong>{module.duration}</strong></span>
                <span className="gd-prof-inline"><ShieldCheckIcon /> Professor-validiert</span>
              </div>
            </div>
          </div>

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
                        onClick={(e) => { e.stopPropagation(); setActiveProduct(productModals.nagelpistole) }}
                      >
                        <CartIcon />
                      </button>
                    )}
                    <img src={tool.icon} alt={tool.name} className="icon-image" />
                    {tool.name === 'Nagelpistole' && (
                      <div className="tool-tooltip">
                        Nagelpistole — wird verwendet, um OSB-Platten und Holzverbindungen
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
                    <span className="material-key-badge">{item.key}</span>
                    {item.key === 'C' && (
                      <button
                        type="button"
                        className="cart-button"
                        aria-label={`${item.name} ansehen`}
                        onClick={(e) => { e.stopPropagation(); setActiveProduct(productModals.materialC) }}
                      >
                        <CartIcon />
                      </button>
                    )}
                    <div className="material-icon-image-wrap">
                      <img src={item.icon} alt={item.name} className="material-icon-image" />
                    </div>
                    <span className="material-name-label">
                      {item.name}{item.dimension && <><br /><span className="material-dimension">{item.dimension}</span></>}
                    </span>
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

          <div className="wizard-actions">
            <button onClick={onBack} className="wizard-btn wizard-btn-back">
              <BackArrowIcon /> Zurück
            </button>
            <button onClick={() => setCurrentStepIndex(0)} className="wizard-btn wizard-btn-next">
              Bau starten <ArrowRightIcon />
            </button>
          </div>
        </div>
      )}

      {/* ── Step Wizard Split Screen ────────────────────── */}
      {currentStepIndex >= 0 && currentStep && (
        <div className="gd-split" key={currentStepIndex}>

          {/* Left: Instruction Panel */}
          <aside
            className="gd-instruction"
            aria-labelledby={`gd-step-title-${currentStepIndex}`}
          >
            <div className="gd-instruction-inner" onScroll={onScroll ? (e) => onScroll(e.currentTarget.scrollTop) : undefined}>

              {/* Step Hero */}
              <div className="gd-step-hero">
                <div className={`gd-step-num${completedSteps.has(currentStepIndex) ? ' gd-step-num--done' : ''}`} aria-hidden="true">
                  {completedSteps.has(currentStepIndex)
                    ? <CheckCircleIcon size={20} />
                    : currentStep.no}
                </div>
                <div className="gd-step-meta">
                  <span className="gd-step-focus">{currentStep.focus}</span>
                  <h2 id={`gd-step-title-${currentStepIndex}`} className="gd-step-title">
                    {currentStep.title}
                  </h2>
                  <span className="gd-time-badge">
                    <ClockIcon /> {currentStep.time}
                  </span>
                </div>
              </div>

              {/* Instruction Text */}
              <p className="gd-step-text">{currentStep.text}</p>

              {/* Material Reference Chips — nur für diesen Schritt */}
              {currentStep.materials && currentStep.materials.length > 0 && (
                <div className="gd-mat-section" aria-label="Material-Referenz für diesen Schritt">
                  <div className="gd-mat-header">
                    <MaterialIcon />
                    <span className="gd-mat-label">Material-Referenz</span>
                  </div>
                  <div className="gd-mat-chips">
                    {module.materials
                      .filter((mat) => currentStep.materials.includes(mat.key))
                      .map((mat) => {
                        const isShopLink = mat.key === 'C'
                        return (
                          <button
                            key={mat.key}
                            type="button"
                            className={`gd-mat-chip${isShopLink ? ' gd-mat-chip--clickable' : ''}`}
                            onClick={() => isShopLink && setActiveProduct(productModals.materialC)}
                            aria-label={`Material ${mat.key}: ${mat.name}, ${mat.qty} Stk, ${mat.price} pro Stück`}
                            disabled={!isShopLink}
                          >
                            <span className="gd-mat-code">{mat.key}</span>
                            <span className="gd-mat-name">{mat.name}</span>
                            <div className="gd-mat-tooltip" role="tooltip">
                              <div className="gd-mat-tooltip-img-wrap">
                                <img
                                  src={mat.icon}
                                  alt={mat.name}
                                  className="gd-mat-tooltip-img"
                                />
                              </div>
                              <div className="gd-mat-tooltip-title">
                                <span className="gd-mat-tooltip-code">{mat.key}</span>
                                {mat.name}
                              </div>
                              {materialTooltipMeta[mat.key]?.dimension && (
                                <span className="gd-mat-tooltip-dim">
                                  {materialTooltipMeta[mat.key].dimension}
                                </span>
                              )}
                              <div className="gd-mat-tooltip-row">
                                <span>Menge</span><strong>{mat.qty} Stk</strong>
                              </div>
                              <div className="gd-mat-tooltip-row">
                                <span>Preis / Stk</span><strong>{mat.price}</strong>
                              </div>
                              <div className="gd-mat-tooltip-row gd-mat-tooltip-row--total">
                                <span>Gesamt</span><strong>{mat.total}</strong>
                              </div>
                              {isShopLink && (
                                <span className="gd-mat-tooltip-cta">Zum Shop →</span>
                              )}
                            </div>
                          </button>
                        )
                      })}
                  </div>
                </div>
              )}

              {/* Notes / Hinweise */}
              <div className="gd-notes-box" aria-label="Hinweise zur Ausführung">
                <div className="gd-notes-header">
                  <TipIcon />
                  <strong>Hinweise zur Ausführung</strong>
                </div>
                <ul className="gd-notes-list">
                  {currentStep.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>

              {/* Service Card */}
              {showServiceCard && (
                <StepServiceCard onOpen={() => setIsServiceModalOpen(true)} />
              )}

              {/* Module Meta */}
              <div className="gd-meta-row">
                <div className="gd-meta-item">
                  <span className="gd-meta-label">Gesamtdauer</span>
                  <strong>{module.duration}</strong>
                </div>
                <div className="gd-meta-item">
                  <span className="gd-meta-label">Materialkosten</span>
                  <strong>{totalCost}</strong>
                </div>
              </div>

            </div>

            {/* Navigation */}
            <nav className="gd-nav" aria-label="Schritt-Navigation">
              <button
                className="gd-btn-back"
                onClick={() => setCurrentStepIndex((prev) => prev <= 0 ? -1 : prev - 1)}
                aria-label="Zurück zum vorherigen Schritt"
              >
                <BackArrowIcon /> Zurück
              </button>
              <button
                className="gd-btn-complete"
                onClick={handleMarkComplete}
                aria-label={isLastStep ? 'Modul abschließen' : 'Schritt als erledigt markieren und weiter'}
              >
                <CheckCircleIcon /> {isLastStep ? 'Abschließen' : 'Erledigt'}
              </button>
              <button
                className="gd-btn-next"
                onClick={() => isLastStep ? onBack() : setCurrentStepIndex((prev) => prev + 1)}
                aria-label={isLastStep ? 'Modul abschließen' : 'Weiter zum nächsten Schritt'}
              >
                {isLastStep ? 'Fertig' : 'Weiter'} <ArrowRightIcon />
              </button>
            </nav>
          </aside>

          {/* Right: Visual Panel */}
          <section
            className="gd-visual"
            aria-label={`Visualisierung Schritt ${currentStep.no}: ${currentStep.title}`}
          >
            {/* Visual Tabs */}
            <div className="gd-visual-tabs" role="tablist" aria-label="Anzeigemodus wählen">
              <button
                role="tab"
                aria-selected={activeVisualTab === 'photo'}
                className={`gd-vtab${activeVisualTab === 'photo' ? ' active' : ''}`}
                onClick={() => setActiveVisualTab('photo')}
                disabled={!currentStep.image}
                aria-disabled={!currentStep.image}
              >
                Schritt-Foto
              </button>
              {currentStep.video && (
                <button
                  role="tab"
                  aria-selected={activeVisualTab === 'video'}
                  className={`gd-vtab${activeVisualTab === 'video' ? ' active' : ''}`}
                  onClick={() => setActiveVisualTab('video')}
                >
                  Video
                </button>
              )}
            </div>

            {/* Visual Content */}
            <div className="gd-visual-content">
              {activeVisualTab === 'photo' && currentStep.image && (
                <button
                  type="button"
                  className="gd-photo-btn"
                  onClick={() => setLightboxSrc(currentStep.image)}
                  aria-label="Foto vergrößern"
                >
                  <img
                    src={currentStep.image}
                    alt={`Schritt ${currentStep.no}: ${currentStep.title}`}
                    className="gd-step-photo"
                  />
                  <span className="gd-photo-zoom-hint"><ZoomIcon /> Vergrößern</span>
                </button>
              )}
              {activeVisualTab === 'photo' && !currentStep.image && (
                <div className="gd-no-media" role="status">
                  <span>Kein Foto für diesen Schritt</span>
                </div>
              )}
              {activeVisualTab === 'video' && currentStep.video && (
                <video
                  className="gd-step-video"
                  controls
                  autoPlay
                  preload="metadata"
                  aria-label={`Video zu Schritt ${currentStep.no}: ${currentStep.title}`}
                >
                  <source src={currentStep.video} type="video/mp4" />
                </video>
              )}
            </div>

            {/* Visual Footer */}
            <div className="gd-visual-footer">
              <span className="gd-vf-caption">Schritt {currentStep.no} — {currentStep.title}</span>
              <span className="gd-vf-sub">Interaktive 3D-Ansicht</span>
            </div>
          </section>

        </div>
      )}

      {/* ── Photo Lightbox ─────────────────────────────── */}
      {lightboxSrc && (
        <PhotoLightbox
          src={lightboxSrc}
          alt={currentStep ? `Schritt ${currentStep.no}: ${currentStep.title}` : ''}
          onClose={() => setLightboxSrc(null)}
        />
      )}

      {/* ── Modals ─────────────────────────────────────── */}
      {isServiceModalOpen && (
        <ServiceModal
          activeTrade={activeTrade}
          selectedSlots={selectedServiceSlots}
          onSelectTrade={setActiveTrade}
          onSelectSlot={(trade, slot) =>
            setSelectedServiceSlots((curr) => ({ ...curr, [trade]: slot }))
          }
          onClose={() => setIsServiceModalOpen(false)}
        />
      )}

      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}

    </div>
  )
}
