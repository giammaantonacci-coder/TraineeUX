import Link from "next/link";
import { AuthPanel } from "@/components/AuthPanel";
import { Bity } from "@/components/Bity";
import type { Metadata } from "next";
import { MODULES, TOTAL_EXERCISES } from "@/content";
import { LEVELS } from "@/lib/progression";

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

export default async function BenvenutoPage({
  searchParams,
}: {
  searchParams: Promise<{ errore?: string }>;
}) {
  const { errore } = await searchParams;
  const avviso = errore ? ERRORI[errore] : undefined;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-5xl px-4 py-8 md:px-6 md:py-14">
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-12">
        <div>
          {/* Marchio: Bity accanto al nome. È il primo schermo dell'app e l'unico
              posto dove la mascotte si presenta per nome. */}
          <div className="mb-4 flex items-center gap-2.5">
            <Bity size={44} float label="Bity, la mascotte di TraineeUX" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
              TraineeUX
            </p>
          </div>
          <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            Allenati sul giudizio,
            <br />
            non sulle schermate.
          </h1>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-muted">
            Un percorso di UX e product design che parte da un livello intermedio e
            arriva a moduli da senior, lead ed expert. Niente teoria da ripetere: casi
            reali, decisioni con conseguenze, e il confronto tra la tua risposta e
            quella di chi quel problema l&apos;ha già affrontato.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-3">
            <Stat value={`${MODULES.length}`} label="moduli" />
            <Stat value={`${TOTAL_EXERCISES}`} label="esercizi" />
            <Stat value={`${LEVELS.length}`} label="livelli" />
          </dl>

          {/* Una lista ordinata, non cinque div: la sequenza dei livelli è
              informazione, e così la riceve anche chi non vede l'impaginazione.
              Bity prende la tinta del livello, che è la stessa che ritroverà nel
              percorso: il colore si impara qui. */}
          <ol className="mt-8 space-y-3">
            {LEVELS.map((level) => (
              <li
                key={level.id}
                className="flex items-center gap-3 rounded-3xl bg-surface-muted p-3.5"
              >
                <Bity level={level.id} size={38} className="shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-bold">{level.name}</p>
                  <p className="text-[13px] leading-snug text-ink-muted">
                    {level.subtitle}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Feature
              title="Quattro modi di allenarti"
              body="Quiz secchi, critique di interfacce reali, scenari con conseguenze, brief a tempo con rubrica di autovalutazione."
            />
            <Feature
              title="Progressi e premi"
              body="XP per esercizio, serie giornaliera, badge e gradi da Praticante a Expert."
            />
            <Feature
              title="Capacità sbloccate"
              body="Per ogni modulo padroneggiato vedi cosa puoi fare in concreto sul lavoro, e che segnale di seniority manda."
            />
            <Feature
              title="News e aziende"
              body="Feed aggiornato dalle fonti che contano e schede sulle aziende del settore, con come ci si entra."
            />
          </div>
        </div>

        <div className="md:sticky md:top-14">
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
          <p className="mt-4 text-center text-[13px] text-ink-muted">
            Iscrivendoti accetti il trattamento descritto nell&apos;
            <Link href="/privacy" className="font-semibold underline">
              informativa privacy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-dark px-4 py-3">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block text-2xl font-extrabold">{value}</span>
        <span className="text-xs font-semibold text-white/60">{label}</span>
      </dd>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="card-light p-4">
      <p className="text-sm font-bold">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
