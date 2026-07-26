import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getExercise } from "@/content";
import { getUserData } from "@/lib/data";
import { toPublicExercise } from "@/lib/grading";
import { BASE_XP, levelMeta } from "@/lib/progression";
import { ExerciseRunner } from "@/components/ExerciseRunner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string; exerciseId: string }>;
}): Promise<Metadata> {
  const { moduleId, exerciseId } = await params;
  const found = getExercise(moduleId, exerciseId);
  return { title: found?.exercise.title ?? "Esercizio" };
}

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
        className="tappable -ml-2 mb-3 inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm font-semibold text-ink-muted hover:text-ink active:bg-black/5"
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
