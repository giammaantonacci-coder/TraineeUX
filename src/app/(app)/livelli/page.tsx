import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MODULES } from "@/content";
import {
  exercisesDoneInModule,
  getProgressData,
  levelInProgress,
  levelProgress,
  moduleBestPct,
} from "@/lib/data";
import { LEVEL_ORDER, MASTERY_THRESHOLD, levelMeta } from "@/lib/progression";
import { PageHeader, ProgressSegments } from "@/components/ui";
import { BITY_MOOD_BY_LEVEL, Bity } from "@/components/Bity";
import { ModuloIcon } from "@/components/icone-moduli";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Il tuo livello" };

/**
 * Il livello che stai chiudendo, per intero.
 *
 * La prima versione elencava tutti e cinque i livelli con la loro barra, ed
 * era la stessa cosa che dicono la home, il percorso e la scheda di Bity: un
 * quarto posto dove leggere "0/3" su cose che non hai ancora toccato. Qui c'è
 * un livello solo — quello che hai davanti — e le tre domande che ha senso
 * fargli: a che punto sono, cosa mi manca, cosa ci guadagno a chiuderlo.
 *
 * Gli altri livelli non spariscono: stanno nel percorso, che è la schermata
 * fatta per guardare lontano.
 */
export default async function LivelloPage() {
  const data = await getProgressData();
  if (!data) redirect("/benvenuto");

  const { best } = data;
  const livello = levelInProgress(best, MASTERY_THRESHOLD);
  const meta = levelMeta(livello);
  const { mastered, total } = levelProgress(best, livello, MASTERY_THRESHOLD);

  const moduli = MODULES.filter((m) => m.level === livello).map((m) => {
    const pct = moduleBestPct(best, m.id);
    const svolti = exercisesDoneInModule(best, m.id);
    return {
      modulo: m,
      pct,
      svolti,
      padroneggiato: pct >= MASTERY_THRESHOLD,
      iniziato: svolti > 0,
    };
  });

  const mancanti = moduli.filter((m) => !m.padroneggiato);
  const prossimo = LEVEL_ORDER[LEVEL_ORDER.indexOf(livello) + 1] ?? null;

  return (
    <div className="animate-rise">
      <Link
        href="/"
        className="tappable -ml-2 mb-3 inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm font-semibold text-ink-muted hover:text-ink active:bg-black/5"
      >
        ‹ Home
      </Link>

      <PageHeader
        eyebrow="Livello in corso"
        title={meta.name}
        subtitle={meta.subtitle}
      />

      {/* Dove sei, in una card sola: la mascotte del livello, il conteggio e
          le tacche. È lo stesso blocco che si vede in home, qui a corpo
          pieno — chi arriva da lì ritrova la cosa che ha toccato. */}
      <section className="card-dark p-5 md:p-6">
        <div className="flex items-center gap-4">
          <Bity
            mood={BITY_MOOD_BY_LEVEL[livello]}
            level={livello}
            size={64}
            className="shrink-0"
          />
          <div className="min-w-0">
            <p className="text-2xl font-extrabold leading-none">
              {mastered} <span className="text-white/50">di {total}</span>
            </p>
            <p className="mt-1.5 text-sm text-white/60">
              {total === 1 ? "modulo padroneggiato" : "moduli padroneggiati"}
            </p>
          </div>
        </div>
        <ProgressSegments className="mt-5" total={total} done={mastered} tone="light" />
      </section>

      <section className="mt-8">
        <h2 className="mb-1 text-lg font-bold tracking-tight">A che punto sei</h2>
        <p className="mb-4 text-sm text-ink-muted">
          Un modulo è padroneggiato quando il tuo miglior punteggio arriva al{" "}
          {MASTERY_THRESHOLD}%. Sotto, resta provato.
        </p>
        <ul className="space-y-3">
          {moduli.map(({ modulo, pct, svolti, padroneggiato, iniziato }) => (
            <li key={modulo.id}>
              <Link
                href={`/percorso/${modulo.id}`}
                className="card-light tappable flex items-center gap-3.5 p-4 hover:-translate-y-0.5 active:bg-black/[0.02]"
              >
                {/* Spunta al posto dell'icona quando è chiuso: la fila si
                    legge dall'alto e le cose fatte si distinguono da quelle da
                    fare senza leggere una parola. */}
                <span
                  aria-hidden="true"
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                    padroneggiato ? "bg-mint text-ink" : "bg-black/[0.04]"
                  }`}
                >
                  {padroneggiato ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <ModuloIcon moduleId={modulo.id} className="h-[22px] w-[22px]" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold leading-snug">{modulo.title}</span>
                  <span className="mt-0.5 block text-[13px] text-ink-muted">
                    {padroneggiato
                      ? `Padroneggiato · ${pct}%`
                      : iniziato
                        ? `Miglior punteggio ${pct}% · ti mancano ${MASTERY_THRESHOLD - pct} punti`
                        : `Non ancora iniziato · ${modulo.exercises.length} esercizi`}
                  </span>
                  {iniziato && !padroneggiato ? (
                    <span className="mt-1 block text-[13px] text-ink-muted">
                      {svolti} di {modulo.exercises.length}{" "}
                      {modulo.exercises.length === 1 ? "esercizio svolto" : "esercizi svolti"}
                    </span>
                  ) : null}
                </span>
                <span aria-hidden="true" className="shrink-0 font-bold text-ink-muted">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold tracking-tight">
          {mancanti.length === 0 ? "Livello chiuso" : "Cosa manca per chiuderlo"}
        </h2>

        {mancanti.length === 0 ? (
          <div className="card-light p-5">
            <p className="text-[15px] leading-relaxed">
              Hai padroneggiato tutti i moduli di {meta.name}.{" "}
              {prossimo
                ? `Il passo dopo è ${levelMeta(prossimo).name}, dove gli esercizi valgono ×${levelMeta(prossimo).xpMultiplier.toLocaleString("it-IT")} XP.`
                : "Non c'è un livello sopra: da qui si torna sui moduli per alzare i punteggi."}
            </p>
            {prossimo ? (
              <Link
                href={`/percorso#${prossimo}`}
                className="tappable mt-4 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white"
              >
                Vai a {levelMeta(prossimo).name}
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="card-light p-5">
            {/* La frase concreta, non il conteggio un'altra volta: qui si viene
                a sapere cosa fare adesso, e "1 modulo" da solo non lo dice. */}
            <p className="text-[15px] leading-relaxed">
              {mancanti.length === 1
                ? `Ti resta un modulo: porta ${mancanti[0].modulo.title} sopra il ${MASTERY_THRESHOLD}% e ${meta.name} è chiuso.`
                : `Ti restano ${mancanti.length} moduli da portare sopra il ${MASTERY_THRESHOLD}%.`}
            </p>
            <ul className="mt-4 space-y-3 border-t border-black/5 pt-4">
              {mancanti.map(({ modulo, pct, iniziato }) => (
                <li key={modulo.id} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blush-deep"
                  />
                  <p className="text-[14px] leading-relaxed">
                    <span className="font-semibold">{modulo.title}</span>
                    {" — "}
                    {iniziato
                      ? `rifai l'esercizio che ti è riuscito peggio: da ${pct}% servono ${MASTERY_THRESHOLD - pct} punti.`
                      : `comincia dal primo dei suoi ${modulo.exercises.length} esercizi.`}
                  </p>
                </li>
              ))}
            </ul>
            {prossimo ? (
              <p className="mt-4 border-t border-black/5 pt-4 text-[14px] leading-relaxed text-ink-muted">
                Chiudendo {meta.name} il passo dopo è{" "}
                <span className="font-semibold text-ink">{levelMeta(prossimo).name}</span>,
                dove gli esercizi valgono ×
                {levelMeta(prossimo).xpMultiplier.toLocaleString("it-IT")} XP.
              </p>
            ) : null}
          </div>
        )}
      </section>

      {/* Gli altri livelli non stanno qui, e vale la pena dirlo: senza, questa
          pagina sembra sostenere che il percorso finisca con quello che si sta
          facendo. */}
      <p className="mt-8 text-sm leading-relaxed text-ink-muted">
        Gli altri livelli, con tutti i loro moduli, stanno nel{" "}
        <Link href="/percorso" className="font-semibold text-ink underline">
          percorso
        </Link>
        .
      </p>
    </div>
  );
}
