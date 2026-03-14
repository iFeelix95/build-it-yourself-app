export const modules = [
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
      {
        key: 'A',
        name: 'Schraube',
        icon: '/icons/schraube_80_160.png',
        qty: 15,
        price: '0,70 €',
        total: '10,50 €',
      },
      {
        key: 'B',
        name: 'Ständer',
        icon: '/icons/stuetze.png',
        qty: 5,
        price: '23,17 €',
        total: '115,85 €',
      },
      {
        key: 'C',
        name: 'Rähm/Schwelle',
        icon: '/icons/balken.png',
        qty: 2,
        price: '23,17 €',
        total: '46,34 €',
        shopUrl:
          'https://www.holzland.de/p/konstruktionsvollholz-fichte-nsi-nicht-sichtbarer-einbau-c24/HL1634565/?itemId=7000537361&pmzr=10133',
      },
      {
        key: 'D',
        name: 'OSB-Platte',
        icon: '/icons/osb.png',
        qty: 4,
        price: '26,97 €',
        total: '107,88 €',
      },
      {
        key: 'E',
        name: 'Schraube',
        icon: '/icons/schraube_35_40.png',
        qty: 68,
        price: '0,04 €',
        total: '2,72 €',
      },
      {
        key: 'F',
        name: 'Zugverankerung',
        icon: '/icons/zugverankerung.png',
        qty: 1,
        price: '7,42 €',
        total: '7,42 €',
      },
      {
        key: 'G',
        name: 'Dämmplatte',
        icon: '/icons/daemmplatte.png',
        qty: 4,
        price: '35,39 €',
        total: '141,56 €',
      },
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
