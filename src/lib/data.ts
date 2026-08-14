import "server-only";
import { createClient } from "./supabase/server";
import { MODULES } from "@/content";
import { LEVEL_ORDER } from "./progression";
import type {
  AttemptRow,
  BadgeRow,
  ExerciseType,
  LevelId,
  ModuleProgressRow,
  ProfileRow,
} from "./types";

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


/**
 * Identità della richiesta corrente.
 *
 * Usa getClaims e non getUser: getUser interroga sempre il server di
 * autenticazione via rete, e su ogni navigazione questo si somma al controllo
 * che il middleware ha già fatto — due andate e ritorni per schermata.
 * getClaims verifica la firma del token, in locale quando il progetto usa
 * chiavi asimmetriche.
 *
 * Non è un indebolimento: i dati sono protetti dalle policy RLS dentro
 * Postgres, che valuta il token per conto proprio. Questo controllo serve a
 * decidere i reindirizzamenti, e la firma verificata è garanzia sufficiente.
 */
async function currentUser(
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<{ id: string; email: string | null } | null> {
  try {
    const { data } = await supabase.auth.getClaims();
    const claims = data?.claims;
    if (!claims?.sub) return null;
    return {
      id: claims.sub,
      email: typeof claims.email === "string" ? claims.email : null,
    };
  } catch {
    // Supabase irraggiungibile: si degrada a "non autenticato" invece di
    // far cadere la pagina con un 500.
    return null;
  }
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
  return currentUser(supabase);
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
  const user = await currentUser(supabase);
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
    email: user.email,
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
  const user = await currentUser(supabase);
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
    email: user.email,
    profile: (profileRes.data as ProfileRow | null) ?? null,
    best: (bestRes.data as ExerciseBest[] | null) ?? [],
    byType: (typeRes.data as TypeStat[] | null) ?? [],
    badges: (badgeRes.data as BadgeRow[] | null) ?? [],
  };
}

/* ------------------------------------------------------------------ */
/* Livello 4 — la chiusura di un modulo                                */
/* ------------------------------------------------------------------ */

export interface ModuleCompletionData {
  profile: ProfileRow | null;
  best: ExerciseBest[];
  /** tutti i tentativi, non i migliori: servono a ricostruire i premi */
  attempts: AttemptForBadges[];
  progress: ModuleProgressRow[];
  badges: BadgeRow[];
}

export type AttemptForBadges = Pick<
  AttemptRow,
  "module_id" | "exercise_type" | "score" | "max_score" | "xp_awarded"
>;

/**
 * La schermata di fine modulo, che è l'unica a chiedere così tanto.
 *
 * Legge i tentativi grezzi e non solo i migliori perché deve rispondere a due
 * domande che l'aggregato non sa: quanti XP ha fruttato questo modulo, e quali
 * premi sono arrivati da qui e non da altrove. È una pagina che si apre una
 * volta per modulo, quindi il peso in più si paga volentieri.
 */
export async function getModuleCompletionData(): Promise<ModuleCompletionData | null> {
  const supabase = await createClient();
  const user = await currentUser(supabase);
  if (!user) return null;

  const [profileRes, bestRes, attemptRes, progressRes, badgeRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase
      .from("exercise_best")
      .select("module_id, exercise_id, exercise_type, best_pct, tentativi, ultimo_tentativo")
      .eq("user_id", user.id),
    supabase
      .from("attempts")
      .select("module_id, exercise_type, score, max_score, xp_awarded")
      .eq("user_id", user.id),
    supabase.from("module_progress").select("*").eq("user_id", user.id),
    supabase.from("badges").select("badge_id, earned_at").eq("user_id", user.id),
  ]);

  return {
    profile: (profileRes.data as ProfileRow | null) ?? null,
    best: (bestRes.data as ExerciseBest[] | null) ?? [],
    attempts: (attemptRes.data as AttemptForBadges[] | null) ?? [],
    progress: (progressRes.data as ModuleProgressRow[] | null) ?? [],
    badges: (badgeRes.data as BadgeRow[] | null) ?? [],
  };
}

