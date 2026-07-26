"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getExercise, modulesByLevel } from "@/content";
import { gradeExercise, type ExerciseAnswer, type GradeResult } from "@/lib/grading";
import { xpForAttempt } from "@/lib/progression";
import { earnedBadgeIds } from "@/content/badges";
import type { AttemptRow, ModuleProgressRow } from "@/lib/types";

export interface SubmitResult {
  ok: boolean;
  error?: string;
  grade?: GradeResult;
  xpAwarded?: number;
  totalXp?: number;
  streak?: number;
  newBadgeIds?: string[];
}

export async function submitExercise(
  moduleId: string,
  exerciseId: string,
  answer: ExerciseAnswer,
  durationSeconds?: number,
): Promise<SubmitResult> {
  const found = getExercise(moduleId, exerciseId);
  if (!found) return { ok: false, error: "Esercizio non trovato." };
  const { module, exercise } = found;

  if (answer.type !== exercise.type) {
    return { ok: false, error: "Risposta non valida per questo esercizio." };
  }

  const supabase = await createClient();
  // Firma verificata invece di un giro sul server di autenticazione: la
  // consegna è il momento in cui l'attesa si nota di più.
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) return { ok: false, error: "Sessione scaduta. Rientra e riprova." };

  // La correzione avviene qui: le soluzioni non sono mai state inviate al client.
  const grade = gradeExercise(exercise, answer);
  const xp = xpForAttempt(exercise.type, module.level, grade.scorePct);

  const { data, error } = await supabase.rpc("record_attempt", {
    p_module_id: moduleId,
    p_exercise_id: exerciseId,
    p_exercise_type: exercise.type,
    p_score: grade.score,
    p_max_score: grade.maxScore,
    p_xp: xp,
    p_module_exercise_count: module.exercises.length,
    p_duration_seconds: durationSeconds ?? null,
    p_answer: answer as unknown as Record<string, unknown>,
  });

  if (error) {
    return { ok: false, error: `Non siamo riusciti a salvare il tentativo: ${error.message}` };
  }

  const stats = (data ?? {}) as {
    total_xp?: number;
    streak?: number;
  };

  const newBadgeIds = await syncBadges(supabase, userId, stats.streak ?? 0);

  revalidatePath("/");
  // "/oggi" serve la stessa schermata per le installazioni gia' esistenti
  revalidatePath("/oggi");
  revalidatePath("/percorso");
  revalidatePath(`/percorso/${moduleId}`);
  revalidatePath("/profilo");

  return {
    ok: true,
    grade,
    xpAwarded: xp,
    totalXp: stats.total_xp,
    streak: stats.streak,
    newBadgeIds,
  };
}

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/** Ricalcola i badge meritati e inserisce solo quelli nuovi. */
async function syncBadges(
  supabase: SupabaseServerClient,
  userId: string,
  streak: number,
): Promise<string[]> {
  const [attemptsRes, progressRes, existingRes] = await Promise.all([
    supabase
      .from("attempts")
      .select("module_id, exercise_type, score, max_score")
      .eq("user_id", userId),
    supabase.from("module_progress").select("*").eq("user_id", userId),
    supabase.from("badges").select("badge_id").eq("user_id", userId),
  ]);

  const attempts = (attemptsRes.data ?? []) as Pick<
    AttemptRow,
    "module_id" | "exercise_type" | "score" | "max_score"
  >[];
  const progress = (progressRes.data ?? []) as ModuleProgressRow[];
  const existing = new Set(
    ((existingRes.data ?? []) as { badge_id: string }[]).map((b) => b.badge_id),
  );

  const earned = earnedBadgeIds({
    attempts,
    progress,
    streak,
    intermedioModuleIds: modulesByLevel("intermedio").map((m) => m.id),
    seniorModuleIds: modulesByLevel("senior").map((m) => m.id),
  });

  const fresh = earned.filter((id) => !existing.has(id));
  if (fresh.length > 0) {
    await supabase
      .from("badges")
      .insert(fresh.map((badge_id) => ({ user_id: userId, badge_id })));
  }
  return fresh;
}

/* ------------------------------------------------------------------ */
/* Autenticazione                                                      */
/* ------------------------------------------------------------------ */

export interface AuthResult {
  error?: string;
  message?: string;
}

/** Origine reale della richiesta: serve per il link di conferma via email. */
async function siteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function signIn(_prev: AuthResult, formData: FormData): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Inserisci email e password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return {
      error:
        error.message === "Invalid login credentials"
          ? "Email o password non corrispondono. Se non hai ancora un account, creane uno qui sotto."
          : error.message,
    };
  }
  redirect("/");
}

export async function signUp(_prev: AuthResult, formData: FormData): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("display_name") ?? "").trim();

  if (!email || !password) return { error: "Inserisci email e password." };
  if (password.length < 8)
    return { error: "La password deve avere almeno 8 caratteri." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName || email.split("@")[0] },
      emailRedirectTo: `${await siteOrigin()}/auth/confirm`,
    },
  });

  if (error) return { error: error.message };

  // Se la conferma email è disattivata, la sessione c'è già: entra subito.
  if (data.session) redirect("/");

  return {
    message:
      "Account creato. Ti abbiamo mandato un'email di conferma: aprila e poi accedi qui.",
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/benvenuto");
}
