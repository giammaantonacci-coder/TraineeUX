import type { ReactNode } from "react";

/**
 * Un'icona per modulo.
 *
 * Serve a distinguere dodici card che, tolto il titolo, erano identiche. Il
 * colore da solo non poteva farlo: gli accenti sono quattro e i moduli dodici,
 * quindi fino a quattro card portavano la stessa tinta. Un disegno diverso per
 * ciascuno invece distingue davvero, e per di più dice di cosa parla il modulo
 * prima che si legga il titolo.
 *
 * Stessa griglia e stesso spessore delle icone dei tipi di esercizio e della
 * navigazione: dentro riquadri uguali il centro è geometrico e il tratto non
 * cambia peso passando da una all'altra.
 *
 * I disegni evitano di ripetersi fra loro dove i temi sono vicini: la lente sta
 * solo sulle euristiche, la ricerca usa persona più fumetto, la critique due
 * fumetti, l'organizzazione tre persone. Due icone simili su temi diversi sono
 * peggio di nessuna icona.
 */

const comune = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  focusable: "false" as const,
};

const DISEGNI: Record<string, ReactNode> = {
  /* Lente con un segno di spunta: le euristiche come strumento diagnostico,
     non come citazione. */
  "euristiche-avanzate": (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.4 15.4 20.5 20.5" />
      <path d="M7.8 10.6l2 2 3.6-4.2" />
    </>
  ),

  /* Un nodo che si dirama in due: la struttura prima delle schermate. */
  "architettura-informativa": (
    <>
      <rect x="9" y="3" width="6" height="4.5" rx="1.3" />
      <rect x="2.5" y="16.5" width="6" height="4.5" rx="1.3" />
      <rect x="15.5" y="16.5" width="6" height="4.5" rx="1.3" />
      <path d="M12 7.5v5M5.5 16.5v-4h13v4" />
    </>
  ),

  /* Il triangolo dell'avviso: il modulo degli stati intermedi e degli errori. */
  "stati-e-microcopy": (
    <>
      <path d="M12 4.2 21 19.5H3z" />
      <path d="M12 10v4.2" />
      <path d="M12 17.2h.01" />
    </>
  ),

  /* Quattro tessere uguali: un sistema è fatto di parti che si ripetono. */
  "design-system": (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
    </>
  ),

  /* Una persona e un fumetto: la ricerca è chiedere, non dedurre. */
  "ricerca-utente": (
    <>
      <circle cx="8" cy="8.5" r="3" />
      <path d="M2.8 19c0-2.9 2.3-5.2 5.2-5.2s5.2 2.3 5.2 5.2" />
      <path d="M14.5 3.5h5.7a1.3 1.3 0 0 1 1.3 1.3v3.6a1.3 1.3 0 0 1-1.3 1.3h-1.9L15.5 12V9.7h-1a1.3 1.3 0 0 1-1.3-1.3V4.8a1.3 1.3 0 0 1 1.3-1.3z" />
    </>
  ),

  /* Il simbolo universale dell'accessibilità. */
  accessibilita: (
    <>
      <circle cx="12" cy="4.3" r="1.9" />
      <path d="M4.8 8.6c4.6 1.6 9.8 1.6 14.4 0" />
      <path d="M12 8.6v5.2M12 13.8l-3.1 6.3M12 13.8l3.1 6.3" />
    </>
  ),

  /* Assi e tre colonne: quello che si misura e si confronta. */
  "metriche-esperimenti": (
    <>
      <path d="M4 3.5v17h16.5" />
      <path d="M8.5 17.5v-4.5" />
      <path d="M13.5 17.5v-9" />
      <path d="M18.5 17.5v-6.5" />
    </>
  ),

  /* Una bandiera piantata: la strategia è dichiarare dove si va, e restarci.
     Era un bersaglio a cerchi concentrici, cioè quasi il disegno che l'app usa
     già per le critique — e due icone identiche su significati diversi sono
     peggio di nessuna icona. Il bersaglio, per di più, diceva "colpire": la
     strategia non è la mira, è la scelta del posto. */
  "strategia-prodotto": (
    <>
      <path d="M6.4 21V3.2" />
      <path d="M6.4 4.1h11.3l-2.9 3.5 2.9 3.5H6.4z" />
    </>
  ),

  /* Due fumetti che si accavallano: la critique è uno scambio, non un verdetto. */
  "influenza-e-critique": (
    <>
      <path d="M2.8 5.6a1.6 1.6 0 0 1 1.6-1.6h9.2a1.6 1.6 0 0 1 1.6 1.6v4.6a1.6 1.6 0 0 1-1.6 1.6H6.9l-4.1 3z" />
      <path d="M8.6 15.1a1.6 1.6 0 0 1 1.6-1.6h9a1.6 1.6 0 0 1 1.6 1.6v2.9a1.6 1.6 0 0 1-1.6 1.6h-6.5l-4.1 3z" />
    </>
  ),

  /* Tre persone: scalare vuol dire che il lavoro passa dagli altri. */
  "scalare-il-design": (
    <>
      <circle cx="12" cy="7" r="2.7" />
      <path d="M7.4 19.5c0-2.6 2.1-4.6 4.6-4.6s4.6 2 4.6 4.6" />
      <circle cx="4.4" cy="10.2" r="2" />
      <path d="M1.2 18.6c0-2 1.4-3.5 3.2-3.5" />
      <circle cx="19.6" cy="10.2" r="2" />
      <path d="M22.8 18.6c0-2-1.4-3.5-3.2-3.5" />
    </>
  ),

  /* Strati sovrapposti: una piattaforma è ciò su cui poggiano gli altri. */
  "piattaforma-e-migrazioni": (
    <>
      <path d="M12 2.8 21 7.4 12 12 3 7.4z" />
      <path d="M3 12.2 12 16.8l9-4.6" />
      <path d="M3 16.6 12 21.2l9-4.6" />
    </>
  ),

  /* Una bilancia: l'etica è un peso da mettere sul piatto, non una regola. */
  "etica-e-ai": (
    <>
      <path d="M12 4.5v15.5M7.5 20h9" />
      <path d="M3.6 8h16.8" />
      <path d="M3.6 8 1.2 13a2.6 2.6 0 0 0 4.8 0z" />
      <path d="M20.4 8 18 13a2.6 2.6 0 0 0 4.8 0z" />
    </>
  ),
};

/**
 * Ripiego per un modulo senza disegno.
 *
 * Un modulo aggiunto in futuro non deve lasciare un riquadro colorato vuoto,
 * che si legge come un difetto di caricamento. Questo cerchio non dice niente
 * del tema, ma occupa il posto in modo dichiarato.
 */
const PREDEFINITO: ReactNode = (
  <>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 8.2v4.4" />
    <path d="M12 15.6h.01" />
  </>
);

export function ModuloIcon({
  moduleId,
  className,
}: {
  moduleId: string;
  className?: string;
}) {
  return (
    <svg {...comune} className={className}>
      {DISEGNI[moduleId] ?? PREDEFINITO}
    </svg>
  );
}
