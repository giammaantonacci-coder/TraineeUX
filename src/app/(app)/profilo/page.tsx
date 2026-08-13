import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions";
import { EXERCISE_TYPE_LABEL, MODULES, TOTAL_EXERCISES } from "@/content";
import { BADGES } from "@/content/badges";
import {
  getProfileData,
  highestLevelReached,
  moduleBestPct,
  totalAttempts,
  totalExercisesDone,
} from "@/lib/data";
import { MASTERY_THRESHOLD, levelMeta, rankForXp } from "@/lib/progression";
import { nomeDiBattesimo } from "@/lib/labels";
import { PageHeader, Pill, ProgressBar, ScoreRing } from "@/components/ui";
import { Bity } from "@/components/Bity";
import { BellIcon } from "@/components/icons";
import { PremioIcon } from "@/components/icone-premi";
import { ImpostazioniNotifiche } from "@/components/ImpostazioniNotifiche";
import { contaNonLette, leggiPreferenze } from "@/app/notifiche/actions";

export const metadata: Metadata = { title: "Profilo" };

export default async function ProfiloPage() {
  const [data, prefNotifiche, nonLette] = await Promise.all([
    getProfileData(),
    leggiPreferenze(),
    contaNonLette(),
  ]);
  if (!data) redirect("/benvenuto");

  const { profile, best, byType, badges } = data;
  const xp = profile?.xp ?? 0;
  const rank = rankForXp(xp);
  const earned = new Set(badges.map((b) => b.badge_id));

  const mastered = MODULES.filter(
    (m) => moduleBestPct(best, m.id) >= MASTERY_THRESHOLD,
  );

  const doneCount = totalExercisesDone(best);
  const reachedLevel = highestLevelReached(best);
  // Raggruppate per modulo, non in fila.
  //
  // Ogni modulo ne porta esattamente tre, quindi in fila la stessa etichetta
  // ricompariva tre volte di seguito: con tutti i moduli chiusi diventavano
  // trentasei pillole per dodici nomi. L'etichetta e' una proprieta' del
  // gruppo, e nel gruppo va detta una volta sola.
  const perModulo = mastered
    .map((m) => ({ modulo: m, voci: m.capabilities }))
    .filter((g) => g.voci.length > 0);
  const quante = perModulo.reduce((n, g) => n + g.voci.length, 0);

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Profilo"
        bity={{ mood: doneCount === 0 ? "curioso" : "felice", level: reachedLevel }}
        bityLabel={`Bity nel colore del livello ${levelMeta(reachedLevel).name}`}
        title={nomeDiBattesimo(profile?.display_name ?? data.email ?? "Il tuo profilo")}
        subtitle={data.email ?? undefined}
        /* La campanella vive qui e non più sulla home: il centro notifiche e
           le sue impostazioni stanno nella stessa sezione, e la home resta
           una schermata di sole cose da fare.
           Il pallino è l'unico segnale che c'è qualcosa da leggere, quindi il
           conteggio va anche nel nome accessibile. */
        azione={
          <Link
            href="/notifiche"
            aria-label={
              nonLette > 0
                ? `Notifiche, ${nonLette} da leggere`
                : "Notifiche, nessuna da leggere"
            }
            className="tappable relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white active:bg-black/5"
          >
            <BellIcon className="h-5 w-5 text-ink-muted" />
            {nonLette > 0 ? (
              <span
                aria-hidden="true"
                className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-blush-deep"
              />
            ) : null}
          </Link>
        }
      />

      <section className="card-dark p-6 md:p-7">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
              Grado
            </p>
            <p className="mt-1 text-3xl font-extrabold">{rank.current.name}</p>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/70">
              {rank.current.description}
            </p>
          </div>
          {/* Stesso trattamento della card sulla home: numero e unità sono due
              blocchi appoggiati allo stesso bordo destro, e il numero scende
              di due pixel e mezzo — misurati sull'inchiostro, non sulla riga —
              per mettersi alla stessa altezza dell'occhiello accanto. */}
          <div className="shrink-0 text-right">
            <span className="mt-[2.5px] block text-3xl font-extrabold leading-none">
              {xp}
            </span>
            <span className="mt-1.5 block text-xs font-semibold leading-none text-white/50">
              XP
            </span>
          </div>
        </div>
        <div className="mt-5">
          <ProgressBar value={rank.progress} tone="light" />
          <p className="mt-2 text-xs font-medium text-white/60">
            {rank.next
              ? `${rank.next.minXp - xp} XP a ${rank.next.name}`
              : "Grado massimo raggiunto."}
          </p>
        </div>

        {/* I numeri stanno dentro la card, sotto una riga, come stavano in
            quella della home.
            Cinque colonne su un telefono lasciano una sessantina di pixel per
            voce, quindi le etichette sono al minimo — "moduli" invece di
            "moduli padroneggiati" — e la versione per esteso vive nel dt, che
            si vede solo con uno screen reader. La forma abbreviata e' leggibile
            perche' i cinque numeri si leggono insieme e si spiegano a vicenda;
            letta da sola, "serie" non direbbe se e' quella in corso o il
            record, ed e' esattamente il motivo per cui il testo esteso non
            sparisce ma cambia solo canale. */}
        <dl className="mt-5 flex justify-between border-t border-white/10 pt-4">
          <MiniStat value={`${doneCount}/${TOTAL_EXERCISES}`} label="esercizi" full="esercizi svolti" />
          <MiniStat value={`${mastered.length}/${MODULES.length}`} label="moduli" full="moduli padroneggiati" />
          <MiniStat value={`${totalAttempts(best)}`} label="tentativi" full="tentativi totali" />
          <MiniStat value={`${profile?.streak_count ?? 0}`} label="serie" full="serie attuale" />
          <MiniStat value={`${profile?.longest_streak ?? 0}`} label="record" full="serie record" />
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="mb-1 text-lg font-bold tracking-tight">
          Cosa sai fare, in concreto
        </h2>
        <p className="mb-4 text-sm text-ink-muted">
          Le capacità si attivano quando chiudi un modulo sopra il {MASTERY_THRESHOLD}%.
          Sono formulate come le scriveresti in un colloquio o in una valutazione:
          cose che sai fare, non cose che hai studiato.
        </p>
        {quante === 0 ? (
          <div className="card-light p-6 text-center">
            <Bity mood="curioso" size={64} className="mx-auto mb-2" float />
            <p className="font-bold">Nessuna capacità sbloccata per ora</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              Chiudi il tuo primo modulo sopra il {MASTERY_THRESHOLD}% e qui comparirà
              cosa quel modulo ti mette in condizione di fare.
            </p>
            <Link
              href="/percorso"
              className="mt-4 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white"
            >
              Vai al percorso
            </Link>
          </div>
        ) : (
          /* Un gruppo per modulo: l'etichetta in cima, e sotto le sue voci
             senza riquadro. Trentasei card bianche una sull'altra erano
             trentasei bordi da guardare per leggere trentasei frasi: il
             raggruppamento lo fa gia' l'intestazione, e la scatola non
             aggiungeva niente se non rumore. */
          <div className="space-y-7">
            {perModulo.map((g) => (
              <div key={g.modulo.id}>
                <Pill tone={g.modulo.accent}>{g.modulo.title}</Pill>
                <ul className="mt-3 space-y-4">
                  {g.voci.map((c, i) => (
                    <li key={i}>
                      <p className="text-[15px] font-semibold leading-relaxed">
                        {c.claim}
                      </p>
                      {/* "Perché conta" non è più in grassetto scuro: ripetuto
                          a ogni voce era un richiamo che chiedeva attenzione
                          trentasei volte per dire sempre la stessa cosa. */}
                      <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                        <span className="font-semibold">Perché conta: </span>
                        {c.signal}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {byType.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-bold tracking-tight">
            Dove sei forte, dove no
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {byType.map((agg) => (
              <li
                key={agg.exercise_type}
                className="card-light flex items-center gap-4 p-5"
              >
                <ScoreRing value={agg.media_pct} size={56} />
                <div className="min-w-0">
                  <p className="font-bold">
                    {EXERCISE_TYPE_LABEL[agg.exercise_type]}
                  </p>
                  <p className="text-[13px] text-ink-muted">
                    media su {agg.tentativi}{" "}
                    {agg.tentativi === 1 ? "tentativo" : "tentativi"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="mb-1 text-lg font-bold tracking-tight">Premi</h2>
        <p className="mb-4 text-sm text-ink-muted">
          {earned.size} di {BADGES.length} sbloccati.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {BADGES.map((badge) => {
            const has = earned.has(badge.id);
            return (
              <li
                key={badge.id}
                className={`card-light flex items-center gap-3 p-4 ${has ? "" : "opacity-55"}`}
              >
                <PremioIcon id={badge.id} />
                <span className="min-w-0">
                  <span className="block font-bold">{badge.name}</span>
                  <span className="block text-[13px] leading-snug text-ink-muted">
                    {badge.description}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {mastered.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-bold tracking-tight">Moduli padroneggiati</h2>
          <ul className="space-y-2">
            {mastered.map((m) => {
              const pct = moduleBestPct(best, m.id);
              return (
                <li key={m.id}>
                  <Link
                    href={`/percorso/${m.id}`}
                    className="card-light tappable flex items-center gap-4 p-4 active:bg-black/[0.02]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold">{m.title}</span>
                      <span className="block text-[13px] text-ink-muted">
                        {levelMeta(m.level).name}
                      </span>
                    </span>
                    <ScoreRing value={pct} size={44} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold tracking-tight">Notifiche</h2>
        <ImpostazioniNotifiche
          iniziali={
            prefNotifiche ?? { enabled: false, hour: 19, timezone: "Europe/Rome" }
          }
        />
      </section>

      <section className="mt-10 border-t border-black/10 pt-6">
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full bg-black/5 px-5 py-3 text-sm font-bold text-ink-muted hover:text-ink"
          >
            Esci dall&apos;account
          </button>
        </form>

        {/* In fondo e in tono minore, ma raggiungibili senza scrivere a
            nessuno: l'informativa perche' va potuta leggere anche da dentro,
            la cancellazione perche' e' un diritto e non una concessione — e
            perche' un account che si crea con un modulo non puo' richiedere
            un'email per essere chiuso. */}
        <p className="mt-6 text-[13px] leading-relaxed text-ink-muted">
          <Link href="/privacy" className="font-semibold underline">
            Informativa privacy
          </Link>
          <span aria-hidden="true"> · </span>
          <Link href="/termini" className="font-semibold underline">
            Termini di servizio
          </Link>
          <span aria-hidden="true"> · </span>
          <Link href="/profilo/elimina" className="font-semibold underline">
            Elimina account
          </Link>
        </p>
      </section>
    </div>
  );
}

/**
 * Un numero dentro la card scura.
 *
 * L'etichetta visibile è abbreviata per stare in una colonna da sessanta
 * pixel; quella per esteso sta nel dt, che è nascosto alla vista ma non agli
 * screen reader — la lista resta comprensibile anche letta una voce alla
 * volta, dove "serie" da sola non direbbe se è quella in corso o il record.
 */
function MiniStat({
  value,
  label,
  full,
}: {
  value: string;
  label: string;
  full: string;
}) {
  return (
    /* Il filo verticale ha lo stesso colore della riga sopra, e separa una
       voce dall'altra invece di lasciarle affiancate a distanza. Sul primo
       riquadro non c'è, o segnerebbe il bordo interno della card.
       Ogni blocco è largo quanto il suo contenuto e il testo sta a sinistra,
       tutti e cinque allo stesso modo: a distanziarli è lo spazio che avanza,
       diviso in parti uguali. Con cinque colonne di uguale larghezza, invece,
       l'ultima arrivava al bordo ma il suo numero — corto — restava indietro
       di mezza colonna. */
    <div className="border-l border-white/10 pl-3.5 first:border-l-0 first:pl-0">
      <dt className="sr-only">{full}</dt>
      <dd>
        <span className="block text-[15px] font-extrabold leading-tight">{value}</span>
        <span className="block text-[10px] font-semibold leading-tight text-white/50">
          {label}
        </span>
      </dd>
    </div>
  );
}
