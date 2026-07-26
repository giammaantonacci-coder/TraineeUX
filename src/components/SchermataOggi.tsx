import Link from "next/link";
import { redirect } from "next/navigation";
import {
  EXERCISE_TYPE_DESCRIPTION,
  EXERCISE_TYPE_LABEL,
  MODULES,
  TOTAL_EXERCISES,
} from "@/content";
import {
  bestPctPerExercise,
  getProgressData,
  moduleBestPct,
  totalExercisesDone,
} from "@/lib/data";
import { LEVEL_ORDER, MASTERY_THRESHOLD, levelMeta, rankForXp } from "@/lib/progression";
import { ACCENT_BG, Pill, ProgressBar, SectionTitle } from "@/components/ui";
import { Bity } from "@/components/Bity";
import type { Exercise, Module } from "@/lib/types";

export async function SchermataOggi() {
  const data = await getProgressData();
  if (!data) redirect("/benvenuto");

  const { profile, best } = data;
  const xp = profile?.xp ?? 0;
  const streak = profile?.streak_count ?? 0;
  const name = profile?.display_name ?? data.email?.split("@")[0] ?? "designer";
  const rank = rankForXp(xp);
  const bestPct = bestPctPerExercise(best);
  const doneCount = totalExercisesDone(best);

  const suggestions = buildSuggestions(bestPct, best.length === 0);
  const [primary, ...rest] = suggestions;

  const masteredCount = MODULES.filter(
    (m) => moduleBestPct(best, m.id) >= MASTERY_THRESHOLD,
  ).length;

  return (
    <div className="animate-rise">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          {/* Solo al primo accesso: qui la riga contiene già saluto, sottotitolo
              e il contatore della serie, e su 390px la mascotte toglierebbe
              larghezza al testo ogni giorno per dire qualcosa che il resto
              della schermata dice meglio. Al primo accesso invece è l'unico
              momento in cui presentarsi vale lo spazio. */}
          {doneCount === 0 ? (
            <Bity mood="curioso" size={48} float className="-mt-1 shrink-0" />
          ) : null}
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Ciao, {name}
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              {streak > 0
                ? `Serie di ${streak} ${streak === 1 ? "giorno" : "giorni"}. Non spezzarla oggi.`
                : "Un esercizio oggi vale più di cinque domenica prossima."}
            </p>
          </div>
        </div>
        <Link
          href="/profilo"
          className="tappable flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-bold active:bg-black/5"
        >
          <span aria-hidden="true">🔥</span>
          <span aria-hidden="true">{streak}</span>
          {/* Senza questo il nome accessibile del link era il solo numero. */}
          <span className="sr-only">
            Serie di {streak} {streak === 1 ? "giorno" : "giorni"}. Vai al profilo.
          </span>
        </Link>
      </header>

      <section className="card-dark mb-6 p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
              Grado attuale
            </p>
            <p className="mt-1 text-2xl font-extrabold">{rank.current.name}</p>
            <p className="mt-1 max-w-sm text-sm leading-relaxed text-white/60">
              {rank.current.description}
            </p>
          </div>
          <p className="shrink-0 text-right">
            <span className="block text-3xl font-extrabold">{xp}</span>
            <span className="text-xs font-semibold text-white/50">XP</span>
          </p>
        </div>

        <div className="mt-4">
          <ProgressBar value={rank.progress} tone="light" />
          <p className="mt-2 text-xs font-medium text-white/60">
            {rank.next
              ? `${rank.next.minXp - xp} XP a ${rank.next.name}`
              : "Hai raggiunto il grado più alto."}
          </p>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
          <MiniStat
            value={`${doneCount}/${TOTAL_EXERCISES}`}
            label="esercizi"
            full="esercizi svolti"
          />
          <MiniStat
            value={`${masteredCount}/${MODULES.length}`}
            label="moduli"
            full="moduli padroneggiati"
          />
          <MiniStat
            value={`${profile?.longest_streak ?? 0}`}
            label="record"
            full="serie record"
          />
        </dl>
      </section>

      {primary ? (
        <section className="mb-8">
          <SectionTitle>Riprendi da qui</SectionTitle>
          <SuggestionCard suggestion={primary} featured />
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="mb-8">
          <SectionTitle action={{ href: "/percorso", label: "Tutto il percorso" }}>
            Consigliati per te
          </SectionTitle>
          <ul className="space-y-3">
            {rest.map((s) => (
              <li key={`${s.module.id}/${s.exercise.id}`}>
                <SuggestionCard suggestion={s} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <SectionTitle action={{ href: "/percorso", label: "Vedi tutti" }}>
          I tuoi livelli
        </SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {LEVEL_ORDER.map((levelId) => {
            const meta = levelMeta(levelId);
            const modules = MODULES.filter((m) => m.level === levelId);
            const mastered = modules.filter(
              (m) => moduleBestPct(best, m.id) >= MASTERY_THRESHOLD,
            ).length;
            const pct = Math.round((mastered / modules.length) * 100);
            return (
              <Link
                key={levelId}
                href={`/percorso#${levelId}`}
                className="card-light tappable block p-4 hover:-translate-y-0.5 active:bg-black/[0.02]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-bold">{meta.name}</p>
                  <span className="text-xs font-semibold text-ink-muted">
                    {mastered}/{modules.length}
                  </span>
                </div>
                <p className="mt-1 mb-3 text-[13px] leading-snug text-ink-muted">
                  {meta.subtitle}
                </p>
                <ProgressBar value={pct} tone="mint" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

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
    <div>
      <dt className="sr-only">{full}</dt>
      <dd>
        <span className="block text-lg font-extrabold leading-tight">{value}</span>
        <span className="text-[11px] font-semibold leading-tight text-white/50">
          {label}
        </span>
      </dd>
    </div>
  );
}

interface Suggestion {
  module: Module;
  exercise: Exercise;
  reason: string;
  bestPct: number | null;
}

/**
 * Ordine dei consigli: prima ciò che è stato iniziato e non finito, poi ciò che
 * è andato male e va ripreso, poi il prossimo passo nuovo del percorso.
 */
function buildSuggestions(
  bestPct: Map<string, number>,
  isNewUser: boolean,
): Suggestion[] {
  const untouched: Suggestion[] = [];
  const inProgress: Suggestion[] = [];
  const toRedo: Suggestion[] = [];

  for (const mod of MODULES) {
    const moduleTouched = mod.exercises.some((e) =>
      bestPct.has(`${mod.id}/${e.id}`),
    );
    for (const exercise of mod.exercises) {
      const pct = bestPct.get(`${mod.id}/${exercise.id}`) ?? null;
      if (pct === null) {
        const suggestion: Suggestion = {
          module: mod,
          exercise,
          reason: moduleTouched
            ? "Ti manca questo per chiudere il modulo"
            : "Prossimo passo del percorso",
          bestPct: null,
        };
        (moduleTouched ? inProgress : untouched).push(suggestion);
      } else if (pct < MASTERY_THRESHOLD) {
        toRedo.push({
          module: mod,
          exercise,
          reason: `Chiuso al ${pct}%: sotto la soglia di padronanza`,
          bestPct: pct,
        });
      }
    }
  }

  if (isNewUser) return untouched.slice(0, 4);
  return [...inProgress, ...toRedo, ...untouched].slice(0, 4);
}

function SuggestionCard({
  suggestion,
  featured = false,
}: {
  suggestion: Suggestion;
  featured?: boolean;
}) {
  const { module: mod, exercise, reason } = suggestion;
  const href = `/allenamento/${mod.id}/${exercise.id}`;

  if (featured) {
    return (
      <Link
        href={href}
        className={`block rounded-[28px] ${ACCENT_BG[mod.accent]} tappable p-5 hover:-translate-y-0.5 md:p-6`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="dark">{EXERCISE_TYPE_LABEL[exercise.type]}</Pill>
          <Pill className="bg-white/60">{levelMeta(mod.level).name}</Pill>
          <Pill className="bg-white/60">{exercise.minutes} min</Pill>
        </div>
        <h3 className="mt-4 text-xl font-extrabold leading-tight md:text-2xl">
          {exercise.title}
        </h3>
        <p className="mt-1 text-sm font-semibold text-ink/70">{mod.title}</p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/80">
          {exercise.description}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white">
          {reason.startsWith("Chiuso") ? "Riprova" : "Inizia"} ›
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="card-light tappable flex items-center gap-4 p-4 hover:-translate-y-0.5 active:bg-black/[0.02]"
    >
      <span
        aria-hidden="true"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${ACCENT_BG[mod.accent]} text-lg`}
      >
        {exercise.type === "quiz"
          ? "◷"
          : exercise.type === "critique"
            ? "◎"
            : exercise.type === "scenario"
              ? "⌥"
              : "✎"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-bold">{exercise.title}</span>
        <span className="block truncate text-[13px] text-ink-muted">
          {EXERCISE_TYPE_DESCRIPTION[exercise.type]} · {exercise.minutes} min
        </span>
        <span className="mt-1 block truncate text-[12px] font-semibold text-ink-muted">
          {reason}
        </span>
      </span>
      <span aria-hidden="true" className="shrink-0 text-ink-muted">
        ›
      </span>
    </Link>
  );
}