/** XP effettivamente maturati dentro un modulo, tentativi ripetuti compresi. */
export function moduleXp(attempts: AttemptForBadges[], moduleId: string): number {
  return attempts
    .filter((a) => a.module_id === moduleId)
    .reduce((sum, a) => sum + (a.xp_awarded ?? 0), 0);
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

/**
 * Un modulo è completo quando è al 100%: tutti i suoi esercizi svolti almeno
 * una volta.
 *
 * È cosa diversa da "padroneggiato", che guarda il punteggio e non la
 * copertura. Si può finire tutto restando sotto la soglia — in quel caso il
 * modulo è chiuso ma le capacità nel profilo non si accendono, e la schermata
 * di fine modulo lo dice invece di far finta di niente.
 */
export function moduleIsComplete(
  best: ExerciseBest[],
  moduleId: string,
  totalExercises: number,
): boolean {
  return totalExercises > 0 && exercisesDoneInModule(best, moduleId) >= totalExercises;
}

export function totalExercisesDone(best: ExerciseBest[]): number {
  return best.length;
}

export function totalAttempts(best: ExerciseBest[]): number {
  return best.reduce((sum, b) => sum + b.tentativi, 0);
}

/**
 * Livello più alto in cui è stato toccato almeno un modulo. Serve a colorare
 * Bity: il colore della mascotte dice fin dove sei arrivato, non quanto hai
 * fatto in totale, quindi basta aver messo piede nel livello.
 */
/** Quanti moduli di un livello sono padroneggiati, e quanti sono in tutto. */
export function levelProgress(
  best: ExerciseBest[],
  level: LevelId,
  threshold: number,
): { mastered: number; total: number; pct: number } {
  const modules = MODULES.filter((m) => m.level === level);
  const mastered = modules.filter((m) => moduleBestPct(best, m.id) >= threshold).length;
  return {
    mastered,
    total: modules.length,
    pct: modules.length > 0 ? Math.round((mastered / modules.length) * 100) : 0,
  };
}

/**
 * Il livello su cui si sta lavorando: la barra che sta per completarsi.
 *
 * Non è sempre lo stesso che colora Bity. Bity dice fin dove sei arrivato, e
 * ci resta anche a livello finito; qui serve invece la cosa che hai davanti,
 * cioè quella che ha ancora un pezzo da chiudere.
 *
 * Si parte dal livello raggiunto e si sale finché non se ne trova uno
 * incompleto: chi ha appena chiuso l'Intermedio deve vedere l'Avanzato, non
 * una barra piena che non chiede niente. Se è tutto padroneggiato resta
 * l'ultimo, perché una schermata deve pur mostrare qualcosa.
 */
export function levelInProgress(best: ExerciseBest[], threshold: number): LevelId {
  const raggiunto = highestLevelReached(best);
  const da = LEVEL_ORDER.indexOf(raggiunto);
  for (let i = da; i < LEVEL_ORDER.length; i++) {
    const l = LEVEL_ORDER[i];
    if (levelProgress(best, l, threshold).pct < 100) return l;
  }
  return LEVEL_ORDER[LEVEL_ORDER.length - 1];
}

export function highestLevelReached(best: ExerciseBest[]): LevelId {
  return levelFromModuleIds(best.map((b) => b.module_id));
}

/**
 * Il livello raggiunto conoscendo solo quali moduli sono stati toccati.
 *
 * La classifica degli amici passa di qui: del giro arrivano gli id dei moduli
 * e i punteggi, non le righe di exercise_best — quelle sono di chi le ha
 * fatte, e restano dove sono.
 */
export function levelFromModuleIds(moduleIds: string[]): LevelId {
  const done = new Set(moduleIds);
  let reached: LevelId = "intermedio";
  for (const level of LEVEL_ORDER) {
    if (MODULES.some((m) => m.level === level && done.has(m.id))) reached = level;
  }
  return reached;
}
