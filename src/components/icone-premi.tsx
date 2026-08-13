/**
 * Le icone dei premi.
 *
 * Prima erano emoji, ed erano l'ultimo posto dove ne restavano. Un'emoji la
 * disegna il sistema operativo, non noi: 🌱 su iOS e 🌱 su Android sono due
 * disegni diversi, a colori pieni, con un peso e uno stile che non è quello
 * dell'app. In mezzo a icone di tratto sottile e monocrome sembravano
 * incollate da un'altra interfaccia — la stessa ragione per cui la freccia
 * "apre fuori" era già stata disegnata a mano.
 *
 * Stessa griglia 24×24 delle altre, stesso spessore, currentColor: prendono il
 * colore del testo accanto e si spengono insieme al premio non ancora vinto,
 * senza bisogno di desaturarle.
 */

import { FlameIcon } from "@/components/icons";

type Props = { className?: string };

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

/** Primo passo: il germoglio che spunta. */
function GermoglioIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M12 21v-7.4" />
      <path d="M12 13.6c0-3.4 2.8-6.2 6.2-6.2 0 3.4-2.8 6.2-6.2 6.2Z" />
      <path d="M12 17.4c0-3-2.4-5.4-5.4-5.4 0 3 2.4 5.4 5.4 5.4Z" />
    </svg>
  );
}

/** Occhio critico: la lente. */
function LenteIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <circle cx="10.6" cy="10.6" r="6.2" />
      <path d="M15.2 15.2 20 20" />
    </svg>
  );
}

/** Decisore: la bussola, che indica una direzione fra tutte. */
function BussolaIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M15.6 8.4 13.7 13.7 8.4 15.6 10.3 10.3Z" />
    </svg>
  );
}

/** Penna veloce: brief consegnati a tempo. */
function CronometroIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <circle cx="12" cy="13.8" r="7.2" />
      <path d="M12 10.2v3.6l2.4 1.7" />
      <path d="M9.6 3.2h4.8" />
      <path d="M12 3.2v3.4" />
    </svg>
  );
}

/** Punteggio pieno: la stella, che non ha gradi intermedi. */
function StellaIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M12 3.4 14.7 9l6 .9-4.35 4.2 1.03 6-5.38-2.83L6.62 20.1l1.03-6L3.3 9.9l6-.9Z" />
    </svg>
  );
}

/** Trenta giorni: la montagna, che si sale un giorno alla volta. */
function MontagnaIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M2.6 19.4h18.8L14.2 6.2l-3.6 6.4-2.2-3.3Z" />
      <path d="M11.6 10.8h5.2" />
    </svg>
  );
}

/**
 * Padronanza: il tocco accademico.
 *
 * Il bersaglio sarebbe stato la scelta ovvia, ma era gia' occupato due volte:
 * dal tipo di esercizio "critique" e dalla strategia di prodotto. E disegnato
 * con la freccia che ci entra dentro leggeva come il simbolo di Marte, non
 * come un tiro andato a segno. Un modulo padroneggiato e' un modulo
 * diplomato, e questo non lo dice nient'altro nell'app.
 */
function ToccoIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M2.4 9 12 4.4 21.6 9 12 13.6Z" />
      <path d="M6.6 11.1v4.7c0 1.7 2.4 3 5.4 3s5.4-1.3 5.4-3v-4.7" />
      <path d="M21.6 9v5.2" />
    </svg>
  );
}

/** Oltre le basi: il razzo che lascia il livello di partenza. */
function RazzoIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M12 2.8c3 2.7 4.6 6.2 4.6 9.9L14.8 16H9.2l-1.8-3.3c0-3.7 1.6-7.2 4.6-9.9Z" />
      <circle cx="12" cy="10.2" r="1.9" />
      <path d="M9.2 16.4 6.4 21l4-1.8" />
      <path d="M14.8 16.4 17.6 21l-4-1.8" />
    </svg>
  );
}

/** Mentalità senior: la corona. */
function CoronaIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M4.6 18h14.8l1.4-9.6-5.1 3.6L12 5.6l-3.7 6.4-5.1-3.6Z" />
      <path d="M7.4 21h9.2" />
    </svg>
  );
}

/** Metodo: la beuta, cioè provare in tanti posti diversi. */
function BeutaIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M9.6 3.4v6.2L4.9 17.8A2 2 0 0 0 6.6 20.8h10.8a2 2 0 0 0 1.7-3l-4.7-8.2V3.4" />
      <path d="M8.4 3.4h7.2" />
      <path d="M7.1 14.8h9.8" />
    </svg>
  );
}

/**
 * Maratoneta: la coccarda.
 *
 * Col nastro sopra il disco leggeva come un lucchetto: due forme chiuse una
 * sull'altra, e il cerchio in basso diventava il corpo della serratura. Con i
 * nastri sotto la forma e' inequivocabile.
 */
function CoccardaIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <circle cx="12" cy="8.6" r="5.6" />
      <path d="M8.5 13 7.1 21.2 12 18.4l4.9 2.8L15.5 13" />
    </svg>
  );
}

const PER_PREMIO: Record<string, (p: Props) => React.ReactElement> = {
  "primo-passo": GermoglioIcon,
  "occhio-critico": LenteIcon,
  decisore: BussolaIcon,
  "penna-veloce": CronometroIcon,
  perfezione: StellaIcon,
  "streak-7": FlameIcon,
  "streak-30": MontagnaIcon,
  "modulo-padroneggiato": ToccoIcon,
  "livello-avanzato": RazzoIcon,
  "livello-senior": CoronaIcon,
  ricercatore: BeutaIcon,
  maratoneta: CoccardaIcon,
};

/**
 * L'icona di un premio, nel suo riquadro.
 *
 * Riquadro di larghezza fissa per la stessa ragione di prima: allineate al
 * flusso, icone di larghezza diversa farebbero partire il testo da un punto
 * diverso a ogni riga. Il fondo è neutro ovunque — il colore in questa app
 * dice a quale modulo appartiene una cosa, e un premio non appartiene a
 * nessun modulo.
 */
export function PremioIcon({
  id,
  className = "h-10 w-10",
  onDark = false,
}: {
  id: string;
  className?: string;
  onDark?: boolean;
}) {
  const Icon = PER_PREMIO[id] ?? StellaIcon;
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-2xl ${
        onDark ? "bg-white/10" : "bg-black/[0.04]"
      } ${className}`}
    >
      <Icon className="h-[62%] w-[62%]" />
    </span>
  );
}
