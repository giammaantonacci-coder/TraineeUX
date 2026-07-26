import "server-only";
import { createClient } from "./supabase/server";
import type { BadgeRow, ExerciseType, ProfileRow } from "./types";

/**
 * Ogni schermata è un server component che interroga Supabase, quindi il numero
 * e il peso delle query sono la latenza percepita della navigazione. Qui ci
 * sono tre livelli di lettura, dal più leggero al più completo: una pagina
 * chiede solo quello che le serve.
 *
 * Prima esisteva una sola funzione che scaricava profilo, progressi, fino a 300
 * righe di tentativi e i badge — anche sulla pagina di un esercizio, che di
 * quei dati non usa nulla.
 */

/** Miglior punteggio per esercizio, già aggregato dal database. */
export interface ExerciseBest {
  module_id: string;
  exercise_id: string;
  exercise_type: ExerciseType;
  best_pct: number;
  tentativi: number;
  ultimo_tentativo: string;
}

export interface TypeStat {
  exercise_type: ExerciseType;
  tentativi: number;
  media_pct: number;
}

/* ------------------------------------------------------------------ */
/* Livello 1 — solo autenticazione                                     */
/* ------------------------------------------------------------------ */

/**
 * Per le pagine che hanno bisogno di sapere solo se c'è una sessione: la
 * schermata di un esercizio riceve i contenuti dal modulo, non dal database.
 */
export async function requireUser(): Promise<{ id: string; email: string | null } | null> {
  const supabase = await createClient();
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;
    return { id: data.user.id, email: data.user.email ?? null };
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Livello 2 — progressi                                               */
/* ------------------------------------------------------------------ */

export interface ProgressData {
  userId: string;
  email: string | null;
  profile: ProfileRow | null;
  /** al massimo una riga per esercizio svolto, non una per tentativo */
  best: ExerciseBest[];
}

/** Per Oggi, Percorso e il dettaglio di un modulo. Due query leggere. */
export async function getProgressData(): Promise<ProgressData | null> {
  const supabase = await createClient();

  let user;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    return null;
  }
  if (!user) return null;

  const [profileRes, bestRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase
      .from("exercise_best")
      .select("module_id, exercise_id, exercise_type, best_pct, tentativi, ultimo_tentativo")
      .eq("user_id", user.id),
  ]);

  return {
    userId: user.id,
    email: user.email ?? null,
    profile: (profileRes.data as ProfileRow | null) ?? null,
    best: (bestRes.data as ExerciseBest[] | null) ?? [],
  };
}

/* ------------------------------------------------------------------ */
/* Livello 3 — profilo completo                                        */
/* ------------------------------------------------------------------ */

export interface ProfileData extends ProgressData {
  byType: TypeStat[];
  badges: BadgeRow[];
}

export async function getProfileData(): Promise<ProfileData | null> {
  const supabase = await createClient();

  let user;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    return null;
  }
  if (!user) return null;

  const [profileRes, bestRes, typeRes, badgeRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase
      .from("exercise_best")
      .select("module_id, exercise_id, exercise_type, best_pct, tentativi, ultimo_tentativo")
      .eq("user_id", user.id),
    supabase
      .from("type_stats")
      .select("exercise_type, tentativi, media_pct")
      .eq("user_id", user.id),
    supabase.from("badges").select("badge_id, earned_at").eq("user_id", user.id),
  ]);

  return {
    userId: user.id,
    email: user.email ?? null,
    profile: (profileRes.data as ProfileRow | null) ?? null,
    best: (bestRes.data as ExerciseBest[] | null) ?? [],
    byType: (typeRes.data as TypeStat[] | null) ?? [],
    badges: (badgeRes.data as BadgeRow[] | null) ?? [],
  };
}

/* ------------------------------------------------------------------ */
/* Derivate                                                           */
/* ------------------------------------------------------------------ */

export function bestPctPerExercise(best: ExerciseBest[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const b of best) map.set(`${b.module_id}/${b.exercise_id}`, b.best_pct);
  return map;
}

/** Miglior punteggio di un modulo: il massimo fra i suoi esercizi. */
export function moduleBestPct(best: ExerciseBest[], moduleId: string): number {
  let max = 0;
  for (const b of best) if (b.module_id === moduleId && b.best_pct > max) max = b.best_pct;
  return max;
}

export function exercisesDoneInModule(best: ExerciseBest[], moduleId: string): number {
  return best.filter((b) => b.module_id === moduleId).length;
}

export function totalExercisesDone(best: ExerciseBest[]): number {
  return best.length;
}

export function totalAttempts(best: ExerciseBest[]): number {
  return best.reduce((sum, b) => sum + b.tentativi, 0);
}
