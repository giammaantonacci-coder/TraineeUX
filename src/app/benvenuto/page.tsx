import Link from "next/link";
import type { Metadata } from "next";
import { AuthPanel } from "@/components/AuthPanel";
import { BITY_MOOD_BY_LEVEL, Bity } from "@/components/Bity";
import { ExerciseIcon, TrophyIcon, UnlockIcon } from "@/components/icons";
import { Onboarding, type Passo } from "@/components/Onboarding";
import { MODULES, TOTAL_EXERCISES } from "@/content";
import { LEVELS } from "@/lib/progression";
import type { ExerciseType } from "@/lib/types";

export const metadata: Metadata = { title: "Benvenuto" };

/**
 * Gli inciampi che riportano qui.
 *
 * Prima queste rotte rimandavano su /benvenuto con un ?errore= che nessuno
 * leggeva: chi annullava l'accesso con Google, o apriva un link di conferma
 * scaduto, tornava su una schermata identica a prima, senza una parola. Sembra
 * che il tocco non abbia funzionato, e si riprova all'infinito.
 */
const ERRORI: Record<string, string> = {
  "accesso-annullato":
    "Accesso annullato. Puoi riprovare, oppure entrare con email e password.",
  "accesso-fallito":
    "Non siamo riusciti a completare l'accesso. Riprova fra poco: se insiste, entra con email e password.",
  "link-non-valido":
    "Questo link di conferma non è più valido: i link scadono, e ognuno si può usare una volta sola. Accedi qui sotto e te ne rimandiamo uno nuovo.",
};

/**
 * I quattro modi di allenarsi.
 *
 * Senza colore. Nel resto dell'app il fondo di quel riquadro e' l'accento del
 * modulo — sulla home, dentro un riquadro colorato ci sta l'icona del tipo di
 * esercizio, e il colore viene dal modulo che lo contiene. Qui i moduli non ci
 * sono ancora, quindi un colore per tipo sarebbe stato inventato: avrebbe
 * insegnato "azzurro = quiz" nel primo minuto, e l'app lo avrebbe smentito al
 * primo quiz dentro un modulo verde.
 */
const MODI: {
  tipo: ExerciseType;
  titolo: string;
  corpo: string;
}[] = [
  {
    tipo: "quiz",
    titolo: "Quiz secchi",
    corpo:
      "Domande con una risposta giusta e tre plausibili. Servono a togliere le sviste, non a fare punteggio.",
  },
  {
    tipo: "critique",
    titolo: "Critique di interfacce reali",
    corpo:
      "Guardi uno schermo e dici cosa non va e perché, con il vocabolario che useresti in una revisione vera.",
  },
  {
    tipo: "scenario",
    titolo: "Scenari con conseguenze",
    corpo:
      "Scegli, e la scelta produce un effetto: il costo di una decisione si vede dopo, come sul lavoro.",
  },
  {
    tipo: "brief",
    titolo: "Brief a tempo",
    corpo:
      "Scrivi la tua proposta col cronometro, poi la confronti con la rubrica e con la risposta di chi quel problema l'ha risolto.",
  },
];

