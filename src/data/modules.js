export const modules = [
  {
    id: 'w4',
    title: 'Bauteil W4 \u2013 Holzst\u00e4nderwand EG',
    shortTitle: 'W4 \u2013 Holzst\u00e4nderwand EG',
    category: 'W\u00e4nde',
    duration: 'ca. 120 min',
    description:
      'Eine gef\u00fchrte Schritt-f\u00fcr-Schritt-Anleitung f\u00fcr den Aufbau einer Holzst\u00e4nderwand inklusive Vormontage, Beplankung, Befestigung, D\u00e4mmung und Sicherung.',
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
        price: '0,70 \u20ac',
        total: '10,50 \u20ac',
      },
      {
        key: 'B',
        name: 'St\u00e4nder',
        icon: '/icons/stuetze.png',
        qty: 5,
        price: '23,17 \u20ac',
        total: '115,85 \u20ac',
      },
      {
        key: 'C',
        name: 'R\u00e4hm/Schwelle',
        icon: '/icons/balken.png',
        qty: 2,
        price: '23,17 \u20ac',
        total: '46,34 \u20ac',
        shopUrl:
          'https://www.holzland.de/p/konstruktionsvollholz-fichte-nsi-nicht-sichtbarer-einbau-c24/HL1634565/?itemId=7000537361&pmzr=10133',
      },
      {
        key: 'D',
        name: 'OSB-Platte',
        icon: '/icons/osb.png',
        qty: 4,
        price: '26,97 \u20ac',
        total: '107,88 \u20ac',
      },
      {
        key: 'E',
        name: 'Schraube',
        icon: '/icons/schraube_35_40.png',
        qty: 68,
        price: '0,04 \u20ac',
        total: '2,72 \u20ac',
      },
      {
        key: 'F',
        name: 'Zugverankerung',
        icon: '/icons/zugverankerung.png',
        qty: 1,
        price: '7,42 \u20ac',
        total: '7,42 \u20ac',
      },
      {
        key: 'G',
        name: 'D\u00e4mmplatte',
        icon: '/icons/daemmplatte.png',
        qty: 4,
        price: '35,39 \u20ac',
        total: '141,56 \u20ac',
      },
    ],
    steps: [
      {
        no: '01',
        title: 'St\u00e4nderwand vormontieren',
        time: '20 min bei 2 Personen',
        focus: 'Montage',
        text:
          'Die f\u00fcnf St\u00e4nder werden zwischen Schwelle und R\u00e4hm liegend ausgerichtet. Halte das Achsma\u00df von 62,5 cm ein, richte alle St\u00e4nder rechtwinklig aus und setze pro Verbindungspunkt eine Schraube mittig in den St\u00e4nder.',
        notes: [
          'Abst\u00e4nde vor dem Verschrauben mit Zollstock oder Richtschnur pr\u00fcfen.',
          'Schrauben leicht vorbohren oder sauber anrei\u00dfen.',
          'Arbeitsfl\u00e4che bei Bedarf mit Zwingen fixieren.',
        ],
      },
      {
        no: '02',
        title: 'OSB-Beplankung montieren',
        time: '20 min bei 2 Personen',
        focus: 'Beplankung',
        text:
          'Die vorbereitete Wand wird mit zwei OSB-Platten beplankt. Beide Platten liegen sto\u00dffrei nebeneinander, der Sto\u00df liegt mittig auf einem St\u00e4nder. Die Verschraubung erfolgt im gleichm\u00e4\u00dfigen Raster.',
        notes: [
          'Mindestens 13 mm Randabstand zur Plattenkante einhalten.',
          'Platten b\u00fcndig zur Unterkante der Schwelle ausrichten.',
          'St\u00e4nderlage vorzeichnen, damit jede Schraube sauber sitzt.',
        ],
      },
      {
        no: '03',
        title: 'Wand aufrichten',
        time: '10 min bei 2 Personen',
        focus: 'Positionierung',
        text:
          'Die vormontierte Wand wird aufgerichtet und lotrecht an der Au\u00dfenkante des Bodens aufgestellt. Vor dem endg\u00fcltigen Verschrauben sollte die Wand provisorisch gesichert werden.',
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
          'Pro Wandfeld wird eine Schraube mittig durch die Schwelle in den Boden gesetzt. Anschlie\u00dfend wird die Zugverankerung am rechten Endst\u00e4nder verschraubt und zus\u00e4tzlich schr\u00e4g im Boden befestigt.',
        notes: [
          'Zugverankerung m\u00f6glichst nah an der Ecke montieren.',
          'Sitz und Lot nach dem Verschrauben erneut pr\u00fcfen.',
        ],
      },
      {
        no: '05',
        title: 'D\u00e4mmung einlegen',
        time: '20 min bei 2 Personen',
        focus: 'Ausbau',
        text:
          'Die Hohlr\u00e4ume zwischen den St\u00e4ndern werden mit D\u00e4mmplatten spannungsfrei, aber formschl\u00fcssig ausgef\u00fcllt. Gleichzeitig bleibt Raum f\u00fcr Elektro, Wasser oder Heizungsinstallationen.',
        notes: [
          'Ohne Hohlr\u00e4ume oder Fugen arbeiten.',
          'Installationen fr\u00fchzeitig mitdenken.',
        ],
      },
      {
        no: '06',
        title: 'Wandr\u00fcckseite beplanken und sichern',
        time: '20 min bei 2 Personen',
        focus: 'Abschluss',
        text:
          'Zum Abschluss wird die R\u00fcckseite analog zur Vorderseite mit zwei OSB-Platten beplankt. Wenn die Wand noch freisteht, muss sie tempor\u00e4r abgest\u00fctzt werden.',
        notes: [
          'Schr\u00e4gst\u00fctzen oder eine tempor\u00e4re Aussteifung vorsehen.',
          'Bis zur vollst\u00e4ndigen Verbindung mit angrenzenden Bauteilen sichern.',
        ],
      },
    ],
  },
  {
    id: 'd1',
    title: 'Bauteil D1 \u2013 Deckenmodul',
    shortTitle: 'D1 \u2013 Deckenmodul',
    category: 'Decken',
    duration: 'folgt',
    placeholder: true,
    description:
      'Platzhalter f\u00fcr weitere Module. Hier kann sp\u00e4ter das n\u00e4chste Bauteil erg\u00e4nzt werden.',
    steps: [],
    materials: [],
    tools: [],
  },
  {
    id: 'r1',
    title: 'Bauteil R1 \u2013 Dachelement',
    shortTitle: 'R1 \u2013 Dachelement',
    category: 'Dach',
    duration: 'folgt',
    placeholder: true,
    description:
      'Platzhalter f\u00fcr weitere Module. Die Struktur ist bereits vorbereitet.',
    steps: [],
    materials: [],
    tools: [],
  },
]
