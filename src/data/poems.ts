export interface Poem {
  title: string;
  stanzas: string[][];
}

export const poems: Poem[] = [
  {
    title: "Mi Vida, Mi Ser",
    stanzas: [
      [
        "Te busco en el misterio de la esquiva fortuna,",
        "está en la forma en que apareces sin avisar,",
        "en la costumbre nueva de mirar el día",
        "buscando una razón para sonreír.",
      ],
      [
        "No son solo pétalos, es una forma de decir",
        "que hay cosas que se agradecen en silencio,",
        "que hay personas que llegan y, sin pedirlo,",
        "le cambian el color a todo lo demás.",
      ],
    ],
  },
  {
    title: "Lo simple",
    stanzas: [
      [
        "Quise regalarte algo que durara,",
        "y elegí lo que se marchita pronto:",
        "una flor, un gesto, un ratito de tiempo",
        "hecho a mano, con cuidado, para ti.",
      ],
      [
        "Porque lo simple, cuando es sincero,",
        "vale más que cualquier cosa grande,",
        "y estas flores amarillas solo quieren",
        "recordarte que alguien piensa en ti hoy.",
      ],
    ],
  },
  {
    title: "21 de septiembre",
    stanzas: [
      [
        "Que empiece la primavera contigo,",
        "que el ramo se abra como se abre un día bueno,",
        "que cada pétalo sea un motivo distinto",
        "para celebrar que existes, que estás, que sos.",
      ],
      [
        "Esto no busca nada a cambio,",
        "es solo un gracias con forma de flor,",
        "dedicado, hoy y siempre, a vos.",
      ],
    ],
  },
];
