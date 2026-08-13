import Link from "next/link";
import { Bity } from "@/components/Bity";
import { CheckIcon, CircleIcon } from "@/components/icons";
import { Pill, ScoreRing } from "@/components/ui";
import { MASTERY_THRESHOLD } from "@/lib/progression";
import type { Badge, Capability, LevelId } from "@/lib/types";

/**
 * La schermata che chiude un modulo.
 *
 * Fino a ora l'unico momento di arrivo era la fine di un esercizio, e il
 * modulo — che e' l'unita' vera del percorso — non ne aveva uno suo. Qui si
 * mette insieme quello che si e' ottenuto: quanto sei andato bene, i premi che
 * sono scattati, e cosa sai fare adesso.
 *
 * Completato non e' padroneggiato, e la schermata non li confonde. Si arriva
 * qui avendo svolto tutti gli esercizi — il 100% del modulo — che e' una
 * misura di copertura; le capacita' nel profilo dipendono invece dal
 * punteggio. Chi finisce tutto restando sotto la soglia merita comunque di
 * essere arrivato in fondo, e merita anche di sapere cosa gli manca.
 *
 * Riceve tutto gia' calcolato: cosi' la stessa schermata puo' comparire dopo
 * l'ultima consegna o essere riaperta dal percorso, senza sapere da dove
 * arriva.
 */
export function ModuloCompletato({
  titolo,
  livello,
  nomeLivello,
  punteggio,
  svolti,
  totali,
  xp,
  premi,
  capacita,
  prossimo,
}: {
  titolo: string;
  livello: LevelId;
  nomeLivello: string;
  /** miglior punteggio sul modulo, in percentuale */
  punteggio: number;
  svolti: number;
  totali: number;
  xp: number;
  premi: Badge[];
  capacita: Capability[];
  prossimo: { id: string; title: string } | null;
}) {
  const padroneggiato = punteggio >= MASTERY_THRESHOLD;

  return (
    <div className="animate-rise">
      {/* Bity grande e in festa, nel colore del livello: e' l'unico posto dove
          la mascotte porta la notizia invece di accompagnarla. Trionfa se il
          modulo e' anche padroneggiato, e' fiera se il traguardo e' solo
          l'averlo finito — la differenza si vede prima di leggere. */}
      <section className="card-dark p-6 text-center md:p-8">
        <Bity
          mood={padroneggiato ? "trionfante" : "fiero"}
          level={livello}
          size={128}
          pop
          className="mx-auto"
        />
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
          Modulo completato
        </p>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight md:text-3xl">
          {titolo}
        </h1>
        <p className="mt-2 text-sm text-white/60">{nomeLivello}</p>

        <div className="mt-5 flex items-center justify-center gap-4">
          <ScoreRing value={punteggio} size={72} onDark />
          <div className="text-left">
            <p className="text-sm font-bold">
              {svolti}/{totali} esercizi
            </p>
            <p className="text-sm text-white/60">+{xp} XP dal modulo</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-white/10 pt-5">
          {padroneggiato ? (
            <Pill tone="mint">Padroneggiato</Pill>
          ) : (
            <Pill className="bg-white/10 text-white">Non ancora padroneggiato</Pill>
          )}
          <Pill className="bg-white/10 text-white">Miglior punteggio {punteggio}%</Pill>
        </div>
      </section>

      {premi.length > 0 ? (
        <section className="mt-6">
          <h2 className="mb-3 text-lg font-bold tracking-tight">Premi conquistati</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {premi.map((b) => (
              <li key={b.id} className="card-light flex items-center gap-3 p-4">
                <span aria-hidden="true" className="text-2xl">
                  {b.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block font-bold">{b.name}</span>
                  <span className="block text-[13px] leading-snug text-ink-muted">
                    {b.description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-6">
        <h2 className="mb-1 text-lg font-bold tracking-tight">
          {padroneggiato ? "Cosa sai fare ora" : "Cosa ti stai giocando"}
        </h2>
        <p className="mb-3 text-sm text-ink-muted">
          {padroneggiato
            ? "Queste sono attive nel tuo profilo. Sono scritte per essere dette in un colloquio, non per essere ripetute a memoria."
            : `Hai finito tutti gli esercizi, ma il miglior punteggio è ${punteggio}%. Queste capacità si attivano nel profilo sopra il ${MASTERY_THRESHOLD}%: rifai l'esercizio che ti è riuscito peggio e sono tue.`}
        </p>
        <ul className="space-y-4">
          {capacita.map((c, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  padroneggiato ? "bg-mint text-ink" : "bg-black/5 text-ink-muted"
                }`}
              >
                {padroneggiato ? (
                  <CheckIcon className="h-3.5 w-3.5" />
                ) : (
                  <CircleIcon className="h-3 w-3" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold leading-relaxed">{c.claim}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                  <span className="font-semibold">Perché conta: </span>
                  {c.signal}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Il passo dopo, non un vicolo cieco: chi arriva qui ha appena finito
          qualcosa ed e' il momento in cui e' piu' disposto a ricominciare.
          Il ritorno al percorso sta sotto e centrato, non affiancato: sono due
          azioni di peso diverso — una porta avanti, l'altra indietro — e
          affiancate si contendevano la stessa riga come se pari fossero. */}
      <div className="mt-8">
        {prossimo ? (
          <Link
            href={`/percorso/${prossimo.id}`}
            className="tappable block rounded-full bg-ink px-6 py-3.5 text-center text-sm font-bold text-white"
          >
            Vai a {prossimo.title}
          </Link>
        ) : null}
        <Link
          href="/percorso"
          className="tappable mx-auto mt-3 block w-fit rounded-full px-5 py-2.5 text-center text-sm font-bold text-ink-muted active:bg-black/5"
        >
          Torna al percorso
        </Link>
      </div>
    </div>
  );
}
