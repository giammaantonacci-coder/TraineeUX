import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MODULES } from "@/content";
import { getUserData } from "@/lib/data";
import { LEVELS, MASTERY_THRESHOLD } from "@/lib/progression";
import { ACCENT_BG, PageHeader, Pill, ProgressBar, ScoreRing } from "@/components/ui";

export const metadata: Metadata = { title: "Percorso" };

export default async function PercorsoPage() {
  const data = await getUserData();
  if (!data) redirect("/benvenuto");
  const { progress, attempts } = data;

  const doneByModule = new Map<string, number>();
  for (const a of attempts) {
    const key = a.module_id;
    const set = doneByModule.get(key) ?? 0;
    doneByModule.set(key, set);
  }
  const exercisesDone = new Map<string, Set<string>>();
  for (const a of attempts) {
    const set = exercisesDone.get(a.module_id) ?? new Set<string>();
    set.add(a.exercise_id);
    exercisesDone.set(a.module_id, set);
  }

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Percorso"
        title="Dal mestiere al giudizio"
        subtitle="Cinque livelli, dodici moduli. Ogni livello non aggiunge strumenti: allarga l'ambito su cui decidi. Puoi affrontarli nell'ordine che preferisci, ma i moltiplicatori di XP crescono con il livello."
      />

      <div className="space-y-10">
        {LEVELS.map((level) => {
          const modules = MODULES.filter((m) => m.level === level.id);
          const mastered = modules.filter(
            (m) =>
              (progress.find((p) => p.module_id === m.id)?.best_score_pct ?? 0) >=
              MASTERY_THRESHOLD,
          ).length;

          return (
            <section key={level.id} id={level.id} className="scroll-mt-6">
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-extrabold tracking-tight">{level.name}</h2>
                  <Pill>×{level.xpMultiplier} XP</Pill>
                  <Pill tone={mastered === modules.length ? "mint" : "neutral"}>
                    {mastered}/{modules.length} padroneggiati
                  </Pill>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{level.subtitle}</p>
              </div>

              <ul className="grid gap-3 md:grid-cols-2">
                {modules.map((module) => {
                  const best =
                    progress.find((p) => p.module_id === module.id)?.best_score_pct ?? 0;
                  const done = exercisesDone.get(module.id)?.size ?? 0;
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
                              value={best}
                              size={52}
                              label={`Miglior punteggio ${best} per cento`}
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
                            {best >= MASTERY_THRESHOLD ? (
                              <span className="text-mint-deep">Padroneggiato</span>
                            ) : done > 0 ? (
                              <span>In corso</span>
                            ) : (
                              <span>Da iniziare</span>
                            )}
                          </div>
                          <ProgressBar
                            value={total > 0 ? (done / total) * 100 : 0}
                            tone={best >= MASTERY_THRESHOLD ? "mint" : "dark"}
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
