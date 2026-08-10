import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MODULES } from "@/content";
import {
  exercisesDoneInModule,
  getProgressData,
  highestLevelReached,
  moduleBestPct,
} from "@/lib/data";
import { LEVELS, MASTERY_THRESHOLD } from "@/lib/progression";
import { ACCENT_BG, PageHeader, Pill, ProgressBar, ScoreRing } from "@/components/ui";
import { Bity, type BityMood } from "@/components/Bity";

export const metadata: Metadata = { title: "Percorso" };

function levelMood(mastered: number, total: number, touched: boolean): BityMood {
  if (mastered === total) return "esulta";
  if (mastered > 0) return "felice";
  return touched ? "curioso" : "assonnato";
}

export default async function PercorsoPage() {
  const data = await getProgressData();
  if (!data) redirect("/benvenuto");
  const { best } = data;
  const livelloRaggiunto = highestLevelReached(best);
  const tuttoFatto = MODULES.every(
    (m) => moduleBestPct(best, m.id) >= MASTERY_THRESHOLD,
  );

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Percorso"
        bity={{ mood: tuttoFatto ? "esulta" : "felice", level: livelloRaggiunto }}
        title="Dal mestiere al giudizio"
        subtitle="Cinque livelli, dodici moduli. Ogni livello non aggiunge strumenti: allarga l'ambito su cui decidi. Puoi affrontarli nell'ordine che preferisci, ma i moltiplicatori di XP crescono con il livello."
      />

      <div className="space-y-10">
        {LEVELS.map((level, i) => {
          const modules = MODULES.filter((m) => m.level === level.id);
          const mastered = modules.filter(
            (m) => moduleBestPct(best, m.id) >= MASTERY_THRESHOLD,
          ).length;
          const touched = modules.some((m) => exercisesDoneInModule(best, m.id) > 0);

          return (
            /* Il margine di scorrimento ripete l'altezza della fascia di stato,
               come fa il padding del layout. Con scroll-mt-6 erano 24px contro
               i 36 della fascia: arrivando qui da "I tuoi livelli" sulla home,
               il titolo del livello finiva per un terzo dietro la fascia
               bianca, e sembrava tagliato. */
            <section
              key={level.id}
              id={level.id}
              className="scroll-mt-[calc(max(env(safe-area-inset-top),2.25rem)+0.75rem)] md:scroll-mt-8"
            >
              {/* Bity porta il colore del livello: scorrendo la pagina i cinque
                  livelli diventano cinque tinte, e lo stato di ciascuno si legge
                  dall'espressione prima che dalle pillole. Decorativa: il conteggio
                  "x/y padroneggiati" accanto dice già la stessa cosa a parole. */}
              <div className="mb-4 flex items-start gap-3">
                <Bity
                  level={level.id}
                  mood={levelMood(mastered, modules.length, touched)}
                  size={46}
                  seed={i + 1}
                  className="-mt-1 shrink-0"
                />
                <div className="min-w-0">
                  <h2 className="text-xl font-extrabold tracking-tight">{level.name}</h2>
                  {/* Le pillole su una riga propria: accanto al titolo, su
                      telefono, andavano a capo una per volta e la colonna
                      diventava una scala irregolare. */}
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <Pill>×{level.xpMultiplier} XP</Pill>
                    <Pill tone={mastered === modules.length ? "mint" : "neutral"}>
                      {mastered}/{modules.length} padroneggiati
                    </Pill>
                  </div>
                  <p className="mt-2 text-sm text-ink-muted">{level.subtitle}</p>
                </div>
              </div>

              <ul className="grid gap-3 md:grid-cols-2">
                {modules.map((module) => {
                  const pct = moduleBestPct(best, module.id);
                  const done = exercisesDoneInModule(best, module.id);
                  const total = module.exercises.length;

                  return (
                    <li key={module.id}>
                      <Link
                        href={`/percorso/${module.id}`}
                        className="card-light tappable flex h-full flex-col p-5 hover:-translate-y-0.5 active:bg-black/[0.02]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <span
                              aria-hidden="true"
                              className={`mb-3 block h-1.5 w-10 rounded-full ${ACCENT_BG[module.accent]}`}
                            />
                            <h3 className="text-lg font-bold leading-tight">
                              {module.title}
                            </h3>
                          </div>
                          {done > 0 ? (
                            <ScoreRing
                              value={pct}
                              size={52}
                              label={`Miglior punteggio ${pct} per cento`}
                            />
                          ) : null}
                        </div>

                        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-muted">
                          {module.tagline}
                        </p>

                        <div className="mt-4">
                          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-ink-muted">
                            <span>
                              {done}/{total} esercizi · {module.minutes} min
                            </span>
                            {pct >= MASTERY_THRESHOLD ? (
                              <span className="text-mint-deep">Padroneggiato</span>
                            ) : done > 0 ? (
                              <span>In corso</span>
                            ) : (
                              <span>Da iniziare</span>
                            )}
                          </div>
                          <ProgressBar
                            value={total > 0 ? (done / total) * 100 : 0}
                            tone={pct >= MASTERY_THRESHOLD ? "mint" : "dark"}
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
