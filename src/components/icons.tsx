import type { ExerciseType } from "@/lib/types";

/**
 * Icone disegnate, non caratteri di testo.
 *
 * Prima i tipi di esercizio erano glifi (◷ ◎ ⌥ ✎) messi al centro di un
 * riquadro con items-center: quello centra la riga di testo, non il disegno.
 * Ogni carattere ha estensioni proprie sopra e sotto la linea di base, quindi
 * dentro riquadri identici i quattro simboli finivano a altezze diverse — la
 * matita in particolare risultava alta e spostata a sinistra.
 *
 * Su una griglia 24×24 il centro è geometrico e uguale per tutte, e lo spessore
 * del tratto è lo stesso della navigazione.
 */

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

/** Quiz: tre risposte fra cui scegliere. */
function QuizIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <circle cx="5.5" cy="7" r="1.75" />
      <circle cx="5.5" cy="12" r="1.75" />
      <circle cx="5.5" cy="17" r="1.75" />
      <path d="M10.5 7h8M10.5 12h8M10.5 17h8" />
    </svg>
  );
}

/** Critique: il bersaglio che si guarda da vicino. */
function CritiqueIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.1" />
    </svg>
  );
}

/** Scenario: una decisione che si biforca. */
function ScenarioIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M12 20.5v-4.2" />
      <path d="M12 16.3c0-3 1.9-4.9 4.9-4.9h1.3" />
      <path d="M12 16.3c0-3-1.9-4.9-4.9-4.9H5.8" />
      <circle cx="18.4" cy="11.4" r="1.6" />
      <circle cx="5.6" cy="11.4" r="1.6" />
      <circle cx="12" cy="5.4" r="1.6" />
      <path d="M12 7v4.4" />
    </svg>
  );
}

/** Brief: si scrive. */
function BriefIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M4.5 19.5 8 18.6 19.1 7.5a2.05 2.05 0 0 0-2.9-2.9L5.1 15.7Z" />
      <path d="M14.9 6.8 17.8 9.7" />
    </svg>
  );
}

const PER_TIPO: Record<ExerciseType, (p: Props) => React.ReactElement> = {
  quiz: QuizIcon,
  critique: CritiqueIcon,
  scenario: ScenarioIcon,
  brief: BriefIcon,
};

export function ExerciseIcon({
  type,
  className,
}: {
  type: ExerciseType;
  className?: string;
}) {
  const Icon = PER_TIPO[type];
  return <Icon className={className} />;
}

/** Spunta della padronanza: stessa griglia, stesso centro dei numeri accanto. */
export function CheckIcon({ className }: Props) {
  return (
    <svg {...comune} strokeWidth={2.4} className={className}>
      <path d="M5.5 12.5 10 17l8.5-9" />
    </svg>
  );
}

/** Capacità non ancora attiva: cerchio vuoto, al posto del glifo ○. */
export function CircleIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <circle cx="12" cy="12" r="6.4" />
    </svg>
  );
}

/**
 * Le frecce dei comandi.
 *
 * Disegnate e non i caratteri ‹ ›, per la stessa ragione per cui lo sono i
 * tipi di esercizio: dentro un cerchio, un glifo si allinea sulla riga di
 * testo, che ha estensioni sopra e sotto la linea di base e non coincide con
 * il centro del disegno. Su una griglia 24×24 il centro è geometrico, quindi
 * la punta cade esattamente al centro del pulsante.
 */
export function ChevronLeftIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M9.5 5.5 16 12l-6.5 6.5" />
    </svg>
  );
}

/**
 * Il collegamento che esce dall'app.
 *
 * Era il carattere ↗, cioè un'emoji: su iOS viene resa a colori, con il suo
 * riquadro azzurro, e in mezzo a un testo nero sembrava un pezzo di
 * interfaccia di qualcun altro. Disegnata, prende il colore del testo accanto
 * e sta sulla stessa griglia delle altre.
 */
export function ExternalIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M9 5H6.2A2.2 2.2 0 0 0 4 7.2v10.6A2.2 2.2 0 0 0 6.2 20h10.6a2.2 2.2 0 0 0 2.2-2.2V15" />
      <path d="M14 4h6v6" />
      <path d="M20 4 11.5 12.5" />
    </svg>
  );
}

/** Progressi e premi: la coppa. */
export function TrophyIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M7.6 3.8h8.8v5.1a4.4 4.4 0 0 1-8.8 0z" />
      <path d="M7.6 5.4H5a2.5 2.5 0 0 0 2.6 3.6" />
      <path d="M16.4 5.4H19a2.5 2.5 0 0 1-2.6 3.6" />
      <path d="M12 13.3v3.1" />
      <path d="M9.6 16.4h4.8l.7 3.8H8.9z" />
    </svg>
  );
}

/** Capacità sbloccate: il lucchetto aperto. */
export function UnlockIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <rect x="4.2" y="10.4" width="15.6" height="9.8" rx="2.6" />
      <path d="M8.4 10.4V6.9a3.9 3.9 0 0 1 7.5-1.4" />
      <circle cx="12" cy="15.3" r="1.3" />
    </svg>
  );
}

/** Campanella del centro notifiche. */
export function BellIcon({ className }: Props) {
  return (
    <svg {...comune} className={className}>
      <path d="M18 9.5a6 6 0 1 0-12 0c0 4.2-1.4 5.6-1.9 6.1a.6.6 0 0 0 .4 1h15a.6.6 0 0 0 .4-1c-.5-.5-1.9-1.9-1.9-6.1" />
      <path d="M10.2 19.5a2.1 2.1 0 0 0 3.6 0" />
    </svg>
  );
}
