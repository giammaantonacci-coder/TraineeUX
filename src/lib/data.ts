import "server-only";
import { createClient } from "./supabase/server";
import type {
  AttemptRow,
  BadgeRow,
  ModuleProgressRow,
  ProfileRow,
} from "./types";

export interface UserData {
  userId: string;
  email: string | null;
  profile: ProfileRow | null;
  progress: ModuleProgressRow[];
  attempts: AttemptRow[];
  badges: BadgeRow[];
}

export async function getUserData(): Promise<UserData | null> {
  const supabase = await createClient();

  // Se Supabase è irraggiungibile o la sessione è illeggibile, la pagina non
  // deve restituire 500: si comporta come utente non autenticato.
  let user;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    return null;
  }
  if (!user) return null;

  const [profileRes, progressRes, attemptsRes, badgesRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase.from("module_progress").select("*").eq("user_id", user.id),
    supabase
      .from("attempts")
      .select("id, module_id, exercise_id, exercise_type, score, max_score, xp_awarded, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(300),
    supabase.from("badges").select("badge_id, earned_at").eq("user_id", user.id),
  ]);

  return {
    userId: user.id,
    email: user.email ?? null,
    profile: (profileRes.data as ProfileRow | null) ?? null,
    progress: (progressRes.data as ModuleProgressRow[] | null) ?? [],
    attempts: (attemptsRes.data as AttemptRow[] | null) ?? [],
    badges: (badgesRes.data as BadgeRow[] | null) ?? [],
  };
}

/** Percentuale migliore ottenuta su un modulo, 0 se mai affrontato. */
export function bestScoreFor(progress: ModuleProgressRow[], moduleId: string): number {
  return progress.find((p) => p.module_id === moduleId)?.best_score_pct ?? 0;
}

export function exercisesDoneFor(
  attempts: AttemptRow[],
  moduleId: string,
): Set<string> {
  return new Set(
    attempts.filter((a) => a.module_id === moduleId).map((a) => a.exercise_id),
  );
}

/** Miglior percentuale per singolo esercizio. */
export function bestPctPerExercise(attempts: AttemptRow[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const a of attempts) {
    const pct = a.max_score > 0 ? Math.round((a.score / a.max_score) * 100) : 0;
    const key = `${a.module_id}/${a.exercise_id}`;
    map.set(key, Math.max(map.get(key) ?? 0, pct));
  }
  return map;
}
