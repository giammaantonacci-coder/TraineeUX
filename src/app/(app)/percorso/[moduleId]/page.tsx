import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  EXERCISE_TYPE_DESCRIPTION,
  EXERCISE_TYPE_LABEL,
  MODULES,
  getModule,
} from "@/content";
import { bestPctPerExercise, getProgressData, moduleBestPct } from "@/lib/data";
import { BASE_XP, MASTERY_THRESHOLD, levelMeta } from "@/lib/progression";
import { ACCENT_BG, Pill, Prose, ScoreRing } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const mod = getModule(moduleId);
  return { title: mod?.title ?? "Modulo" };
}

export function generateStaticParams() {
  return MODULES.map((m) => ({ moduleId: m.id }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = getModule(moduleId);
  if (!mod) notFound();

  const data = await getProgressData();
  if (!data) redirect("/benvenuto");

  const bestPct = bestPctPerExercise(data.best);
  const moduleBest = moduleBestPct(data.best, mod.id);
  const mastered = moduleBest >= MASTERY_THRESHOLD;
  const level = levelMeta(mod.level);

  return (
    <div className="animate-rise">
      <Link
        href="/percorso"
        className="tappable -ml-2 mb-3 inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm font-semibold text-ink-muted hover:text-ink active:bg-black/5"
      >
        ‹ Percorso
      </Link>

      <header className={`rounded-[28px] ${ACCENT_BG[mod.accent]} p-6 md:p-8`}>
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="dark">{level.name}</Pill>
          <Pill className="bg-white/60">{mod.minutes} min</Pill>
          <Pill className="bg-white/60">{mod.exercises.length} esercizi</Pill>
          {mastered ? <Pill tone="dark">Padroneggiato</Pill> : null}
        </div>
        <h1 className="mt-4 text-[26px] font-extrabold leading-tight tracking-tight md:text-4xl">
          {mod.title}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/80">
          {mod.tagline}
        </p>
      </header>

      <section className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="card-light p-5">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
            Cosa saprai fare
          </h2>
          <ul className="mt-3 space-y-2">
            {mod.outcomes.map((o) => (
              <li key={o} className="flex gap-2.5 text-[15px] leading-relaxed">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-deep" />
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-dark p-5">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white/50">
            Cosa costa non saperlo
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/85">
            {mod.gapCost}
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold tracking-tight">
          Cosa sblocchi padroneggiando questo modulo
        </h2>
        <p className="mb-4 text-sm text-ink-muted">
          {mastered
            ? `Hai chiuso questo modulo al ${moduleBest}%: queste capacità sono attive nel tuo profilo.`
            : `Queste capacità si attivano nel profilo superando il ${MASTERY_THRESHOLD}% (sei al ${moduleBest}%).`}
        </p>
        <ul className="space-y-3">
          {mod.capabilities.map((c, i) => (
            <li
              key={i}
              className={`card-light p-5 ${mastered ? "" : "opacity-90"}`}
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    mastered ? "bg-mint text-ink" : "bg-black/5 text-ink-muted"
                  }`}
                >
                  {mastered ? "✓" : i + 1}
                </span>
                <div>
                  <p className="text-[15px] font-semibold leading-relaxed">{c.claim}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                    <span className="font-semibold text-ink">Perché conta: </span>
                    {c.signal}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold tracking-tight">Lezioni</h2>
        <div className="space-y-3">
          {mod.lessons.map((lesson) => (
            <details key={lesson.id} className="card-light group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                {lesson.title}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-ink-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="mt-4 border-t border-black/5 pt-4">
                <Prose paragraphs={lesson.body} />
                {lesson.source ? (
                  <p className="mt-4 text-[13px] font-medium text-ink-muted">
                    Fonte di riferimento: {lesson.source}
                  </p>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold tracking-tight">Esercizi</h2>
        <ul className="space-y-3">
          {mod.exercises.map((exercise) => {
            const pct = bestPct.get(`${mod.id}/${exercise.id}`) ?? null;
            const xpMax = Math.round(BASE_XP[exercise.type] * level.xpMultiplier);
            return (
              <li key={exercise.id}>
                <Link
                  href={`/allenamento/${mod.id}/${exercise.id}`}
                  className="card-light tappable flex items-center gap-4 p-5 hover:-translate-y-0.5 active:bg-black/[0.02]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill tone={mod.accent}>{EXERCISE_TYPE_LABEL[exercise.type]}</Pill>
                      <Pill>{exercise.minutes} min</Pill>
                      <Pill>fino a {xpMax} XP</Pill>
                    </div>
                    <h3 className="mt-3 text-[17px] font-bold leading-tight">
                      {exercise.title}
                    </h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                      {exercise.description}
                    </p>
                    <p className="mt-1 text-[13px] text-ink-muted">
                      {EXERCISE_TYPE_DESCRIPTION[exercise.type]}
                    </p>
                  </div>
                  {pct !== null ? (
                    <ScoreRing value={pct} size={56} label={`Miglior punteggio ${pct}%`} />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white"
                    >
                      ›
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
