import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MODULES, getModule, modulesByLevel } from "@/content";
import { badgesEarnedFromModule } from "@/content/badges";
import {
  getModuleCompletionData,
  moduleBestPct,
  moduleIsComplete,
  moduleXp,
  exercisesDoneInModule,
} from "@/lib/data";
import { levelMeta } from "@/lib/progression";
import { ModuloCompletato } from "@/components/ModuloCompletato";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const mod = getModule(moduleId);
  return { title: mod ? `${mod.title} — completato` : "Modulo completato" };
}

export default async function ModuloCompletatoPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = getModule(moduleId);
  if (!mod) notFound();

  const data = await getModuleCompletionData();
  if (!data) redirect("/benvenuto");

  // Non si arriva qui per indirizzo: la schermata dice "completato" e deve
  // essere vero. Chi non ha finito torna al modulo, dove c'è ancora da fare.
  if (!moduleIsComplete(data.best, mod.id, mod.exercises.length)) {
    redirect(`/percorso/${mod.id}`);
  }

  const premi = badgesEarnedFromModule(
    {
      attempts: data.attempts,
      progress: data.progress,
      streak: data.profile?.streak_count ?? 0,
      intermedioModuleIds: modulesByLevel("intermedio").map((m) => m.id),
      seniorModuleIds: modulesByLevel("senior").map((m) => m.id),
    },
    mod.id,
    new Set(data.badges.map((b) => b.badge_id)),
  );

  // Il modulo successivo nell'ordine del percorso, non "il primo che ti manca":
  // tornare indietro a riprendere un buco non è il passo che si offre a chi ha
  // appena chiuso qualcosa.
  const indice = MODULES.findIndex((m) => m.id === mod.id);
  const prossimo = MODULES[indice + 1] ?? null;

  return (
    <ModuloCompletato
      titolo={mod.title}
      livello={mod.level}
      nomeLivello={levelMeta(mod.level).name}
      punteggio={moduleBestPct(data.best, mod.id)}
      svolti={exercisesDoneInModule(data.best, mod.id)}
      totali={mod.exercises.length}
      xp={moduleXp(data.attempts, mod.id)}
      premi={premi}
      capacita={mod.capabilities}
      prossimo={prossimo ? { id: prossimo.id, title: prossimo.title } : null}
    />
  );
}
