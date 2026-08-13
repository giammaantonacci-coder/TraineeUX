export interface Company {
  id: string;
  name: string;
  category: string;
  what: string;
  /** cosa si impara guardando come lavorano */
  designSignal: string;
  /** come si entra, in pratica */
  howToEnter: string;
  site: string;
  blog?: { label: string; url: string };
}

export const COMPANIES: Company[] = [
  {
    id: "linear",
    name: "Linear",
    category: "Strumenti per team prodotto",
    what:
      "Gestione di issue e progetti per team software. Prodotto di riferimento per velocità percepita e densità informativa.",
    designSignal:
      "La performance come materiale di design: ogni interazione è istantanea perché lo stato è locale e sincronizzato in background. Mostra cosa succede quando la latenza diventa un vincolo di prodotto e non un dettaglio tecnico. Da studiare anche l'uso spinto delle scorciatoie da tastiera come interfaccia primaria per gli utenti esperti.",
    howToEnter:
      "Team di design molto piccolo e selettivo, assunzioni rare e quasi sempre su segnalazione o portfolio pubblico molto forte. Realisticamente: costruisci in pubblico e fatti notare per la qualità dell'esecuzione, non per il numero di case study.",
    site: "https://linear.app",
    blog: { label: "Blog", url: "https://linear.app/blog" },
  },
  {
    id: "figma",
    name: "Figma",
    category: "Strumenti di design",
    what:
      "La piattaforma su cui lavora la maggior parte dei design team. Multiplayer, design system, prototipazione, e da tempo anche sviluppo.",
    designSignal:
      "Design di strumenti professionali complessi: come si progetta per utenti esperti che passano ore al giorno nel prodotto, senza rendere il primo giorno impossibile. Il loro lavoro sulle varianti dei componenti e sui token è di fatto la grammatica che tutta l'industria usa oggi.",
    howToEnter:
      "Processo strutturato con esercizio a casa e presentazione. Cercano forte capacità di sistema più che schermate belle. Il blog Config e i talk della conferenza dicono molto su cosa valutano.",
    site: "https://figma.com",
    blog: { label: "Figma Blog", url: "https://www.figma.com/blog/" },
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Infrastruttura di pagamento",
    what:
      "Pagamenti e infrastruttura finanziaria per internet. Il loro prodotto principale è, di fatto, la documentazione.",
    designSignal:
      "Il riferimento assoluto per il design di documentazione tecnica e per l'esperienza degli sviluppatori come disciplina di design. Da studiare: come si progetta un prodotto il cui utente principale legge del codice, e come si costruisce fiducia in un contesto dove ogni errore costa denaro reale.",
    howToEnter:
      "Assunzioni frequenti anche in Europa (Dublino). Il colloquio ha una forte componente di scrittura: la cultura interna è basata su documenti lunghi, e saper scrivere conta quanto saper progettare.",
    site: "https://stripe.com",
    blog: { label: "Stripe Blog", url: "https://stripe.com/blog" },
  },
  {
    id: "nngroup",
    name: "Nielsen Norman Group",
    category: "Ricerca e formazione UX",
    what:
      "Società di consulenza e ricerca fondata da Jakob Nielsen e Don Norman. Pubblicano ricerca applicata da oltre 25 anni.",
    designSignal:
      "Non è un'azienda dove lavorare per fare prodotto, è la fonte da cui prendere metodo. Il loro archivio di articoli è la più grande base di conoscenza UX applicata liberamente accessibile. Attenzione critica: alcuni articoli hanno vent'anni e vanno letti con la data davanti.",
    howToEnter:
      "Assumono pochissimo e cercano profili con esperienza di ricerca solida e capacità didattica. Più realistico usarli come fonte e come certificazione riconosciuta.",
    site: "https://www.nngroup.com",
    blog: { label: "Articoli", url: "https://www.nngroup.com/articles/" },
  },
  {
    id: "satispay",
    name: "Satispay",
    category: "Fintech — Italia",
    what:
      "Sistema di pagamento mobile nato in Italia, oggi presente in più mercati europei. Uno dei pochi prodotti consumer italiani con scala reale.",
    designSignal:
      "Design di prodotto consumer per un pubblico ampio e non tecnico, in un settore regolamentato. Interessante lo studio di come hanno reso semplice un'operazione (pagare in negozio) che tecnicamente non lo è, e di come gestiscono la fiducia sui soldi.",
    howToEnter:
      "Team di design a Milano in crescita, assunzioni regolari su product design e ricerca. Buon punto d'ingresso per chi lavora in Italia e vuole scala consumer.",
    site: "https://www.satispay.com",
  },
  {
    id: "bending-spoons",
    name: "Bending Spoons",
    category: "App consumer — Italia",
    what:
      "Azienda milanese che sviluppa e acquisisce app consumer di grandi dimensioni (tra cui Evernote, Remini, WeTransfer, Meetup).",
    designSignal:
      "Cultura fortemente orientata alla misurazione: le decisioni di prodotto passano quasi sempre da esperimenti. È il posto dove si impara a lavorare con dati e A/B test a volume alto — con tutte le tensioni tra ottimizzazione e visione che questo comporta.",
    howToEnter:
      "Processo di selezione molto strutturato e noto per essere selettivo, con prove analitiche. Cercano capacità di ragionamento quantitativo anche nei ruoli di design.",
    site: "https://bendingspoons.com",
  },
  {
    id: "intercom",
    name: "Intercom",
    category: "Comunicazione con i clienti",
    what:
      "Piattaforma di assistenza e comunicazione con i clienti, tra le prime ad aver integrato in profondità l'AI nel prodotto principale.",
    designSignal:
      "Uno dei laboratori più interessanti sul design di prodotti AI in produzione: come si presenta un agente che a volte sbaglia, come si passa la conversazione a un umano, come si comunica l'incertezza. Ne scrivono apertamente, inclusi i fallimenti.",
    howToEnter:
      "Sedi principali a Dublino e Londra. Il loro podcast e blog di prodotto sono la miglior preparazione al colloquio che esista.",
    site: "https://www.intercom.com",
    blog: { label: "Intercom Blog", url: "https://www.intercom.com/blog/" },
  },
  {
    id: "gov-uk",
    name: "GOV.UK Design",
    category: "Servizi pubblici digitali",
    what:
      "Il servizio digitale del governo britannico e il suo design system, riferimento mondiale per i servizi pubblici.",
    designSignal:
      "La scuola più rigorosa esistente su accessibilità, contenuti e design di servizio. I loro pattern sono documentati con la ricerca che li giustifica — cosa quasi unica. Se vuoi imparare a scrivere microcopy e a progettare moduli, il loro manuale è la fonte migliore, gratuita.",
    howToEnter:
      "Assunzioni pubbliche nel Regno Unito. Ma il valore vero per tutti è il Service Manual e il design system, applicabili a qualsiasi prodotto.",
    site: "https://design-system.service.gov.uk",
    blog: {
      label: "GDS Blog",
      url: "https://gds.blog.gov.uk",
    },
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "E-commerce",
    what:
      "Piattaforma di e-commerce usata da milioni di commercianti. Polaris è uno dei design system pubblici più maturi.",
    designSignal:
      "Design di piattaforma: come si progetta un prodotto che altri estendono con app e temi, dove le tue scelte diventano vincoli per migliaia di sviluppatori terzi. Polaris è un caso di studio completo su governance e documentazione di un design system.",
    howToEnter:
      "Azienda completamente remota con assunzioni internazionali. Il loro design system pubblico e i contributi open source sono un canale di visibilità reale.",
    site: "https://polaris.shopify.com",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    category: "AI",
    what:
      "Laboratorio di ricerca sull'AI e sviluppatore di Claude, con un'attenzione dichiarata alla sicurezza dei sistemi.",
    designSignal:
      "Territorio di design senza convenzioni consolidate: interfacce conversazionali, agenti che agiscono per conto dell'utente, comunicazione dell'incertezza e del rifiuto. È il posto dove le domande del modulo 'Design etico e interfacce AI' sono lavoro quotidiano.",
    howToEnter:
      "Assunzioni prevalentemente USA e Regno Unito, molto selettive. Cercano designer capaci di ragionare su sistemi probabilistici e di scrivere bene.",
    site: "https://www.anthropic.com",
  },
];

