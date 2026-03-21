import { useEffect, useMemo, useState } from 'react'

const APP_CODE_IMAGE_MAP = {
  A: {
    src: '/icons/schraube_80_160.png',
    alt: 'Schraube 80x160',
  },
  B: {
    src: '/icons/stuetze.png',
    alt: 'Ständer',
  },
  C: {
    src: '/icons/balken.png',
    alt: 'Rähm / Schwelle',
  },
  D: {
    src: '/icons/osb.png',
    alt: 'OSB-Platte',
  },
}

function parseNumber(value) {
  const trimmed = value?.trim()

  if (!trimmed) {
    return null
  }

  const parsed = Number(trimmed)

  if (Number.isNaN(parsed)) {
    return null
  }

  return Number.isInteger(parsed) ? parsed : parsed
}

function formatNumber(value) {
  if (value == null) {
    return 'n/a'
  }

  return Number.isInteger(value) ? String(value) : String(value)
}

function parseCsv(text) {
  const lines = text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length === 0) {
    return []
  }

  const [headerLine, ...dataLines] = lines
  const headers = headerLine.split(',').map((header) => header.trim())

  return dataLines.map((line) => {
    const values = line.split(',').map((value) => value.trim())
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']))

    return {
      step: row.Arbeitsschritt?.trim() || null,
      name: row.Bauteil_Name?.trim() || null,
      length: parseNumber(row.Bauteil_Laenge),
      width: parseNumber(row.Bauteil_Breite),
      height: parseNumber(row.Bauteil_Hoehe),
      appCode: row.Bauteil_app_code?.trim() || null,
    }
  })
}

function groupRecords(records) {
  const lengthRelevantMap = new Map()
  const otherMap = new Map()

  records.forEach((record) => {
    if (!record.name) {
      return
    }

    const isLengthRelevant =
      record.name.includes('Stütze') || record.name.includes('Balken')

    if (isLengthRelevant) {
      const key = [
        record.name,
        record.length ?? '',
        record.width ?? '',
        record.height ?? '',
      ].join('|')

      const current = lengthRelevantMap.get(key)

      if (current) {
        current.count += 1
        current.appCode = current.appCode || record.appCode
        return
      }

      lengthRelevantMap.set(key, {
        ...record,
        count: 1,
      })

      return
    }

    const current = otherMap.get(record.name)

    if (current) {
      current.count += 1
      current.appCode = current.appCode || record.appCode
      return
    }

    otherMap.set(record.name, {
      ...record,
      count: 1,
    })
  })

  const sortByName = (a, b) => a.name.localeCompare(b.name, 'de')

  return {
    lengthRelevant: Array.from(lengthRelevantMap.values()).sort(sortByName),
    others: Array.from(otherMap.values()).sort(sortByName),
  }
}

export default function ImportTestPage() {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadCsv() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch('/data/bauteil_w4_codes.csv')

        if (!response.ok) {
          throw new Error(`CSV konnte nicht geladen werden (${response.status})`)
        }

        const text = await response.text()
        const parsedRecords = parseCsv(text)

        if (isActive) {
          setRecords(parsedRecords)
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : 'Unbekannter Fehler beim CSV-Import')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadCsv()

    return () => {
      isActive = false
    }
  }, [])

  const groupedData = useMemo(() => groupRecords(records), [records])
  const totalGroups = groupedData.lengthRelevant.length + groupedData.others.length

  return (
    <main className="page-shell">
      <section className="import-test-page">
        <div className="import-test-header">
          <p className="eyebrow">CSV Test</p>
          <h1>Import-Testseite für Revit-Schedules</h1>
          <p className="lead">
            Diese Ansicht lädt die CSV aus dem Public-Ordner, wandelt die Zeilen in
            Bauteil-Objekte um und zeigt sie gruppiert an.
          </p>
        </div>

        <div className="import-test-status">
          <span>{isLoading ? 'Lade CSV...' : `${records.length} CSV-Zeilen geladen`}</span>
          <span>{`${totalGroups} Gruppen erzeugt`}</span>
          {error && <span className="import-test-status import-test-status--error">{error}</span>}
        </div>

        <div className="import-test-grid">
          <section className="import-test-panel">
            <div className="import-test-panel-head">
              <h2>Längenrelevante Bauteile</h2>
              <span>{groupedData.lengthRelevant.length} Gruppen</span>
            </div>

            {groupedData.lengthRelevant.length === 0 ? (
              <p className="import-test-empty">
                {isLoading ? 'Daten werden geladen.' : 'Keine längenrelevanten Bauteile gefunden.'}
              </p>
            ) : (
              <ul className="import-test-list">
                {groupedData.lengthRelevant.map((item) => (
                  <li
                    key={`${item.name}-${item.length}-${item.width}-${item.height}`}
                    className="import-test-item"
                  >
                    {APP_CODE_IMAGE_MAP[item.appCode] ? (
                      <img
                        src={APP_CODE_IMAGE_MAP[item.appCode].src}
                        alt={APP_CODE_IMAGE_MAP[item.appCode].alt}
                        className="import-test-thumb"
                      />
                    ) : null}
                    <div className="import-test-item-copy">
                      <strong>{item.name}</strong>
                      {item.appCode ? <span>Code: {item.appCode}</span> : null}
                      <span>{item.count} Stück</span>
                      <span>Länge {formatNumber(item.length)} mm</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="import-test-panel">
            <div className="import-test-panel-head">
              <h2>Sonstige Bauteile</h2>
              <span>{groupedData.others.length} Gruppen</span>
            </div>

            {groupedData.others.length === 0 ? (
              <p className="import-test-empty">
                {isLoading ? 'Daten werden geladen.' : 'Keine sonstigen Bauteile gefunden.'}
              </p>
            ) : (
              <ul className="import-test-list">
                {groupedData.others.map((item) => (
                  <li key={item.name} className="import-test-item">
                    {APP_CODE_IMAGE_MAP[item.appCode] ? (
                      <img
                        src={APP_CODE_IMAGE_MAP[item.appCode].src}
                        alt={APP_CODE_IMAGE_MAP[item.appCode].alt}
                        className="import-test-thumb"
                      />
                    ) : null}
                    <div className="import-test-item-copy">
                      <strong>{item.name}</strong>
                      {item.appCode ? <span>Code: {item.appCode}</span> : null}
                      <span>{item.count} Stück</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}
