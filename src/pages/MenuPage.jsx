import { useState } from 'react'
import { modules } from '../data/modules'

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="10" fill="#639922" fillOpacity="0.15" />
      <path d="M5.5 10l3.2 3.2 5.8-6" stroke="#639922" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function UnlockIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2.2 2.2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M8 1.5L2.5 4v4c0 3 2.5 5.5 5.5 6 3-0.5 5.5-3 5.5-6V4L8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

// ── Purchase Modal ────────────────────────────────────────────────────────────

function PurchaseModal({ isOpen, onClose, module, onPurchaseComplete }) {
  const [selectedPayment, setSelectedPayment] = useState('paypal')
  const [isProcessing, setIsProcessing] = useState(false)

  function handlePurchase() {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      onPurchaseComplete(module.id)
      onClose()
    }, 2000)
  }

  if (!isOpen || !module) return null

  const paymentOptions = [
    { value: 'paypal', label: 'PayPal', desc: 'Sicher & schnell' },
    { value: 'card', label: 'Visa · Mastercard', desc: 'Kreditkarte' },
    { value: 'sofort', label: 'Sofortüberweisung', desc: 'Direkte Überweisung' },
    { value: 'sepa', label: 'SEPA-Lastschrift', desc: 'Bankkonto' },
  ]

  const benefits = [
    'Schritt-für-Schritt 3D-Anleitung',
    'Komplette Materialliste mit Preisen',
    'Professor-validierte Statik',
    'Video-Tutorials',
    'Lebenslanger Zugriff',
  ]

  return (
    <div className="pm-overlay" onClick={onClose} role="presentation">
      <div
        className="pm-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Modul ${module.id.toUpperCase()} freischalten`}
      >
        <button
          type="button"
          className="pm-close"
          onClick={onClose}
          aria-label="Kaufdialog schließen"
        >
          ×
        </button>

        {/* Header */}
        <div className="pm-header">
          <div className="pm-module-info">
            <span className="pm-module-badge">{module.id.toUpperCase()}</span>
            <h3 className="pm-title">{module.title}</h3>
            <p className="pm-desc">{module.description}</p>
          </div>
          <div className="pm-price">
            <span className="pm-currency">€</span>
            <span className="pm-amount">89</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="pm-benefits">
          <h4 className="pm-section-label">Das erhalten Sie:</h4>
          <ul className="pm-benefit-list">
            {benefits.map((b) => (
              <li key={b} className="pm-benefit-item">
                <CheckCircleIcon />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Options */}
        <div className="pm-payment">
          <h4 className="pm-section-label">Bezahlmethode wählen:</h4>
          <div className="pm-options" role="radiogroup" aria-label="Bezahlmethode">
            {paymentOptions.map((opt) => (
              <label
                key={opt.value}
                className={`pm-option${selectedPayment === opt.value ? ' pm-option--selected' : ''}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={opt.value}
                  checked={selectedPayment === opt.value}
                  onChange={() => setSelectedPayment(opt.value)}
                  className="pm-radio"
                />
                <div className="pm-option-card">
                  <span className="pm-option-label">{opt.label}</span>
                  <span className="pm-option-desc">{opt.desc}</span>
                </div>
                {selectedPayment === opt.value && (
                  <span className="pm-option-check" aria-hidden="true">
                    <CheckCircleIcon />
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pm-actions">
          <button type="button" className="pm-btn-cancel" onClick={onClose}>
            Abbrechen
          </button>
          <button
            type="button"
            className={`pm-btn-purchase${isProcessing ? ' pm-btn-purchase--processing' : ''}`}
            onClick={handlePurchase}
            disabled={isProcessing}
            aria-busy={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="pm-spinner" aria-hidden="true" />
                Wird verarbeitet…
              </>
            ) : (
              <>
                <UnlockIcon size={15} />
                Jetzt für €89 freischalten
              </>
            )}
          </button>
        </div>

        {/* Trust */}
        <div className="pm-trust">
          <span className="pm-trust-badge"><ShieldIcon /> SSL-verschlüsselt</span>
          <span className="pm-trust-badge"><CheckCircleIcon /> 14 Tage Geld-zurück</span>
          <span className="pm-trust-badge"><CheckCircleIcon /> Kein Abo</span>
        </div>
      </div>
    </div>
  )
}

// ── Success Toast ─────────────────────────────────────────────────────────────

function SuccessToast({ moduleId, onDismiss }) {
  return (
    <div className="pm-toast" role="status" aria-live="polite">
      <span className="pm-toast-icon"><CheckCircleIcon /></span>
      <span>
        <strong>Modul {moduleId.toUpperCase()} freigeschaltet!</strong>
        <br />
        Du kannst jetzt mit dem Bau beginnen.
      </span>
      <button type="button" className="pm-toast-close" onClick={onDismiss} aria-label="Meldung schließen">
        ×
      </button>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const phases = [
  { key: 'tragwerk', label: 'Phase 1 — Tragwerk', desc: 'Fundament & tragende Wände' },
  { key: 'decken-dach', label: 'Phase 2 — Decken & Dach', desc: 'Rohbau abschließen' },
]

// ── Main Component ────────────────────────────────────────────────────────────

export default function MenuPage({ onOpenModule }) {
  const isDemoMode = typeof window !== 'undefined' && window.location.search.includes('demo=true')

  const [unlockedModules, setUnlockedModules] = useState(
    isDemoMode ? modules.map((m) => m.id) : ['w4'],
  )
  const [purchaseTarget, setPurchaseTarget] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [toastModuleId, setToastModuleId] = useState(null)

  const completedCount = modules.filter((m) => m.completed).length
  const totalCount = modules.length

  function isUnlocked(mod) {
    return unlockedModules.includes(mod.id) || !mod.locked
  }

  function getStatus(mod) {
    if (mod.completed) return 'completed'
    if (!isUnlocked(mod)) return 'locked'
    return 'active'
  }

  function getStatusText(mod) {
    if (mod.completed) return 'Abgeschlossen'
    if (!isUnlocked(mod)) return 'Gesperrt'
    return 'Verfügbar'
  }

  function handleUnlockClick(mod) {
    setPurchaseTarget(mod)
    setShowModal(true)
  }

  function handlePurchaseComplete(moduleId) {
    setUnlockedModules((prev) => [...prev, moduleId])
    setToastModuleId(moduleId)
    setTimeout(() => setToastModuleId(null), 4000)
  }

  return (
    <section className="page-shell mn-page">

      {/* ── Header ── */}
      <header className="mn-header" aria-labelledby="mn-heading">
        <span className="lp-context-badge" role="note">Bauablauf</span>
        <h1 id="mn-heading" className="mn-h1">Schritt für Schritt<br />zum Rohbau</h1>
        <p className="mn-subtitle">
          Arbeite dich durch die Module in der richtigen Reihenfolge.
          Jeder Schritt baut auf dem vorherigen auf.
        </p>
        <div className="mn-progress-row" aria-label={`${completedCount} von ${totalCount} Modulen abgeschlossen`}>
          <div className="mn-progress-bar" role="progressbar" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={totalCount}>
            <div className="mn-progress-fill" style={{ width: `${(completedCount / totalCount) * 100}%` }} />
          </div>
          <span className="mn-progress-label">{completedCount}/{totalCount} Module</span>
        </div>
        {isDemoMode && (
          <span className="pm-demo-badge" role="note">Demo-Modus — alle Module freigeschaltet</span>
        )}
      </header>

      {/* ── Timeline ── */}
      <div className="mn-timeline" role="list" aria-label="Baumodule Timeline">
        <div className="mn-timeline-line" aria-hidden="true" />

        {phases.map((phase) => {
          const phaseModules = modules.filter((m) => m.phase === phase.key)
          if (phaseModules.length === 0) return null
          return (
            <div key={phase.key} className="mn-phase" role="group" aria-label={phase.label}>
              <div className="mn-phase-header">
                <span className="mn-phase-label">{phase.label}</span>
                <span className="mn-phase-desc">{phase.desc}</span>
              </div>

              {phaseModules.map((mod) => {
                const status = getStatus(mod)
                const unlocked = isUnlocked(mod)
                return (
                  <div key={mod.id} className="mn-item" role="listitem">
                    {/* Timeline Dot */}
                    <div className={`mn-dot mn-dot--${status}`} aria-hidden="true">
                      {mod.completed
                        ? <CheckIcon />
                        : !unlocked
                          ? <LockIcon />
                          : <span className="mn-dot-step">{mod.step}</span>
                      }
                    </div>

                    {/* Card */}
                    <article
                      className={`mn-card mn-card--${status}`}
                      onClick={() => unlocked && onOpenModule(mod)}
                      aria-label={`${mod.shortTitle} — ${getStatusText(mod)}`}
                      tabIndex={unlocked ? 0 : -1}
                      onKeyDown={(e) => e.key === 'Enter' && unlocked && onOpenModule(mod)}
                      role="button"
                    >
                      <div className="mn-card-body">
                        <div className="mn-card-top">
                          <span className="mn-module-tag">{mod.id.toUpperCase()}</span>
                          <span className={`mn-status-badge mn-status-badge--${status}`}>
                            {getStatusText(mod)}
                          </span>
                        </div>
                        <h3 className="mn-card-title">{mod.shortTitle}</h3>
                        <p className="mn-card-desc">{mod.description}</p>
                        <span className="mn-card-duration">{mod.duration}</span>
                      </div>

                      <div className="mn-card-aside">
                        <span className="mn-card-price">€ {mod.price || '89'}</span>
                        {!unlocked ? (
                          <button
                            type="button"
                            className="mn-btn mn-btn--unlock"
                            onClick={(e) => { e.stopPropagation(); handleUnlockClick(mod) }}
                            aria-label={`Modul ${mod.id.toUpperCase()} für €89 freischalten`}
                          >
                            <UnlockIcon /> Freischalten
                          </button>
                        ) : mod.completed ? (
                          <button
                            type="button"
                            className="mn-btn mn-btn--completed"
                            onClick={(e) => { e.stopPropagation(); onOpenModule(mod) }}
                            aria-label={`${mod.shortTitle} anzeigen`}
                          >
                            <CheckIcon /> Anzeigen
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="mn-btn mn-btn--active"
                            onClick={(e) => { e.stopPropagation(); onOpenModule(mod) }}
                            aria-label={`${mod.shortTitle} starten`}
                          >
                            <ArrowIcon /> Starten
                          </button>
                        )}
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* ── Purchase Modal ── */}
      <PurchaseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        module={purchaseTarget}
        onPurchaseComplete={handlePurchaseComplete}
      />

      {/* ── Success Toast ── */}
      {toastModuleId && (
        <SuccessToast moduleId={toastModuleId} onDismiss={() => setToastModuleId(null)} />
      )}

    </section>
  )
}
