import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getProgressData, levelInProgress, levelProgress } from "@/lib/data";
import { LEVELS, MASTERY_THRESHOLD } from "@/lib/progression";
import { PageHeader, Pill, ProgressBar } from "@/components/ui";
import { BITY_MOOD_BY_LEVEL, Bity } from "@/components/Bity";

export const metadata: Metadata = { title: "I tuoi livelli" };

/**
 * La scala intera, con i progressi veri.
 *
 * Nasce da una sottrazione alla home: lì c'erano cinque barre, di cui quattro
 * dicevano "non ancora" — e la home è la schermata di cosa fare oggi, non
 * dell'inventario. Ora lì resta la barra che si sta chiudendo, e le altre
 * quattro stanno qui, dove si viene apposta a guardarle.
 *
 * È cosa diversa dalla scheda che si apre toccando Bity: quella spiega la
 * scala — cosa significa ogni livello e cosa vuol dire il colore della
 * mascotte — e non ha numeri. Questa mostra a che punto sei su ognuno, e da
 * ogni riga si entra nel percorso.
 */
export default async function LivelliPage() {
  const data = await getProgressData();
  if (!data) redirect("/benvenuto");

  const { best } = data;
  const inCorso = levelInProgress(best, MASTERY_THRESHOLD);

  return (
    <div className="animate-rise">
      <Link
        href="/"
        className="tappable -ml-2 mb-3 inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm font-semibold text-ink-muted hover:text-ink active:bg-black/5"
      >
        ‹ Home
      </Link>

      <PageHeader
        eyebrow="Percorso"
        title="I tuoi livelli"
        subtitle="Un livello è padroneggiato quando lo sono tutti i suoi moduli, cioè quando ognuno è chiuso sopra il 70%. Da ogni riga entri nei moduli di quel livello."
      />

      <ul className="space-y-3">
        {LEVELS.map((l, i) => {
          const { mastered, total, pct } = levelProgress(best, l.id, MASTERY_THRESHOLD);
          const qui = l.id === inCorso;
          const completo = pct === 100;

          return (
            <li key={l.id}>
              <Link
                href={`/percorso#${l.id}`}
                className={`tappable block rounded-[28px] p-5 hover:-translate-y-0.5 ${
                  qui
                    ? "card-dark"
                    : "card-light active:bg-black/[0.02]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Colore e faccia del livello, come nella scheda di Bity:
                      chi ha visto l'una riconosce l'altra senza rileggere. */}
                  <Bity
                    mood={BITY_MOOD_BY_LEVEL[l.id]}
                    level={l.id}
                    size={44}
                    seed={i}
                    className="shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-extrabold tracking-tight">{l.name}</h2>
                      {qui ? <Pill tone="mint">In corso</Pill> : null}
                      {completo && !qui ? <Pill tone="mint">Completo</Pill> : null}
                    </div>
                    <p
                      className={`mt-0.5 text-[13px] leading-snug ${
                        qui ? "text-white/60" : "text-ink-muted"
                      }`}
                    >
                      {l.subtitle}
                    </p>
                  </div>
                  {/* Il conteggio a destra e non sotto: incolonnato con quello
                      delle altre righe si legge come una colonna sola. */}
                  <span
                    className={`shrink-0 text-sm font-bold ${
                      qui ? "text-white" : "text-ink-muted"
                    }`}
                  >
                    {mastered}/{total}
                  </span>
                </div>

                <ProgressBar
                  className="mt-4"
                  value={pct}
                  tone={qui ? "light" : "mint"}
                />

                <p
                  className={`mt-2.5 text-[13px] ${
                    qui ? "text-white/60" : "text-ink-muted"
                  }`}
                >
                  {mastered === total
                    ? "Tutti i moduli padroneggiati."
                    : `${total - mastered} ${total - mastered === 1 ? "modulo" : "moduli"} da padroneggiare` +
                      /* Il moltiplicatore compare da Avanzato in su: sul primo
                         livello vale uno, e "×1 XP" e' una riga che occupa
                         spazio per dire che non succede niente. */
                      (l.xpMultiplier > 1
                        ? ` · esercizi ×${l.xpMultiplier.toLocaleString("it-IT")} XP`
                        : "")}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
