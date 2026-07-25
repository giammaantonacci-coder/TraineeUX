import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getExercise } from "@/content";
import { getUserData } from "@/lib/data";
import { toPublicExercise } from "@/lib/grading";
import { BASE_XP, levelMeta } from "@/lib/progression";
import { ExerciseRunner } from "@/components/ExerciseRunner";

export default async function AllenamentoPage({
  params,
}: {
  params: Promise<{ moduleId: string; exerciseId: string }>;
}) {
  const { moduleId, exerciseId } = await params;
  const found = getExercise(moduleId, exerciseId);
  if (!found) notFound();

  const data = await getUserData();
  if (!data) redirect("/benvenuto");

  const { module: mod, exercise } = found;
  const level = levelMeta(mod.level);

  return (
    <div className="animate-rise">
      <Link
        href={`/percorso/${mod.id}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink"
      >
        ‹ {mod.title}
      </Link>

      <ExerciseRunner
        moduleId={mod.id}
        moduleTitle={mod.title}
        moduleAccent={mod.accent}
        levelName={level.name}
        maxXp={Math.round(BASE_XP[exercise.type] * level.xpMultiplier)}
        capabilities={mod.capabilities}
        exercise={toPublicExercise(exercise)}
      />
    </div>
  );
}