export default async function BenvenutoPage({
  searchParams,
}: {
  searchParams: Promise<{ errore?: string }>;
}) {
  const { errore } = await searchParams;
  const avviso = errore ? ERRORI[errore] : undefined;

  /**
   * I quattro passi.
   *
   * Ognuno risponde a una domanda sola, nell'ordine in cui uno se le fa: cosa
   * si impara, fino a dove si arriva, come ci si allena, e solo alla fine chi
   * sei. Prima era tutto su una schermata sola, e la richiesta dell'email
   * arrivava dopo due schermate di scorrimento, quando la promessa era gia'
   * evaporata.
   */
  const passi: Passo[] = [
    {
      id: "moduli",
      titolo: "Cosa si allena",
      contenuto: (
        <>
          {/* Marchio: Bity accanto al nome. È il primo schermo dell'app e
              l'unico posto dove la mascotte si presenta per nome. */}
          <div className="mb-5 flex items-center gap-2.5">
            <Bity size={44} float label="Bity, la mascotte di TraineeUX" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
              TraineeUX
            </p>
          </div>

          <h1 className="text-[32px] font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            Allenati sul giudizio,
            <br />
            non sulle schermate.
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
            Dodici moduli di UX e product design, dal livello intermedio
            all&apos;expert. Niente teoria da ripetere: casi reali, decisioni con
            conseguenze, e il confronto tra la tua risposta e quella di chi quel
            problema l&apos;ha già affrontato.
          </p>

          <dl className="mt-7 grid grid-cols-3 gap-3">
            <Stat value={`${MODULES.length}`} label="moduli" />
            <Stat value={`${TOTAL_EXERCISES}`} label="esercizi" />
            <Stat value={`${LEVELS.length}`} label="livelli" />
          </dl>

          {/* I dodici titoli per esteso, non un riassunto: e' la risposta alla
              domanda "di cosa parla", e a quella domanda un numero non
              risponde.
              Una card sola invece di dodici: dodici riquadri uguali, uno per
              riga, facevano sembrare l'elenco un menu di cose da scegliere
              adesso — e qui non c'e' niente da scegliere, si sta solo
              guardando cosa c'e' dentro. Il testo e' a peso normale perche'
              e' un elenco da scorrere con l'occhio, non dodici titoli da
              pesare uno per uno. */}
          <div className="mt-7 rounded-3xl bg-surface-muted p-5">
            <h2 className="text-sm font-bold">I dodici moduli</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[14px] leading-snug text-ink-muted marker:text-ink/25">
              {MODULES.map((m) => (
                <li key={m.id}>{m.title}</li>
              ))}
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "livelli",
      titolo: "Fino a dove si arriva",
      contenuto: (
        <>
          <h1 className="text-[28px] font-extrabold leading-tight tracking-tight md:text-4xl">
            Cinque livelli, che non aggiungono strumenti
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">
            Allargano l&apos;ambito su cui decidi: dallo schermo che hai davanti
            alle scelte che reggono per anni. Puoi affrontare i moduli
            nell&apos;ordine che preferisci — i moltiplicatori di XP crescono con
            il livello.
          </p>

          {/* Una lista ordinata, non cinque div: la sequenza dei livelli è
              informazione, e così la riceve anche chi non vede
              l'impaginazione. Bity prende la tinta del livello, che è la stessa
              che ritroverà nel percorso: il colore si impara qui.
              L'espressione sale con il livello — da neutra a esultante — così
              la scala si legge dalle facce prima che dai nomi, e scorrendo si
              capisce che sono gradini e non categorie affiancate.
              Il seme sfasa respiro e palpebre: cinque Bity che sbattono le
              palpebre all'unisono sembrano un'animazione, non cinque
              personaggi. */}
          <ol className="mt-7 space-y-3">
            {LEVELS.map((level, n) => (
              <li
                key={level.id}
                className="flex items-center gap-3 rounded-3xl bg-surface-muted p-4"
              >
                <Bity
                  level={level.id}
                  mood={BITY_MOOD_BY_LEVEL[level.id]}
                  seed={n + 1}
                  size={44}
                  className="shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[15px] font-bold">{level.name}</p>
                  <p className="text-[13px] leading-snug text-ink-muted">
                    {level.subtitle}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </>
      ),
    },
    {
      id: "allenamento",
      titolo: "Come ci si allena",
      contenuto: (
        <>
          <h1 className="text-[28px] font-extrabold leading-tight tracking-tight md:text-4xl">
            Quattro modi di allenarti
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">
            Nessuno dei quattro si supera ricordando una definizione: si supera
            scegliendo, e motivando la scelta.
          </p>

          {/* Un'icona per modo: sono le stesse che compaiono sulle card dei
              consigli, quindi qui si imparano e dopo si riconoscono. Quattro
              blocchi di solo testo, invece, si distinguevano solo leggendoli
              tutti e quattro. */}
          <div className="mt-7 space-y-3">
            {MODI.map((m) => (
              <div key={m.tipo} className="card-light flex items-start gap-3.5 p-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface-muted"
                >
                  <ExerciseIcon type={m.tipo} className="h-[22px] w-[22px]" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold">{m.titolo}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                    {m.corpo}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Queste due non sono modi di allenarsi ma cosa resta dopo, e prima
              erano le uniche due card senza icona di tutta la schermata: una
              card spaiata si legge come un pezzo dimenticato, non come una
              categoria diversa. La distinzione la fa il titolo qui sopra e lo
              stacco, non l'assenza del disegno. */}
          <h2 className="mt-9 text-lg font-extrabold tracking-tight">
            E cosa ti resta
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Vantaggio
              icona={<TrophyIcon className="h-[22px] w-[22px]" />}
              titolo="Progressi e premi"
              corpo="XP per esercizio, serie giornaliera, badge e gradi da Praticante a Expert."
            />
            <Vantaggio
              icona={<UnlockIcon className="h-[22px] w-[22px]" />}
              titolo="Capacità sbloccate"
              corpo="Per ogni modulo padroneggiato vedi cosa puoi fare in concreto sul lavoro, e che segnale di seniority manda."
            />
          </div>
        </>
      ),
    },
    {
      id: "accesso",
      titolo: "Crea il tuo account",
      contenuto: (
        <>
          {avviso ? (
            <p
              role="alert"
              className="mb-4 rounded-3xl bg-blush/40 px-5 py-4 text-sm font-medium leading-relaxed text-ink"
            >
              {avviso}
            </p>
          ) : null}
          <AuthPanel />
          {/* Sotto il modulo di iscrizione, dove va letta: e' il momento in
              cui si sta per lasciare un'email a qualcuno. */}
          <p className="mt-4 text-center text-[13px] leading-relaxed text-ink-muted">
            Iscrivendoti accetti i{" "}
            <Link href="/termini" className="font-semibold underline">
              termini di servizio
            </Link>{" "}
            e il trattamento descritto nell&apos;
            <Link href="/privacy" className="font-semibold underline">
              informativa privacy
            </Link>
            .
          </p>
        </>
      ),
    },
  ];

  // Chi torna qui da un accesso fallito ha gia' visto la presentazione: la cosa
  // da fare e' riprovare, non ricominciare da capo.
  return <Onboarding passi={passi} partiDa={avviso ? passi.length - 1 : 0} />;
}

/**
 * Numero e parola sulla stessa riga.
 *
 * Su due righe la card era alta il doppio per dire la stessa cosa. Allineati
 * sulla linea di base e non al centro: "12" e "moduli" hanno corpi diversi, e
 * centrandoli verticalmente la parola sembrerebbe scivolata in su.
 *
 * Nel documento il termine viene prima del valore, come vuole una lista di
 * definizioni; l'ordine visivo lo ribalta, perche' a leggere si parte dal
 * numero.
 */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-dark flex items-baseline justify-center gap-1.5 px-2 py-2.5">
      <dt className="order-2 text-[11px] font-semibold text-white/60">{label}</dt>
      <dd className="order-1 text-xl font-extrabold">{value}</dd>
    </div>
  );
}

/** Stessa forma delle card dei modi: riquadro neutro a sinistra, testo a destra. */
function Vantaggio({
  icona,
  titolo,
  corpo,
}: {
  icona: React.ReactNode;
  titolo: string;
  corpo: string;
}) {
  return (
    <div className="card-light flex items-start gap-3.5 p-4">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface-muted"
      >
        {icona}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold">{titolo}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{corpo}</p>
      </div>
    </div>
  );
}
